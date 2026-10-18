const rev = document.querySelectorAll('.reveal');
rev.forEach((el, i) => setTimeout(() => el.classList.add('in'), 90 + i * 110));

const glow = document.getElementById('glow');
let raf = null, px = 0, py = 0;
window.addEventListener('pointermove', e => {
  px = e.clientX; py = e.clientY;
  glow.style.opacity = '.9';
  if (raf) return;
  raf = requestAnimationFrame(() => {
    glow.style.left = px + 'px'; glow.style.top = py + 'px'; raf = null;
  });
});
window.addEventListener('pointerleave', () => glow.style.opacity = '0');
if (matchMedia('(hover:hover)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  document.querySelectorAll('.card').forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `translateY(-6px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
      c.style.setProperty('--mx', (x * 100 + 50) + '%');
    });
    c.addEventListener('pointerleave', () => { c.style.transform = ''; });
  });
}
