import {readFile,access} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html = await readFile('index.html','utf8');
assert(html.indexOf('content.js') < html.indexOf('calcom.js') && html.indexOf('calcom.js') < html.indexOf('app.js'), 'A tartalom és a Cal.com adapter az alkalmazás előtt töltődik be.');
const content = await readFile('content.js','utf8');
const calcom = await readFile('calcom.js','utf8');
const app = await readFile('app.js','utf8');
const pages = ['index','rolam','csapatunk','blog','kapcsolat','idopontfoglalas','aszf','adatvedelem','impresszum','egyuttmukodesi-feltetelek','bejegyzes'];
const element = () => ({innerHTML:'',textContent:'',value:'',dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return 'false';},focus(){}});
function render(page, config = {}) {
  const elements = new Map();
  const scripts = [];
  const document = {
    title:'',
    head:{appendChild(script){scripts.push(script);}},
    createElement(){return {};},
    querySelector(selector){
      if(selector === '#cal-inline' && !elements.get('main')?.innerHTML.includes('id="cal-inline"')) return null;
      if(!elements.has(selector)) elements.set(selector,element());
      return elements.get(selector);
    },
    querySelectorAll(){return [];}, addEventListener(){}
  };
  const ctx = {window:{},document,location:{pathname:`/${page}.html`,search:page==='bejegyzes'?'?cikk=egy-kis-figyelem-onmagadnak':''},URLSearchParams,URL,Blob,setTimeout:()=>1,clearTimeout(){}};
  vm.createContext(ctx);
  vm.runInContext(content,ctx);
  Object.assign(ctx.window.SITE, config);
  vm.runInContext(calcom,ctx);
  vm.runInContext(app,ctx);
  return {ctx,elements,scripts,rendered:elements.get('main').innerHTML};
}
let links = 0;
for(const page of [...pages, 'nem-letezo-oldal']) {
  const {rendered,scripts} = render(page);
  assert(rendered.includes('<h1>'), `${page}: hiányzó főcím`);
  assert(!rendered.includes('undefined'), `${page}: hibás tartalom`);
  assert.equal(scripts.length,page === 'idopontfoglalas' ? 1 : 0,'Csak a foglalási oldal tölt be külső kódot.');
  assert(!/kosár|Kosár|webshop|Ásványékszer/.test(rendered), `${page}: webshop-tartalom`);
  for(const match of (html+rendered).matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
    const target = match[1];
    if(/^(https?:|mailto:|tel:)/.test(target)) continue;
    await access(target);links++;
  }
  if(pages.includes(page)) await access(`${page}.html`);
}
const profile = render('idopontfoglalas');
assert(profile.rendered.includes('https://cal.com/haxby-solheim-j7qmyr'),'A felhasználó megadott profillinkjét használjuk.');
assert.equal(profile.ctx.window.Cal.q.find(([command])=>command==='inline')[1].calLink,'haxby-solheim-j7qmyr');
const booking = render('idopontfoglalas', {bookingUrl:'https://cal.com/teszt-fiok/konzultacio'});
assert(booking.rendered.includes('id="cal-inline"'), 'Beállított linkkel a beágyazott naptár helye jelenik meg.');
assert(booking.rendered.includes('Tesztfoglalási oldal'), 'A tesztfoglalás jelzése megmarad.');
assert(!booking.rendered.includes('calendar.google.com'), 'A Google beágyazását leváltottuk.');
assert.equal(booking.scripts.length,1);
assert.equal(booking.scripts[0].src,'https://app.cal.com/embed/embed.js');
const queued = booking.ctx.window.Cal.q;
assert.equal(queued.find(([command])=>command==='inline')[1].calLink,'teszt-fiok/konzultacio');
const ui = queued.find(([command])=>command==='ui')[1];
assert.equal(ui.theme,'light');
assert.equal(ui.cssVarsPerTheme.light['cal-brand'],'#8b734b');
assert.equal(ui.styles.body.background,'#fcfaf6');
booking.ctx.window.CalBooking.mount(booking.ctx.window.SITE.bookingUrl);
assert.equal(booking.scripts.length,1,'A beágyazás nem töltődik be kétszer.');
booking.scripts[0].onerror();
assert(booking.elements.get('#cal-status').textContent.includes('nem tölthető be'));
queued.find(([command])=>command==='on')[1].callback();
assert.equal(booking.elements.get('#cal-status').hidden,true,'Sikeres betöltéskor eltűnik az állapotüzenet.');
queued.find(([command, options])=>command==='on' && options.action==='linkFailed')[1].callback();
assert(booking.elements.get('#cal-status').textContent.includes('nem elérhető'),'A szolgáltató linkhibája is érthető üzenetet ad.');
const live = render('idopontfoglalas', {bookingUrl:'https://cal.com/team/teszt-csapat/konzultacio',bookingIsTest:false});
assert(live.rendered.includes('https://cal.com/team/teszt-csapat/konzultacio'));
assert(!live.rendered.includes('Tesztfoglalási oldal'));
for(const invalid of ['', 'javascript:alert(1)', 'https://cal.com.evil.test/user/event', 'https://cal.com@evil.test/user/event', 'https://evil.test/user/event', 'https://cal.com', 'https://calendar.google.com/calendar/appointments/schedules/test']) {
  const result = render('idopontfoglalas', {bookingUrl:invalid});
  assert(result.rendered.includes('Az online foglalás hamarosan elérhető'));
  assert(!result.rendered.includes('id="cal-inline"'));
  assert.equal(result.scripts.length,0,'Hiányzó vagy hibás linkkel nincs külső kód.');
}
console.log(`Ellenőrzés sikeres: 11 oldal, ${links} helyi hivatkozás, Cal.com profil/esemény, színek, linkcsere és hibakezelés.`);
