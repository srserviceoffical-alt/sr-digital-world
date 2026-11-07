// ============================================================
//   SR DIGITAL WORLD — 11.11 OFFER (announcement bar + popup)
//   ------------------------------------------------------------
//   OFFER: SALE11 — Flat 11% OFF on ALL tools.
//   Validity: 12 November 2026 tak (12 Nov shamil hai).
//   13 November se coupon khud expire ho jayega (coupons.js
//   mein expiry check hai) aur ye bar + popup bhi khud gayab
//   ho jayenge — kuch delete karne ki zaroorat nahi.
//
//   CODE BADALNA HO TO: neeche SRD_1111_CODE badlein AUR
//   coupons.js mein usi code wali line bhi badlein — dono
//   jagah ek hi code hona chahiye, warna copy kiya hua
//   code kaam nahi karega.
//   EXPIRY BADALNI HO TO: coupons.js mein expiry date badlein
//   aur neeche SRD_1111_END bhi wohi date rakhein.
// ============================================================
(function () {
  var CODE = 'SALE11';
  var END = '2026-11-12'; // is date tak valid (12 Nov shamil)
  var SEEN_KEY = 'srd1111Seen';       // popup ek browser mein ek dafa
  var BAR_KEY = 'srd1111BarClosed';   // bar band karne par dobara na dikhe

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }
  function isActive() { return todayStr() <= END; }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // Offer khatam — na bar, na popup.
  if (!isActive()) return;

  // ---- styles (site theme: orange #FA920B / #FF8200, dark #222, CTA green #15803D) ----
  var css =
    '.srd1111-bar{position:relative;z-index:1001;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px 12px;background:linear-gradient(90deg,#FA920B,#FF8200);color:#fff;font-size:14px;font-weight:600;padding:9px 40px 9px 14px;text-align:center;line-height:1.4}' +
    '.srd1111-bar b{font-weight:800}' +
    '.srd1111-code{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.18);border:1px dashed rgba(255,255,255,.8);border-radius:8px;padding:3px 6px 3px 10px;font-weight:800;letter-spacing:1.5px}' +
    '.srd1111-copy{background:#fff;color:#B45309;border:none;border-radius:100px;padding:4px 12px;font-weight:800;font-size:12px;cursor:pointer;white-space:nowrap;letter-spacing:0}' +
    '.srd1111-copy:hover{background:#FFF7ED}' +
    '.srd1111-bar-x{position:absolute;right:8px;top:50%;transform:translateY(-50%);background:transparent;border:none;color:#fff;font-size:20px;line-height:1;cursor:pointer;padding:4px 8px;opacity:.85}' +
    '.srd1111-bar-x:hover{opacity:1}' +
    '.srd1111-overlay{position:fixed;inset:0;background:rgba(34,34,34,.55);display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;pointer-events:none;transition:opacity .25s ease;padding:16px}' +
    '.srd1111-overlay.show{opacity:1;pointer-events:auto}' +
    '.srd1111-card{position:relative;background:#fff;border-radius:20px;padding:28px 24px 24px;width:100%;max-width:420px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.28);transform:translateY(12px) scale(.98);transition:transform .25s ease}' +
    '.srd1111-overlay.show .srd1111-card{transform:none}' +
    '.srd1111-x{position:absolute;top:8px;right:12px;background:none;border:none;color:#808080;font-size:26px;line-height:1;cursor:pointer;padding:4px}' +
    '.srd1111-x:hover{color:#222}' +
    '.srd1111-badge{display:inline-block;background:rgba(250,146,11,.12);color:#B45309;font-weight:800;font-size:12px;letter-spacing:1.5px;padding:6px 14px;border-radius:100px}' +
    '.srd1111-card h2{font-size:22px;line-height:1.3;color:#222;margin:14px 0 6px;font-weight:800}' +
    '.srd1111-sub{color:#808080;font-size:15px;margin:0 0 16px}' +
    '.srd1111-codebox{display:flex;gap:8px;justify-content:center;align-items:stretch;margin:0 0 14px;flex-wrap:wrap}' +
    '.srd1111-codebox span{border:2px dashed #FA920B;border-radius:10px;padding:10px 18px;font-weight:900;letter-spacing:2px;font-size:18px;color:#222}' +
    '.srd1111-codebox .srd1111-copy{background:#FA920B;color:#fff;font-size:14px;padding:10px 18px;border-radius:10px}' +
    '.srd1111-codebox .srd1111-copy:hover{background:#FF8200}' +
    '.srd1111-brand{font-weight:800;color:#222;margin:0 0 4px}' +
    '.srd1111-valid{font-size:12px;color:#808080;margin:0 0 18px}' +
    '.srd1111-shop{display:inline-block;background:#15803D;color:#fff!important;font-weight:800;font-size:15px;padding:12px 30px;border-radius:100px;text-decoration:none;box-shadow:0 4px 14px rgba(250,146,11,.35)}' +
    '.srd1111-shop:hover{background:#166534;color:#fff!important}' +
    '@media(max-width:480px){.srd1111-bar{font-size:13px}.srd1111-card h2{font-size:20px}.srd1111-codebox span{font-size:16px}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  function copyCode(btn) {
    function done() {
      var o = btn.getAttribute('data-label') || btn.textContent;
      btn.setAttribute('data-label', o);
      btn.textContent = 'Copied ✓';
      setTimeout(function () { btn.textContent = o; }, 1500);
    }
    function fallback() {
      var t = document.createElement('textarea');
      t.value = CODE;
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(t);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(CODE).then(done, fallback);
    } else { fallback(); }
  }

  // ---- announcement bar (website ke bilkul top par) ----
  if (!lsGet(BAR_KEY)) {
    var bar = document.createElement('div');
    bar.id = 'srd1111Bar';
    bar.className = 'srd1111-bar';
    bar.innerHTML =
      '<span>🎉 <b>11.11 Offer</b> — Flat <b>11% OFF</b> on All Tools!</span>' +
      '<span class="srd1111-code">' + CODE + '<button type="button" class="srd1111-copy">Copy</button></span>' +
      '<span>Valid till 12 Nov</span>' +
      '<button type="button" class="srd1111-bar-x" aria-label="Close">×</button>';
    document.body.insertBefore(bar, document.body.firstChild);
    var barCopy = bar.querySelector('.srd1111-copy');
    if (barCopy) barCopy.addEventListener('click', function () { copyCode(barCopy); });
    var barX = bar.querySelector('.srd1111-bar-x');
    if (barX) barX.addEventListener('click', function () {
      bar.style.display = 'none';
      lsSet(BAR_KEY, '1');
    });
  }

  // ---- popup (pehli visit par) ----
  var pop = document.createElement('div');
  pop.id = 'srd1111Popup';
  pop.className = 'srd1111-overlay';
  pop.innerHTML =
    '<div class="srd1111-card">' +
      '<button type="button" class="srd1111-x" aria-label="Close">×</button>' +
      '<span class="srd1111-badge">🎉 11.11 SALE</span>' +
      '<h2>Pakistan\'s Biggest Sale – 11.11 Offer</h2>' +
      '<p class="srd1111-sub">Get Flat 11% OFF on All Tools!</p>' +
      '<div class="srd1111-codebox"><span>' + CODE + '</span><button type="button" class="srd1111-copy">Copy Code</button></div>' +
      '<p class="srd1111-brand">SR Digital World Tools</p>' +
      '<p class="srd1111-valid">Valid till 12 November 2026</p>' +
      '<a href="/products/" class="srd1111-shop">Shop Now →</a>' +
    '</div>';
  document.body.appendChild(pop);

  function closePopup() {
    pop.classList.remove('show');
    document.body.style.overflow = '';
  }
  var popX = pop.querySelector('.srd1111-x');
  if (popX) popX.addEventListener('click', closePopup);
  pop.addEventListener('click', function (e) { if (e.target === pop) closePopup(); });
  var popCopy = pop.querySelector('.srd1111-copy');
  if (popCopy) popCopy.addEventListener('click', function () { copyCode(popCopy); });
  var shop = pop.querySelector('.srd1111-shop');
  if (shop) shop.addEventListener('click', closePopup);

  if (!lsGet(SEEN_KEY)) {
    setTimeout(function () {
      pop.classList.add('show');
      document.body.style.overflow = 'hidden';
      lsSet(SEEN_KEY, '1');
    }, 900);
  }
})();
