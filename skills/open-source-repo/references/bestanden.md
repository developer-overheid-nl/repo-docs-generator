# Welk bestand waarvoor

Per bestand dat de generator maakt staat hieronder waar het voor bedoeld is,
voor wie het is, wat erin hoort, wat juist in een ander bestand hoort en wat je
na het genereren nog moet aanvullen. Gebruik dit om de bestanden goed in te
vullen, om bestaande inhoud naar het juiste bestand te verplaatsen en om de
gebruiker te adviseren.

Het belangrijkste onderscheid is dat tussen README.md en CONTRIBUTING.md:

- **README.md** is voor wie het project wil *gebruiken*: wat het is en hoe je
  het installeert en gebruikt.
- **CONTRIBUTING.md** is voor wie het project wil *veranderen*: de
  ontwikkelomgeving, conventies, checks en het proces voor pull requests.

## README.md

**Doel:** de voordeur van het project. Vertelt wat het is, waarom je het
gebruikt en hoe je het installeert en gebruikt.

**Voor wie:** gebruikers en mensen die het project beoordelen. De meeste
bezoekers lezen alleen dit bestand.

**Hoort hierin:**

- Naam, beschrijving en doel van het project
- Features of onderdelen; bestaat het project uit meerdere tools, noem die dan
  bovenaan
- Vereisten, installatie en gebruik, met voorbeelden
- Configuratie die een gebruiker nodig heeft
- Ontwikkelstatus en waar het project live draait
- Eén verwijzing per bestand naar CONTRIBUTING.md, CODE_OF_CONDUCT.md,
  SECURITY.md en LICENSE.md

**Hoort niet hierin:**

- Ontwikkelomgeving, lint- en testcommando's, projectstructuur en conventies →
  CONTRIBUTING.md
- Hoe je een kwetsbaarheid meldt → SECURITY.md
- Wijzigingen per versie → CHANGELOG.md
- De volledige licentietekst → LICENSE.md

**Vuistregel:** heb je het nodig om het project te *gebruiken*, dan hoort het
hier.

**Verzorging:** de README is de eerste indruk van het project. Of iemand het
project gaat gebruiken of eraan gaat bijdragen, beslist die vaak op basis van
deze pagina. Een overzichtelijke en aantrekkelijke README loont dus. Neem er de
tijd voor en lever geen README af die alleen technisch klopt:

- Zeg in de eerste zinnen wat het project is, wat het oplost en voor wie het
  is.
- Gebruik een tabel, schema, video of screenshot als dat het overzicht helpt.
- Geef examples die werken en die een lezer direct kan kopiëren.
- Lees het resultaat als iemand die het project niet kent. Begrijpt die het
  zonder verdere uitleg? Stel de gebruiker verbeteringen voor als dat niet zo
  is.

**Aanvullen:** de secties met **PROJECTSPECIFIEK** (vereisten, installatie,
lokaal draaien) bevatten voorbeelden. Vervang ze door de echte stappen uit het
project.

## CONTRIBUTING.md

**Doel:** het handboek voor wie het project wil veranderen. Vertelt hoe je
bijdraagt, wat er van je verwacht wordt en hoe een wijziging erin komt.

**Voor wie:** bijdragers, intern en extern. GitHub linkt naar dit bestand
wanneer iemand een issue of pull request opent.

**Hoort hierin:**

- Ontwikkelomgeving en lokale setup: dependencies, versies, editor-instellingen
- Projectstructuur: hoe de onderdelen samenhangen en welke bestanden je samen
  moet aanpassen
- Recepten voor wijzigingen die vaak voorkomen
- Code-, commit- en branchconventies, en de taal van commits en pull requests
- Tests en checks die je vóór een pull request draait, en wat CI controleert
- Het proces voor issues, pull requests en review, en wie mag mergen
- Hoe releases en versienummers werken, en of bijdragers CHANGELOG.md bijwerken

**Hoort niet hierin:**

- Wat het project is en hoe je het installeert en gebruikt → README.md
- Hoe je een kwetsbaarheid meldt → SECURITY.md
- Omgangsregels → CODE_OF_CONDUCT.md (verwijs ernaar)

**Vuistregel:** heb je het alleen nodig om het project te *veranderen*, dan
hoort het hier.

**Aanvullen:** de sectie Ontwikkelproces is **PROJECTSPECIFIEK**. Haal de
commando's uit `package.json`, een `Makefile` of de CI-configuratie, en de
conventies uit de git-historie.

## CODE_OF_CONDUCT.md

**Doel:** de omgangsregels in de community en hoe overtredingen worden gemeld
en afgehandeld.

**Voor wie:** iedereen die deelneemt, in issues, pull requests en discussies.

**Hoort hierin:**

- Verwacht en ongewenst gedrag
- Waar je een overtreding meldt
- Hoe de regels worden gehandhaafd

**Hoort niet hierin:**

- Technische regels voor bijdragen → CONTRIBUTING.md
- Kwetsbaarheden melden → SECURITY.md

**Aanvullen:** de sectie Handhaving noemt geen contactadres. Vraag de
gebruiker bij wie meldingen terechtkomen en voeg dat toe.

## SECURITY.md

**Doel:** vertelt hoe je een kwetsbaarheid veilig en vertrouwelijk meldt en wat
je daarna kunt verwachten.

**Voor wie:** securityonderzoekers en gebruikers die een lek vinden.

**Hoort hierin:**

- Het contactadres voor meldingen
- Welke versies securitypatches krijgen
- Welke informatie een melding moet bevatten
- Reactietermijnen en het CVD-beleid

**Hoort niet hierin:**

- Gewone bugs en featureverzoeken → CONTRIBUTING.md (via issues)
- De beveiligingsmaatregelen van de software zelf → README.md of de
  documentatie

**Aanvullen:** de tabel met ondersteunde versies is een voorbeeld (1.x
ondersteund, < 1.0 niet). Pas die aan op de versies die het project echt
uitbrengt en ondersteunt.

## CHANGELOG.md

**Doel:** een overzicht van de belangrijke wijzigingen per versie, volgens
Keep a Changelog en Semantic Versioning.

**Voor wie:** gebruikers die willen weten wat er verandert als ze updaten.

**Hoort hierin:**

- Per versie een datum en de wijzigingen, ingedeeld in Added, Changed,
  Deprecated, Removed, Fixed en Security
- Een sectie Unreleased voor wijzigingen die nog niet zijn uitgebracht

**Hoort niet hierin:**

- Een volledige commitlog, of interne refactors die gebruikers niet merken
- Hoe je bijdraagt of releases maakt → CONTRIBUTING.md

**Aanvullen:** de template bevat verzonnen voorbeeldversies (1.0.0, 0.2.0 en
0.1.0). Vervang die door de echte historie uit git-tags en releases, of laat
alleen een sectie Unreleased staan als er nog geen release is.

## LICENSE.md

**Doel:** legt vast wie de auteursrechthebbende is en onder welke licentie het
project valt, en vermeldt dat het project REUSE volgt.

**Voor wie:** gebruikers en organisaties die willen weten wat ze met de code
mogen. GitHub gebruikt dit bestand om de licentie te tonen.

**Hoort hierin:**

- De copyrighthouder en de volledige licentietekst
- De alinea die naar REUSE verwijst

**Hoort niet hierin:**

- Licenties van code van derden → `REUSE.toml` en de map `LICENSES/`
- Voorwaarden voor bijdragen → CONTRIBUTING.md

**Aanvullen:** niets. Pas de licentietekst niet met de hand aan.

## publiccode.yml

**Doel:** machineleesbare metadata, zodat overheden de software kunnen vinden
en hergebruiken (Standard for Public Code).

**Voor wie:** catalogi en crawlers, niet mensen.

**Hoort hierin:**

- Naam, URL's, beschrijvingen, softwaretype en ontwikkelstatus
- Licentie, copyrighthouder en contactpersonen voor onderhoud

**Hoort niet hierin:**

- Installatie- en gebruiksinstructies → README.md
- Lange teksten uit de README; de `longDescription` is een samenvatting voor
  de catalogus

**Aanvullen:** bestaat er al een `publiccode.yml`, werk die dan bij in plaats
van hem te overschrijven.
