/*
  SITE CODE — layout and behavior. Maria's content lives in content.js;
  this file should rarely need to change.
*/
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) { return; }

  /* ---------- Draft mode ----------
     Unfinished "TODO:" gaps show on your own computer and on Netlify preview
     links, and are hidden on the live site. Add ?draft=0 to any address to
     see exactly what the public will see; ?draft=1 forces the labels on. */
  var host = location.hostname;
  var q = new URLSearchParams(location.search);
  var DRAFT = host === "" || host === "localhost" || host === "127.0.0.1" ||
    host.indexOf("--") !== -1 || host.indexOf("deploy-preview") !== -1;
  if (q.get("draft") === "1") { DRAFT = true; }
  if (q.get("draft") === "0") { DRAFT = false; }
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Small helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text !== undefined && text !== null) { n.textContent = text; }
    return n;
  }
  function isTodo(s) { return typeof s === "string" && s.trim().indexOf("TODO") === 0; }
  function todoText(s) { return "[TO FILL IN: " + s.trim().replace(/^TODO:?\s*/, "") + "]"; }
  /* Returns a node for the text, an amber label for a TODO in draft mode,
     or null when a TODO should be hidden (live site). */
  function textOrTodo(tag, cls, s) {
    if (!s) { return null; }
    if (!isTodo(s)) { return el(tag, cls, s); }
    if (!DRAFT) { return null; }
    var n = el(tag, cls);
    n.appendChild(el("span", "todo", todoText(s)));
    return n;
  }
  function add(parent) {
    for (var i = 1; i < arguments.length; i++) { if (arguments[i]) { parent.appendChild(arguments[i]); } }
    return parent;
  }
  function projectReady(p) { return !isTodo(p.solution) && !!p.solution; }
  function hasStory(p) { return (p.story || []).some(function (x) { return x && !isTodo(x); }); }
  function projectUrl(p) { return "project.html?p=" + encodeURIComponent(p.slug) + (q.get("draft") ? "&draft=" + q.get("draft") : ""); }
  function visibleProjects(skillId) {
    return S.projects.filter(function (p) {
      return (!skillId || p.skills.indexOf(skillId) !== -1) && (DRAFT || projectReady(p));
    });
  }
  /* Problem / Solution / Result lines for a card */
  function psrLine(label, value) {
    if (!value || (isTodo(value) && !DRAFT)) { return null; }
    var line = el("span");
    line.appendChild(el("strong", "", label + ". "));
    if (isTodo(value)) { line.appendChild(el("span", "todo", todoText(value))); }
    else { line.appendChild(document.createTextNode(value)); }
    return line;
  }

  /* ---------- Shared: footer, links ---------- */
  function shared() {
    var year = new Date().getFullYear();
    if ($("copyright")) { $("copyright").textContent = "© " + year + " " + S.name; }
    if ($("credit")) { $("credit").textContent = S.footerCredit || ""; }
    if ($("email-link")) { $("email-link").textContent = S.email; $("email-link").href = "mailto:" + S.email; }
    if ($("nav-linkedin")) { $("nav-linkedin").href = S.linkedin; }
    ["nav-resume", "about-resume"].forEach(function (id) {
      var a = $(id);
      if (!a) { return; }
      if (S.resume) { a.href = S.resume; a.target = "_blank"; a.rel = "noopener"; }
      else if (DRAFT) { a.textContent = a.textContent + " [PDF to add]"; a.href = "#about"; }
      else { a.hidden = true; }
    });
  }

  /* ---------- Scroll reveals ---------- */
  function reveals() {
    var items = document.querySelectorAll(".reveal, .slot");
    if (REDUCED || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (n) { io.observe(n); });
  }

  /* ---------- Home page ---------- */
  function home() {
    $("intro").textContent = S.intro;
    $("name-lead").textContent = S.nameLead;
    $("name-accent").textContent = S.nameAccent;
    $("photo").src = S.photo;
    $("photo").alt = S.photoAlt || S.name;
    S.facts.forEach(function (f) { $("facts").appendChild(el("span", "", f)); });

    // Ticker: the list is printed twice so the loop is seamless.
    var track = $("ticker-track");
    [false, true].forEach(function (copy) {
      S.ticker.forEach(function (t) {
        var item = el("span");
        item.appendChild(el("strong", "", t.figure));
        item.appendChild(document.createTextNode(" " + t.label));
        var dot = el("span", "", "◆");
        if (copy) { item.setAttribute("aria-hidden", "true"); dot.setAttribute("aria-hidden", "true"); }
        track.appendChild(item); track.appendChild(dot);
      });
    });

    S.workedWith.forEach(function (w) { $("worked-with").appendChild(el("span", "", w)); });

    skills();
    work();

    $("about-lead").textContent = S.about.lead;
    S.about.paragraphs.forEach(function (p) { add($("about-paras"), textOrTodo("p", "", p)); });
    offClock();
  }

  /* Skill boxes and the panel that opens beneath them */
  var openSkill = null;
  function skills() {
    var grid = $("skill-grid");
    var shown = 0;
    S.skills.forEach(function (sk) {
      var list = visibleProjects(sk.id);
      var live = sk.ready && list.length > 0;
      if (!live && !DRAFT) { return; }              // hidden on the live site
      var slot = el("div", "slot " + (shown % 2 === 0 ? "from-l" : "from-r"));
      slot.style.transitionDelay = (shown % 2) * 0.12 + "s";
      var num = "0" + (shown + 1);
      shown++;

      if (!live) {                                   // draft-only dashed box
        var d = el("div", "box draft");
        add(d, el("span", "count", "Not on the live site yet"), el("span", "title", sk.title),
          textOrTodo("span", "proof", sk.proof));
        slot.appendChild(d); grid.appendChild(slot);
        return;
      }
      var b = el("button", "box c-" + sk.color);
      b.type = "button";
      b.setAttribute("aria-expanded", "false");
      b.setAttribute("aria-controls", "skill-panel");
      b.dataset.skill = sk.id;
      var numeral = el("span", "numeral", num); numeral.setAttribute("aria-hidden", "true");
      var cta = el("span", "cta", "See the work ");
      cta.appendChild(el("span", "go", "↓"));
      add(b, numeral, el("span", "count", list.length + (list.length === 1 ? " project" : " projects")),
        el("span", "title", sk.title), textOrTodo("span", "proof", sk.proof), cta);
      b.addEventListener("click", function () { toggleSkill(sk.id, true); });
      slot.appendChild(b); grid.appendChild(slot);
    });
    // On wide screens the first box starts open, to show how the boxes work.
    var first = grid.querySelector("button.box");
    if (first && window.innerWidth > 900) { toggleSkill(first.dataset.skill, false); }
  }

  function toggleSkill(id, userAction) {
    var panel = $("skill-panel");
    openSkill = (openSkill === id && userAction) ? null : id;
    document.querySelectorAll("#skill-grid button.box").forEach(function (b) {
      b.setAttribute("aria-expanded", b.dataset.skill === openSkill ? "true" : "false");
    });
    panel.textContent = "";
    if (!openSkill) { panel.hidden = true; return; }
    var sk = S.skills.filter(function (x) { return x.id === openSkill; })[0];
    panel.className = "panel c-" + sk.color;
    var head = el("div", "panel-head");
    var close = el("button", "panel-close", "Close"); close.type = "button";
    close.addEventListener("click", function () { toggleSkill(openSkill, true); });
    add(head, el("h3", "", sk.title + ": the work"), close);
    var cards = el("div", "cards");
    visibleProjects(sk.id).forEach(function (p) {
      var c = el("div", "card");
      add(c, el("span", "org", p.org), el("span", "title", p.title),
        psrLine("Problem", p.problem), psrLine("Solution", p.solution), psrLine("Result", p.result));
      if (DRAFT || hasStory(p)) {
        var a = el("a", "more", "Read the case study →"); a.href = projectUrl(p); c.appendChild(a);
      }
      cards.appendChild(c);
    });
    add(panel, head, cards);
    panel.hidden = false;
    panel.style.animation = "none"; void panel.offsetWidth; panel.style.animation = "";
    if (userAction) {
      var r = panel.getBoundingClientRect();
      if (r.top > window.innerHeight - 160) { panel.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" }); }
    }
  }

  /* Selected work: one lead feature and the number cards */
  function work() {
    var lead = S.projects.filter(function (p) { return p.feature === "lead" && (DRAFT || projectReady(p)); })[0];
    if (lead) {
      var f = el("div", "feature lift reveal c-deep");
      var t = el("div", "feature-text");
      add(t, el("span", "kicker", "Featured case study · " + lead.org), el("h3", "", lead.title),
        textOrTodo("p", "", lead.solution));
      if (DRAFT && (isTodo(lead.problem) || isTodo(lead.result))) {
        t.appendChild(el("span", "todo", "[TO FILL IN: the problem and a result number, in content.js]"));
      } else {
        add(t, textOrTodo("p", "", lead.result));
      }
      if (DRAFT || hasStory(lead)) {
        var a = el("a", "btn btn-accent", "Read the case study →"); a.href = projectUrl(lead); t.appendChild(a);
      }
      f.appendChild(t);
      if (lead.image) {
        var m = el("div", "feature-media"); var img = el("img"); img.src = lead.image; img.alt = lead.imageAlt || ""; img.loading = "lazy";
        m.appendChild(img); f.appendChild(m);
      } else if (DRAFT) {
        var ph = el("div", "feature-media"); ph.appendChild(el("div", "placeholder", "[IMAGE TO ADD: set image for this project in content.js]")); f.appendChild(ph);
      } else { f.style.gridTemplateColumns = "minmax(0, 1fr)"; }
      $("feature").appendChild(f);
    }

    var counters = [];
    S.projects.filter(function (p) { return p.feature === "stat" && p.stat && (DRAFT || projectReady(p)); }).forEach(function (p) {
      var linked = DRAFT || hasStory(p);
      var c = el(linked ? "a" : "div", "stat lift reveal c-" + p.color);
      if (linked) { c.href = projectUrl(p); }
      var fig = el("span", "figure");
      add(c, el("span", "label-top", p.shortTitle || p.title), fig, el("span", "label", p.stat.label));
      if (linked) { c.appendChild(el("span", "more", "See how →")); }
      $("stats").appendChild(c);
      counters.push({ node: fig, stat: p.stat });
    });
    countUp($("stats"), counters);
  }

  /* Numbers count up every time the cards scroll into view. */
  function countUp(container, counters) {
    function paint(t) {
      var e = 1 - Math.pow(1 - t, 3);
      counters.forEach(function (c) {
        var v = Math.round(c.stat.from + (c.stat.to - c.stat.from) * e);
        c.node.textContent = (c.stat.prefix || "") + v.toLocaleString("en-US") + (c.stat.suffix || "");
      });
    }
    if (!counters.length) { return; }
    if (REDUCED || !("IntersectionObserver" in window)) { paint(1); return; }
    var timer = null;
    paint(0);
    function run() {
      clearInterval(timer);
      var start = Date.now();
      timer = setInterval(function () {
        var t = Math.min(1, (Date.now() - start) / 2200);
        paint(t);
        if (t >= 1) { clearInterval(timer); }
      }, 40);
    }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(); } else { clearInterval(timer); paint(0); }
      });
    }, { threshold: 0.3 }).observe(container);
  }

  function offClock() {
    var oc = S.offClock || {};
    var photos = oc.photos || [];
    if (!photos.length && !DRAFT) { return; }       // hidden on the live site until photos exist
    $("offclock").hidden = false;
    $("offclock-text").textContent = oc.text || "";
    var box = $("offclock-photos");
    if (!photos.length) {
      for (var i = 0; i < 3; i++) {
        var fr = el("div", "frame"); fr.style.aspectRatio = "4 / 3";
        fr.appendChild(el("div", "placeholder light", "[TRAVEL PHOTO TO ADD, WITH PLACE NAME]"));
        box.appendChild(fr);
      }
      return;
    }
    photos.slice(0, 3).forEach(function (ph) {
      var fig = el("figure", "travel lift");
      var fr = el("div", "frame"); var img = el("img"); img.src = ph.src; img.alt = ph.place || "Travel photo"; img.loading = "lazy";
      fr.appendChild(img); add(fig, fr, ph.place ? el("figcaption", "", ph.place) : null);
      box.appendChild(fig);
    });
  }

  /* ---------- Case-study page ---------- */
  function caseStudy() {
    var p = S.projects.filter(function (x) { return x.slug === q.get("p"); })[0];
    var root = $("case");
    if (!p || (!DRAFT && !projectReady(p))) {
      root.appendChild(el("p", "", "That project isn't available."));
      document.title = "Not found · " + S.name;
      return;
    }
    document.title = p.title + " · " + S.name;
    $("case-org").textContent = p.org;
    $("case-title").textContent = p.title;
    var psr = $("case-psr");
    [["Problem", p.problem], ["Solution", p.solution], ["Result", p.result]].forEach(function (row) {
      var v = textOrTodo("span", "v", row[1]);
      if (!v) { return; }
      var d = el("div"); add(d, el("span", "k", row[0]), v); psr.appendChild(d);
    });
    if (p.image) {
      var m = el("div", "case-media"); var img = el("img"); img.src = p.image; img.alt = p.imageAlt || ""; m.appendChild(img); root.appendChild(m);
    }
    var story = el("div", "story");
    (p.story || []).forEach(function (para) { add(story, textOrTodo("p", "", para)); });
    var links = el("div", "row-buttons");
    (p.links || []).forEach(function (l) {
      var a = el("a", "btn btn-line", l.label + " →"); a.href = l.url; a.target = "_blank"; a.rel = "noopener"; links.appendChild(a);
    });
    if (links.children.length) { story.appendChild(links); }
    root.appendChild(story);
  }

  shared();
  if ($("skill-grid")) { home(); }
  if ($("case")) { caseStudy(); }
  reveals();
})();
