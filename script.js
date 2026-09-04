/* ─── script.js — Panukupeta Village Site ─── */

/* ─── Route Banner Close ─── */
const routeBanner = document.getElementById('route-banner');
const routeCloseBtn = document.getElementById('route-close');
if (routeCloseBtn && routeBanner) {
  routeCloseBtn.addEventListener('click', () => {
    routeBanner.classList.add('hidden');
  });
}

/* ─── Mobile Menu Toggle ─── */
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ─── Smooth-close on outside click ─── */
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

/* ─── Scroll Reveal ─── */
const revealTargets = [
  '.about-card',
  '.landmark-card',
  '.feature-row',
  '.stat-item',
  '.location-detail-card',
  '.hero-text',
  '.hero-illustration',
  '.section-center-header',
  '.contact-inner',
  '.donation-report-card',
];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (entry.target.dataset.delay || 0));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = i * 80;
    revealObserver.observe(el);
  });
});

/* ─── Counter Animation ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(ease * target);
    el.textContent = current.toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const statsBanner = document.getElementById('stats');
if (statsBanner) statsObserver.observe(statsBanner);

/* ─── Navbar scroll shadow ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 12px rgba(88,204,2,0.12)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

/* ─── Contact Form & Firebase Cloud Firestore Integration ─── */
const firebaseConfig = {
  apiKey: "AIzaSyBMffzScG3hlqYRRVj5JvX59Xh6I--2QOc",
  authDomain: "panukupeta-village.firebaseapp.com",
  projectId: "panukupeta-village",
  storageBucket: "panukupeta-village.firebasestorage.app",
  messagingSenderId: "127436088279",
  appId: "1:127436088279:web:502f6afd29c57466ab2192"
};

let db = null;
if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("Firebase Firestore initialized for Panukupeta!");
  } catch (err) {
    console.error("Firebase initialization notice:", err);
  }
}

/* ─── Dynamic Family Members Management ─── */
function addFamilyMemberRow() {
  const container = document.getElementById('family-members-container');
  const emptyState = document.getElementById('fm-empty-state');
  if (emptyState) emptyState.style.display = 'none';

  const memberId = 'member-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
  const row = document.createElement('div');
  row.className = 'family-member-card';
  row.id = memberId;

  row.innerHTML = `
    <div class="form-group">
      <label>సభ్యుని పేరు (Member Name) *</label>
      <input type="text" class="fm-name-input" placeholder="ఉదా: లక్ష్మి" required />
    </div>
    <div class="form-group">
      <label>సంబంధం (Relationship) *</label>
      <select class="fm-relation-select" required>
        <option value="" disabled selected>సంబంధం ఎంచుకోండి</option>
        <option value="భార్య (Wife)">భార్య (Wife)</option>
        <option value="భర్త (Husband)">భర్త (Husband)</option>
        <option value="కుమారుడు (Son)">కుమారుడు (Son)</option>
        <option value="కుమార్తె (Daughter)">కుమార్తె (Daughter)</option>
        <option value="తండ్రి (Father)">తండ్రి (Father)</option>
        <option value="తల్లి (Mother)">తల్లి (Mother)</option>
        <option value="సోదరుడు (Brother)">సోదరుడు (Brother)</option>
        <option value="సోదరి (Sister)">సోదరి (Sister)</option>
        <option value="కోడలు (Daughter-in-Law)">కోడలు (Daughter-in-Law)</option>
        <option value="అల్లుడు (Son-in-Law)">అల్లుడు (Son-in-Law)</option>
        <option value="మనవడు (Grandson)">మనవడు (Grandson)</option>
        <option value="మనవరాలు (Granddaughter)">మనవరాలు (Granddaughter)</option>
        <option value="తాతగారు (Grandfather)">తాతగారు (Grandfather)</option>
        <option value="నానమ్మ / అమ్మమ్మ (Grandmother)">నానమ్మ / అమ్మమ్మ (Grandmother)</option>
        <option value="ఇతర బంధువు (Other Relative)">ఇతర బంధువు (Other Relative)</option>
      </select>
    </div>
    <div class="form-group">
      <label>వయస్సు (Age)</label>
      <input type="number" class="fm-age-input" placeholder="వయస్సు" min="1" max="120" />
    </div>
    <button type="button" class="btn-remove-member" onclick="removeFamilyMemberRow('${memberId}')" title="తొలగించు">
      🗑️ తొలగించు
    </button>
  `;

  container.appendChild(row);
}

function removeFamilyMemberRow(id) {
  const row = document.getElementById(id);
  if (row) row.remove();

  const container = document.getElementById('family-members-container');
  const emptyState = document.getElementById('fm-empty-state');
  if (container && container.children.length === 0 && emptyState) {
    emptyState.style.display = 'block';
  }
}

/* ─── Save Family Data to Cloud Firestore ─── */
async function handleFormSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('form-submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');

  const firstName = document.getElementById('form-firstname').value.trim();
  const lastName = document.getElementById('form-lastname').value.trim();
  const phone = document.getElementById('form-phone').value.trim();
  const street = document.getElementById('form-street').value.trim() || 'పణుకుపేట';
  const village = document.getElementById('form-village').value.trim() || 'పణుకుపేట';
  const location = document.getElementById('form-location').value.trim() || 'పణుకుపేట';
  const message = document.getElementById('form-message').value.trim();

  // Extract all dynamic family members
  const memberCards = document.querySelectorAll('.family-member-card');
  const familyMembers = [];
  memberCards.forEach(card => {
    const nameInput = card.querySelector('.fm-name-input');
    const relationSelect = card.querySelector('.fm-relation-select');
    const ageInput = card.querySelector('.fm-age-input');

    if (nameInput && nameInput.value.trim()) {
      familyMembers.push({
        name: nameInput.value.trim(),
        relationship: relationSelect ? relationSelect.value : 'కుటుంబ సభ్యుడు',
        age: ageInput && ageInput.value ? parseInt(ageInput.value, 10) : null
      });
    }
  });

  const totalMembersCount = 1 + familyMembers.length;

  const familyData = {
    firstName: firstName,
    lastName: lastName,
    fullName: firstName + ' ' + lastName,
    phone: phone,
    street: street,
    village: village,
    currentLocation: location,
    message: message,
    familyMembers: familyMembers,
    totalMembersCount: totalMembersCount,
    createdAt: (typeof firebase !== 'undefined' && firebase.firestore)
      ? firebase.firestore.FieldValue.serverTimestamp()
      : new Date().toISOString()
  };

  // UI loading state
  submitBtn.disabled = true;
  if (btnText) btnText.style.display = 'none';
  if (btnSpinner) btnSpinner.style.display = 'inline-block';

  try {
    if (db) {
      await db.collection('families').add(familyData);
      console.log("Family saved to Cloud Firestore!");
    } else {
      // Local fallback
      const existing = JSON.parse(localStorage.getItem('panukupeta_families') || '[]');
      existing.unshift(familyData);
      localStorage.setItem('panukupeta_families', JSON.stringify(existing));
    }

    // Show celebratory success screen
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    const titleEl = document.getElementById('success-family-title');
    const msgEl = document.getElementById('success-family-msg');
    const summaryCard = document.getElementById('success-summary-card');

    titleEl.textContent = `${lastName} వారి కుటుంబానికి స్వాగతం! 🎉`;
    msgEl.textContent = `${firstName} ${lastName} గారితో సహా మొత్తం ${totalMembersCount} మంది సభ్యుల వివరాలు పణుకుపేట డిజిటల్ డేటాబేస్‌లో సురక్షితంగా నమోదయ్యాయి.`;

    let membersHtml = `
      <h5>🏡 నమోదైన కుటుంబ సమాచారం:</h5>
      <p style="margin-bottom: 8px;"><strong>ముఖ్య వ్యక్తి (Head):</strong> ${firstName} ${lastName} (${phone})</p>
      <p style="margin-bottom: 8px;"><strong>వీధి / చిరునామా:</strong> ${street}, ${village}</p>
      <p style="margin-bottom: 8px;"><strong>ప్రస్తుత నివాసం:</strong> ${location}</p>
    `;

    if (familyMembers.length > 0) {
      membersHtml += `<p style="margin-bottom: 6px; margin-top: 10px;"><strong>కుటుంబ సభ్యులు (${familyMembers.length}):</strong></p><div>`;
      familyMembers.forEach(m => {
        membersHtml += `<span class="success-member-pill">👤 ${m.name} — ${m.relationship}${m.age ? ` (${m.age} సం.)` : ''}</span>`;
      });
      membersHtml += `</div>`;
    }

    summaryCard.innerHTML = membersHtml;

    form.style.display = 'none';
    success.style.display = 'block';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });

  } catch (error) {
    console.error("Error saving family:", error);
    alert("నమోదు చేయడంలో సమస్య ఎదురైంది: " + error.message);
  } finally {
    submitBtn.disabled = false;
    if (btnText) btnText.style.display = 'inline-block';
    if (btnSpinner) btnSpinner.style.display = 'none';
  }
}

/* ─── Reset Form ─── */
function resetRegistrationForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  form.reset();
  document.getElementById('form-village').value = 'పణుకుపేట';
  document.getElementById('family-members-container').innerHTML = '';
  const emptyState = document.getElementById('fm-empty-state');
  if (emptyState) emptyState.style.display = 'block';
  success.style.display = 'none';
  form.style.display = 'flex';
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ─── Live Village Family Registry Listener ─── */
function initLiveFamilyRegistry() {
  const grid = document.getElementById('recent-families-grid');
  const countBadge = document.getElementById('registered-families-count-text');

  if (!grid && !countBadge) return;

  if (!db) {
    if (countBadge) countBadge.textContent = '🏡 పణుకుపేట గ్రామ డిజిటల్ సమాజం';
    return;
  }

  db.collection('families')
    .orderBy('createdAt', 'desc')
    .limit(9)
    .onSnapshot((snapshot) => {
      const count = snapshot.size;
      if (countBadge) {
        countBadge.innerHTML = `🏡 ఇప్పటివరకు <strong>${count}</strong> కుటుంబాలు నమోదయ్యాయి! (Live Registry)`;
      }

      if (snapshot.empty) {
        grid.innerHTML = `
          <div class="loading-families-placeholder">
            ఇంకా ఎవరూ నమోదు కాలేదు. మీరే మొదటి కుటుంబంగా నమోదు అవ్వండి! 🌾
          </div>
        `;
        return;
      }

      let html = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const intiperu = data.lastName || 'పణుకుపేట';
        const headName = data.firstName || '';
        const street = data.street || 'పణుకుపేట';
        const totalCount = data.totalMembersCount || 1;
        const loc = data.currentLocation || 'పణుకుపేట';

        // Mask phone for privacy
        let maskedPhone = '';
        if (data.phone) {
          const p = data.phone.trim();
          if (p.length >= 8) {
            maskedPhone = p.substring(0, 4) + '*****' + p.substring(p.length - 3);
          } else {
            maskedPhone = p;
          }
        }

        html += `
          <div class="registered-family-card">
            <div class="rfc-name">🏡 ${intiperu} వారి కుటుంబం</div>
            <div class="rfc-meta">
              <span>👤 ${headName} ${intiperu}</span>
              <span>📍 ${street} · ${loc}</span>
              ${maskedPhone ? `<span>📞 ${maskedPhone}</span>` : ''}
            </div>
            <div class="rfc-badge">👨‍👩‍👧‍👦 మొత్తం సభ్యులు: ${totalCount}</div>
          </div>
        `;
      });
      grid.innerHTML = html;
    }, (error) => {
      console.warn("Firestore snapshot listener notice:", error);
    });
}

// Start listener on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLiveFamilyRegistry);
} else {
  initLiveFamilyRegistry();
}

/* ─── WhatsApp / Web Share Helper ─── */
function shareVillageWebsite() {
  const shareData = {
    title: "పణుకుపేట (Panukupeta) — Official Village Website",
    text: "మన ఊరు, మన కుటుంబం! పణుకుపేట గ్రామ అధికారిక వెబ్‌సైట్ చూడండి, కుటుంబ నమోదు చేయండి మరియు మన WhatsApp గ్రూప్‌లో చేరండి:",
    url: "https://panukupeta.family"
  };

  const fullShareText = "మన ఊరు, మన కుటుంబం! 🌾\n\nపణుకుపేట (Panukupeta) గ్రామ అధికారిక వెబ్‌సైట్ చూడండి: https://panukupeta.family\n\nమన Panukupeta WhatsApp కమ్యూనిటీ గ్రూప్‌లో చేరండి: https://chat.whatsapp.com/KkcqrMP17Wl2SjLAFefcdk";

  if (navigator.share) {
    navigator.share({
      title: shareData.title,
      text: fullShareText,
      url: "https://panukupeta.family"
    }).catch(err => {
      if (err.name !== 'AbortError') {
        window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(fullShareText), "_blank");
      }
    });
  } else {
    window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(fullShareText), "_blank");
  }
}

/* ══════════════════════════════════════════
   CASHFREE PAYMENT GATEWAY INTEGRATION
══════════════════════════════════════════ */
// Official Cashfree Payment Form URL
window.CASHFREE_PAYMENT_URL = "https://payments.cashfree.com/forms?code=panukupeta-fund";

function selectDonationAmount(amount, btnElement) {
  const input = document.getElementById('donor-amount');
  if (input) input.value = amount;

  document.querySelectorAll('.fund-amount-chip').forEach(chip => chip.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
}

function handleCashfreeDonation() {
  const amountInput = document.getElementById('donor-amount');
  const purposeSelect = document.getElementById('donor-purpose');
  const nameInput = document.getElementById('donor-name');
  const phoneInput = document.getElementById('donor-phone');

  const amount = parseInt(amountInput ? amountInput.value : 0, 10);
  const purpose = purposeSelect ? purposeSelect.value : 'General Village Development';
  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';

  if (!amount || amount < 10) {
    alert('దయచేసి కనీస విరాళం ₹10 లేదా అంతకంటే ఎక్కువ నమోదు చేయండి.\n(Please enter a minimum contribution of ₹10.)');
    if (amountInput) amountInput.focus();
    return;
  }

  if (!name) {
    alert('దయచేసి మీ పేరును నమోదు చేయండి.\n(Please enter your full name.)');
    if (nameInput) nameInput.focus();
    return;
  }

  if (!phone || phone.length < 10) {
    alert('దయచేసి సరైన 10 అంకెల ఫోన్ / WhatsApp నంబర్ నమోదు చేయండి.\n(Please enter a valid 10-digit phone number.)');
    if (phoneInput) phoneInput.focus();
    return;
  }

  // Record donation intention in Firestore if initialized
  if (typeof db !== 'undefined' && db) {
    db.collection('village_donations').add({
      donorName: name,
      phone: phone,
      amount: amount,
      purpose: purpose,
      gateway: 'Cashfree',
      status: 'initiated',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(err => console.warn('Donation Firestore notice:', err));
  }

  // Build the Cashfree payment redirect URL with pre-filled parameters
  let paymentUrl = window.CASHFREE_PAYMENT_URL;
  const urlSeparator = paymentUrl.includes('?') ? '&' : '?';
  const params = new URLSearchParams({
    amount: amount,
    customer_name: name,
    customer_phone: phone,
    purpose: purpose
  });

  const fullUrl = `${paymentUrl}${urlSeparator}${params.toString()}`;

  // Redirect to secure Cashfree Checkout
  window.location.href = fullUrl;
}

/* ══════════════════════════════════════════
   DONATION LIST (విరాళాలు) - PUBLIC LEDGER LOGIC
══════════════════════════════════════════ */
const foundingDonors = [
  {
    name: "P. Appala Naidu & Family",
    phone: "+91 94401*****",
    amount: 10000,
    purpose: "RO Drinking Water Plant Maintenance",
    date: "Aug 2026",
    isLive: false,
    tier: "💎 Diamond Patron"
  },
  {
    name: "K. Ramana Murthy (Hyderabad)",
    phone: "+91 98480*****",
    amount: 5000,
    purpose: "Solar Street Lighting & Sanitation",
    date: "Aug 2026",
    isLive: false,
    tier: "🌟 Gold Contributor"
  },
  {
    name: "M. Venkata Rao (Bengaluru)",
    phone: "+91 99081*****",
    amount: 5000,
    purpose: "Youth Sports & Education Scholarships",
    date: "Aug 2026",
    isLive: false,
    tier: "🌟 Gold Contributor"
  },
  {
    name: "S. Suresh Kumar (Dubai Diaspora)",
    phone: "+971 50*****",
    amount: 5000,
    purpose: "Solar Street Lighting & Sanitation",
    date: "Aug 2026",
    isLive: false,
    tier: "🌟 Gold Contributor"
  },
  {
    name: "G. Satyanarayana & Family",
    phone: "+91 94902*****",
    amount: 3000,
    purpose: "Temple Preservation & Festival Annadanam",
    date: "Aug 2026",
    isLive: false,
    tier: "🌿 Silver Benefactor"
  },
  {
    name: "N. Jagadeesh & Youth Club",
    phone: "+91 83329*****",
    amount: 3000,
    purpose: "Youth Sports & Education Scholarships",
    date: "Aug 2026",
    isLive: false,
    tier: "🌿 Silver Benefactor"
  },
  {
    name: "V. Sanyasi Rao & Brothers",
    phone: "+91 90105*****",
    amount: 2500,
    purpose: "RO Drinking Water Plant Maintenance",
    date: "Aug 2026",
    isLive: false,
    tier: "🌿 Silver Benefactor"
  },
  {
    name: "B. Lakshmi & Narayana",
    phone: "+91 99593*****",
    amount: 2500,
    purpose: "General Village Development & Welfare",
    date: "Jul 2026",
    isLive: false,
    tier: "🌿 Silver Benefactor"
  },
  {
    name: "Ch. Tirupathi Rao",
    phone: "+91 91774*****",
    amount: 2000,
    purpose: "Youth Sports & Education Scholarships",
    date: "Jul 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "T. Krishna Murthy",
    phone: "+91 98661*****",
    amount: 2000,
    purpose: "Temple Preservation & Festival Annadanam",
    date: "Jul 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "B. Ramu & Family",
    phone: "+91 94911*****",
    amount: 2000,
    purpose: "RO Drinking Water Plant Maintenance",
    date: "Jul 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "K. Prasad Rao (Vizag)",
    phone: "+91 98664*****",
    amount: 2000,
    purpose: "Solar Street Lighting & Sanitation",
    date: "Jul 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "Panukupeta Youth Cricket Club",
    phone: "+91 91000*****",
    amount: 2000,
    purpose: "Youth Sports & Education Scholarships",
    date: "Jul 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "A. Polinaidu",
    phone: "+91 96182*****",
    amount: 1500,
    purpose: "RO Drinking Water Plant Maintenance",
    date: "Jul 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "G. Parvathi Devi",
    phone: "+91 93901*****",
    amount: 1500,
    purpose: "Temple Preservation & Festival Annadanam",
    date: "Jul 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "D. Mohan Rao",
    phone: "+91 94413*****",
    amount: 1000,
    purpose: "General Village Development & Welfare",
    date: "Jun 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "K. Suryanarayana",
    phone: "+91 90001*****",
    amount: 1000,
    purpose: "Solar Street Lighting & Sanitation",
    date: "Jun 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "P. Eswara Rao",
    phone: "+91 95028*****",
    amount: 1000,
    purpose: "Temple Preservation & Festival Annadanam",
    date: "Jun 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "Y. Apparao",
    phone: "+91 94405*****",
    amount: 1000,
    purpose: "General Village Development & Welfare",
    date: "Jun 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "M. Someswara Rao",
    phone: "+91 98492*****",
    amount: 1000,
    purpose: "RO Drinking Water Plant Maintenance",
    date: "May 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "B. Simhachalam",
    phone: "+91 97042*****",
    amount: 1000,
    purpose: "Youth Sports & Education Scholarships",
    date: "May 2026",
    isLive: false,
    tier: "🌱 Supporter"
  },
  {
    name: "All Village Well-Wishers",
    phone: "+91 90105*****",
    amount: 1000,
    purpose: "General Village Development & Welfare",
    date: "May 2026",
    isLive: false,
    tier: "🌱 Supporter"
  }
];

let allDonors = [...foundingDonors];
let currentDonorFilter = 'all';
let currentDonorSearchQuery = '';

function maskPhoneNumber(phone) {
  if (!phone) return '•••••';
  const clean = String(phone).replace(/\s+/g, '');
  if (clean.length <= 5) return clean.slice(0, 2) + '***';
  if (clean.startsWith('+91')) {
    return clean.slice(0, 8) + '*****';
  }
  return clean.slice(0, 5) + '*****';
}

function getDonorTier(amount) {
  const num = Number(amount) || 0;
  if (num >= 10000) return '💎 Diamond Patron';
  if (num >= 5000) return '🌟 Gold Contributor';
  if (num >= 2500) return '🌿 Silver Benefactor';
  return '🌱 Supporter';
}

function getPurposeEmoji(purpose) {
  if (!purpose) return '🌾';
  const p = purpose.toLowerCase();
  if (p.includes('water') || p.includes('ro')) return '💧';
  if (p.includes('solar') || p.includes('light') || p.includes('sanitation')) return '💡';
  if (p.includes('youth') || p.includes('school') || p.includes('scholarship') || p.includes('sport')) return '🎓';
  if (p.includes('temple') || p.includes('annadanam') || p.includes('festival')) return '🛕';
  return '🌾';
}

function getAvatarInitial(name) {
  if (!name) return '👤';
  const clean = name.trim();
  return clean.charAt(0).toUpperCase();
}

function formatDonorDate(dateObj) {
  if (!dateObj) return 'Recent';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  try {
    return `${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  } catch (e) {
    return 'Recent';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function updateDonationStats() {
  const totalAmountEl = document.getElementById('stat-total-amount');
  const totalDonorsEl = document.getElementById('stat-total-donors');
  const activeCausesEl = document.getElementById('stat-active-projects');

  const totalAmount = allDonors.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalDonors = allDonors.length;

  if (totalAmountEl) totalAmountEl.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
  if (totalDonorsEl) totalDonorsEl.textContent = `${totalDonors}`;
  if (activeCausesEl) activeCausesEl.textContent = '5';
}

function setDonorFilter(category, btnElement) {
  currentDonorFilter = category;
  document.querySelectorAll('#donation-filter-chips .d-chip').forEach(chip => chip.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderDonorsList();
}

function filterDonorsList() {
  const searchInput = document.getElementById('donor-search-input');
  currentDonorSearchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';
  renderDonorsList();
}

function renderDonorsList() {
  const container = document.getElementById('donors-list-grid');
  if (!container) return;

  const filtered = allDonors.filter(donor => {
    // Category match
    let matchesCategory = true;
    if (currentDonorFilter !== 'all') {
      const p = (donor.purpose || '').toLowerCase();
      if (currentDonorFilter === 'Water') matchesCategory = p.includes('water') || p.includes('ro');
      else if (currentDonorFilter === 'Solar') matchesCategory = p.includes('solar') || p.includes('light') || p.includes('sanitation');
      else if (currentDonorFilter === 'Youth') matchesCategory = p.includes('youth') || p.includes('school') || p.includes('sport') || p.includes('scholarship');
      else if (currentDonorFilter === 'Temple') matchesCategory = p.includes('temple') || p.includes('annadanam') || p.includes('festival');
      else if (currentDonorFilter === 'General') matchesCategory = p.includes('general') || p.includes('welfare') || p.includes('development');
    }

    // Search query match
    let matchesSearch = true;
    if (currentDonorSearchQuery) {
      const nameMatch = (donor.name || '').toLowerCase().includes(currentDonorSearchQuery);
      const purposeMatch = (donor.purpose || '').toLowerCase().includes(currentDonorSearchQuery);
      const amountMatch = String(donor.amount || '').includes(currentDonorSearchQuery);
      matchesSearch = nameMatch || purposeMatch || amountMatch;
    }

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="donors-empty-state">
        <p style="font-size: 28px; margin: 0 0 8px 0;">🔍</p>
        <p style="font-weight: 700; color: #1B5E20; margin-bottom: 4px; font-size: 15px;">No donors found matching your search</p>
        <p style="font-size: 13px; color: #666; margin: 0;">Try adjusting your keywords or select "All Causes (అన్ని విరాళాలు)".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(donor => {
    const avatar = getAvatarInitial(donor.name);
    const purposeEmoji = getPurposeEmoji(donor.purpose);
    const recentBadge = donor.isLive ? '<span class="donor-badge-recent">⚡ Just Contributed</span>' : '';
    const formattedAmount = Number(donor.amount).toLocaleString('en-IN');

    return `
      <div class="donor-item-card">
        <div class="donor-info-left">
          <div class="donor-avatar">${avatar}</div>
          <div class="donor-details">
            <div class="donor-name-row">
              <h4 class="donor-name">${escapeHtml(donor.name)}</h4>
              ${recentBadge}
            </div>
            <p class="donor-purpose-tag">${purposeEmoji} ${escapeHtml(donor.purpose)}</p>
            <p class="donor-meta-sub">📞 ${escapeHtml(donor.phone)} • 📅 ${escapeHtml(donor.date)}</p>
          </div>
        </div>
        <div class="donor-amount-box">
          <div class="donor-amount">₹${formattedAmount}</div>
          <span class="donor-tier-label">${escapeHtml(donor.tier)}</span>
        </div>
      </div>
    `;
  }).join('');
}

function initDonationReport() {
  // Update stats & render static founding donors immediately
  allDonors = [...foundingDonors];
  updateDonationStats();
  renderDonorsList();

  // Connect to Firestore real-time listener if available
  if (typeof db !== 'undefined' && db) {
    try {
      db.collection('village_donations')
        .limit(50)
        .onSnapshot((snapshot) => {
          const liveList = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            const rawAmount = Number(data.amount) || 0;
            let dateStr = 'Recent';
            if (data.timestamp && typeof data.timestamp.toDate === 'function') {
              dateStr = formatDonorDate(data.timestamp.toDate());
            }

            liveList.push({
              id: doc.id,
              name: data.donorName || 'Village Well-wisher',
              phone: maskPhoneNumber(data.phone),
              amount: rawAmount,
              purpose: data.purpose || 'General Village Development',
              date: dateStr,
              isLive: true,
              tier: getDonorTier(rawAmount),
              timestampNum: data.timestamp && typeof data.timestamp.toMillis === 'function' ? data.timestamp.toMillis() : Date.now()
            });
          });

          // Sort live contributions newest first
          liveList.sort((a, b) => b.timestampNum - a.timestampNum);

          // Merge live list at top of founding donors
          allDonors = [...liveList, ...foundingDonors];
          updateDonationStats();
          renderDonorsList();
        }, (err) => {
          console.warn('Firestore village_donations read notice:', err);
          // Fallback gracefully to founding donors
          allDonors = [...foundingDonors];
          updateDonationStats();
          renderDonorsList();
        });
    } catch (e) {
      console.warn('Could not attach Firestore donation listener:', e);
    }
  }
}

// Initialize on DOM ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDonationReport);
} else {
  initDonationReport();
}



