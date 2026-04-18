export interface Nomination {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const NOMINATIONS: Nomination[] = [
  {
    id: "peptical",
    title: "Pep-tical Genius",
    description: "Believes every problem in life can be solved with \"one more pass.\" Has diagrams for dinner conversations and rotates their friend group weekly.",
    icon: "psychology",
  },
  {
    id: "special-one",
    title: "The Special One… Commenter",
    description: "Declares themselves right before the match even starts. If their prediction fails, it’s because of \"respect, respect, respect\" and external conspiracies.",
    icon: "record_voice_over",
  },
  {
    id: "klopp",
    title: "Klopp-top Optimist",
    description: "Celebrates every goal like it’s a World Cup final—even in predictions. Fully convinced passion alone adds +20% accuracy to their picks.",
    icon: "mood",
  },
  {
    id: "carlo",
    title: "Don Spreadsheet Carlo",
    description: "Cool, calm, and somehow always right. Claims their predictions are \"just vibes,\" but secretly runs advanced analytics behind the scenes.",
    icon: "analytics",
  },
  {
    id: "arteta",
    title: "The Tactical Tinkerer",
    description: "Changes their predicted winner three times before kickoff. Uses phrases like \"positional play\" and \"structure\" to justify last-minute switches.",
    icon: "precision_manufacturing",
  },
];
