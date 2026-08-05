// ============================================================
// Glow Studio - Hair & Beauty Website Scripts
// ============================================================

// ---------- Supabase setup ----------
// 1. Go to your Supabase project -> Settings -> API
// 2. Copy your "Project URL" and paste it below as SUPABASE_URL
// 3. Copy your "anon public" key and paste it below as SUPABASE_KEY
const SUPABASE_URL = "https://uorcfjunftdmawcbunrs.supabase.co";
const SUPABASE_KEY = "sb_publishable_tzseDjtjFzCZOB6Zw044ng_XyDpi_R2";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ---------- Mobile nav toggle ----------
document.getElementById("navToggle").addEventListener("click", function () {
  document.getElementById("navLinks").classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.getElementById("navLinks").classList.remove("open");
  });
});

// ---------- Popup logic ----------
(function () {
  var STORAGE_KEY = "bpPopupLastShown";
  var SHOW_AFTER_MS = 4000;       // delay before popup appears
  var HOURS_BEFORE_REPEAT = 24;   // don't re-show within this window

  var overlay = document.getElementById("bp-overlay");
  var closeBtn = document.getElementById("bp-close");
  var form = document.getElementById("bp-form");
  var successMsg = document.getElementById("bp-success");

  function shouldShow() {
    var last = localStorage.getItem(STORAGE_KEY);
    if (!last) return true;
    var hoursSince = (Date.now() - parseInt(last, 10)) / 36e5;
    return hoursSince >= HOURS_BEFORE_REPEAT;
  }

  function openPopup() {
    overlay.classList.add("bp-show");
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }

  function closePopup() {
    overlay.classList.remove("bp-show");
  }

  if (shouldShow()) {
    setTimeout(openPopup, SHOW_AFTER_MS);
  }

  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePopup();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePopup();
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var email = document.getElementById("bp-email").value;

    var { error } = await supabaseClient
      .from("popup_signups")
      .insert([{ email: email }]);

    if (error) {
      console.error("Supabase error:", error);
      alert("Something went wrong. Please try again.");
      return;
    }

    form.style.display = "none";
    successMsg.style.display = "block";
    setTimeout(closePopup, 3000);
  });
})();

// ---------- Contact form ----------
document.querySelector(".contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  var formEl = this;
  var name = formEl.querySelector('input[type="text"]').value;
  var email = formEl.querySelector('input[type="email"]').value;
  var phone = formEl.querySelector('input[type="tel"]').value;
  var message = formEl.querySelector("textarea").value;

  var { error } = await supabaseClient
    .from("contact_messages")
    .insert([{ name: name, email: email, phone: phone, message: message }]);

  if (error) {
    console.error("Supabase error:", error);
    alert("Something went wrong sending your message. Please try again.");
    return;
  }

  alert("Thanks! We will get back to you soon.");
  formEl.reset();
});
