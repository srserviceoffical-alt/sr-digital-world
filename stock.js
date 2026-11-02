// SR_STOCK — stock counts for product detail pages (SR Digital World)
// ---------------------------------------------------------------
// Har product ki stock tadaad yahan likhein. Jab kisi product ki
// tadaad set hogi to us ke detail page par "X in stock" nazar aayega.
// Khaali (null) chhorne par sirf "In Stock" likha nazar aayega,
// aur tadaad kabhi ghalat nahi dikhayi jayegi.
// Misaal: agar Canva ki 25 tadaad hai to neeche canva: 25 likh dein.
// Out of Stock products (quillbot, udemy) ki tadaad yahan se nahi
// badalti — un ka status un ke page par pehle se set hai.
var SR_STOCK = {
  canva: null,
  capcut: null,
  gemini: null,
  adobe: null,
  figma: null,
  framer: null,
  surf: null,
  nordvpn: null,
  quillbot: null,
  lovable: null,
  netflix: null,
  ytpremium: null,
  applemusic: null,
  office365: null,
  notion: null,
  ilovepdf: null,
  coursera: null,
  udemy: null,
  duolingo: null,
  linkedin: null
};
