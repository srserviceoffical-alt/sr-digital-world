/* SR Digital World - Cart system (cart.js) */
(function(){
  var WA_NUMBER = '923229952880';
  var KEY = 'sr_cart';
  function getCart(){ try { var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; } catch(e){ return []; } }
  function saveCart(items){ localStorage.setItem(KEY, JSON.stringify(items)); updateBadge(); }
  function priceNum(s){ return (s || '').replace(/[^0-9]/g, ''); }
  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function updateBadge(){
    var n = getCart().length;
    document.querySelectorAll('.sr-cart-count').forEach(function(b){
      b.textContent = n;
      b.style.display = n > 0 ? 'flex' : 'none';
    });
  }
  function toast(msg){
    var t = document.getElementById('srToast');
    if(!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(function(){ t.classList.remove('show'); }, 2000);
  }
  function pushItem(name, plan, price){
    var items = getCart();
    items.push({name: name, plan: plan, price: price});
    saveCart(items);
    toast('✓ Cart mein add ho gaya: ' + name);
  }
  window.srAddToCart = function(btn){
    var card = btn ? btn.closest('.product-card') : null;
    var name, price, plan;
    if(card){
      var nameEl = card.querySelector('.product-name');
      var priceEl = card.querySelector('.price-amount');
      var tab = card.querySelector('.dur-tab.active');
      name = nameEl ? nameEl.textContent.trim() : 'Product';
      price = priceEl ? priceEl.textContent.replace('Rs.', '').trim() : '';
      plan = tab ? tab.textContent.trim() : '';
    } else {
      var pdName = document.querySelector('.pd-name');
      var pdPrice = document.getElementById('pdPrice');
      var pdDur = document.getElementById('pdDur');
      name = pdName ? pdName.textContent.trim() : 'Product';
      price = pdPrice ? pdPrice.textContent.replace('Rs.', '').trim() : '';
      plan = pdDur ? pdDur.textContent.replace('/', '').trim() : '';
      if(!plan){ var p = document.querySelector('.pd-plan.active'); if(p) plan = p.textContent.trim(); }
    }
    pushItem(name, plan, price);
  };
  window.srAddBundleToCart = function(){
    var sel = document.querySelectorAll('.bundle-card.selected');
    if(sel.length === 0){ toast('Pehle koi tool select karein'); return; }
    var names = [];
    sel.forEach(function(el){ names.push(el.getAttribute('data-name') + ' (' + el.getAttribute('data-plan') + ')'); });
    var totalEl = document.getElementById('bsTotal');
    var total = totalEl ? totalEl.textContent.replace('Rs.', '').trim() : '';
    pushItem('Bundle Deal (' + sel.length + ' tools)', names.join(', '), total);
  };
  window.srRemoveFromCart = function(i){
    var items = getCart();
    items.splice(i, 1);
    saveCart(items);
    renderCart();
  };
  window.srClearCart = function(){ saveCart([]); renderCart(); };
  window.srOpenCart = function(){
    renderCart();
    document.getElementById('srCartOverlay').style.display = 'flex';
  };
  window.srCloseCart = function(){
    document.getElementById('srCartOverlay').style.display = 'none';
  };
  function renderCart(){
    var list = document.getElementById('srCartItems');
    var totalEl = document.getElementById('srCartTotal');
    var waBtn = document.getElementById('srCartWa');
    var items = getCart();
    if(items.length === 0){
      list.innerHTML = '<p class="sr-cart-empty">Cart khaali hai — koi tool add karein.</p>';
      totalEl.textContent = '';
      waBtn.style.display = 'none';
      return;
    }
    var total = 0;
    var html = '';
    items.forEach(function(it, i){
      var p = parseInt(priceNum(it.price), 10) || 0;
      total += p;
      html += '<div class="sr-cart-item"><div><div class="sr-cart-name">' + escapeHtml(it.name) + '</div><div class="sr-cart-plan">' + escapeHtml(it.plan) + '</div></div><div class="sr-cart-right"><span class="sr-cart-price">Rs. ' + p + '</span><button class="sr-cart-remove" onclick="srRemoveFromCart(' + i + ')" title="Remove">×</button></div></div>';
    });
    list.innerHTML = html;
    totalEl.textContent = 'Total: Rs. ' + total;
    waBtn.style.display = 'flex';
    var lines = ['Assalam-o-Alaikum! Main ye items order karna chahta hoon:'];
    items.forEach(function(it, i){ lines.push((i + 1) + '. ' + it.name + ' (' + it.plan + ') — Rs. ' + (parseInt(priceNum(it.price), 10) || 0)); });
    lines.push('Total: Rs. ' + total);
    waBtn.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
  }
  document.addEventListener('DOMContentLoaded', function(){
    if(!document.getElementById('srCartBtn')){
      var btn = document.createElement('button');
      btn.id = 'srCartBtn';
      btn.className = 'sr-cart-float';
      btn.setAttribute('onclick', 'srOpenCart()');
      btn.setAttribute('title', 'Cart');
      btn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i><span class="sr-cart-count">0</span>';
      document.body.appendChild(btn);
    }
    if(!document.getElementById('srCartOverlay')){
      var overlay = document.createElement('div');
      overlay.id = 'srCartOverlay';
      overlay.className = 'sr-cart-overlay';
      overlay.innerHTML = '<div class="sr-cart-box"><div class="sr-cart-head"><h3>Your Cart</h3><button class="sr-cart-close" onclick="srCloseCart()">×</button></div><div id="srCartItems"></div><div id="srCartTotal" class="sr-cart-total"></div><a id="srCartWa" class="sr-cart-wa" href="#" target="_blank"><i class="fa-brands fa-whatsapp"></i> Order All on WhatsApp</a><button class="sr-cart-clear" onclick="srClearCart()">Clear Cart</button></div>';
      overlay.addEventListener('click', function(e){ if(e.target === overlay) srCloseCart(); });
      document.body.appendChild(overlay);
    }
    if(!document.getElementById('srToast')){
      var t = document.createElement('div');
      t.id = 'srToast';
      t.className = 'sr-toast';
      document.body.appendChild(t);
    }
    updateBadge();
    /* navbar is fetched async — sync its badge once it arrives */
    var navObs = new MutationObserver(function(){
      if(document.querySelector('.nav-cart-count')){ updateBadge(); navObs.disconnect(); }
    });
    navObs.observe(document.body, {childList: true, subtree: true});
  });
})();
