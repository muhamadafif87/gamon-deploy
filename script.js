// ---------- Generic slider factory ----------
function createSlider(trackSelector, dotsSelector, delay){
  const track = document.querySelector(trackSelector);
  const dotsContainer = document.querySelector(dotsSelector);
  if(!track) return;

  const slides = track.children;
  const count = slides.length;
  let index = 0;
  let timer = null;

  // build dots
  if(dotsContainer){
    dotsContainer.innerHTML = '';
    for(let i=0;i<count;i++){
      const dot = document.createElement('span');
      if(i===0) dot.classList.add('active');
      dot.addEventListener('click', ()=>{
        goTo(i);
        restart();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots(){
    if(!dotsContainer) return;
    [...dotsContainer.children].forEach((d,i)=>{
      d.classList.toggle('active', i===index);
    });
  }

  function goTo(i){
    index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function next(){
    index = (index + 1) % count;
    goTo(index);
  }

  function start(){
    timer = setInterval(next, delay);
  }

  function restart(){
    clearInterval(timer);
    start();
  }

  start();

  // pause on hover (nice UX, still respects requirement of autoslide)
  const wrapper = track.parentElement;
  wrapper.addEventListener('mouseenter', ()=> clearInterval(timer));
  wrapper.addEventListener('mouseleave', start);
}

document.addEventListener('DOMContentLoaded', function(){
  const visiMisiBtn = document.getElementById('visi-misi');
  visiMisiBtn.addEventListener('click', function(){
    window.location.href="visimisi.html";
  });

  // Testimoni auto-slide every 3s
  createSlider('#testiTrack', '#testiDots', 3000);

  // Gallery auto-slide every 3.5s
  createSlider('#galleryTrack', '#galleryDots', 3500);

  // Menu horizontal scroll: enable mouse-wheel drag/scroll support
  const menuScroll = document.querySelector('.menu-scroll');
  if(menuScroll){
    let isDown = false;
    let startX;
    let scrollLeft;

    menuScroll.addEventListener('mousedown', (e)=>{
      isDown = true;
      menuScroll.classList.add('dragging');
      startX = e.pageX - menuScroll.offsetLeft;
      scrollLeft = menuScroll.scrollLeft;
    });
    menuScroll.addEventListener('mouseleave', ()=>{ isDown = false; });
    menuScroll.addEventListener('mouseup', ()=>{ isDown = false; });
    menuScroll.addEventListener('mousemove', (e)=>{
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - menuScroll.offsetLeft;
      const walk = (x - startX) * 1.5;
      menuScroll.scrollLeft = scrollLeft - walk;
    });

    // allow vertical wheel to scroll horizontally too
    menuScroll.addEventListener('wheel', (e)=>{
      if(e.deltaY !== 0){
        e.preventDefault();
        menuScroll.scrollLeft += e.deltaY;
      }
    }, { passive:false });
  }
});