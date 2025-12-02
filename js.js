// MODAL DE VIDEO
(function(){
  const openBtn  = document.getElementById("ver-video-btn");
  const modal    = document.getElementById("video-modal");
  const closeBtn = document.getElementById("cerrar-video-btn");
  const player   = document.getElementById("video-player");

  if(!openBtn || !modal || !closeBtn || !player) return;

  function abrir(){
    modal.classList.add("active");
    player.currentTime = 0;
    player.play().catch(()=>{});
  }

  function cerrar(){
    player.pause();
    modal.classList.remove("active");
  }

  openBtn.addEventListener("click", abrir);
  closeBtn.addEventListener("click", cerrar);

  modal.addEventListener("click", (e)=>{
    if(e.target === modal || e.target.classList.contains("video-modal-backdrop")){
      cerrar();
    }
  });
})();

// HEADER FIJO AL HACER SCROLL
(function(){
  const header = document.querySelector(".main-header");
  if(!header) return;

  window.addEventListener("scroll", () => {
    if(window.scrollY > 20){
      header.classList.add("is-fixed");
    } else {
      header.classList.remove("is-fixed");
    }
  });
})();

// AUDIO HISTORIA
(function(){
  const btn   = document.getElementById("audio-btn");
  const panel = document.getElementById("audio-panel");
  const audio = document.getElementById("audio-player");

  if(!btn || !panel || !audio) return;

  let activo = false;

  function setTextoPlay(){
    btn.innerHTML = `▶ ESCUCHAR HISTORIA <span class="audio-bars"><i></i><i></i><i></i></span>`;
  }

  function setTextoPause(){
    btn.innerHTML = `⏸ HISTORIA REPRODUCIÉNDOSE <span class="audio-bars"><i></i><i></i><i></i></span>`;
  }

  setTextoPlay();

  btn.addEventListener("click", ()=>{
    if(!activo){
      audio.play();
      setTextoPause();
      panel.classList.add("playing");
      activo = true;
    }else{
      audio.pause();
      setTextoPlay();
      panel.classList.remove("playing");
      activo = false;
    }
  });

  audio.addEventListener("ended", ()=>{
    setTextoPlay();
    panel.classList.remove("playing");
    activo = false;
  });
})();

// MODAL LIBROS (HISTORIA / ARTBOOK)
(function(){
  const storyBtn   = document.getElementById("story-btn");
  const artbookBtn = document.getElementById("artbook-btn");

  const modal   = document.getElementById("book-modal");
  const iframe  = document.getElementById("book-frame");
  const closeBtn= document.getElementById("close-book-btn");

  if(!modal || !iframe || !closeBtn) return;

  const STORY_URL   = "https://online.fliphtml5.com/lyxkr/dlnc/";
  const ARTBOOK_URL = "https://online.fliphtml5.com/lyxkr/mawm/";

  function abrirLibro(url){
    iframe.src = url;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function cerrarLibro(){
    modal.classList.remove("active");
    iframe.src = "";
    document.body.style.overflow = "";
  }

  if(storyBtn){
    storyBtn.addEventListener("click", ()=> abrirLibro(STORY_URL));
  }

  if(artbookBtn){
    artbookBtn.addEventListener("click", ()=> abrirLibro(ARTBOOK_URL));
  }

  closeBtn.addEventListener("click", cerrarLibro);

  modal.addEventListener("click", (e)=>{
    if(e.target === modal || e.target.classList.contains("book-modal-backdrop")){
      cerrarLibro();
    }
  });
})();

// VIDEOS DE PERSONAJES 

document.querySelectorAll(".character-card video").forEach(video => {
  video.play().catch(() => {});
});

// ===== MODAL PERSONAJES =====
(function(){

  const modal = document.getElementById("personaje-modal");
  const closeBtn = document.querySelector(".personaje-close");
  const backdrop = document.querySelector(".personaje-backdrop");

  const modalVideo = document.getElementById("modal-video");
  const nombre = document.getElementById("modal-nombre");
  const descripcion = document.getElementById("modal-descripcion");
  const nivel = document.getElementById("modal-nivel");

  document.querySelectorAll(".character-card").forEach(card => {

    card.addEventListener("click", () => {

      const video = card.querySelector("source").src;
      const titulo = card.dataset.nombre;
      const texto = card.dataset.descripcion;
      const peligro = card.dataset.nivel;

      modalVideo.src = video;
      nombre.textContent = titulo;
      descripcion.textContent = texto;
      nivel.textContent = "Nivel de peligro: " + peligro;

      modal.classList.add("active");
    });

  });

  function cerrarModal(){
    modal.classList.remove("active");
    modalVideo.pause();
  }

  closeBtn.addEventListener("click", cerrarModal);
  backdrop.addEventListener("click", cerrarModal);

})();


