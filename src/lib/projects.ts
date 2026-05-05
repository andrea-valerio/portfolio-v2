import type { StaticImageData } from "next/image";

import {
  PROJECT_HEROES,
  LOOMLY,
  MEETUP,
  GROOVE,
  OVEN,
  THESIS,
} from "./project-images";

export type ProjectSlug =
  | "loomly-ai"
  | "meetup"
  | "groove"
  | "teleoperators-workload"
  | "oven-configurator";

export type ProjectImageItem = {
  id: string;
  src: StaticImageData;
  alt: string;
  caption: string;
};

export type ProjectImageGroup = {
  label?: string;
  layout: "landscape" | "portrait";
  kind: "single" | "carousel";
  items: ProjectImageItem[];
};

export type ProjectSection = {
  n: string;
  eyebrow: string;
  title: string;
  intro: string[];
  body: string[];
  groups: ProjectImageGroup[];
};

export type ProjectCaseStudy = {
  slug: ProjectSlug;
  n: string;
  title: string;
  titleLines: string[];
  subtitle: string;
  when: string;
  type: string;
  where: string;
  role: string;
  team: string;
  tags: string[];
  hero: StaticImageData;
  nextSlug: ProjectSlug;
  nextN: string;
  nextTitle: string;
  sections: ProjectSection[];
};

export type ProjectSummary = {
  n: string;
  slug: ProjectSlug;
  tag: string;
  title: string;
  desc: string;
  year: string;
  span: "big" | "med" | "small";
  hero: StaticImageData;
};

export const PROJECTS_SUMMARY: ProjectSummary[] = [
  {
    n: "01",
    slug: "loomly-ai",
    tag: "AI PRODUCT DESIGN",
    title: "Loomly AI",
    desc:
      "Designing AI-powered features for a social media management platform — turning generative tools into reliable, everyday workflows for content teams.",
    year: "2026",
    span: "big",
    hero: PROJECT_HEROES["loomly-ai"],
  },
  {
    n: "02",
    slug: "meetup",
    tag: "PRODUCT DESIGN",
    title: "Meetup",
    desc:
      "Mobile redesign and organizer flows for Meetup’s global groups-and-events platform — plus growth experiments on SMS reminders and onboarding paywalls, shipped behind large-scale A/B tests.",
    year: "2025",
    span: "med",
    hero: PROJECT_HEROES.meetup,
  },
  {
    n: "03",
    slug: "groove",
    tag: "UX / UI DESIGN",
    title: "Groove",
    desc:
      "Club-ticketing MVP: geolocation discovery, tailored picks, and a quick path from map to checkout for nightlife.",
    year: "2024",
    span: "med",
    hero: PROJECT_HEROES.groove,
  },
  {
    n: "04",
    slug: "teleoperators-workload",
    tag: "HCI RESEARCH",
    title: "Workload study",
    desc:
      "Modeling cognitive load for remote AV fleet operators — eye-tracking and physiological signals to assess and predict workload in real time.",
    year: "2024—25",
    span: "med",
    hero: PROJECT_HEROES["teleoperators-workload"],
  },
  {
    n: "05",
    slug: "oven-configurator",
    tag: "UX RESEARCH & DESIGN",
    title: "Oven Configurator",
    desc:
      "UNOX’s oven configurator, redesigned for marketers — a clearer, faster path through a complex professional product line.",
    year: "2022",
    span: "med",
    hero: PROJECT_HEROES["oven-configurator"],
  },
];

export const PROJECTS_DATA: Record<ProjectSlug, ProjectCaseStudy> = {
  "loomly-ai": {
    slug: "loomly-ai",
    n: "01",
    title: "Loomly AI",
    titleLines: ["LOOMLY", "AI."],
    subtitle: "Loomly: social media management, powered by AI.",
    when: "January — April 2026",
    type: "AI Product Design",
    where: "Bending Spoons",
    role: "Product Designer",
    team: "Solo product designer",
    tags: ["AI PRODUCT DESIGN"],
    hero: PROJECT_HEROES["loomly-ai"],
    nextSlug: "meetup",
    nextN: "02",
    nextTitle: "02 MEETUP",
    sections: [
      {
        n: "01",
        eyebrow: "the project",
        title: "INTRODUCTION",
        intro: [
          "Loomly is a social media management tool that helps brands, agencies, and freelancers plan, create, schedule, and analyze their content. Following its acquisition by Bending Spoons, the team faced a rapidly shifting market, where users were increasingly relying on a patchwork of external AI tools before bringing content back into their scheduling tool.",
          "The opportunity was to consolidate the entire content workflow inside a single AI-native product, layering AI across the content lifecycle: idea generation, post creation, social listening, AI analytics, manage DMs and comments, and an ubiquitous AI assistant.",
          "I joined as the only product designer and, given the exploratory nature of the project, also took on partial project management responsibilities.",
        ],
        body: [],
        groups: [],
      },
      {
        n: "02",
        eyebrow: "design phase",
        title: "RESEARCH AND DESIGN",
        intro: [
          "The project ran on a agile approach and compressed timeline: the first version shipped in ~1 month from kickoff.",
          "Within the first iteration, user research found its place, and I ran 6 usability sessions and interviews with target users. In addition, I shipped a lightweight in-product survey to capture early sentiment after launch and gather ongoing feedback. The research surfaced that the calendar remains the mental backbone of social media work, and that users see AI as a workload reducer and supporting assistant rather than an autonomous creator.",
          "I owned the end-to-end design of the new experience, including the navigation, dashboard, and the AI Assistant behavior across side panel and full screen. Among the main app features, a new look and framework has been given to the onboarding flow, accompanied by the highly awaited Social Listening feature; other sections are the revamped Interactions (DMs and comments manager) with AI-drafted replies, and a new Ideas Board with AI auto-fill. Also, I worked on the new credit-based monetization system with a full-set of paywalls across plans and usage thresholds.",
        ],
        groups: [
          {
            label: "Research",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "loomly-r-1", src: LOOMLY.dashboard, alt: "Loomly dashboard with AI assistant hero", caption: "Loomly dashboard with AI assistant hero" },
              { id: "loomly-r-2", src: LOOMLY.aiAssistant, alt: "Loomly AI Assistant chat interface", caption: "Loomly AI Assistant chat interface" },
              { id: "loomly-r-3", src: LOOMLY.interactions, alt: "Interactions and AI replies", caption: "Interactions and AI replies" },
              { id: "loomly-r-4", src: LOOMLY.listeningIdeas, alt: "Social listening and ideas board", caption: "Social listening and ideas board" },
              { id: "loomly-r-5", src: LOOMLY.paywalls, alt: "AI credits and paywall states", caption: "AI credits and paywall states" },
            ],
          },
          {
            label: "Marketing",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "loomly-m-1", src: LOOMLY.marketing, alt: "Marketing campaign materials", caption: "Marketing campaign materials" },
              { id: "loomly-m-2", src: LOOMLY.tubeCampaign, alt: "London and Glasgow Tube campaign", caption: "London and Glasgow Tube campaign" },
            ],
          },
        ],
        body: [
          "In general the product received a soft rebrand, which peaked in the redesign of the homepage and pricing page of the marketing website. The pivot also extended beyond the app: I contributed to the communication and graphic strategy for the marketing campaign on the London and Glasgow Tube, and backed up media designers in creating the new logo.",
          "Other minor early-phase initiatives included the mobile app revamp and a new link-in-bio feature, where Lovable prototypes replaced Figma specs for pragmatism.",
        ],
      },
      {
        n: "03",
        eyebrow: "tooling",
        title: "AI WORKFLOW",
        intro: [
          "To keep the impact and efficiency high, I adopted an AI workflow that let me work beyond the Figma files, carrying out frontend tasks to refine UI elements and interactions. As of April 2026, I'm exploring an AI automation that bilaterally manages, matches, and refreshes the design system on both Figma and frontend at token and component levels. In general, tools I use include Cursor, Claude (Code, Co-work, and Design), Figma MCPs, and Lovable.",
        ],
        body: [],
        groups: [],
      },
      {
        n: "04",
        eyebrow: "outcome",
        title: "RESULTS AND IMPACT",
        intro: [
          "The MVP launched in February 2026, first on new users through A/B testing, then progressively extended to repackaged users and by March on the whole user base. Early signals are promising: at par on monetization, with clear product-side improvements on interactions, analytics, and social listening. Evaluation is still in progress, but the pivot has already redefined Loomly from a scheduling tool to an AI-native content platform.",
        ],
        body: [],
        groups: [],
      },
    ],
  },

  meetup: {
    slug: "meetup",
    n: "02",
    title: "Meetup",
    titleLines: ["MEETUP."],
    subtitle:
      "Mobile redesign, organizer flows, and growth experiments on a global community-events platform — validated with A/B tests at scale.",
    when: "September — December 2025",
    type: "Product Design",
    where: "Bending Spoons",
    role: "Product Designer",
    team: "Product team",
    tags: ["PRODUCT DESIGN"],
    hero: PROJECT_HEROES.meetup,
    nextSlug: "groove",
    nextN: "03",
    nextTitle: "03 GROOVE",
    sections: [
      {
        n: "01",
        eyebrow: "the project",
        title: "CONTEXT",
        intro: [
          "Meetup is a global platform that enables people to create communities and organize events around shared interests. It's <mark>one of the largest event and community platforms</mark> globally, with <mark>millions of monthly active users</mark> worldwide.",
          "At the time I joined the product team, Meetup had been undergoing a large redesign aimed at modernizing the platform and repositioning it among competitors, which place strong emphasis on UI and product experience.",
          "In the meantime, I also contributed to growth tasks with the aim of enhancing product monetization and business prosperity.",
        ],
        body: [],
        groups: [],
      },
      {
        n: "02",
        eyebrow: "design phase",
        title: "REDESIGN",
        intro: [
          "By the time I joined the team the work on the web was almost done; I personally took care of the low-visibility pages as part of my team onboarding, mainly taking care of secondary features for organizers.",
          "We then continued with the mobile redesign, supporting the team in defining the visual direction in core pages and reusable components in high-traffic sections like home, search, events and group page. On my side, I personally owned the redesign of the group creation flow, attendance flow, main paywalls, and the app settings.",
          "Alongside the visual refresh, several UX improvements were implemented in flows where the existing experience was clearly suboptimal. The goal was to deliver a more modern, consistent product experience while applying cost-effective and impactful UX changes.",
          "The rollout was carefully a/b tested on high-visibility pages to ensure that the core experience was welcome by users and well-performing according to company standards.",
        ],
        groups: [
          {
            label: "Redesign",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "meetup-r-1", src: MEETUP.comparisonWeb, alt: "Web comparison", caption: "Web comparison" },
              { id: "meetup-r-2", src: MEETUP.comparisonMobile, alt: "Mobile comparison", caption: "Mobile comparison" },
              { id: "meetup-r-3", src: MEETUP.groupCreation, alt: "Group creation flow", caption: "Group creation flow" },
              { id: "meetup-r-4", src: MEETUP.attendance, alt: "Attendance flow", caption: "Attendance flow" },
              { id: "meetup-r-5", src: MEETUP.organizer, alt: "Organizer", caption: "Organizer" },
              { id: "meetup-r-6", src: MEETUP.others, alt: "Additional screens", caption: "Additional screens" },
            ],
          },
        ],
        body: [],
      },
      {
        n: "03",
        eyebrow: "experiments",
        title: "GROWTH",
        intro: [
          "Alongside the redesign, several a/b test experiments explored ways to improve product engagement and monetization.",
          "One initiative focused on SMS reminders for event participants. Event attendance had long been a known pain point, with a meaningful share of no-shows attributable to attendees simply forgetting about the event. I therefore explored SMS reminders as a way to improve attendance while strengthening organizer–member communication.",
          "Another set of experiments focused on subscription paywalls during onboarding. Multiple design variations were tested to understand how timing and presentation affected conversion. One experiment introduced a full-screen paywall integrated into the onboarding flow, preceded by a short \"personalization\" loading screen. This variant significantly outperformed the previous modal paywall on iOS and Android, and became the new default experience, while testing started on Web, too.",
        ],
        groups: [
          {
            label: "Growth",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "meetup-g-1", src: MEETUP.sms, alt: "SMS reminders experiment", caption: "SMS reminders experiment" },
              { id: "meetup-g-2", src: MEETUP.paywalls, alt: "Subscription paywalls", caption: "Subscription paywalls" },
            ],
          },
        ],
        body: [],
      },
      {
        n: "04",
        eyebrow: "outcome",
        title: "IMPACT",
        intro: [
          "In conclusion, during my active period as a Meetup Product Designer, gross subscription bookings showed strong <mark>year-over-year growth</mark>, with onboarding and paywall experiments delivering meaningful monetization gains across desktop and mobile.",
          "Moreover, the redesigned mobile app launched successfully and received external visibility, including coverage from Engadget and an award as <mark>best friendship app</mark> by German broadcast company nTV.",
          "Together, these changes helped <mark>reposition Meetup</mark> as a more contemporary product and laid the foundation for future product development.",
        ],
        body: [],
        groups: [],
      },
    ],
  },

  groove: {
    slug: "groove",
    n: "03",
    title: "Groove",
    titleLines: ["GROOVE."],
    subtitle:
      "This project was developed for a start-up based in Trento, focusing on creating a MVP for their investor pitch.",
    when: "September — November 2024",
    type: "UX / UI Design",
    where: "Groove (Trento start-up)",
    role: "UX/UI Designer for Groove Project",
    team: "Individual project",
    tags: ["UX / UI DESIGN"],
    hero: PROJECT_HEROES.groove,
    nextSlug: "teleoperators-workload",
    nextN: "04",
    nextTitle: "04 WORKLOAD STUDY",
    sections: [
      {
        n: "01",
        eyebrow: "the project",
        title: "INTRODUCTION",
        intro: [
          "This project was developed for a start-up based in Trento, focusing on creating a MVP for their investor pitch.",
          "The app is designed to streamline the search and purchase of club event tickets using geolocation and personalized suggestions.",
          "The project had a tight one-month timeline, executed as a side project while balancing my full-time research intern position.",
        ],
        body: [],
        groups: [],
      },
      {
        n: "02",
        eyebrow: "method",
        title: "DESIGN PROCESS",
        intro: [
          "A Double Diamond methodology was applied.",
          "In the discovery phase, stakeholder interviews, benchmark analysis, and online ethnography were conducted, alongside the creation of personas and experience journeys.",
        ],
        groups: [
          {
            layout: "landscape",
            kind: "single",
            items: [
              { id: "groove-d-1", src: GROOVE.stakeholder, alt: "Stakeholder interview wrap-up", caption: "Stakeholder interview wrap-up" },
            ],
          },
          {
            layout: "landscape",
            kind: "single",
            items: [
              { id: "groove-d-2", src: GROOVE.personas, alt: "User personas", caption: "User personas" },
            ],
          },
          {
            layout: "landscape",
            kind: "single",
            items: [
              { id: "groove-d-3", src: GROOVE.journeys, alt: "Experience journeys", caption: "Experience journeys" },
            ],
          },
          {
            layout: "landscape",
            kind: "single",
            items: [
              { id: "groove-d-4", src: GROOVE.crazy8, alt: "Crazy 8 with stakeholders", caption: "Crazy 8 with stakeholders" },
            ],
          },
        ],
        body: [
          "During the development phase, Crazy 8 brainstorming with stakeholders, sketches, low- and high-fidelity mock-ups were created. A quick video animation was also set-up for a funding contest.",
        ],
      },
      {
        n: "03",
        eyebrow: "outcome",
        title: "FINAL RESULT",
        intro: [
          "The final design featured three main sections:",
          "<strong>1. Home:</strong> Includes a search bar, a carousel of personalized suggestion cards, and a map-based exploration tool with filters for event preferences. Event page provides detailed information, ticket availability, links to venue details, and similar upcoming events.",
          "<strong>2. Tickets:</strong> Displays chronologically listed purchased tickets with essential event details and easy-to-use QR codes for smooth check-in.",
          "<strong>3. Profile:</strong> Shows the favourite events and venues, besides providing access to the friends list, fostering a small social dimension within the app.",
          "The app's design ensures intuitive navigation, vivid visuals, and functionality. The geolocation feature allows users to explore events dynamically, and the ticketing system is tailored for convenience and quick access during entry.",
        ],
        groups: [
          {
            label: "Results",
            layout: "portrait",
            kind: "carousel",
            items: [
              { id: "groove-f-1", src: GROOVE.signUp, alt: "Sign up", caption: "Sign up" },
              { id: "groove-f-2", src: GROOVE.home, alt: "Home", caption: "Home" },
              { id: "groove-f-3", src: GROOVE.ricerca, alt: "Search", caption: "Search" },
              { id: "groove-f-4", src: GROOVE.mappa, alt: "Map", caption: "Map" },
              { id: "groove-f-5", src: GROOVE.evento, alt: "Event", caption: "Event" },
              { id: "groove-f-6", src: GROOVE.locale, alt: "Venue", caption: "Venue" },
              { id: "groove-f-7", src: GROOVE.biglietti, alt: "Tickets", caption: "Tickets" },
              { id: "groove-f-8", src: GROOVE.biglietto, alt: "Ticket", caption: "Ticket" },
            ],
          },
        ],
        body: [],
      },
    ],
  },

  "teleoperators-workload": {
    slug: "teleoperators-workload",
    n: "04",
    title: "Workload study",
    titleLines: ["WORKLOAD", "STUDY."],
    subtitle:
      "This project investigates how mental workload affects remote operators managing autonomous vehicle fleets.",
    when: "June 2024 — March 2025",
    type: "HCI Research",
    where: "German Aerospace Center (DLR)",
    role: "Master’s Thesis & Research Assistant",
    team: "MSc in Human-Computer Interaction",
    tags: ["HCI RESEARCH"],
    hero: PROJECT_HEROES["teleoperators-workload"],
    nextSlug: "oven-configurator",
    nextN: "05",
    nextTitle: "05 OVEN CONFIGURATOR",
    sections: [
      {
        n: "01",
        eyebrow: "the project",
        title: "INTRODUCTION",
        intro: [
          "This project investigates how mental workload affects remote operators managing autonomous vehicle fleets. In these systems, operators must continuously monitor and intervene, making workload a critical factor for safety and performance.",
          "The goal was to explore whether eye-tracking data can be used to assess and predict workload in real time, enabling more adaptive and intelligent interfaces.",
          "For a full dive-in, I recommend taking a look at the related publication, or my thesis.",
        ],
        body: [],
        groups: [],
      },
      {
        n: "02",
        eyebrow: "method",
        title: "USER STUDY",
        intro: [
          "The analysis is based on data from a controlled user study adopting a 2×2 within-subject design, where workload was manipulated through task difficulty (easy vs. hard) and task presentation frequency (slow vs. fast). Participants performed remote fleet management tasks across all experimental conditions.",
          "For each condition, subjective workload was measured using NASA-TLX, while performance metrics and eye-tracking data were continuously recorded.",
          "The interaction took place within a single interface structured into five functional regions—Ticket, Description, Map, Diagnostics, and Actions—which were later used as Areas of Interest for the spatial analysis.",
        ],
        groups: [
          {
            label: "User study",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "thesis-u-1", src: THESIS.interface, alt: "Remote assistance interface with map, diagnostics, incident description, and actions", caption: "Remote assistance interface with map, diagnostics, incident description, and actions" },
              { id: "thesis-u-2", src: THESIS.interfaceAoi, alt: "Same interface with Areas of Interest regions highlighted", caption: "Same interface with Areas of Interest regions highlighted" },
              { id: "thesis-u-3", src: THESIS.expSetup, alt: "Eye-tracking experiment setup with monitor and fiducial markers", caption: "Eye-tracking experiment setup with monitor and fiducial markers" },
              { id: "thesis-u-4", src: THESIS.expVp, alt: "Participant wearing eye-tracking glasses at the workstation", caption: "Participant wearing eye-tracking glasses at the workstation" },
            ],
          },
        ],
        body: [],
      },
      {
        n: "03",
        eyebrow: "pipeline",
        title: "ANALYSIS",
        intro: [
          "The analysis follows a structured pipeline combining statistical and machine learning approaches.",
          "After data cleaning and synchronization, a data extraction of AoI-based features followed to capture different aspects of visual behavior, including fixation dynamics, visit patterns, and spatial entropy measures. These metrics enabled a spatially grounded analysis of how attention is distributed across interface regions.",
          "A validation phase was conducted to ensure the robustness of the experimental setup. This included verifying workload manipulation through subjective measures, assessing performance decay under increasing workload, and validating the AoI segmentation using density-based clustering (HDBSCAN).",
          "Inferential analysis was then performed to address the research questions. Differences between low and high workload conditions were assessed using paired t-tests, while the effects of difficulty and frequency were analyzed through factorial repeated-measures ANOVA. In addition, L1-regularized logistic regression was used to identify the most informative interface regions for each metric.",
          "For the predictive analysis, a machine learning pipeline was developed to evaluate the extent to which workload states can be inferred from AoI metrics. A feature selection was performed using correlation filtering and the Boruta algorithm, followed by model evaluation through nested cross-validation with participant-level splits. Multiple models were tested, including Support Vector Classifier, Random Forest, Gradient Boosting, XGBoost, and Multilayer Perceptron, combined with different resampling strategies to address class imbalance.",
        ],
        groups: [
          {
            label: "Analysis",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "thesis-a-1", src: THESIS.hdbscan, alt: "HDBSCAN gaze clusters overlaid on interface Areas of Interest", caption: "HDBSCAN gaze clusters overlaid on interface Areas of Interest" },
              { id: "thesis-a-2", src: THESIS.binary, alt: "Stationary entropy and fixation duration by Easy Slow vs Hard Fast", caption: "Stationary entropy and fixation duration by Easy Slow vs Hard Fast" },
              { id: "thesis-a-3", src: THESIS.ttff, alt: "Time-to-first fixation on Actions by difficulty and by frequency", caption: "Time-to-first fixation on Actions by difficulty and by frequency" },
              { id: "thesis-a-4", src: THESIS.visFreq, alt: "Visit frequency for Ticket AOI by difficulty and by frequency", caption: "Visit frequency for Ticket AOI by difficulty and by frequency" },
              { id: "thesis-a-5", src: THESIS.confMat, alt: "Confusion matrices for workload classification models", caption: "Confusion matrices for workload classification models" },
            ],
          },
        ],
        body: [],
      },
      {
        n: "04",
        eyebrow: "outcome",
        title: "RESULTS",
        intro: [
          "The results show that mental workload significantly affects ocular behavior. Visual attention patterns change systematically under higher workload conditions, with operators allocating less attention to non-critical interface regions and adapting their visual strategies to manage increasing task complexity. Task difficulty was found to exert a broader and more consistent influence across metrics, while task frequency primarily affected the temporal dynamics of attention.",
          "From a predictive perspective, AoI-based metrics proved effective in estimating workload states. The best-performing models achieved approximately 83% performance in binary workload classification and around 80% for frequency-related states, demonstrating the potential of spatial eye-tracking features as reliable indicators of cognitive load.",
          "Overall, the findings support the use of AoI-based analysis for both explaining and predicting workload, contributing to the development of intelligent interfaces capable of adapting to users' mental states in real time.",
        ],
        body: [],
        groups: [],
      },
    ],
  },

  "oven-configurator": {
    slug: "oven-configurator",
    n: "05",
    title: "Oven Configurator",
    titleLines: ["OVEN", "CONFIGURATOR."],
    subtitle:
      "The project was carried out during my internship period at UNOX, a multinational manufacturing company selling professional intelligent ovens.",
    when: "May — July 2022",
    type: "UX Research & Design",
    where: "UNOX",
    role: "UX Design and Research Intern",
    team: "3-member team",
    tags: ["UX RESEARCH & DESIGN"],
    hero: PROJECT_HEROES["oven-configurator"],
    nextSlug: "loomly-ai",
    nextN: "01",
    nextTitle: "01 LOOMLY AI",
    sections: [
      {
        n: "01",
        eyebrow: "the project",
        title: "INTRODUCTION",
        intro: [
          "The project was carried out during my internship period at UNOX, a multinational manufacturing company selling professional intelligent ovens. The goal was to redesign the oven configurator, especially from the perspective of the company marketers.",
        ],
        body: [],
        groups: [],
      },
      {
        n: "02",
        eyebrow: "method",
        title: "RESEARCH",
        intro: [
          "The process began with a heuristic assessment of the current product layout, which is a section of the company website. A benchmark analysis, especially in the car industry, was also helpful to have fresh insights.",
          "Interviews as well as think-aloud sessions allowed the team to learn the needs and the work process of UNOX marketers, but also about final customers.",
          "As learned, consultation involves these phases:",
          "<ol><li>find the customer</li><li>understand the needs</li><li>present the best-suiting product</li><li>individual cooking experience (trial)</li><li>sell the oven configuration</li></ol>",
          "The oven configurator makes its appearance in the third step. Moreover, usability issues have been detected such as accessibility, process consistency, and language clarity; besides some configuration building constraints.",
          "The process then continued with the conceptualization of the new design of the configuration process, followed by wireframes and prototype.",
        ],
        groups: [
          {
            layout: "landscape",
            kind: "single",
            items: [
              { id: "oven-r-1", src: OVEN.accessFlow, alt: "Access flow", caption: "Access flow" },
            ],
          },
          {
            layout: "landscape",
            kind: "single",
            items: [
              { id: "oven-r-2", src: OVEN.configFlow, alt: "Configuration flow", caption: "Configuration flow" },
            ],
          },
        ],
        body: [
          "To conclude, a final session of usability testing has been vital to ensure practical functionality. These are the main takes:",
          "<ul><li>every participant managed to carry out the tasks</li><li>every participant couldn't understand what the configuration is about</li><li>some users had doubts on whether they added the secondary accessory or not</li><li>in the review phase, secondary buttons stood out more than the CTA</li></ul>",
        ],
      },
      {
        n: "03",
        eyebrow: "outcome",
        title: "FINAL RESULTS",
        intro: [
          "The team wanted to make the building process as smooth and flexible as possible. Indeed, now it's possible to select ovens and accessories one by one, with serial constraint logic and complete process awareness. Moreover, usability is improved and new options are available. In addition, a product-recommending survey feature tailored to final customers' needs has been designed.",
        ],
        groups: [
          {
            label: "Results",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "oven-f-1", src: OVEN.home, alt: "Home", caption: "Home" },
              { id: "oven-f-2", src: OVEN.ovens, alt: "Ovens selection", caption: "Ovens selection" },
              { id: "oven-f-3", src: OVEN.secondOven, alt: "Second oven", caption: "Second oven" },
              { id: "oven-f-4", src: OVEN.placement, alt: "Placement", caption: "Placement" },
              { id: "oven-f-5", src: OVEN.accessory, alt: "Accessory", caption: "Accessory" },
              { id: "oven-f-6", src: OVEN.review, alt: "Review", caption: "Review" },
            ],
          },
        ],
        body: [],
      },
    ],
  },
};

export const ALL_SLUGS: ProjectSlug[] = [
  "loomly-ai",
  "meetup",
  "groove",
  "teleoperators-workload",
  "oven-configurator",
];
