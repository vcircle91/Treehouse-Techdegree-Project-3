// Variable Declarations
const form = document.querySelector('form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const cardNumberField = document.querySelector('#cc-num');
const zipField = document.querySelector('#zip');
const cvvField = document.querySelector('#cvv');
const paymentSelector = document.querySelector('#payment');
const cardBox = document.querySelector('.credit-card');
const paypalBox = document.querySelector('.paypal');
const bitcoinBox = document.querySelector('.bitcoin');
const paymethod = document.getElementById('payment');
const title = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
const shirtColors = document.getElementById('shirt-colors');
const activitiesHint = document.querySelector('#activities-hint');
const shirtDesigns = document.getElementById('design');
const color = document.getElementById('color');
const activitiesCost = document.querySelector('.activities-cost');
const activitiesBox = document.querySelector('#activities-box')
const allActivities = document.querySelector('#activities-box').childNodes
const checkboxes = activitiesBox.querySelectorAll('input[type="checkbox"]');
let totalAmount = 0;

// Function to raise validation errors
function validationError(field) {
    // Highlight error
    field.nextElementSibling.style.display = "inherit";
    field.parentElement.classList.add('not-valid');
    field.parentElement.classList.remove('valid');
}

function validationCorrection(field) {
    // Highlight error
    field.nextElementSibling.style.display = "none";
    field.parentElement.classList.add('valid');
    field.parentElement.classList.remove('not-valid');
}

// Function to validate email, Regex from https://emailregex.com/
function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value);
}

// Function to check name
function checkName(name) {
    return /^\w/.test(name.value);
}


// Function to check card number
function checkCardNumber(number) {
    return /^\d{13,16}$/.test(number.value);
}

// Function to check zip
function checkZip(zip) {
    return /^\d{5}$/.test(zip.value);
}

// Function to check cvv
function checkCvv(cvv) {
    return /^\d{3}$/.test(cvv.value);
}

// Funcion to check if at least one activity got chosen. I will use totalAmount to make it simple.
function checkActivitieschosen() {
    if (totalAmount === 0) {
        return false;
    } else {
        return true;
    }
}

// This function is there to make sure that only one activity at the same time can get chosen.
function checkActivitiesConflicts() {
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', (e) => {
            for (let i = 0; i < checkboxes.length; i++) {
                if (e.target.checked && e.target != checkboxes[i]) {
                if (checkboxes[i].dataset.dayAndTime === e.target.dataset.dayAndTime){
                    checkboxes[i].checked = false;
                }
            } 
            }
        });
        }
    }


// Put focus on name field
document.getElementById('name').focus();

// Hide other job role by default
otherJobRole.style.display = "none";


// If other job role is chosen display additional field. Otherwise hide it again
title.addEventListener('change', () => {
    if(title.value === 'other'){
        otherJobRole.style.display = "block";
    } else {
        otherJobRole.style.display = "none";
    }
});

// Logic for hiding colors first
shirtColors.style.display = "none";

// Logic to only show matching shirts
shirtDesigns.addEventListener('change', () => {
    // Show color fields and reset if required
    shirtColors.style.display = "block";
    color.selectedIndex = "0"; 

    // Show only related options to user
    for (var i = 0; i < color.length; i++) {
        color[i].style.display = "inherit";
        if (color[i].textContent.includes('Puns') && shirtDesigns.value === 'heart js') {
            color[i].style.display = "none";
        }
        if (color[i].textContent.includes('I') && shirtDesigns.value === 'js puns') {
            color[i].style.display = "none";
        }
    }
});

// Logic for total amount for activities
document.querySelector('.activities').addEventListener('click', (e) => {
    totalAmount = 0;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            totalAmount += parseInt(checkboxes[i].dataset.cost);
        }
    }
    activitiesCost.textContent = "Total: $" + totalAmount
});

// Choose credit card as standard payment method
paymethod.value = 'credit-card';

// Hide other payment methods for now
paypalBox.style.display = "none";
bitcoinBox.style.display = "none";

// Only show box for selected payment method
paymentSelector.addEventListener('change', () => {
    // Set all inactive...
    paypalBox.style.display = "none";
    bitcoinBox.style.display = "none";
    cardBox.style.display = "none";

    //... And the chosen one active again. No loop required for this three pay types.
    if (paymentSelector.value === 'paypal') {
        paypalBox.style.display = "block";
    } else if (paymentSelector.value === 'bitcoin') {
        bitcoinBox.style.display = "block";
    } else if (paymentSelector.value === 'credit-card') {
        cardBox.style.display = "block";
    } 
});




// Check if some activity got chosen to hide validation after choosing activity
activities.addEventListener('change', () => {
    if (totalAmount != 0) {
        activitiesHint.style.display = "none";
    }
});


// Check form when button got hit
form.addEventListener('submit', (e) => {
    // Check name
    if (!checkName(nameField)) {
        validationError(nameField);
        e.preventDefault();
    }
    // Check email
    if (!checkEmail(emailField)) {
        validationError(emailField);
        e.preventDefault();
    }
    // Check activitied
    if (!checkActivitieschosen()) {
        validationError(activitiesCost);
        e.preventDefault();
    }
    // Check card number (And remove whitespace if required)
    cardNumberField.value = cardNumberField.value.replace(/ /g, '');
    if (!checkCardNumber(cardNumberField) && paymentSelector.value === 'credit-card') {
        validationError(cardNumberField);
        e.preventDefault();
    }
    // Check zip code
    if (!checkZip(zipField) && paymentSelector.value === 'credit-card') {
        validationError(zipField);
        e.preventDefault();
    }
    // Check cvv
    if (!checkCvv(cvvField) && paymentSelector.value === 'credit-card') {
        validationError(cvvField);
        e.preventDefault();
    }
});

// Show nameField as correct when filled out correctly
nameField.addEventListener('change', (e) => {
    if (checkName(nameField)) {
        validationCorrection(nameField);
    }
});

// Show emailField as correct when filled out correctly
emailField.addEventListener('change', (e) => {
    if (checkEmail(emailField)) {
        validationCorrection(emailField);
    } else {
        validationError(emailField);
    }
});

// Show activities as correct when filled out correctly
activitiesCost.parentNode.addEventListener('change', (e) => {
    if (checkActivitieschosen(activitiesCost)) {
        validationCorrection(activitiesCost);
    }
});

// Show cardNumberField as correct when filled out correctly
cardNumberField.addEventListener('change', (e) => {
    if (checkCardNumber(cardNumberField)) {
        validationCorrection(cardNumberField);
    }
});

// Show zip as correct when filled out correctly
zipField.addEventListener('change', (e) => {
    if (checkZip(zipField)) {
        validationCorrection(zipField);
    }
});

// Show cvv as correct when filled out correctly
cvvField.addEventListener('change', (e) => {
    if (checkCvv(cvvField)) {
        validationCorrection(cvvField);
    }
});

// Add accessibility to checkboxes - selecting all children from #activities-box and add EventListeners to them
for(var i=0; i < allActivities.length; i++) {
        allActivities[i].addEventListener('focusin', (e) => {
            e.target.parentElement.classList.add("focus");
        });

        allActivities[i].addEventListener('focusout', (e) => {
            e.target.parentElement.classList.remove("focus");
        });
};

// Prevent conflicts with appointments
checkActivitiesConflicts()