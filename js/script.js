// Put focus on name field
document.getElementById('name').focus();

// Hide other job role by default
// As browsers can remember previous choice after refresh I am going for some if statement.
let title = document.getElementById('title');
let otherJobRole = document.getElementById('other-job-role');

if (title.value != 'other'){
    otherJobRole.style.display = "none";
}

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

let shirtDesigns = document.getElementById('shirt-designs');
shirtDesigns.addEventListener('change', () => {
    shirtColors.style.display = "block";
    if(shirtDesigns.value === 'Theme - JS Puns'){

    } else if (shirtDesigns.value === 'Theme - I &#9829; JS'){

    }
});