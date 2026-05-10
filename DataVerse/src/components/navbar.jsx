import { faSearch, faBell, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/new_logo.png';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="fixed top-0 left-0 right-0 h-[72px] bg-white/80 backdrop-blur-xl flex items-center border-b border-slate-200/60 px-8 z-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">

      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/app/dashboard')}>
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-105 transition-transform">
          <img src={Logo} alt="DataSphere Logo" className="h-7 w-7 logo-diamond logo-contrast-dark" />
        </div>
        <p className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">DataSphere</p>
      </div>


      <nav className="flex ml-12 items-center space-x-2 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/60">
        <button
          className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive('/app/dashboard')
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
            : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
            }`}
          onClick={() => navigate('/app/dashboard')}
        >
          Home
        </button>
        <button
          className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive('/app/courses')
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
            : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
            }`}
          onClick={() => navigate('/app/courses/catalog')}
        >
          Courses
        </button>
        <button
          className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive('/app/jobs')
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
            : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
            }`}
          onClick={() => navigate('/app/jobs')}
        >
          Jobs
        </button>
        <button
          className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive('/app/rankings')
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
            : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
            }`}
          onClick={() => navigate('/app/rankings')}
        >
          Leaderboard
        </button>
      </nav>

      {/* Profile Section */}
      <div className="flex flex-1 justify-end items-center gap-6">
        <div className="flex items-center gap-4 bg-slate-50 px-4 py-1.5 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            {user?.imgUrl ? (
              <img
                src={user.imgUrl}
                alt="Avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200"
              />
            ) : (
              <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-slate-200 text-slate-900 font-bold">
                {user?.username?.at(0).toUpperCase()}
              </div>
            )}
            <p className="text-sm font-bold text-slate-800 hidden lg:block">{user?.username}</p>
          </div>
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <button
            onClick={() => navigate('/app/settings')}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
          >
            <FontAwesomeIcon icon={faCog} className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
