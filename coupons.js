// ============================================================
//   SR DIGITAL WORLD — COUPON CODES
//   Ye file website ke tamam coupon codes control karti hai.
//   ------------------------------------------------------------
//   CODE BADALNA / NAYA CODE BANANA:
//   Neeche SRD_COUPONS wali list mein sirf apni line edit karein.
//
//   Har line ka matlab:
//     code    = jo code customer likhe ga (bara/chhota letter
//               farq nahi parta — CAPITAL mein likhna behtar hai)
//     percent = kitne % discount milega (maslan 5 matlab 5% OFF)
//     applies = "ALL" matlab har tool par chalega.
//               Sirf ek tool ke liye us ka naam likhein, maslan
//               applies: "canva"  ya 2-3 tools ke liye
//               applies: ["canva", "capcut"]
//               (Tool ke naam: canva, capcut, gemini, netflix,
//                surf, nordvpn, ytpremium, applemusic, adobe,
//                coursera, figma, framer, ilovepdf, linkedin,
//                lovable, office365, notion, quillbot, duolingo,
//                udemy)
//     expiry  = code kis date tak chalega. Khali "" matlab
//               koi expiry nahi. Date is format mein likhein:
//               "2026-10-31" (us date ke khatam tak valid hai)
//
//   CODE BAND KARNA HO TO: us ki line ke agay // laga dein,
//   ya percent wali line hi delete kar dein.
//   NAYA CODE: ek line copy kar ke neeche paste karein aur
//   code/percent badal lein. Har line ke akhir mein comma ( , )
//   lazmi rakhein, akhri line ke ilawa.
// ============================================================

window.SRD_COUPONS = [
  { code: "SRDIGITALWORLD5", percent: 5, applies: "ALL", expiry: "" },

  // ——— Misal (ye band hain, chalane ke liye // hata dein) ———
  // { code: "CANVA10", percent: 10, applies: "canva", expiry: "2026-10-31" },
  // { code: "WELCOME5", percent: 5, applies: ["netflix", "ytpremium"], expiry: "" },
];

// ------------------------------------------------------------
//   Neeche wala hissa system ka hai — is ko change na karein.
// ------------------------------------------------------------

window.SRD_findCoupon = function (rawCode, slug) {
  var code = (rawCode || "").toString().trim().toUpperCase();
  if (!code) return { ok: false, reason: "empty" };
  var list = window.SRD_COUPONS || [];
  for (var i = 0; i < list.length; i++) {
    var c = list[i];
    if (!c || !c.code) continue;
    if (c.code.toString().trim().toUpperCase() !== code) continue;
    // expiry check (browser ki aj ki date se)
    if (c.expiry) {
      var now = new Date();
      var today = now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");
      if (today > c.expiry) return { ok: false, reason: "expired" };
    }
    // tool check
    var applies = c.applies;
    var okTool = false;
    if (applies === "ALL") okTool = true;
    else if (typeof applies === "string") okTool = (applies === slug);
    else if (Array.isArray(applies)) okTool = applies.indexOf(slug) !== -1;
    if (!okTool) return { ok: false, reason: "wrongtool" };
    var pct = parseInt(c.percent, 10);
    if (!(pct > 0 && pct < 100)) return { ok: false, reason: "invalid" };
    return { ok: true, code: c.code.toString().trim().toUpperCase(), percent: pct };
  }
  return { ok: false, reason: "invalid" };
};

window.SRD_couponErrorText = function (reason) {
  if (reason === "empty") return "Pehle coupon code likhein, phir Apply dabayein.";
  if (reason === "expired") return "Ye coupon code expire ho chuka hai.";
  if (reason === "wrongtool") return "Ye code is tool ke liye nahi hai.";
  return "Invalid coupon code — dobara check kar ke likhein.";
};

window.SRD_applyPrice = function (price, percent) {
  var discount = Math.round(price * percent / 100);
  return { discount: discount, final: price - discount };
};

// Order form (modal) ke liye Apply button ka kaam
window.srdApplyModalCoupon = function () {
  var inp = document.getElementById("mCoupon");
  var msgEl = document.getElementById("couponMsg");
  if (!inp || !msgEl) return;
  var slug = window._srdSlug || (typeof curCardId !== "undefined" ? curCardId : "");
  var res = SRD_findCoupon(inp.value, slug);
  if (res.ok) {
    window._srdCoupon = res;
    var base = parseInt((typeof curPrice !== "undefined" ? curPrice : "").replace(/[^0-9]/g, ""), 10);
    if (base > 0) {
      var r = SRD_applyPrice(base, res.percent);
      msgEl.textContent = "✅ Coupon lag gaya! " + res.percent + "% OFF — Nayi price: Rs. " + r.final + " (asal price: Rs. " + base + ")";
      var chip = document.getElementById("modalChip");
      if (chip && typeof curProduct !== "undefined") chip.textContent = curProduct + " — Rs. " + r.final + " (" + res.percent + "% OFF)";
    } else {
      msgEl.textContent = "✅ Coupon lag gaya! " + res.percent + "% OFF — discount WhatsApp order mein lag jayega.";
    }
    msgEl.style.color = "#15803d";
  } else {
    window._srdCoupon = null;
    msgEl.textContent = SRD_couponErrorText(res.reason);
    msgEl.style.color = "#dc2626";
  }
};

// Coupon fields ki styling (design isi file se ata hai)
(function () {
  var css =
    ".coupon-row{display:flex;gap:8px;margin-top:10px}" +
    ".coupon-row .coupon-input{flex:1;margin-top:0;text-transform:uppercase}" +
    ".coupon-apply{background:var(--primary,#FA920B);color:#fff;border:none;border-radius:8px;padding:0 18px;font-weight:700;font-size:13px;cursor:pointer;white-space:nowrap}" +
    ".coupon-apply:hover{background:var(--accent,#FF8200)}" +
    ".coupon-msg{font-size:12.5px;font-weight:600;margin-top:7px;min-height:16px}" +
    ".pd-coupon{margin-top:18px;border:1px dashed var(--border,#e2e2e2);border-radius:12px;padding:12px 14px}" +
    ".pd-coupon-row{display:flex;gap:8px}" +
    ".pd-coupon-row input{flex:1;border:1px solid var(--border,#ddd);border-radius:8px;padding:10px 12px;font-size:14px;text-transform:uppercase;background:#fff;color:var(--text,#222)}" +
    ".pd-coupon-btn{background:var(--primary,#FA920B);color:#fff;border:none;border-radius:8px;padding:0 20px;font-weight:700;font-size:13.5px;cursor:pointer}" +
    ".pd-coupon-btn:hover{background:var(--accent,#FF8200)}" +
    ".pd-coupon-msg{font-size:12.5px;font-weight:600;margin-top:7px;min-height:16px}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);
})();
