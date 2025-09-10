// Toewijzen van de variabelen voor het formulier, validate elementen, en error div
const form = document.getElementById("form");
const inputs = document.querySelectorAll("[validate]");
const formError = document.getElementById("formError");

// Vinden van de error div ook als deze verder staat dan het eerst volgende sibling element
function getErrorDiv(input) {
    let sibling = input.nextElementSibling;
    while (sibling) {
        if (sibling.classList.contains('error')) return sibling;
        sibling = sibling.nextElementSibling;
    }

    if (input.type === "radio" || input.type === "checkbox") {
        const fieldset = input.closest("fieldset");
        if (fieldset) {
            const errorDiv = fieldset.querySelector(".error");
            if (errorDiv) return errorDiv;
        }
    }

    return null;
}

// Vind de validate elementen en splits de regels op. Vervolgens alle regels in een switch case toepassen
function validateField(input) {
    const rules = input.getAttribute("validate").split("|");
    const value = input.value.trim();

    const errorDiv = getErrorDiv(input);
    if (errorDiv) errorDiv.textContent = "";

    let fieldIsValid = true;

    rules.forEach(rule => {
        let [ruleName, ruleValue] = rule.split(":");

        switch(ruleName){
            case "required":
                if (input.type === "radio" || input.type === "checkbox") {
                    const group = form.querySelectorAll(`[name="${input.name}"]`);
                    const checked = Array.from(group).some(el => el.checked);
                    if (!checked) {
                        if (errorDiv) errorDiv.textContent = "Dit is een verplicht onderdeel.";
                        fieldIsValid = false;
                    }
                } else if (input.tagName.toLowerCase() === "select") {
                    if (!input.value) {
                        if (errorDiv) errorDiv.textContent = "Dit is een verplicht onderdeel.";
                        fieldIsValid = false;
                    }
                } else {
                    if (!value) {
                        if (errorDiv) errorDiv.textContent = "Dit is een verplicht onderdeel.";
                        fieldIsValid = false;
                    }
                }
                break;

            case "min":
                if (value.length < parseInt(ruleValue)) {
                    if (errorDiv) {
                        const charsText = parseInt(ruleValue) === 1 ? "teken" : "tekens";
                        errorDiv.textContent = `Minimaal ${ruleValue} ${charsText}.`;
                    }
                    fieldIsValid = false;
                }
                break;

            case "max":
                if (value.length > parseInt(ruleValue)) {
                    if (errorDiv) errorDiv.textContent = `Maximaal ${ruleValue} tekens.`;
                    fieldIsValid = false;
                }
                break;

            case "nospaces":
                if (/\s/.test(value)) {
                    if (errorDiv) errorDiv.textContent = "Spaties zijn niet toegestaan.";
                    fieldIsValid = false;
                }
                break;

            case "numeric":
                if (!/^[0-9]+$/.test(value)) {
                    if (errorDiv) errorDiv.textContent = "Alleen cijfers zijn toegestaan.";
                    fieldIsValid = false;
                }
                break;

            case "postcode":
                if (!/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/.test(value)) {
                    if (errorDiv) errorDiv.textContent = "Ongeldige postcode (bijv. 1234AB of 1234 AB).";
                    fieldIsValid = false;
                }
                break;

            case "phone":
                if (!/^(?:\+31|0)[1-9][0-9]{8}$/.test(value)) {
                    if (errorDiv) errorDiv.textContent = "Ongeldig telefoonnummer (bijv. 0612345678 of +31612345678).";
                    fieldIsValid = false;
                }
                break;

            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)){
                    if (errorDiv) errorDiv.textContent = "Ongeldig e-mailadres.";
                    fieldIsValid = false;
                }
                break;

            case "password":
                if (!/(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    if (errorDiv) errorDiv.textContent = "Wachtwoord moet minstens 1 hoofdletter en 1 cijfer bevatten.";
                    fieldIsValid = false;
                }
                break;

            case "match":
                const other = document.getElementById(ruleValue);
                if (other && value !== other.value){
                    if (errorDiv) errorDiv.textContent = "Wachtwoorden komen niet overeen.";
                    fieldIsValid = false;
                }
                break;

            case "minage":
                const birthDate = new Date(value);
                if (isNaN(birthDate.getTime())) {
                    if (errorDiv) errorDiv.textContent = "Ongeldige geboortedatum.";
                    fieldIsValid = false;
                } else {
                    const today = new Date();
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
                    if (age < parseInt(ruleValue)) {
                        if (errorDiv) errorDiv.textContent = `Je moet minimaal ${ruleValue} jaar oud zijn.`;
                        fieldIsValid = false;
                    }
                }
                break;
        }
    });

    return fieldIsValid;
}

// Input helpers als er na een foutmelding iets wordt ingevuld in een invoerveld worden foutmeldingen verwijderd
inputs.forEach(input => {
    input.addEventListener("input", () => {
        const errorDiv = getErrorDiv(input);
        if (errorDiv) errorDiv.textContent = "";
        if (formError) formError.classList.add("d-none");
    });

    if (input.type === "checkbox" || input.type === "radio" || input.tagName.toLowerCase() === "select") {
        input.addEventListener("change", () => {
            const errorDiv = getErrorDiv(input);
            if (errorDiv) errorDiv.textContent = "";
            if (formError) formError.classList.add("d-none");
        });
    }
});

// Submit het formulier en laat de algemene foutmelding zien als er gegevens ontbreken
form.addEventListener("submit", function(event){
    let isValid = true;

    inputs.forEach(input => {
        const fieldValid = validateField(input);
        if (!fieldValid) isValid = false;
    });

    if (!isValid) {
        event.preventDefault();
        if (formError) formError.classList.remove("d-none");
    } else {
        if (formError) formError.classList.add("d-none");
    }
});
