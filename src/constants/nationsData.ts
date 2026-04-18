export interface NationData {
  id: string;
  name: string;
  rank: number;
  code: string;
  group: string;
  vibeCheck: string;
  scoringPower: number; // 1-100
  theWall: number; // 1-100
  control: number; // 1-100
  talisman: {
    name: string;
    role: string;
    image?: string;
  };
  history: string;
  recentForm: string;
  style: string;
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
}

export const NATIONS_DATA: Record<string, NationData> = {
  argentina: {
    id: 'argentina',
    name: 'Argentina',
    rank: 1,
    code: 'ar',
    group: 'J',
    vibeCheck: "The defending world champions who play with a mix of grit and pure magic.",
    scoringPower: 92,
    theWall: 88,
    control: 90,
    talisman: { name: 'Lionel Messi', role: 'The GOAT', image: 'https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Lionel-Messi-Inter-Miami-photo_yvzoxc.png' },
    history: "3x World Cup Winners (1978, 1986, 2022).",
    recentForm: "Dominant in South American qualifying, rarely losing a match.",
    style: "Technical and aggressive. They control the game through midfield and rely on clinical finishing.",
    stats: [
      { label: "Scoring Power", value: "92/100", description: "Extremely high. They create chances out of nothing." },
      { label: "Defensive Solidity", value: "88/100", description: "Very tough to break down, led by 'Dibu' Martinez in goal." },
      { label: "Ball Control", value: "90/100", description: "They dictate the tempo of almost every game they play." }
    ]
  },
  france: {
    id: 'france',
    name: 'France',
    rank: 2,
    code: 'fr',
    group: 'I',
    vibeCheck: "A collection of world-class athletes who can destroy any team on the counter-attack.",
    scoringPower: 95,
    theWall: 85,
    control: 82,
    talisman: { name: 'Kylian Mbappé', role: 'Speed Demon', image: 'https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Kylian-Mbapp%C3%A9-France-photo_zhekvx.png' },
    history: "2x World Cup Winners (1998, 2018).",
    recentForm: "Consistently reaching finals in major tournaments.",
    style: "Explosive and direct. They are comfortable without the ball because they are so fast when they get it.",
    stats: [
      { label: "Scoring Power", value: "95/100", description: "The best in the world. Mbappe and Griezmann are a lethal duo." },
      { label: "Defensive Solidity", value: "85/100", description: "Strong and physical, though they sometimes take risks." },
      { label: "Ball Control", value: "82/100", description: "They don't need the ball to win, but they are very efficient with it." }
    ]
  },
  spain: {
    id: 'spain',
    name: 'Spain',
    rank: 3,
    code: 'es',
    group: 'H',
    vibeCheck: "The masters of the pass. They will keep the ball all day and wait for you to get tired.",
    scoringPower: 88,
    theWall: 84,
    control: 98,
    talisman: { name: 'Lamine Yamal', role: 'The Prodigy', image: 'https://res.cloudinary.com/readviews-365/image/upload/v1776109512/Players/Lamine-Yamal-Spain-photo_ekre6p.png' },
    history: "1x World Cup Winner (2010), Euro 2024 Champions.",
    recentForm: "Playing the most attractive football in Europe right now.",
    style: "Tiki-Taka 2.0. High possession, quick short passes, and high pressure when they lose the ball.",
    stats: [
      { label: "Scoring Power", value: "88/100", description: "High, but they sometimes pass too much instead of shooting." },
      { label: "Defensive Solidity", value: "84/100", description: "Their defense is their possession; you can't score if you don't have the ball." },
      { label: "Ball Control", value: "98/100", description: "Unmatched. They usually have 65-70% possession." }
    ]
  },
  england: {
    id: 'england',
    name: 'England',
    rank: 4,
    code: 'gb-eng',
    group: 'L',
    vibeCheck: "A deep squad full of Premier League stars looking to finally 'bring it home'.",
    scoringPower: 90,
    theWall: 86,
    control: 87,
    talisman: { name: 'Harry Kane', role: 'The Finisher', image: 'https://res.cloudinary.com/readviews-365/image/upload/v1776109511/Players/Harry-Kane-England-photo_gc0rpe.png' },
    history: "1x World Cup Winner (1966).",
    recentForm: "Consistently deep runs in recent tournaments, but missing the final trophy.",
    style: "Balanced and methodical. They have world-class talent in every position and are dangerous from set-pieces.",
    stats: [
      { label: "Scoring Power", value: "90/100", description: "Very high. Harry Kane is one of the best strikers in history." },
      { label: "Defensive Solidity", value: "86/100", description: "Solid and well-organized under pressure." },
      { label: "Ball Control", value: "87/100", description: "Very good at keeping the ball in the middle of the pitch." }
    ]
  },
  brazil: {
    id: 'brazil',
    name: 'Brazil',
    rank: 5,
    code: 'br',
    group: 'C',
    vibeCheck: "The spiritual home of football. Expect flair, dribbling, and 'Joga Bonito'.",
    scoringPower: 93,
    theWall: 82,
    control: 89,
    talisman: { name: 'Vinícius Júnior', role: 'The Entertainer', image: 'https://res.cloudinary.com/readviews-365/image/upload/v1776440062/Players/vinicius_junior_brazil_nvekrc.png' },
    history: "5x World Cup Winners (Record).",
    recentForm: "A bit inconsistent lately, but always a threat to win it all.",
    style: "Creative and free-flowing. They rely on individual brilliance and fast-paced attacking play.",
    stats: [
      { label: "Scoring Power", value: "93/100", description: "Incredible. They have more attacking talent than almost anyone." },
      { label: "Defensive Solidity", value: "82/100", description: "Sometimes vulnerable on the counter because they attack so much." },
      { label: "Ball Control", value: "89/100", description: "Natural ball players who are very comfortable under pressure." }
    ]
  },
  belgium: {
    id: 'belgium',
    name: 'Belgium',
    rank: 6,
    code: 'be',
    group: 'G',
    vibeCheck: "A team in transition with exciting young talent mixed with veteran experience.",
    scoringPower: 84,
    theWall: 80,
    control: 85,
    talisman: { name: 'Kevin De Bruyne', role: 'The Architect', image: 'https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358247/Goalkeepers/Thibaut_Courtois_-_Belgium_doe3n3.jpg' }, // Using Courtois as talisman image for Belgium as provided
    history: "3rd Place in 2018 World Cup.",
    recentForm: "Rebuilding after their 'Golden Generation', but still very dangerous.",
    style: "Tactical and creative. They look to find De Bruyne in space to unlock defenses.",
    stats: [
      { label: "Scoring Power", value: "84/100", description: "Good, but heavily dependent on their key playmakers." },
      { label: "Defensive Solidity", value: "80/100", description: "A work in progress as they integrate new defenders." },
      { label: "Ball Control", value: "85/100", description: "Very technical midfield that keeps the ball well." }
    ]
  },
  portugal: {
    id: 'portugal',
    name: 'Portugal',
    rank: 7,
    code: 'pt',
    group: 'K',
    vibeCheck: "Stacked with talent in every position. They are no longer just a one-man team.",
    scoringPower: 91,
    theWall: 87,
    control: 88,
    talisman: { name: 'Cristiano Ronaldo', role: 'The Legend', image: 'https://res.cloudinary.com/readviews-365/image/upload/v1776440061/Players/cristiano_ronaldo_portugal_wkzor2.jpg' },
    history: "Euro 2016 Champions.",
    recentForm: "Perfect record in qualifying, scoring goals for fun.",
    style: "Attacking and versatile. They can play through the middle or use their fast wingers.",
    stats: [
      { label: "Scoring Power", value: "91/100", description: "Elite. They have goalscorers all over the pitch." },
      { label: "Defensive Solidity", value: "87/100", description: "Very strong, with a mix of veteran leadership and young pace." },
      { label: "Ball Control", value: "88/100", description: "Excellent. Their midfielders play for the biggest clubs in the world." }
    ]
  },
  netherlands: {
    id: 'netherlands',
    name: 'Netherlands',
    rank: 8,
    code: 'nl',
    group: 'F',
    vibeCheck: "Total Football. They play a smart, tactical game with a focus on teamwork.",
    scoringPower: 82,
    theWall: 89,
    control: 86,
    talisman: { name: 'Virgil van Dijk', role: 'The Leader' },
    history: "3x World Cup Finalists.",
    recentForm: "Strong and disciplined, very hard to beat in knockout games.",
    style: "Organized and flexible. They use their wing-backs to create width and overload the wings.",
    stats: [
      { label: "Scoring Power", value: "82/100", description: "Solid, but sometimes lack a world-class 'number 9'." },
      { label: "Defensive Solidity", value: "89/100", description: "Elite. Van Dijk is one of the best defenders in the world." },
      { label: "Ball Control", value: "86/100", description: "Very comfortable on the ball, playing out from the back." }
    ]
  },
  italy: {
    id: 'italy',
    name: 'Italy',
    rank: 9,
    code: 'it',
    group: 'B',
    vibeCheck: "The masters of defense and tactical discipline. Never count them out.",
    scoringPower: 78,
    theWall: 93,
    control: 84,
    talisman: { name: 'Gianluigi Donnarumma', role: 'The Wall', image: 'https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358246/Goalkeepers/Gianluigi_Donnarumma_-_italy_eyjen0.webp' },
    history: "4x World Cup Winners.",
    recentForm: "Recovering from missing the last World Cup, but Euro 2020 champions.",
    style: "Defensive and clinical. They focus on a solid backline and fast transitions.",
    stats: [
      { label: "Scoring Power", value: "78/100", description: "Their biggest weakness; they often struggle to finish chances." },
      { label: "Defensive Solidity", value: "93/100", description: "Legendary. It is their national identity." },
      { label: "Ball Control", value: "84/100", description: "Good, but they are happy to let you have the ball if it means they are safe." }
    ]
  },
  colombia: {
    id: 'colombia',
    name: 'Colombia',
    rank: 10,
    code: 'co',
    group: 'K',
    vibeCheck: "High energy, physical, and full of flair. They play with a lot of heart.",
    scoringPower: 85,
    theWall: 83,
    control: 81,
    talisman: { name: 'Luis Díaz', role: 'The Spark' },
    history: "Copa America 2024 Finalists.",
    recentForm: "On an incredible unbeaten run, beating top teams regularly.",
    style: "Intense and direct. They use their speed on the wings to overwhelm opponents.",
    stats: [
      { label: "Scoring Power", value: "85/100", description: "Very dangerous on the break." },
      { label: "Defensive Solidity", value: "83/100", description: "Tough and aggressive in the tackle." },
      { label: "Ball Control", value: "81/100", description: "Good, but they prefer a faster, more chaotic game." }
    ]
  },
  croatia: {
    id: 'croatia',
    name: 'Croatia',
    rank: 11,
    code: 'hr',
    group: 'L',
    vibeCheck: "The ultimate tournament team. They never know when they are beaten.",
    scoringPower: 76,
    theWall: 86,
    control: 92,
    talisman: { name: 'Luka Modrić', role: 'The Maestro' },
    history: "2018 Finalists, 2022 3rd Place.",
    recentForm: "Always perform better than expected on the big stage.",
    style: "Midfield dominance. They control the game through Modric and Kovacic.",
    stats: [
      { label: "Scoring Power", value: "76/100", description: "They often win games 1-0 or on penalties." },
      { label: "Defensive Solidity", value: "86/100", description: "Extremely resilient and disciplined." },
      { label: "Ball Control", value: "92/100", description: "One of the best midfields in the world." }
    ]
  },
  germany: {
    id: 'germany',
    name: 'Germany',
    rank: 12,
    code: 'de',
    group: 'E',
    vibeCheck: "The 'Nationalmannschaft' is back. A mix of legendary efficiency and new flair.",
    scoringPower: 89,
    theWall: 81,
    control: 91,
    talisman: { name: 'Jamal Musiala', role: 'The Magic' },
    history: "4x World Cup Winners.",
    recentForm: "Improving rapidly after a few down years.",
    style: "High-pressing and technical. They want to dominate the ball in the opponent's half.",
    stats: [
      { label: "Scoring Power", value: "89/100", description: "High. Musiala and Wirtz are incredibly creative." },
      { label: "Defensive Solidity", value: "81/100", description: "Sometimes caught out by fast counter-attacks." },
      { label: "Ball Control", value: "91/100", description: "Excellent. They are very comfortable in tight spaces." }
    ]
  },
  morocco: {
    id: 'morocco',
    name: 'Morocco',
    rank: 13,
    code: 'ma',
    group: 'C',
    vibeCheck: "The pride of Africa. A perfectly organized defensive unit with fast attackers.",
    scoringPower: 75,
    theWall: 91,
    control: 79,
    talisman: { name: 'Achraf Hakimi', role: 'The Flyer' },
    history: "First African team to reach a World Cup Semi-Final (2022).",
    recentForm: "The best team in Africa right now.",
    style: "Compact and disciplined. They are the hardest team to score against in the world.",
    stats: [
      { label: "Scoring Power", value: "75/100", description: "They rely on set-pieces and fast breaks." },
      { label: "Defensive Solidity", value: "91/100", description: "Elite. They defend as a complete unit." },
      { label: "Ball Control", value: "79/100", description: "Functional and safe." }
    ]
  },
  uruguay: {
    id: 'uruguay',
    name: 'Uruguay',
    rank: 14,
    code: 'uy',
    group: 'H',
    vibeCheck: "Pure passion and 'Garra Charrúa' (never-say-die spirit).",
    scoringPower: 87,
    theWall: 84,
    control: 80,
    talisman: { name: 'Darwin Núñez', role: 'The Chaos' },
    history: "2x World Cup Winners.",
    recentForm: "Playing high-intensity football under Marcelo Bielsa.",
    style: "Ultra-high intensity. They run more than any other team and press constantly.",
    stats: [
      { label: "Scoring Power", value: "87/100", description: "Very high. They create a lot of chances through pressure." },
      { label: "Defensive Solidity", value: "84/100", description: "Aggressive and tough." },
      { label: "Ball Control", value: "80/100", description: "They prefer to win the ball back high up the pitch." }
    ]
  },
  usa: {
    id: 'usa',
    name: 'usa',
    rank: 15,
    code: 'us',
    group: 'D',
    vibeCheck: "The hosts. A young, athletic team with a point to prove on home soil.",
    scoringPower: 79,
    theWall: 82,
    control: 81,
    talisman: { name: 'Christian Pulisic', role: 'Captain America' },
    history: "Quarter-finalists in 2002.",
    recentForm: "Dominant in their region, looking to step up against world giants.",
    style: "Athletic and energetic. They rely on their physical fitness and fast wingers.",
    stats: [
      { label: "Scoring Power", value: "79/100", description: "Improving, but need more consistency from their strikers." },
      { label: "Defensive Solidity", value: "82/100", description: "Solid, but can be prone to individual errors." },
      { label: "Ball Control", value: "81/100", description: "Much better than in previous years; they can now keep the ball." }
    ]
  },
  mexico: {
    id: 'mexico',
    name: 'Mexico',
    rank: 16,
    code: 'mx',
    group: 'A',
    vibeCheck: "Passionate and technical. They always have incredible support in the stands.",
    scoringPower: 77,
    theWall: 79,
    control: 83,
    talisman: { name: 'Santiago Giménez', role: 'The Hope' },
    history: "Reached the Round of 16 in 7 consecutive World Cups (1994-2018).",
    recentForm: "Going through a period of change, but always tough to beat.",
    style: "Technical and possession-based. They like to play short passes and move the ball quickly.",
    stats: [
      { label: "Scoring Power", value: "77/100", description: "Struggling lately to find a consistent goalscorer." },
      { label: "Defensive Solidity", value: "79/100", description: "Brave but sometimes physically outmatched." },
      { label: "Ball Control", value: "83/100", description: "Very good. Mexican players are naturally technical." }
    ]
  },
  switzerland: {
    id: 'switzerland',
    name: 'Switzerland',
    rank: 17,
    code: 'ch',
    group: 'B',
    vibeCheck: "The 'Giant Killers'. They are organized, smart, and very hard to break down.",
    scoringPower: 74,
    theWall: 88,
    control: 85,
    talisman: { name: 'Granit Xhaka', role: 'The General' },
    history: "Reached the Quarter-finals in Euro 2020 and 2024.",
    recentForm: "Incredibly consistent. They almost always make it out of the group stage.",
    style: "Disciplined and tactical. They play a very structured game and rarely make mistakes.",
    stats: [
      { label: "Scoring Power", value: "74/100", description: "Efficient but not explosive." },
      { label: "Defensive Solidity", value: "88/100", description: "Very strong. They defend as a compact block." },
      { label: "Ball Control", value: "85/100", description: "Very good. Xhaka controls the game from deep." }
    ]
  },
  japan: {
    id: 'japan',
    name: 'Japan',
    rank: 18,
    code: 'jp',
    group: 'F',
    vibeCheck: "The 'Blue Samurai'. Fast, technical, and incredibly disciplined.",
    scoringPower: 81,
    theWall: 80,
    control: 84,
    talisman: { name: 'Takefusa Kubo', role: 'The Technician' },
    history: "Reached the Round of 16 in 2018 and 2022.",
    recentForm: "Beating European giants like Germany and Spain recently.",
    style: "Fast and technical. They use quick transitions and high-speed passing to cut through teams.",
    stats: [
      { label: "Scoring Power", value: "81/100", description: "Very dangerous on the counter-attack." },
      { label: "Defensive Solidity", value: "80/100", description: "Disciplined and hard-working." },
      { label: "Ball Control", value: "84/100", description: "Excellent. Their players have great technique." }
    ]
  },
  iran: {
    id: 'iran',
    name: 'Iran',
    rank: 19,
    code: 'ir',
    group: 'G',
    vibeCheck: "The best in Asia. A tough, physical team that is very hard to score against.",
    scoringPower: 73,
    theWall: 85,
    control: 72,
    talisman: { name: 'Mehdi Taremi', role: 'The Striker' },
    history: "6 World Cup appearances.",
    recentForm: "Dominant in Asian qualifying.",
    style: "Defensive and direct. They sit deep and look for Taremi to hold the ball up.",
    stats: [
      { label: "Scoring Power", value: "73/100", description: "Rely on their star strikers for everything." },
      { label: "Defensive Solidity", value: "85/100", description: "Very tough and physical." },
      { label: "Ball Control", value: "72/100", description: "Functional and direct." }
    ]
  },
  senegal: {
    id: 'senegal',
    name: 'Senegal',
    rank: 20,
    code: 'sn',
    group: 'I',
    vibeCheck: "The 'Lions of Teranga'. Physical, fast, and full of top-level experience.",
    scoringPower: 80,
    theWall: 83,
    control: 78,
    talisman: { name: 'Mohamed Salah', role: 'The Icon', image: 'https://res.cloudinary.com/readviews-365/image/upload/v1776440062/Players/Mohamed_Salah_-_egypt_vw4shw.jpg' },
    history: "Quarter-finalists in 2002, AFCON 2021 Champions.",
    recentForm: "Consistently the strongest team in Africa over the last 5 years.",
    style: "Physical and powerful. They use their strength in midfield and speed up front.",
    stats: [
      { label: "Scoring Power", value: "80/100", description: "Dangerous, especially from wide areas." },
      { label: "Defensive Solidity", value: "83/100", description: "Strong and athletic." },
      { label: "Ball Control", value: "78/100", description: "Solid and powerful." }
    ]
  }
};
