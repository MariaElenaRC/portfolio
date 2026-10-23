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
    var items = document.querySelectorAll(".slot");
    if (REDUCED || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    // Boxes slide in each time they come into view, and reset once they are
    // fully off screen, so the motion replays when you scroll back to them.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.intersectionRatio >= 0.35) { en.target.classList.add("in"); }
        else if (!en.isIntersecting) { en.target.classList.remove("in"); }
      });
    }, { threshold: [0, 0.35] });
    items.forEach(function (n) { io.observe(n); });
  }

  /* ---------- Home page ---------- */
  function home() {
    $("intro").textContent = S.intro;
    $("name").textContent = S.name;
    $("photo").src = S.photo;
    $("photo").alt = S.photoAlt || S.name;
    S.facts.forEach(function (f) { $("facts").appendChild(el("span", "", f)); });

    // Ticker: the list is printed twice so the loop is seamless.
    var track = $("ticker-track");
    [false, true].forEach(function (copy) {
      S.ticker.forEach(function (t) {
        var item = el("span", "", t);
        var dot = el("span", "", "◆");
        if (copy) { item.setAttribute("aria-hidden", "true"); dot.setAttribute("aria-hidden", "true"); }
        track.appendChild(item); track.appendChild(dot);
      });
    });

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
      var cta = el("span", "cta", "See the work ");
      cta.appendChild(el("span", "go", "↓"));
      add(b, el("span", "count", list.length + (list.length === 1 ? " project" : " projects")),
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
    add(head, el("h3", "", sk.title), close);

    // The skill's main project is shown in full, with its video, image or number.
    var list = visibleProjects(sk.id);
    var main = list.filter(function (p) { return p.slug === sk.main; })[0] || list[0];
    var mainBox = el("div", "main-work");
    var media = mediaFor(main);
    if (media) { mainBox.appendChild(media); } else { mainBox.classList.add("no-media"); }
    var txt = el("div", "main-text");
    add(txt, el("span", "org", main.org), el("h4", "", main.title),
      psrLine("Problem", main.problem), psrLine("Solution", main.solution), psrLine("Result", main.result));
    if (DRAFT || hasStory(main)) {
      var go = el("a", "btn btn-accent", "Read the full case study"); go.href = projectUrl(main); txt.appendChild(go);
    }
    mainBox.appendChild(txt);

    // Everything else under this skill, one line each.
    var others = list.filter(function (p) { return p !== main; });
    var cards = el("div", "more-work");
    if (others.length) {
      cards.appendChild(el("p", "more-label", "More " + sk.title.toLowerCase() + " work"));
      var ul = el("ul");
      others.forEach(function (p) {
        var li = el("li");
        var linked = DRAFT || hasStory(p);
        var a = el(linked ? "a" : "span", "more-item");
        if (linked) { a.href = projectUrl(p); }
        add(a, el("span", "t", p.title), el("span", "o", p.org));
        var line = isTodo(p.result) ? null : el("span", "r", p.result);
        add(a, line);
        li.appendChild(a); ul.appendChild(li);
      });
      cards.appendChild(ul);
    }
    cards.insertBefore(mainBox, cards.firstChild);
    add(panel, head, cards);
    panel.hidden = false;
    panel.style.animation = "none"; void panel.offsetWidth; panel.style.animation = "";
    if (userAction) {
      var r = panel.getBoundingClientRect();
      if (r.top > window.innerHeight - 160) { panel.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" }); }
    }
  }

  /* A project's visual: a YouTube video (loads only when clicked), an image,
     or its number counting up. */
  function mediaFor(p) {
    if (p.video) {
      var b = el("button", "video");
      b.type = "button";
      b.setAttribute("aria-label", "Play video: " + p.title);
      var img = el("img"); img.alt = ""; img.loading = "lazy";
      img.src = "https://i.ytimg.com/vi/" + p.video + "/hqdefault.jpg";
      var play = el("span", "play"); play.setAttribute("aria-hidden", "true");
      add(b, img, play);
      b.addEventListener("click", function () {
        var f = document.createElement("iframe");
        f.src = "https://www.youtube-nocookie.com/embed/" + p.video + "?autoplay=1&rel=0";
        f.title = p.title;
        f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        f.allowFullscreen = true;
        b.replaceWith(f);
      });
      var wrap = el("div", "media"); wrap.appendChild(b); return wrap;
    }
    if (p.image) {
      var m = el("div", "media"); var i = el("img"); i.src = p.image; i.alt = p.imageAlt || ""; i.loading = "lazy";
      m.appendChild(i); return m;
    }
    if (p.stat) {
      var n = el("div", "media media-stat c-" + p.color);
      var fig = el("span", "figure");
      add(n, fig, el("span", "label", p.stat.label));
      countUp(n, [{ node: fig, stat: p.stat }]);
      return n;
    }
    return null;
  }

  /* Results band: the number cards */
  function work() {
    var counters = [];
    S.projects.filter(function (p) { return p.feature === "stat" && p.stat && (DRAFT || projectReady(p)); }).forEach(function (p) {
      var linked = DRAFT || hasStory(p);
      var c = el(linked ? "a" : "div", "stat c-" + p.color);
      if (linked) { c.href = projectUrl(p); }
      var fig = el("span", "figure");
      add(c, el("span", "label-top", p.shortTitle || p.title), fig, el("span", "label", p.stat.label));
      if (linked) { c.appendChild(el("span", "more", "Read the case study")); }
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
    (oc.paragraphs || []).forEach(function (para) { add($("offclock-text"), textOrTodo("p", "", para)); });
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
      var fig = el("figure", "travel");
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
      var d = el("div"); add(d, el("span", "k", row[0]), v);
      if (row[0] === "Result") { add(d, textOrTodo("span", "v", p.resultNumber)); }
      psr.appendChild(d);
    });
    if (p.video || p.image) {
      var m = mediaFor(p); m.classList.add("case-media"); root.appendChild(m);
    }
    var story = el("div", "story");
    (p.story || []).forEach(function (para) { add(story, textOrTodo("p", "", para)); });
    var links = el("div", "row-buttons");
    (p.links || []).forEach(function (l) {
      var a = el("a", "btn btn-line", l.label); a.href = l.url; a.target = "_blank"; a.rel = "noopener"; links.appendChild(a);
    });
    if (links.children.length) { story.appendChild(links); }
    root.appendChild(story);
  }

  shared();
  if ($("skill-grid")) { home(); }
  if ($("case")) { caseStudy(); }
  reveals();
})();
