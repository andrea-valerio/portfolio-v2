export type Publication = {
  venue: string;
  y: string;
  t: string;
  authors: string;
  cite: string;
  tldr: string;
  topic: string;
  type: string;
  doi: string;
  link?: string;
};

export const PUBLICATIONS: Publication[] = [
  {
    venue: "AutoUI",
    y: "2026",
    t: "The Role of Task Frequency and Complexity in Remote Assistance for Highly Automated Vehicles: Assessing Mental Load based on Eyetracking and Physiology",
    authors: "Walocha, F., Valerio, A., Nguyen, P., Ihme, K.",
    cite:
      "Walocha, F., Valerio, A., Nguyen, P., Ihme, K. (2026). In Proceedings of the 18th International Conference on Automotive User Interfaces and Interactive Vehicular Applications. [accepted]",
    tldr:
      "How does the frequency and complexity of remote-assistance tasks change a human operator's mental load? Eye-tracking and physiology give a clearer signal than self-report alone.",
    topic: "Mental workload predictions",
    type: "Accepted",
    doi: "—",
  },
  {
    venue: "Der Eisenbahningenieur",
    y: "2026",
    t: "Fahrgastinformationen am Bahnsteig: Ergebnisse einer VR-Studie",
    authors: "Petersen, M., Le, D. H., Valerio, A., Dotzauer, M., Wasić, C.",
    cite:
      "Petersen, M., Le, D. H., Valerio, A., Dotzauer, M., Wasić, C. (2026, April). EI – Der Eisenbahningenieur, 4/26, 22–25.",
    tldr:
      "A VR study of passenger information on train platforms — what travelers actually look at and trust when they're trying to make a decision under time pressure.",
    topic: "VR study",
    type: "Magazine",
    doi: "—",
  },
  {
    venue: "MuC",
    y: "2025",
    t: "Assessment and Prediction of Remote Operators' Mental Workload Through AoI Data in AV Scenarios",
    authors: "Valerio, A., Nguyen, H. P., Ihme, K., Walocha, F.",
    cite:
      "Valerio, A., Nguyen, H. P., Ihme, K., Walocha, F. (2025). In Proceedings of Mensch und Computer 2025 (pp. 482–487).",
    tldr:
      "Can we predict a remote operator's mental workload just from where they're looking? Using areas-of-interest data from automated-vehicle scenarios — yes, with surprising fidelity.",
    topic: "Eye-tracking mental workload correlates",
    type: "Conference Paper",
    doi: "10.1145/3743049.3748583",
    link: "https://doi.org/10.1145/3743049.3748583",
  },
  {
    venue: "HCII",
    y: "2025",
    t: "Understanding Effects and Physiological Correlates of Operator Workload Across Remote Assistance Scenarios for Automated Vehicles - Results from a User Study",
    authors: "Walocha, F., Valerio, A., Nguyen, P., Ihme, K.",
    cite:
      "Walocha, F., Valerio, A., Nguyen, P., Ihme, K. (2025). HCI International 2025 Posters. CCIS, vol 2523. Springer, Cham.",
    tldr:
      "A user study mapping how different remote-assistance scenarios for automated vehicles change operator workload — with the physiological signals that track those shifts.",
    topic: "Physiological mental workload correlates",
    type: "Conference Poster",
    doi: "10.1007/978-3-031-94153-5_10",
    link: "https://doi.org/10.1007/978-3-031-94153-5_10",
  },
];
