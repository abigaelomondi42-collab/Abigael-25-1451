// ============================================================
// Glow Studio - Hair & Beauty Website Scripts
// ============================================================


// ============================================================
// SUPABASE SETUP
// ============================================================

const SUPABASE_URL =
    "https://uorcfjunftdmawcbunrs.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_tzseDjtjFzCZOB6Zw044ng_XyDpi_R2";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ============================================================
// MOBILE NAVIGATION
// ============================================================

const navToggle =
    document.getElementById("navToggle");

const navLinks =
    document.getElementById("navLinks");

if (navToggle && navLinks) {

    navToggle.addEventListener("click", function () {

        navLinks.classList.toggle("open");

    });


    document
        .querySelectorAll(".nav-links a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

            });

        });

}


// ============================================================
// POPUP
// ============================================================

(function () {

    const overlay =
        document.getElementById("bp-overlay");

    const closeBtn =
        document.getElementById("bp-close");

    const form =
        document.getElementById("bp-form");

    const successMsg =
        document.getElementById("bp-success");


    // Stop if popup HTML is missing
    if (!overlay || !closeBtn || !form) {

        console.error(
            "Popup HTML is missing from index.html"
        );

        return;

    }


    // Popup appears after 1 second
    const SHOW_AFTER_MS = 1000;


    // Open popup
    function openPopup() {

        overlay.classList.add("bp-show");

    }


    // Close popup
    function closePopup() {

        overlay.classList.remove("bp-show");

    }


    // Show popup every visit
    setTimeout(
        openPopup,
        SHOW_AFTER_MS
    );


    // Close button
    closeBtn.addEventListener(
        "click",
        closePopup
    );


    // Close when clicking outside
    overlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target === overlay
            ) {

                closePopup();

            }

        }
    );


    // Close with Escape key
    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closePopup();

            }

        }
    );


    // Popup email form
    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("bp-email")
                    .value
                    .trim();


            if (!email) {

                return;

            }


            const submitButton =
                document.getElementById(
                    "bp-submit"
                );


            submitButton.disabled = true;

            submitButton.textContent =
                "Submitting...";


            try {

                const { error } =
                    await supabaseClient
                        .from("popup_signups")
                        .insert([
                            {
                                email: email
                            }
                        ]);


                if (error) {

                    console.error(
                        "Popup Supabase error:",
                        error
                    );

                    alert(
                        "Something went wrong. Please try again."
                    );

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Book an Appointment";

                    return;

                }


                // Hide form
                form.style.display = "none";


                // Show success message
                if (successMsg) {

                    successMsg.style.display =
                        "block";

                }


                // Close after 3 seconds
                setTimeout(
                    closePopup,
                    3000
                );


            } catch (error) {

                console.error(
                    "Popup error:",
                    error
                );

                alert(
                    "Something went wrong. Please try again."
                );


                submitButton.disabled = false;

                submitButton.textContent =
                    "Book an Appointment";

            }

        }
    );

})();


// ============================================================
// CONTACT / BOOKING FORM
// ============================================================

const contactForm =
    document.querySelector(".contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const formEl = this;


            const name =
                formEl
                    .querySelector(
                        'input[type="text"]'
                    )
                    .value
                    .trim();


            const email =
                formEl
                    .querySelector(
                        'input[type="email"]'
                    )
                    .value
                    .trim();


            const phone =
                formEl
                    .querySelector(
                        'input[type="tel"]'
                    )
                    .value
                    .trim();


            const message =
                formEl
                    .querySelector("textarea")
                    .value
                    .trim();


            const submitButton =
                formEl.querySelector(
                    'button[type="submit"]'
                );


            submitButton.disabled = true;

            submitButton.textContent =
                "Submitting...";


            try {

                const { error } =
                    await supabaseClient
                        .from("contact_messages")
                        .insert([
                            {
                                name: name,
                                email: email,
                                phone: phone,
                                message: message
                            }
                        ]);


                if (error) {

                    console.error(
                        "Supabase error:",
                        error
                    );

                    alert(
                        "Something went wrong sending your message. Please try again."
                    );

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Send Message";

                    return;

                }


                alert(
                    "Thanks! We will get back to you soon. 💗"
                );


                formEl.reset();


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );

                alert(
                    "Something went wrong. Please try again."
                );

            }


            submitButton.disabled = false;

            submitButton.textContent =
                "Send Message";

        }
    );

}
