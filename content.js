// Itt módosítható a név, az elérhetőség, a bemutatkozás és a blog tartalma.
// Az üres email helyére saját címet írj. Addig az űrlap csak letölthető piszkozatot készít.
window.SITE = {
  name: 'Önismeret',
  tagline: 'MEGÉRKEZÉS ÖNMAGADHOZ',
  email: '',
  phone: '',
  // Saját Cal.com profil vagy esemény teljes címe.
  // Az üres érték mellett nincs külső naptárbetöltés vagy foglalás.
  bookingUrl: 'https://cal.com/haxby-solheim-j7qmyr',
  bookingIsTest: true,
  person: 'A neved helye',
  role: 'A saját bemutatkozásod helye',
  bio: 'Itt mesélhetsz magadról, az utadról és arról, mi fontos számodra a közös munkában. Ezt a mintaszöveget később a saját történetedre cserélheted.',
  portrait: '',
  // Példa: [{ title: 'A szolgáltatás neve', text: 'Rövid bemutatás', href: 'kapcsolat.html' }]
  services: [],
  posts: [
    {
      slug: 'egy-kis-figyelem-onmagadnak', category: 'Önismeret', title: 'Egy kis figyelem önmagadnak',
      excerpt: 'Néhány gondolat arról, hogyan teremthetsz több teret a saját kérdéseidnek a mindennapokban.',
      lead: 'A hétköznapok sodrásában sokszor a saját hangunkat halljuk meg utoljára.',
      sections: [
        ['Megállni egy pillanatra', 'Nem kell rögtön minden kérdésre választ találnod. Kezdheted azzal, hogy egy rövid időre félreteszed a feladatokat, és megfigyeled, mi foglalkoztat most.'],
        ['Kérdések, amelyeket magaddal vihetsz', 'Mire lenne ma szükségem? Mi ad energiát, és mi vesz el belőle? Mi az az egy apró lépés, amely most jólesne?'],
        ['A saját tempódban', 'Ezek a gondolatok egy lehetséges kiindulópontot adnak. A saját tapasztalataidból és a számodra megfelelő ritmusból építheted tovább őket.']
      ]
    },
    {
      slug: 'helyet-adni-a-valtozasnak', category: 'Mindennapok', title: 'Helyet adni a változásnak',
      excerpt: 'Néha egy apró, tudatos döntés nyit teret valami újnak. Hogyan indulhatsz el a saját ritmusodban?',
      lead: 'A változás kezdődhet egy egészen kicsi döntéssel is.',
      sections: [
        ['Ami most van', 'Érdemes lehet először megfogalmazni, milyen helyzetben vagy, és miben szeretnél több mozgásteret. Nem kell egyszerre mindent átalakítanod.'],
        ['Egy vállalható lépés', 'Válassz egy olyan apró változtatást, amely belefér a napodba. Egy rövid séta, egy nyugodt reggel vagy egy őszinte beszélgetés is lehet ilyen.'],
        ['Visszatekintés', 'Adj időt magadnak, majd nézd meg, hogyan érezted magad az új helyzetben. Ami működik, megtarthatod; amin változtatnál, azt újragondolhatod.']
      ]
    },
    {
      slug: 'kapcsolodas-es-jelenlet', category: 'Kapcsolódás', title: 'A figyelem csendes ereje',
      excerpt: 'Mit jelent jelen lenni egy beszélgetésben? Gondolatok a figyelemről és a kapcsolódásról.',
      lead: 'Van, amikor a figyelmes jelenlét adja a legtöbbet egy beszélgetéshez.',
      sections: [
        ['Meghallgatni egymást', 'Próbáld ki, milyen úgy hallgatni a másikat, hogy közben nem a következő válaszodat fogalmazod. Engedj időt a mondatok közötti csendnek is.'],
        ['Kíváncsinak maradni', 'Egy nyitott kérdés segíthet jobban megérteni a másik tapasztalatát. Ahelyett, hogy rögtön következtetnél, megkérdezheted, ő hogyan élte meg a helyzetet.'],
        ['A saját jelenléted', 'A saját határaid és szükségleteid is részei a kapcsolódásnak. Az őszinte figyelemben mindkét félnek lehet helye.']
      ]
    }
  ]
};
