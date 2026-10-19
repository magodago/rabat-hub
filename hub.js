const pv = document.getElementById('pv'), pvimg = document.getElementById('pvimg');
let raf = null, tx = 0, ty = 0;
function paint(){ pv.style.transform = `translate3d(${tx - 165}px,${ty - 250}px,0) scale(1) rotate(-4deg)`; raf = null; }

// Onda musical por puerta: barras con altura y desfase propios, como un medidor de estudio
const ONDA = [0.28,0.55,0.92,0.4,0.72,0.34,0.88,0.5,1,0.38,0.66,0.3,0.82,0.45,0.95,0.36,0.6,0.88,0.42,0.76,0.31,0.9,0.52,0.68,0.34,0.8];
document.querySelectorAll('.door').forEach((d, k) => {
  const wv = document.createElement('span');
  wv.className = 'wv';
  wv.setAttribute('aria-hidden', 'true');
  ONDA.forEach((h, i) => {
    const b = document.createElement('i');
    const jitter = ((i * 7 + k * 11) % 13) / 40;
    b.style.setProperty('--h', (h * (1 - jitter)).toFixed(3));
    b.style.setProperty('--d', ((i * 3 + k * 5) % 17) / 10);
    if ((i + k) % 5 === 2) b.dataset.y = '1';
    wv.appendChild(b);
  });
  const go = d.querySelector('.go');
  d.insertBefore(wv, go);
});

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
