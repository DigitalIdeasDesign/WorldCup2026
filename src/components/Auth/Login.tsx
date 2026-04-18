import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

import { handleAuthError } from '../../lib/authUtils';
import { auth, googleProvider } from '../../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate('/');
    } catch (err: any) {
      handleAuthError(err, "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Welcome back!");
      navigate('/');
    } catch (err: any) {
      handleAuthError(err, "Failed to login with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8">
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
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 h-20">
        <div className="flex flex-col">
          <div className="text-2xl font-headline font-black text-primary tracking-[-0.04em] uppercase leading-none">
            FIFA WORLD CUP 2026
          </div>
          <div className="text-[10px] font-bold text-outline-variant tracking-widest uppercase mt-1">
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
          <div className="flex items-center gap-3 px-3 py-1 bg-surface-container-high rounded-full border border-white/5">
            <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Official Global Entry</span>
          </div>
          <h1 className="text-6xl xl:text-8xl font-headline font-black text-white leading-[0.9] tracking-tighter uppercase">
            Define <span className="text-primary">Legacy.</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-md font-medium leading-relaxed">
            Access the world's most exclusive prediction pool. Compete against global elites for the definitive 2026 championship title.
          </p>
          
          <div className="flex items-center gap-8 mt-4">
            <div>
              <div className="text-3xl font-headline font-black text-white tracking-tight">104</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-secondary">Total Fixtures</div>
            </div>
            <div className="h-10 w-[1px] bg-white/10"></div>
            <div>
              <div className="text-3xl font-headline font-black text-white tracking-tight">12</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-secondary">Elite Groups</div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="glass-card w-full max-w-[480px] p-8 md:p-10 rounded-xl border border-white/10 shadow-[0_48px_100px_-12px_rgba(0,0,0,0.5)]">
            <div className="mb-10">
              <h2 className="text-2xl font-headline font-black text-white tracking-tight uppercase">Authenticate</h2>
              <div className="h-1 w-12 bg-primary mt-2"></div>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                  placeholder="cr7@elite-predictions.com" 
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Secure Password</label>
                  <Link to="/forgot-password" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors">Forgot?</Link>
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder:text-outline-variant transition-all" 
                  placeholder="••••••••••••" 
                />
              </div>

              {/* CTA */}
              <div className="pt-4 space-y-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary-container hover:bg-primary py-4 rounded-sm flex items-center justify-center gap-3 transition-all duration-300 group disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin text-on-primary-fixed" size={20} />
                  ) : (
                    <>
                      <span className="text-on-primary-fixed font-headline font-black uppercase tracking-widest text-sm">Access Dashboard</span>
                      <span className="material-symbols-outlined text-on-primary-fixed text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                <span className="bg-[#1a1a1a] px-4">Or authenticate with</span>
              </div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-surface-container-highest/40 hover:bg-surface-container-highest/80 border border-outline-variant/20 py-4 rounded-sm flex items-center justify-center gap-3 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-white font-headline font-black uppercase tracking-widest text-sm">Google</span>
            </button>

            {/* Footer Link */}
            <div className="mt-8 pt-8 border-t border-white/5 flex justify-center">
              <p className="text-sm text-on-surface-variant">
                Not part of the Elite? <Link to="/register" className="text-primary font-bold hover:text-white transition-colors">Apply Now</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Utility Icons Footer */}
      <footer className="fixed bottom-8 left-8 hidden lg:flex items-center gap-12">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-outline-variant text-xl">shield</span>
          <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">End-to-End Encryption</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-outline-variant text-xl">workspace_premium</span>
          <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">Official 2026 Partner</span>
        </div>
      </footer>

      {/* Language Selector */}
      <div className="fixed bottom-8 right-8 hidden md:block">
        <button className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-tighter hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-sm">language</span>
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
