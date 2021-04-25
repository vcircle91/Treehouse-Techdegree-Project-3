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

let shirtDesigns = document.getElementById('design');
let color = document.getElementById('color');

shirtDesigns.addEventListener('change', () => {
    shirtColors.style.display = "block";
    color.selectedIndex = "0"; 
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
