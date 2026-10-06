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
  nameLead: "Maria Elena",      // printed in white
  nameAccent: "Romero",         // printed in marigold italic

  intro: "I find the audience, lead the work from idea to launch, and prove the result with numbers.",

  facts: [
    "News · Social media · Digital · Humanitarian communications",
    "English · Español · Português"
  ],

  email: "mariaelena.romero@gmail.com",
  linkedin: "https://www.linkedin.com/in/maria-elena-romero-18010730",
  resume: "",                    // e.g. "assets/maria-elena-romero-resume.pdf". Empty = link hidden on the live site.
  photo: "images/maria-cutout.webp",
  photoAlt: "Maria Elena Romero",

  // The yellow moving band. Each item: a bold figure and a short label.
  ticker: [
    { figure: "30,000+", label: "newsletter subscribers" },
    { figure: "30%", label: "newsletter open rate" },
    { figure: "11,000", label: "broadcast channel subscribers in year one" },
    { figure: "1,000+", label: "petition clicks and signatures from one carousel" },
    { figure: "Monthly", label: "performance reporting, up from twice a year" }
  ],

  workedWith: [
    "Doctors Without Borders USA",
    "The World",
    "PRX",
    "GBH",
    "Al Jazeera English",
    "Al Jazeera America"
  ],

  // The skill boxes. color: teal | vermilion | plum | indigo | marigold
  skills: [
    {
      id: "audience",
      title: "Audience strategy and analytics",
      color: "teal",
      ready: true,
      proof: "Data-informed decisions. Launched MSF USA's Instagram broadcast channel, 11,000 subscribers in its first year, and moved the department to monthly performance reporting."
    },
    {
      id: "content",
      title: "Content and editorial",
      color: "vermilion",
      ready: true,
      proof: "Conceived, pitched and launched MSF USA's video podcast. Write its monthly LinkedIn newsletter: 30,000+ subscribers, 30% open rate."
    },
    {
      id: "lead",
      title: "Project and team leadership",
      color: "plum",
      ready: true,
      proof: "Project manager for Every 30 Seconds, a yearlong series with seven public radio partners. Direct the multimedia team on the podcast."
    },
    {
      id: "ai",
      title: "Working with AI",
      color: "marigold",
      ready: false,
      proof: "TODO: two or three things you really use AI for, plus one example. Possible first example: this site, kept up to date with Claude Code."
    }
  ],

  /*
    Projects. To add one, copy a block, change the slug (short, lowercase,
    no spaces) and fill it in.

    skills:   which skill boxes it appears under (use the skill ids above)
    feature:  "lead"  = the big dark card at the top of Selected work (only one)
              "stat"  = a colored number card (needs a stat block)
              ""      = appears only inside the skill boxes
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
      feature: "lead",
      color: "teal",
      image: "",
      imageAlt: "Dr. Javid Abdelmoneim at the microphone on the set of The Humanitarian Lens",
      problem: "TODO: the gap you saw. Why did MSF USA need a video podcast?",
      solution: "Conceived, pitched and launched MSF USA's video podcast. Directs the multimedia team.",
      result: "TODO: a number, such as views, subscribers or episodes published.",
      story: [
        "TODO: how the idea started and how you pitched it.",
        "TODO: what it took to get it on air: the team, the format, the first episode.",
        "TODO: what it has achieved and what you learned."
      ],
      links: [
        { label: "Watch an episode", url: "https://youtu.be/XxVpeEyMKWE" },
        { label: "All episodes", url: "https://www.doctorswithoutborders.org/podcast-humanitarian-lens" }
      ]
    },
    {
      slug: "broadcast-channel",
      org: "Doctors Without Borders USA",
      title: "Instagram broadcast channel",
      skills: ["audience"],
      feature: "stat",
      color: "teal",
      stat: { prefix: "", from: 0, to: 11000, suffix: "", label: "subscribers in its first year" },
      problem: "TODO: why a broadcast channel? What audience need did you see?",
      solution: "Launched the organization's Instagram broadcast channel.",
      result: "11,000 subscribers in its first year.",
      story: ["TODO: tell the story of the launch in two or three short paragraphs."],
      links: []
    },
    {
      slug: "linkedin-newsletter",
      org: "Doctors Without Borders USA",
      title: "Monthly LinkedIn newsletter",
      skills: ["audience", "content"],
      feature: "stat",
      color: "vermilion",
      stat: { prefix: "", from: 0, to: 30000, suffix: "+", label: "subscribers, with a 30% open rate" },
      problem: "A small but very loyal audience that MSF wanted to engage more closely.",
      solution: "Launched a monthly LinkedIn newsletter with updates from MSF projects around the world, and write each issue.",
      result: "30,000+ subscribers and a 30% open rate.",
      story: ["TODO: tell the story in two or three short paragraphs."],
      links: [
        { label: "See the newsletter", url: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7295532985796243457" },
        { label: "Read a recent issue", url: "https://www.linkedin.com/pulse/malnutrition-emergency-somalia-ongoing-blockade-gaza-more-msf-usa-p7zic" }
      ]
    },
    {
      slug: "performance-reporting",
      org: "Doctors Without Borders USA",
      title: "Monthly performance reporting",
      shortTitle: "Performance reporting",
      skills: ["audience"],
      feature: "stat",
      color: "indigo",
      stat: { prefix: "2 → ", from: 2, to: 12, suffix: "", label: "reports a year, from twice-yearly to monthly" },
      problem: "Performance was reported to the department twice a year.",
      solution: "Moved the department to monthly reporting.",
      result: "TODO: a decision that changed because of the monthly numbers.",
      story: ["TODO: what the report covers, who reads it, and what it changed."],
      links: []
    },
    {
      slug: "lenacapavir-petition",
      org: "Doctors Without Borders USA",
      title: "Lenacapavir petition carousel",
      skills: ["content"],
      feature: "",
      color: "vermilion",
      problem: "MSF was urging Gilead to make a twice-yearly HIV prevention shot available to everyone.",
      solution: "Wrote the Instagram carousel for the petition.",
      result: "More than 1,000 clicks and signatures.",
      story: ["TODO: tell the story in two or three short paragraphs."],
      links: [
        { label: "See the post", url: "https://www.instagram.com/p/DaF9fB7jFPD/" }
      ]
    },
    {
      slug: "every-30-seconds",
      org: "The World · 2020",
      title: "Every 30 Seconds",
      skills: ["lead"],
      feature: "",
      color: "plum",
      problem: "TODO: the goal of the series.",
      solution: "Project manager and social lead for a yearlong series with seven public radio partners, following eight young Latino first-time voters.",
      result: "TODO: reach or outcome.",
      story: ["TODO: tell the story in two or three short paragraphs."],
      links: [
        { label: "Read the story", url: "https://theworld.org/stories/2020/10/28/we-followed-eight-young-latino-first-time-voters-all-year-here-s-how-they-view" },
        { label: "Watch the video", url: "https://www.youtube.com/watch?v=7WIN_JnxtCs" }
      ]
    },
    {
      slug: "the-world-tiktok",
      org: "The World",
      title: "TikTok and on-camera series",
      skills: ["audience", "content"],
      feature: "",
      color: "teal",
      problem: "TODO: the audience you were after.",
      solution: "Launched the program's TikTok and an on-camera series with field reporters.",
      result: "TODO: growth figures.",
      story: ["TODO: tell the story in two or three short paragraphs."],
      links: []
    }
  ],

  about: {
    lead: "I'm the engagement editor at Doctors Without Borders USA, where I run organic social strategy, analytics and editorial voice.",
    paragraphs: [
      "Before that I led social strategy for The World, a daily international news program from PRX and GBH. I started as a producer for Al Jazeera English across Latin America, where I set up the network's presence in Brazil.",
      "MA in International Studies and Human Rights, University of Denver. Certificate in Strategic Communications and Social Media, Georgetown University."
    ]
  },

  // Travel strip. Add up to three photos: { src: "images/travel-1.jpg", place: "Place name" }
  offClock: {
    text: "I travel. About 60 countries so far, and these are a few of my photos.",
    photos: []
  },

  footerCredit: "Made with Claude Code"
};
