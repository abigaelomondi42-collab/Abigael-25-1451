
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GlowUp Hair and Beauty</title>

<style>

body{
    font-family: Arial, sans-serif;
    margin:0;
    padding:0;
    background:#f5e6ff;
    color:#333;
}

/* Header */

header{
    background:linear-gradient(135deg,purple,#a64ca6);
    color:white;
    text-align:center;
    padding:30px;
}

/* Navigation */

nav{
    background:purple;
    text-align:center;
    padding:15px;
    position:sticky;
    top:0;
}

nav a{
    color:white;
    text-decoration:none;
    margin:15px;
    font-weight:bold;
}

nav a:hover{
    color:yellow;
}

/* Sections */

section{
    max-width:1100px;
    margin:auto;
    padding:30px;
}

h2{
    color:purple;
    text-align:center;
}

/* Button */

button{
    background:purple;
    color:white;
    border:none;
    padding:12px 20px;
    border-radius:8px;
    cursor:pointer;
    font-size:16px;
}

button:hover{
    background:#a64ca6;
}

/* Gallery */

.gallery-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    gap:20px;
}

.gallery-grid img{
    width:100%;
    height:250px;
    object-fit:cover;
    border-radius:12px;
}

/* Form */

form{
    background:white;
    padding:20px;
    border-radius:10px;
    box-shadow:0 2px 10px rgba(0,0,0,0.1);
}

input, textarea{

    width:100%;
    padding:12px;
    margin-top:8px;
    margin-bottom:15px;

    border:1px solid #ccc;

    border-radius:6px;

    box-sizing:border-box;

}

.error{

    color:red;

    font-size:14px;

}

/* Popup */

.popup{

    display:none;

    position:fixed;

    top:0;

    left:0;

    width:100%;

    height:100%;

    background:rgba(0,0,0,0.5);

}

.popup-content{

    background:white;

    width:350px;

    padding:20px;

    border-radius:15px;

    text-align:center;

    position:absolute;

    top:50%;

    left:50%;

    transform:translate(-50%,-50%);

}

.close{

    position:absolute;

    right:20px;

    top:10px;

    font-size:30px;

    cursor:pointer;

}

/* Footer */

footer{

    background:purple;

    color:white;

    text-align:center;

    padding:20px;

}

</style>

</head>

<body>

<header>

<h1>GlowUp Hair and Beauty</h1>

<p>Your One Stop Beauty Destination</p>

</header>

<nav>

<a href="#home">Home</a>

<a href="#about">About</a>

<a href="#gallery">Gallery</a>

<a href="#contact">Contact</a>

</nav>

<section id="home">

<h2>Welcome to GlowUp Hair and Beauty</h2>

<p>

GlowUp Hair and Beauty offers professional hair styling,

makeup, skincare, nail care and beauty treatments designed

to make every client look and feel their best.

</p>

<button id="bookBtn">Book Now</button>

</section>

<section id="about">

<h2>About Us</h2>

<p>

Founded in 2015, GlowUp Hair and Beauty has grown into a trusted

beauty brand offering affordable, high-quality services.

</p>

</section>

<section id="gallery">

<h2>Gallery</h2>

<div class="gallery-grid">

<img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600" alt="Hair Styling">

<img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600" alt="Beauty Products">

<img src="https://images.unsplash.com/photo-1526045478516-99145907023c?w=600" alt="Salon Interior">

</div>

</section>

<section id="contact">

<h2>Contact Us</h2>

<form id="contactForm">

<label>Full Name</label>

<input type="text" id="name">

<div id="nameError" class="error"></div>

<label>Email</label>

<input type="email" id="email">

<div id="emailError" class="error"></div>

<label>Phone Number</label>

<input type="text" id="phone">

<div id="phoneError" class="error"></div>

<label>Message</label>

<textarea id="message"></textarea>

<div id="messageError" class="error"></div>

<button type="submit">Send Message</button>

</form>

</section>

<!-- POPUP -->

<div id="popup" class="popup">

<div class="popup-content">

<span class="close">&times;</span>

<h2>🎉 Appointment Booking</h2>

<p>

Thank you for choosing GlowUp Hair and Beauty!

We look forward to serving you.

</p>

</div>

</div>

<footer>

<p>&copy; 2025 GlowUp Hair and Beauty</p>

</footer>

<script>

/* POPUP */

let popup = document.getElementById("popup");

let bookBtn = document.getElementById("bookBtn");

let closeBtn = document.querySelector(".close");

bookBtn.onclick = function(){

    popup.style.display = "block";

}

closeBtn.onclick = function(){

    popup.style.display = "none";

}

window.onclick = function(event){

    if(event.target == popup){

        popup.style.display = "none";

    }

}

/* FORM VALIDATION */

document.getElementById("contactForm").onsubmit = function(e){

e.preventDefault();

document.getElementById("nameError").innerHTML="";

document.getElementById("emailError").innerHTML="";

document.getElementById("phoneError").innerHTML="";

document.getElementById("messageError").innerHTML="";

let name=document.getElementById("name").value.trim();

let email=document.getElementById("email").value.trim();

let phone=document.getElementById("phone").value.trim();

let message=document.getElementById("message").value.trim();

let valid=true;

if(name===""){

document.getElementById("nameError").innerHTML="Name is required";

valid=false;

}

if(email===""){

document.getElementById("emailError").innerHTML="Email is required";

valid=false;

}

else if(!email.includes("@")){

document.getElementById("emailError").innerHTML="Enter a valid email";

valid=false;

}

if(phone===""){

document.getElementById("phoneError").innerHTML="Phone number is required";

valid=false;

}

if(message===""){

document.getElementById("messageError").innerHTML="Please enter a message";

valid=false;

}

if(valid){

alert("Form submitted successfully!");

document.getElementById("contactForm").reset();

}

}

</script>

</body>
</html>
    

