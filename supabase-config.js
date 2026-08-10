// ===== SUPABASE CONFIG =====
const SUPABASE_URL = "https://uorcfjunftdmawcbunrs.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_tzseDjtjFzCZOB6Zw044ng_XyDpi_R2";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById("contactForm");
const statusEl = document.getElementById("cf-status");
const submitBtn = document.getElementById("cf-submit");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const phone = document.getElementById("cf-phone").value.trim();
    const message = document.getElementById("cf-message").value.trim();

    if (!name || !email) {
      statusEl.textContent = "Please fill in your name and email.";
      statusEl.style.color = "crimson";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    statusEl.textContent = "";

    const { error } = await supabaseClient
      .from("bookings")
      .insert([{ name, email, phone, message }]);

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";

    if (error) {
      console.error(error);
      statusEl.textContent = "Something went wrong. Please try again.";
      statusEl.style.color = "crimson";
    } else {
      statusEl.textContent = "Thanks! Your message has been sent.";
      statusEl.style.color = "green";
      contactForm.reset();
    }
  });
}
