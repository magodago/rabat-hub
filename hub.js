const pv = document.getElementById('pv'), pvimg = document.getElementById('pvimg');
let raf = null, tx = 0, ty = 0;
function paint(){ pv.style.transform = `translate3d(${tx - 165}px,${ty - 250}px,0) scale(1) rotate(-4deg)`; raf = null; }
document.querySelectorAll('.door').forEach(d => {
  d.addEventListener('mouseenter', e => {
    pvimg.src = d.dataset.pv; pv.classList.add('on'); tx = e.clientX; ty = e.clientY; paint();
  });
  d.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    if (!raf) raf = requestAnimationFrame(paint);
  });
  d.addEventListener('mouseleave', () => pv.classList.remove('on'));
});
