---
title: Ismétlődő eRecept – Az adminisztratív gát áttörése
date: '2025-02-03'
tldr: A krónikus betegek havi receptíratása felesleges terhet ró az orvosra és a betegre is. Az ismétlődő eRecept (eRD) bevezetése a legkisebb beavatkozás, amivel orvosi munkaórák ezreit szabadíthatjuk fel.
status: Kutatás
linkedin: https://www.linkedin.com/in/ferenc-mile-65038446
bluesky: https://bsky.app/profile/fecz0.bsky.social
---

# Hogyan szüntessük meg a „receptgyárat”?

A háziorvosi rendelőkben zajló munka jelentős része nem diagnosztika, hanem tiszta adminisztráció. A leggyakoribb ilyen feladat a stabil állapotú, krónikus betegek gyógyszereinek havi vagy negyedéves újraírása. Ez a folyamat jelenleg manuális, repetitív és feleslegesen terheli a rendszert.

## A probléma beteg szemmel

A havi receptírás egy felesleges stresszforrás: a telefont vagy felveszik, vagy nem, az e-mailekre ritkán jön azonnali válasz, a rendelőbe pedig senki sem szeretne bemenni csak azért, hogy egy digitális bejegyzést kérjen a már évek óta szedett gyógyszeréhez. Ez nem ellátás, hanem logisztikai akadálypálya.

## A probléma orvos szemmel: Digitális póráz

Bár az EESZT és az e-recept már működik, a logikai modell maradt a régi: a betegnek minden ciklusban interakcióba kell lépnie az orvossal, hogy az orvos „kattintson egyet”. Ez havonta több millió olyan tranzakciót jelent az országban, ahol az orvosi szaktudás hozzáadott értéke minimális, a hiba lehetősége (elírás, elfelejtett hívás) viszont valós.



## Fokozatos megoldási javaslat

::incremental-steps

::step{number="0" title="Jelenlegi állapot"}
A beteg havonta/negyedévente jelzi igényét. Az orvos vagy asszisztens manuálisan rögzíti ugyanazt az adatot az EESZT-be. Folyamatos telefoncsörgés, megszakított rendelési idő.
::

::step{number="1" title="Ismétlődő eRecept keretrendszer"}
A brit NHS (eRD) mintájára egy "keret-recept" bevezetése. Az orvos nem 1, hanem 12 havi adagot engedélyez egyszerre a felhőben, amit a beteg havonta hívhat le a patikában.

**Konkrét intézkedések:**
- EESZT logikai fejlesztés: ismétlődő kiváltási jogosultság kezelése.
- Receptíró szoftverek (Meditor, VisualDoki stb.) frissítése a keret-alapú felíráshoz.
- Patikai rendszerek felkészítése a részleges, ütemezett lehívásra.
::

::step{number="2" title="EgészségAblak integráció"}
A technológia aktív segítőtárssá válik. A beteg nem az utolsó szemnél kap észbe, hanem a rendszertől kap értesítést.

**Konkrét intézkedések:**
- Push és email értesítések: „5 nap múlva elfogy a gyógyszered".
- "Egygombos" lehívás az alkalmazáson belül a patikai sorban állás előtt.
- Automatikus emlékeztető a keret lejárta előtti kötelező orvosi felülvizsgálatra.
::

::step{number="3" title="AI döntéstámogatás"}
Az orvos tehermentesítése a rutinellenőrzés alól. A gép csak akkor riaszt, ha valódi kockázatot lát.

**Konkrét intézkedések:**
- Automatikus interakció-vizsgálat (több párhuzamos gyógyszer esetén).
- Rizikóalapú szűrés: ha a beteg nem váltja ki a gyógyszert, a rendszer jelzi az orvosnak.
- Adatvezérelt javaslat a keret megújítására a legfrissebb laboreredmények alapján.
::

::step{number="4" title="Automatizált kiadás"}
A fizikai hozzáférés egyszerűsítése ott is, ahol nincs patika vagy rendelési idő.

**Konkrét intézkedések:**
- Gyógyszerkiadó automaták (kioszkok) telepítése kistelepülésekre vagy 0-24-es pontokra.
- QR-kód alapú azonosítás az EgészségAblakból.
- Telemedicinális jóváhagyás soron kívüli igény esetén.
::

::

## Miért ez az első lépés?

Ez a javaslat nem igényel új kórházépítést vagy több ezer új orvost. Ez egy **folyamat-optimalizálás**, amely a meglévő digitális infrastruktúrát használja okosabban.

**Mérhető eredmények:**
- **Adminisztrációs idő:** A receptírással töltött idő 70-80%-os csökkenése egy átlagos praxisban.
- **Betegélmény:** Megszűnő várólisták és kevesebb felesleges orvos-beteg találkozó.
- **Biztonság:** Kevesebb manuális adatrögzítési hiba és jobb terápiás hűség (adherencia).

## Források és nemzetközi példák

* **NHS England:** [Az NHS BSA hivatalos oldala a folyamat leírásával, videókkal és letölthető kézikönyvvel](https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/prescribing-and-dispensing/electronic-repeat-dispensing-erd)
* **e-Estonia:** [Átfogó leírás az észt rendszerről, amely 100%-ban digitális receptkezelésre állt át](https://e-estonia.com/solutions/e-health-2/e-prescription/)
* **Országos Kórházi Főigazgatóság:** [Hivatalos statisztikák és fejlesztési irányok](https://enkk.hu/hmr/index.php/hmr-beszamolok)
* **MOK:** [MOK Orvosok Lapja](https://orvosoklapja.mok.hu/category/jogoskerdesek/)

---

A megoldás technikai részletei kidolgozottak. A bevezetéshez nem technológiai áttörésre, hanem politikai akaratra és a finanszírozási protokollok minimális módosítására van szükség.