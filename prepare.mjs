import {readFile,writeFile} from 'node:fs/promises';
const template = await readFile('index.html','utf8');
const pages = {
"pszichotronika":"PSZICHOTRONIKA – SZELLEM- ÉS LÉLEKGYÓGYÁSZAT",
"csaladallitas":"CSALÁDÁLLÍTÁS",
"kvantum-matrix":"KVANTUM-Mátrix KEZELÉS",
"univerzum-gyemant-testkezeles":"UNIVERZUM GYÉMÁNT TESTKEZELÉS",
"tertisztitas":"TÉRTISZTÍTÁS",
  szolgaltatasok:'Szolgáltatások',
  rolam:'Rólam', csapatunk:'Csapatunk', blog:'Blog', bejegyzes:'Blogbejegyzés',
  kapcsolat:'Kapcsolat', idopontfoglalas:'Időpontfoglalás', aszf:'Általános szerződési feltételek',
  adatvedelem:'Adatkezelési tájékoztató', impresszum:'Impresszum',
  'egyuttmukodesi-feltetelek':'Együttműködési feltételek'
};
for (const [slug,title] of Object.entries(pages)) {
  await writeFile(`${slug}.html`,template.replace('<title>Önismeret — Főoldal</title>',`<title>${title} | Önismeret</title>`));
}
console.log(`${Object.keys(pages).length + 1} HTML-oldal elkészült.`);
