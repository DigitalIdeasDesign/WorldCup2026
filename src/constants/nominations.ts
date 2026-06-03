export interface Nomination {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export const NOMINATIONS: Nomination[] = [
  {
    id: "carlo-spreadsheet",
    title: "Don Spreadsheet Carlo",
    subtitle: "The Silent Calculator",
    description: "Cool, composed, and rarely wrong. Calls it “just vibes,” but there’s definitely a hidden spreadsheet doing the heavy lifting.",
    icon: "analytics",
  },
  {
    id: "deschamps-defender",
    title: "The Deschamps Defender",
    subtitle: "The Loyal Traditionalist",
    description: "Picks the same winner every time—because “experience wins tournaments.” Trusts the system, trusts the veterans, questions nothing.",
    icon: "shield",
  },
  {
    id: "scaloni-surprise",
    title: "The Scaloni Surprise",
    subtitle: "The Low-Key Oracle",
    description: "Keeps it casual… then lands eerily accurate predictions. Credits “team chemistry,” but it feels borderline prophetic.",
    icon: "auto_awesome",
  },
  {
    id: "martinez-motivator",
    title: "The Martínez Motivator",
    subtitle: "The Believer-in-Chief",
    description: "Sees a golden generation in every squad. Backs underdogs with conviction—and sticks with them long after reality disagrees.",
    icon: "star",
  },
  {
    id: "pochettino-almost",
    title: "The Pochettino Almost",
    subtitle: "The Nearly Man",
    description: "Builds the perfect prediction… until the final step. Always one result away from looking like a genius.",
    icon: "timer",
  },
  {
    id: "la-fuente-developer",
    title: "The De la Fuente Developer",
    subtitle: "The Quiet Architect",
    description: "No hype, no noise—just disciplined, well-built predictions that quietly prove correct over time.",
    icon: "architecture",
  },
  {
    id: "tuchel-tactician",
    title: "The Tuchel Tactician",
    subtitle: "The Detail Analyst",
    description: "Sees the game in layers. Predicts outcomes through structure, pressing triggers, and scenarios no one else is tracking.",
    icon: "layers",
  },
];
