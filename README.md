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
- Időpontfoglalás / egyeztetési kérés
- ÁSZF
- Adatkezelés
- Impresszum
- Együttműködési feltételek

## Űrlapok

Az űrlapok ellenőrzik a kötelező mezőket. Beállított `email` hiányában a felhasználó letöltheti az üzenetét szöveges piszkozatként. Saját e-mail-cím beállítása után a levelezőprogramban nyitnak meg előre kitöltött levelet. Automatikus küldés, szerveroldali tárolás és foglalási naptár nincs csatlakoztatva. Az időpontkérés önmagában nem foglalás.

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
