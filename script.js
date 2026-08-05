// ============================================================
// Glow Studio - Hair & Beauty Website Scripts
// ============================================================

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

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // ---- Replace this with your real signup logic ----
    // e.g. send to Mailchimp / Klaviyo / your backend via fetch()
    // ----------------------------------------------------
    form.style.display = "none";
    successMsg.style.display = "block";
    setTimeout(closePopup, 3000);
  });
})();

// ---------- Contact form ----------
document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks! We will get back to you soon.");
  this.reset();
});
