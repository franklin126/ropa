document.addEventListener('DOMContentLoaded',()=>{

  /* ---------- Datos de producto ---------- */
  const PRODUCTS = [
    // Casacas (5)
    {id:"cas-1",cat:"casaca",name:"Casaca Negra Clásica",desc:"Ideal para días fríos y salidas casuales.",price:120,img:"assets/1.png"},
    {id:"cas-2",cat:"casaca",name:"Casaca Roja Deportiva",desc:"Ligera y cómoda para el día a día.",price:135,img:"assets/2.png"},
    {id:"cas-3",cat:"casaca",name:"Casaca Azul Denim",desc:"Estilo urbano con acabado desgastado.",price:160,img:"assets/3.png"},
    {id:"cas-4",cat:"casaca",name:"Casaca Beige Casual",desc:"Versátil y elegante para media estación.",price:110,img:"assets/4.png"},
    {id:"cas-5",cat:"casaca",name:"Casaca Impermeable",desc:"Protección y estilo para días de lluvia.",price:150,img:"assets/5.png"},

    // Chompas (5)
    {id:"cho-1",cat:"chompa",name:"Chompa Crema",desc:"Tejido fino y elegante para invierno.",price:85,img:"assets/c1.png"},
    {id:"cho-2",cat:"chompa",name:"Chompa Gris Oversize",desc:"Estilo relajado y cómodo.",price:95,img:"assets/c2.png"},
    {id:"cho-3",cat:"chompa",name:"Chompa Rayas Pastel",desc:"Colorida y suave al tacto.",price:100,img:"assets/c3.png"},
    {id:"cho-4",cat:"chompa",name:"Chompa Negra Cuello Alto",desc:"Elegancia y abrigo en uno solo.",price:110,img:"assets/c4.png"},
    {id:"cho-5",cat:"chompa",name:"Chompa Azul Marino",desc:"Clásica, ideal para días fríos.",price:90,img:"assets/c5.png"},

    // Pantalones (5)
    {id:"pan-1",cat:"pantalon",name:"Jeans Azul Clásico",desc:"Resistentes y cómodos para todo uso.",price:110,img:"assets/Jeans.jpg"},
    {id:"pan-2",cat:"pantalon",name:"Pantalón Beige Casual",desc:"Ligero, ideal para climas cálidos.",price:95,img:"assets/beige.png"},
    {id:"pan-3",cat:"pantalon",name:"Jeans Desgastados",desc:"Estilo urbano con detalles rasgados.",price:130,img:"assets/rasgado.png"},
    {id:"pan-4",cat:"pantalon",name:"Pantalón Negro Slim",desc:"Moderno y adaptable para toda ocasión.",price:105,img:"assets/negro.png"},
    {id:"pan-5",cat:"pantalon",name:"Joggers Deportivos",desc:"Cómodos y flexibles para moverse libremente.",price:80,img:"assets/deporte.png"},

    // Zapatillas (5)
    {id:"zap-1",cat:"zapatilla",name:"Zapatillas Blancas",desc:"Minimalistas y combinan con todo.",price:180,img:"assets/blaco.jpg"},
    {id:"zap-2",cat:"zapatilla",name:"Zapatillas Negras Urbanas",desc:"Comodidad y resistencia diaria.",price:200,img:"assets/Urbanas.png"},
    {id:"zap-3",cat:"zapatilla",name:"Zapatillas Rojas Running",desc:"Ideales para entrenar o salir.",price:190,img:"https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&q=80&w=900"},
    {id:"zap-4",cat:"zapatilla",name:"Zapatillas Azules Retro",desc:"Estilo vintage con tecnología moderna.",price:170,img:"assets/hola.png"},
    {id:"zap-5",cat:"zapatilla",name:"Zapatillas Grises Minimal",desc:"Diseño neutro y elegante.",price:160,img:"assets/blaco.png"},
  ];

  const grid = document.getElementById('product-grid');
  const gallery = document.getElementById('mini-gallery');
  const searchInput = document.getElementById('search');
  const chips = Array.from(document.querySelectorAll('.chip'));
  const cartCountEl = document.getElementById('cart-count') || null;
  let cartCount = 0;
  let activeFilter = 'all';

  function renderProducts(list){
    if(!grid) return;
    grid.innerHTML = '';
    list.forEach(p=>{
      const el = document.createElement('article');
      el.className = 'product';
      el.innerHTML = `
        <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy" data-large="${p.img}">
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.desc)}</p>
        <div class="price">S/ ${p.price.toFixed(2)}</div>
        <div style="margin-top:.6rem;display:flex;gap:.5rem">
          <button class="btn add small" data-id="${p.id}">Agregar (visual)</button>
          <a class="btn ghost small" href="${getCategoryLink(p.cat)}">Ver categoría</a>
        </div>
      `;
      grid.appendChild(el);
    });

    document.querySelectorAll('#product-grid img').forEach(img=>{
      img.addEventListener('click', ()=> openLightbox(img.dataset.large || img.src));
    });

    document.querySelectorAll('.add').forEach(b=>{
      b.addEventListener('click', e=>{
        cartCount++;
        updateCartCount();
        b.textContent = '✓ Agregado';
        b.disabled = true;
        setTimeout(()=>{ b.textContent = 'Agregar (visual)'; b.disabled=false; },1200);
      });
    });
  }

  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function updateCartCount(){ if(cartCountEl) cartCountEl.textContent = cartCount; const cartCount2 = document.getElementById('cart-count-2'); if(cartCount2) cartCount2.textContent = cartCount; }
  function getCategoryLink(cat){
    switch(cat){
      case 'casaca': return 'casacas.html';
      case 'chompa': return 'chompas.html';
      case 'pantalon': return 'pantalones.html';
      case 'zapatilla': return 'zapatillas.html';
      default: return 'index.html';
    }
  }

  function applyFilter(){
    const query = (searchInput?.value || '').toLowerCase().trim();
    let list = PRODUCTS.filter(p=>{
      if(activeFilter !== 'all' && p.cat !== activeFilter) return false;
      if(!query) return true;
      return (p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
    });
    renderProducts(list);
  }

  if(chips.length){
    chips.forEach(ch=>{
      ch.addEventListener('click', ()=>{
        chips.forEach(c=>c.classList.remove('active'));
        ch.classList.add('active');
        activeFilter = ch.dataset.filter;
        applyFilter();
      });
    });
  }

  if(searchInput){
    searchInput.addEventListener('input', debounce(()=> applyFilter(), 220));
  }

  function debounce(fn,wait){ let t; return function(){ clearTimeout(t); t=setTimeout(()=>fn.apply(this,arguments),wait); } }

  const lightbox = document.getElementById('lightbox');
  function openLightbox(src){
    if(!lightbox) return;
    const img = lightbox.querySelector('img');
    img.src = src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){
    if(!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
  }
  document.addEventListener('click', (e)=>{
    if(e.target.matches('.lightbox') || e.target.matches('.lb-close')) closeLightbox();
  });

  if(gallery){
    gallery.querySelectorAll('img').forEach(img=>{
      img.addEventListener('click', ()=> openLightbox(img.dataset.large || img.src));
    });
  }

  const burger = document.getElementById('burger');
  if(burger){
    burger.addEventListener('click', ()=>{
      const nav = document.querySelector('.main-nav');
      nav.classList.toggle('open'); 
    });
  }

  renderProducts(PRODUCTS);

  document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeLightbox(); });

  let lastScroll = 0;
  const header = document.querySelector('.topbar');
  if(header){
    window.addEventListener('scroll', ()=>{
      const y = window.scrollY;
      if(y > 60) header.classList.add('scrolled'); else header.classList.remove('scrolled');
      lastScroll = y;
    });
  }

});
