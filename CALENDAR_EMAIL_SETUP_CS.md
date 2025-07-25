# Manuál: Zprovoznění kalendáře s emailovým propojením

## Přehled

Tento manuál vám pomůže nastavit automatické posílání emailů při registraci na události v kalendáři vašeho webu. Pokrývá tři hlavní způsoby propojení:

1. **EmailJS** - Nejjednodušší řešení pro začátečníky
2. **Zapier** - Automatizace bez programování
3. **Supabase + EmailJS** - Pokročilé řešení s databází

---

## 🚀 Metoda 1: EmailJS (Doporučeno pro začátečníky)

### Krok 1: Registrace na EmailJS

1. Jděte na [emailjs.com](https://emailjs.com)
2. Vytvořte si účet (zdarma do 200 emailů/měsíc)
3. Přihlaste se do dashboardu

### Krok 2: Nastavení emailové služby

1. V dashboardu klikněte na **"Email Services"**
2. Klikněte **"Add New Service"**
3. Vyberte váš email provider (Gmail, Outlook, atd.)
4. Zadejte vaše emailové údaje
5. Poznamenejte si **Service ID**

### Krok 3: Vytvoření emailové šablony

1. Klikněte na **"Email Templates"**
2. Klikněte **"Create New Template"**
3. Nastavte šablonu:

```html
Subject: Registrace na událost - {{event_name}}

Ahoj {{user_name}},

děkujeme za registraci na událost "{{event_name}}".

Detaily události:
- Název: {{event_name}}
- Datum: {{event_date}}
- Email: {{user_email}}
- Telefon: {{user_phone}}
- Zpráva: {{message}}

S pozdravem,
Tým Nech Mě Růst

---
Automaticky generovaný email
```

4. Poznamenejte si **Template ID**

### Krok 4: Získání API klíčů

1. Jděte do **"Account"** → **"API Keys"**
2. Poznamenejte si **Public Key**

### Krok 5: Instalace EmailJS

V terminálu spusťte:
```bash
npm install @emailjs/browser
```

### Krok 6: Aktualizace kódu

Vytvořte soubor `src/lib/email.ts`:

```typescript
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export const sendEventRegistrationEmail = async (data: {
  user_name: string;
  user_email: string;
  user_phone: string;
  event_name: string;
  event_date: string;
  message?: string;
}) => {
  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        user_name: data.user_name,
        user_email: data.user_email,
        user_phone: data.user_phone,
        event_name: data.event_name,
        event_date: data.event_date,
        message: data.message || 'Žádná zpráva',
        to_email: data.user_email, // Email účastníka
        admin_email: 'admin@nechmerust.org' // Váš email
      },
      EMAILJS_PUBLIC_KEY
    );
    
    console.log('Email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};
```

### Krok 7: Integrace s registračním formulářem

Aktualizujte `EventRegistrationForm.tsx`:

```typescript
import { sendEventRegistrationEmail } from '@/lib/email';

// V handleSubmit funkci přidejte:
const emailSent = await sendEventRegistrationEmail({
  user_name: formData.name,
  user_email: formData.email,
  user_phone: formData.phone,
  event_name: event.title,
  event_date: event.date,
  message: formData.message
});

if (emailSent) {
  toast({
    title: t('events.register_form.success'),
    description: "Potvrzovací email byl odeslán na vaši adresu.",
  });
} else {
  toast({
    title: "Registrace úspěšná",
    description: "Email se nepodařilo odeslat, ale registrace proběhla.",
    variant: "destructive",
  });
}
```

---

## ⚡ Metoda 2: Zapier (Bez programování)

### Krok 1: Vytvoření Zap

1. Jděte na [zapier.com](https://zapier.com)
2. Vytvořte účet
3. Klikněte **"Create Zap"**

### Krok 2: Nastavení Triggeru

1. Jako trigger vyberte **"Webhooks by Zapier"**
2. Vyberte **"Catch Hook"**
3. Zkopírujte si **Webhook URL**

### Krok 3: Nastavení Action

1. Jako action vyberte **"Email by Zapier"** nebo **"Gmail"**
2. Nastavte:
   - **To**: Email z webhook dat
   - **Subject**: "Registrace na událost"
   - **Body**: Použijte data z webhooku

### Krok 4: Integrace Zapier webhooku

Vytvořte `src/lib/zapier.ts`:

```typescript
export const sendToZapier = async (webhookUrl: string, data: any) => {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: "nechmerust_calendar"
      }),
    });
    
    return true;
  } catch (error) {
    console.error("Zapier webhook error:", error);
    return false;
  }
};
```

### Krok 5: Přidání Zapier nastavení

V `Support.tsx` přidejte pole pro Zapier webhook:

```typescript
const [zapierWebhook, setZapierWebhook] = useState(
  localStorage.getItem('zapier_webhook') || ''
);

// Komponenta pro nastavení
<Card>
  <CardHeader>
    <CardTitle>Zapier Webhook URL</CardTitle>
  </CardHeader>
  <CardContent>
    <input
      type="url"
      value={zapierWebhook}
      onChange={(e) => {
        setZapierWebhook(e.target.value);
        localStorage.setItem('zapier_webhook', e.target.value);
      }}
      placeholder="https://hooks.zapier.com/hooks/catch/..."
      className="w-full p-2 border rounded"
    />
  </CardContent>
</Card>
```

---

## 🗄️ Metoda 3: Supabase + Email (Pokročilé)

### Krok 1: Nastavení Supabase

1. Jděte na [supabase.com](https://supabase.com)
2. Vytvořte nový projekt
3. Poznamenejte si **URL** a **API Key**

### Krok 2: Vytvoření tabulky

V Supabase SQL editoru:

```sql
-- Vytvoření tabulky pro registrace
CREATE TABLE event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_date TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS politiky
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for all users" ON event_registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select for all users" ON event_registrations
  FOR SELECT USING (true);
```

### Krok 3: Instalace Supabase

```bash
npm install @supabase/supabase-js
```

### Krok 4: Konfigurace Supabase

Vytvořte `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const saveRegistration = async (data: {
  event_name: string;
  event_date: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  message?: string;
}) => {
  const { data: result, error } = await supabase
    .from('event_registrations')
    .insert([data]);
    
  if (error) {
    console.error('Supabase error:', error);
    return false;
  }
  
  return true;
};
```

### Krok 5: Edge Function pro emaily

V Supabase vytvořte Edge Function:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const handler = async (req: Request): Promise<Response> => {
  const { user_email, user_name, event_name, event_date } = await req.json()

  // Zde implementujte posílání emailů pomocí externí služby
  // Například SendGrid, Mailgun, nebo SMTP
  
  return new Response(
    JSON.stringify({ success: true }),
    { headers: { "Content-Type": "application/json" } }
  )
}

serve(handler)
```

---

## 📧 Konfigurace emailových šablon

### Šablona pro účastníka

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Potvrzení registrace</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #2d4a3e;">Děkujeme za registraci! 🌱</h2>
    
    <p>Ahoj <strong>{{user_name}}</strong>,</p>
    
    <p>Vaše registrace na událost byla úspěšně přijata.</p>
    
    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Detaily události:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Událost:</strong> {{event_name}}</li>
        <li><strong>Datum:</strong> {{event_date}}</li>
        <li><strong>Email:</strong> {{user_email}}</li>
        <li><strong>Telefon:</strong> {{user_phone}}</li>
      </ul>
    </div>
    
    <p>Těšíme se na setkání s vámi!</p>
    
    <p style="color: #666; font-size: 0.9em;">
      S pozdravem,<br>
      Tým Nech Mě Růst z.s.
    </p>
  </div>
</body>
</html>
```

### Šablona pro administrátory

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Nová registrace</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #2d4a3e;">Nová registrace na událost 📝</h2>
    
    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
      <h3 style="margin-top: 0;">Detaily registrace:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Událost:</strong> {{event_name}}</li>
        <li><strong>Datum události:</strong> {{event_date}}</li>
        <li><strong>Jméno:</strong> {{user_name}}</li>
        <li><strong>Email:</strong> {{user_email}}</li>
        <li><strong>Telefon:</strong> {{user_phone}}</li>
        <li><strong>Zpráva:</strong> {{message}}</li>
        <li><strong>Čas registrace:</strong> {{timestamp}}</li>
      </ul>
    </div>
  </div>
</body>
</html>
```

---

## 🔧 Testování a ladění

### 1. Testování EmailJS

```typescript
// Testovací funkce
const testEmail = async () => {
  const result = await sendEventRegistrationEmail({
    user_name: "Test Uživatel",
    user_email: "test@example.com",
    user_phone: "+420 123 456 789",
    event_name: "Testovací událost",
    event_date: "2024-01-15",
    message: "Testovací zpráva"
  });
  
  console.log("Email test result:", result);
};
```

### 2. Ladění Zapier

- Kontrolujte **Zap History** v Zapier dashboardu
- Použijte **Test** funkci před publikováním
- Zkontrolujte formát dat v webhooku

### 3. Monitoring

```typescript
// Přidejte logování
const logEmailEvent = (type: string, success: boolean, data: any) => {
  console.log(`Email ${type}:`, {
    success,
    timestamp: new Date().toISOString(),
    data
  });
  
  // Volitelně uložte do localStorage pro ladění
  const logs = JSON.parse(localStorage.getItem('email_logs') || '[]');
  logs.push({ type, success, data, timestamp: new Date().toISOString() });
  localStorage.setItem('email_logs', JSON.stringify(logs.slice(-50))); // Posledních 50 logů
};
```

---

## 📱 Mobilní optimalizace

Ujistěte se, že emailové šablony jsou responzivní:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  @media only screen and (max-width: 600px) {
    .container {
      width: 100% !important;
      padding: 10px !important;
    }
  }
</style>
```

---

## 🔒 Bezpečnost

### 1. Ochrana API klíčů

- Nikdy neukládejte citlivé klíče v kódu
- Použijte environment proměnné
- Pro EmailJS používejte pouze **Public Key**

### 2. Validace dat

```typescript
const validateRegistrationData = (data: any) => {
  const required = ['user_name', 'user_email', 'event_name', 'event_date'];
  
  for (const field of required) {
    if (!data[field] || data[field].trim() === '') {
      throw new Error(`Povinné pole ${field} chybí`);
    }
  }
  
  // Validace emailu
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.user_email)) {
    throw new Error('Neplatný formát emailu');
  }
  
  return true;
};
```

---

## 🎯 Doporučení pro produkci

1. **Začněte s EmailJS** - nejjednodušší implementace
2. **Přidejte backup** - kombinujte více metod
3. **Sledujte limity** - EmailJS má limit 200 emailů/měsíc zdarma
4. **Testujte důkladně** - před spuštěním otestujte všechny scénáře
5. **Mějte fallback** - pokud email selže, uložte registraci lokálně

---

## 📞 Podpora

Pokud narazíte na problémy:

1. Zkontrolujte browser konzoli pro chyby
2. Ověřte API klíče a konfigurace
3. Otestujte připojení k internetu
4. Kontaktujte podporu příslušné služby

---

**Poznámka:** Tento manuál předpokládá základní znalost React/TypeScript. Pro pokročilé funkce doporučujeme konzultaci s vývojářem.