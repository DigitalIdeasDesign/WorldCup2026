import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

import { handleAuthError } from '../../lib/authUtils';
import { auth, db, handleFirestoreError, OperationType } from '../../firebase';
import { TOP_20_FIFA_NATIONS } from '../../constants/teams';

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
  const [predictions, setPredictions] = useState<any>(null);
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

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      {/* Background Asset */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          alt="FIFA World Cup Trophy" 
          className="w-full h-full object-cover opacity-20 scale-110 lg:scale-100" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC93GCr01cNBAJYf3ZOfXlQ0ND6xtCqRybwxxWjLZWtn3OclTKh1BFOpcqg2s7o6T-TRXfdRlGMIbZnRmj8gpmwUfXrhoYko7LmixchsKrdtxKRwakejMXBM91p3IgwnYCDdHhXJ3Jvi9uuikZ5y4bd7_mH_CySwIs9bfU8Ekw4Q0f3KCxg5CPqpXjdLtXQ-E3zQp-6HK2pGjSxvrP9cbQIII7b17DUY92-PUKkpKb7Au_4Pwd6NagAZPBFW3uGpSYtd5rHMkLDP6zb"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Top App Bar Branding */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-20 bg-surface-container-highest/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3 md:gap-6">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-outline-variant hover:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase hidden sm:inline">Back</span>
          </button>
          <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>
          <div className="flex flex-col">
            <div className="text-lg md:text-2xl font-headline font-black text-primary tracking-tight uppercase leading-none">
              FIFA WORLD CUP 2026
            </div>
            <div className="text-[8px] md:text-[10px] font-bold text-outline-variant tracking-widest uppercase mt-1 truncate max-w-[180px] md:max-w-none">
              Carlos, Family and Friends Elite Pool
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button onClick={onLogout} className="flex items-center gap-2 text-error hover:text-error/80 transition-colors">
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="text-[10px] font-bold tracking-widest uppercase hidden md:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Profile Canvas */}
      <div className="relative z-20 w-full max-w-[1200px] mt-24 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-0 md:px-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 md:p-12 rounded-xl border border-white/10 shadow-[0_48px_100px_-12px_rgba(0,0,0,0.5)] lg:col-span-7"
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left mb-10 md:mb-12">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-primary-container rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-headline font-black text-on-primary-fixed shadow-lg shrink-0">
              {profile?.displayName?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-headline font-black text-white tracking-tight uppercase">
                {profile?.displayName || 'Your Identity'}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 mt-2">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-secondary uppercase">
                  {NOMINATIONS.find(n => n.id === profile?.nomination)?.title || 'Elite Member'}
                </span>
                <div className="h-1 w-1 bg-white/20 rounded-full"></div>
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-outline-variant uppercase">Joined {new Date(profile?.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">First Name</label>
                <input 
                  type="text" 
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Managerial Identity</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {NOMINATIONS.map((nom) => (
                  <button
                    key={nom.id}
                    type="button"
                    onClick={() => setNomination(nom.id)}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-all text-left ${
                      nomination === nom.id 
                        ? 'bg-primary/10 border-primary shadow-sm shadow-primary/10' 
                        : 'bg-surface-container-highest/40 border-outline-variant/20 hover:border-outline-variant/40'
                    }`}
                  >
                    <div className={`mt-0.5 p-1.5 rounded-sm transition-colors ${
                      nomination === nom.id ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-outline-variant'
                    }`}>
                      <span className="material-symbols-outlined text-base">{nom.icon}</span>
                    </div>
                    <div>
                      <div className={`text-[11px] font-black uppercase tracking-tight leading-none ${
                        nomination === nom.id ? 'text-primary' : 'text-white'
                      }`}>
                        {nom.title}
                      </div>
                      <div className="text-[9px] text-on-surface-variant leading-tight mt-1">
                        {nom.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Nationality</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">public</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Top 3 Favorite Teams</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
                        className="appearance-none w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white transition-all cursor-pointer"
                      >
                        <option value="" disabled>Team {index + 1}</option>
                        {TOP_20_FIFA_NATIONS.map(team => (
                          <option key={team} value={team}>{team}</option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant text-base pointer-events-none">flag</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Top 3 Favorite Players</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[0, 1, 2].map((index) => (
                    <div key={`player-${index}`} className="relative">
                      <input 
                        type="text" 
                        required={index === 0}
                        value={favoritePlayers[index] || ''}
                        onChange={(e) => {
                          const newPlayers = [...favoritePlayers];
                          newPlayers[index] = e.target.value;
                          setFavoritePlayers(newPlayers);
                        }}
                        className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                        placeholder={`Player ${index + 1}`} 
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant text-base">person</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Top 3 Favorite Clubs</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[0, 1, 2].map((index) => (
                    <div key={`club-${index}`} className="relative">
                      <input 
                        type="text" 
                        required={index === 0}
                        value={favoriteClubs[index] || ''}
                        onChange={(e) => {
                          const newClubs = [...favoriteClubs];
                          newClubs[index] = e.target.value;
                          setFavoriteClubs(newClubs);
                        }}
                        className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                        placeholder={`Club ${index + 1}`} 
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant text-base">sports_soccer</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Update Password (Optional)</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                placeholder="Leave blank to keep current" 
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary-container hover:bg-primary py-4 rounded-sm flex items-center justify-center gap-3 transition-all duration-300 group disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin text-on-primary-fixed" size={20} />
                ) : (
                  <>
                    <span className="text-on-primary-fixed font-headline font-black uppercase tracking-widest text-sm">Update Identity</span>
                    <span className="material-symbols-outlined text-on-primary-fixed text-lg">save</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Predictions Sidebar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="glass-card p-6 md:p-8 rounded-xl border border-white/10 shadow-lg">
            <h2 className="text-xl font-headline font-black text-white tracking-tight uppercase mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">emoji_events</span>
              Tournament Predictions
            </h2>
            
            {predictions ? (
              <div className="space-y-6">
                <div className="bg-surface-container-highest/30 p-4 rounded-lg border border-white/5">
                  <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Champion Pick</p>
                  <p className="text-2xl font-headline font-black text-secondary uppercase">{predictions.bracket?.champion || 'TBD'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-highest/30 p-4 rounded-lg border border-white/5">
                    <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Golden Ball</p>
                    <p className="text-sm font-bold text-white">{predictions.awards?.mvp || 'TBD'}</p>
                  </div>
                  <div className="bg-surface-container-highest/30 p-4 rounded-lg border border-white/5">
                    <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Golden Boot</p>
                    <p className="text-sm font-bold text-white">{predictions.awards?.goldenBoot || 'TBD'}</p>
                  </div>
                  <div className="bg-surface-container-highest/30 p-4 rounded-lg border border-white/5 col-span-2">
                    <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Golden Glove</p>
                    <p className="text-sm font-bold text-white">{predictions.awards?.goldenGlove || 'TBD'}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-outline-variant font-bold uppercase tracking-widest">Status</span>
                  {predictions.isLocked ? (
                    <div className="bg-success/10 text-success px-3 py-1.5 rounded-sm text-[10px] font-headline font-black uppercase flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span> Verified
                    </div>
                  ) : (
                    <div className="bg-secondary/10 text-secondary px-3 py-1.5 rounded-sm text-[10px] font-headline font-black uppercase flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">info</span> Drafting
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button 
                    onClick={predictions.isLocked ? handleUnlockPredictions : () => navigate('/')}
                    disabled={unlocking}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-sm flex items-center justify-center gap-2 transition-all group"
                  >
                    {unlocking ? (
                      <Loader2 className="animate-spin text-primary" size={18} />
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-primary text-lg">edit</span>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-white">
                          {predictions.isLocked ? 'Unlock & Modify Predictions' : 'Continue Editing Predictions'}
                        </span>
                      </>
                    )}
                  </button>
                  {predictions.isLocked && (
                    <p className="text-[9px] text-outline-variant text-center mt-2 uppercase font-medium">
                      Unlocking will allow you to change your bracket and awards.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">hourglass_empty</span>
                <p className="text-sm text-outline-variant">No predictions made yet.</p>
                <button 
                  onClick={() => navigate('/')}
                  className="mt-4 text-primary text-sm font-bold hover:underline"
                >
                  Start Predicting
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Visual Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBG-FJt1_KW7fjiGClQqNXst_RT4vJC2bRbOCI3kHZaoLsVjxdViFc22M0IjU90j9xL6C7zbnfo9lsQyDmmhGfFV-aC4KkZl5G4XiGFce0mhLIsHONcevHQOKhBhxiFhLj6WMkONDTnQ84NzEIjvbMIpH8nO51LIiCLAzhLWk3yhgU9rt9Zd_oEctZGAnb6PJEiO-9fzjZPwS0IiucK5wIHsPRtrPMxQQWzKKBC-TTT7osf748fkgu5LQ5hVnRFtVH_8HzmXVQAWr3V')" }}
      ></div>
    </main>
  );
}
