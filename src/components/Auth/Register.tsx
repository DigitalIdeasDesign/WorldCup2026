import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

import { handleAuthError } from '../../lib/authUtils';
import { auth, db } from '../../firebase';

import { TOP_20_FIFA_NATIONS } from '../../constants/teams';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nationality, setNationality] = useState('');
  const [favoriteTeams, setFavoriteTeams] = useState(['', '', '']);
  const [favoritePlayers, setFavoritePlayers] = useState(['', '', '']);
  const [favoriteClubs, setFavoriteClubs] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !nationality || !favoriteTeams[0] || !favoritePlayers[0] || !favoriteClubs[0]) {
      toast.error("Please fill in all required fields (at least 1 favorite each).");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const displayName = `${firstName} ${lastName}`.trim();
      await updateProfile(user, { displayName });
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        displayName,
        firstName,
        lastName,
        email,
        nationality,
        favoriteTeams: favoriteTeams.filter(Boolean),
        favoritePlayers: favoritePlayers.filter(Boolean),
        favoriteClubs: favoriteClubs.filter(Boolean),
        photoURL: '',
        role: 'user',
        createdAt: Date.now()
      });

      toast.success("Identity Created Successfully!");
      navigate('/');
    } catch (err: any) {
      handleAuthError(err, "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-start lg:items-center justify-center p-4 md:p-8 pt-28 lg:pt-0">
      {/* Background Asset */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          alt="FIFA World Cup Trophy" 
          className="w-full h-full object-cover opacity-40 scale-110 lg:scale-100" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC93GCr01cNBAJYf3ZOfXlQ0ND6xtCqRybwxxWjLZWtn3OclTKh1BFOpcqg2s7o6T-TRXfdRlGMIbZnRmj8gpmwUfXrhoYko7LmixchsKrdtxKRwakejMXBM91p3IgwnYCDdHhXJ3Jvi9uuikZ5y4bd7_mH_CySwIs9bfU8Ekw4Q0f3KCxg5CPqpXjdLtXQ-E3zQp-6HK2pGjSxvrP9cbQIII7b17DUY92-PUKkpKb7Au_4Pwd6NagAZPBFW3uGpSYtd5rHMkLDP6zb"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Top App Bar Branding */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-20">
        <div className="flex flex-col">
          <div className="text-xl md:text-2xl font-headline font-black text-primary tracking-[-0.04em] uppercase leading-none">
            FIFA WORLD CUP 2026
          </div>
          <div className="text-xs md:text-sm font-bold text-outline-variant tracking-widest uppercase mt-1">
            Carlos, Family and Friends Elite Pool
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-xs font-bold tracking-widest text-outline uppercase">Join the 1% of predictors</span>
        </div>
      </header>

      {/* Authentication Canvas */}
      <div className="relative z-20 w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Editorial Content */}
        <div className="hidden lg:flex lg:col-span-6 flex-col items-start gap-6">
          <div className="flex items-center gap-3 px-4 py-1.5 bg-surface-container-high rounded-full border border-white/5">
            <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">Official Global Entry</span>
          </div>
          <h1 className="text-6xl xl:text-8xl font-headline font-black text-white leading-[0.9] tracking-tighter uppercase">
            Define <span className="text-primary">“Trust the Process.”</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-md font-medium leading-relaxed">
            Pick with confidence, panic immediately, and revise your logic mid-game. It’s all part of the strategy.
          </p>
          
          <div className="flex items-center gap-8 mt-4">
            <div>
              <div className="text-4xl font-headline font-black text-white tracking-tight">104</div>
              <div className="text-xs font-bold uppercase tracking-widest text-secondary">Emotional Rollercoasters</div>
            </div>
            <div className="h-10 w-[1px] bg-white/10"></div>
            <div>
              <div className="text-4xl font-headline font-black text-white tracking-tight">12</div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">Part-Time Coaches</span>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Card */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end gap-6 w-full">
          {/* Mobile-only Scout Intel Rail */}
          <div className="flex lg:hidden items-center gap-8 px-8 py-4 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
            <div className="flex flex-col items-center">
              <span className="text-xl font-headline font-black text-white">104</span>
              <span className="text-[11px] font-black uppercase text-secondary tracking-tighter">Rollercoasters</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-headline font-black text-white">12</span>
              <span className="text-[11px] font-black uppercase text-secondary tracking-tighter">Coaches</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-primary">shield</span>
              <span className="text-[11px] font-black uppercase text-white tracking-widest">Secure</span>
            </div>
          </div>

          <div className="glass-card w-full max-w-[540px] p-8 md:p-14 rounded-2xl border border-white/10 shadow-[0_48px_100px_-12px_rgba(0,0,0,0.5)]">
            <div className="mb-10 md:mb-12 text-center sm:text-left">
              <h2 className="text-2xl md:text-3xl font-headline font-black text-white tracking-tight uppercase">Create Identity</h2>
              <div className="h-1.5 w-16 bg-primary mt-3 mx-auto sm:mx-0"></div>
            </div>

            <form onSubmit={handleRegister} className="space-y-10">
              {/* Standard Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant ml-1">First Name</label>
                  <input 
                    type="text" 
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-md px-5 py-4 text-sm md:text-base focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                    placeholder="Cristiano" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant ml-1">Last Name</label>
                  <input 
                    type="text" 
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-md px-5 py-4 text-sm md:text-base focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                    placeholder="Ronaldo" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-md px-5 py-4 text-sm md:text-base focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                  placeholder="cr7@elite-predictions.com" 
                />
              </div>

              {/* Dropdowns */}
              <div className="space-y-3">
                <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant ml-1">Nationality</label>
                <div className="relative group">
                  <input 
                    type="text" 
                    required
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-md px-5 py-4 text-sm md:text-base focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                    placeholder="Search Country..." 
                  />
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-outline-variant text-xl">expand_more</span>
                </div>
              </div>

              <div className="space-y-10 pt-6">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-black text-primary uppercase tracking-[0.2em]">Favorites</span>
                      <div className="h-[1px] flex-1 bg-white/5"></div>
                    </div>
                    
                    <div className="space-y-4">
                      <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant ml-1">Top 3 Favorite Teams</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[0, 1, 2].map((index) => (
                          <div key={`team-${index}`} className="relative">
                            <select 
                              required={index === 0}
                              value={favoriteTeams[index]}
                              onChange={(e) => {
                                const newTeams = [...favoriteTeams];
                                newTeams[index] = e.target.value;
                                setFavoriteTeams(newTeams);
                              }}
                              className="appearance-none w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-md px-5 py-4 text-sm md:text-base focus:outline-none focus:border-primary/50 text-white transition-all cursor-pointer"
                            >
                              <option value="" disabled>Team {index + 1}</option>
                              {TOP_20_FIFA_NATIONS.map(team => (
                                <option key={team} value={team}>{team}</option>
                              ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg pointer-events-none">flag</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant ml-1">Top 3 Favorite Players</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[0, 1, 2].map((index) => (
                        <div key={`player-${index}`} className="relative">
                          <input 
                            type="text" 
                            required={index === 0}
                            value={favoritePlayers[index]}
                            onChange={(e) => {
                              const newPlayers = [...favoritePlayers];
                              newPlayers[index] = e.target.value;
                              setFavoritePlayers(newPlayers);
                            }}
                            className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-md px-5 py-4 text-sm md:text-base focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                            placeholder={`Player ${index + 1}`} 
                          />
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">person</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant ml-1">Top 3 Favorite Clubs</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[0, 1, 2].map((index) => (
                        <div key={`club-${index}`} className="relative">
                          <input 
                            type="text" 
                            required={index === 0}
                            value={favoriteClubs[index]}
                            onChange={(e) => {
                              const newClubs = [...favoriteClubs];
                              newClubs[index] = e.target.value;
                              setFavoriteClubs(newClubs);
                            }}
                            className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-md px-5 py-4 text-sm md:text-base focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                            placeholder={`Club ${index + 1}`} 
                          />
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">sports_soccer</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-3">
                <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant ml-1">Secure Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-md px-5 py-4 text-sm md:text-base focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                  placeholder="••••••••••••" 
                />
              </div>

              {/* CTA */}
              <div className="pt-6 space-y-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary-container hover:bg-primary py-5 rounded-md flex items-center justify-center gap-4 transition-all duration-300 group disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin text-on-primary-fixed" size={24} />
                  ) : (
                    <>
                      <span className="text-on-primary-fixed font-headline font-black uppercase tracking-widest text-base md:text-lg">Initialize Membership</span>
                      <span className="material-symbols-outlined text-on-primary-fixed text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-outline-variant font-medium tracking-wide">
                  BY JOINING, YOU AGREE TO THE <a href="#" className="text-secondary hover:underline">ELITE TERMS OF SERVICE</a>
                </p>
              </div>
            </form>

            {/* Footer Link */}
            <div className="mt-8 pt-8 border-t border-white/5 flex justify-center">
              <p className="text-sm text-on-surface-variant">
                Already part of the Elite? <Link to="/login" className="text-primary font-bold hover:text-white transition-colors">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Utility Icons Footer */}
      <footer className="fixed bottom-8 left-8 hidden lg:flex items-center gap-12">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-outline-variant text-2xl">shield</span>
          <span className="text-xs font-bold text-outline-variant uppercase tracking-widest">End-to-End Encryption</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-outline-variant text-2xl">workspace_premium</span>
          <span className="text-xs font-bold text-outline-variant uppercase tracking-widest">Official 2026 Partner</span>
        </div>
      </footer>

      {/* Language Selector */}
      <div className="fixed bottom-8 right-8 hidden md:block">
        <button className="flex items-center gap-2 text-xs font-black text-white/40 uppercase tracking-tighter hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-base">language</span>
          English (US)
        </button>
      </div>

      {/* Visual Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBG-FJt1_KW7fjiGClQqNXst_RT4vJC2bRbOCI3kHZaoLsVjxdViFc22M0IjU90j9xL6C7zbnfo9lsQyDmmhGfFV-aC4KkZl5G4XiGFce0mhLIsHONcevHQOKhBhxiFhLj6WMkONDTnQ84NzEIjvbMIpH8nO51LIiCLAzhLWk3yhgU9rt9Zd_oEctZGAnb6PJEiO-9fzjZPwS0IiucK5wIHsPRtrPMxQQWzKKBC-TTT7osf748fkgu5LQ5hVnRFtVH_8HzmXVQAWr3V')" }}
      ></div>
    </main>
  );
}
