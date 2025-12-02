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


// PLANETA 3D

(function(){

const container = document.getElementById("planeta-container");
if(!container) return;

// ESCENA
const scene = new THREE.Scene();

// CÁMARA
const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0,0,5);

// RENDER
const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// LUCES
const light = new THREE.DirectionalLight(0xffffff, 1.4);
light.position.set(5,10,5);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,0.5));

// CONTROLES
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.6;
controls.enableDamping = true;
controls.maxDistance = 12;
controls.minDistance = 4;

// MODELO
const loader = new THREE.GLTFLoader();
let planeta;

loader.load("planeta.glb", (gltf)=>{

  planeta = gltf.scene;
  planeta.scale.set(2.3,2.3,2.3);
  planeta.position.set(0,-0.1,0);
  scene.add(planeta);

  const box = new THREE.Box3().setFromObject(planeta);
  const center = box.getCenter(new THREE.Vector3());
  planeta.position.sub(center);

});

// CLICK = PAUSAR ROTACIÓN
let rotando = true;
container.addEventListener("click",()=>{
  rotando = !rotando;
  controls.autoRotate = rotando;
});

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene,camera);
}
animate();

// RESPONSIVE
window.addEventListener("resize",()=>{
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

})();
