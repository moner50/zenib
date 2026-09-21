/* ==========================================================
   محرك الرسالة التفاعلية
   ----------------------------------------------------------
   فين تعدل إيه
   • CONFIG تحت: الأسماء، اللقب، الموسيقى، الذكريات، الرسالة الأخيرة
   • style.css :root  → الألوان والخطوط
   • index.html       → نصوص الأقسام

   كيف يشتغل
   • CONFIG          → كل المحتوى الشخصي
   • CHAPTERS        → سجل أقسام <section> + أسمائها
   • seq engine      → يكشف السطور .ln واحدة واحدة بالترتيب
   • observers       → تفعيل الأقسام عند التمرير + تعبئة الطريق
   • finale builder  → يبني شاشة الرد (أيوه / يمكن)
   • maybeDodge      → مراوغة لعبة، وفي النهاية لازم تتحط
   • particles       → نجوم (دايماً) + قلوب (لما نحتاج)
   • music           → لو الملف مش موجود، المشغل يختفي بأدب
   ========================================================== */

'use strict';

/* ---------- 1. CONFIG — كل حاجة شخصية هنا ---------- */
const CONFIG = {
  nickname: 'وزتي',
  sender:   'منير',

  // حط أغنية أصالة هنا: assets/music.mp3
  // لو الملف مش موجود، المشغل هيختفي. الصفحة هتشتغل عادي.
  music: {
    src:    'assets/music.mp3',
    volume: 0.45,
  },

  // أقسام الرحلة — الترتيب مهم، لازم يطابق ترتيب <section data-chapter> في HTML
  chapters: [
    { id: 'opening',  num: '01', label: 'البداية' },
    { id: 'years',    num: '02', label: '8 سنين' },
    { id: 'memories', num: '03', label: 'ذكريات' },
    { id: 'april',    num: '04', label: '4 April' },
    { id: 'honest',   num: '05', label: 'فهمت' },
    { id: 'love',     num: '06', label: 'لسه بحبك' },
    { id: 'again',    num: '07', label: 'فصل جديد' },
    { id: 'question', num: '07', label: 'فصل جديد' },
  ],

  // كروت الذكريات. `icon` بيطابق مفتاح في ICONS تحت.
  // `tone: 'tender'` للكروت الأدفأ.
  memories: [
    {
      icon: 'cairo',
      title: 'القاهرة',
      lead:  'خروجة القاهرة...',
      body:  'مش عارف إيه اللي فضل في ذاكرتي أكتر... تفاصيل اليوم نفسه، ولا إحساس إننا كنا بنعمل ذكرى جديدة سوا.',
    },
    {
      icon: 'cup',
      title: 'أول قعدة',
      lead:  'أول مرة قعدنا مع بعض في الأتالية عند أختك.',
      body:  'يمكن وقتها مكنتش عارف إن القعدة دي هتبقى واحدة من الحاجات اللي هفتكرها بعد سنين.',
      tone:  'tender',
    },
    {
      icon: 'heart',
      title: 'السدادات',
      lead:  'خروجة السدادات.',
      body:  'اليوم اللي اتخبطتي فيه... وأكتر حاجة فاكرها مش الخبطة نفسها، قد ما فاكر خوفك عليا وخضتك وقتها.',
      em:    'يمكن دي من اللحظات الصغيرة اللي عمرها ما كانت صغيرة بالنسبالي.',
    },
    {
      icon: 'road',
      title: 'طريق الرجوع من القاهرة',
      lead:  'طريق الرجوع...',
      body:  'إحنا راجعين من القاهرة، الأغاني شغالة، وإحنا بنسمع أصالة... مكنتش محتاج وقتها أي حاجة زيادة عن إنك تكوني جنبي.',
      tone:  'tender',
    },
    {
      icon: 'home',
      title: 'الشقة',
      lead:  'فاكرة لما اخترنا كل تفصيلة في الشقة سوا؟',
      body:  'لون، حاجة، تفصيلة صغيرة... كل حاجة كان وراها حلم.',
      em:    'والأجمل إن لسه في حاجات هنكملها.',
    },
  ],

  // شاشة الرد — إجابة إيجابية
  finaleYes: {
    intro:  'يمكن دي أبسط كلمة...',
    lines:  [
      'بس بالنسبة لي، معناها بداية حكاية جديدة.',
    ],
    letter: [
      'يمكن الحكاية اتلخبطت في النص، ويمكن إحنا الاتنين اتغيرنا...',
      'بس بعد 8 سنين، لسه في جزء جوايا شايف إن أجمل حاجة في الحكاية دي لسه ما خلصتش.',
      'أنا مش بطلب نرجع للماضي...',
      'أنا نفسي نبدأ من جديد، بس المرة دي وإحنا فاهمين بعض أكتر.',
      'ولو لسه في مكان ليا في قلبك...',
      'أنا مستعد أكمل الحكاية معاكي، خطوة بخطوة.',
    ],
    question: 'نكتبها سوا؟ ❤️',
    sign:     '— منير',
  },

  // شاشة الرد — إجابة "يمكن"
  finaleMaybe: {
    intro:  'يمكن...',
    lines:  [
      'وأنا هحترم الـيمكن دي.',
      'خدي وقتك يا وزتي.',
      'أنا مش عايز إجابة سريعة...',
      'أنا بس كنت عايزك تعرفي إن الباب لسه مفتوح.',
      'ولو في يوم قررتي نبدأ من جديد...',
      'هتلاقيني هنا.',
    ],
  },
};

/* ---------- 2. أيقونات SVG لكروت الذكريات ---------- */
const ICONS = {
  cairo: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M8 32h24M12 32V16l8-6 8 6v16"/><path d="M18 32v-6h4v6"/><circle cx="20" cy="14" r="1.3"/>
  </svg>`,
  cup: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M11 13h15v9a7.5 7.5 0 0 1-15 0z"/><path d="M26 15h3a3 3 0 0 1 0 6h-3"/><path d="M14 8c0 1.5 1 2 1 3M19 8c0 1.5 1 2 1 3M24 8c0 1.5 1 2 1 3"/>
  </svg>`,
  heart: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true">
    <path d="M20 33C7 24 5 16 9 11c4-5 9-4 11 0 2-4 7-5 11 0 4 5 2 13-11 22z"/>
  </svg>`,
  road: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 34L15 6M36 34L25 6"/><path d="M20 8v3M20 15v3M20 22v3M20 29v3"/>
  </svg>`,
  home: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 20L20 8l14 12"/><path d="M10 19v13h20V19"/><path d="M17 32v-7h6v7"/>
  </svg>`,
};

/* ---------- 3. احترام تفضيل تقليل الحركة ---------- */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 4. أدوات مساعدة ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

function on(el, ev, fn, opts) { el && el.addEventListener(ev, fn, opts); }

/* ---------- 5. سجل الأقسام + شريط التقدم ---------- */
const Chapter = {
  current: 0,
  els: [],

  init() {
    const stepsEl = $('#steps');
    const labelEl = $('#chapterLabel');
    if (!stepsEl) return;

    const seen = new Set();
    CONFIG.chapters.forEach((c) => {
      if (seen.has(c.id)) return;
      seen.add(c.id);
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.target = c.id;
      btn.setAttribute('aria-label', `الفصل ${c.num} — ${c.label}`);
      btn.addEventListener('click', () => this.goTo(c.id));
      li.appendChild(btn);
      stepsEl.appendChild(li);
    });

    this.els = $$('section.chapter');
    this.watch();
  },

  goTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
  },

  set(index) {
    if (index === this.current) return;
    this.current = index;
    const steps = $$('#steps button');
    const c = CONFIG.chapters[index];

    steps.forEach((b, i) => {
      const state = i < index ? 'done' : (i === index ? 'current' : 'idle');
      b.dataset.state = state;
      if (state === 'current') b.setAttribute('aria-current', 'step');
      else b.removeAttribute('aria-current');
    });

    const label = $('#chapterLabel');
    if (label && c) {
      label.innerHTML = `<span class="num">${c.num}</span><span class="dash">—</span><span>${c.label}</span>`;
    }
  },

  watch() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const chNum = parseInt(e.target.dataset.chapter, 10) - 1;
        this.set(Math.max(0, Math.min(chNum, CONFIG.chapters.length - 1)));
        e.target.classList.add('is-active');
        if (!e.target.dataset.activated) {
          e.target.dataset.activated = '1';
          this.activate(e.target);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    this.els.forEach((s) => obs.observe(s));
  },

  activate(section) {
    // تغيير مزاج الخلفية حسب data-mood عشان CSS يخفف التوهج
    const mood = section.dataset.mood;
    if (mood) document.body.dataset.mood = mood;

    if (section.id === 'years')   Seq.run(section, { auto: true });
    if (section.id === 'honest' || section.id === 'love' || section.id === 'again' || section.id === 'question') {
      Seq.run(section, { auto: true });
    }
  },
};

/* ---------- 6. محرك السطور — يكشف .ln واحدة واحدة ---------- */
const Seq = {
  run(root, { auto = false } = {}) {
    if (!root || root.dataset.running === '1') return;
    root.dataset.running = '1';

    const lines = $$('.ln', root);
    if (!lines.length) return;

    if (REDUCED) {
      lines.forEach((l) => l.classList.add('is-in'));
      return;
    }

    let i = 0;
    const step = () => {
      if (i >= lines.length) return;
      const line = lines[i];

      const stage = line.closest('.stage');
      if (stage) {
        $$('.ln.is-in', stage).forEach((sib) => {
          if (sib !== line && !sib.classList.contains('keep')) sib.classList.add('is-out');
        });
      }

      if (line.hasAttribute('data-type')) {
        this.typeLine(line);
      } else {
        line.classList.add('is-in');
      }

      if (line.hasAttribute('data-hearts')) {
        Particles.burstHearts(window.innerWidth / 2, window.innerHeight / 2, 8);
      }

      const delay = parseInt(line.dataset.delay, 10) || 1400;
      i++;
      setTimeout(step, delay);
    };
    step();
  },

  typeLine(line) {
    const text = line.textContent.trim();
    line.textContent = '';
    const span = document.createElement('span');
    span.className = 'typed';
    line.appendChild(span);
    line.classList.add('is-in');

    let j = 0;
    const speed = 55;
    const tick = () => {
      if (j >= text.length) { line.classList.add('typed-done'); return; }
      span.textContent += text[j++];
      setTimeout(tick, speed);
    };
    tick();
  },

  flush(root) {
    $$('.ln', root).forEach((l) => l.classList.add('is-in', 'typed-done'));
  },
};

/* ---------- 7. كروت الذكريات (الطريق) ---------- */
const Road = {
  init() {
    const list = $('#roadList');
    if (!list) return;

    CONFIG.memories.forEach((m, i) => {
      const li = document.createElement('li');
      li.className = 'memory reveal';
      if (m.tone) li.dataset.tone = m.tone;
      li.style.transitionDelay = `${i * 0.06}s`;

      li.innerHTML = `
        <span class="memory__node" aria-hidden="true"></span>
        <article class="card">
          <header class="card__head">
            <span class="card__icon" aria-hidden="true">${ICONS[m.icon] || ''}</span>
            <h3 class="card__title">${escapeHtml(m.title)}</h3>
          </header>
          ${m.lead ? `<p class="card__lead">${escapeHtml(m.lead)}</p>` : ''}
          ${m.body ? `<p class="card__text">${escapeHtml(m.body)}</p>` : ''}
          ${m.em   ? `<p class="card__em">${escapeHtml(m.em)}</p>`   : ''}
        </article>
      `;
      list.appendChild(li);
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    $$('.memory').forEach((m) => obs.observe(m));

    this.watchFill();
  },

  watchFill() {
    const road = $('#road');
    if (!road) return;
    const update = () => {
      const r = road.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const passed = vh - r.top;
      const p = Math.max(0, Math.min(1, passed / total));
      road.style.setProperty('--p', p);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  },
};

/* ---------- 8. مشغل الموسيقى ---------- */
const Music = {
  audio: null,
  btn: null,
  wrap: null,

  init() {
    this.audio = $('#music');
    this.btn   = $('#musicBtn');
    this.wrap  = $('#player');
    if (!this.audio || !this.btn || !this.wrap) return;

    this.audio.src = CONFIG.music.src;
    this.audio.volume = CONFIG.music.volume;

    const hide = () => { this.wrap.style.display = 'none'; };
    on(this.audio, 'error', hide);
    this.audio.addEventListener('loadedmetadata', () => {
      this.wrap.style.display = '';
    });

    on(this.btn, 'click', () => this.toggle());

    const vol = $('#musicVol');
    if (vol) {
      vol.value = CONFIG.music.volume * 100;
      on(vol, 'input', () => {
        this.audio.volume = (parseInt(vol.value, 10) || 0) / 100;
      });
    }

    on(this.audio, 'play',  () => this.wrap.classList.add('is-playing'));
    on(this.audio, 'pause', () => this.wrap.classList.remove('is-playing'));
    on(this.audio, 'ended', () => this.wrap.classList.remove('is-playing'));
  },

  toggle() {
    if (this.audio.paused) {
      const p = this.audio.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      this.audio.pause();
    }
  },

  startSoft() {
    if (!this.audio || !this.audio.paused) return;
    this.audio.volume = 0;
    const p = this.audio.play();
    if (!p || !p.then) return;
    p.then(() => {
      const target = CONFIG.music.volume;
      const t0 = performance.now();
      const dur = 1600;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        this.audio.volume = target * k;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }).catch(() => {});
  },
};

/* ---------- 9. الجزيئات — نجوم + قلوب على canvas ---------- */
const Particles = {
  stars: null,
  ctx: null,
  raf: null,
  hearts: [],
  starsCount: 0,

  init() {
    const canvas = $('#stars');
    if (!canvas) return;
    this.stars = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.seedStars();
    if (!REDUCED) this.loop();
    else this.drawStatic();
  },

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.stars.width  = window.innerWidth  * dpr;
    this.stars.height = window.innerHeight * dpr;
    this.stars.style.width  = window.innerWidth  + 'px';
    this.stars.style.height = window.innerHeight + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.seedStars();
  },

  seedStars() {
    const w = window.innerWidth, h = window.innerHeight;
    const density = Math.round((w * h) / 14000);
    this.starsCount = Math.min(Math.max(density, 40), 160);
    this._stars = Array.from({ length: this.starsCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.5 + 0.15,
      tw: Math.random() * 0.02 + 0.004,
      ph: Math.random() * Math.PI * 2,
    }));
  },

  loop() {
    const ctx = this.ctx;
    const w = window.innerWidth, h = window.innerHeight;

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      for (const s of this._stars) {
        s.ph += s.tw;
        const a = s.a + Math.sin(s.ph) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 220, 255, ${Math.max(0.05, a)})`;
        ctx.fill();
      }

      this.hearts = this.hearts.filter((p) => p.life > 0);
      for (const p of this.hearts) {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.02; p.life -= 0.012;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        drawHeart(ctx, p.x, p.y, p.size);
        ctx.restore();
      }

      this.raf = requestAnimationFrame(frame);
    };
    frame();
  },

  drawStatic() {
    const ctx = this.ctx;
    const w = window.innerWidth, h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    for (const s of this._stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(191, 220, 255, ${s.a})`;
      ctx.fill();
    }
  },

  burstHearts(x, y, n = 6) {
    if (REDUCED) return;
    for (let i = 0; i < n; i++) {
      this.hearts.push({
        x, y,
        vx: (Math.random() - 0.5) * 2.4,
        vy: -Math.random() * 2.2 - 0.6,
        size: Math.random() * 10 + 6,
        life: 1,
        color: ['#8fb4f0', '#bfdcff', '#b7b2f0'][Math.floor(Math.random() * 3)],
      });
    }
  },
};

function drawHeart(ctx, x, y, size) {
  const s = size / 20;
  ctx.beginPath();
  ctx.moveTo(x, y + 6 * s);
  ctx.bezierCurveTo(x - 10 * s, y - 4 * s, x - 3 * s, y - 12 * s, x, y - 5 * s);
  ctx.bezierCurveTo(x + 3 * s, y - 12 * s, x + 10 * s, y - 4 * s, x, y + 6 * s);
  ctx.fill();
}

/* ---------- 10. زر البدء ---------- */
const Journey = {
  started: false,

  init() {
    const btn = $('#startBtn');
    if (!btn) return;
    on(btn, 'click', () => this.start());
  },

  start() {
    if (this.started) return;
    this.started = true;

    document.documentElement.classList.remove('is-locked');

    const opening = $('#opening');
    const chrome  = $('#chrome');
    const years   = $('#years');

    if (opening) opening.classList.add('is-leaving');
    setTimeout(() => {
      if (opening) opening.hidden = true;
      if (chrome)  chrome.classList.add('is-on');
      if (years)   years.hidden = false;
      requestAnimationFrame(() => {
        years.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
      });
    }, REDUCED ? 0 : 700);

    Music.startSoft();
  },
};

/* ---------- 11. شاشة الرد ---------- */
const Finale = {
  el: null,
  body: null,
  skip: null,
  close: null,
  lastFocus: null,

  init() {
    this.el    = $('#finale');
    this.body  = $('#finaleBody');
    this.skip  = $('#finaleSkip');
    this.close = $('#finaleClose');
    if (!this.el) return;

    $$('.btn--yes').forEach((b) => on(b, 'click', () => this.open('yes')));

    this.initMaybe();

    on(this.close, 'click', () => this.close_overlay());
    on(this.skip,  'click', () => Seq.flush(this.body));

    on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.el.classList.contains('is-open')) this.close_overlay();
    });
  },

  open(kind) {
    this.lastFocus = document.activeElement;
    document.documentElement.classList.add('has-finale');

    this.el.dataset.kind = kind;
    this.el.hidden = false;
    this.body.innerHTML = '';
    this.build(kind);

    this.initFx();

    requestAnimationFrame(() => {
      this.el.classList.add('is-open');
      $('#finaleScroll').focus({ preventScroll: true });
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => Seq.run(this.body, { auto: true }));
    });

    if (kind === 'yes') {
      setTimeout(() => {
        Particles.burstHearts(window.innerWidth / 2, window.innerHeight * 0.55, 14);
      }, 500);
    }
  },

  close_overlay() {
    this.el.classList.remove('is-open');
    document.documentElement.classList.remove('has-finale');
    setTimeout(() => {
      this.el.hidden = true;
      this.body.innerHTML = '';
    }, 600);
    if (this.lastFocus && this.lastFocus.focus) this.lastFocus.focus();
  },

  build(kind) {
    const data = kind === 'yes' ? CONFIG.finaleYes : CONFIG.finaleMaybe;

    const make = (cls, text, delay) =>
      `<p class="ln ${cls}" data-delay="${delay}">${escapeHtml(text)}</p>`;

    const parts = [];

    if (data.intro) parts.push(make('fin-intro', data.intro, 1400));

    if (data.lines) {
      data.lines.forEach((l) => parts.push(make('fin-line', l, 2400)));
    }

    if (kind === 'yes') {
      parts.push(`<div class="ln fin-rule" data-delay="2000" aria-hidden="true"></div>`);
      if (data.letter) {
        data.letter.forEach((l) => parts.push(make('fin-line', l, 2200)));
      }
      parts.push(`<div class="ln fin-rule" data-delay="1800" aria-hidden="true"></div>`);
      if (data.question) {
        parts.push(`<p class="ln fin-question" data-delay="2200">${escapeHtml(data.question)}</p>`);
      }
      if (data.sign) {
        parts.push(`<p class="ln fin-sign" data-delay="1800">${escapeHtml(data.sign)}</p>`);
      }
      parts.push(`<div class="ln" data-delay="1400" aria-hidden="true"><span class="beat-heart" style="color:var(--sky);font-size:1.8rem">❤</span></div>`);
    } else {
      parts.push(`<div class="ln fin-rule" data-delay="1800" aria-hidden="true"></div>`);
      parts.push(`<p class="ln fin-sign" data-delay="2000">${escapeHtml('— ' + CONFIG.sender)}</p>`);
    }

    this.body.innerHTML = parts.join('');
  },

  initFx() {
    const canvas = $('#finaleFx');
    if (!canvas || REDUCED) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const kind = this.el.dataset.kind;

    const spawn = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      particles.push({
        x: Math.random() * w,
        y: h + 20,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        size: Math.random() * 12 + 6,
        life: 1,
        kind: kind === 'yes' && Math.random() < 0.35 ? 'heart' : 'star',
      });
    };

    const tick = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      if (particles.length < 60 && Math.random() < 0.25) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.003;
        p.life -= 0.0035;
        if (p.life <= 0 || p.y < -30) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.life * 0.85;
        if (p.kind === 'heart') {
          ctx.fillStyle = '#8fb4f0';
          drawHeart(ctx, p.x, p.y, p.size);
        } else {
          ctx.fillStyle = 'rgba(191, 220, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.12, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      requestAnimationFrame(tick);
    };
    tick();
  },
};

/* ---------- 12. زر "يمكن" — مراوغة لعبة ---------- */
/*
  قواعد:
  • بتراوغ لما الماوس يقرب منها (~100px) أو اللمس يقرب.
  • 4 مراوغات كحد أقصى، بعدها بتثبت مكانها (علشان تتحط دايماً).
  • لو اتحطت، بتحترم الاختيار (مفيش عقاب).
*/
const Maybe = {
  wrap: null,
  zone: null,
  note: null,
  dodges: 0,
  MAX: 4,

  init() {
    this.wrap = $('#maybeWrap');
    this.zone = $('#maybeZone');
    this.note = $('#maybeNote');
    if (!this.wrap) return;

    on(this.wrap, 'click', (e) => {
      e.preventDefault();
      Finale.open('maybe');
    });

    on(this.zone, 'pointermove', (e) => this.check(e.clientX, e.clientY));
    on(this.zone, 'touchstart', (e) => {
      if (this.dodges >= this.MAX) return;
      const t = e.touches[0];
      if (!t) return;
      this.check(t.clientX, t.clientY);
    }, { passive: true });
  },

  check(x, y) {
    if (this.dodges >= this.MAX) return;
    const r = this.wrap.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    const dist = Math.hypot(cx - x, cy - y);
    if (dist > 100) return;

    this.dodges++;
    const maxX = Math.min(120, r.width);
    const maxY = 30;
    const nx = (Math.random() - 0.5) * 2 * maxX;
    const ny = (Math.random() - 0.5) * 2 * maxY;
    this.wrap.style.setProperty('--dx', `${nx}px`);
    this.wrap.style.setProperty('--dy', `${ny}px`);

    if (this.dodges === this.MAX) {
      setTimeout(() => {
        this.wrap.style.setProperty('--dx', '0px');
        this.wrap.style.setProperty('--dy', '0px');
      }, 600);
    }
  },
};

/* ---------- 13. حماية من XSS للمحتوى المبني من CONFIG ---------- */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ---------- 14. التشغيل ---------- */
function boot() {
  $$('[data-nick]').forEach((el) => { el.textContent = CONFIG.nickname; });

  Particles.init();
  Music.init();
  Road.init();
  Chapter.init();
  Journey.init();
  Finale.init();
  Maybe.init();

  Seq.run($('#opening'), { auto: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}