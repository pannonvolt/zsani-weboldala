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
- Időpontfoglalás a Google foglalási oldalán
- ÁSZF
- Adatkezelés
- Impresszum
- Együttműködési feltételek

## Űrlapok

A kapcsolatfelvételi űrlap ellenőrzi a kötelező mezőket. Beállított `email` hiányában a felhasználó letöltheti az üzenetét szöveges piszkozatként. Saját e-mail-cím beállítása után a levelezőprogramban nyit meg előre kitöltött levelet. Ez az űrlap nem végez foglalást, szerveroldali küldést vagy tárolást.

## Google időpontfoglalás

Az `idopontfoglalas.html` oldalon a felhasználó által megadott Google foglalási naptár iframe-ben, közvetlenül az oldalba ágyazva jelenik meg. A naptár teljes szélességű, asztali nézetben 750, mobilon 900 pixel magas. Ha a beágyazást a böngésző blokkolja, a naptár egy külön gombbal új lapon is megnyitható. A foglalás a Google felületén történik; a weboldal nem használ külön foglalási adatbázist. Az összes meglévő „Időpontot kérek” hivatkozás erre a helyi oldalra vezet.

A naptár későbbi cseréjéhez a `content.js` fájlban a `bookingUrl` értékét kell átírni az új Google beágyazási kód `src` címére. A `gv=true` beágyazási paraméter automatikusan megmarad. A `bookingIsTest: true` beállítás jelzi, hogy a foglalások még a személyes tesztnaptárba kerülnek. A végleges naptár beállításakor ez `false` értékre állítható. Google rövidlink megadása esetén csak az új lapot nyitó gomb jelenik meg.

A Google foglalási felületének megjelenése és értesítési beállításai a Google-fiókban kezelhetők. A tulajdonos értesítéseit nem módosítottam, próbaidőpontot nem foglaltam. A beágyazás a felhasználó által megadott Google-kód címét használja. Böngészős vizuális ellenőrzés ebben a környezetben nem áll rendelkezésre; a tényleges naptárbetöltést helyi böngészőben kell ellenőrizni.

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
