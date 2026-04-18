/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy, Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { Toaster, toast } from 'react-hot-toast';
import { Trophy, LogOut, User as UserIcon, Settings, Menu, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { auth, db, handleFirestoreError, OperationType } from './firebase';

// Lazy load components
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const ForgotPassword = lazy(() => import('./components/Auth/ForgotPassword'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const TournamentApp = lazy(() => import('./components/Tournament/TournamentApp'));
const ShareView = lazy(() => import('./components/Tournament/ShareView'));
const ScoutingHub = lazy(() => import('./components/Tournament/ScoutingHub'));
const TeamProfile = lazy(() => import('./components/Tournament/TeamProfile'));
const OnboardingModal = lazy(() => import('./components/Onboarding/OnboardingModal'));

// Error Boundary
// Error Boundary (Simplified)
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Auth Guard
const ProtectedRoute = ({ children, user, loading }: { children: React.ReactNode, user: User | null, loading: boolean }) => {
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

const LoadingScreen = () => (
  <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-black/40 z-10"></div>
    <img 
      alt="FIFA World Cup Trophy" 
      className="absolute w-full h-full object-cover opacity-20 scale-110" 
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC93GCr01cNBAJYf3ZOfXlQ0ND6xtCqRybwxxWjLZWtn3OclTKh1BFOpcqg2s7o6T-TRXfdRlGMIbZnRmj8gpmwUfXrhoYko7LmixchsKrdtxKRwakejMXBM91p3IgwnYCDdHhXJ3Jvi9uuikZ5y4bd7_mH_CySwIs9bfU8Ekw4Q0f3KCxg5CPqpXjdLtXQ-E3zQp-6HK2pGjSxvrP9cbQIII7b17DUY92-PUKkpKb7Au_4Pwd6NagAZPBFW3uGpSYtd5rHMkLDP6zb"
    />
    <div className="absolute inset-0 hero-gradient z-10"></div>
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBG-FJt1_KW7fjiGClQqNXst_RT4vJC2bRbOCI3kHZaoLsVjxdViFc22M0IjU90j9xL6C7zbnfo9lsQyDmmhGfFV-aC4KkZl5G4XiGFce0mhLIsHONcevHQOKhBhxiFhLj6WMkONDTnQ84NzEIjvbMIpH8nO51LIiCLAzhLWk3yhgU9rt9Zd_oEctZGAnb6PJEiO-9fzjZPwS0IiucK5wIHsPRtrPMxQQWzKKBC-TTT7osf748fkgu5LQ5hVnRFtVH_8HzmXVQAWr3V')" }}></div>
    
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-20 flex flex-col items-center gap-6"
    >
      <div className="text-4xl font-headline font-black text-primary tracking-[-0.04em] uppercase animate-pulse">
        FIFA 2026 ELITE
      </div>
      <Loader2 className="text-secondary animate-spin" size={32} />
      <p className="text-outline font-bold uppercase tracking-widest text-xs">Initializing Secure Connection...</p>
    </motion.div>
  </div>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Fetch profile
        const profileDoc = await getDoc(doc(db, 'users', u.uid));
        if (profileDoc.exists()) {
          const data = profileDoc.data();
          setProfile(data);
          if (data.hasSeenOnboarding === false || data.hasSeenOnboarding === undefined) {
            setShowOnboarding(true);
          }
        } else {
          // Create default profile if it doesn't exist (e.g. after Google login)
          const newProfile = {
            displayName: u.displayName || 'New Fan',
            email: u.email || '',
            photoURL: u.photoURL || '',
            role: 'user',
            hasSeenOnboarding: false,
            createdAt: Date.now(),
            updatedAt: Date.now()
          };
          try {
            await setDoc(doc(db, 'users', u.uid), newProfile);
            setProfile(newProfile);
            setShowOnboarding(true);
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, `users/${u.uid}`);
          }
        }
      } else {
        setProfile(null);
        setShowOnboarding(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleOnboardingComplete = async (nominationId: string) => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), { 
          hasSeenOnboarding: true,
          nomination: nominationId,
          updatedAt: Date.now()
        }, { merge: true });
        setProfile((prev: any) => ({ ...prev, hasSeenOnboarding: true, nomination: nominationId }));
        setShowOnboarding(false);
        toast.success("Identity accepted. Good luck, Scout!");
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-fixed overflow-x-hidden">
          <Toaster position="top-right" toastOptions={{
            style: {
              background: '#191919',
              color: '#ffffff',
              border: '1px solid #262626',
              borderRadius: '0.5rem',
              fontWeight: 'bold'
            }
          }} />
          
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Suspense fallback={<LoadingScreen />}><Login /></Suspense>} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Suspense fallback={<LoadingScreen />}><Register /></Suspense>} />
            <Route path="/forgot-password" element={<Suspense fallback={<LoadingScreen />}><ForgotPassword /></Suspense>} />
            
            <Route path="/" element={
              <ProtectedRoute user={user} loading={loading}>
                <Suspense fallback={<LoadingScreen />}>
                  <TournamentApp user={user!} profile={profile} onLogout={handleLogout} onShowOnboarding={() => setShowOnboarding(true)} />
                </Suspense>
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute user={user} loading={loading}>
                <Suspense fallback={<LoadingScreen />}>
                  <Profile user={user!} profile={profile} setProfile={setProfile} onLogout={handleLogout} />
                </Suspense>
              </ProtectedRoute>
            } />

            <Route path="/share/:userId" element={
              <Suspense fallback={<LoadingScreen />}>
                <ShareView />
              </Suspense>
            } />

            <Route path="/scouting-hub" element={
              <ProtectedRoute user={user} loading={loading}>
                <Suspense fallback={<LoadingScreen />}>
                  <ScoutingHub />
                </Suspense>
              </ProtectedRoute>
            } />

            <Route path="/scouting-hub/nations/:nationId" element={
              <ProtectedRoute user={user} loading={loading}>
                <Suspense fallback={<LoadingScreen />}>
                  <TeamProfile />
                </Suspense>
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          <Suspense fallback={null}>
            <OnboardingModal 
              isOpen={showOnboarding} 
              onClose={() => setShowOnboarding(false)} 
              onComplete={handleOnboardingComplete} 
            />
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}
