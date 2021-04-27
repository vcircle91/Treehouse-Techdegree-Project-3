// Put focus on name field
document.getElementById('name').focus();

// Hide other job role by default
let title = document.getElementById('title');
let otherJobRole = document.getElementById('other-job-role');
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
let shirtColors = document.getElementById('shirt-colors');
shirtColors.style.display = "none";

let shirtDesigns = document.getElementById('design');
let color = document.getElementById('color');

shirtDesigns.addEventListener('change', () => {
    // Show color fields and reset if required
    shirtColors.style.display = "block";
    color.selectedIndex = "0"; 

    // Show only related options to user
    for (var i = 0; i < color.length; i++) {
        color[i].disabled = false;
        if (color[i].textContent.includes('Puns') && shirtDesigns.value === 'heart js') {
            color[i].disabled = true;
        }
        if (color[i].textContent.includes('I') && shirtDesigns.value === 'js puns') {
            color[i].disabled = true;
        }
    }
});

// Logic for total amount for activities
let activitiesCost = document.querySelector('.activities-cost');
let totalAmount = 0;

document.querySelector('.activities').addEventListener('change', (e) => {
    if (e.target.checked) {
    totalAmount += parseInt(e.target.dataset.cost);
    } else {
    totalAmount -= parseInt(e.target.dataset.cost);
    }
    activitiesCost.textContent = "Total: $" + totalAmount
});

// Choose credit card as standard payment method
let paymethod = document.getElementById('payment');
paymethod.value = 'credit-card';

// Hide other payment methods for now
let paymentSelector = document.querySelector('#payment');
let cardBox = document.querySelector('.credit-card');
let paypalBox = document.querySelector('.paypal');
let bitcoinBox = document.querySelector('.bitcoin');
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


form = document.querySelector('form');
nameField = document.querySelector('#name');
emailField = document.querySelector('#email');
cardNumberField = document.querySelector('#cc-num');
zipField = document.querySelector('#zip');
cvvField = document.querySelector('#cvv');

// Function to validate email, Regex from https://emailregex.com/
function isValidEMail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// Function to check if field is empty
function checkField(field) {
    let formInvalid = false;
    // Go through every field received in array and check
    for (var i = 0; i < field.length; i++) {
    if (field[i].value === '') {
        field[i].nextElementSibling.style.display = "inherit";
        // Add new Event listener to remove error again
        field[i].addEventListener('input', (e) => {
            if (e.target.value) {
                e.target.nextElementSibling.style.display = "none";
            }
        });
        formInvalid = true;
    }
    }
    return formInvalid;
}

// Function to check card number
function checkCardNumber(number) {
    return /^\d{13,16}$/.test(number);
}

function checkZip(zip) {
    return /^\d{5}$/.test(zip);
}

function checkCvv(cvv) {
    return /^\d{3}$/.test(cvv);
}

// Funcion to check if at least one activity got chosen. I will use totalAmount to make it simple.
let activitiesHint = document.querySelector('#activities-hint');
function checkActivitieschosen() {
    if (totalAmount === 0) {
        activitiesHint.style.display = "inherit";
    }
}

// Check if some activity got chosen to hide validation after choosing activity
activities.addEventListener('change', () => {
    if (totalAmount != 0) {
        activitiesHint.style.display = "none";
    }
});


// Listen for form submit and raise valisation error if name is empty
form.addEventListener('submit', (e) => {
    // Deliver fields to check as array and prevent default if correction needed
    if (checkField([nameField, emailField])) {
        e.preventDefault();
    }
    // Check activities
    checkActivitieschosen();

    // Check card fields if card got chosen
    if (paymentSelector.value === 'credit-card') {
        // Check card number
        if (!checkCardNumber(cardNumberField.value)) {
            e.preventDefault();
            cardNumberField.nextElementSibling.style.display = "inherit";
        }
        // Check zip
        if (!checkZip(zipField.value)) {
            e.preventDefault();
            zipField.nextElementSibling.style.display = "inherit";
        }
        // Check security code
        if (!checkCvv(cvvField.value)) {
            e.preventDefault();
            cvvField.nextElementSibling.style.display = "inherit";
        }
}
});


// Validate email in real time with nested Event Listener.
emailField.addEventListener('blur', () => {
    if (!isValidEMail(emailField.value)) {
        emailField.nextElementSibling.style.display = "inherit";
        // Hide validation message instantly when corrected
        emailField.addEventListener('input', () => {
            if (isValidEMail(emailField.value)) {
                emailField.nextElementSibling.style.display = "none";
            }
        });
    } 
});


