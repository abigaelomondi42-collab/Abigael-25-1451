// Popup

function showPopup(){

    alert("Welcome to GlowUp Hair and Beauty!\nBook your appointment today.");

}


// Form Validation

document.getElementById("contactForm").addEventListener("submit", function(e){

e.preventDefault();

let name = document.getElementById("name").value.trim();

let email = document.getElementById("email").value.trim();

let phone = document.getElementById("phone").value.trim();

let message = document.getElementById("message").value.trim();


if(name==""){

alert("Please enter your name");

return;

}


if(email==""){

alert("Please enter your email");

return;

}


if(!email.includes("@")){

alert("Please enter a valid email");

return;

}


if(phone==""){

alert("Please enter phone number");

return;

}


if(message==""){

alert("Please enter your message");

return;

}


alert("Form submitted successfully!");

document.getElementById("contactForm").reset();

});
