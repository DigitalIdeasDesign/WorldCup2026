import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import ScoutingHub from "./ScoutingHub";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  query,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import confetti from "canvas-confetti";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  Trophy,
  LogOut,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Star,
  Target,
  Shield,
  ArrowRight,
  Info,
  Users,
  Globe,
  Loader2,
  User as UserIcon,
  Settings,
  Share2,
  Calendar,
  MapPin,
  X,
  TrendingUp,
  TrendingDown,
  Activity,
  RotateCcw,
  BarChart3,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { db, handleFirestoreError, OperationType } from "../../firebase";
import { NOMINATIONS } from "../../constants/nominations";
import {
  GROUP_INSIGHTS,
  MARKET_ODDS,
  TOURNAMENT_FAVORITES,
} from "../../constants/scoutIntelligence";

const KNOCKOUT_ROUNDS = [
  {
    title: "Round of 32",
    matches: (teams: any, bracket: any) => {
      const orderedWildcards = assignWildcards(teams.wildcards);
      return [
        {
          id: "m1",
          nextId: "r16-m1",
          teamA: teams.runnersUp[0] || "TBD",
          teamB: teams.runnersUp[1] || "TBD",
        },
        {
          id: "m2",
          nextId: "r16-m2",
          teamA: teams.winners[2] || "TBD",
          teamB: teams.runnersUp[5] || "TBD",
        },
        {
          id: "m3",
          nextId: "r16-m3",
          teamA: teams.winners[4] || "TBD",
          teamB: orderedWildcards[0] || "TBD",
        },
        {
          id: "m4",
          nextId: "r16-m4",
          teamA: teams.winners[5] || "TBD",
          teamB: teams.runnersUp[2] || "TBD",
        },
        {
          id: "m5",
          nextId: "r16-m5",
          teamA: teams.runnersUp[4] || "TBD",
          teamB: teams.runnersUp[8] || "TBD",
        },
        {
          id: "m6",
          nextId: "r16-m6",
          teamA: teams.winners[8] || "TBD",
          teamB: orderedWildcards[1] || "TBD",
        },
        {
          id: "m7",
          nextId: "r16-m7",
          teamA: teams.winners[0] || "TBD",
          teamB: orderedWildcards[2] || "TBD",
        },
        {
          id: "m8",
          nextId: "r16-m8",
          teamA: teams.winners[11] || "TBD",
          teamB: orderedWildcards[3] || "TBD",
        },
        {
          id: "m9",
          nextId: "r16-m9",
          teamA: teams.winners[6] || "TBD",
          teamB: orderedWildcards[4] || "TBD",
        },
        {
          id: "m10",
          nextId: "r16-m10",
          teamA: teams.winners[3] || "TBD",
          teamB: orderedWildcards[5] || "TBD",
        },
        {
          id: "m11",
          nextId: "r16-m11",
          teamA: teams.winners[7] || "TBD",
          teamB: teams.runnersUp[9] || "TBD",
        },
        {
          id: "m12",
          nextId: "r16-m12",
          teamA: teams.runnersUp[10] || "TBD",
          teamB: teams.runnersUp[11] || "TBD",
        },
        {
          id: "m13",
          nextId: "r16-m13",
          teamA: teams.winners[1] || "TBD",
          teamB: orderedWildcards[6] || "TBD",
        },
        {
          id: "m14",
          nextId: "r16-m14",
          teamA: teams.runnersUp[3] || "TBD",
          teamB: teams.runnersUp[6] || "TBD",
        },
        {
          id: "m15",
          nextId: "r16-m15",
          teamA: teams.winners[9] || "TBD",
          teamB: teams.runnersUp[7] || "TBD",
        },
        {
          id: "m16",
          nextId: "r16-m16",
          teamA: teams.winners[10] || "TBD",
          teamB: orderedWildcards[7] || "TBD",
        },
      ];
    },
  },
  {
    title: "Round of 16",
    matches: (teams: any, bracket: any) => [
      {
        id: "r16-1",
        nextId: "qf-1",
        teamA: bracket["r16-m3"] || "TBD",
        teamB: bracket["r16-m6"] || "TBD",
      },
      {
        id: "r16-2",
        nextId: "qf-2",
        teamA: bracket["r16-m1"] || "TBD",
        teamB: bracket["r16-m4"] || "TBD",
      },
      {
        id: "r16-3",
        nextId: "qf-5",
        teamA: bracket["r16-m2"] || "TBD",
        teamB: bracket["r16-m5"] || "TBD",
      },
      {
        id: "r16-4",
        nextId: "qf-6",
        teamA: bracket["r16-m7"] || "TBD",
        teamB: bracket["r16-m8"] || "TBD",
      },
      {
        id: "r16-5",
        nextId: "qf-3",
        teamA: bracket["r16-m12"] || "TBD",
        teamB: bracket["r16-m11"] || "TBD",
      },
      {
        id: "r16-6",
        nextId: "qf-4",
        teamA: bracket["r16-m10"] || "TBD",
        teamB: bracket["r16-m9"] || "TBD",
      },
      {
        id: "r16-7",
        nextId: "qf-7",
        teamA: bracket["r16-m15"] || "TBD",
        teamB: bracket["r16-m14"] || "TBD",
      },
      {
        id: "r16-8",
        nextId: "qf-8",
        teamA: bracket["r16-m13"] || "TBD",
        teamB: bracket["r16-m16"] || "TBD",
      },
    ],
  },
  {
    title: "Quarter-finals",
    matches: (teams: any, bracket: any) => [
      {
        id: "qf-1",
        nextId: "sf-1",
        teamA: bracket["qf-1"] || "TBD",
        teamB: bracket["qf-2"] || "TBD",
      },
      {
        id: "qf-2",
        nextId: "sf-2",
        teamA: bracket["qf-3"] || "TBD",
        teamB: bracket["qf-4"] || "TBD",
      },
      {
        id: "qf-3",
        nextId: "sf-3",
        teamA: bracket["qf-5"] || "TBD",
        teamB: bracket["qf-6"] || "TBD",
      },
      {
        id: "qf-4",
        nextId: "sf-4",
        teamA: bracket["qf-7"] || "TBD",
        teamB: bracket["qf-8"] || "TBD",
      },
    ],
  },
  {
    title: "Semi-finals",
    matches: (teams: any, bracket: any) => [
      {
        id: "sf-1",
        nextId: "final-1",
        teamA: bracket["sf-1"] || "TBD",
        teamB: bracket["sf-2"] || "TBD",
      },
      {
        id: "sf-2",
        nextId: "final-2",
        teamA: bracket["sf-3"] || "TBD",
        teamB: bracket["sf-4"] || "TBD",
      },
    ],
  },
  {
    title: "The Final",
    matches: (teams: any, bracket: any) => [
      {
        id: "final",
        nextId: "champion",
        teamA: bracket["final-1"] || "TBD",
        teamB: bracket["final-2"] || "TBD",
      },
    ],
  },
];

// --- DATA ---
const GROUPS = [
  {
    id: "A",
    teams: ["Mexico", "South Africa", "South Korea", "Czech Republic"],
  },
  { id: "B", teams: ["Canada", "Bosnia-Herzegovina", "Qatar", "Switzerland"] },
  { id: "C", teams: ["Brazil", "Morocco", "Haiti", "Scotland"] },
  { id: "D", teams: ["United States", "Paraguay", "Australia", "Turkey"] },
  { id: "E", teams: ["Germany", "Curaçao", "Ivory Coast", "Ecuador"] },
  { id: "F", teams: ["Netherlands", "Japan", "Tunisia", "Sweden"] },
  { id: "G", teams: ["Belgium", "Egypt", "Iran", "New Zealand"] },
  { id: "H", teams: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"] },
  { id: "I", teams: ["France", "Senegal", "Iraq", "Norway"] },
  { id: "J", teams: ["Argentina", "Algeria", "Austria", "Jordan"] },
  { id: "K", teams: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"] },
  { id: "L", teams: ["England", "Croatia", "Ghana", "Panama"] },
];

export const TEAM_INFO: Record<string, any> = {
  Mexico: {
    code: "mx",
    form: "W-D-W",
    watch: "Santi Giménez",
    stat: "Hosts 1970/86",
    ranking: 16,
    scoringPower: 77,
    theWall: 79,
    control: 83,
    description:
      "Passionate and technical. They always have incredible support and play a short-passing game.",
  },
  "South Africa": {
    code: "za",
    form: "D-W-L",
    watch: "Percy Tau",
    stat: "AFCON Semis",
    ranking: 60,
    scoringPower: 68,
    theWall: 72,
    control: 65,
    description:
      "A resilient team back on the big stage for the first time since hosting in 2010.",
  },
  "South Korea": {
    code: "kr",
    form: "W-W-W",
    watch: "Son Heung-min",
    stat: "11th Appearance",
    ranking: 25,
    scoringPower: 82,
    theWall: 78,
    control: 80,
    description:
      "Asia’s most reliable qualifiers, known for their incredible work rate and speed.",
  },
  "Czech Republic": {
    code: "cz",
    form: "W-D-L",
    watch: "Patrik Schick",
    stat: "Euro Quarter-finalists",
    ranking: 41,
    scoringPower: 75,
    theWall: 77,
    control: 74,
    description:
      "A disciplined European side with a history of upsetting bigger teams.",
  },
  Canada: {
    code: "ca",
    form: "W-L-W",
    watch: "Alphonso Davies",
    stat: "Co-hosts",
    ranking: 30,
    scoringPower: 80,
    theWall: 75,
    control: 78,
    description:
      "Exciting co-hosts with world-class pace on the wings. They play with no fear.",
  },
  "Bosnia-Herzegovina": {
    code: "ba",
    form: "L-D-W",
    watch: "Edin Džeko",
    stat: "Second WC Appearance",
    ranking: 65,
    scoringPower: 70,
    theWall: 68,
    control: 71,
    description:
      "A physical and technical team returning to the global stage after a long wait.",
  },
  Qatar: {
    code: "qa",
    form: "W-W-D",
    watch: "Akram Afif",
    stat: "Asian Champs",
    ranking: 55,
    scoringPower: 72,
    theWall: 65,
    control: 74,
    description:
      "The current Asian champions, looking to prove they belong among the world elite.",
  },
  Switzerland: {
    code: "ch",
    form: "D-D-W",
    watch: "Granit Xhaka",
    stat: "R16 Regulars",
    ranking: 17,
    scoringPower: 74,
    theWall: 88,
    control: 85,
    description:
      'The "Giant Killers". Extremely organized, smart, and very hard to break down.',
  },
  Brazil: {
    code: "br",
    form: "W-W-W",
    watch: "Vinicius Jr",
    stat: "5-time Champs",
    ranking: 5,
    scoringPower: 93,
    theWall: 82,
    control: 89,
    description:
      'The spiritual home of football. Expect flair, dribbling, and "Joga Bonito".',
  },
  Morocco: {
    code: "ma",
    form: "W-D-W",
    watch: "Achraf Hakimi",
    stat: "2022 Semis",
    ranking: 13,
    scoringPower: 75,
    theWall: 91,
    control: 79,
    description:
      "The pride of Africa. A perfectly organized defensive unit with fast attackers.",
  },
  Haiti: {
    code: "ht",
    form: "L-L-W",
    watch: "Duckens Nazon",
    stat: "Gold Cup Dark Horse",
    ranking: 83,
    scoringPower: 62,
    theWall: 58,
    control: 60,
    description:
      "A passionate Caribbean side making a historic return to the finals.",
  },
  Scotland: {
    code: "gb-sct",
    form: "D-L-L",
    watch: "John McGinn",
    stat: "First WC since 98",
    ranking: 43,
    scoringPower: 71,
    theWall: 76,
    control: 73,
    description:
      "Tough, hard-working, and backed by a legendary fan base. They never stop running.",
  },
  "United States": {
    code: "us",
    form: "W-W-L",
    watch: "Christian Pulisic",
    stat: "Main Hosts",
    ranking: 15,
    scoringPower: 79,
    theWall: 82,
    control: 81,
    description:
      "The hosts. A young, athletic team with a point to prove on home soil.",
  },
  Paraguay: {
    code: "py",
    form: "D-W-D",
    watch: "Miguel Almirón",
    stat: "Defensive Wall",
    ranking: 40,
    scoringPower: 69,
    theWall: 84,
    control: 70,
    description:
      "Famous for their defensive grit and ability to frustrate the world’s best.",
  },
  Australia: {
    code: "au",
    form: "W-W-W",
    watch: "Nestory Irankunda",
    stat: "6th Straight WC",
    ranking: 27,
    scoringPower: 76,
    theWall: 78,
    control: 75,
    description:
      'The "Socceroos" are known for their fighting spirit and physical intensity.',
  },
  Turkey: {
    code: "tr",
    form: "W-D-L",
    watch: "Arda Güler",
    stat: "Euro 2024 Surprise",
    ranking: 22,
    scoringPower: 83,
    theWall: 74,
    control: 81,
    description:
      "A team full of young stars playing with incredible energy and technical skill.",
  },
  Germany: {
    code: "de",
    form: "W-W-D",
    watch: "Jamal Musiala",
    stat: "4-time Champs",
    ranking: 12,
    scoringPower: 89,
    theWall: 81,
    control: 91,
    description:
      "A mix of legendary efficiency and new flair. They want to dominate every game.",
  },
  Curaçao: {
    code: "cw",
    form: "W-L-D",
    watch: "Juninho Bacuna",
    stat: "Debut Season",
    ranking: 82,
    scoringPower: 64,
    theWall: 60,
    control: 66,
    description:
      "The tournament’s biggest surprise, making their first-ever appearance.",
  },
  "Ivory Coast": {
    code: "ci",
    form: "W-W-W",
    watch: "Simon Adingra",
    stat: "AFCON Winners",
    ranking: 34,
    scoringPower: 81,
    theWall: 79,
    control: 77,
    description:
      "The African champions. Powerful, fast, and full of top-level experience.",
  },
  Ecuador: {
    code: "ec",
    form: "W-D-W",
    watch: "Moisés Caicedo",
    stat: "High Altitude Edge",
    ranking: 23,
    scoringPower: 78,
    theWall: 85,
    control: 79,
    description:
      "A young, fearless team that plays with incredible pace and defensive strength.",
  },
  Netherlands: {
    code: "nl",
    form: "W-W-W",
    watch: "Xavi Simons",
    stat: "3-time Finalists",
    ranking: 8,
    scoringPower: 82,
    theWall: 89,
    control: 86,
    description:
      "Total Football. They play a smart, tactical game with a focus on teamwork.",
  },
  Japan: {
    code: "jp",
    form: "W-W-W",
    watch: "Takefusa Kubo",
    stat: "Asian Powerhouse",
    ranking: 18,
    scoringPower: 81,
    theWall: 80,
    control: 84,
    description:
      'The "Blue Samurai". Fast, technical, and incredibly disciplined.',
  },
  Tunisia: {
    code: "tn",
    form: "D-W-L",
    watch: "Elias Achouri",
    stat: "Tactical Discipline",
    ranking: 44,
    scoringPower: 67,
    theWall: 82,
    control: 71,
    description:
      "A disciplined North African side that is very difficult to break down.",
  },
  Sweden: {
    code: "se",
    form: "W-L-W",
    watch: "Alexander Isak",
    stat: "Returning Power",
    ranking: 38,
    scoringPower: 80,
    theWall: 77,
    control: 79,
    description: "A balanced Nordic team with world-class attacking talent.",
  },
  Belgium: {
    code: "be",
    form: "W-D-W",
    watch: "Jérémy Doku",
    stat: "Golden Gen 2.0",
    ranking: 6,
    scoringPower: 84,
    theWall: 80,
    control: 85,
    description:
      "A team in transition with exciting young talent mixed with veteran experience.",
  },
  Egypt: {
    code: "eg",
    form: "W-W-L",
    watch: "Mohamed Salah",
    stat: "Pharaohs Return",
    ranking: 29,
    scoringPower: 79,
    theWall: 74,
    control: 76,
    description:
      "Led by the legendary Salah, they are a threat to any team on the counter.",
  },
  Iran: {
    code: "ir",
    form: "W-W-D",
    watch: "Mehdi Taremi",
    stat: "Top Asian Seed",
    ranking: 19,
    scoringPower: 73,
    theWall: 85,
    control: 72,
    description:
      "The best in Asia. A tough, physical team that is very hard to score against.",
  },
  "New Zealand": {
    code: "nz",
    form: "L-D-W",
    watch: "Chris Wood",
    stat: "OFC Dominance",
    ranking: 85,
    scoringPower: 60,
    theWall: 65,
    control: 58,
    description:
      "The pride of Oceania, known for their physical strength and aerial threat.",
  },
  Spain: {
    code: "es",
    form: "W-W-W",
    watch: "Lamine Yamal",
    stat: "Euro 2024 Champs",
    ranking: 3,
    scoringPower: 88,
    theWall: 84,
    control: 98,
    description:
      "The masters of the pass. They will keep the ball all day and wait for you to get tired.",
  },
  "Cape Verde": {
    code: "cv",
    form: "W-D-L",
    watch: "Bebé",
    stat: "Giant Killers",
    ranking: 69,
    scoringPower: 66,
    theWall: 70,
    control: 68,
    description:
      'A tiny island nation that has become the ultimate "giant killer" in Africa.',
  },
  "Saudi Arabia": {
    code: "sa",
    form: "W-L-W",
    watch: "Salem Al-Dawsari",
    stat: "2022 Argentina Win",
    ranking: 61,
    scoringPower: 70,
    theWall: 66,
    control: 73,
    description:
      "A technical side that proved in 2022 they can beat the very best in the world.",
  },
  Uruguay: {
    code: "uy",
    form: "W-W-W",
    watch: "Darwin Núñez",
    stat: "Bielsa Ball",
    ranking: 14,
    scoringPower: 87,
    theWall: 84,
    control: 80,
    description:
      'Pure passion and "Garra Charrúa". They run more than any other team.',
  },
  France: {
    code: "fr",
    form: "W-W-W",
    watch: "Kylian Mbappé",
    stat: "2018 Champs",
    ranking: 2,
    scoringPower: 95,
    theWall: 85,
    control: 82,
    description:
      "A collection of world-class athletes who can destroy any team on the counter.",
  },
  Senegal: {
    code: "sn",
    form: "W-D-W",
    watch: "Nicolas Jackson",
    stat: "Lions of Teranga",
    ranking: 20,
    scoringPower: 80,
    theWall: 83,
    control: 78,
    description:
      'The "Lions of Teranga". Physical, fast, and full of top-level experience.',
  },
  Iraq: {
    code: "iq",
    form: "W-L-D",
    watch: "Aymen Hussein",
    stat: "Gulf Cup Champs",
    ranking: 57,
    scoringPower: 69,
    theWall: 71,
    control: 67,
    description:
      "A rising power in the Middle East, back on the world stage after 40 years.",
  },
  Norway: {
    code: "no",
    form: "W-W-L",
    watch: "Erling Haaland",
    stat: "Haaland Factor",
    ranking: 31,
    scoringPower: 85,
    theWall: 72,
    control: 74,
    description:
      "With the world’s best striker, they can score against anyone at any time.",
  },
  Argentina: {
    code: "ar",
    form: "W-W-W",
    watch: "Lionel Messi",
    stat: "Defending Champs",
    ranking: 1,
    scoringPower: 92,
    theWall: 88,
    control: 90,
    description:
      "The defending world champions who play with a mix of grit and pure magic.",
  },
  Algeria: {
    code: "dz",
    form: "W-W-D",
    watch: "Riyad Mahrez",
    stat: "Desert Foxes",
    ranking: 28,
    scoringPower: 78,
    theWall: 80,
    control: 82,
    description:
      'Technical and creative, the "Desert Foxes" are one of Africa’s most talented sides.',
  },
  Austria: {
    code: "at",
    form: "W-D-W",
    watch: "Marcel Sabitzer",
    stat: "High Press",
    ranking: 24,
    scoringPower: 77,
    theWall: 81,
    control: 79,
    description:
      "A high-intensity team that never stops pressing the opponent.",
  },
  Jordan: {
    code: "jo",
    form: "W-L-W",
    watch: "Mousa Al-Tamari",
    stat: "Asian Cup Finalists",
    ranking: 63,
    scoringPower: 65,
    theWall: 68,
    control: 64,
    description:
      "Making their historic World Cup debut after a fairy-tale run in Asia.",
  },
  Portugal: {
    code: "pt",
    form: "W-W-W",
    watch: "Rafael Leão",
    stat: "Euro 2016 Champs",
    ranking: 7,
    scoringPower: 91,
    theWall: 87,
    control: 88,
    description:
      "Stacked with talent in every position. They are no longer just a one-man team.",
  },
  "DR Congo": {
    code: "cd",
    form: "W-D-L",
    watch: "Yoane Wissa",
    stat: "AFCON 4th Place",
    ranking: 46,
    scoringPower: 72,
    theWall: 70,
    control: 69,
    description:
      "A powerful and athletic team returning to the finals after five decades.",
  },
  Uzbekistan: {
    code: "uz",
    form: "W-D-W",
    watch: "Abbosbek Fayzullaev",
    stat: "Rising Force",
    ranking: 50,
    scoringPower: 71,
    theWall: 73,
    control: 75,
    description: "A technical and disciplined debutant from Central Asia.",
  },
  Colombia: {
    code: "co",
    form: "W-W-W",
    watch: "Luis Díaz",
    stat: "Copa Finalists",
    ranking: 10,
    scoringPower: 85,
    theWall: 83,
    control: 81,
    description:
      "High energy, physical, and full of flair. They play with a lot of heart.",
  },
  England: {
    code: "gb-eng",
    form: "W-W-W",
    watch: "Jude Bellingham",
    stat: "Football's Home?",
    ranking: 4,
    scoringPower: 90,
    theWall: 86,
    control: 87,
    description:
      'A deep squad full of stars looking to finally "bring it home".',
  },
  Croatia: {
    code: "hr",
    form: "D-W-D",
    watch: "Luka Modrić",
    stat: "2018 Finalists",
    ranking: 11,
    scoringPower: 76,
    theWall: 86,
    control: 92,
    description:
      "The ultimate tournament team. They never know when they are beaten.",
  },
  Ghana: {
    code: "gh",
    form: "L-W-D",
    watch: "Mohammed Kudus",
    stat: "Black Stars",
    ranking: 74,
    scoringPower: 74,
    theWall: 68,
    control: 70,
    description:
      'The "Black Stars" are famous for their speed and individual brilliance.',
  },
  Panama: {
    code: "pa",
    form: "W-L-W",
    watch: "Adalberto Carrasquilla",
    stat: "CONCACAF Elite",
    ranking: 33,
    scoringPower: 70,
    theWall: 75,
    control: 72,
    description:
      "A disciplined and physical side that has become a major force in their region.",
  },
  TBD: {
    code: "un",
    form: "N/A",
    watch: "N/A",
    stat: "N/A",
    ranking: 999,
    scoringPower: 0,
    theWall: 0,
    control: 0,
    description: "To be determined.",
  },
};

export const GROUP_STATS = GROUPS.map((g) => {
  const avgRank =
    g.teams.reduce((acc, t) => acc + (TEAM_INFO[t]?.ranking || 100), 0) /
    g.teams.length;
  return { id: g.id, avgRank };
});

const minAvgRank = Math.min(...GROUP_STATS.map((g) => g.avgRank));
const maxAvgRank = Math.max(...GROUP_STATS.map((g) => g.avgRank));

export const GROUP_OF_DEATH = GROUP_STATS.find(
  (g) => g.avgRank === minAvgRank,
)?.id;
export const EASIEST_PATH = GROUP_STATS.find(
  (g) => g.avgRank === maxAvgRank,
)?.id;

const WILDCARD_SLOTS = [
  ["A", "B", "C", "D", "F"], // vs E
  ["C", "D", "F", "G", "H"], // vs I
  ["C", "E", "F", "H", "I"], // vs A
  ["E", "H", "I", "J", "K"], // vs L
  ["A", "E", "H", "I", "J"], // vs G
  ["B", "E", "F", "I", "J"], // vs D
  ["E", "F", "G", "I", "J"], // vs B
  ["D", "E", "I", "J", "L"], // vs K
];

const getTeamGroup = (team: string) => {
  const group = GROUPS.find((g) => g.teams.includes(team));
  return group ? group.id : null;
};

const assignWildcards = (wildcards: string[]) => {
  if (!wildcards || wildcards.length !== 8) return wildcards || [];

  const wildcardGroups = wildcards.map((team) => ({
    team,
    group: getTeamGroup(team),
  }));
  let bestAssignment: string[] | null = null;

  const backtrack = (
    slotIndex: number,
    currentAssignment: string[],
    usedIndices: Set<number>,
  ) => {
    if (bestAssignment) return;
    if (slotIndex === 8) {
      bestAssignment = [...currentAssignment];
      return;
    }

    const allowedGroups = WILDCARD_SLOTS[slotIndex];
    for (let i = 0; i < 8; i++) {
      if (!usedIndices.has(i)) {
        const wc = wildcardGroups[i];
        if (wc.group && allowedGroups.includes(wc.group)) {
          usedIndices.add(i);
          currentAssignment.push(wc.team);
          backtrack(slotIndex + 1, currentAssignment, usedIndices);
          currentAssignment.pop();
          usedIndices.delete(i);
        }
      }
    }
  };

  backtrack(0, [], new Set());

  if (!bestAssignment) {
    console.warn(
      "Could not find a perfect wildcard assignment based on FIFA rules. Falling back to sequential.",
    );
    return wildcards;
  }

  return bestAssignment;
};

const PLAYERS = {
  goldenBall: [
    {
      name: "Lamine Yamal",
      nation: "Spain",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776109512/Players/Lamine-Yamal-Spain-photo_ekre6p.png",
    },
    {
      name: "Kylian Mbappé",
      nation: "France",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Kylian-Mbapp%C3%A9-France-photo_zhekvx.png",
    },
    {
      name: "Harry Kane",
      nation: "England",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Harry-Kane-England-photo_gc0rpe.png",
    },
    {
      name: "Jude Bellingham",
      nation: "England",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776440063/Players/jude-bellingham-england_bykesj.png",
    },
    {
      name: "Vinicius Junior",
      nation: "Brazil",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776440062/Players/vinicius_junior_brazil_nvekrc.png",
    },
    {
      name: "Ousmane Dembélé",
      nation: "France",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Ousmane-Demb%C3%A9l%C3%A9-photo_ednlaw.png",
    },
    {
      name: "Cristiano Ronaldo",
      nation: "Portugal",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776440061/Players/cristiano_ronaldo_portugal_wkzor2.jpg",
    },
    {
      name: "Vitinha",
      nation: "Portugal",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776440063/Players/vitinha-portugal_tvjiqz.png",
    },
    {
      name: "Erling Haaland",
      nation: "Norway",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776440064/Players/erling_haaland_-_norway_ddun7b.jpg",
    },
    {
      name: "Raphinha",
      nation: "Brazil",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776440061/Players/raphinha_brazil_ebrx8l.jpg",
    },
    {
      name: "Luis Díaz",
      nation: "Colombia",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776109512/Players/Luis-D%C3%ADaz-Bayern-colombia-photo_qoxpjh.png",
    },
    {
      name: "Mohamed Salah",
      nation: "Egypt",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776440062/Players/Mohamed_Salah_-_egypt_vw4shw.jpg",
    },
    { name: "Lionel Messi", nation: "Argentina" },
  ],
  goldenBoot: [
    {
      name: "Kylian Mbappé",
      nation: "France",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Kylian-Mbapp%C3%A9-France-photo_zhekvx.png",
    },
    {
      name: "Harry Kane",
      nation: "England",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Harry-Kane-England-photo_gc0rpe.png",
    },
    {
      name: "Erling Haaland",
      nation: "Norway",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776440064/Players/erling_haaland_-_norway_ddun7b.jpg",
    },
    {
      name: "Cristiano Ronaldo",
      nation: "Portugal",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776440061/Players/cristiano_ronaldo_portugal_wkzor2.jpg",
    },
    {
      name: "Lamine Yamal",
      nation: "Spain",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776109512/Players/Lamine-Yamal-Spain-photo_ekre6p.png",
    },
    {
      name: "Luis Díaz",
      nation: "Colombia",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776109512/Players/Luis-D%C3%ADaz-Bayern-colombia-photo_qoxpjh.png",
    },
    {
      name: "Raphinha",
      nation: "Brazil",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776440061/Players/raphinha_brazil_ebrx8l.jpg",
    },
    {
      name: "Ousmane Dembélé",
      nation: "France",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Ousmane-Demb%C3%A9l%C3%A9-photo_ednlaw.png",
    },
    {
      name: "Mohamed Salah",
      nation: "Egypt",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/v1776440062/Players/Mohamed_Salah_-_egypt_vw4shw.jpg",
    },
    { name: "Lionel Messi", nation: "Argentina" },
  ],
  goldenGlove: [
    {
      name: "David Raya",
      nation: "Spain",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358245/Goalkeepers/David_Raya_-_Spain_ybp6zu.jpg",
    },
    {
      name: "Gianluigi Donnarumma",
      nation: "Italy",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358246/Goalkeepers/Gianluigi_Donnarumma_-_italy_eyjen0.webp",
    },
    {
      name: "Thibaut Courtois",
      nation: "Belgium",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358247/Goalkeepers/Thibaut_Courtois_-_Belgium_doe3n3.jpg",
    },
    { name: "Yann Sommer", nation: "Switzerland" },
    {
      name: "Alisson Becker",
      nation: "Brazil",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358245/Goalkeepers/Alisson_Becker_-_Brazil_jqwf6n.png",
    },
    {
      name: "Emiliano Martínez",
      nation: "Argentina",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358246/Goalkeepers/Emiliano_Marti%CC%81nez_-_Argentina_nznxdz.jpg",
    },
    {
      name: "Robert Sánchez",
      nation: "Spain",
      image:
        "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358246/Goalkeepers/Roberto_Sanchez_-_Spain_gsznit.jpg",
    },
    { name: "Joan García", nation: "Spain" },
    { name: "Mike Maignan", nation: "France" },
    { name: "Unai Simón", nation: "Spain" },
    { name: "Jordan Pickford", nation: "England" },
  ],
};

const GOLDEN_BALL_CANDIDATES = [
  {
    id: "yamal",
    name: "Lamine Yamal",
    nation: "Spain",
    countryCode: "es",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776109512/Players/Lamine-Yamal-Spain-photo_ekre6p.png",
    description:
      'The current frontrunner according to many analysts. After his historic Euro 2024, he is viewed as the "X-factor" for the tournament favorite.',
    info: "Forward • Spain/Barcelona • 18 years old",
    club: "Barcelona",
    stats: [
      { label: "Matches/Minutes", value: "2 / 152" },
      { label: "Assists", value: "3" },
      { label: "Passing Acc", value: "88%" },
      { label: "Penalties Awarded", value: "6" },
    ],
    titles: "Euro 2024 Champion, La Liga 2023/24",
    awards: "Euro 2024 Young Player of the Tournament",
    note: "",
  },
  {
    id: "mbappe",
    name: "Kylian Mbappé",
    nation: "France",
    countryCode: "fr",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Kylian-Mbapp%C3%A9-France-photo_zhekvx.png",
    description:
      "A perennial favorite who has consistently performed on the biggest stage, aiming to lead France back to the title.",
    info: "Forward • France/Real Madrid",
    club: "Real Madrid",
    stats: [
      { label: "Matches/Minutes", value: "4 / 353" },
      { label: "Goals/Assists", value: "5 / 3" },
      { label: "Passing Acc", value: "86.25%" },
      { label: "Top Speed", value: "32.81 km/h" },
    ],
    titles: "World Cup 2018 Champion, Nations League 2021",
    awards: "World Cup 2022 Golden Boot",
    note: "",
  },
  {
    id: "kane",
    name: "Harry Kane",
    nation: "England",
    countryCode: "gb-eng",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Harry-Kane-England-photo_gc0rpe.png",
    description:
      "High in the rankings due to his dual threat as a world-class finisher and playmaker for a deep England squad.",
    info: "Forward • England/Bayern München • 32 years old",
    club: "Bayern München",
    stats: [
      { label: "Matches/Minutes", value: "8 / 681" },
      { label: "Goals", value: "8 (7 Outside Area)" },
      { label: "Passing Acc", value: "72.25%" },
      { label: "Top Speed", value: "29.55 km/h" },
    ],
    titles: "Bundesliga Top Scorer 2023/24",
    awards: "World Cup 2018 Golden Boot",
    note: "",
  },
  {
    id: "dembele",
    name: "Ousmane Dembélé",
    nation: "France",
    countryCode: "fr",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Ousmane-Demb%C3%A9l%C3%A9-photo_ednlaw.png",
    description:
      "The 2025 Ballon d'Or holder enters the tournament in the form of his career.",
    info: "Forward • France/Paris",
    club: "Paris Saint-Germain",
    stats: [
      { label: "Matches/Minutes", value: "9 / 493" },
      { label: "Goals/Assists", value: "2 / 1" },
      { label: "Passing Acc", value: "86.56%" },
      { label: "Top Speed", value: "33.27 km/h" },
    ],
    titles: "World Cup 2018 Champion, La Liga Winner",
    awards: "Ballon d'Or 2025",
    note: "",
  },
  {
    id: "ronaldo",
    name: "Cristiano Ronaldo",
    nation: "Portugal",
    countryCode: "pt",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776440061/Players/cristiano_ronaldo_portugal_wkzor2.jpg",
    description:
      "The legendary forward continues to defy age, leading Portugal with his unmatched scoring instinct.",
    info: "Forward • Portugal/Al-Nassr",
    club: "Al-Nassr",
    stats: [
      { label: "Matches/Minutes", value: "5 / 372" },
      { label: "Goals", value: "5" },
      { label: "Passing Acc", value: "94.2%" },
      { label: "Attempts on Target", value: "31" },
    ],
    titles: "Euro 2016 Champion, 5x Champions League",
    awards: "5x Ballon d'Or",
    note: "",
  },
  {
    id: "haaland",
    name: "Erling Haaland",
    nation: "Norway",
    countryCode: "no",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776440064/Players/erling_haaland_-_norway_ddun7b.jpg",
    description:
      "A physical phenomenon and the most clinical finisher in world football today.",
    info: "Forward • Norway/Man City",
    club: "Manchester City",
    stats: [
      { label: "Matches/Minutes", value: "8 / 706" },
      { label: "Goals/Assists", value: "16 / 3" },
      { label: "Passing Acc", value: "71%" },
      { label: "Top Speed", value: "34.96 km/h" },
    ],
    titles: "Champions League 2023, Premier League Winner",
    awards: "European Golden Shoe 2023",
    note: "",
  },
  {
    id: "bellingham",
    name: "Jude Bellingham",
    nation: "England",
    countryCode: "gb-eng",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776440063/Players/jude-bellingham-england_bykesj.png",
    description:
      "The powerhouse of England’s midfield; his all-around impact makes him a top MVP candidate.",
    info: "Midfielder • England/Real Madrid • 22 years old",
    club: "Real Madrid",
    stats: [
      { label: "Matches/Minutes", value: "5 / 355" },
      { label: "Assists", value: "1" },
      { label: "Passing Acc", value: "89.6%" },
      { label: "Tackles Won", value: "9" },
    ],
    titles: "Champions League 2024, La Liga 2023/24",
    awards: "Kopa Trophy 2023",
    note: "",
  },
  {
    id: "vinicius",
    name: "Vinicius Junior",
    nation: "Brazil",
    countryCode: "br",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776440062/Players/vinicius_junior_brazil_nvekrc.png",
    description:
      "Brazil’s primary offensive weapon, expected to carry the creative burden for the Seleção.",
    info: "Forward • Brazil/Real Madrid • 25 years old",
    club: "Real Madrid",
    stats: [
      { label: "Matches/Minutes", value: "29 apps (Club)" },
      { label: "Goals/Assists", value: "11 / 7" },
      { label: "Fouls Suffered", value: "63" },
    ],
    titles: "2x Champions League, 3x La Liga",
    awards: "Champions League Player of the Season 2023/24",
    note: "",
  },
  {
    id: "raphinha",
    name: "Raphinha",
    nation: "Brazil",
    countryCode: "br",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776440061/Players/raphinha_brazil_ebrx8l.jpg",
    description:
      "A dynamic winger with exceptional work rate and creative flair, key for Brazil's attack.",
    info: "Forward • Brazil/Barcelona",
    club: "Barcelona",
    stats: [
      { label: "Matches/Minutes", value: "7 / 544" },
      { label: "Goals/Assists", value: "3 / 2" },
      { label: "Passing Acc", value: "78.43%" },
      { label: "Top Speed", value: "33.5 km/h" },
    ],
    titles: "La Liga 2022/23",
    awards: "Copa del Rey Winner",
    note: "",
  },
  {
    id: "diaz",
    name: "Luis Díaz",
    nation: "Colombia",
    countryCode: "co",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776109512/Players/Luis-D%C3%ADaz-Bayern-colombia-photo_qoxpjh.png",
    description:
      "The explosive Colombian winger who brings pace and unpredictability to the flank.",
    info: "Forward • Colombia/Bayern München",
    club: "Bayern München",
    stats: [
      { label: "Matches/Minutes", value: "9 / 710" },
      { label: "Goals/Assists", value: "5 / 3" },
      { label: "Passing Acc", value: "89.56%" },
      { label: "Top Speed", value: "33.82 km/h" },
    ],
    titles: "Copa America Finalist",
    awards: "Copa America Golden Boot 2021",
    note: "",
  },
  {
    id: "salah",
    name: "Mohamed Salah",
    nation: "Egypt",
    countryCode: "eg",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776440062/Players/Mohamed_Salah_-_egypt_vw4shw.jpg",
    description:
      "The Egyptian King remains one of the most consistent goalscorers in world football.",
    info: "Forward • Egypt/Liverpool • 34 years old",
    club: "Liverpool",
    stats: [
      { label: "Appearances", value: "23 (3 sub)" },
      { label: "Goals/Assists", value: "6 / 6" },
      { label: "xG", value: "7.25" },
      { label: "Passing Acc", value: "76%" },
    ],
    titles: "Champions League 2019, Premier League 2020",
    awards: "2x PFA Player of the Year",
    note: "",
  },
  {
    id: "vitinha",
    name: "Vitinha",
    nation: "Portugal",
    countryCode: "pt",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776440063/Players/vitinha-portugal_tvjiqz.png",
    description:
      "The tactical metronome for Portugal, known for his exceptional ball retention and vision.",
    info: "Midfielder • Portugal/Paris",
    club: "Paris Saint-Germain",
    stats: [
      { label: "Matches/Minutes", value: "6 / 485" },
      { label: "Passing Acc", value: "95.84%" },
      { label: "Top Speed", value: "29.62 km/h" },
      { label: "Balls Recovered", value: "25" },
    ],
    titles: "Ligue 1 Champion",
    awards: "Ligue 1 Team of the Year",
    note: "",
  },
];

const GOLDEN_BOOT_CANDIDATES = [
  {
    id: "haaland",
    name: "Erling Haaland",
    nation: "Norway",
    countryCode: "no",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776440064/Players/erling_haaland_-_norway_ddun7b.jpg",
    description:
      "The most clinical finisher in world football, averaging 2 goals per game in qualifying.",
    info: "Forward • Norway/Man City • 25 years old",
    club: "Manchester City",
    stats: [
      { label: "Matches/Minutes", value: "8 / 706" },
      { label: "Goals", value: "16" },
      { label: "Assists", value: "3" },
      { label: "Top Speed", value: "34.96 km/h" },
    ],
    titles: "Champions League 2023, Premier League Winner",
    awards: "European Golden Shoe 2023",
    note: "",
  },
  {
    id: "kane",
    name: "Harry Kane",
    nation: "England",
    countryCode: "gb-eng",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Harry-Kane-England-photo_gc0rpe.png",
    description:
      "A master of finishing from any distance, leading England's attack with clinical precision.",
    info: "Forward • England/Bayern München • 32 years old",
    club: "Bayern München",
    stats: [
      { label: "Matches/Minutes", value: "8 / 681" },
      { label: "Goals", value: "8 (7 Outside Area)" },
      { label: "Passing Acc", value: "72.25%" },
      { label: "Top Speed", value: "29.55 km/h" },
    ],
    titles: "Bundesliga Top Scorer 2023/24",
    awards: "World Cup 2018 Golden Boot",
    note: "",
  },
  {
    id: "mbappe",
    name: "Kylian Mbappé",
    nation: "France",
    countryCode: "fr",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Kylian-Mbapp%C3%A9-France-photo_zhekvx.png",
    description:
      "The explosive Frenchman who can change a game in a split second with his pace and finishing.",
    info: "Forward • France/Real Madrid",
    club: "Real Madrid",
    stats: [
      { label: "Matches/Minutes", value: "4 / 353" },
      { label: "Goals", value: "5" },
      { label: "Assists", value: "3" },
      { label: "Penalties Scored", value: "2" },
    ],
    titles: "World Cup 2018 Champion",
    awards: "World Cup 2022 Golden Boot",
    note: "",
  },
  {
    id: "ronaldo",
    name: "Cristiano Ronaldo",
    nation: "Portugal",
    countryCode: "pt",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776440061/Players/cristiano_ronaldo_portugal_wkzor2.jpg",
    description:
      "The ultimate goalscorer, still finding the net with remarkable consistency for Portugal.",
    info: "Forward • Portugal/Al-Nassr",
    club: "Al-Nassr",
    stats: [
      { label: "Matches/Minutes", value: "5 / 372" },
      { label: "Goals", value: "5" },
      { label: "Passing Acc", value: "94.2%" },
      { label: "Attempts on Target", value: "31" },
    ],
    titles: "Euro 2016 Champion",
    awards: "5x Ballon d'Or",
    note: "",
  },
  {
    id: "diaz",
    name: "Luis Díaz",
    nation: "Colombia",
    countryCode: "co",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/v1776109512/Players/Luis-D%C3%ADaz-Bayern-colombia-photo_qoxpjh.png",
    description:
      "Colombia's primary threat, combining elite dribbling with a sharp eye for goal.",
    info: "Forward • Colombia/Bayern München",
    club: "Bayern München",
    stats: [
      { label: "Matches/Minutes", value: "9 / 710" },
      { label: "Goals", value: "5" },
      { label: "Assists", value: "3" },
      { label: "Top Speed", value: "33.82 km/h" },
    ],
    titles: "Copa America Finalist",
    awards: "Copa America Golden Boot 2021",
    note: "",
  },
];

const GOLDEN_GLOVE_CANDIDATES = [
  {
    id: "raya",
    name: "David Raya",
    nation: "Spain",
    countryCode: "es",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358245/Goalkeepers/David_Raya_-_Spain_ybp6zu.jpg",
    description:
      "The statistical leader of the tournament, providing unmatched security for the Spanish goal.",
    info: "Goalkeeper • Spain/Arsenal • 30 years old",
    club: "Arsenal",
    stats: [
      { label: "Matches/Minutes", value: "10 / 900" },
      { label: "Clean Sheets", value: "7" },
      { label: "Saves", value: "27" },
      { label: "Passing Acc", value: "75%" },
    ],
    titles: "Premier League Golden Glove 2023/24",
    awards: "Arsenal Player of the Month",
    note: "",
  },
  {
    id: "donnarumma",
    name: "Gianluigi Donnarumma",
    nation: "Italy",
    countryCode: "it",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358246/Goalkeepers/Gianluigi_Donnarumma_-_italy_eyjen0.webp",
    description:
      "Italy's captain and defensive anchor, known for his incredible reach and shot-stopping ability.",
    info: "Goalkeeper • Italy/Man City",
    club: "Manchester City",
    stats: [
      { label: "Matches/Minutes", value: "9 / 840" },
      { label: "Clean Sheets", value: "4" },
      { label: "Saves", value: "28" },
      { label: "Passing Acc", value: "84.56%" },
    ],
    titles: "Euro 2020 Champion",
    awards: "Euro 2020 Player of the Tournament",
    note: "",
  },
  {
    id: "courtois",
    name: "Thibaut Courtois",
    nation: "Belgium",
    countryCode: "be",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358247/Goalkeepers/Thibaut_Courtois_-_Belgium_doe3n3.jpg",
    description:
      "Widely regarded as the best pure shot-stopper in the world, back to his best form.",
    info: "Goalkeeper • Belgium/Real Madrid",
    club: "Real Madrid",
    stats: [
      { label: "Matches/Minutes", value: "4 / 360" },
      { label: "Clean Sheets", value: "3" },
      { label: "Saves", value: "3" },
      { label: "Penalty Saves", value: "2" },
    ],
    titles: "Champions League 2022, 2024",
    awards: "Yashin Trophy 2022",
    note: "",
  },
  {
    id: "sommer",
    name: "Yann Sommer",
    nation: "Switzerland",
    countryCode: "ch",
    description:
      "The veteran Swiss keeper who consistently over-performs on the biggest stages.",
    info: "Goalkeeper • Switzerland/Inter",
    club: "Inter Milan",
    stats: [
      { label: "Matches/Minutes", value: "10 / 900" },
      { label: "Clean Sheets", value: "4" },
      { label: "Saves", value: "27" },
      { label: "Claims", value: "16" },
    ],
    titles: "Serie A Champion 2023/24",
    awards: "Swiss Player of the Year",
    note: "",
  },
  {
    id: "alisson",
    name: "Alisson Becker",
    nation: "Brazil",
    countryCode: "br",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358245/Goalkeepers/Alisson_Becker_-_Brazil_jqwf6n.png",
    description:
      "The complete goalkeeper, combining elite shot-stopping with world-class distribution.",
    info: "Goalkeeper • Brazil/Liverpool",
    club: "Liverpool",
    stats: [
      { label: "Matches/Minutes", value: "6 / 506" },
      { label: "Clean Sheets", value: "4" },
      { label: "Saves", value: "12" },
      { label: "Passing Acc", value: "82.5%" },
    ],
    titles: "Champions League 2019, Copa America 2019",
    awards: "The Best FIFA Goalkeeper 2019",
    note: "",
  },
  {
    id: "martinez",
    name: "Emiliano Martínez",
    nation: "Argentina",
    countryCode: "ar",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358246/Goalkeepers/Emiliano_Marti%CC%81nez_-_Argentina_nznxdz.jpg",
    description:
      "The hero of Argentina's recent triumphs, known for his psychological edge and clutch saves.",
    info: "Goalkeeper • Argentina/Aston Villa • 34 years old",
    club: "Aston Villa",
    stats: [
      { label: "Appearances (Club)", value: "27" },
      { label: "Goals Conceded", value: "29" },
      { label: "Clean Sheets", value: "7" },
    ],
    titles: "World Cup 2022 Champion, Copa America 2021, 2024",
    awards: "World Cup 2022 Golden Glove, Yashin Trophy 2023",
    note: "",
  },
  {
    id: "sanchez",
    name: "Robert Sánchez",
    nation: "Spain",
    countryCode: "es",
    image:
      "https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358246/Goalkeepers/Roberto_Sanchez_-_Spain_gsznit.jpg",
    description:
      "Chelsea's number one, showcasing excellent shot-stopping ability and a wide distribution range.",
    info: "Goalkeeper • Spain/Chelsea",
    club: "Chelsea",
    stats: [
      { label: "Matches Played", value: "8" },
      { label: "Clean Sheets", value: "3" },
      { label: "Passing Acc", value: "67.5%" },
      { label: "Top Speed", value: "27.86 km/h" },
    ],
    titles: "",
    awards: "",
    note: "",
  },
];

const CONTENDERS = {
  goldenBall: [
    {
      name: "Lamine Yamal",
      nation: "Spain",
      description:
        "The creative engine with 3 assists in 2 matches. His 88% passing accuracy and 6 penalties awarded make him a constant threat.",
    },
    {
      name: "Kylian Mbappé",
      nation: "France",
      description:
        "Elite output with 5 goals and 3 assists in 4 matches. Reached a top speed of 32.81 km/h.",
    },
    {
      name: "Harry Kane",
      nation: "England",
      description:
        "The complete forward with 8 goals in 8 matches. A master of long-range finishing with 7 goals from outside the area.",
    },
    {
      name: "Erling Haaland",
      nation: "Norway",
      description:
        "A scoring machine with 16 goals in 8 matches. The fastest player in the tournament at 34.96 km/h.",
    },
    {
      name: "Luis Díaz",
      nation: "Colombia",
      description:
        "Incredible work rate with 5 goals, 3 assists, and 15 balls recovered in 9 matches.",
    },
    {
      name: "Cristiano Ronaldo",
      nation: "Portugal",
      description:
        "A master of precision with 94.2% passing accuracy and 5 goals in 5 matches.",
    },
    {
      name: "Jude Bellingham",
      nation: "England",
      description:
        "A defensive powerhouse with 9 tackles won and 8 balls recovered, while maintaining 89.6% passing accuracy.",
    },
    {
      name: "Ousmane Dembélé",
      nation: "France",
      description:
        "A dribbling wizard with 8 successful dribbles and 19 attempts on target in 9 matches.",
    },
    {
      name: "Vitinha",
      nation: "Portugal",
      description:
        "The tactical metronome with a tournament-high 95.84% passing accuracy across 6 matches.",
    },
    {
      name: "Raphinha",
      nation: "Brazil",
      description:
        "A dual threat with 3 goals and 2 assists, plus 11 balls recovered in 7 matches.",
    },
  ],
  goldenBoot: [
    {
      rank: 1,
      name: "Erling Haaland",
      nation: "Norway",
      keyFactor:
        "The most clinical finisher with 16 goals in just 8 matches (2.0 goals/game).",
    },
    {
      rank: 2,
      name: "Harry Kane",
      nation: "England",
      keyFactor:
        "In elite form with 8 goals in 8 matches, including 7 from outside the area.",
    },
    {
      rank: 3,
      name: "Mohamed Salah",
      nation: "Egypt",
      keyFactor:
        "The focal point of Egypt's attack, with 6 goals and 6 assists in recent club play.",
    },
    {
      rank: 4,
      name: "Kylian Mbappé",
      nation: "France",
      keyFactor:
        "Incredible efficiency with 5 goals in just 4 matches (1.25 goals/game).",
    },
    {
      rank: 5,
      name: "Cristiano Ronaldo",
      nation: "Portugal",
      keyFactor: "Maintaining a goal-a-game average with 5 goals in 5 matches.",
    },
    {
      rank: 6,
      name: "Luis Díaz",
      nation: "Colombia",
      keyFactor: "A constant threat with 5 goals and 3 assists in 9 matches.",
    },
    {
      rank: 7,
      name: "Lionel Messi",
      nation: "Argentina",
      keyFactor:
        "Remains the clinical finisher for the world's #1 ranked team.",
    },
    {
      rank: 8,
      name: "Raphinha",
      nation: "Brazil",
      keyFactor:
        "Contributing 3 goals and 2 assists in 7 matches for the Seleção.",
    },
    {
      rank: 9,
      name: "Lamine Yamal",
      nation: "Spain",
      keyFactor:
        "The creative force with 3 assists in just 2 matches, expected to find the net soon.",
    },
    {
      rank: 10,
      name: "Ousmane Dembélé",
      nation: "France",
      keyFactor: "A dangerous winger with 2 goals and 1 assist in 9 matches.",
    },
  ],
  goldenGlove: [
    {
      name: "David Raya",
      nation: "Spain",
      description:
        "The statistical leader with 7 clean sheets and 27 saves in 10 matches. Exceptional distribution at 75% accuracy.",
    },
    {
      name: "Gianluigi Donnarumma",
      nation: "Italy",
      description:
        "A wall for Italy with 28 saves in 9 matches. Maintains a high passing accuracy of 84.56%.",
    },
    {
      name: "Thibaut Courtois",
      nation: "Belgium",
      description:
        "Incredible efficiency with 3 clean sheets in just 4 matches. A specialist in high-pressure penalty situations.",
    },
    {
      name: "Yann Sommer",
      nation: "Switzerland",
      description:
        "Consistently elite with 27 saves and 4 clean sheets in 10 matches for a disciplined Swiss side.",
    },
    {
      name: "Alisson Becker",
      nation: "Brazil",
      description:
        "Elite shot-stopper with 4 clean sheets in 6 matches. Known for his 82.5% passing accuracy and command.",
    },
    {
      name: "Emiliano Martínez",
      nation: "Argentina",
      description:
        "The 2022 winner remains a top contender with 7 clean sheets in 27 club appearances, ready for the big stage.",
    },
    {
      name: "Robert Sánchez",
      nation: "Spain",
      description:
        "Commanding the penalty area with 3 clean sheets in 8 matches and a 67.5% passing accuracy for Chelsea.",
    },
    {
      name: "Joan García",
      nation: "Spain",
      description:
        "A rising star for Barcelona with 17 saves in 8 matches, providing world-class competition for the starting spot.",
    },
    {
      name: "Mike Maignan",
      nation: "France",
      description:
        "Known for his incredible reflexes and command of the penalty area.",
    },
    {
      name: "Jordan Pickford",
      nation: "England",
      description:
        "Known for elevating his game during major international tournaments for England.",
    },
    {
      name: "Matt Turner",
      nation: "USA",
      description:
        "A home-soil favorite who has the chance to replicate historic American goalkeeping runs.",
    },
  ],
};

const LIVE_SCORES: Record<
  string,
  { scoreA: number; scoreB: number; status: "LIVE" | "FT" }
> = {
  m1: { scoreA: 2, scoreB: 1, status: "FT" },
  m2: { scoreA: 0, scoreB: 0, status: "LIVE" },
  m3: { scoreA: 3, scoreB: 0, status: "FT" },
  m5: { scoreA: 1, scoreB: 2, status: "FT" },
  m9: { scoreA: 1, scoreB: 1, status: "LIVE" },
};

export default function TournamentApp({
  user,
  profile,
  onLogout,
  onShowOnboarding,
}: any) {
  const [step, setStep] = useState(0);
  const [bracketRound, setBracketRound] = useState(0);
  const [selectedMvpCandidate, setSelectedMvpCandidate] = useState<string>(
    GOLDEN_BALL_CANDIDATES[0].id,
  );
  const [selectedBootCandidate, setSelectedBootCandidate] = useState<string>(
    GOLDEN_BOOT_CANDIDATES[0].id,
  );
  const [selectedGloveCandidate, setSelectedGloveCandidate] = useState<string>(
    GOLDEN_GLOVE_CANDIDATES[0].id,
  );
  const [activeAwardTab, setActiveAwardTab] = useState<
    "mvp" | "boot" | "glove"
  >("mvp");
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);
  const [showSharePreview, setShowSharePreview] = useState(false);
  const [groupRankings, setGroupRankings] = useState<any>({});
  const [wildcards, setWildcards] = useState<string[]>([]);
  const [bracket, setBracket] = useState<any>({});
  const [isLocked, setIsLocked] = useState(false);
  const [awards, setAwards] = useState({
    mvp: "",
    goldenBoot: "",
    goldenGlove: "",
  });
  const [allUsersPicks, setAllUsersPicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScoutOverlay, setShowScoutOverlay] = useState(false);
  const [selectedScoutTeam, setSelectedScoutTeam] = useState<string | null>(
    null,
  );
  const [showBadgeGuide, setShowBadgeGuide] = useState(false);
  const navigate = useNavigate();

  const handleShare = () => {
    if (!user) return;
    const shareUrl = `${window.location.origin}/share/${user.uid}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied to clipboard!");
  };

  // Data Sync (Listen to Current User's Predictions)
  useEffect(() => {
    if (!user) return;
    const predRef = doc(db, "predictions", user.uid);
    const unsubscribe = onSnapshot(
      predRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Only update if not currently editing (to avoid race conditions with local state)
          setGroupRankings(data.groupRankings || {});
          setWildcards(data.wildcards || []);
          setBracket(data.bracket || {});
          setAwards(
            data.awards || { mvp: "", goldenBoot: "", goldenGlove: "" },
          );
          setIsLocked(data.isLocked || false);
        } else {
          // Initialize if doesn't exist
          try {
            setDoc(predRef, {
              groupRankings: {},
              wildcards: [],
              bracket: {},
              awards: { mvp: "", goldenBoot: "", goldenGlove: "" },
              isLocked: false,
              updatedAt: Date.now(),
            });
          } catch (err) {
            handleFirestoreError(
              err,
              OperationType.WRITE,
              `predictions/${user.uid}`,
            );
          }
        }
        setLoading(false);
      },
      (err) => {
        console.error("Sync error", err);
        handleFirestoreError(err, OperationType.GET, `predictions/${user.uid}`);
      },
    );
    return unsubscribe;
  }, [user]);

  // Global Leaderboard Listen
  useEffect(() => {
    const leaderboardRef = collection(db, "leaderboard");
    const unsubscribe = onSnapshot(
      leaderboardRef,
      (snapshot) => {
        const picks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllUsersPicks(picks);
      },
      (err) => {
        console.error("Leaderboard error", err);
        handleFirestoreError(err, OperationType.LIST, "leaderboard");
      },
    );
    return unsubscribe;
  }, []);

  // Auto-save progress when state changes
  useEffect(() => {
    if (loading || !user || isLocked) return;

    const timer = setTimeout(() => {
      const predRef = doc(db, "predictions", user.uid);
      const newState = {
        groupRankings,
        wildcards,
        bracket,
        awards,
        isLocked,
        updatedAt: Date.now(),
      };

      // Don't use deep merge for the entire state because if we delete a group (like in RESET),
      // merge:true will just keep the old group in the database and pull it back down on next snapshot.
      setDoc(predRef, newState).catch((err) => {
        console.error("Auto-save error", err);
        handleFirestoreError(
          err,
          OperationType.WRITE,
          `predictions/${user.uid}`,
        );
      });

      // Update public leaderboard
      const calculatePotentialPoints = (b: any) => {
        let pts = 0;
        Object.keys(b).forEach((matchId) => {
          const winner = b[matchId];
          if (winner && winner !== "TBD") {
            pts += 10;
            const rank = TEAM_INFO[winner]?.ranking || 100;
            if (rank > 20) pts += 5;
            if (rank > 40) pts += 10;
            if (rank > 60) pts += 15;
          }
        });
        return pts;
      };

      const leaderboardRef = doc(db, "leaderboard", user.uid);
      setDoc(
        leaderboardRef,
        {
          displayName: profile?.displayName || "Anonymous",
          firstName: profile?.firstName || "",
          lastName: profile?.lastName || "",
          nationality: profile?.nationality || "",
          favoriteTeams: profile?.favoriteTeams || [],
          favoritePlayers: profile?.favoritePlayers || [],
          favoriteClubs: profile?.favoriteClubs || [],
          champion: bracket?.champion || "TBD",
          mvp: awards?.mvp || "TBD",
          goldenBoot: awards?.goldenBoot || "TBD",
          goldenGlove: awards?.goldenGlove || "TBD",
          isLocked: isLocked || false,
          potentialPoints: calculatePotentialPoints(bracket || {}),
          updatedAt: Date.now(),
        },
        { merge: true },
      ).catch((err) => {
        console.error("Leaderboard auto-save error", err);
        handleFirestoreError(
          err,
          OperationType.WRITE,
          `leaderboard/${user.uid}`,
        );
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    groupRankings,
    wildcards,
    bracket,
    awards,
    isLocked,
    user,
    profile,
    loading,
  ]);

  const saveProgress = async (updates: any) => {
    if (!user || isLocked) return;
    const predRef = doc(db, "predictions", user.uid);
    const newState = {
      groupRankings,
      wildcards,
      bracket,
      awards,
      isLocked,
      ...updates,
      updatedAt: Date.now(),
    };
    try {
      // Don't merge here to allow proper deletion of keys (like resetting a group)
      await setDoc(predRef, newState);

      // Update public leaderboard
      const calculatePotentialPoints = (b: any) => {
        let pts = 0;
        Object.keys(b).forEach((matchId) => {
          const winner = b[matchId];
          if (winner && winner !== "TBD") {
            pts += 10;
            const rank = TEAM_INFO[winner]?.ranking || 100;
            if (rank > 20) pts += 5;
            if (rank > 40) pts += 10;
            if (rank > 60) pts += 15;
          }
        });
        return pts;
      };

      const leaderboardRef = doc(db, "leaderboard", user.uid);
      await setDoc(
        leaderboardRef,
        {
          displayName: profile?.displayName || "Anonymous",
          firstName: profile?.firstName || "",
          lastName: profile?.lastName || "",
          nationality: profile?.nationality || "",
          favoriteTeams: profile?.favoriteTeams || [],
          favoritePlayers: profile?.favoritePlayers || [],
          favoriteClubs: profile?.favoriteClubs || [],
          champion: newState.bracket?.champion || "TBD",
          mvp: newState.awards?.mvp || "TBD",
          goldenBoot: newState.awards?.goldenBoot || "TBD",
          goldenGlove: newState.awards?.goldenGlove || "TBD",
          isLocked: newState.isLocked || false,
          potentialPoints: calculatePotentialPoints(newState.bracket || {}),
          updatedAt: Date.now(),
        },
        { merge: true },
      );
    } catch (err) {
      console.error("Save error", err);
      handleFirestoreError(err, OperationType.WRITE, `predictions/${user.uid}`);
    }
  };

  const groupsFinished =
    Object.keys(groupRankings).length === 12 &&
    Object.values(groupRankings).every((r: any) => r.length === 2);

  const wildcardsFinished = wildcards.length === 8;

  const handleGroupClick = (groupId: string, team: string) => {
    if (isLocked) return;
    setGroupRankings((prev: any) => {
      if (team === "RESET") {
        const next = { ...prev };
        delete next[groupId];
        return next;
      }
      const current = prev[groupId] || [];
      let next;
      if (current.includes(team)) {
        next = current.filter((t: string) => t !== team);
      } else if (current.length < 2) {
        next = [...current, team];
      } else {
        // If already have 2, replace the second one
        next = [current[0], team];
      }
      return { ...prev, [groupId]: next };
    });
  };

  const toggleWildcard = (team: string) => {
    if (isLocked) return;
    setWildcards((prev) => {
      if (prev.includes(team)) return prev.filter((t) => t !== team);
      if (prev.length < 8) return [...prev, team];
      return prev;
    });
  };

  const getThirdPlaceTeams = () => {
    const thirdPlace: string[] = [];
    GROUPS.forEach((g) => {
      const selected = groupRankings[g.id] || [];
      const remaining = g.teams.filter((t) => !selected.includes(t));
      // In a real scenario, we'd need to know who is 3rd vs 4th,
      // but for this app, we'll let them pick from any non-top-2 team.
      remaining.forEach((t) => thirdPlace.push(t));
    });
    return thirdPlace;
  };

  const advanceWinner = (matchId: string, team: string) => {
    if (!team || team === "TBD" || isLocked) return;

    setBracket((prev: any) => {
      const next = { ...prev, [matchId]: team };

      // If it's the final match, trigger confetti
      if (matchId === "champion") {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f59e0b", "#3b82f6", "#ffffff"],
        });
      }

      return next;
    });
  };

  const getBracketTeams = () => {
    const winners = GROUPS.map((g) => groupRankings[g.id]?.[0] || "TBD");
    const runnersUp = GROUPS.map((g) => groupRankings[g.id]?.[1] || "TBD");
    const w = [...wildcards];
    while (w.length < 8) w.push("TBD");

    return { winners, runnersUp, wildcards: w };
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          alt="FIFA World Cup Trophy"
          className="absolute w-full h-full object-cover opacity-20 scale-110"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC93GCr01cNBAJYf3ZOfXlQ0ND6xtCqRybwxxWjLZWtn3OclTKh1BFOpcqg2s7o6T-TRXfdRlGMIbZnRmj8gpmwUfXrhoYko7LmixchsKrdtxKRwakejMXBM91p3IgwnYCDdHhXJ3Jvi9uuikZ5y4bd7_mH_CySwIs9bfU8Ekw4Q0f3KCxg5CPqpXjdLtXQ-E3zQp-6HK2pGjSxvrP9cbQIII7b17DUY92-PUKkpKb7Au_4Pwd6NagAZPBFW3uGpSYtd5rHMkLDP6zb"
        />
        <div className="absolute inset-0 hero-gradient z-10"></div>
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBG-FJt1_KW7fjiGClQqNXst_RT4vJC2bRbOCI3kHZaoLsVjxdViFc22M0IjU90j9xL6C7zbnfo9lsQyDmmhGfFV-aC4KkZl5G4XiGFce0mhLIsHONcevHQOKhBhxiFhLj6WMkONDTnQ84NzEIjvbMIpH8nO51LIiCLAzhLWk3yhgU9rt9Zd_oEctZGAnb6PJEiO-9fzjZPwS0IiucK5wIHsPRtrPMxQQWzKKBC-TTT7osf748fkgu5LQ5hVnRFtVH_8HzmXVQAWr3V')",
          }}
        ></div>
        <Loader2
          className="text-secondary animate-spin relative z-20"
          size={48}
        />
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-on-background font-body selection:bg-primary/30 relative">
      {/* Background Asset */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          alt="FIFA World Cup Trophy"
          className="w-full h-full object-cover opacity-20 scale-110 lg:scale-100"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC93GCr01cNBAJYf3ZOfXlQ0ND6xtCqRybwxxWjLZWtn3OclTKh1BFOpcqg2s7o6T-TRXfdRlGMIbZnRmj8gpmwUfXrhoYko7LmixchsKrdtxKRwakejMXBM91p3IgwnYCDdHhXJ3Jvi9uuikZ5y4bd7_mH_CySwIs9bfU8Ekw4Q0f3KCxg5CPqpXjdLtXQ-E3zQp-6HK2pGjSxvrP9cbQIII7b17DUY92-PUKkpKb7Au_4Pwd6NagAZPBFW3uGpSYtd5rHMkLDP6zb"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBG-FJt1_KW7fjiGClQqNXst_RT4vJC2bRbOCI3kHZaoLsVjxdViFc22M0IjU90j9xL6C7zbnfo9lsQyDmmhGfFV-aC4KkZl5G4XiGFce0mhLIsHONcevHQOKhBhxiFhLj6WMkONDTnQ84NzEIjvbMIpH8nO51LIiCLAzhLWk3yhgU9rt9Zd_oEctZGAnb6PJEiO-9fzjZPwS0IiucK5wIHsPRtrPMxQQWzKKBC-TTT7osf748fkgu5LQ5hVnRFtVH_8HzmXVQAWr3V')",
          }}
        ></div>
      </div>

      <nav className="bg-surface-container-highest/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-2 sm:px-4 h-16 xl:h-20 flex items-center justify-between transition-all">
        <div className="flex items-center gap-2 lg:gap-3 pl-1 lg:pl-4 shrink-0">
          <div className="flex flex-col">
            <span className="text-lg lg:text-xl xl:text-2xl font-headline font-black text-primary tracking-tight uppercase leading-none">
              FIFA WORLD CUP 2026
            </span>
            <span className="text-[8px] lg:text-[9px] xl:text-[10px] font-bold text-outline-variant tracking-widest uppercase mt-0.5 lg:mt-1 truncate max-w-[120px] lg:max-w-[200px] xl:max-w-none">
              {/* Shortened on smaller screens */}
              <span className="xl:hidden">Elite Pool 2026</span>
              <span className="hidden xl:inline">
                Carlos, Family and Friends Elite Pool
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4 xl:gap-8 h-full">
          <div className="hidden lg:flex gap-4 xl:gap-8 h-full items-center">
            {[
              "Groups",
              "Knockouts",
              "Awards",
              "Predictions",
              "Scouting Hub",
            ].map((label, i) => (
              <button
                key={label}
                onClick={() => setStep(i)}
                className={`text-[10px] xl:text-[11px] uppercase font-bold tracking-widest transition-all h-full border-b-2 whitespace-nowrap px-1 ${step === i ? "text-primary border-primary" : "text-outline-variant hover:text-white border-transparent"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 lg:gap-4 xl:gap-6 lg:pl-4 xl:pl-8 lg:border-l lg:border-white/10 h-full">
            <button
              onClick={onShowOnboarding}
              className="p-1.5 lg:p-2 text-outline-variant hover:text-primary transition-colors flex items-center gap-2"
              title="Watch Briefing"
            >
              <Info size={18} className="lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
              <span className="hidden sm:inline text-[9px] xl:text-[10px] font-black uppercase tracking-widest">
                Help
              </span>
            </button>
            <div className="h-4 lg:h-5 w-[1px] bg-white/10 hidden sm:block" />
            <Link
              to="/profile"
              className="flex items-center gap-2 xl:gap-3 group shrink-0"
            >
              <div className="text-right hidden lg:block">
                <p className="text-[8px] xl:text-[9px] font-bold text-outline-variant uppercase tracking-wider leading-none mb-0.5 truncate max-w-[100px] xl:max-w-none">
                  {NOMINATIONS.find((n) => n.id === profile?.nomination)?.title ||
                    "Elite Scout"}
                </p>
                <p className="text-[10px] xl:text-xs font-bold text-white group-hover:text-primary transition-colors max-w-[80px] xl:max-w-[120px] truncate hidden xl:block">
                  {profile?.displayName}
                </p>
              </div>
              <div className="w-8 h-8 xl:w-10 xl:h-10 bg-primary-container rounded-full flex items-center justify-center font-headline font-black text-on-primary-fixed shadow-lg group-hover:scale-105 transition-transform text-xs xl:text-base">
                {profile?.displayName?.[0]?.toUpperCase()}
              </div>
            </Link>
            <button
              onClick={onLogout}
              className="p-1.5 lg:p-2 text-outline-variant hover:text-error transition-colors"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-lg xl:text-xl">
                logout
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-20 max-w-[1600px] mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {selectedScoutTeam && (
            <MobileScoutCard
              team={selectedScoutTeam}
              onClose={() => setSelectedScoutTeam(null)}
            />
          )}
          {step === 0 && (
            <motion.div
              key="groups"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="duration-500"
            >
              <header className="mb-6 lg:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6 lg:pb-8">
                <div className="flex flex-col gap-5">
                  <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white leading-none">
                      Group Stage
                    </h1>
                    <p className="text-[11px] md:text-sm font-medium text-outline-variant mt-1">
                      Select the top 2 teams from all 12 groups to seed your
                      bracket.
                    </p>
                  </div>

                  <div className="lg:hidden flex overflow-x-auto gap-2 pb-2 no-scrollbar scroll-smooth snap-x w-screen -mx-4 px-4 overflow-y-hidden">
                    {GROUPS.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => {
                          const el = document.getElementById(`group-${g.id}`);
                          if (el)
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                        }}
                        className="snap-center shrink-0 w-10 h-10 rounded-lg bg-surface-container-highest border border-white/5 flex flex-col items-center justify-center hover:bg-primary hover:text-on-primary transition-all active:scale-90"
                      >
                        <span className="text-[7px] font-bold opacity-40 leading-none">
                          GP
                        </span>
                        <span className="text-xs font-headline font-black leading-none">
                          {g.id}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Integrated Legend Strip - Mini Mode for Mobile */}
                  <div className="flex overflow-x-auto gap-x-6 gap-y-3 bg-white/[0.03] lg:bg-surface-container-highest/20 border border-white/5 px-4 lg:px-5 py-2.5 lg:py-3 rounded-xl lg:rounded-2xl backdrop-blur-md self-start no-scrollbar w-full md:w-auto">
                    <div className="flex items-center gap-2.5 shrink-0">
                      <div className="flex gap-0.5">
                        <div className="w-2.5 h-1 lg:w-3 lg:h-1 rounded-full bg-blue-400" />
                        <div className="w-2.5 h-1 lg:w-3 lg:h-1 rounded-full bg-blue-400" />
                        <div className="w-2.5 h-1 lg:w-3 lg:h-1 rounded-full bg-blue-400" />
                      </div>
                      <span className="text-[9px] lg:text-[10px] font-bold text-outline uppercase tracking-widest whitespace-nowrap">
                        Predictability
                      </span>
                    </div>

                    <div className="w-[1px] h-3 h-4 bg-white/10 shrink-0" />

                    <div className="flex items-center gap-2.5 shrink-0">
                      <Star className="w-3 lg:w-3.5 h-3 lg:h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                      <span className="text-[9px] lg:text-[10px] font-bold text-outline uppercase tracking-widest whitespace-nowrap">
                        Scout's Value Pick
                      </span>
                    </div>

                    <div className="w-[1px] h-3 h-4 bg-white/10 shrink-0" />

                    <div className="flex items-center gap-2.5 shrink-0">
                      <div className="flex gap-1">
                        <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-success" />
                        <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-amber-400" />
                        <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-error" />
                      </div>
                      <span className="text-[9px] lg:text-[10px] font-bold text-outline uppercase tracking-widest whitespace-nowrap">
                        Recent Form
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => {
                      const newRankings: Record<string, string[]> = {};
                      GROUPS.forEach((g) => {
                        const sortedTeams = [...g.teams].sort(
                          (a, b) =>
                            (TEAM_INFO[a]?.ranking || 100) -
                            (TEAM_INFO[b]?.ranking || 100),
                        );
                        newRankings[g.id] = [sortedTeams[0], sortedTeams[1]];
                      });
                      setGroupRankings(newRankings);
                      toast.success("Groups auto-filled by FIFA ranking!");
                    }}
                    disabled={isLocked}
                    title="Auto-fill by FIFA Rank"
                    className="flex-1 md:flex-none p-4 lg:px-6 lg:py-4 bg-surface-container-highest border border-white/5 text-white rounded-sm lg:rounded-lg hover:bg-surface-container transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-xl">
                      auto_awesome
                    </span>
                    <span className="text-[10px] lg:text-xs font-headline font-black uppercase tracking-widest lg:inline hidden sm:inline">
                      Auto-fill
                    </span>
                  </button>
                  <button
                    disabled={!groupsFinished}
                    onClick={() => setStep(0.5)}
                    className={`flex-[2] md:flex-none p-4 lg:px-8 lg:py-4 rounded-sm lg:rounded-lg font-headline font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${
                      groupsFinished
                        ? "bg-primary-container text-on-primary-fixed hover:bg-primary shadow-lg"
                        : "bg-surface-container-highest/40 text-outline-variant border border-white/5 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <span className="text-[10px] lg:text-xs">Next: Wildcards</span>
                    <span className="material-symbols-outlined text-xl">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {GROUPS.map((g) => (
                  <GroupCard
                    key={g.id}
                    group={g}
                    selections={groupRankings[g.id] || []}
                    onClick={(t) => handleGroupClick(g.id, t)}
                    isLocked={isLocked}
                    onScoutClick={(t: string) => setSelectedScoutTeam(t)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 0.5 && (
            <motion.div
              key="wildcards"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
                <div>
                  <button
                    onClick={() => setStep(0)}
                    className="flex items-center gap-2 text-outline-variant font-bold hover:text-white mb-4 transition-colors text-xs uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-sm">
                      arrow_back
                    </span>{" "}
                    Back to Groups
                  </button>
                  <h1 className="text-5xl font-headline font-black uppercase tracking-tighter mb-2 text-white">
                    Wildcard Selection
                  </h1>
                  <p className="text-on-surface-variant font-medium text-lg">
                    Pick the 8 best 3rd-place teams to complete the Round of 32.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="glass-card px-8 py-4 rounded-xl border border-white/10 shadow-lg">
                    <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">
                      Selected
                    </p>
                    <p
                      className={`text-2xl font-headline font-black ${wildcardsFinished ? "text-secondary" : "text-primary"}`}
                    >
                      {wildcards.length}/8 Teams
                    </p>
                  </div>
                  {wildcardsFinished && (
                    <button
                      onClick={() => setStep(1)}
                      className="px-8 py-4 bg-primary-container text-on-primary-fixed rounded-sm font-headline font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg flex items-center gap-3 group"
                    >
                      PROCEED TO KNOCKOUTS{" "}
                      <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  )}
                </div>
              </header>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {getThirdPlaceTeams().map((team) => {
                  const info = TEAM_INFO[team] || TEAM_INFO["TBD"];
                  const isSelected = wildcards.includes(team);
                  return (
                    <div key={team} className="relative group/wildcard">
                      <button
                        disabled={isLocked}
                        onClick={() => toggleWildcard(team)}
                        className={`w-full p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 ${
                          isSelected
                            ? "bg-primary-container/20 border-primary text-white shadow-[0_0_15_rgba(var(--color-primary),0.3)]"
                            : "bg-surface-container border-white/5 text-outline-variant hover:border-white/20"
                        }`}
                      >
                        <img
                          src={`https://flagcdn.com/w80/${info.code}.png`}
                          alt=""
                          className={`w-12 h-8 object-cover rounded-sm shadow-sm transition-all duration-300 ${isSelected ? "brightness-110" : "grayscale opacity-50"}`}
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[10px] font-headline font-black uppercase tracking-widest text-center leading-tight">
                          {team}
                        </span>

                        {/* Stats Tooltip/Overlay on Hover */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-80 glass-card border border-white/10 rounded-2xl p-6 opacity-0 pointer-events-none group-hover/wildcard:opacity-100 group-hover/wildcard:pointer-events-auto transition-all duration-300 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hidden md:block translate-y-2 group-hover/wildcard:translate-y-0 text-left after:content-[''] after:absolute after:top-full after:left-0 after:right-0 after:h-4">
                          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                            <div className="flex items-center gap-3">
                              <img
                                src={`https://flagcdn.com/w80/${info.code}.png`}
                                alt=""
                                className="w-8 h-5 object-cover rounded-sm shadow-sm"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <span className="text-sm font-headline font-black uppercase tracking-tight text-white block leading-none mb-1">
                                  {team}
                                </span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                  FIFA Rank #{info.ranking}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[8px] font-bold text-outline-variant uppercase tracking-widest mb-1">
                                Watch
                              </p>
                              <p className="text-[10px] font-headline font-black text-secondary uppercase">
                                {info.watch}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {info.description && (
                              <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed italic border-l-2 border-primary/30 pl-3 py-1">
                                "{info.description}"
                              </p>
                            )}

                            <div className="grid grid-cols-2 gap-4 pt-2">
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <p className="text-[9px] font-bold text-outline-variant uppercase tracking-widest">
                                      Scoring Power
                                    </p>
                                    <span className="text-[10px] font-headline font-black text-white">
                                      {info.scoringPower}%
                                    </span>
                                  </div>
                                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-primary"
                                      style={{ width: `${info.scoringPower}%` }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <p className="text-[9px] font-bold text-outline-variant uppercase tracking-widest">
                                      The Wall
                                    </p>
                                    <span className="text-[10px] font-headline font-black text-white">
                                      {info.theWall}%
                                    </span>
                                  </div>
                                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-secondary"
                                      style={{ width: `${info.theWall}%` }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="bg-surface-container-highest/30 rounded-xl p-3 border border-white/5">
                                <p className="text-[8px] font-bold text-outline-variant uppercase tracking-widest mb-2">
                                  Scouting Note
                                </p>
                                <p className="text-[10px] font-bold text-white leading-tight">
                                  {info.scoringPower > 85
                                    ? "Lethal attack."
                                    : info.theWall > 85
                                      ? "Elite defense."
                                      : "Balanced squad."}
                                  {info.control > 85
                                    ? " Controls the pace."
                                    : " Fast transitions."}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[9px] font-bold text-outline-variant uppercase">
                              Recent Form:{" "}
                              <span className="text-white">{info.form}</span>
                            </span>
                            <span className="text-[9px] font-bold text-primary uppercase tracking-widest">
                              Click to Select
                            </span>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="bracket"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-[1400px] w-[95%] mx-auto duration-500 pb-20"
            >
              <header className="mb-8 flex flex-col gap-6 glass-card p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
                {/* Top Row: Title and Actions */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full">
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setStep(0.5)}
                      className="flex items-center gap-3 text-outline-variant font-bold uppercase tracking-widest hover:text-white transition-all group text-xs shrink-0 w-fit"
                    >
                      <div className="p-2 bg-surface-container-highest rounded-lg group-hover:bg-surface-container-highest/80 transition-colors">
                        <span className="material-symbols-outlined text-sm">
                          arrow_back
                        </span>
                      </div>
                      Edit Wildcards
                    </button>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white leading-none">
                      Knockout Stage
                    </h2>

                    {/* Knockout Legend Strip */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 bg-white/5 border border-white/5 px-4 py-2 rounded-xl backdrop-blur-sm self-start">
                      <div className="flex items-center gap-2">
                        <span className="text-error text-sm">🔥</span>
                        <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest whitespace-nowrap">
                          Upset Alert
                        </span>
                      </div>

                      <div className="w-[1px] h-3 bg-white/10" />

                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-sm flex items-center justify-center">
                          <Star className="w-2 h-2 text-black fill-black" />
                        </div>
                        <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest whitespace-nowrap">
                          Favorite Path
                        </span>
                      </div>

                      <div className="w-[1px] h-3 bg-white/10" />

                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest whitespace-nowrap">
                          Winner Selection
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 shrink-0 w-full lg:w-auto">
                    <button
                      onClick={() => setShowScoutOverlay(!showScoutOverlay)}
                      title="Toggle Advanced Intel: See favorite paths and upset alerts based on FIFA rankings"
                      className={`group flex-1 lg:flex-none justify-center px-4 py-4 rounded-sm font-headline font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 border ${
                        showScoutOverlay
                          ? "bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                          : "bg-surface-container-highest border-white/10 text-white hover:bg-surface-container"
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showScoutOverlay ? "visibility" : "visibility_off"}
                      </span>
                      <span>SCOUT VIEW</span>
                    </button>
                    <button
                      onClick={() => {
                        const newBracket = { ...bracket };
                        let changed = true;
                        let count = 0;
                        while (changed) {
                          changed = false;
                          for (const round of KNOCKOUT_ROUNDS) {
                            const matches = round.matches(
                              getBracketTeams(),
                              newBracket,
                            );
                            for (const match of matches) {
                              if (
                                match.teamA !== "TBD" &&
                                match.teamB !== "TBD" &&
                                !newBracket[match.nextId]
                              ) {
                                const rankA =
                                  TEAM_INFO[match.teamA]?.ranking || 100;
                                const rankB =
                                  TEAM_INFO[match.teamB]?.ranking || 100;
                                newBracket[match.nextId] =
                                  rankA < rankB ? match.teamA : match.teamB;
                                changed = true;
                                count++;
                              }
                            }
                          }
                        }
                        if (count > 0) {
                          setBracket(newBracket);
                          toast.success(
                            `Auto-filled ${count} matches based on FIFA rankings!`,
                          );
                        } else {
                          toast.error(
                            "No eligible matches to auto-fill. Complete the Group Stage or existing rounds first.",
                          );
                        }
                      }}
                      disabled={isLocked}
                      className="group flex-1 lg:flex-none justify-center px-4 py-4 bg-surface-container-highest border border-white/10 text-white rounded-sm font-headline font-black uppercase tracking-widest hover:bg-surface-container transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-lg">
                        auto_awesome
                      </span>
                      <span>AUTO-FILL</span>
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="group flex-1 lg:flex-none justify-center px-6 py-4 bg-primary-container text-on-primary-fixed rounded-sm font-headline font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg flex items-center gap-3"
                    >
                      AWARDS{" "}
                      <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>

                {/* Bottom Row: Round Navigation Tabs */}
                <div className="flex overflow-x-auto items-center justify-start lg:justify-center gap-2 lg:gap-3 pt-4 border-t border-white/10 w-full no-scrollbar">
                  {KNOCKOUT_ROUNDS.map((round, i) => (
                    <button
                      key={round.title}
                      onClick={() => setBracketRound(i)}
                      className={`px-4 py-2.5 lg:px-6 lg:py-3 rounded-sm lg:rounded-lg text-[9px] lg:text-xs font-headline font-black uppercase tracking-widest transition-all border shrink-0 ${
                        bracketRound === i
                          ? "bg-primary-container border-primary text-on-primary-fixed shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"
                          : "bg-surface-container-highest/50 border-white/5 text-outline-variant hover:text-white hover:bg-surface-container-highest"
                      }`}
                    >
                      {round.title}
                    </button>
                  ))}
                </div>
              </header>

              {/* Active Round Matches */}
              <div className="space-y-8">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <h3 className="text-2xl font-headline font-black uppercase text-white">
                    {
                      KNOCKOUT_ROUNDS[bracketRound === -1 ? 0 : bracketRound]
                        .title
                    }
                  </h3>
                  <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest bg-surface-container-highest px-3 py-1.5 rounded-sm">
                    {
                      KNOCKOUT_ROUNDS[bracketRound === -1 ? 0 : bracketRound]
                        .matches(getBracketTeams(), bracket)
                        .filter((m: any) => bracket[m.nextId]).length
                    }{" "}
                    /{" "}
                    {
                      KNOCKOUT_ROUNDS[
                        bracketRound === -1 ? 0 : bracketRound
                      ].matches(getBracketTeams(), bracket).length
                    }{" "}
                    Predicted
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {KNOCKOUT_ROUNDS[bracketRound === -1 ? 0 : bracketRound]
                    .matches(getBracketTeams(), bracket)
                    .map((match: any, idx: number) => (
                      <SmartMatchCard
                        key={match.id}
                        match={match}
                        bracket={bracket}
                        advance={advanceWinner}
                        isLocked={isLocked}
                        index={idx + 1}
                        showScoutOverlay={showScoutOverlay}
                      />
                    ))}
                </div>

                {/* Next Round Button */}
                {(bracketRound === -1 ? 0 : bracketRound) < 4 &&
                  KNOCKOUT_ROUNDS[bracketRound === -1 ? 0 : bracketRound]
                    .matches(getBracketTeams(), bracket)
                    .every((m: any) => bracket[m.nextId]) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center pt-8"
                    >
                      <button
                        onClick={() =>
                          setBracketRound((r) => (r === -1 ? 1 : r + 1))
                        }
                        className="bg-primary-container hover:bg-primary text-on-primary-fixed px-8 py-4 rounded-sm font-headline font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-3"
                      >
                        Proceed to{" "}
                        {
                          KNOCKOUT_ROUNDS[
                            (bracketRound === -1 ? 0 : bracketRound) + 1
                          ].title
                        }{" "}
                        <span className="material-symbols-outlined text-xl">
                          arrow_forward
                        </span>
                      </button>
                    </motion.div>
                  )}

                {(bracketRound === -1 ? 0 : bracketRound) === 4 &&
                  bracket["champion"] && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-12 bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 rounded-2xl p-12 text-center relative overflow-hidden glass-card"
                    >
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
                      <span className="material-symbols-outlined text-7xl text-secondary mb-6 drop-shadow-[0_0_20px_rgba(var(--color-secondary),0.6)]">
                        emoji_events
                      </span>
                      <h4 className="text-xl font-headline font-black uppercase tracking-widest text-secondary/80 mb-2">
                        World Champion
                      </h4>
                      <p className="text-6xl font-headline font-black uppercase text-white tracking-tighter drop-shadow-2xl">
                        {bracket["champion"]}
                      </p>

                      <button
                        onClick={() => setStep(2)}
                        className="mt-10 bg-secondary hover:bg-secondary/90 text-on-secondary px-8 py-4 rounded-sm font-headline font-black uppercase tracking-widest transition-all shadow-lg inline-flex items-center gap-3"
                      >
                        Continue to Awards{" "}
                        <span className="material-symbols-outlined text-xl">
                          arrow_forward
                        </span>
                      </button>
                    </motion.div>
                  )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="awards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto duration-500"
            >
              <header className="text-center mb-10 lg:mb-16 relative flex flex-col items-center">
                <button
                  onClick={handleShare}
                  className="lg:absolute lg:right-0 lg:top-0 mb-6 lg:mb-0 p-3 lg:p-4 bg-surface-container rounded-sm border border-white/10 text-outline-variant hover:text-white transition-all hover:bg-surface-container-highest flex items-center gap-3 font-headline font-black uppercase tracking-widest text-[10px] lg:text-xs shadow-md"
                >
                  <span className="material-symbols-outlined text-lg">
                    share
                  </span>
                  <span className="hidden sm:inline">SHARE PREDICTIONS</span>
                  <span className="sm:hidden">SHARE</span>
                </button>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-headline font-black uppercase tracking-tighter mb-4 text-white">
                  Final Awards
                </h1>
                <p className="text-on-surface-variant font-medium max-w-2xl mx-auto text-sm md:text-lg px-4">
                  Spotlight the tournament's elite performers. Use the expert
                  insights to guide your final predictions.
                </p>
              </header>

              {/* Award Tabs */}
              <div className="flex overflow-x-auto lg:justify-center gap-2 mb-10 lg:mb-12 bg-surface-container-highest/20 p-1.5 rounded-xl border border-white/5 max-w-2xl mx-auto no-scrollbar snap-x">
                {[
                  {
                    id: "mvp",
                    label: "Golden Ball",
                    icon: "star",
                    color: "secondary",
                  },
                  {
                    id: "boot",
                    label: "Golden Boot",
                    icon: "sports_soccer",
                    color: "error",
                  },
                  {
                    id: "glove",
                    label: "Golden Glove",
                    icon: "front_hand",
                    color: "primary",
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAwardTab(tab.id as any)}
                    className={`min-w-[120px] lg:min-w-0 flex-1 flex items-center justify-center gap-2 lg:gap-3 py-3 lg:py-4 px-4 rounded-lg font-headline font-black uppercase tracking-widest text-[10px] lg:text-xs transition-all snap-center whitespace-nowrap ${
                      activeAwardTab === tab.id
                        ? `bg-${tab.color} text-on-${tab.color} shadow-lg shadow-${tab.color}/20`
                        : "text-outline-variant hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="material-symbols-outlined text-base lg:text-lg">
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-12">
                {activeAwardTab === "mvp" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <MasterDetailAward
                      title="Golden Ball (Tournament MVP)"
                      awardType="goldenBall"
                      candidates={GOLDEN_BALL_CANDIDATES}
                      selectedId={selectedMvpCandidate}
                      setSelectedId={setSelectedMvpCandidate}
                      selectedValue={awards.mvp}
                      onSelect={(v: string) =>
                        setAwards((prev) => ({ ...prev, mvp: v }))
                      }
                      accentColor="secondary"
                      isLocked={isLocked}
                    />
                  </motion.div>
                )}

                {activeAwardTab === "boot" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <MasterDetailAward
                      title="Golden Boot (Top Scorer)"
                      awardType="goldenBoot"
                      candidates={GOLDEN_BOOT_CANDIDATES}
                      selectedId={selectedBootCandidate}
                      setSelectedId={setSelectedBootCandidate}
                      selectedValue={awards.goldenBoot}
                      onSelect={(v: string) =>
                        setAwards((prev) => ({ ...prev, goldenBoot: v }))
                      }
                      accentColor="error"
                      isLocked={isLocked}
                    />
                  </motion.div>
                )}

                {activeAwardTab === "glove" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <MasterDetailAward
                      title="Golden Glove (Best GK)"
                      awardType="goldenGlove"
                      candidates={GOLDEN_GLOVE_CANDIDATES}
                      selectedId={selectedGloveCandidate}
                      setSelectedId={setSelectedGloveCandidate}
                      selectedValue={awards.goldenGlove}
                      onSelect={(v: string) =>
                        setAwards((prev) => ({ ...prev, goldenGlove: v }))
                      }
                      accentColor="primary"
                      isLocked={isLocked}
                    />
                  </motion.div>
                )}

                {/* Final Submission */}
                <div className="flex flex-col items-center gap-8 pt-12 border-t border-white/10">
                  <div className="text-center">
                    <h3 className="text-2xl font-headline font-black uppercase tracking-tight text-white mb-2">
                      Ready to lock it in?
                    </h3>
                    <p className="text-on-surface-variant max-w-md">
                      Once you lock your predictions, they are verified on the
                      global leaderboard and cannot be changed.
                    </p>
                  </div>

                  <button
                    disabled={
                      isLocked ||
                      !awards.mvp ||
                      !awards.goldenBoot ||
                      !awards.goldenGlove
                    }
                    onClick={() => {
                      if (isLocked) return;
                      setIsLocked(true);
                      toast.success("Picks locked in! Good luck!");
                    }}
                    className={`px-12 py-6 rounded-sm font-headline font-black uppercase tracking-widest text-xl transition-all shadow-2xl flex items-center gap-4 ${
                      isLocked
                        ? "bg-success/20 text-success border border-success/30 cursor-default"
                        : "bg-primary text-on-primary hover:bg-primary/90 hover:scale-105 active:scale-95"
                    } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                  >
                    {isLocked ? (
                      <>
                        <span className="material-symbols-outlined text-3xl">
                          verified
                        </span>
                        PREDICTIONS LOCKED
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-3xl">
                          lock
                        </span>
                        LOCK PREDICTIONS
                      </>
                    )}
                  </button>

                  {!isLocked &&
                    (!awards.mvp ||
                      !awards.goldenBoot ||
                      !awards.goldenGlove) && (
                      <p className="text-error text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">
                          warning
                        </span>
                        Please select all three award winners to lock
                      </p>
                    )}

                  <button
                    onClick={() => setStep(3)}
                    className="text-outline-variant font-bold hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-lg">
                      group
                    </span>{" "}
                    View Global Leaderboard
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto duration-500"
            >
              <header className="flex justify-between items-center mb-10">
                <div>
                  <h1 className="text-4xl font-headline font-black uppercase tracking-tighter text-white">
                    Global Leaderboard
                  </h1>
                  <p className="text-on-surface-variant mt-2">
                    See predictions from across the family network.
                  </p>
                </div>
                <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-xl border border-white/10 shadow-md">
                  <span className="material-symbols-outlined text-primary">
                    group
                  </span>
                  <span className="font-bold text-white">
                    {allUsersPicks.length} Participants
                  </span>
                </div>
              </header>

              <div className="grid gap-4">
                {allUsersPicks
                  .sort((a, b) => {
                    if (a.id === user.uid) return -1;
                    if (b.id === user.uid) return 1;
                    // Sort by potential points first
                    const aPts = a.potentialPoints || 0;
                    const bPts = b.potentialPoints || 0;
                    if (bPts !== aPts) return bPts - aPts;

                    // Sort by favorite team if matches logged in user
                    const myTeams = profile?.favoriteTeams?.length
                      ? profile.favoriteTeams
                      : profile?.favoriteTeam
                        ? [profile.favoriteTeam]
                        : [];
                    const aTeams = a.favoriteTeams?.length
                      ? a.favoriteTeams
                      : a.favoriteTeam
                        ? [a.favoriteTeam]
                        : [];
                    const bTeams = b.favoriteTeams?.length
                      ? b.favoriteTeams
                      : b.favoriteTeam
                        ? [b.favoriteTeam]
                        : [];
                    const aHasTeam = aTeams.some((t: string) =>
                      myTeams.includes(t),
                    );
                    const bHasTeam = bTeams.some((t: string) =>
                      myTeams.includes(t),
                    );
                    if (aHasTeam && !bHasTeam) return -1;
                    if (bHasTeam && !aHasTeam) return 1;
                    // Sort by favorite club if matches logged in user
                    const myClubs = profile?.favoriteClubs?.length
                      ? profile.favoriteClubs
                      : profile?.favoriteClub
                        ? [profile.favoriteClub]
                        : [];
                    const aClubs = a.favoriteClubs?.length
                      ? a.favoriteClubs
                      : a.favoriteClub
                        ? [a.favoriteClub]
                        : [];
                    const bClubs = b.favoriteClubs?.length
                      ? b.favoriteClubs
                      : b.favoriteClub
                        ? [b.favoriteClub]
                        : [];
                    const aHasClub = aClubs.some((c: string) =>
                      myClubs.includes(c),
                    );
                    const bHasClub = bClubs.some((c: string) =>
                      myClubs.includes(c),
                    );
                    if (aHasClub && !bHasClub) return -1;
                    if (bHasClub && !aHasClub) return 1;
                    return b.updatedAt - a.updatedAt;
                  })
                  .map((p, idx) => (
                    <ParticipantCard
                      key={p.id}
                      p={p}
                      isCurrentUser={p.id === user.uid}
                      currentUserPickData={allUsersPicks.find(
                        (u) => u.id === user?.uid,
                      )}
                      onBadgeInfoClick={() => setShowBadgeGuide(true)}
                    />
                  ))}
              </div>
            </motion.div>
          )}

          {step === 4 && <ScoutingHub />}
        </AnimatePresence>
      </main>

      {/* Badge Guide Modal */}
      <BadgeGuideModal
        isOpen={showBadgeGuide}
        onClose={() => setShowBadgeGuide(false)}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentStep={step} setStep={setStep} />
    </div>
  );
}

// --- SUBCOMPONENTS ---

const BADGE_DEFINITIONS = [
  {
    id: "early_bird",
    name: "Early Bird",
    icon: "schedule",
    color: "#3b82f6",
    desc: "Mission Priority: Lock your bracket before the tournament kicks off.",
  },
  {
    id: "world_traveler",
    name: "World Traveler",
    icon: "flight_takeoff",
    color: "#10b981",
    desc: "Global Presence: Select 3 or more favorite clubs in your tactical profile.",
  },
  {
    id: "the_homer",
    name: "The Homer",
    icon: "home",
    color: "#f59e0b",
    desc: "Home Advantage: Predict your own nationality or favorite team as World Champions.",
  },
  {
    id: "the_chalk",
    name: "The Chalk",
    icon: "draw",
    color: "#a855f7",
    desc: "Safe Bet: Predict a top 5 FIFA-ranked nation to take the title.",
  },
];

const BadgeGuideModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-surface-container-low border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-headline font-black uppercase text-white tracking-tighter">
                  Scout's Badge Guide
                </h3>
                <p className="text-[10px] text-outline-variant font-bold uppercase tracking-widest mt-1">
                  How to earn your Elite Merits
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                title="Close"
              >
                <span className="material-symbols-outlined text-outline-variant">
                  close
                </span>
              </button>
            </div>

            <div className="space-y-4">
              {BADGE_DEFINITIONS.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-surface-container-highest/30 border border-white/5 p-4 rounded-2xl flex items-center gap-4 group hover:border-white/10 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner"
                    style={{ backgroundColor: `${badge.color}10` }}
                  >
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ color: badge.color }}
                    >
                      {badge.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-headline font-black text-white uppercase tracking-tight">
                      {badge.name}
                    </h4>
                    <p className="text-xs text-on-surface-variant font-medium leading-relaxed mt-0.5">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-outline-variant font-medium text-center mt-8 px-4">
              Your scouting style and tactical boldness are immortalized through these merits. More rewards coming soon as the tournament unfolds.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const MobileScoutCard = ({
  team,
  onClose,
}: {
  team: string | null;
  onClose: () => void;
}) => {
  if (!team) return null;
  const info = TEAM_INFO[team];

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      style={{ zIndex: 1000 }}
      className="fixed inset-0 flex items-end justify-center lg:hidden"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full bg-surface-container-highest rounded-t-[2.5rem] border-t border-white/10 p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Dragon Scale Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBG-FJt1_KW7fjiGClQqNXst_RT4vJC2bRbOCI3kHZaoLsVjxdViFc22M0IjU90j9xL6C7zbnfo9lsQyDmmhGfFV-aC4KkZl5G4XiGFce0mhLIsHONcevHQOKhBhxiFhLj6WMkONDTnQ84NzEIjvbMIpH8nO51LIiCLAzhLWk3yhgU9rt9Zd_oEctZGAnb6PJEiO-9fzjZPwS0IiucK5wIHsPRtrPMxQQWzKKBC-TTT7osf748fkgu5LQ5hVnRFtVH_8HzmXVQAWr3V')",
          }}
        ></div>

        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <img
                src={`https://flagcdn.com/w160/${info.code}.png`}
                className="w-16 h-10 object-cover rounded shadow-lg border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-3xl font-headline font-black uppercase text-white tracking-tighter leading-none mb-1">
                  {team}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">
                    FIFA Rank #{info.ranking}
                  </span>
                  <div className="flex gap-1">
                    {info.form?.split("").map((f: string, i: number) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${f === "W" ? "bg-success" : f === "D" ? "bg-amber-400" : "bg-error"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-outline-variant active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
              <span className="text-[9px] font-bold text-outline-variant uppercase tracking-widest block mb-1 opacity-60">
                Scoring
              </span>
              <span className="text-xl font-headline font-black text-white">
                {info.scoringPower}%
              </span>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
              <span className="text-[9px] font-bold text-outline-variant uppercase tracking-widest block mb-1 opacity-60">
                Defense
              </span>
              <span className="text-xl font-headline font-black text-white">
                {info.theWall}%
              </span>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
              <span className="text-[9px] font-bold text-outline-variant uppercase tracking-widest block mb-1 opacity-60">
                Control
              </span>
              <span className="text-xl font-headline font-black text-white">
                {info.control}%
              </span>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <h4 className="text-[10px] font-headline font-black text-secondary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                visibility
              </span>{" "}
              Mission Intel
            </h4>
            <p className="text-[13px] font-medium text-on-surface-variant leading-relaxed italic border-l-2 border-primary/30 pl-4 py-1">
              "{info.description}"
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-outline-variant uppercase tracking-widest opacity-60">
                Talisman
              </span>
              <span className="text-sm font-headline font-black text-white uppercase">
                {info.watch}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-outline-variant uppercase tracking-widest opacity-60">
                Key Stat
              </span>
              <span className="text-sm font-black text-primary uppercase italic">
                {info.stat}
              </span>
            </div>
          </div>

          <div className="pb-8" />
        </div>
      </div>
    </motion.div>
  );
};

const MobileBottomNav = ({
  currentStep,
  setStep,
}: {
  currentStep: number;
  setStep: (s: number) => void;
}) => {
  const steps = [
    { id: 0, label: "Groups", icon: "grid_view" },
    { id: 1, label: "Knockout", icon: "account_tree" },
    { id: 2, label: "Awards", icon: "military_tech" },
    { id: 3, label: "Leaderboard", icon: "group" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-[100] px-4 pb-4">
      <div className="glass-card border border-white/10 rounded-full flex items-center justify-between p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        {steps.map((s) => {
          const isActive = Math.floor(currentStep) === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-full transition-all duration-300 relative ${
                isActive
                  ? "text-primary"
                  : "text-outline-variant hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary-container/20 rounded-full border border-primary/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`material-symbols-outlined text-xl relative z-10 ${isActive ? "fill-1" : ""}`}
              >
                {s.icon}
              </span>
              <span className="text-[8px] font-black uppercase tracking-widest relative z-10">
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

const GroupIntelligenceHub = ({ group, insight, onClose }: any) => {
  const chartData = group.teams.map((team: string) => {
    const info = TEAM_INFO[team] || TEAM_INFO["TBD"];
    return {
      name: team,
      scoring: info.scoringPower,
      defense: info.theWall,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-[100] bg-surface-container-highest/95 backdrop-blur-xl p-6 flex flex-col overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h4 className="font-headline font-black text-white uppercase tracking-tight">
            Group {group.id} Intelligence
          </h4>
        </div>
        <button
          onClick={onClose}
          className="text-outline-variant hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Chart */}
        <div className="h-48 w-full bg-white/5 rounded-xl p-4 border border-white/5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
                itemStyle={{ fontSize: "10px" }}
              />
              <Bar
                dataKey="scoring"
                fill="#4ade80"
                radius={[4, 4, 0, 0]}
                name="Scoring"
              />
              <Bar
                dataKey="defense"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="Defense"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Odds Table */}
        <div className="glass-card border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left text-[10px]">
            <thead className="bg-white/5">
              <tr>
                <th className="px-3 py-2 font-black uppercase text-outline-variant">
                  Team
                </th>
                <th className="px-3 py-2 font-black uppercase text-outline-variant">
                  Odds
                </th>
                <th className="px-3 py-2 font-black uppercase text-outline-variant">
                  Chance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {group.teams.map((team: string) => {
                const odds = insight.fullOdds[team] || "N/A";
                const isFavorite = insight.favorite === team;
                return (
                  <tr key={team} className={isFavorite ? "bg-primary/5" : ""}>
                    <td className="px-3 py-2 font-bold text-white">{team}</td>
                    <td className="px-3 py-2 font-mono text-amber-400">
                      {odds}
                    </td>
                    <td className="px-3 py-2 font-bold text-outline-variant">
                      {isFavorite ? insight.impliedChance : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Novice Verdict */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-amber-400 text-sm">
              lightbulb
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              Novice Verdict
            </span>
          </div>
          <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed">
            {insight.noviceTakeaway}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const GroupCard = ({
  group,
  selections,
  onClick,
  isLocked,
  onScoutClick,
}: any) => {
  const [showIntel, setShowIntel] = useState(false);
  const isGroupOfDeath = GROUP_OF_DEATH === group.id;
  const isEasiestPath = EASIEST_PATH === group.id;
  const insight = GROUP_INSIGHTS[group.id];

  const progress = (selections.length / 2) * 100;

  return (
    <div
      id={`group-${group.id}`}
      className={`glass-card border rounded-2xl hover:border-white/20 transition-all shadow-lg flex flex-col h-full relative group/card overflow-hidden ${
        isGroupOfDeath
          ? "border-error/30 bg-gradient-to-b from-error/5 to-transparent"
          : isEasiestPath
            ? "border-success/30 bg-gradient-to-b from-success/5 to-transparent"
            : "border-white/10"
      }`}
    >
      {/* Selection Progress Bar */}
      <div className="absolute top-0 left-0 h-0.5 bg-white/10 w-full z-20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={`h-full transition-colors duration-500 ${progress === 100 ? "bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-primary"}`}
        />
      </div>

      {isGroupOfDeath && (
        <div className="absolute top-0 left-0 w-full bg-error/20 border-b border-error/30 text-error text-[10px] font-bold uppercase tracking-widest text-center py-1 z-10">
          🔥 Group of Death
        </div>
      )}
      {isEasiestPath && (
        <div className="absolute top-0 left-0 w-full bg-success/20 border-b border-success/30 text-success text-[10px] font-bold uppercase tracking-widest text-center py-1 z-10">
          🍀 Easiest Path
        </div>
      )}

      <div
        className={`bg-surface-container-highest/50 px-6 py-5 border-b border-white/5 flex justify-between items-center ${isGroupOfDeath || isEasiestPath ? "pt-8" : ""}`}
      >
        <div className="flex items-center gap-3">
          <h3 className="font-headline font-black text-primary uppercase text-lg tracking-tight">
            GROUP {group.id}
          </h3>

          {/* Predictability Meter (Integrated into Title) */}
          {insight && (
            <div className="flex gap-0.5 ml-1">
              {[1, 2, 3].map((bar) => {
                const isActive = bar <= insight.predictability;
                const color =
                  insight.predictability === 3
                    ? "bg-blue-400"
                    : insight.predictability === 1
                      ? "bg-error"
                      : "bg-amber-400";
                return (
                  <div
                    key={bar}
                    className={`w-2 h-1 rounded-full transition-all duration-500 ${isActive ? color : "bg-white/10"}`}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Scout Intel Button */}
          <button
            onClick={() => setShowIntel(true)}
            className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all group/intel relative"
          >
            <BarChart3 className="w-4 h-4" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
          </button>

          <button
            onClick={() => onClick("RESET")}
            disabled={isLocked || selections.length === 0}
            className="w-8 h-8 rounded-lg bg-surface-container border border-white/5 flex items-center justify-center text-outline-variant hover:text-error hover:border-error/30 transition-all disabled:opacity-0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2 flex-1">
        {group.teams.map((team: string) => {
          const rank = selections.indexOf(team) + 1;
          const info = TEAM_INFO[team] || TEAM_INFO["TBD"];
          const isValuePick = insight?.valuePicks?.includes(team);
          const isFavorite = insight?.favorite === team;

          return (
            <div key={team} className="group/team relative">
              <div
                role="button"
                tabIndex={isLocked ? -1 : 0}
                onClick={() => !isLocked && onClick(team)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 font-bold ${
                  isLocked
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer active:scale-[0.98]"
                } ${
                  rank > 0
                    ? rank === 1
                      ? "bg-secondary/10 border-secondary/40 text-white"
                      : "bg-primary/10 border-primary/40 text-white"
                    : "bg-surface-container/40 border-transparent hover:bg-surface-container hover:border-white/10 text-outline-variant"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={`https://flagcdn.com/w40/${info.code}.png`}
                      alt={team}
                      className="w-8 h-5 object-cover rounded shadow-sm border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[100px] text-sm">
                        {team}
                      </span>
                      {isValuePick && (
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
                      )}
                    </div>
                    {/* Team Sparkline (Form) */}
                    <div className="flex gap-0.5">
                      {info.form?.split("").map((f: string, idx: number) => (
                        <div
                          key={idx}
                          className={`w-1 h-1 rounded-full ${
                            f === "W"
                              ? "bg-success"
                              : f === "D"
                                ? "bg-amber-400"
                                : "bg-error"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile Scout Trigger */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onScoutClick(team);
                    }}
                    title="Scout Intel"
                    className="lg:hidden p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-on-primary transition-all active:scale-90"
                  >
                    <span className="material-symbols-outlined text-sm font-black">
                      visibility
                    </span>
                  </button>

                  {isFavorite && (
                    <span className="text-[8px] font-black text-primary/70 uppercase tracking-tighter bg-primary/5 px-1 rounded">
                      {insight.impliedChance}
                    </span>
                  )}
                  {rank > 0 && (
                    <span
                      className={`text-[9px] font-headline font-black uppercase px-2 py-1 rounded-sm ${rank === 1 ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary"}`}
                    >
                      {rank === 1 ? "1st" : "2nd"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inline Scout's Take Footer */}
      {insight && (
        <div className="px-4 py-3 bg-surface-container-highest/30 border-t border-white/5 mt-auto">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">
              psychology
            </span>
            <p className="text-[10px] font-medium text-on-surface-variant leading-tight">
              <span className="font-black text-white uppercase tracking-tighter mr-1">
                Scout's Take:
              </span>
              {insight.scoutNote}
            </p>
          </div>
        </div>
      )}

      {/* Intelligence Hub Overlay */}
      <AnimatePresence>
        {showIntel && (
          <GroupIntelligenceHub
            group={group}
            insight={insight}
            onClose={() => setShowIntel(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SmartMatchCard = ({
  match,
  bracket,
  advance,
  isLocked,
  index,
  showScoutOverlay,
}: any) => {
  const winner = bracket[match.nextId];
  const teamA = match.teamA;
  const teamB = match.teamB;
  const infoA = TEAM_INFO[teamA] || TEAM_INFO["TBD"];
  const infoB = TEAM_INFO[teamB] || TEAM_INFO["TBD"];

  const isFavoriteA = TOURNAMENT_FAVORITES.includes(teamA);
  const isFavoriteB = TOURNAMENT_FAVORITES.includes(teamB);

  // Mock H2H stats based on team names to make it deterministic but varied
  const getH2H = (t1: string, t2: string) => {
    if (t1 === "TBD" || t2 === "TBD") return null;
    const hash = (t1.charCodeAt(0) + t2.charCodeAt(0)) % 5;
    const stats = [
      { t1Wins: 2, draws: 1, t2Wins: 0, lastMeeting: "2022 World Cup" },
      { t1Wins: 0, draws: 2, t2Wins: 3, lastMeeting: "2018 Friendly" },
      { t1Wins: 1, draws: 1, t2Wins: 1, lastMeeting: "2024 Nations League" },
      { t1Wins: 5, draws: 0, t2Wins: 1, lastMeeting: "2014 World Cup" },
      { t1Wins: 0, draws: 0, t2Wins: 0, lastMeeting: "First Meeting" },
    ];
    return stats[hash];
  };

  const h2h = getH2H(teamA, teamB);

  const biasA =
    teamA !== "TBD" && teamB !== "TBD"
      ? Math.round(
          ((100 - (infoA.ranking || 100)) /
            (100 - (infoA.ranking || 100) + (100 - (infoB.ranking || 100)))) *
            100,
        )
      : 50;
  const biasB = 100 - biasA;

  const rankDiff = Math.abs((infoA.ranking || 100) - (infoB.ranking || 100));
  const favoredTeam =
    (infoA.ranking || 100) < (infoB.ranking || 100) ? teamA : teamB;
  const isUpset =
    winner && winner !== "TBD" && winner !== favoredTeam && rankDiff >= 10;

  // Find Talisman image if it exists in PLAYERS
  const getTalismanImg = (playerName: string) => {
    const allPlayers = [
      ...PLAYERS.goldenBall,
      ...PLAYERS.goldenBoot,
      ...PLAYERS.goldenGlove,
    ];
    return allPlayers.find((p) => p.name === playerName)?.image;
  };

  const talismanImgA = getTalismanImg(infoA.watch);
  const talismanImgB = getTalismanImg(infoB.watch);

  return (
    <div
      className={`glass-card border rounded-xl flex flex-col shadow-lg relative transition-all duration-500 ${
        showScoutOverlay && (isFavoriteA || isFavoriteB)
          ? "border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          : "border-white/10"
      }`}
    >
      {isUpset && (
        <div className="absolute top-0 left-0 w-full bg-error/20 border-b border-error/30 text-error text-[10px] font-bold uppercase tracking-widest text-center py-1 z-20 rounded-t-xl">
          🔥 Upset Pick
        </div>
      )}

      {showScoutOverlay && (isFavoriteA || isFavoriteB) && (
        <div className="absolute -top-3 -left-3 bg-amber-500 text-black text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-xl z-30 animate-bounce">
          Favorite Path
        </div>
      )}
      <div
        className={`bg-surface-container-highest/50 px-4 py-2 border-b border-white/5 flex justify-between items-center ${isUpset ? "pt-6" : ""}`}
      >
        <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">
          Match {index}
        </span>
        {teamA !== "TBD" && teamB !== "TBD" && rankDiff > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-outline-variant uppercase tracking-widest bg-surface-container px-2 py-0.5 rounded-sm">
              FIFA Gap: {rankDiff}
            </span>
            {showScoutOverlay && (
              <span
                className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm ${rankDiff > 15 ? "bg-error/20 text-error animate-pulse" : "bg-success/20 text-success"}`}
              >
                {rankDiff > 15 ? "RISK HIGH" : "STABLE"}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <button
          disabled={isLocked || teamA === "TBD" || teamB === "TBD"}
          onClick={() => advance(match.nextId, teamA)}
          className={`p-4 flex items-center justify-between transition-all duration-300 group/team relative text-left min-h-[90px] border-b border-white/5 ${
            winner === teamA
              ? "bg-primary-container/20"
              : "hover:bg-surface-container-highest/80"
          } ${showScoutOverlay && isFavoriteA ? "bg-amber-500/10" : ""}`}
        >
          {winner === teamA && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-20" />
          )}
          {showScoutOverlay && isFavoriteA && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 z-30" />
          )}

          <div className="flex items-center gap-4 relative z-10 w-full pr-8">
            <div className="relative shrink-0">
              {teamA !== "TBD" && (
                <img
                  src={`https://flagcdn.com/w40/${infoA.code}.png`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/10 shadow-lg"
                  referrerPolicy="no-referrer"
                />
              )}
              {talismanImgA && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border border-white/20 overflow-hidden bg-surface-container shadow-md">
                  <img
                    src={talismanImgA}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col items-start w-full">
              <div className="flex items-center justify-between w-full gap-2 font-headline font-black uppercase tracking-tight">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg ${
                      winner === teamA
                        ? "text-primary"
                        : teamA === "TBD"
                          ? "text-outline-variant"
                          : "text-white"
                    } ${showScoutOverlay && isFavoriteA ? "text-amber-400" : ""}`}
                  >
                    {teamA}
                  </span>
                  {showScoutOverlay && isFavoriteA && (
                    <span className="material-symbols-outlined text-amber-500 text-sm animate-pulse">
                      stars
                    </span>
                  )}
                </div>
              </div>
              {teamA !== "TBD" && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-outline-variant">
                    {infoA.watch}
                  </span>
                  <div className="flex gap-0.5">
                    {infoA.form?.split("").map((f: any, i: number) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${f === "W" ? "bg-success" : f === "D" ? "bg-amber-400" : "bg-error"}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {winner === teamA && (
            <CheckCircle2 className="w-6 h-6 text-primary relative z-10 shrink-0 absolute right-4 drop-shadow-[0_0_8px_rgba(var(--color-primary),0.5)]" />
          )}

          {/* Stats Tooltip */}
          {teamA !== "TBD" && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-80 glass-card border border-white/10 rounded-2xl p-6 opacity-0 pointer-events-none group-hover/team:opacity-100 group-hover/team:pointer-events-auto transition-all duration-300 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hidden md:block translate-y-2 group-hover/team:translate-y-0 text-left after:content-[''] after:absolute after:top-full after:left-0 after:right-0 after:h-4">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://flagcdn.com/w80/${infoA.code}.png`}
                    alt=""
                    className="w-8 h-5 object-cover rounded-sm shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-sm font-headline font-black uppercase tracking-tight text-white block leading-none mb-1">
                      {teamA}
                    </span>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      FIFA Rank #{infoA.ranking}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-bold text-outline-variant uppercase tracking-widest mb-1">
                    Watch
                  </p>
                  <p className="text-[10px] font-headline font-black text-secondary uppercase">
                    {infoA.watch}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {infoA.description && (
                  <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed italic border-l-2 border-primary/30 pl-3 py-1">
                    "{infoA.description}"
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[9px] font-bold text-outline-variant uppercase tracking-widest">
                          Scoring Power
                        </p>
                        <span className="text-[10px] font-headline font-black text-white">
                          {infoA.scoringPower}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${infoA.scoringPower}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[9px] font-bold text-outline-variant uppercase tracking-widest">
                          The Wall
                        </p>
                        <span className="text-[10px] font-headline font-black text-white">
                          {infoA.theWall}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary"
                          style={{ width: `${infoA.theWall}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-highest/30 rounded-xl p-3 border border-white/5">
                    <p className="text-[8px] font-bold text-outline-variant uppercase tracking-widest mb-2">
                      Scouting Note
                    </p>
                    <p className="text-[10px] font-bold text-white leading-tight">
                      {infoA.scoringPower > 85
                        ? "Lethal attack."
                        : infoA.theWall > 85
                          ? "Elite defense."
                          : "Balanced squad."}
                      {infoA.control > 85
                        ? " Controls the pace."
                        : " Fast transitions."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </button>

        {/* Bento-Style Match Intel Divider (Hidden on Mobile) */}
        {teamA !== "TBD" && teamB !== "TBD" && (
          <div className="hidden md:flex px-4 py-2 bg-surface-container-highest/20 items-center justify-between border-y border-white/5 overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-outline uppercase tracking-wider">
                  H2H History
                </span>
                <span className="text-[10px] font-black text-white">
                  {h2h?.t1Wins}-{h2h?.draws}-{h2h?.t2Wins}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {showScoutOverlay && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-surface-container rounded border border-white/5">
                  <TrendingUp className="w-3 h-3 text-secondary" />
                  <span className="text-[9px] font-black text-secondary uppercase italic">
                    Trending
                  </span>
                </div>
              )}
              <div className="h-4 w-px bg-white/10" />
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold text-outline uppercase tracking-wider">
                  Global Bias
                </span>
                <div className="w-12 h-1 bg-white/10 rounded-full mt-0.5 overflow-hidden">
                  <div
                    className="h-full bg-primary/50"
                    style={{
                      width: `${100 - ((infoA.ranking + infoB.ranking) % 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile-Optimized Match Intel Accordion */}
        {teamA !== "TBD" && teamB !== "TBD" && (
          <div className="md:hidden border-b border-white/5">
            <details className="group/intel">
              <summary className="flex items-center justify-between p-3 bg-white/[0.03] list-none cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    analytics
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-outline-variant">
                    Match Intel
                  </span>
                </div>
                <span className="material-symbols-outlined text-lg text-outline-variant group-open/intel:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="p-4 bg-white/[0.01] space-y-4">
                {/* Bias Meter */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-bold text-outline uppercase tracking-widest">
                    <span>{teamA} Bias</span>
                    <span>{teamB} Bias</span>
                  </div>
                  <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-1000 ${biasA > 50 ? "bg-primary" : biasA < 40 ? "bg-error" : "bg-white/20"}`}
                      style={{ width: `${biasA}%` }}
                    />
                    <div
                      className={`h-full transition-all duration-1000 ${biasB > 50 ? "bg-secondary" : biasB < 40 ? "bg-error" : "bg-white/20"}`}
                      style={{ width: `${biasB}%` }}
                    />
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-background z-10" />
                  </div>
                </div>

                {/* H2H Mini Grid */}
                {h2h && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[8px] font-bold text-outline-variant uppercase block mb-1 opacity-60">
                        H2H History
                      </span>
                      <span className="text-[10px] font-headline font-black text-white">
                        {h2h.t1Wins}W - {h2h.draws}D - {h2h.t2Wins}W
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[8px] font-bold text-outline-variant uppercase block mb-1 opacity-60">
                        Last Meeting
                      </span>
                      <span className="text-[10px] font-headline font-black text-white truncate">
                        {h2h.lastMeeting}
                      </span>
                    </div>
                  </div>
                )}

                {showScoutOverlay && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                    <p className="text-[10px] font-bold text-amber-400 leading-tight flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs">
                        visibility
                      </span>
                      {favoredTeam} is the scouting favorite by a {rankDiff}{" "}
                      rank margin.
                    </p>
                  </div>
                )}
              </div>
            </details>
          </div>
        )}

        <button
          disabled={isLocked || teamA === "TBD" || teamB === "TBD"}
          onClick={() => advance(match.nextId, teamB)}
          className={`p-4 flex items-center justify-between transition-all duration-300 group/team relative text-left min-h-[90px] border-b border-white/5 ${
            winner === teamB
              ? "bg-primary-container/20"
              : "hover:bg-surface-container-highest/80"
          } ${showScoutOverlay && isFavoriteB ? "bg-amber-500/10" : ""}`}
        >
          {winner === teamB && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-20 shadow-[0_0_10px_rgba(var(--color-primary),0.5)]" />
          )}
          {showScoutOverlay && isFavoriteB && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 z-30" />
          )}

          <div className="flex items-center gap-4 relative z-10 w-full pr-8">
            <div className="relative shrink-0">
              {teamB !== "TBD" && (
                <img
                  src={`https://flagcdn.com/w40/${infoB.code}.png`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/10 shadow-lg"
                  referrerPolicy="no-referrer"
                />
              )}
              {talismanImgB && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border border-white/20 overflow-hidden bg-surface-container shadow-md">
                  <img
                    src={talismanImgB}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col items-start w-full">
              <div className="flex items-center justify-between w-full gap-2 font-headline font-black uppercase tracking-tight">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg ${
                      winner === teamB
                        ? "text-primary"
                        : teamB === "TBD"
                          ? "text-outline-variant"
                          : "text-white"
                    } ${showScoutOverlay && isFavoriteB ? "text-amber-400" : ""}`}
                  >
                    {teamB}
                  </span>
                  {showScoutOverlay && isFavoriteB && (
                    <span className="material-symbols-outlined text-amber-500 text-sm animate-pulse">
                      stars
                    </span>
                  )}
                </div>
              </div>
              {teamB !== "TBD" && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-outline-variant">
                    {infoB.watch}
                  </span>
                  <div className="flex gap-0.5">
                    {infoB.form?.split("").map((f: any, i: number) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${f === "W" ? "bg-success" : f === "D" ? "bg-amber-400" : "bg-error"}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {winner === teamB && (
            <CheckCircle2 className="w-6 h-6 text-primary relative z-10 shrink-0 absolute right-4 drop-shadow-[0_0_8px_rgba(var(--color-primary),0.5)]" />
          )}

          {/* Stats Tooltip */}
          {teamB !== "TBD" && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-80 glass-card border border-white/10 rounded-2xl p-6 opacity-0 pointer-events-none group-hover/team:opacity-100 group-hover/team:pointer-events-auto transition-all duration-300 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hidden md:block translate-y-2 group-hover/team:translate-y-0 text-left after:content-[''] after:absolute after:top-full after:left-0 after:right-0 after:h-4">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://flagcdn.com/w80/${infoB.code}.png`}
                    alt=""
                    className="w-8 h-5 object-cover rounded-sm shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-sm font-headline font-black uppercase tracking-tight text-white block leading-none mb-1">
                      {teamB}
                    </span>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      FIFA Rank #{infoB.ranking}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-bold text-outline-variant uppercase tracking-widest mb-1">
                    Watch
                  </p>
                  <p className="text-[10px] font-headline font-black text-secondary uppercase">
                    {infoB.watch}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {infoB.description && (
                  <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed italic border-l-2 border-primary/30 pl-3 py-1">
                    "{infoB.description}"
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[9px] font-bold text-outline-variant uppercase tracking-widest">
                          Scoring Power
                        </p>
                        <span className="text-[10px] font-headline font-black text-white">
                          {infoB.scoringPower}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${infoB.scoringPower}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[9px] font-bold text-outline-variant uppercase tracking-widest">
                          The Wall
                        </p>
                        <span className="text-[10px] font-headline font-black text-white">
                          {infoB.theWall}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary"
                          style={{ width: `${infoB.theWall}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-highest/30 rounded-xl p-3 border border-white/5">
                    <p className="text-[8px] font-bold text-outline-variant uppercase tracking-widest mb-2">
                      Scouting Note
                    </p>
                    <p className="text-[10px] font-bold text-white leading-tight">
                      {infoB.scoringPower > 85
                        ? "Lethal attack."
                        : infoB.theWall > 85
                          ? "Elite defense."
                          : "Balanced squad."}
                      {infoB.control > 85
                        ? " Controls the pace."
                        : " Fast transitions."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

const SharePreview = ({
  isOpen,
  onClose,
  userId,
  bracket,
  awards,
  qualifiers,
}: any) => {
  if (!isOpen) return null;

  const champion = bracket["champion"];
  const championInfo = TEAM_INFO[champion] || TEAM_INFO["TBD"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/90 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative glass-card border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/20 to-transparent" />

        <div className="p-8 relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-headline font-black uppercase text-white tracking-tighter">
                Prediction Card
              </h3>
              <p className="text-outline-variant text-xs font-bold uppercase tracking-widest">
                World Cup 2026
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-outline-variant">
                close
              </span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Champion Section */}
            <div className="bg-surface-container-highest/50 rounded-xl p-6 border border-white/5 text-center">
              <span className="text-[10px] font-headline font-black text-secondary uppercase tracking-[0.3em] block mb-4">
                My Champion
              </span>
              <div className="flex flex-col items-center gap-3">
                {champion !== "TBD" ? (
                  <>
                    <img
                      src={`https://flagcdn.com/w160/${championInfo.code}.png`}
                      alt=""
                      className="w-20 h-12 object-cover rounded-sm shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="text-3xl font-headline font-black uppercase text-white tracking-tighter">
                      {champion}
                    </h4>
                  </>
                ) : (
                  <div className="w-20 h-12 bg-surface-container-highest rounded-sm animate-pulse" />
                )}
              </div>
            </div>

            {/* Awards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-highest/50 rounded-xl p-4 border border-white/5">
                <span className="text-[8px] font-headline font-black text-error uppercase tracking-widest block mb-2">
                  Golden Boot
                </span>
                <p className="text-sm font-bold text-white truncate">
                  {awards.goldenBoot || "Not Selected"}
                </p>
              </div>
              <div className="bg-surface-container-highest/50 rounded-xl p-4 border border-white/5">
                <span className="text-[8px] font-headline font-black text-secondary uppercase tracking-widest block mb-2">
                  Golden Ball
                </span>
                <p className="text-sm font-bold text-white truncate">
                  {awards.goldenBall || "Not Selected"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-xs font-headline font-black text-on-primary">
                  {userId?.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-outline-variant">
                  @user_{userId?.slice(0, 5)}
                </span>
              </div>
              <button
                onClick={() => {
                  const url = `${window.location.origin}/share/${userId}`;
                  navigator.clipboard.writeText(url);
                  toast.success("Link copied to clipboard!");
                }}
                className="bg-primary hover:bg-primary-fixed text-on-primary hover:text-on-primary-fixed px-6 py-2 rounded-sm text-xs font-headline font-black uppercase transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">share</span>{" "}
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
const ScheduleView = () => {
  return (
    <motion.div
      key="schedule"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto space-y-12 pb-20 duration-500"
    >
      <header className="mb-10">
        <h1 className="text-4xl font-headline font-black uppercase tracking-tighter text-white">
          Tournament Schedule & Format
        </h1>
        <p className="text-on-surface-variant mt-2">
          Key details, match dates, and venues for the 2026 World Cup.
        </p>
      </header>

      {/* Format Section */}
      <section className="glass-card border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
        <h2 className="text-2xl font-headline font-black uppercase text-primary mb-8 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">info</span>{" "}
          Tournament Format
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-surface-container-highest/50 p-6 rounded-xl border border-white/5">
              <h3 className="text-sm font-headline font-black uppercase tracking-widest text-white mb-2">
                Group Stage
              </h3>
              <ul className="space-y-2 text-sm font-bold text-outline-variant">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />{" "}
                  12 groups of four teams each.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />{" "}
                  Each team plays three group-stage games in a round-robin
                  format.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />{" "}
                  32 teams qualify for the knockout stage: the top two teams
                  from each group, plus the eight best third-place teams.
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-highest/50 p-6 rounded-xl border border-white/5">
              <h3 className="text-sm font-headline font-black uppercase tracking-widest text-white mb-2">
                Knockout Stage
              </h3>
              <ul className="space-y-2 text-sm font-bold text-outline-variant">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />{" "}
                  5 knockout rounds: Round of 32, Round of 16, Quarter-finals,
                  Semi-finals, and Final.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />{" "}
                  Single-elimination bracket.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />{" "}
                  Ties after 90 mins go to 30 mins extra time, then penalty
                  shootout.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary-container/10 border border-primary/20 p-6 rounded-xl">
            <h3 className="text-sm font-headline font-black uppercase tracking-widest text-primary mb-4">
              Key Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <span className="text-xs font-bold text-outline-variant uppercase">
                  Total Teams
                </span>
                <span className="text-lg font-headline font-black text-white">
                  48
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <span className="text-xs font-bold text-outline-variant uppercase">
                  Total Matches
                </span>
                <span className="text-lg font-headline font-black text-white">
                  104
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <span className="text-xs font-bold text-outline-variant uppercase">
                  Duration
                </span>
                <span className="text-sm font-headline font-black text-white text-right">
                  39 days
                  <br />
                  <span className="text-[10px] text-outline-variant font-sans">
                    June 11 – July 19
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <span className="text-xs font-bold text-outline-variant uppercase">
                  Host Nations
                </span>
                <span className="text-sm font-headline font-black text-white text-right">
                  Canada, Mexico,
                  <br />
                  United States
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold text-outline-variant uppercase">
                  The Final
                </span>
                <span className="text-sm font-headline font-black text-secondary text-right">
                  July 19, 2026
                  <br />
                  <span className="text-[10px] text-secondary/70 font-sans">
                    MetLife Stadium, NJ
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="glass-card border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
        <h2 className="text-2xl font-headline font-black uppercase text-secondary mb-8 flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary">
            calendar_month
          </span>{" "}
          Match Schedule
        </h2>

        <div className="space-y-12">
          {/* Group Stage */}
          <div>
            <h3 className="text-xl font-headline font-black uppercase tracking-tight text-white mb-6 pb-2 border-b border-white/10">
              Group Stage
            </h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                {
                  date: "Thursday, June 11",
                  matches: [
                    "Group A: Mexico vs. South Africa (Mexico City), 1 p.m. local / 3 p.m. ET",
                    "Group A: South Korea vs. Czechia (Zapopan, Mexico), 8 p.m. local / 10 p.m. ET",
                  ],
                },
                {
                  date: "Friday, June 12",
                  matches: [
                    "Group B: Canada vs. Bosnia and Herzegovina (Toronto), 3 p.m. ET",
                    "Group D: United States vs. Paraguay (Inglewood, Calif.), 6 p.m. local / 9 p.m. ET",
                  ],
                },
                {
                  date: "Saturday, June 13",
                  matches: [
                    "Group B: Qatar vs. Switzerland (Santa Clara, Calif.), noon local / 3 p.m. ET",
                    "Group C: Brazil vs. Morocco (East Rutherford, New Jersey), 6 p.m. ET",
                    "Group C: Haiti vs. Scotland (Foxborough, Mass.), 9 p.m. ET",
                    "Group D: Australia vs. Türkiye (Vancouver, Canada), 9 p.m. local / 12 a.m. ET (June 14)",
                  ],
                },
                {
                  date: "Sunday, June 14",
                  matches: [
                    "Group E: Germany vs. Curaçao (Houston), noon local / 1 p.m. ET",
                    "Group F: Netherlands vs. Japan (Arlington, Texas), 3 p.m. local / 4 p.m. ET",
                    "Group E: Ivory Coast vs. Ecuador (Philadelphia), 7 p.m. ET",
                    "Group F: Sweden vs. Tunisia (Guadalupe, Mexico), 8 p.m. local / 10 p.m. ET",
                  ],
                },
                {
                  date: "Monday, June 15",
                  matches: [
                    "Group H: Spain vs. Cape Verde (Atlanta), noon local / 1 p.m. ET",
                    "Group G: Belgium vs. Egypt (Seattle), 3 p.m. local / 6 p.m. ET",
                    "Group H: Saudi Arabia vs. Uruguay (Miami Gardens, Fla.), 6 p.m. ET",
                    "Group G: Iran vs. New Zealand (Inglewood, Calif.), 9 p.m. local / 12 a.m. ET (June 16)",
                  ],
                },
                {
                  date: "Tuesday, June 16",
                  matches: [
                    "Group I: France vs. Senegal (East Rutherford, N.J.), 3 p.m. ET",
                    "Group I: Iraq vs. Norway (Foxborough, Mass.), 6 p.m. ET",
                    "Group J: Argentina vs. Algeria (Kansas City, Mo.), 8 p.m. local / 9 p.m. ET",
                    "Group J: Austria vs. Jordan (Santa Clara, Calif.), 9 p.m. local / 12 a.m. ET (June 17)",
                  ],
                },
                {
                  date: "Wednesday, June 17",
                  matches: [
                    "Group K: Portugal vs. DR Congo (Houston), noon local / 1 p.m. ET",
                    "Group L: England vs. Croatia (Arlington, Texas), 3 p.m. local / 4 p.m. ET",
                    "Group L: Ghana vs. Panama (Toronto), 7 p.m. ET",
                    "Group K: Uzbekistan vs. Colombia (Mexico City), 8 p.m. local / 10 p.m. ET",
                  ],
                },
                {
                  date: "Thursday, June 18",
                  matches: [
                    "Group A: Czechia vs. South Africa (Atlanta), noon ET",
                    "Group B: Switzerland vs. Bosnia and Herzegovina (Inglewood, Calif.), noon local / 3 p.m. ET",
                    "Group B: Canada vs. Qatar (Vancouver, Canada), 3 p.m. local / 6 p.m. ET",
                    "Group A: Mexico vs. South Korea (Zapopan, Mexico), 9 p.m. local / 11 p.m. ET",
                  ],
                },
                {
                  date: "Friday, June 19",
                  matches: [
                    "Group D: United States vs. Australia (Seattle), noon local / 3 p.m. ET",
                    "Group C: Scotland vs. Morocco (Foxborough, Mass.), 6 p.m. ET",
                    "Group C: Brazil vs. Haiti (Philadelphia), 9 p.m. ET",
                    "Group D: Türkiye vs. Paraguay (Santa Clara, Calif.), 9 p.m. local / 12 a.m. ET (June 20)",
                  ],
                },
                {
                  date: "Saturday, June 20",
                  matches: [
                    "Group F: Netherlands vs. Sweden (Houston), noon local / 1 p.m. ET",
                    "Group E: Germany vs. Ivory Coast (Toronto), 4 p.m. ET",
                    "Group E: Ecuador vs. Curaçao (Kansas City, Mo.), 7 p.m. local / 8 p.m. ET",
                    "Group F: Tunisia vs. Japan (Guadalupe, Mexico), 10 p.m. local / 12 a.m. ET (June 21)",
                  ],
                },
                {
                  date: "Sunday, June 21",
                  matches: [
                    "Group H: Spain vs. Saudi Arabia (Atlanta), noon ET",
                    "Group G: Belgium vs. Iran (Inglewood, Calif.), noon local / 3 p.m. ET",
                    "Group H: Uruguay vs. Cape Verde (Miami Gardens, Fla.), 6 p.m. ET",
                    "Group G: New Zealand vs. Egypt (Vancouver), 6 p.m. local / 9 p.m. ET",
                  ],
                },
                {
                  date: "Monday, June 22",
                  matches: [
                    "Group J: Argentina vs. Austria (Arlington, Texas), noon local / 1 p.m. ET",
                    "Group I: France vs. Iraq (Philadelphia), 5 p.m. ET",
                    "Group I: Norway vs. Senegal (East Rutherford, N.J.), 8 p.m. ET",
                    "Group J: Jordan vs. Algeria (Santa Clara, Calif.), 8 p.m. local / 11 p.m. ET",
                  ],
                },
                {
                  date: "Tuesday, June 23",
                  matches: [
                    "Group K: Portugal vs. Uzbekistan (Houston), noon local / 1 p.m. ET",
                    "Group L: England vs. Ghana (Foxborough, Mass.), 4 p.m. ET",
                    "Group L: Panama vs. Croatia (Toronto), 7 p.m. ET",
                    "Group K: Colombia vs. DR Congo (Zapopan, Mexico), 8 p.m. local / 10 p.m. ET",
                  ],
                },
                {
                  date: "Wednesday, June 24",
                  matches: [
                    "Group B: Switzerland vs. Canada (Vancouver, Canada), noon local / 3 p.m. ET",
                    "Group B: Bosnia and Herzegovina vs. Qatar (Seattle), noon local / 3 p.m. ET",
                    "Group C: Scotland vs. Brazil (Miami Gardens, Fla.), 6 p.m. ET",
                    "Group C: Morocco vs. Haiti (Atlanta), 6 p.m. ET",
                    "Group A: Czechia vs. Mexico (Mexico City), 7 p.m. local / 9 p.m. ET",
                    "Group A: South Africa vs. South Korea (Guadalupe, Mexico), 7 p.m. local / 9 p.m. ET",
                  ],
                },
                {
                  date: "Thursday, June 25",
                  matches: [
                    "Group E: Ecuador vs. Germany (East Rutherford, N.J.), 4 p.m. ET",
                    "Group E: Curacao vs. Ivory Coast (Philadelphia), 4 p.m. ET",
                    "Group F: Japan vs. Sweden (Arlington, Texas), 6 p.m. local / 7 p.m. ET",
                    "Group F: Tunisia vs. Netherlands (Kansas City, Mo.), 6 p.m. local / 7 p.m. ET",
                    "Group D: Türkiye vs. United States (Inglewood, Calif.), 7 p.m. local / 10 p.m. ET",
                    "Group D: Paraguay vs. Australia (Santa Clara, Calif.), 7 p.m. local / 10 p.m. ET",
                  ],
                },
                {
                  date: "Friday, June 26",
                  matches: [
                    "Group I: Norway vs. France (Foxborough, Mass.), 3 p.m. ET",
                    "Group I: Senegal vs. Iraq (Toronto), 3 p.m. ET",
                    "Group H: Cape Verde vs. Saudi Arabia (Houston), 7 p.m. local / 8 p.m. ET",
                    "Group H: Uruguay vs. Spain (Zapopan, Mexico), 6 p.m. local / 8 p.m. ET",
                    "Group G: Egypt vs. Iran (Seattle), 8 p.m. local / 11 p.m. ET",
                    "Group G: New Zealand vs. Belgium (Vancouver, Canada), 8 p.m. local / 11 p.m. ET",
                  ],
                },
                {
                  date: "Saturday, June 27",
                  matches: [
                    "Group L: Panama vs. England (East Rutherford, N.J.), 5 p.m. ET",
                    "Group L: Croatia vs. Ghana (Philadelphia), 5 p.m. ET",
                    "Group K: Colombia vs. Portugal (Miami Gardens, Fla.), 7:30 p.m. ET",
                    "Group K: DR Congo vs. Uzbekistan (Atlanta Stadium), 7:30 p.m. ET",
                    "Group J: Algeria vs. Austria (Kansas City, Mo.), 9 p.m. local / 10 p.m. ET",
                    "Group J: Jordan vs. Argentina (Arlington, Texas), 9 p.m. local / 10 p.m. ET",
                  ],
                },
              ].map((day, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-highest/50 rounded-xl p-4 border border-white/5"
                >
                  <h4 className="text-xs font-headline font-black text-primary uppercase tracking-widest mb-3">
                    {day.date}
                  </h4>
                  <ul className="space-y-2">
                    {day.matches.map((match, mIdx) => (
                      <li
                        key={mIdx}
                        className="text-xs font-bold text-white leading-relaxed"
                      >
                        {match}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Knockout Stage */}
          <div>
            <h3 className="text-xl font-headline font-black uppercase tracking-tight text-white mb-6 pb-2 border-b border-white/10">
              Knockout Stage
            </h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                {
                  round: "Round of 32",
                  dates: "June 28 – July 3",
                  details: [
                    "June 28: Group A runners-up vs. Group B runners-up (Inglewood, Calif.)",
                    "June 29: Group C winners vs. Group F runners-up (Houston) | Group E winners vs. Group A/B/C/D/F third place (Foxborough) | Group F winners vs. Group C runners-up (Guadalupe)",
                    "June 30: Group E runners-up vs. Group I runners-up (Arlington) | Group I winners vs. Group C/D/F/G/H third place (East Rutherford) | Group A winners vs. Group C/E/F/H/I third place (Mexico City)",
                    "July 1: Group L winners vs. Group E/H/I/J/K third place (Atlanta) | Group G winners vs. Group A/E/H/I/J third place (Seattle) | Group D winners vs. Group B/E/F/I/J third place (Santa Clara)",
                    "July 2: Group H winners v. Group J runners-up (Inglewood) | Group K runners-up v. Group L runners-up (Toronto) | Group B winners v. Group E/F/G/I/J third place (Vancouver)",
                    "July 3: Group D runners-up vs. Group G runners-up (Arlington) | Group J winners vs. Group H runners-up (Miami Gardens) | Group K winners vs. Group D/E/I/J/L third place (Kansas City)",
                  ],
                },
                {
                  round: "Round of 16",
                  dates: "July 4 – July 7",
                  details: [
                    "July 4: Match 1 (Houston) | Match 2 (Philadelphia)",
                    "July 5: Match 3 (East Rutherford) | Match 4 (Mexico City)",
                    "July 6: Match 5 (Arlington) | Match 6 (Seattle)",
                    "July 7: Match 7 (Atlanta) | Match 8 (Vancouver)",
                  ],
                },
                {
                  round: "Quarter-finals",
                  dates: "July 9 – July 11",
                  details: [
                    "July 9: QF 1 (Foxborough)",
                    "July 10: QF 2 (Inglewood)",
                    "July 11: QF 3 (Miami Gardens) | QF 4 (Kansas City)",
                  ],
                },
                {
                  round: "Semi-finals & Third Place",
                  dates: "July 14 – July 18",
                  details: [
                    "July 14: SF 1 (Arlington)",
                    "July 15: SF 2 (Atlanta)",
                    "July 18: Third-place game (Miami Gardens)",
                  ],
                },
                {
                  round: "The Final",
                  dates: "July 19",
                  details: [
                    "July 19: The Final (MetLife Stadium, East Rutherford, N.J.)",
                  ],
                },
              ].map((phase, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-highest/50 rounded-xl p-4 border border-white/5"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-headline font-black text-secondary uppercase tracking-widest">
                      {phase.round}
                    </h4>
                    <span className="text-[10px] font-bold text-outline-variant uppercase">
                      {phase.dates}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="text-xs font-bold text-white leading-relaxed"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const MasterDetailAward = ({
  title,
  awardType,
  candidates,
  selectedId,
  setSelectedId,
  selectedValue,
  onSelect,
  accentColor = "primary",
  isLocked,
}: any) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const candidate =
    candidates.find((c: any) => c.id === selectedId) || candidates[0];
  const marketOdds = (MARKET_ODDS as any)[awardType] || [];
  const candidateOdds = marketOdds.find((o: any) => o.name === candidate.name);

  // Auto-close drawer if window resized to lg
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsDrawerOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const DossierContent = ({ isDrawer = false }: { isDrawer?: boolean }) => (
    <div
      key={candidate.id}
      className={`flex flex-col h-full animate-in fade-in ${isDrawer ? "slide-in-from-bottom-20" : "slide-in-from-bottom-4"} duration-500`}
    >
      {/* Dossier Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-24 h-24 rounded-2xl bg-surface-container-highest border border-white/10 flex items-center justify-center overflow-hidden shrink-0 relative shadow-xl">
            {candidate.image ? (
              <img
                src={candidate.image}
                alt={candidate.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span
                className={`text-4xl font-headline font-black text-${accentColor}`}
              >
                {candidate.name.charAt(0)}
              </span>
            )}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            <img
              src={`https://flagcdn.com/w40/${candidate.countryCode}.png`}
              className="absolute bottom-2 right-2 w-6 h-4 rounded-sm object-cover shadow-sm"
              referrerPolicy="no-referrer"
              alt={candidate.nation}
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white mb-1 leading-none">
              {candidate.name}
            </h2>
            <p
              className={`text-${accentColor} font-bold uppercase tracking-widest text-sm mb-2`}
            >
              {candidate.club} • {candidate.nation}
            </p>
            <p className="text-xs text-outline-variant font-medium max-w-lg">
              {candidate.info}
            </p>
          </div>
        </div>

        <button
          disabled={isLocked}
          onClick={() => {
            onSelect(candidate.name);
            if (isDrawerOpen) setIsDrawerOpen(false);
          }}
          className={`shrink-0 px-8 py-4 rounded-xl font-headline font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-3 w-full md:w-auto ${
            selectedValue === candidate.name
              ? `bg-${accentColor} text-on-${accentColor} border border-${accentColor} shadow-[0_0_20px_rgba(var(--color-${accentColor}),0.4)]`
              : `bg-surface-container-highest border border-white/10 text-white hover:bg-${accentColor}/20 hover:text-${accentColor} hover:border-${accentColor}/50`
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {selectedValue === candidate.name ? (
            <>
              <span className="material-symbols-outlined text-lg">
                check_circle
              </span>
              SELECTED
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">star</span>
              SELECT
            </>
          )}
        </button>
      </div>

      {/* Dossier Content - Bento Grid */}
      <div className="grid md:grid-cols-2 gap-6 flex-1">
        {/* Bento Quadrant: Market Sentiment */}
        {candidateOdds && (
          <div className="bg-gradient-to-br from-surface-container-highest/80 to-surface-container-low/40 rounded-2xl border border-white/10 p-6 relative overflow-hidden backdrop-blur-xl group flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div>
              <h4 className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
                <Activity className={`w-[14px] h-[14px] text-${accentColor}`} />{" "}
                Market Sentiment
              </h4>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest flex items-center gap-1">
                    Odds{" "}
                    <span className="material-symbols-outlined text-[12px] opacity-70">
                      trending_up
                    </span>
                  </span>
                  <span className="text-2xl font-headline font-black text-white leading-none">
                    {candidateOdds.odds}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest flex items-center gap-1">
                    Implied Chance{" "}
                    <span className="material-symbols-outlined text-[12px] opacity-70">
                      pie_chart
                    </span>
                  </span>
                  <span
                    className={`text-2xl font-headline font-black text-${accentColor} leading-none`}
                  >
                    {candidateOdds.chance}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 relative z-10">
              <div
                className={`flex items-center gap-4 bg-${accentColor}/10 border border-${accentColor}/30 px-4 py-3 rounded-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_rgba(var(--color-${accentColor}),0.15)]`}
              >
                <div
                  className={`bg-${accentColor} w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-inner`}
                >
                  <Activity className="w-4 h-4 text-on-primary" />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest text-${accentColor}`}
                  >
                    Value Play
                  </span>
                  <span className="text-[9px] font-bold text-white/50 tracking-tight">
                    System Recommendation
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h4 className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">
                analytics
              </span>{" "}
              Analyst Note
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed italic border-l-2 border-secondary/30 pl-4 py-1">
              "{candidate.description}"
            </p>
          </div>

          {candidate.stats && candidate.stats.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">
                  query_stats
                </span>{" "}
                Performance Data
              </h4>
              <div className="space-y-2">
                {candidate.stats.map((stat: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-surface-container-highest/30 px-4 py-2.5 rounded-lg border border-white/5"
                  >
                    <span className="text-xs font-bold text-white">
                      {stat.label}
                    </span>
                    <span className={`text-xs text-${accentColor} font-medium`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="grid lg:grid-cols-[350px_1fr] gap-6 items-start">
      {/* Left Side: The Roster (Master) - Fluid Height */}
      <div className="glass-card border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        <div className="bg-surface-container-highest/50 px-6 py-4 border-b border-white/5 flex justify-between items-center">
          <h4 className="font-headline font-black uppercase tracking-widest text-sm text-outline-variant">
            Top Candidates
          </h4>

          {/* Market Pulse Trigger */}
          <div className="relative group/pulse">
            <div className="flex items-center gap-2 cursor-help">
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                Market Pulse
              </span>
            </div>

            <div className="absolute right-0 top-full mt-2 w-64 glass-card border border-white/10 rounded-xl p-4 opacity-0 pointer-events-none group-hover/pulse:opacity-100 group-hover/pulse:pointer-events-auto transition-all duration-300 z-[100] shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  Live Betting Insights
                </span>
              </div>
              <div className="space-y-3">
                {marketOdds.slice(0, 5).map((odd: any) => (
                  <div
                    key={odd.name}
                    className="flex justify-between items-center text-[10px]"
                  >
                    <span className="font-bold text-on-surface-variant">
                      {odd.name}
                    </span>
                    <div className="flex gap-3">
                      <span className="font-black text-white">{odd.odds}</span>
                      <span className="font-bold text-primary">
                        {odd.chance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 pt-3 border-t border-white/5 text-[9px] text-outline-variant leading-relaxed">
                Implied probability calculated from global market averages.
              </p>
            </div>
          </div>
        </div>
          <div className="p-2 space-y-1">
            {candidates.map((c: any) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedId(c.id);
                  if (window.innerWidth < 1024) setIsDrawerOpen(true);
                }}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left group ${
                  selectedId === c.id
                    ? `bg-${accentColor}/20 border border-${accentColor}/50 shadow-[0_0_15px_rgba(var(--color-${accentColor}),0.2)]`
                    : "border border-transparent hover:bg-surface-container-highest/50 hover:border-white/10"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest border border-white/5 flex items-center justify-center overflow-hidden shrink-0 relative">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span
                      className={`text-lg font-headline font-black text-${accentColor}/50`}
                    >
                      {c.name.charAt(0)}
                    </span>
                  )}
                  <img
                    src={`https://flagcdn.com/w40/${c.countryCode}.png`}
                    className="absolute bottom-0 right-0 w-4 h-2.5 rounded-sm object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                    alt={c.nation}
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h5
                    className={`font-headline font-black uppercase tracking-tight truncate ${selectedId === c.id ? `text-${accentColor}` : `text-white group-hover:text-${accentColor}-fixed`}`}
                  >
                    {c.name}
                  </h5>
                  <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest truncate">
                    {c.nation}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                  {selectedValue === c.name && (
                    <span
                      className={`material-symbols-outlined text-${accentColor} text-sm shrink-0`}
                    >
                      check_circle
                    </span>
                  )}
                  <span className="material-symbols-outlined text-outline-variant text-sm lg:hidden">
                    chevron_right
                  </span>
                </div>
              </button>
            ))}
          </div>
      </div>

        {/* Right Side: The Dossier (Detail) - Desktop Version */}
        <div className="hidden lg:flex glass-card border border-white/10 rounded-2xl p-8 min-h-[600px] flex-col relative overflow-hidden sticky top-24">
          <DossierContent />
        </div>
      </div>

      {/* Mobile Mobile Drawer - The Dossier (Detail) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 max-h-[90vh] bg-surface-container-low border-t border-white/10 rounded-t-3xl overflow-y-auto p-6 md:p-8"
            >
              {/* Drag Handle Indicator */}
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />

              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline font-black uppercase tracking-tight text-outline-variant text-[10px]">
                  Intelligence Dossier
                </h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <DossierContent isDrawer={true} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const AwardCard = ({
  label,
  icon,
  value,
  onChange,
  disabled,
  players,
}: any) => {
  const selectedPlayer = players.find((p: any) => p.name === value);

  return (
    <div className="glass-card border border-white/10 p-8 rounded-2xl hover:border-primary/30 transition-all group shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-surface-container-highest rounded-xl group-hover:bg-primary-container/10 transition-colors">
          {icon}
        </div>
        <h4 className="text-xl font-headline font-black uppercase text-white tracking-tight">
          {label}
        </h4>
      </div>

      <div className="flex flex-col gap-6">
        {selectedPlayer && (
          <div className="flex items-center gap-4 p-4 bg-surface-container-highest/30 rounded-xl border border-white/5 animate-in fade-in slide-in-from-left-4">
            <div className="w-16 h-16 rounded-lg bg-surface-container-highest border border-white/10 overflow-hidden shrink-0 relative">
              {selectedPlayer.image ? (
                <img
                  src={selectedPlayer.image}
                  alt={selectedPlayer.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-headline font-black text-outline-variant">
                  {selectedPlayer.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-headline font-black uppercase text-white tracking-tight">
                {selectedPlayer.name}
              </p>
              <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">
                {selectedPlayer.nation}
              </p>
            </div>
          </div>
        )}

        <div className="relative">
          <select
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-surface-container-highest/50 border border-white/10 rounded-sm px-6 py-5 font-bold text-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer disabled:opacity-50 text-white"
          >
            <option value="">Choose your candidate...</option>
            {players.map((p: any) => (
              <option key={p.name} value={p.name}>
                {p.name} ({p.nation})
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">
            expand_more
          </span>
        </div>
      </div>
    </div>
  );
};

const TEAM_COLORS: Record<string, string> = {
  Argentina: "#43A1D5",
  France: "#002654",
  Brazil: "#FFDC02",
  England: "#CE1124",
  Spain: "#AA151B",
  Portugal: "#e42518",
  Germany: "#ffffff",
  Italy: "#0064AA",
  Netherlands: "#F36C21",
  USA: "#002868",
  Mexico: "#006341",
  Colombia: "#FCD116",
  Uruguay: "#75AADB",
  Belgium: "#E30613",
  Croatia: "#FF0000",
};

const FEDERATIONS: Record<string, string> = {
  Mexico: "CONCACAF",
  "South Africa": "CAF",
  "South Korea": "AFC",
  "Czech Republic": "UEFA",
  Canada: "CONCACAF",
  "Bosnia-Herzegovina": "UEFA",
  Qatar: "AFC",
  Switzerland: "UEFA",
  Brazil: "CONMEBOL",
  Morocco: "CAF",
  Haiti: "CONCACAF",
  Scotland: "UEFA",
  "United States": "CONCACAF",
  Paraguay: "CONMEBOL",
  Australia: "AFC",
  Turkey: "UEFA",
  Germany: "UEFA",
  Curaçao: "CONCACAF",
  "Ivory Coast": "CAF",
  Ecuador: "CONMEBOL",
  Netherlands: "UEFA",
  Japan: "AFC",
  Tunisia: "CAF",
  Sweden: "UEFA",
  Belgium: "UEFA",
  Egypt: "CAF",
  Iran: "AFC",
  "New Zealand": "OFC",
  Spain: "UEFA",
  "Cape Verde": "CAF",
  "Saudi Arabia": "AFC",
  Uruguay: "CONMEBOL",
  France: "UEFA",
  Senegal: "CAF",
  Iraq: "AFC",
  Norway: "UEFA",
  Argentina: "CONMEBOL",
  Algeria: "CAF",
  Austria: "UEFA",
  Jordan: "AFC",
  Portugal: "UEFA",
  "DR Congo": "CAF",
  Uzbekistan: "AFC",
  Colombia: "CONMEBOL",
  England: "UEFA",
  Croatia: "UEFA",
  Ghana: "CAF",
  Panama: "CONCACAF",
};

const ParticipantCard = ({
  p,
  isCurrentUser,
  currentUserPickData,
  onBadgeInfoClick,
}: {
  p: any;
  isCurrentUser: boolean;
  currentUserPickData?: any;
  onBadgeInfoClick?: () => void;
  key?: any;
}) => {
  const [expanded, setExpanded] = useState(isCurrentUser);
  const [isComparing, setIsComparing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "predictions" | "analytics"
  >("overview");

  const themeColor =
    p.champion && p.champion !== "TBD"
      ? TEAM_COLORS[p.champion] || "#10b981"
      : "rgba(255,255,255,0.1)";

  // Calculate Completion Percentage mapped to a 100-point ring
  let completion = 0;
  if (p.isLocked) {
    completion = 100;
  } else {
    // Rough estimation based on awards defined
    if (p.champion && p.champion !== "TBD") completion += 25;
    if (p.mvp && p.mvp !== "TBD") completion += 25;
    if (p.goldenBoot && p.goldenBoot !== "TBD") completion += 25;
    if (p.goldenGlove && p.goldenGlove !== "TBD") completion += 25;
  }

  const radius = 24;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (completion / 100) * circumference;

  // -- Phase 2: Heatmap & DNA Calculations --
  const r16Teams = p.bracket?.R16 ? Object.values(p.bracket.R16) : [];
  const federationsCount = {
    UEFA: 0,
    CONMEBOL: 0,
    CONCACAF: 0,
    CAF: 0,
    AFC: 0,
    OFC: 0,
  };
  let totalR16 = 0;
  r16Teams.forEach((t) => {
    if (t && t !== "TBD") {
      const fed = FEDERATIONS[t as string];
      if (fed === "UEFA") federationsCount.UEFA++;
      else if (fed === "CONMEBOL") federationsCount.CONMEBOL++;
      else if (fed === "CONCACAF") federationsCount.CONCACAF++;
      else if (fed === "CAF") federationsCount.CAF++;
      else if (fed === "AFC") federationsCount.AFC++;
      else if (fed === "OFC") federationsCount.OFC++;
      totalR16++;
    }
  });

  const heatmapData = [
    { name: "UEFA", value: federationsCount.UEFA, color: "#3b82f6" },
    { name: "CONMEBOL", value: federationsCount.CONMEBOL, color: "#f59e0b" },
    { name: "CONCACAF", value: federationsCount.CONCACAF, color: "#10b981" },
    { name: "CAF", value: federationsCount.CAF, color: "#8b5cf6" },
    { name: "AFC", value: federationsCount.AFC, color: "#ec4899" },
  ]
    .filter((d) => d.value > 0)
    .map((d) => ({
      ...d,
      percent: totalR16 > 0 ? (d.value / totalR16) * 100 : 0,
    }));

  let avgRankR16 = 0;
  if (totalR16 > 0) {
    avgRankR16 =
      (r16Teams as string[]).reduce(
        (acc: number, t: string) => acc + (Number(TEAM_INFO[t]?.ranking) || 0),
        0,
      ) / totalR16;
  }
  const riskScore =
    totalR16 > 0 ? Math.min(100, Math.max(0, (avgRankR16 / 40) * 100)) : 0;

  const favoriteTeamsList = p.favoriteTeams?.length
    ? p.favoriteTeams
    : p.favoriteTeam
      ? [p.favoriteTeam]
      : [];
  let loyaltyScore = 20;
  if (p.champion && favoriteTeamsList.includes(p.champion)) loyaltyScore = 100;
  else if (p.champion && p.nationality === p.champion) loyaltyScore = 80;

  let starPowerScore = p.mvp && p.mvp !== "TBD" ? 80 : 10;
  let defenseScore = p.goldenGlove && p.goldenGlove !== "TBD" ? 85 : 10;

  const dnaData = [
    { subject: "Loyalty", A: loyaltyScore, fullMark: 100 },
    { subject: "Star Power", A: starPowerScore, fullMark: 100 },
    { subject: "Defense Bias", A: defenseScore, fullMark: 100 },
  ];

  // -- Phase 4: Badges --
  const badges = [];
  if (p.isLocked)
    badges.push({
      id: "early_bird",
      name: "Early Bird",
      icon: "schedule",
      color: "#3b82f6",
      desc: "Locked bracket early",
    });
  const clubs = p.favoriteClubs?.length
    ? p.favoriteClubs
    : p.favoriteClub
      ? [p.favoriteClub]
      : [];
  if (clubs.length >= 3) {
    badges.push({
      id: "world_traveler",
      name: "World Traveler",
      icon: "flight_takeoff",
      color: "#10b981",
      desc: "3+ Favorite Clubs",
    });
  }
  if (
    p.champion &&
    (p.nationality === p.champion || favoriteTeamsList.includes(p.champion))
  ) {
    badges.push({
      id: "the_homer",
      name: "The Homer",
      icon: "home",
      color: "#f59e0b",
      desc: "Picked favorite team to win",
    });
  }
  if (p.champion && TEAM_INFO[p.champion]?.ranking <= 5) {
    badges.push({
      id: "the_chalk",
      name: "The Chalk",
      icon: "draw",
      color: "#a855f7",
      desc: "Predicted a top 5 favorite",
    });
  }

  const userNomination = NOMINATIONS.find((n) => n.id === p.nomination);
  const champFlag =
    p.champion && p.champion !== "TBD" ? TEAM_INFO[p.champion]?.code : null;

  return (
    <div
      className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 relative ${isCurrentUser ? "shadow-[0_0_15px_rgba(var(--color-primary),0.2)]" : "hover:border-white/30"} border-y border-r border-l-[4px]`}
      style={{
        borderLeftColor: themeColor,
        borderTopColor: isCurrentUser
          ? "rgb(var(--color-primary))"
          : "rgba(255,255,255,0.1)",
        borderRightColor: isCurrentUser
          ? "rgb(var(--color-primary))"
          : "rgba(255,255,255,0.1)",
        borderBottomColor: isCurrentUser
          ? "rgb(var(--color-primary))"
          : "rgba(255,255,255,0.1)",
      }}
    >
      {/* Champion Flag Background Overlay */}
      {champFlag && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.05] grayscale-[0.2]">
          <img
            src={`https://flagcdn.com/w1280/${champFlag}.png`}
            alt=""
            className="w-full h-full object-cover scale-150 blur-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </div>
      )}

      {/* Collapsed Header - The 'Chassis' */}
      <div
        className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer relative z-10"
        onClick={(e) => {
          // Don't expand if they clicked the comparison toggle
          if ((e.target as HTMLElement).closest(".compare-btn")) return;
          setExpanded(!expanded);
        }}
      >
        <div className="flex items-center gap-4">
          {/* Avatar with Progress Ring */}
          <div className="relative w-[56px] h-[56px] flex items-center justify-center shrink-0">
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 56 56"
            >
              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-white/10"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                stroke={
                  completion === 100 ? themeColor : "rgb(var(--color-primary))"
                }
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset,
                  transition: "stroke-dashoffset 1s ease-in-out",
                  filter:
                    completion === 100
                      ? `drop-shadow(0 0 4px ${themeColor})`
                      : "none",
                }}
              />
            </svg>
            <div className="w-[46px] h-[46px] bg-surface-container-highest rounded-full flex items-center justify-center text-xl font-headline font-black text-primary overflow-hidden">
              {p.displayName?.[0]?.toUpperCase() || "?"}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              {userNomination && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[10px] text-secondary">
                    {userNomination.icon}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-secondary/80">
                    {userNomination.title}
                  </span>
                </div>
              )}
              {isCurrentUser && (
                <span className="text-[9px] font-black bg-primary/20 text-primary px-2 py-0.5 rounded-sm uppercase tracking-widest">
                  YOU
                </span>
              )}
            </div>
            <h4 className="font-headline font-black uppercase tracking-tight text-lg text-white flex items-center gap-2 leading-none">
              {p.displayName}
              {p.isLocked && (
                <span
                  className="material-symbols-outlined text-success text-[18px]"
                  title="Bracket Verified"
                >
                  verified
                </span>
              )}
            </h4>
            <div className="flex items-center gap-3 text-xs text-outline-variant font-bold mt-1">
              {p.nationality && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    public
                  </span>{" "}
                  {p.nationality}
                </span>
              )}
              {(p.favoriteClubs?.[0] || p.favoriteClub) && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    sports_soccer
                  </span>{" "}
                  {p.favoriteClubs?.[0] || p.favoriteClub}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
          {/* Points Chip */}
          <div className="bg-surface-container/40 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-3 transition-all hover:bg-surface-container/60 hover:border-primary/30 group/chip">
            <div className="p-1.5 bg-primary/10 rounded-lg group-hover/chip:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary text-[18px]">
                workspace_premium
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-outline-variant uppercase tracking-[0.2em] leading-none mb-1">
                Potential
              </span>
              <span className="text-sm font-headline font-black text-white leading-none">
                {p.potentialPoints || 0}
              </span>
            </div>
          </div>

          {/* Champion Chip */}
          <div
            className={`border rounded-xl px-4 py-2.5 flex items-center gap-3 transition-all group/chip ${p.champion && p.champion !== "TBD" ? "bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/40" : "bg-surface-container/40 border-white/10 hover:bg-surface-container/60"}`}
            style={{
              borderColor:
                p.champion && p.champion !== "TBD"
                  ? `${themeColor}40`
                  : undefined,
            }}
          >
            <div
              className={`p-1.5 rounded-lg transition-colors ${p.champion && p.champion !== "TBD" ? "bg-primary/20" : "bg-white/5"}`}
              style={{
                backgroundColor:
                  p.champion && p.champion !== "TBD"
                    ? `${themeColor}20`
                    : undefined,
              }}
            >
              <span
                className={`material-symbols-outlined text-[18px]`}
                style={{
                  color:
                    p.champion && p.champion !== "TBD"
                      ? themeColor
                      : "rgb(var(--color-outline-variant))",
                }}
              >
                emoji_events
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-outline-variant uppercase tracking-[0.2em] leading-none mb-1">
                Winner
              </span>
              <span
                className={`text-sm font-headline font-black leading-none ${p.champion && p.champion !== "TBD" ? "text-white" : "text-outline-variant"}`}
              >
                {p.champion && p.champion !== "TBD" ? p.champion : "TBD"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end shrink-0 ml-2">
            <span
              className={`material-symbols-outlined text-outline-variant transition-transform duration-300 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 ${expanded ? "rotate-180 text-primary" : ""}`}
            >
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 bg-surface-container-highest/30 overflow-hidden"
          >
            <div className="p-4 md:p-6 flex flex-col gap-6">
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
                {[
                  { id: "overview", icon: "person", label: "Overview" },
                  { id: "predictions", icon: "trophy", label: "Predictions" },
                  { id: "analytics", icon: "monitoring", label: "Analytics" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab(tab.id as any);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-white/10 text-white"
                        : "text-outline-variant hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[220px]">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">
                          Full Name
                        </p>
                        <p className="text-sm font-bold text-white">
                          {p.firstName} {p.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">
                          Nationality
                        </p>
                        <p className="text-sm font-bold text-white">
                          {p.nationality || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">
                          Favorite Teams
                        </p>
                        <p className="text-sm font-bold text-white">
                          {p.favoriteTeams?.filter(Boolean).join(", ") ||
                            p.favoriteTeam ||
                            "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">
                          Favorite Clubs
                        </p>
                        <p className="text-sm font-bold text-white">
                          {p.favoriteClubs?.filter(Boolean).join(", ") ||
                            p.favoriteClub ||
                            "-"}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">
                          Favorite Players
                        </p>
                        <p className="text-sm font-bold text-white">
                          {p.favoritePlayers?.filter(Boolean).join(", ") ||
                            p.favoritePlayer ||
                            "-"}
                        </p>
                      </div>
                    </div>

                    {badges.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[9px] text-outline-variant uppercase tracking-widest font-bold">
                            Earned Badges
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onBadgeInfoClick?.();
                            }}
                            className="bg-white/5 hover:bg-white/10 p-1 rounded-full transition-colors group"
                            title="Badge Guide"
                          >
                            <span className="material-symbols-outlined text-[14px] text-outline-variant group-hover:text-primary transition-colors">
                              info
                            </span>
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {badges.map((b) => (
                            <div
                              key={b.id}
                              className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/10 bg-white/5 cursor-default transition-colors hover:bg-white/10"
                              title={b.desc}
                            >
                              <span
                                className="material-symbols-outlined text-[14px]"
                                style={{ color: b.color }}
                              >
                                {b.icon}
                              </span>
                              <span className="text-[10px] font-bold text-white uppercase tracking-tight">
                                {b.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "predictions" && (
                  <div className="space-y-4 relative">
                    <div className="flex items-center justify-between pb-2">
                      <h5 className="text-xs font-bold text-outline uppercase tracking-widest invisible">
                        Tournament Predictions
                      </h5>

                      {/* Compare With Me Toggle */}
                      {!isCurrentUser && currentUserPickData && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsComparing(!isComparing);
                          }}
                          className={`compare-btn flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all text-[10px] font-bold uppercase tracking-widest absolute top-0 right-0 z-10 ${
                            isComparing
                              ? "bg-primary/20 text-primary border-primary/50 shadow-[0_0_10px_rgba(var(--color-primary),0.2)]"
                              : "bg-surface-container border-white/10 text-outline-variant hover:text-white"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            compare_arrows
                          </span>
                          {isComparing ? "Comparing" : "Compare"}
                        </button>
                      )}
                    </div>

                    {!isComparing ? (
                      /* Standard Grid View - Visual Proof Upgrade */
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                        {/* Champion Slot */}
                        <div className="group/slot cursor-default">
                          <p className="text-[9px] text-outline-variant uppercase tracking-[0.2em] font-bold mb-3">
                            Champion
                          </p>
                          <div className="flex items-center gap-3 relative">
                            <div className="w-12 h-12 rounded-xl bg-surface-container border border-white/10 flex items-center justify-center overflow-hidden shrink-0 relative shadow-lg">
                              {p.champion && p.champion !== "TBD" ? (
                                <>
                                  <img
                                    src={`https://flagcdn.com/w160/${TEAM_INFO[p.champion]?.code || "un"}.png`}
                                    alt={p.champion}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/slot:scale-110"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-black/10" />
                                </>
                              ) : (
                                <Globe className="w-5 h-5 text-outline-variant opacity-30" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-headline font-black uppercase text-white leading-tight">
                                {p.champion || "TBD"}
                              </span>
                              {p.champion && p.champion !== "TBD" && (
                                <span
                                  className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-0.5"
                                  style={{ color: themeColor }}
                                >
                                  Predicted Winner
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* MVP Slot */}
                        <div className="group/slot cursor-default">
                          <p className="text-[9px] text-outline-variant uppercase tracking-[0.2em] font-bold mb-3">
                            MVP (Golden Ball)
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-surface-container border border-white/10 flex items-center justify-center overflow-hidden shrink-0 relative shadow-lg group-hover/slot:border-primary/40 transition-colors">
                              {p.mvp && p.mvp !== "TBD" ? (
                                <>
                                  {(() => {
                                    const player = [
                                      ...PLAYERS.goldenBall,
                                      ...PLAYERS.goldenBoot,
                                      ...PLAYERS.goldenGlove,
                                    ].find((cand) => cand.name === p.mvp);
                                    return player?.image ? (
                                      <img
                                        src={player.image}
                                        alt={p.mvp}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/slot:scale-110"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <UserIcon className="w-5 h-5 text-outline-variant opacity-30" />
                                    );
                                  })()}
                                </>
                              ) : (
                                <Star className="w-5 h-5 text-outline-variant opacity-30" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white leading-tight">
                                {p.mvp || "TBD"}
                              </span>
                              <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mt-0.5">
                                Golden Ball
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Golden Boot Slot */}
                        <div className="group/slot cursor-default">
                          <p className="text-[9px] text-outline-variant uppercase tracking-[0.2em] font-bold mb-3">
                            Golden Boot
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-surface-container border border-white/10 flex items-center justify-center overflow-hidden shrink-0 relative shadow-lg group-hover/slot:border-secondary/40 transition-colors">
                              {p.goldenBoot && p.goldenBoot !== "TBD" ? (
                                <>
                                  {(() => {
                                    const player = [
                                      ...PLAYERS.goldenBall,
                                      ...PLAYERS.goldenBoot,
                                      ...PLAYERS.goldenGlove,
                                    ].find(
                                      (cand) => cand.name === p.goldenBoot,
                                    );
                                    return player?.image ? (
                                      <img
                                        src={player.image}
                                        alt={p.goldenBoot}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/slot:scale-110"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <UserIcon className="w-5 h-5 text-outline-variant opacity-30" />
                                    );
                                  })()}
                                </>
                              ) : (
                                <Target className="w-5 h-5 text-outline-variant opacity-30" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white leading-tight">
                                {p.goldenBoot || "TBD"}
                              </span>
                              <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mt-0.5">
                                Top Scorer
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Golden Glove Slot */}
                        <div className="group/slot cursor-default">
                          <p className="text-[9px] text-outline-variant uppercase tracking-[0.2em] font-bold mb-3">
                            Golden Glove
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-surface-container border border-white/10 flex items-center justify-center overflow-hidden shrink-0 relative shadow-lg group-hover/slot:border-outline-variant/40 transition-colors">
                              {p.goldenGlove && p.goldenGlove !== "TBD" ? (
                                <>
                                  {(() => {
                                    const player = [
                                      ...PLAYERS.goldenBall,
                                      ...PLAYERS.goldenBoot,
                                      ...PLAYERS.goldenGlove,
                                    ].find(
                                      (cand) => cand.name === p.goldenGlove,
                                    );
                                    return player?.image ? (
                                      <img
                                        src={player.image}
                                        alt={p.goldenGlove}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/slot:scale-110"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <UserIcon className="w-5 h-5 text-outline-variant opacity-30" />
                                    );
                                  })()}
                                </>
                              ) : (
                                <Shield className="w-5 h-5 text-outline-variant opacity-30" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white leading-tight">
                                {p.goldenGlove || "TBD"}
                              </span>
                              <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mt-0.5">
                                Best Keeper
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Versus Mode Table View */
                      <div className="glass-card border border-white/10 rounded-xl overflow-hidden bg-surface-container-low/50">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                              <th className="px-3 py-2 font-black uppercase tracking-widest text-[#8a8a8a] text-[9px] w-1/4">
                                Category
                              </th>
                              <th className="px-3 py-2 font-black uppercase tracking-widest text-white text-[9px] border-l border-white/10">
                                {p.firstName || p.displayName}
                              </th>
                              <th className="px-3 py-2 font-black uppercase tracking-widest text-primary text-[9px] border-l border-white/10">
                                You
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {[
                              {
                                lbl: "Champion",
                                theirs: p.champion,
                                mine: currentUserPickData.champion,
                              },
                              {
                                lbl: "MVP",
                                theirs: p.mvp,
                                mine: currentUserPickData.mvp,
                              },
                              {
                                lbl: "Boot",
                                theirs: p.goldenBoot,
                                mine: currentUserPickData.goldenBoot,
                              },
                              {
                                lbl: "Glove",
                                theirs: p.goldenGlove,
                                mine: currentUserPickData.goldenGlove,
                              },
                            ].map((row, i) => {
                              const isMatch =
                                row.theirs &&
                                row.mine &&
                                row.theirs === row.mine &&
                                row.theirs !== "TBD";
                              return (
                                <tr
                                  key={i}
                                  className={`group/row transition-all duration-300 ${isMatch ? "bg-primary/5" : ""}`}
                                >
                                  <td className="px-3 py-3 font-bold text-outline-variant align-middle">
                                    {row.lbl}
                                  </td>
                                  <td className="px-3 py-3 border-l border-white/10 bg-white/[0.02]">
                                    <div className="flex items-center gap-2">
                                      {row.theirs && row.theirs !== "TBD" && (
                                        <div className="w-8 h-8 rounded-lg bg-surface-container border border-white/10 overflow-hidden shrink-0 flex items-center justify-center relative">
                                          {row.lbl === "Champion" ? (
                                            <img
                                              src={`https://flagcdn.com/w80/${TEAM_INFO[row.theirs]?.code || "un"}.png`}
                                              alt={row.theirs}
                                              className="w-full h-full object-cover"
                                              referrerPolicy="no-referrer"
                                            />
                                          ) : (
                                            (() => {
                                              const player = [
                                                ...PLAYERS.goldenBall,
                                                ...PLAYERS.goldenBoot,
                                                ...PLAYERS.goldenGlove,
                                              ].find(
                                                (cand) =>
                                                  cand.name === row.theirs,
                                              );
                                              return player?.image ? (
                                                <img
                                                  src={player.image}
                                                  alt={row.theirs}
                                                  className="w-full h-full object-cover"
                                                  referrerPolicy="no-referrer"
                                                />
                                              ) : (
                                                <UserIcon className="w-4 h-4 text-outline-variant opacity-30" />
                                              );
                                            })()
                                          )}
                                        </div>
                                      )}
                                      <span
                                        className={`text-[11px] font-black uppercase tracking-tight ${isMatch ? "text-white" : "text-on-surface-variant"}`}
                                      >
                                        {row.theirs || "TBD"}
                                      </span>
                                    </div>
                                  </td>
                                  <td
                                    className={`px-3 py-3 border-l border-white/10 ${isMatch ? "bg-primary/10" : ""}`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {row.mine && row.mine !== "TBD" && (
                                        <div className="w-8 h-8 rounded-lg bg-surface-container border border-white/10 overflow-hidden shrink-0 flex items-center justify-center relative shadow-[0_0_10px_rgba(var(--color-primary),0.1)]">
                                          {row.lbl === "Champion" ? (
                                            <img
                                              src={`https://flagcdn.com/w80/${TEAM_INFO[row.mine]?.code || "un"}.png`}
                                              alt={row.mine}
                                              className="w-full h-full object-cover"
                                              referrerPolicy="no-referrer"
                                            />
                                          ) : (
                                            (() => {
                                              const player = [
                                                ...PLAYERS.goldenBall,
                                                ...PLAYERS.goldenBoot,
                                                ...PLAYERS.goldenGlove,
                                              ].find(
                                                (cand) =>
                                                  cand.name === row.mine,
                                              );
                                              return player?.image ? (
                                                <img
                                                  src={player.image}
                                                  alt={row.mine}
                                                  className="w-full h-full object-cover"
                                                  referrerPolicy="no-referrer"
                                                />
                                              ) : (
                                                <UserIcon className="w-4 h-4 text-outline-variant opacity-30" />
                                              );
                                            })()
                                          )}
                                        </div>
                                      )}
                                      <span
                                        className={`text-[11px] font-black uppercase tracking-tight ${isMatch ? "text-primary" : "text-primary/70"}`}
                                      >
                                        {row.mine || "TBD"}
                                      </span>
                                      {isMatch && (
                                        <div className="ml-auto w-4 h-4 bg-primary rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(var(--color-primary),0.4)]">
                                          <span className="material-symbols-outlined text-[10px] text-on-primary font-black">
                                            check
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "analytics" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Heatmap */}
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold text-outline uppercase tracking-widest border-b border-white/10 pb-2">
                        Continent Bias (R16)
                      </h5>

                      {totalR16 > 0 ? (
                        <div className="space-y-3">
                          <div className="w-full h-8 flex rounded-xl overflow-hidden shadow-inner bg-white/5">
                            {heatmapData.map((d: any) => (
                              <div
                                key={d.name}
                                style={{
                                  width: `${d.percent}%`,
                                  backgroundColor: d.color,
                                }}
                                className="h-full flex items-center justify-center relative group"
                                title={`${d.name}: ${d.value} Teams`}
                              >
                                {d.percent > 15 && (
                                  <span className="text-[10px] font-black text-white mix-blend-overlay">
                                    {d.name}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-4 bg-surface-container-low p-3 rounded-xl border border-white/5">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-outline-variant uppercase tracking-widest font-bold">
                                Bracket Risk Score
                              </span>
                              <span className="text-xs font-bold text-white">
                                {riskScore > 75
                                  ? "Wildcard (High Risk)"
                                  : riskScore < 20
                                    ? "Chalk (Safe)"
                                    : "Balanced"}
                              </span>
                            </div>
                            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden flex">
                              <div
                                className="h-full bg-gradient-to-r from-success via-amber-500 to-error transition-all"
                                style={{ width: `${riskScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-20 bg-surface-container-lowest border border-white/5 rounded-xl border-dashed">
                          <p className="text-[10px] text-outline-variant uppercase font-bold tracking-widest">
                            Waiting for R16 Picks...
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Radar Chart */}
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold text-outline uppercase tracking-widest border-b border-white/10 pb-2">
                        Prediction DNA
                      </h5>
                      <div className="h-40 w-full flex items-center justify-center bg-surface-container-lowest border border-white/5 rounded-xl">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart
                            cx="50%"
                            cy="50%"
                            outerRadius="65%"
                            data={dnaData}
                          >
                            <PolarGrid
                              stroke="rgba(255,255,255,0.1)"
                              strokeDasharray="3 3"
                            />
                            <PolarAngleAxis
                              dataKey="subject"
                              tick={{
                                fill: "rgba(255,255,255,0.6)",
                                fontSize: 9,
                                fontWeight: 700,
                                textTransform: "uppercase",
                              }}
                            />
                            <PolarRadiusAxis
                              angle={30}
                              domain={[0, 100]}
                              tick={false}
                              axisLine={false}
                            />
                            <Radar
                              name="DNA Focus"
                              dataKey="A"
                              stroke={themeColor}
                              fill={themeColor}
                              fillOpacity={0.35}
                              strokeWidth={2}
                            />
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: "#1a1a1a",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                              }}
                              itemStyle={{
                                fontSize: "11px",
                                color: "#fff",
                                fontWeight: 700,
                              }}
                              labelStyle={{ display: "none" }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
