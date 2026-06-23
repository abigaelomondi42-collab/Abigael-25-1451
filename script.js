<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hair & Beauty Salon</title>
</head>

<body id="body">

<h1 id="title">Glow Hair & Beauty Salon</h1>

<p>
Welcome to Glow Hair & Beauty Salon. We offer braiding, hair styling,
makeup, manicures, pedicures, and beauty treatments.
</p>

<h2>Our Services</h2>
<ul>
<li>Braiding</li>
<li>Hair Styling</li>
<li>Makeup</li>
<li>Manicure</li>
<li>Pedicure</li>
</ul>

<h2>Gallery</h2>
<img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400"
alt="Hair Styling" width="300">

<h2>Contact Us</h2>
<p>Phone: +254 700 123 456</p>
<p>Email: glowbeauty@gmail.com</p>

<button onclick="changeStyle()">Change Style</button>

<script>
function changeStyle() {
    document.getElementById("body").style.backgroundColor = "white";
    document.getElementById("body").style.fontFamily = "Arial";

    document.getElementById("title").style.color = "black";
    document.getElementById("title").style.textAlign = "center";
    document.getElementById("title").style.fontSize = "40px";

    alert("Welcome to Glow Hair & Beauty Salon!");
}
</script>

</body>
</html>
