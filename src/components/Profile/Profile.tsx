import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { Loader2, Trophy, Target, Shield, Star, Globe, User as UserIcon, Settings, LogOut, ChevronRight, Activity, TrendingUp, Award, Heart, Edit3, Trash2, CheckCircle2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip
} from "recharts";

import { handleAuthError } from '../../lib/authUtils';
import { auth, db, handleFirestoreError, OperationType } from '../../firebase';
import { TOP_20_FIFA_NATIONS } from '../../constants/teams';
import { TEAM_INFO } from '../Tournament/TournamentApp';
import { NOMINATIONS } from '../../constants/nominations';

export default function Profile({ user, profile, setProfile, onLogout }: any) {
  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [nationality, setNationality] = useState(profile?.nationality || '');
  const [nomination, setNomination] = useState(profile?.nomination || 'peptical');
  const [favoriteTeams, setFavoriteTeams] = useState(profile?.favoriteTeams || [profile?.favoriteTeam || '', '', '']);
  const [favoritePlayers, setFavoritePlayers] = useState(profile?.favoritePlayers || [profile?.favoritePlayer || '', '', '']);
  const [favoriteClubs, setFavoriteClubs] = useState(profile?.favoriteClubs || [profile?.favoriteClub || '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [predictions, setPredictions] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const predRef = doc(db, 'predictions', user.uid);
        const docSnap = await getDoc(predRef);
        if (docSnap.exists()) {
          setPredictions(docSnap.data());
        }
      } catch (err) {
        console.error("Failed to fetch predictions", err);
      }
    };
    fetchPredictions();
  }, [user.uid]);

  // DNA & Risk Logic
  const { dnaData, riskScore, predictionDisplay } = useMemo(() => {
    if (!predictions) return { dnaData: [], riskScore: 0, predictionDisplay: null };

    const p = predictions;
    const bracket = p.bracket || {};
    const awards = p.awards || {};
    const groupRankings = p.groupRankings || {};

    // Risk Calculation (simplified version of TournamentApp logic)
    // We look at R16 teams picked
    const r16Teams: string[] = [];
    Object.values(groupRankings).forEach((teams: any) => {
      if (teams?.[0]) r16Teams.push(teams[0]);
      if (teams?.[1]) r16Teams.push(teams[1]);
    });
    
    let avgRankR16 = 0;
    if (r16Teams.length > 0) {
      avgRankR16 = r16Teams.reduce((acc, t) => acc + (Number(TEAM_INFO[t]?.ranking) || 40), 0) / r16Teams.length;
    }
    const risk = r16Teams.length > 0 ? Math.min(100, Math.max(0, (avgRankR16 / 40) * 100)) : 0;

    // DNA Scores
    const favoriteTeamsList = profile?.favoriteTeams || [];
    let loyaltyScore = 20;
    if (bracket.champion && favoriteTeamsList.includes(bracket.champion)) loyaltyScore = 100;
    else if (bracket.champion && profile?.nationality === bracket.champion) loyaltyScore = 80;

    const starPowerScore = awards.mvp && awards.mvp !== "TBD" ? 85 : 15;
    const defenseScore = awards.goldenGlove && awards.goldenGlove !== "TBD" ? 80 : 15;

    const dna = [
      { subject: "Loyalty", A: loyaltyScore, fullMark: 100 },
      { subject: "Star Power", A: starPowerScore, fullMark: 100 },
      { subject: "Defense Bias", A: defenseScore, fullMark: 100 },
    ];

    return { 
      dnaData: dna, 
      riskScore: risk,
      predictionDisplay: {
        champion: bracket.champion || 'TBD',
        mvp: awards.mvp || 'TBD',
        goldenBoot: awards.goldenBoot || 'TBD',
        goldenGlove: awards.goldenGlove || 'TBD'
      }
    };
  }, [predictions, profile]);

  const handleUnlockPredictions = async () => {
    setUnlocking(true);
    try {
      const predRef = doc(db, 'predictions', user.uid);
      await updateDoc(predRef, { isLocked: false });
      toast.success("Predictions unlocked! Redirecting to editor...");
      navigate('/');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `predictions/${user.uid}`);
    } finally {
      setUnlocking(false);
    }
  };

  const handleResetPredictions = async () => {
    if (!window.confirm("ARE YOU SURE? This will permanently delete all your group stage picks, brackets, and award selections. This cannot be undone.")) {
      return;
    }
    
    setResetting(true);
    try {
      const predRef = doc(db, 'predictions', user.uid);
      const leaderboardRef = doc(db, 'leaderboard', user.uid);
      
      // Reset state
      const emptyState = {
        groupRankings: {},
        wildcards: [],
        bracket: {},
        awards: { mvp: '', goldenBoot: '', goldenGlove: '' },
        isLocked: false,
        updatedAt: Date.now()
      };
      
      await updateDoc(predRef, emptyState);
      
      // Also update leaderboard to reflect the reset
      await updateDoc(leaderboardRef, {
        champion: 'TBD',
        mvp: 'TBD',
        goldenBoot: 'TBD',
        goldenGlove: 'TBD',
        isLocked: false,
        potentialPoints: 0,
        updatedAt: Date.now()
      });
      
      setPredictions(emptyState);
      toast.success("All predictions have been reset to zero.");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `predictions/${user.uid}`);
    } finally {
      setResetting(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !nationality || !favoriteTeams[0] || !favoritePlayers[0] || !favoriteClubs[0]) {
      toast.error("Please fill in all required fields (at least 1 favorite each).");
      return;
    }
    setLoading(true);
    try {
      const displayName = `${firstName} ${lastName}`.trim();
      
      // Update Auth Profile
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }
      
      // Update Email if changed
      if (email !== user.email) {
        await updateEmail(user, email);
      }

      // Update Password if provided
      if (newPassword) {
        await updatePassword(user, newPassword);
      }

      // Update Firestore
      const userRef = doc(db, 'users', user.uid);
      const updates = {
        displayName,
        firstName,
        lastName,
        email,
        nationality,
        nomination,
        favoriteTeams: favoriteTeams.filter(Boolean),
        favoritePlayers: favoritePlayers.filter(Boolean),
        favoriteClubs: favoriteClubs.filter(Boolean),
        updatedAt: Date.now()
      };
      try {
        await updateDoc(userRef, updates);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
      }
      
      setProfile({ ...profile, ...updates });
      toast.success("Identity updated successfully!");
    } catch (err: any) {
      handleAuthError(err, "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      toast.error("Please type DELETE to confirm.");
      return;
    }

    setDeleting(true);
    try {
      // 1. Delete Firestore Data
      const userRef = doc(db, 'users', user.uid);
      const predRef = doc(db, 'predictions', user.uid);
      const leaderboardRef = doc(db, 'leaderboard', user.uid);

      await Promise.all([
        deleteDoc(leaderboardRef),
        deleteDoc(predRef),
        deleteDoc(userRef)
      ]);

      // 2. Delete Auth Account
      await user.delete();

      toast.success("All records purged. Safe journey, Scout.");
      navigate('/login');
    } catch (err: any) {
      console.error("Deletion error:", err);
      if (err?.code === 'auth/requires-recent-login') {
        toast.error("Security verification required. Please logout and login again before deleting.");
      } else {
        toast.error("Failed to complete data purge. Some systems may still hold records.");
      }
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050505] overflow-x-hidden font-body text-white">
      {/* Background Asset */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img 
          alt="FIFA World Cup Trophy" 
          className="w-full h-full object-cover opacity-10 scale-105 blur-[2px]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC93GCr01cNBAJYf3ZOfXlQ0ND6xtCqRybwxxWjLZWtn3OclTKh1BFOpcqg2s7o6T-TRXfdRlGMIbZnRmj8gpmwUfXrhoYko7LmixchsKrdtxKRwakejMXBM91p3IgwnYCDdHhXJ3Jvi9uuikZ5y4bd7_mH_CySwIs9bfU8Ekw4Q0f3KCxg5CPqpXjdLtXQ-E3zQp-6HK2pGjSxvrP9cbQIII7b17DUY92-PUKkpKb7Au_4Pwd6NagAZPBFW3uGpSYtd5rHMkLDP6zb"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,255,200,0.03)_0%,transparent_100%)]"></div>
      </div>

      {/* Navigation Rail / Header */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-all group"
          >
            <ArrowLeft size={16} className="text-outline-variant group-hover:text-primary transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-outline-variant group-hover:text-white">COMMAND CENTER</span>
          </button>
          
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
          
          <div className="flex flex-col">
            <h2 className="text-sm md:text-lg font-headline font-black tracking-tight uppercase leading-none text-primary">STRATEGIC DOSSIER</h2>
            <span className="text-[8px] md:text-[10px] font-bold text-outline-variant tracking-widest uppercase mt-0.5">Scout ID: {user.uid.substring(0, 8)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2.5 rounded-xl border transition-all ${showSettings ? 'bg-primary text-on-primary-fixed border-primary' : 'bg-surface-container-highest/40 border-white/5 text-outline-variant hover:text-white'}`}
          >
             <Settings size={20} />
           </button>
           <button 
             onClick={onLogout}
             className="flex items-center gap-2 p-2.5 md:px-5 rounded-xl bg-error/10 border border-error/20 text-error hover:bg-error/20 transition-all font-headline font-black uppercase tracking-widest text-[10px]"
           >
             <LogOut size={18} />
             <span className="hidden md:inline">Terminate Session</span>
           </button>
        </div>
      </header>

      {/* Main Dossier Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24">
        
        {/* Top: Identity Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card mb-8 p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
             <Trophy size={160} />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary to-primary-fixed rounded-[2.5rem] flex items-center justify-center text-5xl font-headline font-black text-on-primary-fixed shadow-[0_0_40px_rgba(207,252,0,0.2)]">
                {profile?.displayName?.[0]?.toUpperCase() || '?'}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-background border-2 border-primary w-10 h-10 rounded-full flex items-center justify-center">
                 <CheckCircle2 size={24} className="text-primary" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
                 <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                 <span className="text-[10px] font-black tracking-widest text-primary uppercase">ACTIVE OPERATIVE</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-headline font-black text-white tracking-tighter uppercase leading-none mb-4">
                {profile?.displayName}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Rank Identity</span>
                   <span className="font-headline font-black text-secondary-fixed uppercase italic">
                     {NOMINATIONS.find(n => n.id === profile?.nomination)?.title || 'Elite Scout'}
                   </span>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-8">
                   <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Affiliation</span>
                   <span className="font-headline font-black text-white uppercase italic">{profile?.nationality || 'Global'}</span>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-8">
                   <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Clearance Date</span>
                   <span className="font-headline font-black text-white uppercase italic">
                     {new Date(profile?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}
                   </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid: Strategy & Personal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Section: Strategic DNA */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 glass-card p-8 rounded-[2.5rem] border border-white/5 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-headline font-black uppercase tracking-[0.2em] text-on-surface-variant flex items-center gap-2">
                 <Activity size={16} className="text-primary" /> SCOUT DNA
               </h3>
               <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                  <span className="text-[10px] font-black text-primary">RISK: {Math.round(riskScore)}%</span>
               </div>
            </div>

            <div className="h-64 w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dnaData}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: "#ababab", fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }} 
                  />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Scout"
                    dataKey="A"
                    stroke="#f4ffc8"
                    fill="#f4ffc8"
                    fillOpacity={0.4}
                    strokeWidth={2}
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#191919', border: '1px solid #262626', borderRadius: '8px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-auto space-y-4">
               <div className="bg-surface-container-highest/30 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1 italic">Mindset Analysis</p>
                  <p className="text-xs text-white leading-relaxed">
                    {riskScore > 60 ? "Aggressive scout favoring long-shot narratives over statistical probability." : 
                     riskScore < 20 ? "Highly clinical approach, favoring established giants and tournament history." : 
                     "Balanced methodology, mixing logical outcomes with calculated risks."}
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Section: Tournament Objective */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 glass-card p-8 rounded-[2.5rem] border border-white/5"
          >
             <h3 className="text-sm font-headline font-black uppercase tracking-[0.2em] text-on-surface-variant mb-8 flex items-center gap-2">
               <Target size={16} className="text-secondary" /> STRATEGIC INTENT
             </h3>

             <div className="space-y-6">
                <div className="bg-gradient-to-br from-secondary/5 to-transparent p-6 rounded-3xl border border-secondary/10 relative group">
                   <div className="absolute top-4 right-4 text-secondary/20">
                      <Trophy size={48} />
                   </div>
                   <p className="text-[10px] font-bold text-outline-variant uppercase tracking-[0.3em] mb-2 font-mono">CHAMPION_PROTOCOL</p>
                   <p className="text-5xl font-headline font-black text-white uppercase italic tracking-tighter transition-all group-hover:scale-[1.02] origin-left">
                     {predictionDisplay?.champion}
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-surface-container-highest/20 p-5 rounded-3xl border border-white/5">
                      <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-2 font-mono">MVP_SELECTION</p>
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                            <Star size={16} />
                         </div>
                         <p className="text-lg font-headline font-black text-white uppercase italic">{predictionDisplay?.mvp}</p>
                      </div>
                   </div>
                   <div className="bg-surface-container-highest/20 p-5 rounded-3xl border border-white/5">
                      <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-2 font-mono">TOP_SCORER</p>
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <TrendingUp size={16} />
                         </div>
                         <p className="text-lg font-headline font-black text-white uppercase italic">{predictionDisplay?.goldenBoot}</p>
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={predictions?.isLocked ? handleUnlockPredictions : () => navigate('/')}
                    disabled={unlocking}
                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all font-headline font-black uppercase tracking-widest text-[11px]"
                  >
                    {unlocking ? <Loader2 size={16} className="animate-spin" /> : <Edit3 size={16} className="text-primary" />}
                    {predictions?.isLocked ? 'Modify Strategy' : 'Update Bracket'}
                  </button>
                  <button 
                    onClick={handleResetPredictions}
                    disabled={resetting}
                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-error/5 hover:bg-error/10 border border-error/20 rounded-2xl transition-all font-headline font-black uppercase tracking-widest text-[11px] text-error"
                  >
                    {resetting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    Purge Intel
                  </button>
                </div>
             </div>
          </motion.div>

          {/* Section: Clubhouse Favorites */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 glass-card p-8 rounded-[2.5rem] border border-white/5"
          >
             <h3 className="text-sm font-headline font-black uppercase tracking-[0.2em] text-on-surface-variant mb-8 flex items-center gap-2">
               <Heart size={16} className="text-tertiary" /> CLUBHOUSE
             </h3>

             <div className="space-y-8">
                <div>
                   <p className="text-[10px] font-black text-outline-variant uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Globe size={10} /> Top Contenders
                   </p>
                   <div className="space-y-3">
                      {favoriteTeams.map((team: string, i: number) => team && (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/5 transition-hover hover:bg-white/5">
                           <span className="text-[10px] font-black text-primary w-4">0{i+1}</span>
                           <span className="text-sm font-bold uppercase italic">{team}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div>
                   <p className="text-[10px] font-black text-outline-variant uppercase tracking-widest mb-4 flex items-center gap-2">
                     <UserIcon size={10} /> Marquee Talent
                   </p>
                   <div className="space-y-3">
                      {favoritePlayers.map((player: string, i: number) => player && (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/5 transition-hover hover:bg-white/5">
                           <span className="text-[10px] font-black text-secondary w-4">0{i+1}</span>
                           <span className="text-sm font-bold uppercase italic">{player}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div>
                   <p className="text-[10px] font-black text-outline-variant uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Shield size={10} /> Home Grounds
                   </p>
                   <div className="space-y-3">
                      {favoriteClubs.map((club: string, i: number) => club && (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/5 transition-hover hover:bg-white/5">
                           <span className="text-[10px] font-black text-white w-4">0{i+1}</span>
                           <span className="text-sm font-bold uppercase italic">{club}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Identity Management (Collapsible Settings) */}
        <AnimatePresence>
          {showSettings && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card p-12 rounded-[3rem] border border-primary/20 mb-12 relative">
                <div className="absolute top-12 left-12 opacity-5 pointer-events-none">
                   <Settings size={120} />
                </div>
                <div className="max-w-4xl mx-auto">
                  <header className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl font-headline font-black text-white uppercase tracking-tight mb-2 italic">IDENTITY OVERRIDE</h2>
                    <p className="text-outline-variant text-[10px] font-bold uppercase tracking-[0.3em]">Modify secure personnel files</p>
                  </header>

                  <form onSubmit={handleUpdateProfile} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 italic font-mono">FIELD_FIRST_NAME</label>
                        <input 
                          type="text" 
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 text-white font-bold transition-all" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 italic font-mono">FIELD_LAST_NAME</label>
                        <input 
                          type="text" 
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 text-white font-bold transition-all" 
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 italic font-mono">COMMUNICATIONS_UPLINK</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 text-white font-bold transition-all" 
                      />
                    </div>

                    <div className="space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 italic font-mono">SCOUT_CLASSIFICATION</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {NOMINATIONS.map((nom) => (
                          <button
                            key={nom.id}
                            type="button"
                            onClick={() => setNomination(nom.id)}
                            className={`flex items-start gap-4 p-5 rounded-2xl border transition-all text-left group ${
                              nomination === nom.id 
                                ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(207,252,0,0.1)]' 
                                : 'bg-black/40 border-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className={`mt-0.5 p-3 rounded-xl transition-all ${
                              nomination === nom.id ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-outline-variant group-hover:text-white'
                            }`}>
                              <span className="material-symbols-outlined text-xl">{nom.icon}</span>
                            </div>
                            <div>
                              <div className={`text-base font-black uppercase italic leading-none truncate ${
                                nomination === nom.id ? 'text-primary' : 'text-white'
                              }`}>
                                {nom.title}
                              </div>
                              <div className="text-[8px] font-black text-secondary-fixed uppercase tracking-widest mt-1 opacity-70">
                                {nom.subtitle}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 italic font-mono">SECURITY_CREDENTIALS</label>
                        <input 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 text-white font-bold transition-all" 
                          placeholder="REMAIN UNCHANGED" 
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 italic font-mono">ORIGIN_WORLD</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 text-white font-bold transition-all" 
                          />
                          <Globe size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-outline-variant" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8 pt-4 border-t border-white/5">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 italic font-mono">FAVORITE_NATIONS_PRIORITY</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[0, 1, 2].map((index) => (
                            <div key={`team-${index}`} className="relative">
                              <select 
                                required={index === 0}
                                value={favoriteTeams[index] || ''}
                                onChange={(e) => {
                                  const newTeams = [...favoriteTeams];
                                  newTeams[index] = e.target.value;
                                  setFavoriteTeams(newTeams);
                                }}
                                className="appearance-none w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 text-white font-bold transition-all cursor-pointer"
                              >
                                <option value="" disabled>SELECTION {index + 1}</option>
                                {TOP_20_FIFA_NATIONS.map(team => (
                                  <option key={team} value={team} className="bg-background">{team}</option>
                                ))}
                              </select>
                              <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant rotate-90" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 italic font-mono">FAVORITE_PLAYERS_WATCHLIST</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[0, 1, 2].map((index) => (
                            <input 
                              key={`player-${index}`}
                              type="text" 
                              required={index === 0}
                              value={favoritePlayers[index] || ''}
                              onChange={(e) => {
                                const newPlayers = [...favoritePlayers];
                                newPlayers[index] = e.target.value;
                                setFavoritePlayers(newPlayers);
                              }}
                              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 text-white font-bold transition-all" 
                              placeholder={`OPERATIVE ${index + 1}`} 
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 italic font-mono">FAVORITE_CLUBS_REGISTRY</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[0, 1, 2].map((index) => (
                            <input 
                              key={`club-${index}`}
                              type="text" 
                              required={index === 0}
                              value={favoriteClubs[index] || ''}
                              onChange={(e) => {
                                const newClubs = [...favoriteClubs];
                                newClubs[index] = e.target.value;
                                setFavoriteClubs(newClubs);
                              }}
                              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 text-white font-bold transition-all" 
                              placeholder={`ESTABLISHMENT ${index + 1}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-10">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-16 bg-primary hover:bg-primary-fixed text-on-primary-fixed rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 shadow-[0_0_40px_rgba(207,252,0,0.15)] hover:shadow-[0_0_50px_rgba(207,252,0,0.3)] group disabled:opacity-50"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" size={24} />
                        ) : (
                          <>
                            <span className="font-headline font-black uppercase tracking-[0.3em] text-sm italic">SYNCHRONIZE_IDENTITY</span>
                            <Target size={20} className="group-hover:rotate-45 transition-transform" />
                          </>
                        )}
                      </button>
                      <p className="text-center text-[8px] text-outline-variant uppercase tracking-[0.4em] mt-4 font-mono">WARNING: AUTHORIZED PERSONNEL ONLY</p>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Danger Zone: Terminal Account Protocol */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-card p-8 md:p-12 rounded-[2.5rem] border border-error/20 bg-error/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 text-error pointer-events-none">
             <AlertTriangle size={160} />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <header className="mb-6">
              <h2 className="text-2xl md:text-3xl font-headline font-black text-error uppercase tracking-tight mb-2 italic">DANGER_ZONE: TERMINAL_ACCOUNT_PROTOCOL</h2>
              <p className="text-error/60 text-[10px] font-bold uppercase tracking-[0.3em]">Critical Action: Permanent Data Erasure</p>
            </header>
            
            <p className="text-sm text-error/80 leading-relaxed mb-8 max-w-2xl">
              Proceeding with this protocol will permanently terminate your status as an Elite Scout. All predictions, bracket intel, leaderboard standings, and profile metadata will be scrubbed from the secure server. This action is irreversible.
            </p>

            <button 
              onClick={() => setShowDeleteModal(true)}
              className="px-8 h-14 bg-error text-white rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-red-700 shadow-[0_0_30px_rgba(255,0,0,0.2)] font-headline font-black uppercase tracking-widest text-[11px]"
            >
              <Trash2 size={18} />
              Terminate Account & Purge Records
            </button>
          </div>
        </motion.div>

      </div>

      {/* Account Deletion Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 md:px-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !deleting && setShowDeleteModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-surface-container rounded-[2rem] border border-error/30 p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-error"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-error/20 rounded-2xl flex items-center justify-center text-error mb-6">
                  <AlertTriangle size={32} />
                </div>
                
                <h3 className="text-2xl font-headline font-black text-white uppercase tracking-tight mb-4 italic">CRITICAL_CONFIRMATION_REQUIRED</h3>
                
                <p className="text-outline-variant text-[11px] font-bold uppercase tracking-widest mb-8 leading-loose">
                  You are about to initiate total data erasure. This will delete your leaderboard rank, all predictions, and your authentication credentials.
                </p>

                <div className="w-full space-y-4 mb-8">
                  <p className="text-[10px] font-black text-error uppercase tracking-[0.2em]">TYPE "DELETE" TO AUTHORIZE TERMINATION</p>
                  <input 
                    type="text"
                    placeholder="Type DELETE here"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value.toUpperCase())}
                    className="w-full bg-black/40 border border-error/30 rounded-2xl px-6 py-4 text-center text-lg font-black text-error placeholder:text-error/20 focus:outline-none focus:border-error transition-all uppercase"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button 
                    disabled={deleting || deleteConfirmation !== 'DELETE'}
                    onClick={handleDeleteAccount}
                    className="flex-1 h-14 bg-error hover:bg-red-700 text-white rounded-2xl font-headline font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {deleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                    CONFIRM PURGE
                  </button>
                  <button 
                    disabled={deleting}
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 h-14 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-headline font-black uppercase tracking-widest text-[11px] transition-all"
                  >
                    ABORT_COMMAND
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Visual Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-[1000] mix-blend-overlay" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBG-FJt1_KW7fjiGClQqNXst_RT4vJC2bRbOCI3kHZaoLsVjxdViFc22M0IjU90j9xL6C7zbnfo9lsQyDmmhGfFV-aC4KkZl5G4XiGFce0mhLIsHONcevHQOKhBhxiFhLj6WMkONDTnQ84NzEIjvbMIpH8nO51LIiCLAzhLWk3yhgU9rt9Zd_oEctZGAnb6PJEiO-9fzjZPwS0IiucK5wIHsPRtrPMxQQWzKKBC-TTT7osf748fkgu5LQ5hVnRFtVH_8HzmXVQAWr3V')" }}
      ></div>
    </main>
  );
}
