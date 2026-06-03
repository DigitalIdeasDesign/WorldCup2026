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
  france: {
    id: 'france',
    name: 'France',
    rank: 1,
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
    rank: 2,
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
  argentina: {
    id: 'argentina',
    name: 'Argentina',
    rank: 3,
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
  portugal: {
    id: 'portugal',
    name: 'Portugal',
    rank: 5,
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
  brazil: {
    id: 'brazil',
    name: 'Brazil',
    rank: 6,
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
  netherlands: {
    id: 'netherlands',
    name: 'Netherlands',
    rank: 7,
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
  morocco: {
    id: 'morocco',
    name: 'Morocco',
    rank: 8,
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
  belgium: {
    id: 'belgium',
    name: 'Belgium',
    rank: 9,
    code: 'be',
    group: 'G',
    vibeCheck: "A team in transition with exciting young talent mixed with veteran experience.",
    scoringPower: 84,
    theWall: 80,
    control: 85,
    talisman: { name: 'Kevin De Bruyne', role: 'The Architect', image: 'https://res.cloudinary.com/readviews-365/image/upload/q_auto/f_auto/v1776358247/Goalkeepers/Thibaut_Courtois_-_Belgium_doe3n3.jpg' },
    history: "3rd Place in 2018 World Cup.",
    recentForm: "Rebuilding after their 'Golden Generation', but still very dangerous.",
    style: "Tactical and creative. They look to find De Bruyne in space to unlock defenses.",
    stats: [
      { label: "Scoring Power", value: "84/100", description: "Good, but heavily dependent on their key playmakers." },
      { label: "Defensive Solidity", value: "80/100", description: "A work in progress as they integrate new defenders." },
      { label: "Ball Control", value: "85/100", description: "Very technical midfield that keeps the ball well." }
    ]
  },
  germany: {
    id: 'germany',
    name: 'Germany',
    rank: 10,
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
  colombia: {
    id: 'colombia',
    name: 'Colombia',
    rank: 13,
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
  senegal: {
    id: 'senegal',
    name: 'Senegal',
    rank: 14,
    code: 'sn',
    group: 'I',
    vibeCheck: "The 'Lions of Teranga'. Physical, fast, and full of top-level experience.",
    scoringPower: 80,
    theWall: 83,
    control: 78,
    talisman: { name: 'Nicolas Jackson', role: 'Main Danger' },
    history: "Quarter-finalists in 2002, AFCON 2021 Champions.",
    recentForm: "Consistently the strongest team in Africa over the last 5 years.",
    style: "Physical and powerful. They use their strength in midfield and speed up front.",
    stats: [
      { label: "Scoring Power", value: "80/100", description: "Dangerous, especially from wide areas." },
      { label: "Defensive Solidity", value: "83/100", description: "Strong and athletic." },
      { label: "Ball Control", value: "78/100", description: "Solid and powerful." }
    ]
  },
  mexico: {
    id: 'mexico',
    name: 'Mexico',
    rank: 15,
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
  usa: {
    id: 'usa',
    name: 'USA',
    rank: 16,
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
  uruguay: {
    id: 'uruguay',
    name: 'Uruguay',
    rank: 17,
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
  switzerland: {
    id: 'switzerland',
    name: 'Switzerland',
    rank: 19,
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
  iran: {
    id: 'iran',
    name: 'Iran',
    rank: 20,
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
  italy: {
    id: 'italy',
    name: 'Italy',
    rank: 21,
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
  southkorea: {
    id: 'southkorea',
    name: 'South Korea',
    rank: 22,
    code: 'kr',
    group: 'A',
    vibeCheck: "High-octane energetic team, featuring lethal counter-attacks and tireless pressing.",
    scoringPower: 83,
    theWall: 76,
    control: 79,
    talisman: { name: 'Son Heung-min', role: 'Elite Finisher' },
    history: "11 World Cup participations, historically reaching Semifinals in 2002.",
    recentForm: "Excellent run in Asia, playing fluid attacking transition football.",
    style: "Direct, pacey attacks utilizing overlapping runs and quick overlaps.",
    stats: [
      { label: "Scoring Power", value: "83/100", description: "Highly efficient counter attacking offense." },
      { label: "Defensive Solidity", value: "76/100", description: "Disciplined backline though susceptible to physical target-men." },
      { label: "Ball Control", value: "79/100", description: "Fast transit game bypassing congested midfields." }
    ]
  },
  ecuador: {
    id: 'ecuador',
    name: 'Ecuador',
    rank: 23,
    code: 'ec',
    group: 'E',
    vibeCheck: "Extremely athletic and physically imposing. Perfect team synergy.",
    scoringPower: 79,
    theWall: 82,
    control: 80,
    talisman: { name: 'Moisés Caicedo', role: 'Midfield Engine' },
    history: "4 World Cup campaigns, including Round of 16 in 2006.",
    recentForm: "Incredible defensive solidity in South American qualification.",
    style: "Aggressive pressing, fast-paced vertical wing play and tight defensive blocks.",
    stats: [
      { label: "Scoring Power", value: "79/100", description: "Opportunists on set pieces and crosses." },
      { label: "Defensive Solidity", value: "82/100", description: "Rock solid and extremely disciplined on the low block." },
      { label: "Ball Control", value: "80/100", description: "Heavy physical dominance in the middle circles." }
    ]
  },
  austria: {
    id: 'austria',
    name: 'Austria',
    rank: 24,
    code: 'at',
    group: 'J',
    vibeCheck: "Fierce modern pressing machine. Highly tactical, high rhythm and coordination.",
    scoringPower: 81,
    theWall: 80,
    control: 82,
    talisman: { name: 'Marcel Sabitzer', role: 'Tactical General' },
    history: "7 historic World Cup participations. Third place in 1954.",
    recentForm: "Excellent tactical performance in Euro tournaments showing heavy pressing.",
    style: "Gegenpressing. High tempo vertical passes immediately after recouping the ball.",
    stats: [
      { label: "Scoring Power", value: "81/100", description: "Explosive transition attacking maneuvers." },
      { label: "Defensive Solidity", value: "80/100", description: "Rely heavily on high line pressing trapping." },
      { label: "Ball Control", value: "82/100", description: "Dynamic possession focused on quick spatial advantages." }
    ]
  },
  australia: {
    id: 'australia',
    name: 'Australia',
    rank: 26,
    code: 'au',
    group: 'D',
    vibeCheck: "Fierce Aussie grit. Uncompromising physically, robust physically and mentally.",
    scoringPower: 76,
    theWall: 78,
    control: 75,
    talisman: { name: 'Mathew Ryan', role: 'Captain Keeper' },
    history: "6 World Cup appearances, reaching Round of 16 in 2006 and 2022.",
    recentForm: "Resilient qualification route through the hard Asian battles.",
    style: "Physical, organized, utilizing crossing routes and strong defensive blocks.",
    stats: [
      { label: "Scoring Power", value: "76/100", description: "Dangerous on set pieces and aerial crosses." },
      { label: "Defensive Solidity", value: "78/100", description: "Highly physical, never giving an inch in the box." },
      { label: "Ball Control", value: "75/100", description: "Pragmatic, direct structure prioritizing defensive safety." }
    ]
  },
  canada: {
    id: 'canada',
    name: 'Canada',
    rank: 27,
    code: 'ca',
    group: 'B',
    vibeCheck: "The rising maple leaf. Lightning fast, athletic, and playing completely fearless.",
    scoringPower: 80,
    theWall: 74,
    control: 77,
    talisman: { name: 'Alphonso Davies', role: 'Explosive Catalyst' },
    history: "Co-hosts of the 2026 edition. 2 historic World Cup appearances (1986, 2022).",
    recentForm: "Highly competitive Copa America semifinalists displaying brilliant transitions.",
    style: "Fearsome pace on the wings, quick transition, high direct counter attacks.",
    stats: [
      { label: "Scoring Power", value: "80/100", description: "Lethal on open breakaways with world class wing speed." },
      { label: "Defensive Solidity", value: "74/100", description: "Improving, but can occasionally be bypassed on counters." },
      { label: "Ball Control", value: "77/100", description: "Dynamic wing transitions using technical overlaps." }
    ]
  },
  norway: {
    id: 'norway',
    name: 'Norway',
    rank: 29,
    code: 'no',
    group: 'I',
    vibeCheck: "Boasting the absolute most physically terrifying center forward on Earth.",
    scoringPower: 88,
    theWall: 73,
    control: 76,
    talisman: { name: 'Erling Haaland', role: 'Apex Goal Machine' },
    history: "3 historic World Cup appearances, reaching Round of 16 in 1998.",
    recentForm: "Inconsistent in team qualifying, but always possessing lethal offense.",
    style: "Direct, high-efficiency vertical paths feeds to clear physical targets.",
    stats: [
      { label: "Scoring Power", value: "88/100", description: "World class clinical scoring through Erling Haaland." },
      { label: "Defensive Solidity", value: "73/100", description: "Work in progress, occasionally struggle on set defense blocks." },
      { label: "Ball Control", value: "76/100", description: "Controlled midfield service seeking direct linkups." }
    ]
  },
  panama: {
    id: 'panama',
    name: 'Panama',
    rank: 30,
    code: 'pa',
    group: 'L',
    vibeCheck: "Incredibly physical, cohesive, and enjoying their golden soccer generation.",
    scoringPower: 73,
    theWall: 77,
    control: 72,
    talisman: { name: 'Adalberto Carrasquilla', role: 'Midfield Maestro' },
    history: "1 historic World Cup appearance in Russia 2018.",
    recentForm: "Great competitive results in recent continental tournaments, surprising giants.",
    style: "Compact lines, high physical confrontation, and swift direct transition.",
    stats: [
      { label: "Scoring Power", value: "73/100", description: "Solid counter attackers with high stamina." },
      { label: "Defensive Solidity", value: "77/100", description: "Fiercely physical and resilient on low block positioning." },
      { label: "Ball Control", value: "72/100", description: "Rely on their midfield engine to disrupt and transition." }
    ]
  },
  egypt: {
    id: 'egypt',
    name: 'Egypt',
    rank: 34,
    code: 'eg',
    group: 'G',
    vibeCheck: "Cohesive tactical structure built around arguably Africa's greatest modern attacker.",
    scoringPower: 84,
    theWall: 79,
    control: 76,
    talisman: { name: 'Mohamed Salah', role: 'The Pharaoh Icon', image: 'https://res.cloudinary.com/readviews-365/image/upload/v1776440062/Players/Mohamed_Salah_-_egypt_vw4shw.jpg' },
    history: "7-time historical African Nations Cup Winners. 3 World Cup appearances.",
    recentForm: "Solid progress in African qualifying, heavily relying on structure.",
    style: "Compact defensive organization with rapid transitions directed at Mohamed Salah.",
    stats: [
      { label: "Scoring Power", value: "84/100", description: "Elite finishing capabilities when Salah is unleashed." },
      { label: "Defensive Solidity", value: "79/100", description: "Well-drilled and highly defensive minded." },
      { label: "Ball Control", value: "76/100", description: "Disciplined, cautious possession style." }
    ]
  },
  algeria: {
    id: 'algeria',
    name: 'Algeria',
    rank: 35,
    code: 'dz',
    group: 'J',
    vibeCheck: "Highly technical individualists playing with exceptional flair and pride.",
    scoringPower: 81,
    theWall: 75,
    control: 80,
    talisman: { name: 'Riyad Mahrez', role: 'Wing Wizard' },
    history: "4 World Cup campaigns, including historic Round of 16 run in 2014.",
    recentForm: "Rebuilding tactical discipline under new coaching, heavily talented.",
    style: "Possession-based flair attacking, tricky wing dribbles, high press.",
    stats: [
      { label: "Scoring Power", value: "81/100", description: "Magnificent shooting and set piece capabilities." },
      { label: "Defensive Solidity", value: "75/100", description: "Talented but sometimes vulnerable to swift counters." },
      { label: "Ball Control", value: "80/100", description: "Naturally gifted ball manipulators in tight areas." }
    ]
  },
  scotland: {
    id: 'scotland',
    name: 'Scotland',
    rank: 36,
    code: 'gb-sct',
    group: 'C',
    vibeCheck: "Passionate Scottish warriors backed by the formidable Tartan Army.",
    scoringPower: 75,
    theWall: 79,
    control: 76,
    talisman: { name: 'Andrew Robertson', role: 'Tireless Captain' },
    history: "8 historical World Cup appearances. Energetic Euro campaigns.",
    recentForm: "Consistently qualifying for modern European tournaments.",
    style: "Deep, compact defensive blocks coupled with massive aerial and physical threats.",
    stats: [
      { label: "Scoring Power", value: "75/100", description: "Extremely dangerous on set pieces and late box runs." },
      { label: "Defensive Solidity", value: "79/100", description: "Fierce, tight defensive block with high organization." },
      { label: "Ball Control", value: "76/100", description: "Combative midfield that values recovery above all else." }
    ]
  },
  paraguay: {
    id: 'paraguay',
    name: 'Paraguay',
    rank: 39,
    code: 'py',
    group: 'D',
    vibeCheck: "Defensive specialists proud of their traditional low block grit.",
    scoringPower: 74,
    theWall: 83,
    control: 72,
    talisman: { name: 'Miguel Almirón', role: 'Counter Catalyst' },
    history: "8 World Cup campaigns, historically reaching Quarterfinals in 2010.",
    recentForm: "Tough to beat, drawing games against giants in qualification.",
    style: "Ultra defensive stance, fast paced breakaway transitions.",
    stats: [
      { label: "Scoring Power", value: "74/100", description: "Modest scoring rate, seeking fast break errors." },
      { label: "Defensive Solidity", value: "83/100", description: "Remarkably tough, solid inside the penalty box." },
      { label: "Ball Control", value: "72/100", description: "Rely on direct distribution bypassing midfield build ups." }
    ]
  },
  tunisia: {
    id: 'tunisia',
    name: 'Tunisia',
    rank: 40,
    code: 'tn',
    group: 'F',
    vibeCheck: "Strategic and disciplined. Masters of nullifying high talent offenses.",
    scoringPower: 71,
    theWall: 81,
    control: 73,
    talisman: { name: 'Ellyes Skhiri', role: 'Midfield Anchor' },
    history: "6 historical World Cup appearances, consistently hard to beat.",
    recentForm: "Excellent defensive clean sheet record in recent qualifying.",
    style: "Low defensive posture, highly patient organization, and slow temp tempo control.",
    stats: [
      { label: "Scoring Power", value: "71/100", description: "Conservative attacking, focusing on set play conversions." },
      { label: "Defensive Solidity", value: "81/100", description: "Elite geometric defensive discipline." },
      { label: "Ball Control", value: "73/100", description: "Controlled tempo designed to stifle oppositions." }
    ]
  },
  ivorycoast: {
    id: 'ivorycoast',
    name: "Côte d'Ivoire",
    rank: 42,
    code: 'ci',
    group: 'E',
    vibeCheck: "Rich blend of elite speed, physical power and creative street flair.",
    scoringPower: 82,
    theWall: 78,
    control: 81,
    talisman: { name: 'Franck Kessié', role: 'Midfield General' },
    history: "3 World Cup appearances. AFCON Champions in 1992, 2015, and 2023.",
    recentForm: "Reigning African Kings playing incredibly dominant competitive soccer.",
    style: "High energy physical presses coupled with devastating winger overloads.",
    stats: [
      { label: "Scoring Power", value: "82/100", description: "Highly balanced attacking options across both corridors." },
      { label: "Defensive Solidity", value: "78/100", description: "Highly athletic backline, commanding in the air." },
      { label: "Ball Control", value: "81/100", description: "Commanding, high energy midfield dictation." }
    ]
  },
  uzbekistan: {
    id: 'uzbekistan',
    name: 'Uzbekistan',
    rank: 50,
    code: 'uz',
    group: 'K',
    vibeCheck: "The rising powerhouse of Central Asia. Dynamic, hungry, and highly tech.",
    scoringPower: 75,
    theWall: 74,
    control: 73,
    talisman: { name: 'Eldor Shomurodov', role: 'Captain Marksman' },
    history: "Making historic strides in Asian continental qualification tournaments.",
    recentForm: "Slick, disciplined attacking sequences defeating several established teams.",
    style: "Disciplined defensive shape leading to sudden geometric counter structures.",
    stats: [
      { label: "Scoring Power", value: "75/100", description: "Efficient finishing with direct link ups." },
      { label: "Defensive Solidity", value: "74/100", description: "Extremely dedicated and highly structured block defenses." },
      { label: "Ball Control", value: "73/100", description: "Fast transition distribution oriented." }
    ]
  },
  qatar: {
    id: 'qatar',
    name: 'Qatar',
    rank: 51,
    code: 'qa',
    group: 'B',
    vibeCheck: "Years of hyper-cohesive tactical squad development showing absolute unity.",
    scoringPower: 77,
    theWall: 71,
    control: 78,
    talisman: { name: 'Akram Afif', role: 'Creative Catalyst' },
    history: "Hosts of World Cup 2022. Back-to-back AFC Asian Cup Champions (2019, 2023).",
    recentForm: "Sustained success on the Asian stage displaying incredible team chemistry.",
    style: "Intricate short passing midfields, structured positional interchanges.",
    stats: [
      { label: "Scoring Power", value: "77/100", description: "Excellent combination plays breaching boxes." },
      { label: "Defensive Solidity", value: "71/100", description: "Organized, but can struggle against world class size." },
      { label: "Ball Control", value: "78/100", description: "Hyper-cohesive possession play built on deep understanding." }
    ]
  },
  saudiarabia: {
    id: 'saudiarabia',
    name: 'Saudi Arabia',
    rank: 60,
    code: 'sa',
    group: 'H',
    vibeCheck: "Incredible speed in transition, high-line defensive trap specialists.",
    scoringPower: 76,
    theWall: 72,
    control: 75,
    talisman: { name: 'Salem Al-Dawsari', role: 'Maverick Playmaker' },
    history: "6 World Cup participations, notably defeating Argentina in 2022 opener.",
    recentForm: "Highly competitive, disciplined battles in AFC stages.",
    style: "Extremely aggressive high pressure, rapid transition through the center of fields.",
    stats: [
      { label: "Scoring Power", value: "76/100", description: "Capable of individual moments of magic." },
      { label: "Defensive Solidity", value: "72/100", description: "High risk high line layout traps." },
      { label: "Ball Control", value: "75/100", description: "Technically agile, comfortable in tight central traps." }
    ]
  },
  southafrica: {
    id: 'southafrica',
    name: 'South Africa',
    rank: 61,
    code: 'za',
    group: 'A',
    vibeCheck: "Bafana Bafana's attractive 'shoe-shine' soccer. Exceptional rhythm.",
    scoringPower: 74,
    theWall: 76,
    control: 78,
    talisman: { name: 'Ronwen Williams', role: 'Linchpin Keeper' },
    history: "3 historical World Cup appearances including hosts of the iconic 2010 edition.",
    recentForm: "Brilliant podium finish at AFCON 2023 playing highly fluid soccer.",
    style: "Short-range passing triangles, rapid interchanging, and positional control.",
    stats: [
      { label: "Scoring Power", value: "74/100", description: "Patient, tactical build ups trying to unlock boxes." },
      { label: "Defensive Solidity", value: "76/100", description: "Safe and reliant on high goalie control." },
      { label: "Ball Control", value: "78/100", description: "Superb short-passing rhythm, hard to press." }
    ]
  },
  jordan: {
    id: 'jordan',
    name: 'Jordan',
    rank: 66,
    code: 'jo',
    group: 'J',
    vibeCheck: "Fearless Asian giant-killers playing with fierce pride and tactical rigor.",
    scoringPower: 75,
    theWall: 73,
    control: 71,
    talisman: { name: 'Mousa Al-Tamari', role: 'Dribbling Dynamo' },
    history: "Sensationally reached the AFC Asian Cup Final in 2023 for the first time.",
    recentForm: "Historic high confidence run, fighting till the final whistles.",
    style: "Direct physical counter attacks built on tight spatial containment.",
    stats: [
      { label: "Scoring Power", value: "75/100", description: "Highly reliant on Al-Tamari's brilliant dribbling drives." },
      { label: "Defensive Solidity", value: "73/100", description: "Compact blocks relying heavily on high mental focus." },
      { label: "Ball Control", value: "71/100", description: "Transition-oriented, ignoring low possession counts." }
    ]
  },
  capeverde: {
    id: 'capeverde',
    name: 'Cabo Verde',
    rank: 68,
    code: 'cv',
    group: 'H',
    vibeCheck: "The Blue Sharks play creative, fearless, completely joyful soccer.",
    scoringPower: 74,
    theWall: 72,
    control: 75,
    talisman: { name: 'Ryan Mendes', role: 'Inspirational Captain' },
    history: "Sensationally surged to AFCON Quarterfinals in 2013 and 2023.",
    recentForm: "Widely praised as Africa's most entertaining dark horse contender.",
    style: "Highly rapid symmetric wide overloads, creative technical dribbling.",
    stats: [
      { label: "Scoring Power", value: "74/100", description: "Speed-focused fluid offensive runs." },
      { label: "Defensive Solidity", value: "72/100", description: "Brave but occasionally exposed on heavy numbers forward." },
      { label: "Ball Control", value: "75/100", description: "Adventurous possession stance looking to entertain." }
    ]
  },
  ghana: {
    id: 'ghana',
    name: 'Ghana',
    rank: 72,
    code: 'gh',
    group: 'L',
    vibeCheck: "Athletic prowess blended with elite European top flight midfield experience.",
    scoringPower: 81,
    theWall: 71,
    control: 75,
    talisman: { name: 'Mohammed Kudus', role: 'Dynamic Playmaker' },
    history: "4 historical World Cup appearances, reaching the 2010 Quarterfinal.",
    recentForm: "Undergoing transitional rebuild but always dangerous on paper.",
    style: "High physical battle ratios, creative individual attacking maneuvers.",
    stats: [
      { label: "Scoring Power", value: "81/100", description: "Lethal shooting from range through Kudus." },
      { label: "Defensive Solidity", value: "71/100", description: "Individually strong but searching for team cohesion." },
      { label: "Ball Control", value: "75/100", description: "Fast paced physical distribution." }
    ]
  },
  curacao: {
    id: 'curacao',
    name: 'Curaçao',
    rank: 82,
    code: 'cw',
    group: 'E',
    vibeCheck: "Caribbean flair underpinned by elite Dutch tactical foundation.",
    scoringPower: 72,
    theWall: 70,
    control: 73,
    talisman: { name: 'Juninho Bacuna', role: 'Midfield Engine' },
    history: "Consistently punching well above demographic weight in CONCACAF.",
    recentForm: "Highly competitive performances showing robust modern structures.",
    style: "Slick Dutch style positional play mixed with rapid tropical breakaways.",
    stats: [
      { label: "Scoring Power", value: "72/100", description: "Vigorous and creative wing patterns." },
      { label: "Defensive Solidity", value: "70/100", description: "Highly dedicated but can be pierced by top tier speed." },
      { label: "Ball Control", value: "73/100", description: "Tactical, patient playmaking routes." }
    ]
  },
  haiti: {
    id: 'haiti',
    name: 'Haiti',
    rank: 84,
    code: 'ht',
    group: 'C',
    vibeCheck: "Dynamic raw athleticism coupled with incredible team fighting spirit.",
    scoringPower: 73,
    theWall: 69,
    control: 68,
    talisman: { name: 'Frantzdy Pierrot', role: 'Target Marksman' },
    history: "Historic World Cup participants in Germany 1974.",
    recentForm: "Fierce Gold Cup battles showing extreme scoring courage.",
    style: "Extremely direct vertical service targeting high physical forwards.",
    stats: [
      { label: "Scoring Power", value: "73/100", description: "Physically dominant inside the penalty box." },
      { label: "Defensive Solidity", value: "69/100", description: "Vulnerable to high tempo pass maneuvers." },
      { label: "Ball Control", value: "68/100", description: "Straightforward, non congested route-one distributions." }
    ]
  },
  newzealand: {
    id: 'newzealand',
    name: 'New Zealand',
    rank: 86,
    code: 'nz',
    group: 'G',
    vibeCheck: "Robust Oceania champions featuring direct aerial routes and tall fighters.",
    scoringPower: 76,
    theWall: 71,
    control: 70,
    talisman: { name: 'Chris Wood', role: 'Apex Finisher' },
    history: "2 historical World Cup deployments, famously remaining undefeated in 2010.",
    recentForm: "Undefeated across continental OFC stages, dominating physical matchups.",
    style: "Classic wing crossing play aiming directly for veteran center-back targets.",
    stats: [
      { label: "Scoring Power", value: "76/100", description: "Highly lethal inside the box via Chris Wood." },
      { label: "Defensive Solidity", value: "71/100", description: "Strong and tall, but occasionally vulnerable to pace." },
      { label: "Ball Control", value: "70/100", description: "Basic possession structures directing play externally." }
    ]
  },
  bosnia: {
    id: 'bosnia',
    name: 'Bosnia and Herzegovina',
    rank: 65,
    code: 'ba',
    group: 'B',
    vibeCheck: "Experienced warriors led by legends, looking to shock group favorites.",
    scoringPower: 74,
    theWall: 73,
    control: 72,
    talisman: { name: 'Edin Džeko', role: 'Eternal Goalscorer' },
    history: "Qualified for the 2014 World Cup, continuing to produce elite-level talents.",
    recentForm: "Solid defensive organisation with high physical robustness.",
    style: "Compact shape with direct play targeting physical forwards.",
    stats: [
      { label: "Scoring Power", value: "74/100", description: "Led by highly clinical veteran strikers." },
      { label: "Defensive Solidity", value: "73/100", description: "Aggressive and disciplined defensive unit." },
      { label: "Ball Control", value: "72/100", description: "Pragmatic style focusing on rapid transition play." }
    ]
  },
  drcongo: {
    id: 'drcongo',
    name: 'DR Congo',
    rank: 61,
    code: 'cd',
    group: 'K',
    vibeCheck: "Leopard power! Quick, energetic, and completely unpredictable on their day.",
    scoringPower: 75,
    theWall: 72,
    control: 71,
    talisman: { name: 'Yoane Wissa', role: 'Dynamic Winger' },
    history: "AFCON standouts, famously appearing as Zaire in 1974.",
    recentForm: "Incredible speed and counter-attacking prowess in recent qualification stages.",
    style: "Direct football leveraging physical and rapid athletic transitions.",
    stats: [
      { label: "Scoring Power", value: "75/100", description: "Extremely fast wingers and clinical box finishers." },
      { label: "Defensive Solidity", value: "72/100", description: "Highly physical, though occasionally disorganized under pressure." },
      { label: "Ball Control", value: "71/100", description: "Direct play utilizing athletic supremacy." }
    ]
  },
  czechia: {
    id: 'czechia',
    name: 'Czechia',
    rank: 35,
    code: 'cz',
    group: 'A',
    vibeCheck: "A technically sound and hardworking central European force.",
    scoringPower: 78,
    theWall: 76,
    control: 75,
    talisman: { name: 'Patrik Schick', role: 'Sleek Striker' },
    history: "Incredible legacy as Czechoslovakia (Runners up 1934, 1962). Euro 2020 Quarterfinalists.",
    recentForm: "Consistent performances against top European nations.",
    style: "Highly organized, relying on physical power and set-piece headers.",
    stats: [
      { label: "Scoring Power", value: "78/100", description: "Lethal shooting from range and elite header capabilities." },
      { label: "Defensive Solidity", value: "76/100", description: "Rigid structure with highly disciplined centre backs." },
      { label: "Ball Control", value: "75/100", description: "Pragmatic build-up with dominant wing play." }
    ]
  },
  iraq: {
    id: 'iraq',
    name: 'Iraq',
    rank: 55,
    code: 'iq',
    group: 'I',
    vibeCheck: "A proud and passionate squad that plays with immense high-tempo spirit.",
    scoringPower: 73,
    theWall: 71,
    control: 73,
    talisman: { name: 'Zidane Iqbal', role: 'Midfield Maestro' },
    history: "1986 World Cup participants and legendary 2007 Asian Cup Winners.",
    recentForm: "Strong regional qualifications showing tremendous defensive resilience.",
    style: "Channeled wing attacks with aggressive high pressure.",
    stats: [
      { label: "Scoring Power", value: "73/100", description: "Capable of brilliant moments of individual skill." },
      { label: "Defensive Solidity", value: "71/100", description: "Compact and hardworking mid-block defense." },
      { label: "Ball Control", value: "73/100", description: "Talented ball career play making setups across lines." }
    ]
  },
  sweden: {
    id: 'sweden',
    name: 'Sweden',
    rank: 28,
    code: 'se',
    group: 'F',
    vibeCheck: "A new era of dynamic, young attacking superstars ready to explode.",
    scoringPower: 86,
    theWall: 77,
    control: 79,
    talisman: { name: 'Viktor Gyökeres', role: 'Apex Striker' },
    history: "World Cup Runners-Up in 1958, 3rd place in 1994. Consistent powerhouse.",
    recentForm: "Lethal and free-flowing attack dominating European goals tallies.",
    style: "High-intensity technical counter-pressing and fluid frontline.",
    stats: [
      { label: "Scoring Power", value: "86/100", description: "Lethal combination of Gyokeres and Alexander Isak." },
      { label: "Defensive Solidity", value: "77/100", description: "Strong and tall, but learning a new modern higher line system." },
      { label: "Ball Control", value: "79/100", description: "Fluid technical control through high-pressing transitions." }
    ]
  },
  turkey: {
    id: 'turkey',
    name: 'Türkiye',
    rank: 26,
    code: 'tr',
    group: 'D',
    vibeCheck: "Unmatched passion met with dynamic, fast, youthful technical brilliant magic.",
    scoringPower: 82,
    theWall: 75,
    control: 81,
    talisman: { name: 'Arda Güler', role: 'The Golden Boy' },
    history: "Legendary 3rd Place finish in World Cup 2002. Euro 2024 Quarterfinalists.",
    recentForm: "Thrilling wins with high-intensity modern playing design.",
    style: "Expressive attacking fluid shapes, technical combination plays.",
    stats: [
      { label: "Scoring Power", value: "82/100", description: "Extremely creative playmakers and spectacular long range Shooters." },
      { label: "Defensive Solidity", value: "75/100", description: "Aggressive defending, though occasionally open to counter-attacks." },
      { label: "Ball Control", value: "81/100", description: "High technical standard in keeping possession under high pressure." }
    ]
  }
};
