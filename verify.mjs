import {readFile,access} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html = await readFile('index.html','utf8');
assert(html.indexOf('content.js') < html.indexOf('app.js'), 'A tartalom betöltése megelőzi az alkalmazást.');
const content = await readFile('content.js','utf8');
const app = await readFile('app.js','utf8');
const pages = ['index','rolam','csapatunk','blog','kapcsolat','idopontfoglalas','aszf','adatvedelem','impresszum','egyuttmukodesi-feltetelek','bejegyzes'];
const element = () => ({innerHTML:'',textContent:'',value:'',dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return 'false';},focus(){}});
let links = 0;
for(const page of [...pages, 'nem-letezo-oldal']) {
  const elements = new Map();
  const document = {title:'',querySelector(selector){if(!elements.has(selector)) elements.set(selector,element());return elements.get(selector);},querySelectorAll(){return [];},addEventListener(){}};
  const ctx = {window:{},document,location:{pathname:`/${page}.html`,search:page==='bejegyzes'?'?cikk=egy-kis-figyelem-onmagadnak':''},URLSearchParams,URL,Blob,setTimeout};
  vm.createContext(ctx);vm.runInContext(content,ctx);vm.runInContext(app,ctx);
  const rendered = elements.get('main').innerHTML;
  assert(rendered.includes('<h1>'), `${page}: hiányzó főcím`);
  assert(!rendered.includes('undefined'), `${page}: hibás tartalom`);
  if(page === 'idopontfoglalas') {
    assert(rendered.includes(ctx.window.SITE.bookingUrl), 'A megadott Google foglalási link jelenik meg.');
    assert(rendered.includes('<iframe '), 'A naptár közvetlenül beágyazva jelenik meg.');
    assert(rendered.includes('title="Google Naptár'), 'A beágyazott naptár hozzáférhető címet kap.');
    assert(!rendered.includes('<form'), 'Az időpontfoglalás nem a korábbi piszkozatűrlapot használja.');
    assert(rendered.includes('Tesztfoglalási oldal'), 'A személyes tesztnaptár egyértelmű jelzést kap.');
    ctx.window.SITE.bookingUrl = 'https://calendar.google.com/calendar/appointments/schedules/replacement';
    ctx.window.SITE.bookingIsTest = false;
    const replacement = vm.runInContext('booking()', ctx);
    assert(replacement.includes(ctx.window.SITE.bookingUrl), 'A naptár egy beállítással lecserélhető.');
    assert(replacement.includes('replacement?gv=true'), 'A cserélt naptár beágyazható nézete megmarad.');
    assert(!replacement.includes('Tesztfoglalási oldal'), 'A tesztjelzés kikapcsolható.');
    ctx.window.SITE.bookingUrl = 'https://calendar.app.google/test';
    const shortLink = vm.runInContext('booking()', ctx);
    assert(!shortLink.includes('<iframe '), 'A rövidlink nem lesz ellenőrizetlen iframe-forrás.');
    assert(shortLink.includes('https://calendar.app.google/test'), 'Rövidlinkkel is elérhető marad a naptár.');
    ctx.window.SITE.bookingUrl = 'javascript:alert(1)';
    const invalid = vm.runInContext('booking()', ctx);
    assert(!invalid.includes('javascript:'), 'Hibás hivatkozás nem kerül az oldalra.');
    assert(invalid.includes('Az online foglalás jelenleg nem elérhető'), 'Hibás link esetén kapcsolatfelvétel érhető el.');
  }
  assert(!/kosár|Kosár|webshop|Ásványékszer/.test(rendered), `${page}: webshop-tartalom`);
  for(const match of (html+rendered).matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
    const target = match[1];
    if(/^(https?:|mailto:|tel:)/.test(target)) continue;
    await access(target);links++;
  }
  if(pages.includes(page)) await access(`${page}.html`);
}
console.log(`Ellenőrzés sikeres: 11 oldal, hiányzó oldal kezelése, ${links} helyi hivatkozás és erőforrás.`);
