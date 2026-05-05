import type { StaticImageData } from "next/image";

import profileMid from "@/assets/mypicture/Mid.png";

import grooveHero from "@/assets/projects/groove.png";
import loomlyHero from "@/assets/projects/loomly.png";
import meetupHero from "@/assets/projects/meetup.png";
import ovenconfHero from "@/assets/projects/ovenconf.png";
import thesisHero from "@/assets/projects/thesis.png";

import grooveStakeholder from "@/assets/projects/groove/stakeholder-interview.png";
import groovePersonas from "@/assets/projects/groove/personas.png";
import grooveJourneys from "@/assets/projects/groove/journeys.png";
import grooveCrazy8 from "@/assets/projects/groove/crazy8.png";
import grooveSignUp from "@/assets/projects/groove/results/Sign-up.png";
import grooveHome from "@/assets/projects/groove/results/Home.png";
import grooveRicerca from "@/assets/projects/groove/results/Ricerca.png";
import grooveMappa from "@/assets/projects/groove/results/Mappa.png";
import grooveEvento from "@/assets/projects/groove/results/Evento.png";
import grooveLocale from "@/assets/projects/groove/results/Locale.png";
import grooveBiglietti from "@/assets/projects/groove/results/Biglietti.png";
import grooveBiglietto from "@/assets/projects/groove/results/Biglietto.png";

import loomlyDashboard from "@/assets/projects/loomly/dashboard.png";
import loomlyAiAssistant from "@/assets/projects/loomly/ai_assistant.png";
import loomlyInteractions from "@/assets/projects/loomly/interactions.png";
import loomlyListeningIdeas from "@/assets/projects/loomly/listening_ideas.png";
import loomlyPaywalls from "@/assets/projects/loomly/paywalls.png";
import loomlyMarketing from "@/assets/projects/loomly/marketing.png";
import loomlyTubeCampaign from "@/assets/projects/loomly/tube_campaign.png";

import meetupComparisonWeb from "@/assets/projects/meetup/redesign/comparison-web.png";
import meetupComparisonMobile from "@/assets/projects/meetup/redesign/comparison-mobile.png";
import meetupGroupCreation from "@/assets/projects/meetup/redesign/group-creation.png";
import meetupAttendance from "@/assets/projects/meetup/redesign/attendance.png";
import meetupOrganizer from "@/assets/projects/meetup/redesign/organizer.png";
import meetupOthers from "@/assets/projects/meetup/redesign/others.png";
import meetupSms from "@/assets/projects/meetup/growth/sms.png";
import meetupPaywalls from "@/assets/projects/meetup/growth/paywalls.png";

import ovenAccessFlow from "@/assets/projects/ovenconf/access-flow.png";
import ovenConfigFlow from "@/assets/projects/ovenconf/configuration-flow.png";
import ovenHome from "@/assets/projects/ovenconf/results/home.png";
import ovenOvens from "@/assets/projects/ovenconf/results/ovens.png";
import ovenSecondOven from "@/assets/projects/ovenconf/results/second-oven.png";
import ovenPlacement from "@/assets/projects/ovenconf/results/placement.png";
import ovenAccessory from "@/assets/projects/ovenconf/results/accessory.png";
import ovenReview from "@/assets/projects/ovenconf/results/review.png";

import thesisInterface from "@/assets/projects/thesis/interface.png";
import thesisInterfaceAoi from "@/assets/projects/thesis/interface_aoi.png";
import thesisExpSetup from "@/assets/projects/thesis/exp_setup.png";
import thesisExpVp from "@/assets/projects/thesis/exp_vp.png";
import thesisHdbscan from "@/assets/projects/thesis/hdbscan.png";
import thesisBinary from "@/assets/projects/thesis/binary_graphs.png";
import thesisTtff from "@/assets/projects/thesis/ttff_graph.png";
import thesisVisFreq from "@/assets/projects/thesis/vis_freq_graph.png";
import thesisConfMat from "@/assets/projects/thesis/conf_mat.png";

export const PROFILE_PHOTO: StaticImageData = profileMid;

export const PROJECT_HEROES = {
  "loomly-ai": loomlyHero,
  meetup: meetupHero,
  groove: grooveHero,
  "teleoperators-workload": thesisHero,
  "oven-configurator": ovenconfHero,
} as const;

export const LOOMLY = {
  dashboard: loomlyDashboard,
  aiAssistant: loomlyAiAssistant,
  interactions: loomlyInteractions,
  listeningIdeas: loomlyListeningIdeas,
  paywalls: loomlyPaywalls,
  marketing: loomlyMarketing,
  tubeCampaign: loomlyTubeCampaign,
} as const;

export const MEETUP = {
  comparisonWeb: meetupComparisonWeb,
  comparisonMobile: meetupComparisonMobile,
  groupCreation: meetupGroupCreation,
  attendance: meetupAttendance,
  organizer: meetupOrganizer,
  others: meetupOthers,
  sms: meetupSms,
  paywalls: meetupPaywalls,
} as const;

export const GROOVE = {
  stakeholder: grooveStakeholder,
  personas: groovePersonas,
  journeys: grooveJourneys,
  crazy8: grooveCrazy8,
  signUp: grooveSignUp,
  home: grooveHome,
  ricerca: grooveRicerca,
  mappa: grooveMappa,
  evento: grooveEvento,
  locale: grooveLocale,
  biglietti: grooveBiglietti,
  biglietto: grooveBiglietto,
} as const;

export const OVEN = {
  accessFlow: ovenAccessFlow,
  configFlow: ovenConfigFlow,
  home: ovenHome,
  ovens: ovenOvens,
  secondOven: ovenSecondOven,
  placement: ovenPlacement,
  accessory: ovenAccessory,
  review: ovenReview,
} as const;

export const THESIS = {
  interface: thesisInterface,
  interfaceAoi: thesisInterfaceAoi,
  expSetup: thesisExpSetup,
  expVp: thesisExpVp,
  hdbscan: thesisHdbscan,
  binary: thesisBinary,
  ttff: thesisTtff,
  visFreq: thesisVisFreq,
  confMat: thesisConfMat,
} as const;
