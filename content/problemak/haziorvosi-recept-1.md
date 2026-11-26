---
title: Ismétlődő eRecept – Az adminisztratív gát áttörése
date: '2025-02-03'
updated: '2026-11-26'
topics:
  - Közös rendszereink
tldr: A krónikus betegek rendszeres, sokszor negyedéves receptíratása felesleges terhet ró az orvosra és a betegre is. Az ismétlődő eRecept (eRD) bevezetése a legkisebb beavatkozás, amivel becslésem szerint orvosi munkaórák ezrei szabadíthatók fel.
status: Kutatás
linkedin: https://www.linkedin.com/in/ferenc-mile-65038446
bluesky: https://bsky.app/profile/fecz0.bsky.social
---

*Frissítés (2026. november 26.): pontosítottam a hatályos szabályt, a számok mellé forrást tettem, és a becsléseket külön jelöltem.*

## Hogyan szüntessük meg a „receptgyárat"?

A háziorvosi rendelőkben zajló munka jelentős része nem diagnosztika, hanem tiszta adminisztráció. A leggyakoribb ilyen feladat a stabil állapotú, krónikus betegek gyógyszereinek havi vagy negyedéves újraírása. Ez a folyamat jelenleg manuális, repetitív és feleslegesen terheli a rendszert.

## Mit enged ma a szabály?

Krónikus betegségben, ha a feltételek teljesülnek, az orvos legfeljebb 3 hónapra elegendő gyógyszert rendelhet, főszabály szerint vényenként 30 napra elegendő mennyiséggel. Egyetlen vényen legfeljebb egy évre elegendőt csak kivételesen írhat fel, ha ezt a beteg különleges élethelyzete indokolja ([44/2004. (IV. 28.) ESzCsM rendelet, 11. § (3)–(4)](https://net.jogtar.hu/jogszabaly?docid=a0400044.esc)).

Bizonyos esetekben 2027. január 1-jétől gyógyszerész és okleveles kiterjesztett hatáskörű ápoló is felírhat majd gyógyszert ([9/2026. (III. 25.) BM rendelet](https://njt.jog.gov.hu/jogszabaly/2026-9-20-0A), [a halasztásról](https://index.hu/belfold/2026/09/16/magyar-kozlony-egeszsegugy-rendelet-hegedus-zsolt/)).

## A probléma beteg szemmel

A rendszeres receptíratás felesleges stresszforrás: a telefont vagy felveszik, vagy nem, az e-mailekre ritkán jön azonnali válasz, a rendelőbe pedig senki sem szeretne bemenni csak azért, hogy egy digitális bejegyzést kérjen a már évek óta szedett gyógyszeréhez. Ez nem ellátás, hanem logisztikai akadálypálya.

## A probléma orvos szemmel: Digitális póráz

Bár az EESZT és az e-recept már működik, a logikai modell maradt a régi: a betegnek minden ciklusban interakcióba kell lépnie az orvossal, hogy az orvos „kattintson egyet”. Az [Egészségvonal szerint](https://egeszsegvonal.gov.hu/hova-forduljak/eeszt/eeszt.html) naponta átlagosan 800 ezer új eReceptet állítanak ki (az adat évét az oldal nem adja meg). Arra nem találtam nyilvános adatot, hogy ebből mennyi a változatlan, ismételt felírás. Becslésem szerint sok olyan, ahol az orvosi szaktudás hozzáadott értéke minimális, a hiba lehetősége (elírás, elfelejtett hívás) viszont valós.



## Fokozatos megoldási javaslat

::incremental-steps

::step-item{number="0" title="Jelenlegi állapot"}
A beteg havonta/negyedévente jelzi igényét. Az orvos vagy asszisztens manuálisan rögzíti ugyanazt az adatot az EESZT-be. Folyamatos telefoncsörgés, megszakított rendelési idő.
::

::step-item{number="1" title="Ismétlődő eRecept keretrendszer"}
A brit NHS (eRD) mintájára egy "keret-recept" bevezetése. Az orvos egyszerre 12 havi adagot engedélyez a felhőben, amit a beteg havonta hívhat le a patikában. Ma az egyéves ellátás kivétel, a javaslat szerint stabil krónikus betegeknél ez lenne a rendes út.

**Konkrét intézkedések:**
- EESZT logikai fejlesztés: ismétlődő kiváltási jogosultság kezelése.
- Receptíró szoftverek (Meditor, VisualDoki stb.) frissítése a keret-alapú felíráshoz.
- Patikai rendszerek felkészítése a részleges, ütemezett lehívásra.
::

::step-item{number="2" title="EgészségAblak integráció"}
A technológia aktív segítőtárssá válik. A beteg nem az utolsó szemnél kap észbe, hanem a rendszertől kap értesítést.

**Konkrét intézkedések:**
- Push és email értesítések: „5 nap múlva elfogy a gyógyszered".
- "Egygombos" lehívás az alkalmazáson belül a patikai sorban állás előtt.
- Automatikus emlékeztető a keret lejárta előtti kötelező orvosi felülvizsgálatra.
::

::step-item{number="3" title="AI döntéstámogatás"}
Az orvos tehermentesítése a rutinellenőrzés alól. A gép csak akkor riaszt, ha valódi kockázatot lát.

**Konkrét intézkedések:**
- Automatikus interakció-vizsgálat (több párhuzamos gyógyszer esetén).
- Rizikóalapú szűrés: ha a beteg nem váltja ki a gyógyszert, a rendszer jelzi az orvosnak.
- Adatvezérelt javaslat a keret megújítására a legfrissebb laboreredmények alapján.
::

::step-item{number="4" title="Automatizált kiadás"}
A fizikai hozzáférés egyszerűsítése ott is, ahol nincs patika vagy rendelési idő.

**Konkrét intézkedések:**
- Gyógyszerkiadó automaták (kioszkok) telepítése kistelepülésekre vagy 0-24-es pontokra.
- QR-kód alapú azonosítás az EgészségAblakból.
- Telemedicinális jóváhagyás soron kívüli igény esetén.
::

::

## Miért ez az első lépés?

Ez a javaslat nem igényel új kórházépítést vagy több ezer új orvost. Ez egy **folyamat-optimalizálás**, amely a meglévő digitális infrastruktúrát használja okosabban.

**Mit várok tőle, és mit érdemes mérni:**
- **Adminisztrációs idő:** Magyar adatot nem találtam. Angliában a Department of Health 2002-es becslése szerint évi 2,7 millió háziorvosi munkaóra takarítható meg, ha az ismételt receptek 80%-a ismétlődő kiadásra áll át. [Az ezt idéző jelentés](https://www.nhsbsa.nhs.uk/sites/default/files/2018-05/Repeat%20Dispensing%20Report%20-%20Wessex%20Case%20Study.pdf) két praxis megfigyelése alapján napi 46 perc háziorvosi időt tart megtakaríthatónak.
- **Betegélmény:** Várakozásom szerint rövidebb sorok és kevesebb felesleges orvos-beteg találkozó.
- **Biztonság:** Várakozásom szerint kevesebb manuális adatrögzítési hiba és jobb terápiás hűség (adherencia).

## Források és nemzetközi példák

* **NHS England:** [Az NHS BSA hivatalos oldala a folyamat leírásával, videókkal és letölthető kézikönyvvel](https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/prescribing-and-dispensing/electronic-repeat-dispensing-erd)
* **Wessex AHSN és NHS BSA:** [Jelentés az ismétlődő elektronikus gyógyszerkiadásra való átállásról (PDF, angol)](https://www.nhsbsa.nhs.uk/sites/default/files/2018-05/Repeat%20Dispensing%20Report%20-%20Wessex%20Case%20Study.pdf)
* **e-Estonia:** [Átfogó leírás az észt rendszerről, amely 100%-ban digitális receptkezelésre állt át](https://e-estonia.com/service/e-health/e-prescription/)
* **Magyar szabályozás:** [44/2004. (IV. 28.) ESzCsM rendelet](https://net.jogtar.hu/jogszabaly?docid=a0400044.esc) és [9/2026. (III. 25.) BM rendelet](https://njt.jog.gov.hu/jogszabaly/2026-9-20-0A)
* **Egészségvonal:** [Az EESZT bemutatása és forgalmi adatai](https://egeszsegvonal.gov.hu/hova-forduljak/eeszt/eeszt.html)

---

A megoldás technikai részletei kidolgozottak. A bevezetéshez nem technológiai áttörésre, hanem politikai akaratra, valamint a rendelet és a finanszírozási protokollok módosítására van szükség.