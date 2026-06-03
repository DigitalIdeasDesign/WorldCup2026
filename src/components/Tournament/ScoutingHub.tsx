import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  TrendingUp, 
  Shield, 
  Target, 
  ChevronRight, 
  Search, 
  Filter, 
  Calendar,
  Activity,
  Zap,
  Star,
  MapPin,
  Clock,
  Users,
  Info,
  ClipboardList
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { NATIONS_DATA } from '../../constants/nationsData';
import { SCHEDULE_DATA, Match } from '../../constants/scheduleData';
import { SQUADS_DATA } from '../../constants/squadsData';

const TEAM_FLAGS: Record<string, string> = {
  'South Africa': 'za',
  'Czechia': 'cz',
  'Canada': 'ca',
  'Bosnia and Herzegovina': 'ba',
  'Paraguay': 'py',
  'Qatar': 'qa',
  'Haiti': 'ht',
  'Scotland': 'gb-sct',
  'Australia': 'au',
  'Türkiye': 'tr',
  'Curaçao': 'cw',
  'Ecuador': 'ec',
  'Tunisia': 'tn',
  'Cabo Verde': 'cv',
  'Egypt': 'eg',
  'Saudi Arabia': 'sa',
  'New Zealand': 'nz',
  'Iraq': 'iq',
  'Norway': 'no',
  'Algeria': 'dz',
  'Austria': 'at',
  'Jordan': 'jo',
  'Congo DR': 'cd',
  'Ghana': 'gh',
  'Panama': 'pa',
  'Uzbekistan': 'uz',
  'Korea Republic': 'kr',
  'Sweden': 'se',
  'Côte d\'Ivoire': 'ci',
  'IR Iran': 'ir'
};

const US_VENUES = [
  {
    city: "Dallas / Arlington",
    stadium: "AT&T Stadium",
    capacity: "92,967",
    teams: "Dallas Cowboys (NFL)",
    facts: "One of the largest venues in the tournament; it has a retractable roof and giant center-hung video board, and will host a 2026 semifinal."
  },
  {
    city: "Atlanta",
    stadium: "Mercedes-Benz Stadium",
    capacity: "75,000",
    teams: "Atlanta Falcons (NFL), Atlanta United FC (MLS)",
    facts: "Known for its retractable roof and major soccer presence; it will host a semifinal."
  },
  {
    city: "Boston / Foxborough",
    stadium: "Gillette Stadium",
    capacity: "65,000",
    teams: "New England Patriots (NFL), New England Revolution (MLS)",
    facts: "It’s in Foxborough, not Boston proper, and has been renovated ahead of the tournament."
  },
  {
    city: "Houston",
    stadium: "NRG Stadium",
    capacity: "72,000",
    teams: "Houston Texans (NFL)",
    facts: "A roofed NFL stadium in a hot-weather city, useful for summer heat control."
  },
  {
    city: "Kansas City",
    stadium: "GEHA Field at Arrowhead Stadium",
    capacity: "73,000",
    teams: "Kansas City Chiefs (NFL)",
    facts: "One of the noisiest football venues in America; Kansas City did not host World Cup matches in 1994."
  },
  {
    city: "Los Angeles / Inglewood",
    stadium: "SoFi Stadium",
    capacity: "70,000",
    teams: "Los Angeles Rams, Los Angeles Chargers (NFL)",
    facts: "A modern megastadium in a major global city; one of the biggest draws for international fans."
  },
  {
    city: "Miami / Miami Gardens",
    stadium: "Hard Rock Stadium",
    capacity: "65,000",
    teams: "Miami Dolphins (NFL), Miami Hurricanes (college)",
    facts: "Will host seven matches, including knockout games and the third-place match."
  },
  {
    city: "New York / New Jersey",
    stadium: "MetLife Stadium",
    capacity: "82,500",
    teams: "New York Giants, New York Jets (NFL)",
    facts: "The final will be played here, but the stadium is in East Rutherford, New Jersey rather than New York City."
  },
  {
    city: "Philadelphia",
    stadium: "Lincoln Financial Field",
    capacity: "69,000",
    teams: "Philadelphia Eagles (NFL), Philadelphia Union (MLS)",
    facts: "A strong soccer venue that regularly hosts major matches."
  },
  {
    city: "San Francisco Bay Area / Santa Clara",
    stadium: "Levi’s Stadium",
    capacity: "71,000",
    teams: "San Francisco 49ers (NFL)",
    facts: "A newer stadium in Silicon Valley, giving the tournament a major West Coast tech-city feel."
  },
  {
    city: "Seattle",
    stadium: "Lumen Field",
    capacity: "69,000",
    teams: "Seattle Seahawks (NFL), Seattle Sounders FC (MLS)",
    facts: "Famous for loud crowds and one of the best soccer atmospheres in the U.S."
  }
];

const MX_CA_VENUES = [
  {
    city: "Mexico City",
    stadium: "Estadio Azteca",
    capacity: "87,523",
    teams: "Club América, Cruz Azul, Mexico national team",
    facts: "The only stadium in this tournament that has already hosted World Cup matches in two separate editions, and in 2026 it will be the first venue to host men’s World Cup matches in three tournaments. It sits about 2,240 meters above sea level."
  },
  {
    city: "Guadalajara / Zapopan",
    stadium: "Estadio Akron",
    capacity: "48,000",
    teams: "C.D. Guadalajara (Chivas)",
    facts: "Guadalajara is hosting World Cup matches for a third time, and the city is one of Mexico’s football powerhouses."
  },
  {
    city: "Monterrey / Guadalupe",
    stadium: "Estadio BBVA",
    capacity: "53,500",
    teams: "C.F. Monterrey",
    facts: "Monterrey returns as a host city and brings a dramatic mountain backdrop plus a strong football culture."
  },
  {
    city: "Toronto",
    stadium: "BMO Field",
    capacity: "45,000",
    teams: "Toronto FC (MLS), Toronto Argonauts (CFL)",
    facts: "Canada’s largest city and a major multicultural center with a strong football fan base."
  },
  {
    city: "Vancouver",
    stadium: "BC Place",
    capacity: "54,000",
    teams: "Vancouver Whitecaps FC (MLS), BC Lions (CFL)",
    facts: "A large domed stadium in a city known for its waterfront setting and outdoor culture."
  }
];

const STANDOUT_TRIVIA = [
  { title: "Capital & Altitude", text: "Mexico City is the only host-city capital among the three host nations, and the city’s altitude is the most extreme in the tournament.", icon: <TrendingUp className="w-4 h-4 text-primary" /> },
  { title: "Historic Sharing", text: "The 2026 tournament will be the first men’s World Cup shared by three countries.", icon: <Globe className="w-4 h-4 text-secondary" /> },
  { title: "Historic Venue", text: "Estadio Azteca is the most historic venue in the group because it has already been part of two World Cups and will make history again in 2026.", icon: <Star className="w-4 h-4 text-primary" /> },
  { title: "The Final", text: "MetLife Stadium will host the final, even though many people casually call it the “New York” final because of the metro area branding.", icon: <Target className="w-4 h-4 text-secondary" /> },
  { title: "The Semifinals", text: "Dallas and Atlanta were selected for the semifinals, making them the biggest late-tournament stages after the final.", icon: <Zap className="w-4 h-4 text-primary" /> }
];

const VenueCard = ({ venue }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="glass-card border border-white/10 rounded-2xl p-5 hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-white text-lg font-headline font-black uppercase tracking-tight group-hover:text-primary transition-colors">{venue.city}</h4>
          <p className="text-[11px] md:text-xs text-outline-variant font-bold uppercase tracking-widest">{venue.stadium}</p>
        </div>
        <div className="bg-surface-container-highest px-3 py-1.5 rounded text-[11px] font-bold text-white uppercase">
          {venue.capacity}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4 pt-4 border-t border-white/5"
          >
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Local Teams</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">{venue.teams}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Scouting Notes</p>
              <p className="text-xs text-on-surface-variant leading-relaxed italic">"{venue.facts}"</p>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center gap-1 text-[11px] font-bold text-outline-variant uppercase tracking-widest mt-2 group-hover:text-white transition-colors">
            <Info className="w-3 h-3" /> Tap for details
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ScoutingHub = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const [filter, setFilter] = useState('all');
  const [scheduleView, setScheduleView] = useState<'date' | 'stage'>('date');
  const [expandedItems, setExpandedItems] = useState<string[]>(['Jun 11']); // Expand first day by default

  // National Squad Hub states
  const [squadSearchQuery, setSquadSearchQuery] = useState('');
  const [squadFilterGroup, setSquadFilterGroup] = useState('all');
  const [activeSquad, setActiveSquad] = useState<any | null>(null);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getFlagCode = (teamName: string) => {
    if (teamName === 'TBD') return 'un';
    if (TEAM_FLAGS[teamName]) return TEAM_FLAGS[teamName];
    const nation = Object.values(NATIONS_DATA).find(n => n.name.toLowerCase() === teamName.toLowerCase());
    return nation ? nation.code : 'un';
  };

  const getNationId = (teamName: string): string => {
    if (teamName === 'TBD') return '';
    const norm = teamName.toLowerCase().trim();
    if (norm === 'south korea' || norm === 'korea republic') return 'southkorea';
    if (norm === 'iran' || norm === 'ir iran') return 'iran';
    if (norm === 'cape verde' || norm === 'cabo verde') return 'capeverde';
    if (norm === 'ivory coast' || norm === "côte d'ivoire" || norm === "cote d'ivoire") return 'ivorycoast';
    if (norm === 'new zealand') return 'newzealand';
    if (norm === 'saudi arabia') return 'saudiarabia';
    if (norm === 'south africa') return 'southafrica';
    if (norm === 'czech republic' || norm === 'czechia') return 'czechia';
    if (norm === 'dr congo' || norm === 'congo dr') return 'drcongo';
    if (norm === 'bosnia' || norm === 'bosnia-herzegovina' || norm === 'bosnia and herzegovina') return 'bosnia';
    if (norm === 'united states' || norm === 'usa' || norm === 'us') return 'usa';
    if (norm === 'turkey' || norm === 'türkiye') return 'turkey';
    return norm.replace(/[^a-z0-9]/g, '');
  };

  const getSquadKey = (name: string): string => {
    const norm = name.toLowerCase();
    if (norm === 'south korea') return 'korea republic';
    if (norm === 'iran' || norm === 'ir iran') return 'ir iran';
    if (norm === 'cape verde' || norm === 'cabo verde') return 'cabo verde';
    return norm;
  };

  const matchesByDate = SCHEDULE_DATA.reduce((acc, match) => {
    if (!acc[match.date]) acc[match.date] = [];
    acc[match.date].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  const matchesByStage = SCHEDULE_DATA.reduce((acc, match) => {
    if (!acc[match.stage]) acc[match.stage] = [];
    acc[match.stage].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  const nations = Object.values(NATIONS_DATA).sort((a, b) => a.rank - b.rank);

  const filteredNations = filter === 'all' 
    ? nations 
    : nations.filter(n => n.group === filter);

  const tabs = [
    { id: 'matches', label: 'Upcoming Matches', icon: <Calendar className="w-4 h-4" /> },
    { id: 'contenders', label: 'Teams by Ranking', icon: <Users className="w-4 h-4" /> },
    { id: 'info', label: 'Tournament Info', icon: <Info className="w-4 h-4" /> }
  ];

  return (
    <motion.div 
      key="scouting-hub"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto space-y-12 pb-20 duration-500"
    >
      <header className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter text-white">Scouting Hub</h1>
          <p className="text-on-surface-variant text-sm md:text-base lg:text-lg max-w-2xl">Your ultimate guide to the 2026 contenders. Analyze stats, scouting reports, and schedules.</p>
        </div>

        {/* Tab System */}
        <div className="w-full lg:w-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:flex bg-surface-container-highest/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center lg:justify-start gap-2 px-4 py-3 rounded-xl text-[10px] md:text-xs font-headline font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'text-outline-variant hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'matches' && (
          <motion.section 
            key="matches-tab"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-headline font-black uppercase text-white flex items-center gap-3">
                  <Calendar className="text-primary w-6 h-6" /> Tournament Schedule
                </h2>
                <p className="text-xs md:text-sm text-outline-variant font-bold uppercase tracking-widest">
                  104 Matches • 48 Teams • 3 Nations
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex bg-surface-container-highest/50 p-1 rounded-xl border border-white/5 backdrop-blur-sm">
                  <button
                    onClick={() => {
                      setScheduleView('date');
                      setExpandedItems(['Jun 11']);
                    }}
                    className={`px-5 py-2 rounded-lg text-xs font-headline font-black uppercase tracking-widest transition-all ${
                      scheduleView === 'date' ? 'bg-primary text-on-primary shadow-lg' : 'text-outline-variant hover:text-white'
                    }`}
                  >
                    By Date
                  </button>
                  <button
                    onClick={() => {
                      setScheduleView('stage');
                      setExpandedItems(['Group Stage']);
                    }}
                    className={`px-5 py-2 rounded-lg text-xs font-headline font-black uppercase tracking-widest transition-all ${
                      scheduleView === 'stage' ? 'bg-primary text-on-primary shadow-lg' : 'text-outline-variant hover:text-white'
                    }`}
                  >
                    By Stage
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(scheduleView === 'date' ? matchesByDate : matchesByStage).map(([groupKey, matches]) => (
                <div key={groupKey} className="glass-card border border-white/5 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleItem(groupKey)}
                    className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        expandedItems.includes(groupKey) ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-outline-variant'
                      }`}>
                        {scheduleView === 'date' ? <Clock className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                      </div>
                      <div className="text-left">
                        <h3 className="text-white text-lg font-headline font-black uppercase tracking-tight">{groupKey}</h3>
                        <p className="text-[11px] text-outline-variant font-bold uppercase tracking-widest">
                          {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-outline-variant transition-transform duration-300 ${
                      expandedItems.includes(groupKey) ? 'rotate-90 text-primary' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {expandedItems.includes(groupKey) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/5 backdrop-blur-sm bg-black/10"
                      >
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {matches.map((m, i) => (
                            <div key={i} className="bg-surface-container-highest/20 hover:bg-surface-container-highest/40 border border-white/5 hover:border-primary/20 rounded-xl p-5 transition-all group/match flex flex-col justify-between shadow-sm">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-col">
                                  <span className="text-[11px] font-bold text-primary uppercase tracking-widest">{m.date}</span>
                                  <span className="text-[11px] text-outline-variant font-medium uppercase">{m.time}</span>
                                </div>
                                <div className="bg-surface-container-highest px-2 py-1 rounded text-[10px] font-bold text-white uppercase">
                                  {m.stage === 'Group Stage' ? `Group ${m.group}` : m.stage}
                                </div>
                              </div>

                              <div className="flex items-center justify-between gap-4 mb-4">
                                <Link 
                                  to={`/scouting-hub/nations/${getNationId(m.homeTeam)}`}
                                  className="flex-1 flex flex-col items-center gap-2 cursor-pointer group/flag hover:opacity-85 transition-opacity overflow-hidden"
                                >
                                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-white/10 group-hover/flag:border-primary/50 transition-colors">
                                    <img 
                                      src={`https://flagcdn.com/w80/${getFlagCode(m.homeTeam)}.png`} 
                                      alt="" 
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <span className="text-xs font-headline font-black text-white uppercase text-center truncate w-full group-hover/flag:text-primary transition-colors">{m.homeTeam}</span>
                                </Link>
                                
                                <div className="text-xs font-black text-outline-variant uppercase">VS</div>

                                <Link 
                                  to={`/scouting-hub/nations/${getNationId(m.awayTeam)}`}
                                  className="flex-1 flex flex-col items-center gap-2 cursor-pointer group/flag hover:opacity-85 transition-opacity overflow-hidden"
                                >
                                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-white/10 group-hover/flag:border-primary/50 transition-colors">
                                    <img 
                                      src={`https://flagcdn.com/w80/${getFlagCode(m.awayTeam)}.png`} 
                                      alt="" 
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <span className="text-xs font-headline font-black text-white uppercase text-center truncate w-full group-hover/flag:text-primary transition-colors">{m.awayTeam}</span>
                                </Link>
                              </div>

                              <a 
                                href={m.matchLink || "#"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full py-3 rounded-lg bg-white/5 text-[10px] md:text-xs font-bold text-outline-variant uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all block text-center"
                              >
                                Match Details
                              </a>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.section>
        )}


        {activeTab === 'contenders' && (
          <motion.section 
            key="contenders-tab"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-black uppercase text-white tracking-tight">Teams by Ranking</h2>
                <p className="text-xs text-outline-variant font-medium max-w-md">
                  Browse the 48 nations competing in the 2026 finals. Groups with fewer than 4 teams represent pending qualifiers.
                </p>
              </div>
              
              <div className="w-full lg:w-auto">
                {/* Mobile & Tablet Filter Dropdown */}
                <div className="block lg:hidden w-full relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    <Filter className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full bg-surface-container-highest/50 border border-white/10 rounded-xl pl-11 pr-10 py-3.5 text-xs font-headline font-black uppercase tracking-widest text-white tracking-wider focus:outline-none focus:border-primary/55 appearance-none cursor-pointer"
                  >
                    <option value="all" className="bg-surface-container-highest text-white">All Teams</option>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map(g => (
                      <option key={g} value={g} className="bg-surface-container-highest text-white">Group {g}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline-variant flex items-center">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>

                {/* Desktop Filter Chips */}
                <div className="hidden lg:flex flex-wrap gap-2 max-w-2xl">
                  {['all', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map(g => (
                    <button
                      key={g}
                      onClick={() => setFilter(g)}
                      className={`px-4 py-2.5 rounded-xl text-[10px] font-headline font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
                        filter === g 
                          ? 'bg-primary text-on-primary border-primary shadow-[0_0_20px_rgba(var(--color-primary),0.3)] scale-105' 
                          : 'bg-surface-container-highest/30 text-outline-variant hover:text-white border-white/5 hover:border-white/20'
                      }`}
                    >
                      {g === 'all' ? 'All Teams' : `Group ${g}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Render Real Nations */}
              {filteredNations.map((nation) => (
                <Link 
                  to={`/scouting-hub/nations/${nation.id}`} 
                  key={nation.id}
                  className="group glass-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(var(--color-primary),0.15)] flex flex-col"
                >
                  <div className="relative h-32 bg-surface-container-highest overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img 
                      src={`https://flagcdn.com/w640/${nation.code}.png`} 
                      alt={nation.name} 
                      className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 left-6 z-20">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/20 px-2 py-0.5 rounded-sm">Rank #{nation.rank}</span>
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest bg-secondary/20 px-2 py-0.5 rounded-sm">Group {nation.group}</span>
                      </div>
                      <h3 className="text-2xl font-headline font-black text-white uppercase tracking-tight">{nation.name}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col gap-6">
                    <p className="text-xs text-on-surface-variant font-medium leading-relaxed italic border-l-2 border-primary/30 pl-3">
                      "{nation.vibeCheck}"
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Scoring</p>
                        <p className="text-sm font-headline font-black text-white">{nation.scoringPower}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Defense</p>
                        <p className="text-sm font-headline font-black text-white">{nation.theWall}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Control</p>
                        <p className="text-sm font-headline font-black text-white">{nation.control}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-white/5">
                          {nation.talisman.image ? (
                            <img src={nation.talisman.image} alt={nation.talisman.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <span className="text-[10px] font-headline font-black text-primary">{nation.talisman.name[0]}</span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-outline-variant uppercase tracking-wider">{nation.talisman.name}</span>
                      </div>
                      <span className="material-symbols-outlined text-primary text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Render Placeholders if a specific group is selected */}
              {filter !== 'all' && filteredNations.length < 4 && Array.from({ length: 4 - filteredNations.length }).map((_, i) => (
                <div 
                  key={`placeholder-${i}`}
                  className="group glass-card border border-dashed border-white/10 rounded-2xl overflow-hidden opacity-60 flex flex-col grayscale"
                >
                  <div className="relative h-32 bg-surface-container-highest/20 flex items-center justify-center">
                    <Globe className="w-12 h-12 text-white/10" />
                    <div className="absolute bottom-4 left-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-sm">Rank TBD</span>
                        <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-sm">Group {filter}</span>
                      </div>
                      <h3 className="text-2xl font-headline font-black text-white/40 uppercase tracking-tight">Pending...</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col gap-6">
                    <div className="h-10 border-l-2 border-white/5 pl-3 flex items-center">
                      <div className="h-2 w-3/4 bg-white/5 rounded-full animate-pulse" />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map(j => (
                        <div key={j} className="text-center space-y-2">
                          <div className="h-1.5 w-8 bg-white/5 rounded-full mx-auto" />
                          <div className="h-3 w-6 bg-white/5 rounded-full mx-auto" />
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/5 mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/5" />
                        <div className="h-2 w-16 bg-white/5 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'info' && (
          <motion.section 
            key="info-tab"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-16"
          >
            <div className="flex items-center gap-4 mb-10">
               <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
               <h2 className="text-xs font-bold text-outline-variant uppercase tracking-[0.3em]">Tournament Logistics</h2>
               <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 glass-card border border-white/10 p-8 rounded-2xl">
                <h3 className="text-lg font-headline font-black uppercase text-primary mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Tournament Format
                </h3>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-4 text-sm font-bold text-outline-variant">
                    <p className="flex items-start gap-3"><span className="text-primary">•</span> 12 groups of four teams each. Top two + 8 best 3rd-place teams advance.</p>
                    <p className="flex items-start gap-3"><span className="text-primary">•</span> 32 teams start the knockout phase. Single elimination.</p>
                  </div>
                  <div className="space-y-4 text-sm font-bold text-outline-variant">
                    <p className="flex items-start gap-3"><span className="text-primary">•</span> 104 matches across 39 days (June 11 – July 19).</p>
                    <p className="flex items-start gap-3"><span className="text-primary">•</span> Shared by Canada, Mexico, and the USA across 16 host cities.</p>
                  </div>
                </div>
              </div>

              <div className="glass-card border border-primary/20 bg-primary/5 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                <Globe className="text-primary w-12 h-12 mb-4" />
                <h3 className="text-2xl font-headline font-black text-white uppercase tracking-tight mb-2">48 Nations</h3>
                <p className="text-xs text-outline-variant font-bold uppercase tracking-widest">The largest World Cup in history</p>
              </div>
            </div>

            {/* Media & Resources Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-headline font-black uppercase text-white flex items-center gap-2">
                  <Activity className="text-secondary w-5 h-5" /> Media & Resources
                </h3>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-card border border-white/10 p-6 rounded-2xl">
                  <h4 className="text-white font-headline font-black uppercase tracking-tight text-sm mb-4">Official Socials</h4>
                  <div className="space-y-3">
                    <a href="https://www.instagram.com/reel/C28bsLRLHKl/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
                      <span className="text-[11px] font-bold text-outline-variant uppercase group-hover:text-primary transition-colors">Instagram Highlight #1</span>
                      <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-primary" />
                    </a>
                    <a href="https://www.instagram.com/reel/C28P3q_LkGE/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
                      <span className="text-[11px] font-bold text-outline-variant uppercase group-hover:text-primary transition-colors">Instagram Highlight #2</span>
                      <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-primary" />
                    </a>
                    <a href="https://www.instagram.com/reel/C28UBSXreQy/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
                      <span className="text-[11px] font-bold text-outline-variant uppercase group-hover:text-primary transition-colors">Instagram Highlight #3</span>
                      <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-primary" />
                    </a>
                  </div>
                </div>

                <div className="glass-card border border-white/10 p-6 rounded-2xl">
                  <h4 className="text-white font-headline font-black uppercase tracking-tight text-sm mb-4">Quick Links</h4>
                  <div className="space-y-4">
                    <a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/world-cup-2026-who-has-qualified" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <p className="text-[11px] font-black text-secondary uppercase leading-tight mb-1">Qualifiers Hub</p>
                      <p className="text-[10px] text-outline-variant uppercase tracking-widest">Learn how each team qualified</p>
                    </a>
                    <a href="https://store.fifa.com/?intcmp=%28p_fifacom%29_%28d_fifastore%29_%28c_webheader-main%29_%28sc_shop%29_%28ssc_fifastore%29_%28sssc_%29_%28l_en%29_%28da_27112023%29" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <p className="text-[11px] font-black text-primary uppercase leading-tight mb-1">Official Gear</p>
                      <p className="text-[10px] text-outline-variant uppercase tracking-widest">Shop the 2026 collection</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Explorer */}
            <div className="space-y-12">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-headline font-black uppercase text-white tracking-tight">Venue Explorer</h2>
                <p className="text-xs text-outline-variant font-medium max-w-2xl">
                  Scout the 16 world-class stadiums hosting the 2026 finals. Tap any card to reveal local team info and stadium facts.
                </p>
              </div>

              <div className="space-y-16">
                {/* United States */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-headline font-black uppercase text-white flex items-center gap-2">
                      <img src="https://flagcdn.com/w40/us.png" alt="" className="w-6 h-4 object-cover rounded-sm" referrerPolicy="no-referrer" />
                      United States Venues
                    </h3>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {US_VENUES.map((venue, i) => (
                      <VenueCard key={i} venue={venue} />
                    ))}
                  </div>
                </div>

                {/* Mexico & Canada */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-headline font-black uppercase text-white flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <img src="https://flagcdn.com/w40/mx.png" alt="" className="w-6 h-4 object-cover rounded-sm border border-black/20" referrerPolicy="no-referrer" />
                        <img src="https://flagcdn.com/w40/ca.png" alt="" className="w-6 h-4 object-cover rounded-sm border border-black/20" referrerPolicy="no-referrer" />
                      </div>
                      Mexico & Canada Venues
                    </h3>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {MX_CA_VENUES.map((venue, i) => (
                      <VenueCard key={i} venue={venue} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Standout Trivia Bento */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-headline font-black uppercase text-white flex items-center gap-2">
                  <Star className="text-primary w-5 h-5" /> Scout's Trivia
                </h3>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STANDOUT_TRIVIA.map((item, i) => (
                  <div 
                    key={i}
                    className={`glass-card border border-white/10 p-6 rounded-2xl hover:border-primary/20 transition-all ${
                      i === 0 ? 'lg:col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h4 className="text-white font-headline font-black uppercase tracking-tight text-sm">{item.title}</h4>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'squads' && (() => {
          const ALL_48_NATIONS = [
            { name: "Algeria", code: "dz", group: "J" },
            { name: "Argentina", code: "ar", group: "J" },
            { name: "Australia", code: "au", group: "D" },
            { name: "Austria", code: "at", group: "J" },
            { name: "Belgium", code: "be", group: "G" },
            { name: "Bosnia and Herzegovina", code: "ba", group: "B" },
            { name: "Brazil", code: "br", group: "C" },
            { name: "Cabo Verde", code: "cv", group: "H" },
            { name: "Canada", code: "ca", group: "B" },
            { name: "Colombia", code: "co", group: "K" },
            { name: "Congo DR", code: "cd", group: "K" },
            { name: "Côte d'Ivoire", code: "ci", group: "E" },
            { name: "Croatia", code: "hr", group: "L" },
            { name: "Curaçao", code: "cw", group: "E" },
            { name: "Czechia", code: "cz", group: "A" },
            { name: "Ecuador", code: "ec", group: "E" },
            { name: "Egypt", code: "eg", group: "G" },
            { name: "England", code: "gb-eng", group: "L" },
            { name: "France", code: "fr", group: "I" },
            { name: "Germany", code: "de", group: "E" },
            { name: "Ghana", code: "gh", group: "L" },
            { name: "Haiti", code: "ht", group: "C" },
            { name: "IR Iran", code: "ir", group: "G" },
            { name: "Iraq", code: "iq", group: "I" },
            { name: "Japan", code: "jp", group: "F" },
            { name: "Jordan", code: "jo", group: "J" },
            { name: "Korea Republic", code: "kr", group: "A" },
            { name: "Mexico", code: "mx", group: "A" },
            { name: "Morocco", code: "ma", group: "C" },
            { name: "Netherlands", code: "nl", group: "F" },
            { name: "New Zealand", code: "nz", group: "G" },
            { name: "Norway", code: "no", group: "I" },
            { name: "Panama", code: "pa", group: "L" },
            { name: "Paraguay", code: "py", group: "D" },
            { name: "Portugal", code: "pt", group: "K" },
            { name: "Qatar", code: "qa", group: "B" },
            { name: "Saudi Arabia", code: "sa", group: "H" },
            { name: "Scotland", code: "gb-sct", group: "C" },
            { name: "Senegal", code: "sn", group: "I" },
            { name: "South Africa", code: "za", group: "A" },
            { name: "Spain", code: "es", group: "H" },
            { name: "Sweden", code: "se", group: "F" },
            { name: "Switzerland", code: "ch", group: "B" },
            { name: "Tunisia", code: "tn", group: "F" },
            { name: "Türkiye", code: "tr", group: "D" },
            { name: "Uruguay", code: "uy", group: "H" },
            { name: "USA", code: "us", group: "D" },
            { name: "Uzbekistan", code: "uz", group: "K" }
          ];

          const filteredSquadNations = ALL_48_NATIONS.filter(nation => {
            const matchesGroup = squadFilterGroup === 'all' || nation.group === squadFilterGroup;
            const cleanQuery = squadSearchQuery.toLowerCase().trim();
            if (!cleanQuery) return matchesGroup;

            const matchesName = nation.name.toLowerCase().includes(cleanQuery);
            
            const squadDetail = SQUADS_DATA[getSquadKey(nation.name)];
            const matchesPlayers = squadDetail?.players.some(p => 
              p.name.toLowerCase().includes(cleanQuery) || 
              p.club.toLowerCase().includes(cleanQuery)
            );
            const matchesCoach = squadDetail?.coach.toLowerCase().includes(cleanQuery);

            return matchesGroup && (matchesName || matchesPlayers || matchesCoach);
          });

          return (
            <motion.section 
              key="squads-tab"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-surface-container-highest/30 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="space-y-1">
                  <h2 className="text-3xl font-headline font-black uppercase text-white tracking-tight flex items-center gap-3">
                    <ClipboardList className="text-primary w-8 h-8 animate-pulse" /> National Squad Hub
                  </h2>
                  <p className="text-xs text-outline-variant font-bold uppercase tracking-wider">
                    Complete reference and tactical sheets for all 48 tournament contenders.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline-variant" />
                    <input
                      type="text"
                      value={squadSearchQuery}
                      onChange={(e) => setSquadSearchQuery(e.target.value)}
                      placeholder="Search country, players, or clubs..."
                      className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder:text-outline-variant focus:border-primary/50 focus:outline-none transition-colors font-bold uppercase tracking-wide"
                    />
                    {squadSearchQuery && (
                      <button
                        onClick={() => setSquadSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-primary uppercase hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="flex bg-black/40 border border-white/10 rounded-xl p-1 overflow-x-auto no-scrollbar max-w-full">
                    <select 
                      value={squadFilterGroup}
                      onChange={(e) => setSquadFilterGroup(e.target.value)}
                      className="bg-transparent border-none text-[10px] font-bold text-white px-3 py-1.5 uppercase focus:outline-none cursor-pointer tracking-wider"
                    >
                      <option value="all" className="bg-surface-container-highest text-white">All Groups</option>
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map(g => (
                        <option key={g} value={g} className="bg-surface-container-highest text-white">Group {g}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {filteredSquadNations.length === 0 ? (
                <div className="glass-card border border-dashed border-white/10 p-12 text-center rounded-2xl">
                  <Search className="w-12 h-12 text-outline-variant mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-headline font-black text-white uppercase mb-2">No Roster sheets Found</h3>
                  <p className="text-xs text-outline-variant font-bold uppercase tracking-wider">We couldn't find any team or players matching "{squadSearchQuery}".</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredSquadNations.map((nation) => {
                    const hasRoster = !!SQUADS_DATA[getSquadKey(nation.name)];
                    return (
                      <motion.div
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        key={nation.name}
                        onClick={() => setActiveSquad(SQUADS_DATA[getSquadKey(nation.name)] || { country: nation.name, coach: "TBD", players: [] })}
                        className="group relative bg-surface-container-highest/20 border border-white/5 rounded-xl block p-4 hover:border-primary/40 hover:bg-surface-container-highest/30 transition-all cursor-pointer overflow-hidden shadow-sm"
                      >
                        <div className="absolute right-0 top-0 w-24 h-24 -mr-6 -mt-6 opacity-10 group-hover:opacity-25 group-hover:scale-125 transition-all">
                          <img 
                            src={`https://flagcdn.com/w160/${nation.code}.png`} 
                            alt="" 
                            className="w-full h-full object-cover rounded-full"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <span className="text-[9px] font-black text-secondary bg-secondary/15 px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                          Group {nation.group}
                        </span>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <img 
                            src={`https://flagcdn.com/w40/${nation.code}.png`} 
                            alt="" 
                            className="w-5 h-3.5 object-cover rounded shadow-sm border border-white/10"
                            referrerPolicy="no-referrer"
                          />
                          <h3 className="text-xs font-headline font-black text-white uppercase tracking-tight truncate group-hover:text-primary transition-colors">
                            {nation.name}
                          </h3>
                        </div>

                        <p className="text-[10px] text-outline-variant font-bold uppercase tracking-wider mt-2.5">
                          {hasRoster ? `${SQUADS_DATA[getSquadKey(nation.name)].players.length} Key Players` : 'Roster pending'}
                        </p>

                        <div className="text-[10px] font-black text-primary group-hover:underline mt-4 flex items-center gap-1 uppercase tracking-widest">
                          View Sheet <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.section>
          );
        })()}
      </AnimatePresence>

      {/* Interactive Squad Overlay Modal */}
      <AnimatePresence>
        {activeSquad && (() => {
          const ALL_48_NATIONS_MODAL = [
            { name: "Algeria", code: "dz", group: "J" },
            { name: "Argentina", code: "ar", group: "J" },
            { name: "Australia", code: "au", group: "D" },
            { name: "Austria", code: "at", group: "J" },
            { name: "Belgium", code: "be", group: "G" },
            { name: "Bosnia and Herzegovina", code: "ba", group: "B" },
            { name: "Brazil", code: "br", group: "C" },
            { name: "Cabo Verde", code: "cv", group: "H" },
            { name: "Canada", code: "ca", group: "B" },
            { name: "Colombia", code: "co", group: "K" },
            { name: "Congo DR", code: "cd", group: "K" },
            { name: "Côte d'Ivoire", code: "ci", group: "E" },
            { name: "Croatia", code: "hr", group: "L" },
            { name: "Curaçao", code: "cw", group: "E" },
            { name: "Czechia", code: "cz", group: "A" },
            { name: "Ecuador", code: "ec", group: "E" },
            { name: "Egypt", code: "eg", group: "G" },
            { name: "England", code: "gb-eng", group: "L" },
            { name: "France", code: "fr", group: "I" },
            { name: "Germany", code: "de", group: "E" },
            { name: "Ghana", code: "gh", group: "L" },
            { name: "Haiti", code: "ht", group: "C" },
            { name: "IR Iran", code: "ir", group: "G" },
            { name: "Iraq", code: "iq", group: "I" },
            { name: "Japan", code: "jp", group: "F" },
            { name: "Jordan", code: "jo", group: "J" },
            { name: "Korea Republic", code: "kr", group: "A" },
            { name: "Mexico", code: "mx", group: "A" },
            { name: "Morocco", code: "ma", group: "C" },
            { name: "Netherlands", code: "nl", group: "F" },
            { name: "New Zealand", code: "nz", group: "G" },
            { name: "Norway", code: "no", group: "I" },
            { name: "Panama", code: "pa", group: "L" },
            { name: "Paraguay", code: "py", group: "D" },
            { name: "Portugal", code: "pt", group: "K" },
            { name: "Qatar", code: "qa", group: "B" },
            { name: "Saudi Arabia", code: "sa", group: "H" },
            { name: "Scotland", code: "gb-sct", group: "C" },
            { name: "Senegal", code: "sn", group: "I" },
            { name: "South Africa", code: "za", group: "A" },
            { name: "Spain", code: "es", group: "H" },
            { name: "Sweden", code: "se", group: "F" },
            { name: "Switzerland", code: "ch", group: "B" },
            { name: "Tunisia", code: "tn", group: "F" },
            { name: "Türkiye", code: "tr", group: "D" },
            { name: "Uruguay", code: "uy", group: "H" },
            { name: "USA", code: "us", group: "D" },
            { name: "Uzbekistan", code: "uz", group: "K" }
          ];
          const currentNation = ALL_48_NATIONS_MODAL.find(n => n.name.toLowerCase() === activeSquad.country.toLowerCase()) || { code: 'un', group: '—' };
          
          return (
            <div 
              onClick={() => setActiveSquad(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-surface-container-highest border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col"
              >
                {/* Banner / Header */}
                <div className="relative bg-black/60 p-6 md:p-8 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-11 bg-black/40 rounded overflow-hidden border border-white/10 shadow-lg">
                      <img 
                        src={`https://flagcdn.com/w160/${currentNation.code}.png`} 
                        alt="" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-headline font-black text-white uppercase tracking-tight">{activeSquad.country}</h3>
                      <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Official Squad Sheet Group {currentNation.group}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] text-outline-variant font-bold uppercase tracking-wider block">Head Coach</span>
                    <span className="text-sm font-headline font-black text-white uppercase">{activeSquad.coach}</span>
                  </div>
                </div>

                {/* Player list sheet */}
                <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6 scrollbar-thin">
                  {activeSquad.players && activeSquad.players.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Goalkeepers */}
                      <div className="space-y-2 col-span-1 sm:col-span-2 border-b border-white/5 pb-4">
                        <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                          Goalkeepers
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {activeSquad.players.filter((p: any) => p.pos === 'GK').map((player: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                              <span className="text-xs font-black text-white uppercase">{player.name}</span>
                              <span className="text-[10px] font-bold text-outline-variant uppercase bg-surface-container-highest px-3 py-1.5 rounded tracking-wide">{player.club}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Defenders */}
                      <div className="space-y-2 col-span-1 sm:col-span-2 border-b border-white/5 pb-4">
                        <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                          Defenders
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activeSquad.players.filter((p: any) => p.pos === 'DF').map((player: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                              <span className="text-xs font-black text-white uppercase truncate max-w-[155px]">{player.name}</span>
                              <span className="text-[10px] font-bold text-outline-variant uppercase bg-surface-container-highest px-3 py-1.5 rounded tracking-wide truncate max-w-[130px]">{player.club}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Midfielders */}
                      <div className="space-y-2 col-span-1 sm:col-span-2 border-b border-white/5 pb-4">
                        <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                          Midfielders
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activeSquad.players.filter((p: any) => p.pos === 'MF').map((player: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                              <span className="text-xs font-black text-white uppercase truncate max-w-[155px]">{player.name}</span>
                              <span className="text-[10px] font-bold text-outline-variant uppercase bg-surface-container-highest px-3 py-1.5 rounded tracking-wide truncate max-w-[130px]">{player.club}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Forwards */}
                      <div className="space-y-2 col-span-1 sm:col-span-2">
                        <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                          Forwards
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activeSquad.players.filter((p: any) => p.pos === 'FW').map((player: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                              <span className="text-xs font-black text-white uppercase truncate max-w-[155px]">{player.name}</span>
                              <span className="text-[10px] font-bold text-outline-variant uppercase bg-surface-container-highest px-3 py-1.5 rounded tracking-wide truncate max-w-[130px]">{player.club}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-xs text-outline-variant font-bold uppercase">Official roster sheet is awaiting final submission.</p>
                    </div>
                  )}
                </div>

                {/* Close controls */}
                <div className="bg-black/40 p-4 border-t border-white/5 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveSquad(null)}
                    className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-headline font-black uppercase text-xs tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Close Sheet
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScoutingHub;
