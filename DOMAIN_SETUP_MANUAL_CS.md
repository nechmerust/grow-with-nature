# Kompletní manuál pro zprovoznění webu Nech Mě Růst s vlastní doménou

## Obsah
1. [Přehled projektu](#přehled-projektu)
2. [Požadavky](#požadavky)
3. [Krok za krokem - nasazení na Lovable](#krok-za-krokem---nasazení-na-lovable)
4. [Připojení vlastní domény](#připojení-vlastní-domény)
5. [Alternatívní nasazení](#alternatívní-nasazení)
6. [Údržba a aktualizace](#údržba-a-aktualizace)
7. [Řešení problémů](#řešení-problémů)
8. [Podpora](#podpora)

## Přehled projektu

Váš web pro Nech Mě Růst je postavený na moderních technologiích:
- **React 18** - Pro interaktivní uživatelské rozhraní
- **TypeScript** - Pro bezpečný a udržitelný kód
- **Tailwind CSS** - Pro krásný a responzivní design
- **Vite** - Pro rychlý vývoj a build
- **React Big Calendar** - Pro funkční kalendář událostí
- **React i18next** - Pro dvojjazyčnost (čeština/angličtina)

### Funkce webu:
- 📱 Plně responzivní design (mobil, tablet, desktop)
- 🌍 Dvojjazyčná podpora (čeština/angličtina)
- 📅 Interaktivní kalendář událostí s registrací
- 📧 Kontaktní formuláře
- 🎨 Přírodní design inspirovaný lesem a růstem
- ⚡ Rychlé načítání a moderní uživatelský zážitek

## Požadavky

### Pro nasazení na Lovable (doporučeno):
- Účet na [Lovable.dev](https://lovable.dev)
- Vlastní doména (volitelné)
- Základní znalost práce s doménami

### Pro vlastní hosting:
- Node.js verze 18 nebo vyšší
- npm nebo yarn
- Webový hosting podporující statické soubory
- Základní znalost příkazové řádky

## Krok za krokem - nasazení na Lovable

### 1. Publikování na Lovable (nejjednodušší způsob)

1. **Otevřete váš Lovable projekt**
   - Jděte na [https://lovable.dev/projects/6c9b4385-07c7-43b9-9d56-2d4ce4314035](https://lovable.dev/projects/6c9b4385-07c7-43b9-9d56-2d4ce4314035)

2. **Publikujte web**
   - Klikněte na tlačítko "Share" v pravém horním rohu
   - Vyberte "Publish"
   - Váš web bude dostupný na adrese typu: `https://your-project.lovable.app`

3. **Ověřte funkčnost**
   - Otevřete publikovanou URL
   - Ověřte, že všechny sekce fungují správně
   - Vyzkoušejte přepínání jazyků
   - Otestujte kalendář událostí
   - Vyzkoušejte formuláře

### 2. Základní konfigurace

Po publikování zkontrolujte:
- ✅ Responzivní design na všech zařízeních
- ✅ Funkčnost kalendáře
- ✅ Přepínání jazyků
- ✅ Kontaktní formuláře
- ✅ Rychlost načítání

## Připojení vlastní domény

### Krok 1: Získání domény
1. Zaregistrujte si doménu u registrátora (např. Wedos, Forpsi, GoDaddy)
2. Doporučená doména: `nechmerust.cz` nebo `nechmerust.org`

### Krok 2: Připojení domény v Lovable

1. **Přejděte do nastavení projektu**
   - V Lovable projektu klikněte na "Settings"
   - Vyberte záložku "Domains"

2. **Přidejte doménu**
   - Klikněte "Connect Domain"
   - Zadejte vaši doménu (např. `nechmerust.cz`)
   - Lovable vám poskytne DNS záznamy pro nastavení

### Krok 3: Konfigurace DNS u registrátora

**DŮLEŽITÉ:** Tyto záznamy nastavte u vašeho doménového registrátora.

Přidejte následující DNS záznamy:

#### A záznamy (pro root doménu):
```
Typ: A
Název: @
Hodnota: 185.158.133.1
TTL: 3600
```

#### A záznamy (pro www subdoménu):
```
Typ: A
Název: www
Hodnota: 185.158.133.1
TTL: 3600
```

#### Příklad pro nejčastější registrátory:

**Wedos.cz:**
1. Přihlaste se do zákaznického centra
2. Jděte na "Domény" → vaše doména → "DNS záznamy"
3. Přidejte A záznamy jak je uvedeno výše

**Forpsi.com:**
1. Přihlaste se do administrace
2. Domény → Správa DNS
3. Přidejte nové záznamy typu A

**GoDaddy:**
1. Přihlaste se do účtu
2. DNS Management
3. Přidejte A záznamy

### Krok 4: Ověření a čekání na propagaci

1. **Propagace DNS**
   - DNS změny mohou trvat 24-48 hodin
   - Můžete kontrolovat stav na [DNSChecker.org](https://dnschecker.org)

2. **SSL certifikát**
   - Lovable automaticky vygeneruje SSL certifikát
   - Váš web bude dostupný přes HTTPS

3. **Finální ověření**
   - Zkuste navštívit vaši doménu
   - Ověřte, že funguje jak `http://vasedomena.cz` tak `http://www.vasedomena.cz`
   - Zkontrolujte, že se stránka automaticky přesměruje na HTTPS

## Alternatívní nasazení

### Vlastní hosting (pokročilé)

Pokud chcete hostovat web sami:

#### 1. Stažení kódu
```bash
# Exportujte projekt na GitHub přes Lovable
# Potom naklonujte repository
git clone YOUR_GITHUB_URL
cd your-project-name
```

#### 2. Instalace závislostí
```bash
npm install
```

#### 3. Build pro produkci
```bash
npm run build
```

#### 4. Upload na hosting
- Nahrajte obsah složky `dist/` na váš webový hosting
- Ujistěte se, že je nakonfigurován pro Single Page Application (SPA)

#### 5. Konfigurace serveru
Přidejte `.htaccess` soubor (pro Apache) nebo nginx konfiguraci pro správné fungování React routeru.

**Příklad .htaccess:**
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### Hosting na Netlify/Vercel

#### Netlify:
1. Připojte GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Přidejte přesměrování pro SPA

#### Vercel:
1. Importujte z GitHubu
2. Framework Preset: Vite
3. Automatické nasazení při push

## Údržba a aktualizace

### Aktualizace obsahu
1. **Texty a překlady**: Upravte soubory v `src/i18n/locales/`
2. **Události**: Aktualizujte data v `src/components/Events.tsx`
3. **Kontaktní informace**: Upravte v `src/components/Contact.tsx`
4. **Barvy a design**: Upravte v `src/index.css` a `tailwind.config.ts`

### Pravidelná údržba
- Kontrolujte funkčnost formulářů
- Aktualizujte události v kalendáři
- Zálohujte důležitá data
- Sledujte výkon webu

### Aktualizace bezpečnosti
- Pravidelně aktualizujte závislosti: `npm update`
- Sledujte bezpečnostní upozornění
- Používejte HTTPS vždy

## Řešení problémů

### Časté problémy a řešení:

#### 1. Doména se nepropaguje
- **Problém**: Doména neukazuje na správný web
- **Řešení**: 
  - Zkontrolujte DNS záznamy u registrátora
  - Počkejte až 48 hodin na propagaci
  - Použijte [DNSChecker.org](https://dnschecker.org) pro kontrolu

#### 2. SSL certifikát nefunguje
- **Problém**: Web ukazuje "nezabezpečené připojení"
- **Řešení**:
  - Počkejte 24 hodin po nastavení DNS
  - Zkontrolujte, že A záznamy ukazují správně
  - Kontaktujte Lovable support

#### 3. Kalendář se nenačítá
- **Problém**: Kalendář událostí je prázdný
- **Řešení**:
  - Zkontrolujte konzoli prohlížeče (F12)
  - Ověřte připojení k internetu
  - Aktualizujte stránku

#### 4. Překlady nefungují
- **Problém**: Přepínání jazyka nefunguje
- **Řešení**:
  - Vymažte cache prohlížeče
  - Zkontrolujte, že jsou všechny jazykové soubory správně

#### 5. Formuláře neodesílají
- **Problém**: Kontaktní formulář neodešle zprávu
- **Řešení**:
  - Implementujte backend pro zpracování formulářů
  - Nebo použijte služby jako Formspree, Netlify Forms

### Kontrolní seznam při problémech:
- [ ] Vymazat cache prohlížeče
- [ ] Zkontrolovat konzoli (F12) pro chyby
- [ ] Ověřit DNS záznamy
- [ ] Zkusit jiný prohlížeč
- [ ] Zkontrolovat mobilní verzi
- [ ] Otestovat různé sekce webu

## Pokročilé možnosti

### Integrace s backend systémy
- **Newsletter**: Integrace s MailChimp nebo ConvertKit
- **Platby**: Přidání PayPal nebo Stripe pro platby za události
- **CMS**: Připojení Strapi nebo Sanity pro snadnou správu obsahu
- **Analytics**: Google Analytics 4 pro sledování návštěvníků

### SEO optimalizace
- Přidání meta tagů pro lepší viditelnost v Google
- Strukturovaná data pro události
- Sitemap.xml pro vyhledávače
- Open Graph tagy pro sociální sítě

### Výkonnost
- Optimalizace obrázků
- Lazy loading pro rychlejší načítání
- CDN pro globální rychlost
- Monitoring výkonu

## Podpora

### Lovable podpora
- **Dokumentace**: [docs.lovable.dev](https://docs.lovable.dev)
- **Discord komunita**: [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Email podpora**: Na webu Lovable

### Technická podpora webu
Pro technické otázky týkající se vašeho webu kontaktujte vývojáře nebo použijte:
- GitHub Issues (pokud máte repository)
- Dokumentace React, Tailwind CSS
- Stack Overflow pro programátorské otázky

### Doporučené zdroje
- **React dokumentace**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **TypeScript**: [typescriptlang.org](https://typescriptlang.org)

---

## Závěr

Tento manuál vás provede celým procesem zprovoznění webu Nech Mě Růst. Web je navržen tak, aby byl snadno udržitelný a rozšiřitelný. 

**Tip**: Začněte s publikováním na Lovable a později případně přejděte na vlastní hosting, pokud budete potřebovat více pokročilých funkcí.

Váš web je připraven růst společně s vaší organizací! 🌱

---

*Vytvořeno s láskou k přírodě a technologiím • © 2025 Nech Mě Růst*