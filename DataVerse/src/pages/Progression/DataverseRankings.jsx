import { useEffect, useState } from 'react'
import { Award, Zap, Brain, Users, User, Medal } from 'lucide-react'
import { MdPerson3 } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { BiSolidMedal } from "react-icons/bi";
import { TbMedal2 } from "react-icons/tb";
import { PiMedalBold } from "react-icons/pi";
import axiosInstance from '../../config/api';
import Loader from '../../components/Loader';
import { formatDistanceToNow } from 'date-fns';

const categories = ['Competitions', 'Datasets']
const tiers = [
  { name: 'Grandmasters', count: 346, Icon: BiSolidMedal },
  { name: 'Masters', count: 2130, Icon: Zap },
  { name: 'Experts', count: 10249, Icon: Brain },
  { name: 'Contributors', count: 69023, Icon: GoPeople },
  { name: 'Novices', count: 123977, Icon: MdPerson3 },
]
const users = [
  { rank: 1, name: 'hyd', joinedYears: 3, goldMedals: 11, silverMedals: 12, bronzeMedals: 0, points: 168323, avatar: 'H' },
  { rank: 2, name: 'Dieter', joinedYears: 7, goldMedals: 42, silverMedals: 17, bronzeMedals: 3, points: 147818, avatar: 'D' },
  { rank: 3, name: 'Psi', joinedYears: 13, goldMedals: 37, silverMedals: 9, bronzeMedals: 0, points: 136229, avatar: 'P' },
  { rank: 4, name: 'Pascal Pfeiffer', joinedYears: 6, goldMedals: 25, silverMedals: 11, bronzeMedals: 3, points: 117068, avatar: 'PP' },
  { rank: 5, name: 'tascj', joinedYears: 9, goldMedals: 15, silverMedals: 10, bronzeMedals: 3, points: 111757, avatar: 'T' },
]

const Avatar = ({ name, avatar }) => (
  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
    {avatar}
  </div>
)

export default function DataverseRankings() {
  // const [activeCategory, setActiveCategory] = useState('Competitions')
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      const response = await axiosInstance.get("/auth/rankings");
      setRankings(response.data);
    }
    fetchRankings();
  }, [])


  return (
    <div className="bg-slate-50 min-h-screen w-full pt-[40px] pb-12">
      <div className="max-w-6xl mx-auto px-8 font-sans">

        {/* Header section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-heading mb-2">DataVerse Leaderboard</h1>
          <p className="text-lg font-medium text-slate-500">Top contributors and learners in our global community.</p>
        </div>

        {/* Top 3 Podium (Optional: could be implemented for better UX) */}

        <div className="card-premium overflow-hidden border-none shadow-xl shadow-slate-200/50">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900 text-white uppercase text-xxs font-black tracking-[0.2em]">
                <th className="px-8 py-5">Rank</th>
                <th className="px-8 py-5">Learner</th>
                <th className="px-8 py-5 text-right">Progress Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {rankings.length > 0 ? (
                rankings.map((user, i) => (
                  <tr key={user._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm
                        ${i === 0 ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-200 shadow-lg shadow-amber-200/50' :
                          i === 1 ? 'bg-slate-100 text-slate-500 ring-2 ring-slate-200 shadow-lg shadow-slate-200/50' :
                            i === 2 ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-200 shadow-lg shadow-orange-200/50' :
                              'text-slate-400 group-hover:text-slate-900'}`}>
                        {i + 1}
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar name={user.username} avatar={user.username?.at(0).toUpperCase()} />
                        <div>
                          <div className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors">{user.username}</div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            Joined {user.createdAt ? formatDistanceToNow(new Date(user.createdAt)) : 'recently'} ago
                            {i < 3 && (
                              <PiMedalBold className={`w-4 h-4 
                                 ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-slate-400' : 'text-orange-600'}`}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-xl font-black text-slate-900 leading-none">{user.totalPoints?.toLocaleString()}</span>
                        <span className="text-xxs font-black text-primary uppercase tracking-widest mt-1 opacity-60 group-hover:opacity-100 transition-opacity">XP EARNED</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-20">
                    <Loader />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}