/* Egyszerű, függőségek nélkül működő, többoldalas weboldal. */
const site = window.SITE;
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const routes = {
  'index': 'Főoldal', 'rolam': 'Rólam', 'csapatunk': 'Csapatunk', 'blog': 'Blog',
  'bejegyzes': 'Blogbejegyzés', 'kapcsolat': 'Kapcsolat', 'idopontfoglalas': 'Időpontfoglalás',
  'aszf': 'Általános szerződési feltételek', 'adatvedelem': 'Adatkezelési tájékoztató',
  'impresszum': 'Impresszum', 'egyuttmukodesi-feltetelek': 'Együttműködési feltételek'
};
const parts = location.pathname.split('/').filter(Boolean);
const route = (parts.at(-1) || 'index').replace(/\.html$/, '');
const known = Object.hasOwn(routes, route);
const title = routes[route] || 'Az oldal nem található';
document.title = `${title} | ${site.name}`;
document.querySelector('[data-brand]').innerHTML = `${escape(site.name)}<small>${escape(site.tagline)}</small>`;
document.querySelector('[data-footer-brand]').textContent = site.name;
document.querySelector('[data-copyright-brand]').textContent = site.name;
document.querySelector('#year').textContent = new Date().getFullYear();
const nav = [['index', 'Főoldal'], ['rolam', 'Rólam'], ['blog', 'Blog'], ['kapcsolat', 'Kapcsolat']];
document.querySelector('#navigation').innerHTML = nav.map(([key, label]) => `<a href="${key}.html"${route === key || key === 'blog' && route === 'bejegyzes' ? ' aria-current="page"' : ''}>${label}</a>`).join('');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){ toggle.setAttribute('aria-expanded','false'); navigation.classList.remove('open'); toggle.setAttribute('aria-label','Menü megnyitása'); }
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open);
  toggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); toggle.focus(); } });
navigation.addEventListener('click', e => { if(e.target.closest('a')) closeMenu(); });
const heading = (name, intro = '') => `<section class="page-heading"><div class="breadcrumb"><a href="index.html">Főoldal</a> &nbsp; / &nbsp; ${escape(name)}</div><h1>${escape(name)}</h1>${intro ? `<p>${escape(intro)}</p>` : ''}</section>`;
const photo = () => site.portrait ? `<img src="${escape(site.portrait)}" alt="${escape(site.person)}" class="portrait-placeholder">` : `<div class="portrait-placeholder" role="img" aria-label="A saját portréfotó helye"><div class="silhouette"></div><span class="photo-label">A SAJÁT FÉNYKÉPED HELYE</span></div>`;
const cta = () => `<section class="cta"><span class="eyebrow">A következő lépés</span><h2>Kezdjük egy beszélgetéssel.</h2><p>Ha szívesen kapcsolódnál, vagy kérdésed van, itt elindulhatsz.</p><a class="button" href="idopontfoglalas.html">Időpontot kérek <span aria-hidden="true">↗</span></a></section>`;
const demoNote = text => `<div class="notice">${text}</div>`;
const home = () => `<section class="hero"><div class="wrap hero-grid"><div class="hero-copy"><span class="eyebrow">Figyelem · önismeret · kapcsolódás</span><h1>Találj vissza<br><em>önmagadhoz.</em></h1><p>Adj egy kis teret annak, ami benned van. Nézz rá új szemmel a kérdéseidre, és indulj el a saját válaszaid felé.</p><a class="button" href="#folyamat">Megismerem a lehetőségeket <span aria-hidden="true">↗</span></a><div class="hero-foot">A saját utadon. A saját tempódban.</div></div><div class="hero-art"><img src="assets/botanical.svg" alt="Lágy fényben megjelenő olajzöld levelek" width="700" height="900"></div></div></section>
<section class="section intro center wrap"><span class="eyebrow">Van helye annak, amit érzel</span><h2>Néha elég egy új nézőpont,<br>hogy elindulhass.</h2><p>Lehetnek kérdések, amelyekhez újra és újra visszatérsz. Helyzetek, amelyeket szeretnél jobban megérteni. Nem kell rögtön tudnod minden választ.</p><p>Az első lépés lehet az, hogy figyelmet adsz annak, ami most igazán fontos számodra.</p></section>
<section class="section center" id="folyamat" style="background:var(--cream)"><div class="wrap"><span class="eyebrow">Lépésről lépésre</span><h2>Tér a felismeréseknek.</h2><div class="steps"><div class="step"><span class="number">01</span><h3>Megállás</h3><p>Egy kis távolság a mindennapok sodrásától. Idő arra, hogy meghalld a saját kérdéseidet.</p></div><div class="step"><span class="number">02</span><h3>Rálátás</h3><p>Új szempontok, őszinte kérdések és lehetőség arra, hogy tágabb képet láss.</p></div><div class="step"><span class="number">03</span><h3>Elindulás</h3><p>Apró, vállalható lépések abba az irányba, amely közelebb áll hozzád.</p></div></div><a href="rolam.html" class="text-link">Ismerj meg közelebbről ↗</a></div></section>
<section class="section sage"><div class="wrap split"><div><span class="eyebrow">Ismerős érzések?</span><h2>Ha most több figyelmet<br>adnál önmagadnak.</h2><ul class="checklist"><li>Szeretnél tisztábban látni a saját kérdéseidben.</li><li>Új nézőpontból néznél rá egy élethelyzetre.</li><li>Fontos neked az őszinte, figyelmes kapcsolódás.</li><li>Készen állsz egy apró következő lépésre.</li></ul></div><div class="quote">„Adj időt magadnak.<br>Nem kell mindennek<br>egyszerre megérkeznie.”</div></div></section>
<section class="section wrap split">${photo()}<div><span class="eyebrow">Egy személyes találkozás kezdete</span><h2>Örülök, hogy itt vagy.</h2><p>${escape(site.bio)}</p><a class="text-link" href="rolam.html">Tovább a bemutatkozáshoz ↗</a></div></section>
${site.services.length ? `<section class="section wrap center"><span class="eyebrow">Lehetőségek</span><h2>Hogyan kapcsolódhatunk?</h2><div class="steps">${site.services.map(s=>`<div class="step"><h3>${escape(s.title)}</h3><p>${escape(s.text)}</p><a class="text-link" href="${escape(s.href || 'kapcsolat.html')}">Részletek ↗</a></div>`).join('')}</div></section>` : ''}${cta()}`;
const about = () => `${heading('Rólam', 'Egy történet, egy szemlélet, egy személyes találkozás lehetősége.')}<section class="section wrap split">${photo()}<div><span class="eyebrow">Bemutatkozás</span><h2>${escape(site.person)}</h2><p>${escape(site.role)}</p><p>${escape(site.bio)}</p><a href="kapcsolat.html" class="button outline">Lépjünk kapcsolatba ↗</a></div></section><section class="section sage"><div class="wrap narrow center"><span class="eyebrow">A szemléletem</span><h2>A saját hangodnak is van helye.</h2><p>Itt mutathatod be, hogyan dolgozol, milyen értékek mentén kíséred a hozzád fordulókat, és mi fontos számodra egy találkozásban.</p><p>A végzettségeid, tapasztalataid és a személyes történeted később kerülhetnek ide.</p></div></section>${cta()}`;
const team = () => `${heading('Csapatunk', 'A közös munka mögött álló emberek.')}<section class="section wrap split">${photo()}<div><span class="eyebrow">Bemutatkozás</span><h2>${escape(site.person)}</h2><p>${escape(site.bio)}</p><a class="text-link" href="rolam.html">Személyes bemutatkozás ↗</a></div></section>${cta()}`;
const form = booking => `<form class="form" id="contact-form"><h2 style="font-size:29px">${booking ? 'Egyeztessünk időpontot' : 'Írj néhány sort'}</h2><p style="font-size:12px;color:var(--muted)">${site.email ? 'A kitöltés után megnyitjuk a leveleződet. Az üzenetet ott tudod elküldeni.' : 'Előnézeti űrlap: a kitöltött szöveget piszkozatként töltheted le. Üzenetküldés még nincs beállítva.'}</p><label for="name">Neved *</label><input id="name" name="name" autocomplete="name" maxlength="120" required><label for="email">E-mail-címed *</label><input id="email" name="email" type="email" autocomplete="email" maxlength="200" required>${booking ? '<label for="preferred">Mikor lenne megfelelő?</label><input id="preferred" name="preferred" maxlength="200" placeholder="Pl. hétköznap délután"><p style="font-size:11px;color:var(--muted)">Ez egyeztetési kérés, az időpontot külön vissza kell igazolni.</p>' : ''}<label for="message">${booking ? 'Mit szeretnél megosztani?' : 'Üzeneted'} *</label><textarea id="message" name="message" maxlength="5000" required></textarea><label class="checkbox"><input type="checkbox" required><span>Elolvastam az <a href="adatvedelem.html">adatkezelési oldal</a> tájékoztatását. *</span></label><button class="button" type="submit">${site.email ? 'Megnyitás a levelezőben' : 'Piszkozat letöltése'} <span aria-hidden="true">↗</span></button><p class="form-status" role="status" aria-live="polite"></p></form>`;
const contact = booking => `${heading(booking ? 'Időpontfoglalás' : 'Kapcsolat', booking ? 'Az első lépés egy rövid egyeztetés.' : 'Kérdésed van? Itt elindulhat a beszélgetés.')}<section class="section wrap contact-grid"><div><span class="eyebrow">Kapcsolódjunk</span><h2>${booking ? 'Találjunk egy közös időpontot.' : 'Örömmel olvasok felőled.'}</h2><p>${booking ? 'Írd meg, mikor lenne számodra megfelelő a találkozás. Az időpont és a részletek személyes egyeztetés után válnak véglegessé.' : 'Mesélj néhány mondatban arról, miért keresel. Ha inkább időpontot szeretnél egyeztetni, arra külön oldalon is van lehetőség.'}</p><div class="contact-detail"><small>E-mail</small>${site.email ? `<a href="mailto:${escape(site.email)}">${escape(site.email)}</a>` : 'A saját e-mail-cím később kerül ide.'}</div>${site.phone ? `<div class="contact-detail"><small>Telefon</small><a href="tel:${escape(site.phone)}">${escape(site.phone)}</a></div>` : ''}<a class="text-link" href="${booking ? 'egyuttmukodesi-feltetelek.html' : 'idopontfoglalas.html'}">${booking ? 'Együttműködési feltételek' : 'Időpontegyeztetés'} ↗</a></div>${form(booking)}</section>`;
const booking = () => {
  const config = window.CalBooking.parse(site.bookingUrl);
  const availability = config
    ? `<div class="booking-calendar cal-calendar"><p id="cal-status" class="cal-status" role="status" aria-live="polite">A szabad időpontok betöltése…</p><div id="cal-inline"></div></div><div class="center booking-fallback"><p>Ha a naptár nem jelenik meg, külön lapon is megnyithatod.</p><a class="button outline" href="${escape(config.url)}" target="_blank" rel="noopener noreferrer">Naptár megnyitása új lapon <span aria-hidden="true">↗</span></a></div>`
    : `<div class="booking-unavailable center"><span class="booking-status">Hamarosan</span><h3>Az online foglalás hamarosan elérhető.</h3><p>Addig is írj, és egyeztessünk egy számodra megfelelő időpontot.</p><a class="button outline" href="kapcsolat.html">Kapcsolatfelvétel <span aria-hidden="true">↗</span></a></div>`;
  return `${heading('Időpontfoglalás', 'Egy kis idő, ami most csak rólad szól.')}<section class="section wrap">${config && site.bookingIsTest ? demoNote('Tesztfoglalási oldal: ez még nem a végleges foglalási naptár. Az itt véglegesített foglalások a csatlakoztatott tesztnaptárba kerülnek.') : ''}<div class="booking-panel center"><img src="assets/lotus.svg" width="65" height="65" alt=""><span class="eyebrow">Online időpontfoglalás</span><h2>Találjunk időt a találkozásra.</h2><p>${config ? 'Válassz egy szabad napot és időpontot az alábbi naptárban, majd add meg a foglalásodhoz szükséges adatokat.' : 'Hamarosan itt is kiválaszthatod a számodra megfelelő szabad időpontot.'}</p></div>${availability}<div class="steps booking-steps"><div class="step"><span class="number">01</span><h3>Válassz</h3><p>Nézd meg a naptárban, melyik szabad időpont megfelelő neked.</p></div><div class="step"><span class="number">02</span><h3>Foglalj</h3><p>Add meg az adataidat, és erősítsd meg a választott időpontot.</p></div><div class="step"><span class="number">03</span><h3>Érkezz meg</h3><p>A visszaigazolásban megtalálod a találkozáshoz szükséges részleteket.</p></div></div><div class="center"><a class="text-link" href="kapcsolat.html">Kérdésed van? Lépj kapcsolatba ↗</a></div></section>`;
};
const postCard = p => `<article class="post-card" data-category="${escape(p.category)}" data-search="${escape(p.title + ' ' + p.excerpt)}"><a class="post-image" href="bejegyzes.html?cikk=${encodeURIComponent(p.slug)}" aria-label="${escape(p.title)}"><img src="assets/botanical.svg" alt="" loading="lazy" width="700" height="900"></a><div class="post-meta">${escape(p.category)} · Mintabejegyzés</div><h2><a href="bejegyzes.html?cikk=${encodeURIComponent(p.slug)}">${escape(p.title)}</a></h2><p>${escape(p.excerpt)}</p><a class="text-link" href="bejegyzes.html?cikk=${encodeURIComponent(p.slug)}">Elolvasom ↗</a></article>`;
const blog = () => `${heading('Blog', 'Gondolatok, felismerések és útravalók a mindennapokra.')}<section class="section wrap">${demoNote('Az alábbi írások szerkeszthető mintabejegyzések. A saját cikkeidet a content.js fájlban adhatod hozzá.')}<div class="blog-tools"><div class="filters" aria-label="Témák szerinti szűrés">${['Összes',...new Set(site.posts.map(p=>p.category))].map((c,i)=>`<button class="filter${i===0?' active':''}" aria-pressed="${i===0}" data-filter="${escape(c)}">${escape(c)}</button>`).join('')}</div><input class="search" type="search" aria-label="Keresés a bejegyzések között" placeholder="Keresés a cikkek között…"></div><div class="blog-grid">${site.posts.map(postCard).join('')}</div><p class="no-results center" role="status" hidden>Nincs a keresésnek megfelelő bejegyzés.</p></section>`;
const article = () => {
  const slug = new URLSearchParams(location.search).get('cikk');
  const post = site.posts.find(p=>p.slug === slug);
  if(!post) return `${heading('A bejegyzés nem található')}<section class="section wrap center"><a class="button" href="blog.html">Vissza a bloghoz</a></section>`;
  document.title = `${post.title} | ${site.name}`;
  return `${heading(post.title, post.category)}<section class="section wrap narrow">${demoNote('Szerkeszthető mintabejegyzés.')}<img class="article-hero" src="assets/botanical.svg" alt="Olajzöld levelek természetes tónusú háttéren"><article class="article"><p class="lead">${escape(post.lead)}</p>${post.sections.map(([h,p])=>`<h2>${escape(h)}</h2><p>${escape(p)}</p>`).join('')}</article><a href="blog.html" class="text-link">← Vissza a bejegyzésekhez</a></section>${cta()}`;
};
const legalContent = {
  aszf: '<h2>1. A szolgáltató adatai</h2><p>[Név, székhely, nyilvántartási szám, adószám, elérhetőségek.]</p><h2>2. A szolgáltatás igénybevétele</h2><p>[A saját szolgáltatások megrendelésének, teljesítésének és díjazásának feltételei.]</p><h2>3. Lemondás és panaszkezelés</h2><p>[A saját működésre vonatkozó lemondási és panaszkezelési feltételek.]</p>',
  adatvedelem: '<h2>Az előnézet működése</h2><p>A weboldal saját kódja nem tartalmaz analitikát vagy marketingcélú követőkódot. A kapcsolatfelvételi űrlap nem továbbít adatot szerverre. Beállított e-mail-cím hiányában a kitöltött szövegből a saját eszközödre menthető piszkozat készül. Az űrlap adatait a weboldal nem tárolja.</p><h2>Cal.com időpontfoglalás</h2><p>Beállított foglalási link esetén az időpontfoglalási oldal külső, Cal.com által biztosított naptárt jelenít meg. A naptár betöltésekor a böngésződ kapcsolatba lép a Cal.com szervereivel. A foglaláskor megadott adatokat a Cal.com foglalási rendszere és a foglalási oldal tulajdonosa kezeli, a kapcsolt naptárszolgáltató a beállítások szerint kapja meg a foglalás adatait. A külső felület működésére a szolgáltató adatvédelmi tájékoztatója is vonatkozik. Foglalási link hiányában a külső naptár nem töltődik be.</p><h2>A későbbi adatkezelő adatai</h2><p>[Név, kapcsolattartási cím és elérhetőség.]</p><h2>Az éles oldal adatkezelése</h2><p>[A tényleges működéshez tartozó adatkezelési célok, jogalapok, megőrzési idők, adatfeldolgozók és érintetti jogok helye.]</p>',
  impresszum: '<h2>A weboldal üzemeltetője</h2><dl><dt>Név / cégnév</dt><dd>[Kitöltendő]</dd><dt>Székhely</dt><dd>[Kitöltendő]</dd><dt>E-mail</dt><dd>[Kitöltendő]</dd><dt>Adószám / nyilvántartási szám</dt><dd>[Kitöltendő]</dd></dl><h2>Tárhelyszolgáltató</h2><p>[A kiválasztott tárhelyszolgáltató neve, címe és elérhetősége.]</p>',
  'egyuttmukodesi-feltetelek': '<h2>A közös munka keretei</h2><p>[Itt adhatod meg a találkozások formáját, időtartamát és a szakmai kereteket.]</p><h2>Időpontegyeztetés</h2><p>[Az időpontok visszaigazolásának és módosításának menete.]</p><h2>Díjazás és lemondás</h2><p>[A saját díjazási, fizetési és lemondási feltételeid helye.]</p><h2>Bizalmasság</h2><p>[A közös munka bizalmasságára vonatkozó feltételek.]</p>'
};
const legal = () => `${heading(title)}<section class="section wrap narrow legal">${demoNote('Előkészített oldalváz, kitöltendő mintatartalommal. A végleges dokumentumok a saját adatok és működés alapján kerülnek ide.')} ${legalContent[route]}</section>`;
const renderers = { index: home, rolam: about, csapatunk: team, blog, bejegyzes: article, kapcsolat: ()=>contact(false), idopontfoglalas: booking, aszf: legal, adatvedelem: legal, impresszum: legal, 'egyuttmukodesi-feltetelek': legal };
document.querySelector('main').innerHTML = known ? renderers[route]() : `${heading('Az oldal nem található')}<section class="section wrap center"><a class="button" href="index.html">Vissza a főoldalra</a></section>`;
if(route === 'idopontfoglalas') window.CalBooking.mount(site.bookingUrl);
if(route === 'blog') {
  let category = 'Összes';
  const search = document.querySelector('.search');
  function filter(){
    let count = 0;
    const term = search.value.trim().toLocaleLowerCase('hu');
    document.querySelectorAll('.post-card').forEach(card=>{
      const show = (category === 'Összes' || card.dataset.category === category) && card.dataset.search.toLocaleLowerCase('hu').includes(term);
      card.hidden = !show; if(show) count++;
    });
    document.querySelector('.no-results').hidden = count !== 0;
  }
  document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
    category = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active', b===button);b.setAttribute('aria-pressed',String(b===button));});
    filter();
  }));
  search.addEventListener('input', filter);
}
const contactForm = document.querySelector('#contact-form');
if(contactForm) contactForm.addEventListener('submit', e=>{
  e.preventDefault();
  if(!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const subject = route === 'idopontfoglalas' ? 'Időpontegyeztetés' : 'Kapcsolatfelvétel';
  const message = `Név: ${data.get('name')}\nE-mail: ${data.get('email')}\n${data.get('preferred') ? `Megfelelő időpont: ${data.get('preferred')}\n` : ''}\n${data.get('message')}`;
  const status = document.querySelector('.form-status');
  if(site.email){
    location.href = `mailto:${encodeURIComponent(site.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    status.textContent = 'A leveleződben ellenőrizheted és elküldheted a levelet. Ez az oldal nem küldött üzenetet és nem rögzített foglalást.';
  } else {
    const url = URL.createObjectURL(new Blob([subject+'\n\n'+message], {type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href=url;a.download='uzenet-piszkozat.txt';a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    status.textContent = 'Elkészült a letölthető piszkozat. Üzenetet nem küldtünk, időpontot nem foglaltunk. Az éles működéshez még saját elérhetőség szükséges.';
  }
});
