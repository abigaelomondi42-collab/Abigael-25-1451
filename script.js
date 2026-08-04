/* =========================================================
   SUPABASE CONFIG
   Replace these two values with your own project's details:
   Supabase Dashboard → Project Settings → API
   ========================================================= */
const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-PUBLIC-KEY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;

/* ---------------- auth modal controls ---------------- */
const authModal = document.getElementById('authModal');

function openAuthModal(tab){
  switchAuthTab(tab || 'login');
  authModal.classList.add('active');
}
function closeAuthModal(){
  authModal.classList.remove('active');
}
function switchAuthTab(tab){
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
  document.getElementById('panelLogin').classList.toggle('active', tab === 'login');
  document.getElementById('panelRegister').classList.toggle('active', tab === 'register');
}
authModal.addEventListener('click', (e) => { if (e.target === authModal) closeAuthModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAuthModal(); });

function openAuthOrBooking(){
  if (currentUser) {
    document.getElementById('booking').scrollIntoView({behavior:'smooth'});
  } else {
    openAuthModal('register');
  }
}

/* ---------------- register / login / logout ---------------- */
async function handleRegister(e){
  e.preventDefault();
  const msg = document.getElementById('registerMsg');
  msg.textContent = 'Creating your account…';
  msg.className = 'form-msg';

  const full_name = document.getElementById('regName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { full_name, phone } }
  });

  if (error) {
    msg.textContent = error.message;
    msg.className = 'form-msg err';
    return false;
  }

  if (data.session) {
    // Email confirmation is off — user is already logged in.
    msg.textContent = 'Account created! You are logged in.';
    msg.className = 'form-msg ok';
    setTimeout(closeAuthModal, 900);
  } else {
    msg.textContent = 'Account created! Check your email to confirm, then log in.';
    msg.className = 'form-msg ok';
  }
  return false;
}

async function handleLogin(e){
  e.preventDefault();
  const msg = document.getElementById('loginMsg');
  msg.textContent = 'Logging in…';
  msg.className = 'form-msg';

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    msg.textContent = error.message;
    msg.className = 'form-msg err';
    return false;
  }
  msg.textContent = 'Logged in!';
  msg.className = 'form-msg ok';
  setTimeout(closeAuthModal, 600);
  return false;
}

async function handleLogout(){
  await supabase.auth.signOut();
}

/* ---------------- reflect auth state in the UI ---------------- */
function renderNavAuth(){
  const el = document.getElementById('navAuth');
  if (currentUser){
    const label = currentUser.user_metadata?.full_name || currentUser.email;
    el.innerHTML = `
      <span class="who">Hi, ${escapeHtml(label)}</span>
      <button class="navlink" onclick="document.getElementById('booking').scrollIntoView({behavior:'smooth'})">My bookings</button>
      <button class="pill" onclick="handleLogout()">Log out</button>
    `;
  } else {
    el.innerHTML = `
      <button class="navlink" onclick="openAuthModal('login')">Log in</button>
      <button class="pill" onclick="openAuthModal('register')">Register</button>
    `;
  }
}

function renderBookingSection(){
  document.getElementById('bookingSignedOut').style.display = currentUser ? 'none' : 'block';
  document.getElementById('bookingForm').style.display = currentUser ? 'block' : 'none';
  document.getElementById('myBookings').style.display = currentUser ? 'block' : 'none';
  if (currentUser) loadMyBookings();
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

supabase.auth.onAuthStateChange((_event, session) => {
  currentUser = session ? session.user : null;
  renderNavAuth();
  renderBookingSection();
});

/* ---------------- services / price list ---------------- */
let servicesCache = [];

async function loadServices(){
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  const tbody = document.getElementById('priceTableBody');
  const select = document.getElementById('bkService');

  if (error || !data || data.length === 0){
    tbody.innerHTML = `<tr><td colspan="3">Price list unavailable — connect Supabase to load it.</td></tr>`;
    return;
  }

  servicesCache = data;
  tbody.innerHTML = data.map(s =>
    `<tr><td>${escapeHtml(s.name)}</td><td>${escapeHtml(s.category)}</td><td>${Number(s.price_kes).toLocaleString()}</td></tr>`
  ).join('');

  select.innerHTML = data.map(s =>
    `<option value="${s.id}">${escapeHtml(s.name)} — KES ${Number(s.price_kes).toLocaleString()}</option>`
  ).join('');
}

/* ---------------- bookings ---------------- */
async function handleBookingSubmit(e){
  e.preventDefault();
  const msg = document.getElementById('bookingMsg');
  if (!currentUser){
    msg.textContent = 'Please log in first.';
    msg.className = 'form-msg err';
    return false;
  }

  const serviceId = document.getElementById('bkService').value;
  const service = servicesCache.find(s => s.id === serviceId);
  const date = document.getElementById('bkDate').value;
  const notes = document.getElementById('bkNotes').value.trim();

  msg.textContent = 'Sending your request…';
  msg.className = 'form-msg';

  const { error } = await supabase.from('bookings').insert({
    user_id: currentUser.id,
    service_name: service ? service.name : 'Unknown service',
    price_kes: service ? service.price_kes : null,
    preferred_date: date,
    notes: notes || null
  });

  if (error){
    msg.textContent = error.message;
    msg.className = 'form-msg err';
    return false;
  }

  msg.textContent = 'Booking requested! We will confirm shortly.';
  msg.className = 'form-msg ok';
  document.getElementById('bookingForm').reset();
  loadMyBookings();
  return false;
}

async function loadMyBookings(){
  const list = document.getElementById('bookingsList');
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error){
    list.innerHTML = `<p class="empty-note">Could not load your bookings.</p>`;
    return;
  }
  if (!data || data.length === 0){
    list.innerHTML = `<p class="empty-note">No bookings yet — request one above.</p>`;
    return;
  }

  list.innerHTML = data.map(b => `
    <div class="booking-row">
      <div>
        <strong>${escapeHtml(b.service_name)}</strong>
        <div class="meta">${b.preferred_date}${b.notes ? ' &middot; ' + escapeHtml(b.notes) : ''}</div>
      </div>
      <span class="status-tag ${b.status === 'cancelled' ? 'cancelled' : ''}">${escapeHtml(b.status)}</span>
    </div>
  `).join('');
}

/* ---------------- init ---------------- */
(async function init(){
  const { data: { session } } = await supabase.auth.getSession();
  currentUser = session ? session.user : null;
  renderNavAuth();
  renderBookingSection();
  loadServices();
})();
