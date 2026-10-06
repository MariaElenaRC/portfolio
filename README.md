# Maria Elena Romero — portfolio

My portfolio site. It lives in this repository, and Netlify publishes it.

## How I update it

I open this folder in Claude Code and say what I want in plain English. Claude makes the change, gives me a private preview link, and publishes only when I say "publish".

Things I can say:

- "Pull the latest changes first." (Say this at the start of every session.)
- "Show me everything that's still marked to fill in."
- "Interview me about the podcast launch and fill in that project."
- "Add a new project to Selected work."
- "Change my intro line to: ..."
- "Replace my photo with this one."
- "Add my resume PDF."
- "Add these three travel photos, with place names."
- "Show me the preview." Then: "Publish."

## What the amber labels mean

Anything marked **[TO FILL IN: ...]** is a gap only I can fill. I see these on previews. Visitors to the live site never see them: unfinished lines and boxes stay hidden until they're done.

To see exactly what the public sees, add `?draft=0` to the end of the preview address.

## Before I publish

1. Open the preview on my phone and on a laptop.
2. Open it once with `?draft=0`.
3. Say "publish".

## Where things are

- `js/content.js` holds all my text, numbers, links and projects.
- `images/` holds my photos.
- `assets/` holds my resume.
- `CLAUDE.md` is the instruction sheet Claude reads. I can edit it to change how Claude works with me.
