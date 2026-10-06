# Maria Elena Romero — portfolio site

Instructions for Claude Code. Read this file before doing anything in this repository.

## Who you are working with

Maria Elena Romero owns this site. She is not a coder. She describes what she wants in plain English; you make the change, show her a preview, and publish only when she says so. Explain what you did in plain language, without jargon. Her husband Gabriel (GitHub: Gelizondo-bit) built the first version and is a collaborator.

## What the site is

A one-page professional portfolio plus a case-study page. It positions Maria for audience strategy, analytics and communications leadership roles. It is plain HTML, CSS and JavaScript with no framework and no build step. Keep it that way: do not add frameworks, package managers, bundlers or dependencies.

## Start of every session

1. Run `git pull` so you have the latest version. Gabriel may have made changes from his computer.
2. Check which branch you are on. All work happens on the `draft` branch (see Publishing).
3. Read `js/content.js`. That is where almost every request will be answered.

## Where things live

| File | What it is | How often it changes |
|---|---|---|
| `js/content.js` | ALL of Maria's words, numbers, links, skills and projects | Often. Most requests only touch this file |
| `images/` | Her photo, project images, travel photos | Sometimes |
| `assets/` | Her resume PDF | Sometimes |
| `index.html` | Page structure and the contact form | Rarely |
| `project.html` | The single case-study page. `project.html?p=<slug>` shows one project | Rarely |
| `css/styles.css` | The design. Colors and fonts are variables at the top | Rarely |
| `js/site.js` | Builds the page from content.js; animations | Rarely |
| `thanks.html` | Shown after the contact form is sent | Rarely |
| `netlify.toml` | Hosting settings | Almost never |

## Rules that are never broken

1. **Never invent anything about Maria.** No made-up numbers, job titles, awards, quotes, clients or results. If she hasn't given you a fact, ask her, or leave a TODO.
2. **Unfinished content is marked `TODO:`.** Any text in content.js that starts with `TODO:` shows as an amber label on previews and is hidden on the live site. Never delete a TODO by replacing it with a guess.
3. **Nothing unfinished goes public.** Work on `draft`, check the preview, publish only when Maria says "publish".
4. **Content goes in content.js**, not scattered through the HTML.
5. **Preserve the design** unless she asks for a design change: the Spectral and Karla fonts, the color variables in styles.css, the hero with her name large, the color skill boxes, the number cards.
6. **Do not remove existing projects or sections** without asking her first.
7. **Her words, her voice.** When you draft text for her, write plainly and specifically, in first person, and show it to her before saving. No marketing filler.

## How draft mode works

`js/site.js` decides whether the visitor sees TODO labels:

- On her computer (`localhost`) and on Netlify preview links: TODO labels are visible, unfinished skill boxes show with a dashed outline, and empty photo slots show as placeholders.
- On the live site: every TODO is hidden. A project line that is a TODO disappears. A skill box with `ready: false` or no projects disappears. The "Off the clock" strip disappears until it has photos. The resume links disappear until `resume` is set.
- Add `?draft=0` to any address to see exactly what the public sees. Add `?draft=1` to force the labels on.

Before publishing, always open the preview with `?draft=0` and confirm it looks complete.

## Common requests

**"Add a project."** Copy an existing block in `projects` in content.js. Give it a new `slug` (lowercase, hyphens, no spaces). Fill `org`, `title`, `skills` (ids of the skill boxes it belongs under), `problem`, `solution`, `result`, `story` (paragraphs for the case-study page) and `links`. Set `feature` to `"stat"` with a `stat` block if it should be a number card, or leave it `""`. Only one project can be `feature: "lead"`.

**"Interview me about [project] and fill it in."** Ask her, one question at a time: what was the problem or gap, what did she decide and do, what happened as a result (with a number if she has one), and what she learned. Then draft `problem`, `solution`, `result` (one sentence each) and two to four `story` paragraphs in her voice. Show her the draft, revise, then save.

**"Change my intro / bio / skills."** Edit `intro`, `facts`, `about` or `skills` in content.js.

**"Fill in the Working with AI box."** Edit the skill with id `ai`: replace the `proof` TODO with her real description, add at least one project tagged `skills: ["ai"]`, then set `ready: true`.

**"Replace my photo."** Save the new image in `images/` and set `photo` in content.js. The hero expects a cutout: a PNG or WebP with a transparent background, head and shoulders, roughly 4:5, about 720px wide. If she gives you a normal photo, remove the background first and show her the result before using it. If she prefers a normal framed photo, ask before changing the hero layout.

**"Add my resume."** Save the PDF in `assets/` and set `resume: "assets/<filename>.pdf"`.

**"Add travel photos."** Save up to three in `images/` (resize to about 1200px wide, compress) and list them in `offClock.photos` with a `place` name each.

**"Add an image to a project."** Save it in `images/`, set the project's `image` and `imageAlt`.

**"Change the ticker."** Edit the `ticker` list. Each item is a bold figure and a short label. Real figures only.

**"Move this project above that one."** Reorder the blocks in `projects`.

Always resize and compress images before adding them. Keep each under about 300 KB.

## Previewing on her computer

Run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`. Opening index.html directly also works. Check the phone layout by narrowing the browser window.

## Publishing

The site is hosted on Netlify (in Maria's own account) and deploys from this GitHub repository.

- **`draft` branch → private preview link.** Every push to `draft` builds a free preview. Use it for all work.
- **`main` branch → the live site.** Publishing means merging `draft` into `main` and pushing. Each publish uses Netlify credits, so batch changes: several edits, one publish.

Routine:

1. `git pull`, switch to `draft`.
2. Make the changes. Commit with a short plain-English message.
3. Push `draft`. Give Maria the preview link.
4. She checks it on her phone and on a laptop, and with `?draft=0`.
5. Only when she says "publish": merge `draft` into `main`, push, then confirm the live site updated. After publishing, check the live address on a phone in a private browser window.

If anything goes wrong, do not force-push or rewrite history. Stop and explain. Every commit is a checkpoint that can be restored.

## Contact form

The form in index.html uses Netlify Forms. The `name="contact"`, `data-netlify="true"` and hidden `form-name` field must stay exactly as they are. Submissions are emailed to Maria; the notification address is set in the Netlify dashboard, not in this repository.

## Open decisions

Kept in private-notes.md on Maria's and Gabriel's computers. That file is not in the repository. Ask Maria if it is missing.
