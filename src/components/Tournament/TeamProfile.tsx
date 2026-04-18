import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Globe, 
  TrendingUp, 
  Shield, 
  Target, 
  Zap, 
  History, 
  Activity, 
  Star,
  Trophy,
  Calendar,
  Users
} from 'lucide-react';
import { NATIONS_DATA } from '../../constants/nationsData';

const TeamProfile = () => {
  const { nationId } = useParams();
  const navigate = useNavigate();
  const nation = nationId ? NATIONS_DATA[nationId.toLowerCase()] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!nation) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-headline font-black text-white uppercase mb-4">Nation Not Found</h1>
        <Link to="/scouting-hub" className="text-primary font-bold uppercase tracking-widest hover:underline">Back to Scouting Hub</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <img 
          src={`https://flagcdn.com/w1280/${nation.code}.png`} 
          alt={nation.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm scale-110"
          referrerPolicy="no-referrer"
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <Link to="/scouting-hub" className="flex items-center gap-2 text-outline-variant font-bold hover:text-white mb-8 transition-colors text-xs uppercase tracking-widest w-fit">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Hub
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-headline font-black uppercase tracking-widest">
                  FIFA Rank #{nation.rank}
                </span>
                <span className="px-4 py-1.5 bg-secondary/20 text-secondary border border-secondary/30 rounded-full text-xs font-headline font-black uppercase tracking-widest">
                  Group {nation.group}
                </span>
              </div>
              <h1 className="text-7xl md:text-9xl font-headline font-black uppercase tracking-tighter leading-none mb-4">
                {nation.name}
              </h1>
              <p className="text-xl md:text-2xl text-on-surface-variant font-medium italic max-w-2xl border-l-4 border-primary pl-6 py-2">
                "{nation.vibeCheck}"
              </p>
            </div>
            
            <div className="hidden lg:block w-64 glass-card border border-white/10 p-6 rounded-2xl shadow-2xl">
              <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-4">The Talisman</p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-surface-container-highest flex items-center justify-center overflow-hidden border border-white/5 relative">
                  {nation.talisman.image ? (
                    <img src={nation.talisman.image} alt={nation.talisman.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="text-3xl font-headline font-black text-primary">{nation.talisman.name[0]}</span>
                  )}
                </div>
                <div>
                  <p className="font-headline font-black uppercase text-white leading-tight">{nation.talisman.name}</p>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">{nation.talisman.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <main className="max-w-7xl mx-auto px-4 mt-12 grid lg:grid-cols-[1fr_350px] gap-12">
        <div className="space-y-12">
          {/* Scouting Report */}
          <section className="glass-card border border-white/10 rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-headline font-black uppercase text-white mb-8 flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-4xl">analytics</span> Scouting Report
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">Scoring Power</p>
                  <p className="text-2xl font-headline font-black text-white">{nation.scoringPower}%</p>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${nation.scoringPower}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-primary"
                  />
                </div>
                <p className="text-[10px] text-outline-variant font-medium">How likely they are to find the net.</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">The Wall</p>
                  <p className="text-2xl font-headline font-black text-white">{nation.theWall}%</p>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${nation.theWall}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-secondary"
                  />
                </div>
                <p className="text-[10px] text-outline-variant font-medium">How hard it is to score against them.</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">Control</p>
                  <p className="text-2xl font-headline font-black text-white">{nation.control}%</p>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${nation.control}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-white"
                  />
                </div>
                <p className="text-[10px] text-outline-variant font-medium">How well they keep the ball and dictate pace.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Tactical Style</h3>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  {nation.style}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div>
                  <h3 className="text-xs font-bold text-secondary uppercase tracking-[0.2em] mb-4">Recent Form</h3>
                  <p className="text-on-surface-variant">{nation.recentForm}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-outline-variant uppercase tracking-[0.2em] mb-4">Tournament History</h3>
                  <p className="text-on-surface-variant">{nation.history}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Novice Friendly Stats */}
          <section className="space-y-6">
            <h2 className="text-xl font-headline font-black uppercase text-white tracking-widest">Deep Dive Stats</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {nation.stats.map((stat, i) => (
                <div key={i} className="glass-card border border-white/5 p-6 rounded-2xl bg-surface-container-highest/20">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-headline font-black text-white mb-2">{stat.value}</p>
                  <p className="text-xs text-outline-variant leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="glass-card border border-white/10 p-8 rounded-3xl sticky top-24">
            <h3 className="text-lg font-headline font-black uppercase text-white mb-6">Group {nation.group} Standings</h3>
            <div className="space-y-4">
              {['Argentina', 'Germany', 'USA', 'Mexico'].map((team, i) => (
                <div key={team} className={`flex items-center justify-between p-3 rounded-xl border ${team === nation.name ? 'bg-primary/10 border-primary/30' : 'bg-surface-container-highest/30 border-white/5'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-outline-variant">{i + 1}</span>
                    <span className={`text-sm font-bold ${team === nation.name ? 'text-white' : 'text-outline-variant'}`}>{team}</span>
                  </div>
                  <span className="text-[10px] font-bold text-outline-variant">0 pts</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-lg font-headline font-black uppercase text-white mb-6">Next Match</h3>
              <div className="bg-surface-container-highest/50 p-4 rounded-xl border border-white/5 text-center">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">June 11, 2026</p>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-xl font-headline font-black uppercase">{nation.name.substring(0, 3)}</span>
                  <span className="text-xs text-outline-variant font-bold">VS</span>
                  <span className="text-xl font-headline font-black uppercase">RSA</span>
                </div>
                <p className="text-[10px] text-outline-variant uppercase">Mexico City • 1:00 PM</p>
              </div>
            </div>

            <button 
              onClick={() => navigate('/scouting-hub')}
              className="w-full mt-8 py-4 bg-surface-container-highest border border-white/10 rounded-xl font-headline font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all"
            >
              View All Contenders
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default TeamProfile;
