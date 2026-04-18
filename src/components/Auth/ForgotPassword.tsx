import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

import { handleAuthError } from '../../lib/authUtils';
import { auth } from '../../firebase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset email sent! Check your inbox.");
    } catch (err: any) {
      handleAuthError(err, "Failed to send reset email");
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
              <div className="text-3xl font-headline font-black text-white tracking-tight">$2.5M</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-secondary">Prize Pool</div>
            </div>
            <div className="h-10 w-[1px] bg-white/10"></div>
            <div>
              <div className="text-3xl font-headline font-black text-white tracking-tight">48</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-secondary">Nations</div>
            </div>
          </div>
        </div>

        {/* Right Side: Forgot Password Card */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="glass-card w-full max-w-[480px] p-8 md:p-10 rounded-xl border border-white/10 shadow-[0_48px_100px_-12px_rgba(0,0,0,0.5)]">
            <div className="mb-10">
              <h2 className="text-2xl font-headline font-black text-white tracking-tight uppercase">Reset Access</h2>
              <div className="h-1 w-12 bg-primary mt-2"></div>
            </div>

            <form onSubmit={handleReset} className="space-y-6">
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
                      <span className="text-on-primary-fixed font-headline font-black uppercase tracking-widest text-sm">Send Reset Link</span>
                      <span className="material-symbols-outlined text-on-primary-fixed text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Footer Link */}
            <div className="mt-8 pt-8 border-t border-white/5 flex justify-center">
              <p className="text-sm text-on-surface-variant">
                Remember your credentials? <Link to="/login" className="text-primary font-bold hover:text-white transition-colors">Sign In</Link>
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
