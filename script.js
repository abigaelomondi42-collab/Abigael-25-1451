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
}

header{
    background:linear-gradient(135deg,purple,#a64ca6);
    color:white;
    text-align:center;
    padding:25px;
}

nav{
    background:purple;
    text-align:center;
    padding:15px;
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

section{
    padding:25px;
    max-width:1100px;
    margin:auto;
}

h2{
    color:purple;
    text-align:center;
}

button{
    background:purple;
    color:white;
    border:none;
    padding:12px 20px;
    border-radius:6px;
    cursor:pointer;
}

button:hover{
    background:#a64ca6;
}

/* POPUP */

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
    border-radius:12px;
    text-align:center;
    position:relative;
    margin:15% auto;
}

.close{
    position:absolute;
    top:10px;
    right:15px;
    font-size:28px;
    cursor:pointer;
}

form{
    background:white;
    padding:20px;
    border-radius:10px;
}

input, textarea{
    width:100%;
    padding:10px;
    margin-top:8px;
    margin-bottom:15px;
    border:1px solid #ccc;
    border-radius:5px;
}

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

footer{
    background:purple;
    color:white;
    text-align:center;
    padding:15px;
    margin-top:20px;
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
makeup, skincare, nail care and beauty treatments.
</p>

<button id="popupBtn">Book Now</button>

</section>

<section id="about">

<h2>About Us</h2>

<p>
Founded in 2015, GlowUp Hair and Beauty provides affordable,
high-quality beauty services for all clients.
</p>

</section>

<section id="gallery">

<h2>Gallery</h2>

<div class="gallery-grid">

<img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600"
alt="Hair Styling">

<img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600"
alt="Beauty Products">

<img src="https://images.unsplash.com/photo-1526045478516-99145907023c?w=600"
alt="Salon Interior">

</div>

</section>

<section id="contact">

<h2>Contact Us</h2>

<form id="contactForm">

<label>Full Name</label>

<input type="text" id="name">

<label>Email</label>

<input type="email" id="email">

<label>Phone Number</label>

<input type="text" id="phone">

<label>Message</label>

<textarea id="message"></textarea>

<button type="submit">Send Message</button>

</form>

</section>

<!-- POPUP -->

<div id="popup" class="popup">

<div class="popup-content">

<span class="close">&times;</span>

<h2>Booking Successful!</h2>

<p>
Thank you for choosing GlowUp Hair and Beauty.
Contact us to schedule your appointment.
</p>

</div>

</div>

<footer>

<p>&copy; 2025 GlowUp Hair and Beauty</p>

</footer>

<script>

// POPUP

const popup = document.getElementById("popup");

const popupBtn = document.getElementById("popupBtn");

const closeBtn = document.querySelector(".close");

popupBtn.addEventListener("click", function(){

    popup.style.display = "block";

});

closeBtn.addEventListener("click", function(){

    popup.style.display = "none";

});

window.addEventListener("click", function(event){

    if(event.target == popup){

        popup.style.display = "none";

    }

});


// FORM VALIDATION

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

alert("Please enter your phone number");

return;

}

if(message==""){

alert("Please enter your message");

return;

}

alert("Form submitted successfully!");

document.getElementById("contactForm").reset();

});

</script>

</body>
</html>

