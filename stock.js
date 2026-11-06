// SR_STOCK — stock counts for product pages (SR Digital World)
// ---------------------------------------------------------------
// Har product ki stock tadaad yahan likhein. Jab kisi product ki
// tadaad set hogi to us ke detail page par "X in stock" nazar aayega
// aur catalog + homepage cards par badge "● X in Stock" ho jayega.
// Khaali (null) chhorne par sirf "In Stock" likha nazar aayega,
// aur tadaad kabhi ghalat nahi dikhayi jayegi.
// Misaal: agar Canva ki 25 tadaad hai to neeche canva: 25 likh dein.
// Out of Stock products (quillbot, ytpremium, coursera) ki tadaad
// yahan se nahi badalti — un ka status un ke page par pehle se set hai.
var SR_STOCK = {
  canva: 250,
  capcut: 7,
  gemini: 20,
  adobe: 66,
  figma: 20,
  framer: 2,
  surf: 5,
  nordvpn: 10,
  quillbot: null,
  lovable: 3,
  netflix: 5,
  ytpremium: null,
  applemusic: 110,
  office365: 55,
  notion: 30,
  ilovepdf: 44,
  coursera: null,
  udemy: 3,
  duolingo: 25,
  linkedin: 20
};

// Catalog + homepage cards: har card ke badge par us ki tadaad likhein.
// Card ki poster image (images/cards/<slug>.webp) se slug pehchana jata
// hai; "Sold Out" wale cards (badge par .out class) ko nahi chhera jata.
(function(){
  function showCardCounts(){
    if(typeof document === 'undefined') return;
    document.querySelectorAll('.pc-banner img.pc-poster').forEach(function(img){
      var m = img.src.match(/\/images\/cards\/([a-z0-9]+)\.webp$/);
      if(!m) return;
      var n = SR_STOCK[m[1]];
      if(typeof n !== 'number') return;
      var banner = img.closest('.pc-banner');
      if(!banner) return;
      var badge = banner.querySelector('.pc-stock.in');
      if(badge) badge.textContent = '\u25CF ' + n + ' in Stock';
    });
  }
  if(typeof document !== 'undefined'){
    if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', showCardCounts); }
    else { showCardCounts(); }
  }
})();
