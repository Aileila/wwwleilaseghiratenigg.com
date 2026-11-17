/* Navigation LSN — briques de l'Atlas des mouvements habillées LSN.
   03-04 en-tête qui se resserre · 05-05 pictogramme menu · 06-03 tiroir latéral · 07-08 progression de lecture.
   Le script améliore le menu existant : sans lui, le site garde son menu d'origine. */
(function () {
  'use strict';

  var nav = document.getElementById('main-nav');
  if (!nav) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  nav.classList.add('nav-pro');

  /* ── 03-04 · En-tête qui se resserre : au-delà de 48 px défilés ─── */
  var rafHaut = 0;
  function mesurerHaut() {
    rafHaut = 0;
    nav.classList.toggle('is-small', window.scrollY > 48);
  }
  window.addEventListener('scroll', function () {
    if (!rafHaut) rafHaut = window.requestAnimationFrame(mesurerHaut);
  }, { passive: true });
  mesurerHaut();

  /* ── 05-05 · Pictogramme menu : six points interpolés ──────────── */
  var FORMES = {
    menu:  [4, 7, 20, 7,   4, 12, 20, 12,   4, 17, 20, 17],
    croix: [6, 6, 18, 18,  12, 12, 12, 12,  6, 18, 18, 6]
  };
  var EASE = [0.16, 1, 0.3, 1];
  function courbe(x) {
    var bas = 0, haut = 1, t = x;
    function b(p1, p2, u) { return 3 * p1 * u * (1 - u) * (1 - u) + 3 * p2 * u * u * (1 - u) + u * u * u; }
    for (var i = 0; i < 24; i++) {
      t = (bas + haut) / 2;
      if (b(EASE[0], EASE[2], t) < x) bas = t; else haut = t;
    }
    return b(EASE[1], EASE[3], t);
  }
  function chemin(p) {
    function n(v) { return String(+v.toFixed(2)); }
    return 'M' + n(p[0]) + ' ' + n(p[1]) + 'L' + n(p[2]) + ' ' + n(p[3]) +
           'M' + n(p[4]) + ' ' + n(p[5]) + 'L' + n(p[6]) + ' ' + n(p[7]) +
           'M' + n(p[8]) + ' ' + n(p[9]) + 'L' + n(p[10]) + ' ' + n(p[11]);
  }
  function picto(label, forme) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'lsn-picto';
    b.setAttribute('aria-label', label);
    b.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="' + chemin(FORMES[forme]) + '"/></svg>';
    b._p = FORMES[forme].slice();
    return b;
  }
  function morpher(b, de, vers) {
    var path = b.querySelector('path');
    window.cancelAnimationFrame(b._raf);
    var depart = (de || b._p).slice(), cible = FORMES[vers], t0 = 0;
    if (reduce.matches) { b._p = cible.slice(); path.setAttribute('d', chemin(b._p)); return; }
    b._raf = window.requestAnimationFrame(function pas(t) {
      if (!t0) t0 = t;
      var x = Math.min(1, (t - t0) / 320), k = courbe(x);
      b._p = depart.map(function (v, i) { return v + (cible[i] - v) * k; });
      path.setAttribute('d', chemin(b._p));
      if (x < 1) b._raf = window.requestAnimationFrame(pas);
    });
  }

  /* ── 06-03 · Tiroir latéral : un vrai <dialog> ─────────────────── */
  var ancien = document.getElementById('hamburger');
  var liste = document.getElementById('mobile-menu');
  if (ancien && liste && window.HTMLDialogElement) {
    var ouvreur = picto('Ouvrir le menu', 'menu');
    ouvreur.id = 'hamburger';
    ouvreur.className += ' ' + ancien.className.replace(/\bp-2\b|\bhover:\S+/g, '');
    ouvreur.setAttribute('aria-haspopup', 'dialog');
    ancien.replaceWith(ouvreur);          // remplace l'ancien bouton et son ancien comportement

    var dlg = document.createElement('dialog');
    dlg.className = 'lsn-tiroir';
    dlg.setAttribute('aria-label', 'Menu');
    dlg.innerHTML = '<div class="lsn-tiroir__voile"></div><div class="lsn-tiroir__panneau"><div class="lsn-tiroir__haut"></div><nav class="lsn-tiroir__liens" aria-label="Menu principal"></nav></div>';
    var panneau = dlg.querySelector('.lsn-tiroir__panneau');
    var fermeur = picto('Fermer le menu', 'croix');
    dlg.querySelector('.lsn-tiroir__haut').appendChild(fermeur);
    var cibleLiens = dlg.querySelector('.lsn-tiroir__liens');
    var ici = location.pathname.split('/').pop() || 'index.html';
    Array.prototype.forEach.call(liste.querySelectorAll('a'), function (a) {
      var l = document.createElement('a');
      l.href = a.getAttribute('href');
      l.textContent = a.textContent.trim();
      if (/rounded-full/.test(a.className)) l.className = 'lsn-tiroir__contact';
      else if (l.getAttribute('href').split('/').pop() === ici) l.setAttribute('aria-current', 'page');
      cibleLiens.appendChild(l);
    });
    document.body.appendChild(dlg);

    var html = document.documentElement, minuterie = 0;
    function bloquer(oui) {
      if (oui) {
        var barre = window.innerWidth - html.clientWidth;
        html.style.overflow = 'hidden';
        if (barre > 0) html.style.paddingRight = barre + 'px';
      } else {
        html.style.overflow = '';
        html.style.paddingRight = '';
      }
    }
    function ouvrir() {
      if (dlg.open) return;
      bloquer(true);
      dlg.showModal();
      void panneau.offsetWidth;
      dlg.classList.add('is-open');
      morpher(fermeur, FORMES.menu, 'croix');   // les trois traits deviennent la croix
    }
    function fermer() {
      if (!dlg.open || !dlg.classList.contains('is-open')) return;
      dlg.classList.remove('is-open');
      minuterie = window.setTimeout(function () { dlg.close(); }, reduce.matches ? 0 : 220);
    }
    ouvreur.addEventListener('click', ouvrir);
    fermeur.addEventListener('click', fermer);
    dlg.querySelector('.lsn-tiroir__voile').addEventListener('click', fermer);
    cibleLiens.addEventListener('click', function (e) { if (e.target.closest('a')) fermer(); });
    dlg.addEventListener('cancel', function (e) { e.preventDefault(); fermer(); });
    dlg.addEventListener('close', function () {
      window.clearTimeout(minuterie);
      dlg.classList.remove('is-open');
      bloquer(false);
      morpher(ouvreur, FORMES.croix, 'menu');   // la croix redevient le menu
    });
  }

  /* ── 07-08 · Progression de lecture : articles du blog ─────────── */
  var article = /\/blog\/[^/]+$/.test(location.pathname) && document.querySelector('main article, article');
  if (article) {
    var barre = document.createElement('div');
    barre.className = 'lsn-lecture';
    barre.setAttribute('aria-hidden', 'true');
    document.body.appendChild(barre);
    var rafLecture = 0;
    function mesurerLecture() {
      rafLecture = 0;
      var r = article.getBoundingClientRect(), fenetre = window.innerHeight;
      var p = r.height > fenetre ? -r.top / (r.height - fenetre) : (r.top <= 0 ? 1 : 0);
      barre.style.transform = 'scaleX(' + Math.min(1, Math.max(0, p)) + ')';
    }
    function demander() { if (!rafLecture) rafLecture = window.requestAnimationFrame(mesurerLecture); }
    window.addEventListener('scroll', demander, { passive: true });
    window.addEventListener('resize', demander);
    mesurerLecture();
  }
})();
