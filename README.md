# Szerkeszthető, helyi weboldal

## Megnyitás

Az `index.html` közvetlenül is megnyitható böngészőben. Helyi kiszolgáláshoz Node.js szükséges:

```powershell
npm.cmd start
```

Az oldal címe: http://localhost:4173

## Szerkesztés

- `content.js`: az oldal neve, alcíme, saját név, bemutatkozás, portré, e-mail, telefon, szolgáltatások és blogbejegyzések.
- `styles.css`: színek, betűk, elrendezés és mobilnézet.
- `booking.css`: az időpontfoglalási oldal kiegészítő stílusai.
- `calcom.js`: Cal.com-link ellenőrzése, beágyazás, arculati beállítások és betöltési hibák kezelése.
- `app.js`: az oldalak tartalma és működése.
- `assets/`: helyi képek, illusztrációk.
- `index.html`: közös fejléc és lábléc. Módosítása után `node prepare.mjs` frissíti a többi HTML-oldalt.

Az üres `services` lista miatt szolgáltatáskártyák nem jelennek meg. Később a lista feltölthető saját szolgáltatásokkal. Webshop, kosár, fizetés és termékoldalak nincsenek.

## Oldalak

- Főoldal
- Rólam
- Csapatunk (a forrás korábbi navigációjában szereplő oldal, külön URL-en)
- Blog, kereséssel és témaszűréssel
- Blogbejegyzés-sablon, három saját mintacikkel
- Kapcsolat
- Időpontfoglalás Cal.com beágyazással
- ÁSZF
- Adatkezelés
- Impresszum
- Együttműködési feltételek

## Űrlapok

A kapcsolatfelvételi űrlap ellenőrzi a kötelező mezőket. Beállított `email` hiányában a felhasználó letöltheti az üzenetét szöveges piszkozatként. Saját e-mail-cím beállítása után a levelezőprogramban nyit meg előre kitöltött levelet. Ez az űrlap nem végez foglalást, szerveroldali küldést vagy tárolást.

## Cal.com időpontfoglalás

A Google beágyazását Cal.com inline beágyazás váltotta. Az oldal saját arany márkaszínt, világos témát és a weboldalhoz illeszkedő hátteret állít be a Cal.com támogatott UI-beállításaival. A márkaszín a `styles.css` `--gold`, a háttér a `--paper` változóját követi. A Cal.com belső felülete a szolgáltató által támogatott mértékben formázható; minden belső elem és betűtípus teljes átírására ez nem ad lehetőséget.

A `content.js` `bookingUrl` értéke jelenleg a felhasználó által megadott `https://cal.com/haxby-solheim-j7qmyr` profil. Profil esetén először a nyilvános eseménytípusok közül lehet választani. Ha rögtön egy konkrét esemény naptára szükséges, ide annak teljes linkje kerülhet, például `https://cal.com/felhasznalonev/konzultacio`. A `https://cal.com/team/csapat/esemeny` formájú csapatesemények is használhatók. A végleges naptárra váltás egyetlen link átírása. Üres vagy hibás linknél az oldal a „hamarosan elérhető” állapotot mutatja, kapcsolatfelvételi lehetőséggel, és nem tölt be külső kódot.

A `bookingIsTest: true` jelzi, hogy még nem végleges foglalási oldalról van szó. Élesítéskor ez `false` értékre állítható. A Cal.com-fiókban kell létrehozni és nyilvánossá tenni az eseményt, megadni az időtartamot és a foglalható időszakokat, illetve csatlakoztatni a megfelelő Google Naptárt. Az értesítéseket és az ütközések ellenőrzését szintén ott kell beállítani; ezt a weboldal önmagában nem végzi el. API-kulcs nem szükséges a nyilvános beágyazáshoz, titkos adat nem kerül a weboldalba.

A beágyazó kód csak az időpontfoglalási oldalon és érvényes Cal.com link esetén töltődik be. Ha a betöltés nem sikerül, az oldal hibajelzést és új lapon megnyitható foglalási linket ad. A tényleges foglalás a Cal.com rendszerében történik. A korábbi Google-változat a GitHub `időpontfoglalás-naptárral` ágán maradt meg; a Cal.com változat az `idopontfoglalas-cal_com` ágon található.

Böngészős vizuális ellenőrzés ebben a környezetben nem áll rendelkezésre, és a megadott Cal.com profil tartalmát a webes lekérő sem tudta megnyitni. A helyi böngészőben ellenőrizni kell a nyilvános események megjelenését, az arculati beállításokat és a foglalás visszaigazolását. A helyi tesztek nem küldenek hálózati kérést és nem hoznak létre foglalást.

Technikai források: [Cal.com beágyazás](https://cal.com/embed), [hivatalos UI-típusok](https://github.com/calcom/cal.com/blob/main/packages/embeds/embed-core/src/types.ts).

## A referencia feldolgozása

Referencia: https://belsoen.hu/ (2026. október 26.)

A felépítést a nyilvánosan elérhető oldalak és a jelenlegi menü alapján készítettem elő. A jelenlegi menü: Főoldal, Szolgáltatások, Ásványékszerek, Rólam, Blog, Kapcsolat, Időpontot kérek. A szolgáltatások és a webshop a kérés szerint kimaradtak. A régi menü Csapatunk oldala külön mintaként megmaradt; a Sors Akadémia külön oktatási felületére történő hivatkozását nem másoltam át.

A forrás közvetlen HTML/CSS-letöltését a környezet hálózati korlátozása megakadályozta, működő böngészős felület sem volt elérhető. Emiatt a vizuális kialakítás önálló, természetes tónusú közelítés; nem ellenőrzött, pontos másolat. A pontos vizuális egyeztetéshez az eredeti oldal asztali és mobil képernyőképei vagy a forrásfájljai szükségesek. Az időpontfoglalási oldal tartalma nem volt lekérhető, ahhoz saját egyeztetési felület készült.

Az eredeti oldal szerzői szövegeit, blogcikkeit, fotóit, személyes történetét és céges adatait nem vettem át. Az oldalon helyi, saját SVG-illusztráció, saját mintaszövegek és jelölt helykitöltők vannak. A jogi oldalak szerkeszthető vázak, nem kész jogi dokumentumok. A végleges adatok és tartalmak megadásáig `noindex,nofollow` beállítás marad az oldalon.

## Ellenőrzés

```powershell
node prepare.mjs
npm.cmd run check
```

A vizsgálat a JavaScript szintaxisát, az oldalak renderelését, a helyi fájlhivatkozásokat, a webshop kihagyását és az ismeretlen útvonal kezelését ellenőrzi. Böngészős, vizuális ellenőrzés még szükséges.
