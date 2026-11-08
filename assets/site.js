/* Akmal Akhpah. Plain JavaScript, no dependencies.
   Every page is complete without this file. It only adds small touches. */
(() => {
  const d = document;
  const root = d.documentElement;
  const base = root.dataset.root || '';
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;
  const HANDLE = 'akmalakhpah';

  /* ---------- Search index. Add a line here when you add a page. ---------- */
  const INDEX = [
    { g: 'Pages', t: 'Home', u: 'index.html', d: 'A short hello', k: 'akmal akhpah engineer entrepreneur malaysia' },
    { g: 'Pages', t: 'About', u: 'about.html', d: 'The people and places I learned from', k: 'story rensselaer intel who geneva epmds universiti teknologi malaysia advisor universiti putra recognition hundred mit solve beliefs khairul suhaimi' },
    { g: 'Pages', t: 'Work', u: 'work.html', d: 'OKR, EdTech and GovTech', k: 'okr institute flowyteam openokr open okr world okr summit connectors claude chatgpt pandai pbot ai grader question builder pandai teacher p&ai pai bot open school syllabus oss fde training forward deployed engineer aidan borang n8n claude code' },
    { g: 'Pages', t: 'Writing', u: 'writing/index.html', d: 'All articles', k: 'articles notes blog' },
    { g: 'Pages', t: 'Speaking', u: 'speaking.html', d: 'Topics, past stages, how to invite me', k: 'talks forum panel workshop invite keynote bahasa melayu model context protocol mcp' },
    { g: 'Pages', t: 'Now', u: 'now.html', d: 'What I am focused on this season', k: 'world okr summit openokr open source digital public good p&ai' },
    { g: 'Pages', t: 'Contact', u: 'contact.html', d: 'How to reach me', k: 'linkedin instagram facebook social message say hello y combinator application team leaders teachers students founders' },
    { g: 'Writing', t: 'I met OKRs at Intel', u: 'writing/i-met-okrs-at-intel.html', d: 'Twenty years with goal setting', k: 'okr goals ai stacey barr who performance' },
    { g: 'Writing', t: 'The hard part is never the model', u: 'writing/the-hard-part-is-never-the-model.html', d: 'What we learned building AI for Malaysian students', k: 'ai pbot syllabus spm bahasa melayu cost grounding' },
    { g: 'Writing', t: 'The quarter I think about most', u: 'writing/the-quarter-i-think-about-most.html', d: 'One in four Pandai users live in rural areas', k: 'rural skoll oxford borneo sarawak smk demak baru bandwidth phone' },
    { g: 'Writing', t: 'Nine days before the deadline', u: 'writing/nine-days-before-the-deadline.html', d: 'How we applied to Y Combinator', k: 'yc startup s21 aizat rahim dropee application entrepreneur' },
    { g: 'Writing', t: 'What government taught me', u: 'writing/what-government-taught-me.html', d: 'Trust is slower than technology, and it lasts longer', k: 'govtech public sector geneva borang ministry education khairy jamaluddin skoll' },
    { g: 'Writing', t: "Why I write notes from other people's talks", u: 'writing/notes-from-other-peoples-talks.html', d: 'Most of what I know, I learned sitting in the audience', k: 'learning listening paul copplestone isaac tan omid aschari supabase' },
  ];

  const ICON = {
    page: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',
    text: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
    bolt: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
  };

  /* ---------- Theme ---------- */
  const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);

  function setTheme(next, x = innerWidth - 40, y = 28) {
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch {}
      $$('meta[name="theme-color"]').forEach((m) => { m.content = next === 'dark' ? '#09090b' : '#ffffff'; });
    };
    if (!d.startViewTransition || calm) return apply();
    root.classList.add('theme-vt');
    const vt = d.startViewTransition(apply);
    vt.ready.then(() => {
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 480, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
      );
    }).catch(() => {});
    vt.finished.finally(() => root.classList.remove('theme-vt'));
  }

  $$('[data-theme-toggle]').forEach((b) => b.addEventListener('click', () => {
    const r = b.getBoundingClientRect();
    setTheme(isDark() ? 'light' : 'dark', r.left + r.width / 2, r.top + r.height / 2);
  }));

  /* ---------- Nav pill ---------- */
  const nav = $('.tabs');
  const pill = $('.tabs-pill');
  if (nav && pill && canHover) {
    nav.addEventListener('pointerover', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      if (pill.style.opacity !== '1') {
        pill.style.transition = 'opacity .15s';
        pill.style.transform = `translateX(${a.offsetLeft}px)`;
        pill.style.width = `${a.offsetWidth}px`;
        pill.getBoundingClientRect();
        pill.style.transition = '';
      }
      pill.style.transform = `translateX(${a.offsetLeft}px)`;
      pill.style.width = `${a.offsetWidth}px`;
      pill.style.opacity = '1';
    });
    nav.addEventListener('pointerleave', () => { pill.style.opacity = '0'; });
  }
  const current = nav && $('[aria-current="page"]', nav);
  if (current && nav.scrollWidth > nav.clientWidth) {
    nav.scrollLeft = current.offsetLeft - (nav.clientWidth - current.offsetWidth) / 2;
  }

  /* ---------- Pointer light on hairline cells ---------- */
  if (canHover && !calm) {
    d.addEventListener('pointermove', (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const group = t.closest('.cells');
      if (!group) return;
      const g = group.getBoundingClientRect();
      group.style.setProperty('--mx', `${e.clientX - g.left}px`);
      group.style.setProperty('--my', `${e.clientY - g.top}px`);
      const cell = t.closest('.cell');
      if (cell) {
        const c = cell.getBoundingClientRect();
        cell.style.setProperty('--cx', `${e.clientX - c.left}px`);
        cell.style.setProperty('--cy', `${e.clientY - c.top}px`);
      }
    }, { passive: true });
  }

  /* ---------- Quiet reveal on scroll. Only hides what is below the fold, and only once this script runs. ---------- */
  const reveals = $$('.reveal');
  if (reveals.length && 'IntersectionObserver' in window && !calm) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.remove('pre');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -5% 0px' });
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight * 0.95) {
        el.classList.add('pre');
        io.observe(el);
      }
    });
  }

  /* ---------- Count up. The real number is already in the HTML. ---------- */
  const counters = $$('[data-to]');
  if (counters.length && 'IntersectionObserver' in window && !calm) {
    const fmt = (n) => n.toLocaleString('en-GB');
    const run = (el) => {
      const to = Number(el.dataset.to);
      el.style.minWidth = `${el.getBoundingClientRect().width}px`;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 900, 1);
        const eased = 1 - (1 - p) ** 3;
        el.textContent = fmt(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        run(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => io.observe(el));
  }

  /* ---------- Wave hello: once on load, and for as long as the heading is hovered ---------- */
  const hand = $('.hand');
  if (hand && !calm) {
    const hi = hand.closest('h1');
    let over = false;
    // Each wave ends upright, so stopping at the end of one never jumps.
    hand.addEventListener('animationiteration', () => { if (!over) hand.classList.remove('wave'); });
    hi.addEventListener('pointerenter', () => { over = true; hand.classList.add('wave'); });
    hi.addEventListener('pointerleave', () => { over = false; });
    setTimeout(() => hand.classList.add('wave'), 700);
  }

  /* ---------- Twenty squares ---------- */
  const note = $('.strip-note');
  if (note) {
    const yrs = $$('button.yr');
    const show = (b) => {
      if (b.classList.contains('on')) return;
      yrs.forEach((y) => y.classList.remove('on'));
      b.classList.add('on');
      note.innerHTML = '';
      const year = d.createElement('b');
      year.textContent = b.dataset.year;
      const text = d.createElement('span');
      text.textContent = b.dataset.note;
      note.append(year, text);
      note.classList.remove('fade');
      void note.offsetWidth;
      note.classList.add('fade');
    };
    yrs.forEach((b) => {
      b.addEventListener('pointerenter', () => show(b));
      b.addEventListener('focus', () => show(b));
      b.addEventListener('click', () => show(b));
    });
  }

  /* ---------- Scroll: reading progress, contents, timeline ---------- */
  const progress = $('.progress');
  const article = $('.post');
  const tocLinks = $$('.toc a');
  const tocList = $('.toc ul');
  const tocMark = $('.toc-mark');
  const heads = tocLinks.map((a) => d.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
  const tl = $('.tl');
  const tlItems = tl ? $$('.tl-item', tl) : [];

  function onScroll() {
    if (progress && article) {
      const r = article.getBoundingClientRect();
      const p = Math.min(Math.max(-r.top / Math.max(r.height - innerHeight, 1), 0), 1);
      progress.style.setProperty('--read', p.toFixed(4));
    }
    if (heads.length) {
      let i = 0;
      const line = innerHeight * 0.3;
      heads.forEach((h, n) => { if (h.getBoundingClientRect().top <= line) i = n; });
      if (innerHeight + scrollY >= root.scrollHeight - 2) i = heads.length - 1;
      tocLinks.forEach((a, n) => {
        a.classList.toggle('on', n === i);
        if (n === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
      if (tocMark && tocList) {
        const a = tocLinks[i];
        tocMark.style.setProperty('--y', `${a.offsetTop}px`);
        tocMark.style.setProperty('--h', `${a.offsetHeight}px`);
      }
    }
    if (tl) {
      const r = tl.getBoundingClientRect();
      const mid = innerHeight * 0.55;
      tl.style.setProperty('--p', Math.min(Math.max((mid - r.top) / r.height, 0), 1).toFixed(4));
      tlItems.forEach((it) => it.classList.toggle('on', it.getBoundingClientRect().top + 8 <= mid));
    }
  }
  let ticking = false;
  const queue = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; onScroll(); });
  };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue, { passive: true });
  onScroll();

  /* ---------- Command palette ---------- */
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  $$('[data-shortcut]').forEach((k) => { k.textContent = isMac ? '⌘K' : 'Ctrl K'; });

  let pal, input, list, active = 0, rows = [];

  const ACTIONS = [
    { g: 'Actions', t: 'Switch theme', d: 'Light or dark', k: 'dark light mode theme', run: () => setTheme(isDark() ? 'light' : 'dark') },
    { g: 'Actions', t: 'LinkedIn', d: `linkedin.com/in/${HANDLE}`, k: 'social profile message contact', href: `https://www.linkedin.com/in/${HANDLE}` },
    { g: 'Actions', t: 'Instagram', d: `instagram.com/${HANDLE}`, k: 'social profile message contact', href: `https://www.instagram.com/${HANDLE}` },
    { g: 'Actions', t: 'Facebook', d: `facebook.com/${HANDLE}`, k: 'social profile message contact', href: `https://www.facebook.com/${HANDLE}` },
    { g: 'Actions', t: 'GitHub', d: `github.com/${HANDLE}`, k: 'code social profile', href: `https://github.com/${HANDLE}` },
  ];

  function search(q) {
    const all = [...INDEX, ...ACTIONS];
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return all;
    return all
      .map((it) => {
        const title = it.t.toLowerCase();
        const hay = `${title} ${(it.d || '').toLowerCase()} ${(it.k || '').toLowerCase()}`;
        if (!terms.every((t) => hay.includes(t))) return null;
        return { it, score: terms.reduce((s, t) => s + (title.startsWith(t) ? 3 : title.includes(t) ? 2 : 1), 0) };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.it);
  }

  function render() {
    const results = search(input.value);
    list.innerHTML = '';
    rows = [];
    active = 0;
    if (!results.length) {
      const empty = d.createElement('div');
      empty.className = 'pal-empty';
      empty.textContent = 'Nothing here on that. Try another word.';
      list.append(empty);
      input.removeAttribute('aria-activedescendant');
      return;
    }
    let group = '';
    const ordered = input.value.trim() ? results : ['Pages', 'Writing', 'Actions'].flatMap((g) => results.filter((r) => r.g === g));
    ordered.forEach((it, i) => {
      if (!input.value.trim() && it.g !== group) {
        group = it.g;
        const h = d.createElement('div');
        h.className = 'pal-group';
        h.textContent = group;
        list.append(h);
      }
      const row = d.createElement(it.run ? 'div' : 'a');
      row.className = 'pal-item';
      row.id = `pal-${i}`;
      row.setAttribute('role', 'option');
      if (!it.run) row.href = it.href || base + it.u;
      if (it.href) row.rel = 'noopener';
      const icon = it.g === 'Writing' ? ICON.text : it.g === 'Pages' ? ICON.page : ICON.bolt;
      row.innerHTML = icon;
      const b = d.createElement('b');
      b.textContent = it.t;
      const s = d.createElement('span');
      s.textContent = it.d || '';
      row.append(b, s);
      row.addEventListener('pointermove', () => select(i));
      row.addEventListener('click', (e) => { if (it.run) { e.preventDefault(); close(); it.run(); } });
      list.append(row);
      rows.push(row);
    });
    select(0);
  }

  function select(i) {
    if (!rows.length) return;
    active = (i + rows.length) % rows.length;
    rows.forEach((r, n) => r.setAttribute('aria-selected', n === active ? 'true' : 'false'));
    rows[active].scrollIntoView({ block: 'nearest' });
    input.setAttribute('aria-activedescendant', rows[active].id);
  }

  function build() {
    pal = d.createElement('dialog');
    pal.className = 'pal';
    pal.setAttribute('aria-label', 'Search this site');
    pal.innerHTML = `
      <div class="pal-top">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input class="pal-input" type="text" placeholder="Search pages and writing" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="pal-list" aria-label="Search">
        <kbd>esc</kbd>
      </div>
      <div class="pal-list" id="pal-list" role="listbox" aria-label="Results"></div>
      <div class="pal-foot"><span><kbd>↑↓</kbd>move</span><span><kbd>↵</kbd>open</span></div>`;
    d.body.append(pal);
    input = $('.pal-input', pal);
    list = $('.pal-list', pal);
    input.addEventListener('input', render);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); select(active + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); select(active - 1); }
      if (e.key === 'Enter' && rows[active]) { e.preventDefault(); rows[active].click(); }
    });
    pal.addEventListener('click', (e) => { if (e.target === pal) close(); });
  }

  function open() {
    if (!pal) build();
    if (pal.open) return;
    input.value = '';
    render();
    pal.showModal();
    input.focus();
  }
  function close() { if (pal && pal.open) pal.close(); }

  $$('[data-palette]').forEach((b) => b.addEventListener('click', open));
  d.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (pal && pal.open) close(); else open(); return; }
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); open(); }
  });
})();
