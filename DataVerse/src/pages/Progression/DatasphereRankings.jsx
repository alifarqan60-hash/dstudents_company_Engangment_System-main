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

  useEffect(()=>{
    const fetchRankings = async () => {
      const response = await axiosInstance.get("/auth/rankings");
      setRankings(response.data);
    }
    fetchRankings();
  }, [])


  return (
    <div className="w-full mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Dataverse Rankings</h1>
      
      <div className="flex justify-between items-center mb-8">
        <div className="space-x-4">
          {/* {categories.map((category) => (
            <button
              key={category}
              className={`pb-2 ${activeCategory === category ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))} */}
        </div>
        {/* <a href="#" className="text-blue-600 hover:underline">Learn more about rankings</a> */}
      </div>

      {/* <div className="flex justify-between mb-8">
        {tiers.map((tier) => (
          <div key={tier.name} className="flex items-center">
            <tier.Icon className="w-8 h-8 mr-2" />
            <div>
              <div className="font-semibold">{tier.count.toLocaleString()}</div>
              <div className="text-sm text-gray-500">{tier.name}</div>
            </div>
          </div>
        ))}
      </div> */}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rankings.length>0?
            
            rankings.map((user, i) => (
              <tr key={user.rank}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i+1}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar name={user.username} avatar={user.username.at(0)} />
                    <div className="ml-4 w-24">
                      <div className="text-sm font-medium text-gray-900">{user.username}</div>
                      <div className="text-sm text-gray-500">joined {user.createdAt
                  ? formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })
                  : ''}</div>
                      
                    </div>
                    <div className='w-10 ml-10 items-center'>
                      {i==0?
                      <PiMedalBold className="w-6 h-6 text-yellow-400" />
                        :
                      <></>
                      }
                      {i==1?
                      <PiMedalBold className="w-6 h-6 text-gray-400" />
                        :
                      <></>
                      }
                      {i==2?
                      <PiMedalBold className="w-6 h-6 text-yellow-700" />
                        :
                      <></>
                      }

                    </div>
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <PiMedalBold className="w-6 h-6 text-yellow-400" />
                    <span>{user.goldMedals}</span>
                    <PiMedalBold className="w-6 h-6 text-gray-400" />
                    <span>{user.silverMedals}</span>
                    <PiMedalBold className="w-6 h-6 text-yellow-700" />
                    <span>{user.bronzeMedals}</span>
                  </div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.totalPoints}</td>
              </tr>
            ))
          :
          <Loader/>  
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}