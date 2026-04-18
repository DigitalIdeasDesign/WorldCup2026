import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { Trophy, Loader2, ArrowLeft, Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../../firebase';
import { TEAM_INFO } from './TournamentApp';
import { NOMINATIONS } from '../../constants/nominations';

export default function ShareView() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      try {
        const [predSnap, userSnap] = await Promise.all([
          getDoc(doc(db, 'predictions', userId)),
          getDoc(doc(db, 'users', userId))
        ]);

        if (predSnap.exists()) setData(predSnap.data());
        if (userSnap.exists()) setProfile(userSnap.data());
      } catch (err) {
        console.error("Error fetching shared data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="text-blue-500 animate-spin" size={48} />
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <Trophy size={64} className="text-slate-800 mb-6" />
      <h1 className="text-3xl font-black uppercase italic mb-2">Predictions Not Found</h1>
      <p className="text-slate-500 mb-8">This user hasn't shared their bracket yet or the link is invalid.</p>
      <button onClick={() => navigate('/')} className="px-8 py-4 bg-blue-600 rounded-2xl font-black italic hover:bg-blue-500 transition-all">
        GO TO HOME
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl font-black italic shadow-xl shadow-blue-900/40">
              {profile?.displayName?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter">{profile?.displayName}'s Predictions</h1>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                {NOMINATIONS.find(n => n.id === profile?.nomination)?.title || 'Elite Scout'} • Carlos & Co: WC '26
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center px-8 py-4 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Champion Pick</p>
              <p className="text-xl font-black italic text-amber-500 uppercase">{data.bracket?.champion || 'TBD'}</p>
            </div>
            <button onClick={() => navigate('/')} className="px-8 py-4 bg-slate-800 rounded-2xl font-black italic hover:bg-slate-700 transition-all flex items-center gap-2">
              <ArrowLeft size={20} /> MAKE YOUR OWN
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Summary Section */}
          <div className="space-y-8">
            <section className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800">
              <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-3">
                <Star className="text-amber-500" /> Award Predictions
              </h3>
              <div className="grid gap-4">
                {[
                  { label: 'Golden Ball', value: data.awards?.mvp },
                  { label: 'Golden Boot', value: data.awards?.goldenBoot },
                  { label: 'Golden Glove', value: data.awards?.goldenGlove }
                ].map(a => (
                  <div key={a.label} className="flex justify-between items-center p-4 bg-slate-800/50 rounded-2xl">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{a.label}</span>
                    <span className="font-black italic text-blue-400">{a.value || 'None'}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800">
              <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-3">
                <Trophy className="text-blue-500" /> Top Seeds
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(data.groupRankings || {}).slice(0, 8).map(([groupId, teams]: any) => (
                  <div key={groupId} className="p-4 bg-slate-800/50 rounded-2xl">
                    <span className="text-[10px] font-black text-slate-500 uppercase mb-2 block">Group {groupId}</span>
                    <div className="flex items-center gap-2">
                       <CheckCircle2 size={12} className="text-green-500" />
                       <span className="text-sm font-bold">{teams[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Bracket Preview */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 flex flex-col items-center justify-center text-center">
             <Trophy size={80} className="text-amber-500 mb-6 opacity-20" />
             <h3 className="text-2xl font-black italic uppercase mb-2">Bracket Locked</h3>
             <p className="text-slate-500 max-w-xs mx-auto mb-8">The full interactive bracket is available when you join the competition.</p>
             <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-1/2 h-full bg-blue-600"
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
