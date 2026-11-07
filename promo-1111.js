// ============================================================
//   SR DIGITAL WORLD — 11.11 OFFER (announcement bar + popup)
//   ------------------------------------------------------------
//   OFFER: SALE11 — Flat 11% OFF on ALL tools.
//   Validity: 12 November 2026 tak (12 Nov shamil hai).
//   13 November se coupon khud expire ho jayega (coupons.js
//   mein expiry check hai) aur ye bar + popup bhi khud gayab
//   ho jayenge — kuch delete karne ki zaroorat nahi.
//
//   POPUP: har visit par dikhta hai — matlab jab bhi koi nayi
//   tab/session mein site khole, popup ek dafa aayega. Site ke
//   andar page badalne par dobara nahi aata (sessionStorage).
//   Sirf pehli dafa dikhana ho to neeche ssGet/ssSet wali
//   jagah localStorage use karein (pehle aisa hi tha).
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
  var SEEN_KEY = 'srd1111SeenSession'; // popup har visit par ek dafa
  // NOTE: announcement bar par Close (×) nahi hai — wo offer chalte
  // hue hamesha dikhegi. Sirf popup band ho sakta hai (× button se).

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }
  function isActive() { return todayStr() <= END; }
  // sessionStorage: tab band hote hi khatam — agli visit par popup dobara aayega.
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

  // Offer khatam — na bar, na popup.
  if (!isActive()) return;

  // ---- styles (site theme: orange #FA920B / #FF8200, dark #222, CTA green #15803D) ----
  var css =
    '.srd1111-bar{position:relative;z-index:1001;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px 12px;background:linear-gradient(90deg,#FA920B,#FF8200);color:#fff;font-size:14px;font-weight:600;padding:9px 14px;text-align:center;line-height:1.4}' +
    '.srd1111-bar b{font-weight:800}' +
    '.srd1111-code{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.18);border:1px dashed rgba(255,255,255,.8);border-radius:8px;padding:3px 6px 3px 10px;font-weight:800;letter-spacing:1.5px}' +
    '.srd1111-copy{background:#fff;color:#B45309;border:none;border-radius:100px;padding:4px 12px;font-weight:800;font-size:12px;cursor:pointer;white-space:nowrap;letter-spacing:0}' +
    '.srd1111-copy:hover{background:#FFF7ED}' +
    '.srd1111-overlay{position:fixed;inset:0;background:rgba(34,34,34,.55);display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;pointer-events:none;transition:opacity .25s ease;padding:16px}' +
    '.srd1111-overlay.show{opacity:1;pointer-events:auto}' +
    '.srd1111-card{position:relative;background:#fff;border-radius:20px;padding:26px 24px 24px;width:100%;max-width:430px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.28);transform:translateY(12px) scale(.98);transition:transform .25s ease;overflow:hidden}' +
    '.srd1111-card::before{content:"";position:absolute;top:0;left:0;right:0;height:6px;background:linear-gradient(90deg,#FA920B,#FF8200,#FA920B)}' +
    '.srd1111-overlay.show .srd1111-card{transform:none}' +
    '.srd1111-x{position:absolute;top:10px;right:12px;background:#fff;border:none;color:#808080;font-size:26px;line-height:1;cursor:pointer;padding:2px 6px;z-index:2}' +
    '.srd1111-x:hover{color:#222}' +
    '.srd1111-img{width:100%;max-width:340px;display:block;margin:2px auto 6px;filter:drop-shadow(0 8px 14px rgba(250,146,11,.28))}' +
    '.srd1111-card h2{font-size:23px;line-height:1.3;color:#222;margin:8px 0 6px;font-weight:800}' +
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

  // ---- announcement bar (website ke bilkul top par, hamesha dikhegi) ----
  var bar = document.createElement('div');
  bar.id = 'srd1111Bar';
  bar.className = 'srd1111-bar';
  bar.innerHTML =
    '<span>🎉 <b>11.11 Offer</b> — Flat <b>11% OFF</b> on All Tools!</span>' +
    '<span class="srd1111-code">' + CODE + '<button type="button" class="srd1111-copy">Copy</button></span>' +
    '<span>Valid till 12 Nov</span>';
  document.body.insertBefore(bar, document.body.firstChild);
  var barCopy = bar.querySelector('.srd1111-copy');
  if (barCopy) barCopy.addEventListener('click', function () { copyCode(barCopy); });

  // ---- popup (pehli visit par) ----
  var pop = document.createElement('div');
  pop.id = 'srd1111Popup';
  pop.className = 'srd1111-overlay';
  pop.innerHTML =
    '<div class="srd1111-card">' +
      '<button type="button" class="srd1111-x" aria-label="Close">×</button>' +
      '<img src="/images/promo-1111.png" alt="11.11 — The World\'s Biggest Sale Day" class="srd1111-img">' +
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

  if (!ssGet(SEEN_KEY)) {
    setTimeout(function () {
      pop.classList.add('show');
      document.body.style.overflow = 'hidden';
      ssSet(SEEN_KEY, '1');
    }, 900);
  }
})();
