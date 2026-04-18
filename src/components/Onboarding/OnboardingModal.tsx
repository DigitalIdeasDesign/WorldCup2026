import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  LayoutGrid, 
  GitBranch, 
  Search, 
  Star, 
  User,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

import { Nomination, NOMINATIONS } from '../../constants/nominations';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (nomination: string) => void;
}

const screens = [
  {
    id: 'welcome',
    title: 'Welcome to the Elite Pool',
    subtitle: 'FIFA World Cup 2026',
    content: 'You have been recruited into the Carlos, Family and Friends Elite Pool. This is where the world\'s best scouts compete for glory. Are you ready to lead your bracket to victory?',
    icon: <Trophy className="w-16 h-16 text-primary" />,
    color: 'primary'
  },
  {
    id: 'group-stage',
    title: 'Phase 1: Group Stage',
    subtitle: 'Building the Foundation',
    content: 'Predict the Top 2 teams from all 12 groups. Don\'t forget the Wildcards: the 8 best 3rd-place teams also advance. Every correct placement earns you critical points.',
    icon: <LayoutGrid className="w-16 h-16 text-secondary" />,
    color: 'secondary'
  },
  {
    id: 'knockouts',
    title: 'Phase 2: The Knockouts',
    subtitle: 'The Road to the Final',
    content: 'Once the groups are set, navigate the single-elimination bracket. From the Round of 32 to the Final in New Jersey. Picks lock once the tournament kicks off—choose wisely.',
    icon: <GitBranch className="w-16 h-16 text-accent" />,
    color: 'accent'
  },
  {
    id: 'scouting',
    title: 'The Scout\'s Edge',
    subtitle: 'Knowledge is Power',
    content: 'Use the Scouting Hub to analyze every contender. Check "Vibe Checks," tactical styles, and core stats. Don\'t guess—scout the contenders before you lock your bracket.',
    icon: <Search className="w-16 h-16 text-primary" />,
    color: 'primary'
  },
  {
    id: 'awards',
    title: 'The Hall of Fame',
    subtitle: 'Bonus Points & Profile',
    content: 'Visit the Awards page to pick your Golden Boot and MVP for bonus points. Your Profile is your Command Center—track your rank and manage your elite selections.',
    icon: <Star className="w-16 h-16 text-secondary" />,
    color: 'secondary'
  },
  {
    id: 'badges',
    title: 'Elite Merits',
    subtitle: 'Earn Your Stripes',
    content: 'Earn unique badges by being bold, loyal, or incredibly fast. From "Early Bird" to "The Underdog Whisperer," your scouting style will be immortalized on your card.',
    icon: <CheckCircle2 className="w-16 h-16 text-primary" />,
    color: 'primary'
  },
  {
    id: 'ready',
    title: 'Ready to Kick Off?',
    subtitle: 'Your Mission Begins Now',
    content: 'The world is watching. Your predictions will define your legacy in the Carlos, Family and Friends Elite Pool. It\'s time to show them why you\'re the top scout.',
    icon: <CheckCircle2 className="w-16 h-16 text-success" />,
    color: 'success'
  }
];

export default function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedNomination, setSelectedNomination] = useState<string>(NOMINATIONS[0].id);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < screens.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(selectedNomination);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentScreen = screens[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-surface-container-low border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-10">
              {screens.map((_, i) => (
                <div 
                  key={i} 
                  className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden"
                >
                  <motion.div 
                    initial={false}
                    animate={{ 
                      width: i <= currentStep ? '100%' : '0%',
                      backgroundColor: i === currentStep ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)'
                    }}
                    className="h-full transition-colors duration-500"
                  />
                </div>
              ))}
            </div>

            {/* Close/Skip Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-outline-variant hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Content Area */}
            <div className="flex-1 p-8 sm:p-12 flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <div className={`mb-8 p-6 rounded-3xl bg-surface-container-highest/50 border border-white/5 shadow-inner`}>
                    {currentScreen.icon}
                  </div>
                  
                  <div className="space-y-4 max-w-md">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">
                        {currentScreen.subtitle}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-headline font-black uppercase text-white tracking-tighter leading-none">
                        {currentScreen.title}
                      </h2>
                    </div>
                    
                    <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed font-medium">
                      {currentScreen.content}
                    </p>

                    {currentScreen.id === 'ready' && (
                      <div className="mt-8 w-full max-w-sm space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-outline-variant block mb-4">
                          Choose Your Managerial Identity
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {NOMINATIONS.map((nom) => (
                            <button
                              key={nom.id}
                              onClick={() => setSelectedNomination(nom.id)}
                              className={`flex items-start gap-4 p-4 rounded-2xl border transition-all text-left group ${
                                selectedNomination === nom.id
                                  ? 'bg-primary/10 border-primary shadow-lg shadow-primary/5'
                                  : 'bg-surface-container-highest/20 border-white/5 hover:border-white/10'
                              }`}
                            >
                              <div className={`mt-0.5 p-2 rounded-lg transition-colors ${
                                selectedNomination === nom.id ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-outline-variant group-hover:text-white'
                              }`}>
                                <span className="material-symbols-outlined text-xl">{nom.icon}</span>
                              </div>
                              <div className="flex-1">
                                <div className={`text-sm font-headline font-black uppercase tracking-tight ${
                                  selectedNomination === nom.id ? 'text-primary' : 'text-white'
                                }`}>
                                  {nom.title}
                                </div>
                                <div className="text-[10px] text-on-surface-variant leading-relaxed font-medium mt-1">
                                  {nom.description}
                                </div>
                              </div>
                              {selectedNomination === nom.id && (
                                <motion.div layoutId="check" className="mt-1">
                                  <CheckCircle2 size={16} className="text-primary" />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="p-8 bg-surface-container-lowest/50 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all ${
                  currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-outline-variant hover:text-white'
                }`}
              >
                <ChevronLeft size={18} /> Back
              </button>

              <div className="flex items-center gap-4">
                {currentStep < screens.length - 1 && (
                  <button 
                    onClick={onClose}
                    className="text-xs font-bold text-outline-variant uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Skip Briefing
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-xl font-headline font-black uppercase tracking-widest shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all active:scale-95"
                >
                  {currentStep === screens.length - 1 ? (
                    <>Get Started <ArrowRight size={18} /></>
                  ) : (
                    <>Next <ChevronRight size={18} /></>
                  )}
                </button>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
