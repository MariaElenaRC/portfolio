/*
  CONTENT FILE — everything Maria edits lives here.

  Rules:
  - Any text that starts with "TODO:" is an unfinished gap. It shows as an
    amber label on preview links and on your own computer, and is HIDDEN on
    the live site. Replace it with real text when you have it.
  - Never put an invented number or claim here. If you don't have it yet,
    leave the TODO.
  - A skill with ready: false, or with no projects, is hidden on the live site.
*/

window.SITE = {
  name: "Maria Elena Romero",

  // The sentence above your name. Drafted from your interview: change freely.
  intro: "I lead social strategy for a humanitarian organization. What I'm proudest of is that I can imagine innovative content and then make it happen.",

  // The two short lines under your name.
  facts: [
    "Strategic communications and social media",
    "English, español, português"
  ],

  email: "mariaelena.romero@gmail.com",   // used only on the résumé, not shown on the site
  linkedin: "https://www.linkedin.com/in/maria-elena-romero-18010730",
  resume: "",                    // e.g. "assets/maria-elena-romero-resume.pdf". Empty = link hidden on the live site.
  photo: "images/maria-cutout.webp",
  photoAlt: "Maria Elena Romero",

  // The yellow moving band: skills, not numbers.
  ticker: [
    "Social media strategy",
    "Data-supported decisions",
    "Visual storytelling",
    "Video podcasts",
    "Newsletters",
    "Project management",
    "Analytics and reporting",
    "Digital communications",
    "AI in the workflow"
  ],

  // The skill boxes. color: teal | vermilion | plum | indigo | marigold
  skills: [
    {
      id: "audience",
      title: "Social strategy and analytics",
      color: "teal",
      ready: true,
      main: "linkedin-newsletter",
      proof: "I lead social strategy at Doctors Without Borders USA and built how the team reads its numbers and turns them into decisions."
    },
    {
      id: "content",
      title: "Content and storytelling",
      color: "vermilion",
      ready: true,
      main: "humanitarian-lens",
      proof: "Video podcasts, newsletters, anniversary video series. I pitch a format, then build it."
    },
    {
      id: "lead",
      title: "Leading projects",
      color: "plum",
      ready: true,
      main: "every-30-seconds",
      proof: "I take an idea from pitch to launch: a video podcast at MSF, the TikTok channel at The World, the digital side of a yearlong election series."
    },
    {
      id: "ai",
      title: "Working with AI",
      color: "indigo",
      ready: true,
      main: "ai-drafting-pilot",
      proof: "I'm leading a pilot of an AI tool that drafts social content, and I use AI every day to brainstorm, draft and analyze data."
    }
  ],

  /*
    Projects. To add one, copy a block, change the slug (short, lowercase,
    no spaces) and fill it in.

    skills:   which skill boxes it appears under (use the skill ids above)
    feature:  "stat"  = also shown as a colored number card under Results (needs a stat block)
              ""      = appears only inside the skill boxes
    video:    a YouTube video ID (the part after watch?v=). Shown as a clickable video.
    image:    a picture in images/, used when there's no video.
    A skill box opens on its "main" project, shown in full with its video,
    image or number; the box's other projects are listed below it.
    stat:     { prefix, from, to, suffix, label } — the number counts from → to
    story:    paragraphs for the case-study page
    links:    buttons on the case-study page
  */
  projects: [
    {
      slug: "humanitarian-lens",
      org: "Doctors Without Borders USA",
      title: "The Humanitarian Lens video podcast",
      skills: ["content", "lead"],
      feature: "",
      color: "vermilion",
      video: "XxVpeEyMKWE",
      image: "",
      imageAlt: "Dr. Javid Abdelmoneim at the microphone on the set of The Humanitarian Lens",
      problem: "Our YouTube channel had almost no long-form content, and MSF had in-depth stories we rarely got to tell at length.",
      solution: "I pitched it as a plan we could start the next day: five episode ideas, the shape of each show, and how web stories and social would carry it. Then I made it a team project.",
      result: "Outlets now contact MSF to interview our guests, the show created new ways of working across teams, and we use viewer data to tighten each opening.",
      resultNumber: "TODO: one number from the podcast data, such as total views or average watch time.",
      story: [
        "MSF had wanted a podcast for a while. I thought the way to get it started was to pitch something so concrete we could agree on it and begin the next day.",
        "So I came with episodes, not ideas: possible stories for the first five shows, plus a format for every episode, from the opening to the introduction, the interview and what followed, and how a web story and social posts would extend each one. I wanted everyone invested, so I opened the plan up for comments and made it a group project, with production and post-production spread across the team.",
        "Two things nearly derailed it. We needed a studio, and building it pushed our first shoot from five months out to eight. Then a technical problem from the first shoot only surfaced when I saw the first edit. I pushed for the fix I believed in, because the first episode had to be right.",
        "The show is now seen inside MSF as a format that works. Media contact us to interview the people who appear on it, and it changed how teams work together. Nobody works on it full time: everyone fits it around their regular job. We study the data on every episode, and when we saw viewers leaving early, we changed how episodes open so they get into the story faster. My favorite episodes are the first one, on Sudan, and the one on Gaza."
      ],
      links: [
        { label: "Watch an episode", url: "https://youtu.be/XxVpeEyMKWE" },
        { label: "All episodes", url: "https://www.doctorswithoutborders.org/podcast-humanitarian-lens" }
      ]
    },
    {
      slug: "linkedin-newsletter",
      org: "Doctors Without Borders USA",
      title: "Monthly LinkedIn newsletter",
      shortTitle: "LinkedIn newsletter",
      skills: ["audience", "content"],
      feature: "stat",
      color: "vermilion",
      stat: { prefix: "", from: 0, to: 30000, suffix: "", label: "subscribers in about a year and a half. We had 15,000 by the second issue." },
      problem: "LinkedIn was one of our fastest-growing audiences, and people already following MSF there had no way to go deeper.",
      solution: "I built a prototype of a monthly newsletter with updates from MSF projects around the world, got it approved with new graphics from a designer, and write each issue.",
      result: "15,000 subscribers by the second issue and close to 30,000 in about a year and a half. Open and click-through rates have held steady as it grew.",
      story: [
        "LinkedIn is a professional platform, and a newsletter is a natural format there. We wanted a closer connection with people who already followed our work.",
        "I prototyped the newsletter, based on an existing newsletter that already had an approval process, then got it approved with new graphics made with a designer. I write each issue with more context and more engaging summaries than a standard update.",
        "The response surprised us: 15,000 subscribers by the second monthly issue. It now grows along with our LinkedIn following and is close to 30,000. We review growth and engagement every month."
      ],
      links: [
        { label: "See the newsletter", url: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7295532985796243457" },
        { label: "Read a recent issue", url: "https://www.linkedin.com/pulse/malnutrition-emergency-somalia-ongoing-blockade-gaza-more-msf-usa-p7zic" }
      ]
    },
    {
      slug: "broadcast-channel",
      org: "Doctors Without Borders USA",
      title: "Instagram broadcast channel",
      shortTitle: "Instagram broadcast channel",
      skills: ["audience"],
      feature: "stat",
      color: "teal",
      stat: { prefix: "", from: 0, to: 11000, suffix: "", label: "subscribers in its first year" },
      problem: "TODO: why a broadcast channel? What audience need did you see?",
      solution: "Launched the organization's Instagram broadcast channel.",
      result: "11,000 subscribers in its first year.",
      story: ["TODO: the story of the launch in two or three short paragraphs."],
      links: []
    },
    {
      slug: "the-world-social",
      org: "The World (PRX and GBH), 2018 to 2023",
      title: "Launching The World's TikTok and bringing video to its social media",
      shortTitle: "Instagram at The World",
      skills: ["audience", "content", "lead"],
      feature: "stat",
      color: "plum",
      stat: { prefix: "", from: 5000, to: 15000, suffix: "", label: "Instagram followers, up from about 5,000 in my four years at The World" },
      problem: "The World is a radio program, and its social accounts had little video.",
      solution: "I launched the program's TikTok channel, posting at least four videos a week, and started a weekly news recap with interns. I made the case for video across all our accounts and gave field reporters simple tips for shooting it. I ran Instagram, TikTok, Facebook and X.",
      result: "Instagram grew from about 5,000 to about 15,000 followers, with graphic and video formats that the team kept using.",
      story: [
        "When I joined The World, its social media reflected a radio newsroom: very little video. I kept making the argument that we needed it, and I wrote short tips so reporters in the field could send me usable footage. Some were reluctant at first, and then they started sending it.",
        "I launched The World's TikTok, editing videos on the most important story of the day, close to one a day and at least four a week. With interns, I started a weekly news recap and other formats. Across Instagram, TikTok, Facebook and X, I set up formats that mixed graphics and video.",
        "In four years, Instagram grew from about 5,000 followers to about 15,000."
      ],
      links: []
    },
    {
      slug: "tiktok-data",
      org: "Doctors Without Borders USA",
      title: "What our TikTok data told us",
      skills: ["audience"],
      feature: "",
      color: "teal",
      problem: "We needed to know what actually grew MSF's TikTok account.",
      solution: "I compared a year of TikTok data with the year before. Five videos drove most of the views. Explainers and breaking news held viewers longer, and influencer collaborations held them longest.",
      result: "So the plan is better videos, not more of them: a fast-response explainer format the team is designing now, and moving influencer work up.",
      story: [
        "Looking at our TikTok data year over year, I found that just five pieces of content grew the account and drew most of the views. Explainers and breaking news kept people watching longer, and content with influencers kept them watching longest and helped us grow the most.",
        "Posting more is not the answer. We're designing a workflow for fast-response explainers, so that when a health crisis breaks we can be the ones explaining it, the way our Ebola explainers held audiences. I also recommended speeding up our influencer work, which was delayed even though it performs so well.",
        "I make the recommendations and work with the social team to put them in place. It's how I like analytics to work: the numbers should change what we do."
      ],
      links: []
    },
    {
      slug: "analytics-practice",
      org: "Doctors Without Borders USA",
      title: "How the team uses its analytics",
      skills: ["audience", "lead"],
      feature: "",
      color: "teal",
      problem: "Social performance wasn't analyzed in a regular, systematic way.",
      solution: "I created how our analytics are presented, regular sessions to set strategy with the social team, and briefings to present findings to management.",
      result: "Analytics now feed the team's decisions, and we keep improving the process so we can say our decisions are based on numbers.",
      story: ["TODO: an example of a decision this process changed, and what management does with the briefings."],
      links: []
    },
    {
      slug: "ai-drafting-pilot",
      org: "Doctors Without Borders USA",
      title: "Piloting an AI drafting tool for the social team",
      skills: ["ai"],
      feature: "",
      color: "indigo",
      problem: "The social team puts out a steady stream of routine posts on regular stories, and they need to go out fast.",
      solution: "With MSF's innovation team, I'm leading a pilot of an AI tool that drafts that content. I'm bringing colleagues from the social team in to test it and give feedback.",
      result: "The pilot is in testing now, with the aim of launching it to the team.",
      story: [
        "I use MSF's enterprise AI tools every day. I use them to brainstorm, especially on campaigns where we need fresh angles on the same message again and again. I use them to draft social posts and newsletter copy. And I use them to analyze large spreadsheets of analytics data.",
        "Now I'm working with MSF's innovation team, the people who build our internal AI tools, on a drafting tool for social media. I lead the pilot: I test it, bring in people from the social team, and gather their feedback so it's ready to launch."
      ],
      links: []
    },
    {
      slug: "every-30-seconds",
      org: "The World, 2020",
      title: "Every 30 Seconds",
      skills: ["lead", "content"],
      feature: "",
      color: "plum",
      video: "7WIN_JnxtCs",
      problem: "Partway through this yearlong election series, its digital side needed a reset: assets were running late and there was no photography yet.",
      solution: "I volunteered to lead the digital work, then added videos, Facebook Lives and photography, produced the project video and designed the series graphic.",
      result: "The series' digital assets improved substantially. It followed eight young Latino first-time voters with seven public radio partners.",
      resultNumber: "TODO: one number for the series, such as video views or audience reach.",
      story: [
        "Every 30 Seconds followed eight young Latino first-time voters through the 2020 election, with seven public radio partners. Partway through, it was clear the digital side needed more: more video, and photography we didn't yet have.",
        "I asked to lead it. We created videos, ran Facebook Lives, got the photography done, and I produced the project video and designed the series graphic."
      ],
      links: [
        { label: "Read the story", url: "https://theworld.org/stories/2020/10/28/we-followed-eight-young-latino-first-time-voters-all-year-here-s-how-they-view" },
        { label: "Watch the video", url: "https://www.youtube.com/watch?v=7WIN_JnxtCs" }
      ]
    },
    {
      slug: "ukraine-anniversary",
      org: "The World, February 2023",
      title: "Ukraine: one year of war",
      skills: ["content"],
      feature: "",
      color: "vermilion",
      video: "Y3TJPUzDhRA",
      problem: "The World is a radio-first newsroom, and I was the only person making video.",
      solution: "I pitched a series of videos for the first anniversary of the war, interviewed the correspondents, and produced them with Andrew Blum, combining archive footage with the correspondents' own video.",
      result: "TODO: Marco Werman's reaction, in words he confirms, or another result.",
      story: [
        "There was some funding for video and a big moment coming: the first anniversary of the war in Ukraine. I saw the space and took the initiative. I pitched the videos, interviewed our correspondents Daniel Ofman, Durrie Bouscaren and Shirin Jaafari, and produced them with Andrew Blum, then brought them for final approval.",
        "The videos were meant to reach audiences the radio show doesn't. The process itself was something I invented for a newsroom built around audio."
      ],
      links: [
        { label: "Watch the video", url: "https://www.youtube.com/watch?v=Y3TJPUzDhRA" },
        { label: "Read the story", url: "https://theworld.org/stories/2023/02/21/ukraine-s-year-war-displacement-and-no-end-sight" }
      ]
    },
    {
      slug: "lenacapavir-petition",
      org: "Doctors Without Borders USA",
      title: "Lenacapavir petition carousel",
      skills: ["content"],
      feature: "",
      color: "vermilion",
      problem: "MSF was urging Gilead to make a twice-yearly HIV prevention shot available to everyone.",
      solution: "I wrote the Instagram carousel for the petition.",
      result: "More than 1,000 clicks and signatures.",
      story: ["TODO: tell the story in two or three short paragraphs."],
      links: [
        { label: "See the post", url: "https://www.instagram.com/p/DaF9fB7jFPD/" }
      ]
    }
  ],

  about: {
    lead: "I'm the engagement editor at Doctors Without Borders USA. Colleagues come to me to ask whether a post fits our voice, or which format a story needs.",
    paragraphs: [
      "Before that I was social media editor at The World, from PRX and GBH, where I launched the program's TikTok and pushed a radio newsroom toward video. Before that I was senior planning producer at Al Jazeera America.",
      "I spent eight years producing for Al Jazeera English across Latin America and set up the network's presence in Brazil. Field work taught me to adapt fast and get things done in hard conditions. I bring that to every project, from an office.",
      "MA in International Studies and Human Rights, University of Denver. Certificate in Strategic Communications and Social Media, Georgetown University."
    ]
  },

  // Travel and life outside work. Shown on the live site once there is at least one photo.
  // Photos: up to three, { src: "images/japan.jpg", place: "Kyoto, Japan" }
  offClock: {
    paragraphs: [
      "Travel is how I learn. Seeing Hiroshima and Nagasaki, riding Japan's trains, watching the balloons rise over Cappadocia. It also keeps my problem-solving sharp: a new place every few days means quick decisions far outside my routine.",
      "TODO: how many countries so far (one number).",
      "When I'm home I want to be outdoors: hiking, diving, exercising, anywhere in nature."
    ],
    photos: []
  },

  footerCredit: "Made with Claude Code"
};
