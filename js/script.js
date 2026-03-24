// ── CODE PROTECTION ──
// document.addEventListener('contextmenu', function (e) { e.preventDefault() });
// document.addEventListener('keydown', function (e) {
//   if (e.ctrlKey && ['u', 'U', 's', 'S'].includes(e.key)) e.preventDefault();
//   if (e.key === 'F12') e.preventDefault();
//   if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) e.preventDefault();
// });
// document.addEventListener('selectstart', function (e) {
//   if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
// });
// // Debugger trap
// (function () { var _ = function () { var t = new Date; debugger; return new Date - t > 100 }; setInterval(function () { if (_()) document.title = 'The Coding Expert' }, 1500) })();

// ── PAGE LOADER ──
window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('loader').classList.add('hide');
        setTimeout(function () { AOS.refresh(); }, 650);
    }, 1600);
});

// ── SCROLL PROGRESS ──
window.addEventListener('scroll', function () {
    var s = window.scrollY, h = document.body.scrollHeight - window.innerHeight;
    document.getElementById('scroll-prog').style.width = (s / h * 100) + '%';
    document.getElementById('backTop').classList.toggle('show', s > 400);
    document.querySelector('.navbar-wrap').classList.toggle('scrolled', s > 60);
});

// ── HAMBURGER ──
document.getElementById('hbg').addEventListener('click', function () {
    document.getElementById('mobMenu').classList.toggle('open');
});

// ── AOS INIT ──
AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic', offset: 60 });

// ── SWIPER: FACULTY ──
new Swiper('.swiper-faculty', {
    loop: true, autoplay: { delay: 3500, disableOnInteraction: false },
    slidesPerView: 3, spaceBetween: 24,
    pagination: { el: '.swiper-faculty .swiper-pagination', clickable: true },
    breakpoints: { 0: { slidesPerView: 1 }, 700: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
});

// ── SWIPER: TESTIMONIALS ──
new Swiper('.swiper-testi', {
    loop: true, autoplay: { delay: 4000, disableOnInteraction: false },
    slidesPerView: 3, spaceBetween: 24,
    pagination: { el: '.swiper-testi .swiper-pagination', clickable: true },
    breakpoints: { 0: { slidesPerView: 1 }, 700: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
});

// ── HERO CANVAS PARTICLES ──
(function () {
    var c = document.getElementById('heroCanvas'), ctx = c.getContext('2d');
    var W, H, particles = [];
    function resize() { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; }
    window.addEventListener('resize', resize); resize();
    for (var i = 0; i < 55; i++)particles.push({ x: Math.random() * 1800, y: Math.random() * 900, r: Math.random() * 2.5 + .5, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, a: Math.random() * .7 + .2 });
    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(function (p) {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(249,115,22,' + p.a + ')'; ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

// ── TYPING ANIMATION ──
var words = ['Web Designing', 'C / C++ Programming', 'Python', 'Advanced Excel', 'Digital Marketing', 'Basic Computer'];
var wi = 0, ci = 0, deleting = false;
var el = document.getElementById('typingText');
function type() {
    var word = words[wi];
    if (!deleting) { el.textContent = word.slice(0, ++ci); if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; } }
    else { el.textContent = word.slice(0, --ci); if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; } }
    setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 1200);

// ── COURSE TABS ──
function showTab(id, btn) {
    document.querySelectorAll('.course-tab').forEach(function (t) { t.classList.remove('active') });
    document.querySelectorAll('.course-panel').forEach(function (p) { p.classList.remove('active') });
    btn.classList.add('active');
    document.getElementById('tab-' + id).classList.add('active');
}

// ── SKILL BARS ──
var skillObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-bar-fill').forEach(function (b) {
                b.style.width = b.dataset.pct + '%';
            });
            skillObs.unobserve(e.target);
        }
    });
}, { threshold: .3 });
document.querySelectorAll('.skill-bars-list').forEach(function (el) { skillObs.observe(el) });

// ── ANIMATED COUNTERS ──
function animateCounter(el, target, isDecimal) {
    var start = 0, duration = 1800, step = 16, increment = target / (duration / step);
    var timer = setInterval(function () {
        start += increment;
        if (start >= target) { start = target; clearInterval(timer); }
        el.textContent = isDecimal ? (start / 10).toFixed(1) : Math.floor(start);
    }, step);
}
var counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            var card = entry.target;
            var countEl = card.querySelector('.count');
            var target = +card.dataset.target;
            var isDecimal = card.dataset.decimal === 'true';
            animateCounter(countEl, target, isDecimal);
            counterObs.unobserve(card);
        }
    });
}, { threshold: .5 });
document.querySelectorAll('.stat-number[data-target]').forEach(function (el) { counterObs.observe(el) });

// ── FAQ ACCORDION ──
function toggleFaq(q) {
    var a = q.nextElementSibling;
    var isOpen = q.classList.contains('open');
    document.querySelectorAll('.faq-q').forEach(function (x) { x.classList.remove('open') });
    document.querySelectorAll('.faq-a').forEach(function (x) { x.classList.remove('open') });
    if (!isOpen) { q.classList.add('open'); a.classList.add('open'); }
}

// ── VIDEO MODAL ──
function openVideo() {
    document.getElementById('videoModal').classList.add('open');
    document.getElementById('videoFrame').src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
}
function closeVideo() {
    document.getElementById('videoModal').classList.remove('open');
    document.getElementById('videoFrame').src = '';
}
document.getElementById('videoModal').addEventListener('click', function (e) { if (e.target === this) closeVideo(); });

// ── CONTACT FORM ──
function submitForm() {
    var n = document.getElementById('cqName').value;
    var p = document.getElementById('cqPhone').value;
    if (!n.trim() || !p.trim()) { alert('Please fill in your name and phone number.'); return; }
    var btn = document.getElementById('cqSubmit');
    btn.innerHTML = '✓ Message Sent! We\'ll contact you soon.';
    btn.style.background = '#16a34a';
    btn.disabled = true;
}

// ── CURSOR PARTICLES ──
let p = document.createElement('div');
document.addEventListener('mousemove', function (e) {
    if (window.innerWidth > 1000) {
        p.className = 'partical';
        p.style.left = e.clientX + 'px';
        p.style.top = e.clientY + 'px';
        document.body.appendChild(p);
        // setTimeout(function () { p.remove(); }, 1000);
    }
});
AOS.init({
    once: true,
    duration: 700,
    easing: 'ease-out-cubic',
    offset: 60,
    disable: 'mobile'   // ← add this one line
});

// ── GSAP SCROLL ANIMATIONS ──
gsap.registerPlugin(ScrollTrigger);
// gsap.utils.toArray('.timeline-step').forEach(function (step, i) {
//   gsap.from(step, { opacity: 0, y: 50, duration: 0.7, delay: i * 0.15, scrollTrigger: { trigger: step, start: 'top 85%', once: true } });
// });
// gsap.utils.toArray('.why-feat').forEach(function (el) {
//   gsap.from(el, { opacity: 0, y: 30, duration: 0.5, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
// });
