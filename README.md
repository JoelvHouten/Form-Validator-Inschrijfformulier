# Form Validator

Een lichtgewicht, flexibele JavaScript-formuliervalidator die eenvoudig kan worden toegepast op elk HTML-formulier. Deze validator werkt zonder externe dependencies en ondersteunt een breed scala aan validatieregels.

<span style="color:red">Deze Validator is niet veilig om te gebruiken alleen voor een UI ervaring.</span>

---

## Features

- Werkt op **elk HTML-formulier** met minimale configuratie.  
- Ondersteunt **verschillende inputtypes**: tekst, e-mail, telefoon, select, checkbox, radio, wachtwoord, datum.  
- **Inline foutmeldingen** direct naast elk veld.  
- **Globale formulierfout** die verschijnt wanneer één of meerdere velden ongeldig zijn.  
- Eenvoudig **uitbreidbaar** met nieuwe validatieregels.  

---

## Installatie

1. Voeg het script toe aan je project:

Voeg het script toe onderaan de pagina. Vul bij de PathToFile het pad in naar het validator.js bestand. De rest gaat vanzelf.

```html
<script src="PathToFile"> </script>
```

2. Voeg een formulier toe met een `id`:

```html
<form id="form">
    <input type="text" name="username" validate="required|min:3|nospaces">
    <div class="error"></div>

    <input type="email" name="email" validate="required|email">
    <div class="error"></div>

    <input type="password" id="password" name="password" validate="required|password|min:8">
    <div class="error"></div>

    <input type="password" name="confirmPassword" validate="required|match:password">
    <div class="error"></div>

    <div id="formError" class="d-none">Er zijn fouten in het formulier.</div>

    <button type="submit">Verzenden</button>
</form>
```

---

## Gebruikte validatieregels

| Regel           | Beschrijving                                                                |
|-----------------|-----------------------------------------------------------------------------|
| `required`      | Veld mag niet leeg zijn. Ondersteunt checkbox, radio en select.             |
| `min:N`         | Minimale lengte van N tekens (alleen tekstvelden).                          |
| `max:N`         | Maximale lengte van N tekens (alleen tekstvelden).                          |
| `nospaces`      | Spaties zijn niet toegestaan.                                               |
| `numeric`       | Alleen cijfers toegestaan.                                                  |
| `postcode`      | Nederlandse postcode notatie (bijv. 1234AB of 1234 AB).                     |
| `phone`         | Nederlands telefoonnummer (bijv. 0612345678 of +31612345678).               |
| `email`         | Geldig e-mailadres (bijv. user@example.com).                                |
| `password`      | Wachtwoord moet minstens 1 hoofdletter en 1 cijfer bevatten.                |
| `match:ID`      | Waarde moet overeenkomen met een ander veld (`ID` is het target veld).      |
| `minage:N`      | Minimumleeftijd (in jaren) voor een datumveld.                              |

---

## Hoe werkt het

- Alle inputs met een `validate` attribuut worden automatisch gevalideerd bij het **submitten** van het formulier.  
- Bij **ongeldige invoer** verschijnt een foutmelding naast het veld en wordt een globale foutmelding zichtbaar.  
- Bij **geldige invoer** verdwijnt de foutmelding automatisch tijdens typen (`input`) of bij select/change (`select`, `checkbox`, `radio`).  

---

## Aanpassen en uitbreiden

- Voeg een nieuwe validatieregel toe door een extra `case` toe te voegen in de `switch(ruleName)` binnen de `validateField` functie.  
- Pas de foutmeldingen aan door de teksten in `errorDiv.textContent` te wijzigen.  

---

## Voorbeeld

```html
<input type="text" name="username" validate="required|min:3|nospaces">
<input type="email" name="email" validate="required|email">
<input type="password" id="password" name="password" validate="required|password|min:8">
<input type="password" name="confirmPassword" validate="required|match:password">
```

---

Blok 1 - Opdracht 6



