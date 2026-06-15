import type { StaticImageData } from "next/image";

import {
  PROJECT_HEROES,
  ISSUU,
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
  | "oven-configurator"
  | "issuu";

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
  /** Optional handwritten secondary line shown under the H2 (rendered in the `hand` font). */
  subtitle?: string;
  intro: string[];
  body: string[];
  groups: ProjectImageGroup[];
  /** Renders after body prose (e.g. carousel that belongs after a closing paragraph). */
  groupsAfterBody?: ProjectImageGroup[];
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
    slug: "issuu",
    tag: "PRODUCT DESIGN",
    title: "Issuu",
    desc:
      "Growth experiments, discoverability redesign, and a data-driven publishing flow overhaul — validated with A/B tests at scale.",
    year: "2026",
    span: "med",
    hero: PROJECT_HEROES.issuu,
  },
  {
    n: "03",
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
    slug: "groove",
    tag: "UX / UI DESIGN",
    title: "Groove",
    desc:
      "Club-ticketing MVP: geolocation discovery, tailored picks, and a quick path from map to checkout for nightlife.",
    year: "2024",
    span: "med",
    hero: PROJECT_HEROES.groove,
  },
  // ── Oven Configurator: temporarily removed from the listing and replaced by
  //    Issuu (above). The page, route, and case-study data are all preserved
  //    (see ALL_SLUGS + PROJECTS_DATA["oven-configurator"]); restore it in the
  //    listing by un-commenting this entry.
  // {
  //   n: "05",
  //   slug: "oven-configurator",
  //   tag: "UX RESEARCH & DESIGN",
  //   title: "Oven Configurator",
  //   desc:
  //     "UNOX’s oven configurator, redesigned for marketers — a clearer, faster path through a complex professional product line.",
  //   year: "2022",
  //   span: "med",
  //   hero: PROJECT_HEROES["oven-configurator"],
  // },
];

export const PROJECTS_DATA: Record<ProjectSlug, ProjectCaseStudy> = {
  "loomly-ai": {
    slug: "loomly-ai",
    n: "01",
    title: "Loomly AI",
    titleLines: ["LOOMLY", "AI."],
    subtitle: "Loomly: social media management, powered by AI.",
    when: "Jan - Apr 2026",
    type: "AI Product Design",
    where: "Bending Spoons",
    role: "Product Designer",
    team: "Solo product designer",
    tags: ["AI PRODUCT DESIGN"],
    hero: PROJECT_HEROES["loomly-ai"],
    nextSlug: "issuu",
    nextN: "02",
    nextTitle: "02 ISSUU",
    sections: [
      {
        n: "01",
        eyebrow: "the project",
        title: "INTRODUCTION",
        intro: [
          "Loomly is a <mark>social media management tool</mark> that helps brands, agencies, and freelancers plan, create, schedule, and analyze their content. Following its acquisition by Bending Spoons, the team faced a rapidly shifting market, where users were increasingly relying on a patchwork of external AI tools before bringing content back into their scheduling tool.",
          "The opportunity was to consolidate the entire content workflow inside a single <mark>AI-native product</mark>, layering AI across the content lifecycle: idea generation, post creation, social listening, AI analytics, manage DMs and comments, and an ubiquitous AI assistant.",
          "I joined as the <mark>only product designer</mark> and, given the exploratory nature of the project, also took on partial <mark>project management responsibilities</mark>.",
        ],
        body: [],
        groups: [],
      },
      {
        n: "02",
        eyebrow: "design phase",
        title: "RESEARCH AND DESIGN",
        intro: [
          "The project ran on a <mark>agile approach</mark> and <mark>compressed timeline</mark>: the first version shipped in ~1 month from kickoff.",
          "Within the first iteration, user research found its place, and I ran 6 <mark>usability sessions and interviews</mark> with target users. In addition, I shipped a lightweight <mark>in-product survey</mark> to capture early sentiment after launch and gather ongoing feedback. The research surfaced that the calendar remains the mental backbone of social media work, and that users see AI as a workload reducer and supporting assistant rather than an autonomous creator.",
          "I <mark>owned the end-to-end design</mark> of the new experience, including the navigation, dashboard, and the <mark>AI Assistant behavior</mark> across side panel and full screen. Among the main app features, a new look and framework has been given to the onboarding flow, accompanied by the highly awaited Social Listening feature; other sections are the revamped Interactions (DMs and comments manager) with AI-drafted replies, and a new Ideas Board with AI auto-fill. Also, I worked on the new credit-based <mark>monetization system</mark> with a full-set of paywalls across plans and usage thresholds.",
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
        ],
        groupsAfterBody: [
          {
            label: "Marketing",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "loomly-m-1", src: LOOMLY.marketing, alt: "Marketing website", caption: "Marketing website" },
              { id: "loomly-m-2", src: LOOMLY.tubeCampaign, alt: "London and Glasgow Tube campaign", caption: "London and Glasgow Tube campaign" },
            ],
          },
        ],
        body: [
          "In general the product received a <mark>soft rebrand</mark>, which peaked in the redesign of the homepage and pricing page of the marketing website. The pivot also extended beyond the app: I contributed to the communication and graphic strategy for the <mark>marketing campaign</mark> on the London and Glasgow Tube, and backed up media designers in creating the <mark>new logo</mark>.",
          "Other minor early-phase initiatives included the mobile app revamp and a new link-in-bio feature, where Lovable prototypes replaced Figma specs for <mark>pragmatism</mark>.",
        ],
      },
      {
        n: "03",
        eyebrow: "tooling",
        title: "AI WORKFLOW",
        intro: [
          "To keep the impact and efficiency high, I adopted an AI workflow that let me work beyond the Figma files, carrying out <mark>frontend tasks</mark> to refine UI elements and interactions. As of April 2026, I'm exploring an <mark>AI automation</mark> that bilaterally manages, matches, and refreshes the design system on both Figma and frontend at <mark>token and component levels.</mark> In general, tools I use include Cursor, Claude (Code, Co-work, and Design), Figma MCPs, and Lovable.",
        ],
        body: [],
        groups: [],
      },
      {
        n: "04",
        eyebrow: "outcome",
        title: "RESULTS AND IMPACT",
        intro: [
          "The <mark>MVP</mark> launched in February 2026, first on new users through <mark>A/B testing,</mark> then progressively extended to repackaged users and by March on the <mark>whole user base.</mark> Early signals are promising: at par on monetization, with clear product-side improvements on interactions, analytics, and social listening. Evaluation is still in progress, but the pivot has already <mark>redefined Loomly</mark> from a scheduling tool to an AI-native content platform.",
        ],
        body: [],
        groups: [],
      },
    ],
  },

  meetup: {
    slug: "meetup",
    n: "03",
    title: "Meetup",
    titleLines: ["MEETUP."],
    subtitle:
      "Mobile redesign, organizer flows, and growth experiments on a global community-events platform — validated with A/B tests at scale.",
    when: "Sep - Dec 2025",
    type: "Product Design",
    where: "Bending Spoons",
    role: "Product Designer",
    team: "Product team",
    tags: ["PRODUCT DESIGN"],
    hero: PROJECT_HEROES.meetup,
    nextSlug: "teleoperators-workload",
    nextN: "04",
    nextTitle: "04 WORKLOAD STUDY",
    sections: [
      {
        n: "01",
        eyebrow: "the project",
        title: "CONTEXT",
        intro: [
          "Meetup is a global platform that enables people to create communities and organize events around shared interests. It's <mark>one of the largest event and community platforms</mark> globally, with <mark>millions of monthly active users</mark> worldwide.",
          "At the time I joined the product team, Meetup had been undergoing a <mark>large redesign</mark> aimed at <mark>modernizing</mark> the platform and repositioning it among competitors, which place strong emphasis on <mark>UI</mark> and <mark>product experience</mark>.",
          "In the meantime, I also contributed to growth tasks with the aim of enhancing <mark>product monetization</mark> and <mark>business prosperity</mark>.",
        ],
        body: [],
        groups: [],
      },
      {
        n: "02",
        eyebrow: "design phase",
        title: "REDESIGN",
        intro: [
          "By the time I joined the team the work on the <mark>web</mark> was almost done; I personally took care of the low-visibility pages as part of my team onboarding, mainly taking care of <mark>secondary features for organizers</mark>.",
          "We then continued with the <mark>mobile redesign</mark>, supporting the team in defining the visual direction in core pages and reusable components in high-traffic sections like home, search, events and group page. On my side, I personally owned the redesign of the <mark>group creation flow</mark>, <mark>attendance flow</mark>, main <mark>paywalls</mark>, and the <mark>app settings</mark>.",
          "Alongside the visual refresh, several UX improvements were implemented in flows where the existing experience was clearly suboptimal. The goal was to deliver a more modern, consistent <mark>product experience</mark> while applying <mark>cost-effective and impactful UX changes</mark>.",
          "The rollout was carefully <mark>a/b tested</mark> on high-visibility pages to ensure that the core experience was welcome by users and well-performing according to company standards.",
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
          "Alongside the redesign, several <mark>a/b test experiments</mark> explored ways to improve product engagement and monetization.",
          "One initiative focused on <mark>SMS reminders</mark> for event participants. Event attendance had long been a known pain point, with a meaningful share of no-shows attributable to attendees simply forgetting about the event. I therefore explored SMS reminders as a way to improve attendance while strengthening organizer–member communication.",
          "Another set of experiments focused on <mark>subscription paywalls</mark> during onboarding. Multiple design variations were tested to understand how timing and presentation affected conversion. One experiment introduced a full-screen paywall integrated into the <mark>onboarding flow</mark>, preceded by a short \"personalization\" loading screen. This variant <mark>significantly outperformed</mark> the previous modal paywall on iOS and Android, and became the new default experience, while testing started on Web, too.",
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
    n: "05",
    title: "Groove",
    titleLines: ["GROOVE."],
    subtitle:
      "This project was developed for a start-up based in Trento, focusing on creating a MVP for their investor pitch.",
    when: "Sep - Nov 2024",
    type: "UX / UI Design",
    where: "Groove start-up",
    role: "UX/UI designer",
    team: "Solo designer",
    tags: ["UX / UI DESIGN"],
    hero: PROJECT_HEROES.groove,
    nextSlug: "loomly-ai",
    nextN: "01",
    nextTitle: "01 LOOMLY AI",
    sections: [
      {
        n: "01",
        eyebrow: "the project",
        title: "INTRODUCTION",
        intro: [
          "This project was developed for a <mark>start-up</mark> based in Trento, focusing on creating a MVP for their investor pitch.",
          "The app is designed to streamline the <mark>search and purchase of club event tickets</mark> using geolocation and personalized suggestions.",
          "The project had a tight <mark>one-month</mark> timeline, executed as a side project while balancing my full-time research intern position.",
        ],
        body: [],
        groups: [],
      },
      {
        n: "02",
        eyebrow: "methodology",
        title: "DESIGN PROCESS",
        intro: [
          "A <mark>Double Diamond</mark> methodology was applied.",
          "In the discovery phase, stakeholder interviews, benchmark analysis, and <mark>online ethnography</mark> were conducted, alongside the creation of <mark>personas</mark> and <mark>experience journeys</mark>.",
        ],
        groups: [
          {
            layout: "landscape",
            kind: "single",
            items: [
              { id: "groove-d-3", src: GROOVE.journeys, alt: "Experience journeys", caption: "Experience journeys" },
            ],
          },
        ],
        body: [
          "During the development phase, <mark>Crazy 8 brainstorming</mark> with stakeholders, sketches, low- and <mark>high-fidelity mock-ups</mark> were created. A <mark>quick video animation</mark> was also set-up for a funding contest.",
        ],
        groupsAfterBody: [
          {
            layout: "landscape",
            kind: "single",
            items: [
              { id: "groove-d-4", src: GROOVE.crazy8, alt: "Crazy 8 with stakeholders", caption: "Crazy 8 with stakeholders" },
            ],
          },
        ],
      },
      {
        n: "03",
        eyebrow: "outcome",
        title: "FINAL RESULT",
        intro: [
          "The final design featured three main sections:",
          "<strong>1. <mark>Home:</mark></strong> Includes a search bar, a carousel of personalized suggestion cards, and a map-based exploration tool with filters for event preferences. Event page provides detailed information, ticket availability, links to venue details, and similar upcoming events.",
          "<strong>2. <mark>Tickets:</mark></strong> Displays chronologically listed purchased tickets with essential event details and easy-to-use QR codes for smooth check-in.",
          "<strong>3. <mark>Profile:</mark></strong> Shows the favourite events and venues, besides providing access to the friends list, fostering a small social dimension within the app.",
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
    when: "Jun 2024 - Mar 2025",
    type: "HCI Research",
    where: "German Aerospace Center (DLR)",
    role: "Data Research Assistant",
    team: "Mental modelling group",
    tags: ["HCI RESEARCH"],
    hero: PROJECT_HEROES["teleoperators-workload"],
    nextSlug: "groove",
    nextN: "05",
    nextTitle: "05 GROOVE",
    sections: [
      {
        n: "01",
        eyebrow: "the project",
        title: "INTRODUCTION",
        intro: [
          "This project investigates how <mark>mental workload</mark> affects <mark>remote operators</mark> managing autonomous vehicle fleets. In these systems, operators must continuously monitor and intervene, making workload a critical factor for safety and performance.",
          "The goal was to explore whether <mark>eye-tracking data</mark> can be used to assess and predict workload in real time, enabling more adaptive and intelligent interfaces.",
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
          "The analysis is based on data from a <mark>controlled user study</mark> adopting a <mark>2×2 within-subject design</mark>, where workload was manipulated through task <mark>difficulty</mark> (easy vs. hard) and task presentation <mark>frequency</mark> (slow vs. fast). Participants performed remote fleet management tasks across all experimental conditions.",
          "For each condition, subjective workload was measured using <mark>NASA-TLX</mark>, while <mark>performance metrics</mark> and <mark>eye-tracking data</mark> were continuously recorded.",
          "The interaction took place within a single interface structured into five functional regions—Ticket, Description, Map, Diagnostics, and Actions—which were later used as <mark>Areas of Interest</mark> for the spatial analysis.",
        ],
        groups: [
          {
            label: "User study",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "thesis-u-1", src: THESIS.interface, alt: "Remote assistance UI: map, diagnostics, ticket, and actions", caption: "Main interface" },
              { id: "thesis-u-2", src: THESIS.interfaceAoi, alt: "Same interface with AOI regions highlighted", caption: "AOI overlay" },
              { id: "thesis-u-3", src: THESIS.expSetup, alt: "Eye-tracking rig with monitor and fiducial markers", caption: "Lab setup" },
              { id: "thesis-u-4", src: THESIS.expVp, alt: "Participant with eye-tracking glasses at the workstation", caption: "Participant" },
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
          "After <mark>data cleaning and synchronization</mark>, a <mark>data extraction</mark> of AoI-based features followed to capture different aspects of visual behavior, including fixation dynamics, visit patterns, and spatial entropy measures. These metrics enabled a spatially grounded analysis of how attention is distributed across interface regions.",
          "A <mark>validation phase</mark> was conducted to ensure the robustness of the experimental setup. This included verifying workload manipulation through subjective measures, assessing performance decay under increasing workload, and validating the AoI segmentation using density-based clustering (HDBSCAN).",
          "<mark>Inferential analysis</mark> was then performed to address the research questions. Differences between low and high workload conditions were assessed using paired t-tests, while the effects of difficulty and frequency were analyzed through factorial repeated-measures ANOVA. In addition, L1-regularized logistic regression was used to identify the most informative interface regions for each metric.",
          "For the predictive analysis, a <mark>machine learning pipeline</mark> was developed to evaluate the extent to which workload states can be inferred from AoI metrics. A <mark>feature selection</mark> was performed using correlation filtering and the Boruta algorithm, followed by <mark>model evaluation</mark> through nested cross-validation with participant-level splits. Multiple models were tested, including Support Vector Classifier, Random Forest, Gradient Boosting, XGBoost, and Multilayer Perceptron, combined with different resampling strategies to address class imbalance.",
        ],
        groups: [
          {
            label: "Analysis",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "thesis-a-1", src: THESIS.hdbscan, alt: "HDBSCAN gaze clusters on interface AOIs", caption: "HDBSCAN clusters" },
              { id: "thesis-a-2", src: THESIS.binary, alt: "Stationary entropy and fixation duration, easy vs hard conditions", caption: "Entropy & fixation" },
              { id: "thesis-a-3", src: THESIS.ttff, alt: "Time-to-first fixation on Actions by difficulty and frequency", caption: "Time to first fixation" },
              { id: "thesis-a-4", src: THESIS.visFreq, alt: "Visit frequency on Ticket AOI by difficulty and frequency", caption: "Ticket AOI visits" },
              { id: "thesis-a-5", src: THESIS.confMat, alt: "Confusion matrices for workload classifiers", caption: "Confusion matrices" },
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
          "The results show that <mark>mental workload significantly affects ocular behavior</mark>. Visual attention patterns change systematically under higher workload conditions, with operators allocating less attention to non-critical interface regions and adapting their visual strategies to manage <mark>increasing task complexity</mark>. Task difficulty was found to exert a broader and more consistent influence across metrics, while task frequency primarily affected the temporal dynamics of attention.",
          "From a predictive perspective, <mark>AoI-based metrics proved effective in estimating workload states</mark>. The best-performing models achieved approximately 83% performance in binary workload classification and around 80% for frequency-related states, demonstrating the potential of spatial eye-tracking features as reliable indicators of cognitive load.",
          "Overall, the findings support the use of AoI-based analysis for both explaining and predicting workload, contributing to the development of <mark>intelligent interfaces capable of adapting to users' mental states in real time.</mark>",
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
    when: "May - Jul 2022",
    type: "UX Research & Design",
    where: "UNOX",
    role: "UX Design and Research Intern",
    team: "Product team",
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
          "The project was carried out during my internship period at UNOX, a multinational manufacturing company selling professional intelligent ovens. The goal was to <mark>redesign</mark> the oven configurator, especially from the perspective of the <mark>company marketers</mark>.",
        ],
        body: [],
        groups: [],
      },
      {
        n: "02",
        eyebrow: "method",
        title: "RESEARCH",
        intro: [
          "The process began with a <mark>heuristic assessment</mark> of the current product layout, which is a section of the company website. A <mark>benchmark analysis</mark>, especially in the car industry, was also helpful to have fresh insights.",
          "<mark>Interviews</mark> as well as <mark>think-aloud</mark> sessions allowed the team to learn the needs and the work process of UNOX marketers, but also about final customers.",
          "As learned, <mark>consultation</mark> involves these phases:",
          "<ol><li>find the customer</li><li>understand the needs</li><li>present the best-suiting product</li><li>individual cooking experience (trial)</li><li>sell the oven configuration</li></ol>",
          "The oven configurator makes its appearance in the third step. Moreover, <mark>usability issues</mark> have been detected such as accessibility, process consistency, and language clarity; besides some configuration building constraints.",
          "The process then continued with the <mark>conceptualization</mark> of the new design of the configuration process, followed by <mark>wireframes</mark> and <mark>prototype</mark>.",
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
          "To conclude, a final session of <mark>usability testing</mark> has been vital to ensure practical functionality. These are the main takes:",
          "<ul><li>every participant managed to carry out the tasks</li><li>every participant couldn't understand what the configuration is about</li><li>some users had doubts on whether they added the secondary accessory or not</li><li>in the review phase, secondary buttons stood out more than the CTA</li></ul>",
        ],
      },
      {
        n: "03",
        eyebrow: "outcome",
        title: "FINAL RESULTS",
        intro: [
          "The team wanted to make the building process as smooth and flexible as possible. Indeed, now it's possible to select ovens and accessories one by one, with <mark>serial constraint logic</mark> and complete <mark>process awareness</mark>. Moreover, usability is improved and <mark>new options</mark> are available. In addition, a <mark>product-recommending survey</mark> feature tailored to final customers' needs has been designed.",
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

  issuu: {
    slug: "issuu",
    n: "02",
    title: "Issuu (Product Design)",
    titleLines: ["ISSUU."],
    subtitle:
      "Growth experiments, discoverability redesign, and a data-driven publishing flow overhaul — validated with A/B tests at scale.",
    when: "Mar – May 2026",
    type: "Product Design",
    where: "Bending Spoons",
    role: "Product Designer",
    team: "Solo product designer",
    tags: ["PRODUCT DESIGN"],
    hero: PROJECT_HEROES.issuu,
    nextSlug: "meetup",
    nextN: "03",
    nextTitle: "03 MEETUP",
    sections: [
      {
        n: "01",
        eyebrow: "the project",
        title: "CONTEXT",
        intro: [
          "Issuu is a <mark>digital publishing platform</mark> that lets creators upload PDFs and turn them into <mark>interactive flipbooks</mark>, embedded publications, and shareable content. With a large base of publishers, from indie magazines to brand marketers, the platform sits at the intersection of <mark>content discovery and creator tools</mark>.",
          "I joined as the <mark>solo product designer</mark>, focusing on Growth, thus on initiatives to drive <mark>acquisition, activation, and long-term retention</mark> across the marketing website and the core product.",
        ],
        groups: [],
        body: [],
      },
      {
        n: "02",
        eyebrow: "acquisition",
        title: "HOMEPAGE AND DISCOVERABILITY",
        intro: [
          "The first front was the marketing homepage, tested through a <mark>2×2 A/B experiment</mark>: social proof presence vs. absence, and signup prominence vs. demo/upload flow prominence. The hypothesis was that making the core action more visible would improve <mark>top-of-funnel conversion</mark>, and the data confirmed it. Signup-first treatments drove <mark>higher ARPU and better LTV</mark>; social proof, on the other hand, showed <mark>no statistically significant difference</mark>, so the leaner variant, no social proof, was kept, avoiding the operational overhead of sourcing publisher content.",
          "In parallel, I redesigned the categories and publication-type pages to improve <mark>organic discoverability</mark>. Content clustering was derived from <mark>cluster analysis</mark>, organising reads by type (magazines, brochures, catalogs, etc.) and topic. I also designed an <mark>Airslate-style template</mark> to be dynamically populated at scale, creating <mark>thousands of SEO long-tail pages</mark> targeting specific search intents, a longer-term bet whose results are still being assessed.",
        ],
        groups: [
          {
            label: "Acquisition",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "issuu-home-revamp-12", src: ISSUU.homeRevamp12, alt: "A/B homepage variants 1 and 2 — signup-first vs. social-proof treatment", caption: "Homepage A/B experiment: treatments 1–2. Signup-first layout vs. social-proof variant." },
              { id: "issuu-home-revamp-34", src: ISSUU.homeRevamp34, alt: "A/B homepage variants 3 and 4 — demo-flow and upload-flow treatments", caption: "Homepage A/B experiment: treatments 3–4. Demo-prominent and upload-flow variants." },
              { id: "issuu-categories", src: ISSUU.categories, alt: "Redesigned categories and publication-type discovery pages", caption: "Categories and publication-type pages redesigned for organic discoverability, with content clustering derived from cluster analysis." },
              { id: "issuu-airslate", src: ISSUU.airslate, alt: "Airslate-style dynamic SEO template for long-tail publication pages", caption: "Scalable SEO template for thousands of long-tail discovery pages, dynamically populated by publication type and topic." },
            ],
          },
        ],
        body: [],
      },
      {
        n: "03",
        eyebrow: "activation",
        title: "PUBLISHING FLOW",
        intro: [
          "The most critical initiative, and the one I elevated from a brief redesign task to a <mark>strategic product experiment</mark>. Publishing is the platform's <mark>core activation moment</mark>: no uploads means no content, no content means no readers.",
          "A <mark>behavioral analysis</mark> of the existing flow revealed a sharp mismatch: most metadata options (tags, categories, descriptions, privacy settings) were visible and reachable, yet <mark>barely touched</mark>, and when used at all, they were added on average <mark>7 days after publishing</mark>. This was the insight that reframed the effort.",
          "I proposed a <mark>3-treatment experiment</mark>: a <mark>lean modal flow</mark> surfacing only the two options that matter most, <mark>title and description</mark>, keeping everything else accessible via the full-page editor on demand; a soft redesign of the full editor that respects the existing IA; and a deeper redesign with a revised layout and information architecture. Across all variants, a new <mark>Accessibility feature</mark> was introduced, requiring careful definition of complex interaction states and edge cases.",
        ],
        groups: [
          {
            label: "Activation",
            layout: "landscape",
            kind: "carousel",
            items: [
              { id: "issuu-pubflow-simple", src: ISSUU.pubflowSimple, alt: "Publishing flow — simplified modal variant surfacing only title and description", caption: "Lean modal flow: only the two fields that matter at publish time, with the full editor a tap away." },
              { id: "issuu-pubflow-dock", src: ISSUU.pubflowDock, alt: "Publishing flow — docked panel redesign keeping the editor in context", caption: "Docked-panel variant: soft redesign that preserves the existing information architecture while reducing visual noise." },
              { id: "issuu-pubflow-lean", src: ISSUU.pubflowLean, alt: "Publishing flow — lean full-page redesign with revised layout and IA", caption: "Lean full-page redesign: revised layout and information architecture with the new Accessibility feature integrated." },
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
          "Across these initiatives, the work consistently followed a <mark>data-in, data-out approach</mark>: behavioral analysis informed the design decisions, and <mark>A/B testing validated them at scale</mark>. The homepage experiment produced a clear winner with <mark>measurable monetization gains</mark>. The publishing flow experiment is running, designed to surface not just a better UI but a <mark>leaner activation path</mark>. The SEO play is a <mark>long-term investment</mark>, with discoverability impact expected to compound over time.",
        ],
        groups: [],
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
  "issuu",
];
