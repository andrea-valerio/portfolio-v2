export type PastRole = {
  role: string;
  org: string;
  /** Employer or institute homepage */
  orgUrl: string;
  period: string;
  /** Renders "for {name} @ …" in the same serif line as "@ org" */
  forClient?: string;
  forClientUrl?: string;
};

export const PAST_ROLES: PastRole[] = [
  {
    role: "Product Designer",
    org: "Bending Spoons",
    orgUrl: "https://www.bendingspoons.com",
    period: "2025",
    forClient: "Meetup",
    forClientUrl: "https://www.meetup.com",
  },
  {
    role: "Data Research Assistant",
    org: "German Aerospace Center (DLR)",
    orgUrl: "https://www.dlr.de/en/ts/",
    period: "2024—2025",
  },
  {
    role: "UX/UI Design Intern",
    org: "UNOX",
    orgUrl: "https://www.unox.com",
    period: "2022",
  },
];
