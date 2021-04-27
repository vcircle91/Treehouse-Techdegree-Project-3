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

// Listen for form submit and raise valisation error if name is empty
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (nameField.value === '') {
        nameField.nextElementSibling.style.display = "inherit";
        // Add new Event listener to hise error again
        nameField.addEventListener('input', (e) => {
            if (e.target.value) {
                e.preventDefault();
                nameField.nextElementSibling.style.display = "none";
            }
        });
    }
});

