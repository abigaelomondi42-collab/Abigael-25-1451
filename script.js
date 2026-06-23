<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Student Registration Form</title>

<style>
    body{
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin:0;
        padding:0;
    }

    .container{
        width:400px;
        margin:50px auto;
        background:white;
        padding:20px;
        border-radius:10px;
        box-shadow:0 0 10px gray;
    }

    h1{
        text-align:center;
        color:blue;
    }

    label{
        display:block;
        margin-top:10px;
        font-weight:bold;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"]{
        width:100%;
        padding:10px;
        margin-top:5px;
        border:1px solid #ccc;
        border-radius:5px;
    }

    .gender{
        margin-top:10px;
    }

    button{
        width:100%;
        padding:10px;
        margin-top:20px;
        background:blue;
        color:white;
        border:none;
        border-radius:5px;
        cursor:pointer;
    }

    button:hover{
        background:darkblue;
    }
</style>
</head>

<body onload="welcomeMessage()">

<div class="container">
    <h1>Student Registration Form</h1>

    <form id="registrationForm">

        <label>Name</label>
        <input type="text" id="name" required>

        <label>Email</label>
        <input type="email" id="email" placeholder="example@gmail.com" required>

        <label>Phone Number</label>
        <input type="tel" id="phone" required>

        <label>Gender</label>

        <div class="gender">
            <input type="radio" name="gender" value="Male" required> Male
            <input type="radio" name="gender" value="Female"> Female
        </div>

        <button type="submit">Submit</button>

    </form>
</div>

<script>
function welcomeMessage() {

    alert("Welcome to the Student Registration System!");

    let tuition = prompt("Enter your Tuition Fee:");

    if(tuition !== null && tuition !== ""){
        alert("Your Tuition Fee is: " + tuition);
    }

    alert("PROMO: Register today and get 10% Discount!");
}

document.getElementById("registrationForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    alert("Registration Submitted Successfully!");
});
</script>

</body>
</html>


