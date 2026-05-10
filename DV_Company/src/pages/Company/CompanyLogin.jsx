import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IMAGES } from "../../assets";
import { loginUser } from "../../redux/auth/AuthSlice";
import { MdBusiness, MdEmail, MdLock } from "react-icons/md";
import { toast } from "react-toastify";

export default function CompanyLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, error, user } = useSelector((state) => state.auth);

  // Auto-redirect if already logged in as company
  useEffect(() => {
    if (user?.isCompany) {
      navigate("/company/dashboard");
    }
  }, [user, navigate]);

  const handleLoginClick = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      const loggedUser = resultAction.payload;
      if (!loggedUser?.isCompany && !loggedUser?.isAdmin) {
        toast.error("Access denied. Company account required.");
        dispatch({ type: "auth/logout" });
        return;
      }
      toast.success(`Welcome back, ${loggedUser.username}!`);
      navigate("/company/dashboard");
    } else if (loginUser.rejected.match(resultAction)) {
      toast.error(
        resultAction.payload?.message || "Invalid credentials."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4 font-sans">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10">
        {/* Left — Branding Panel */}
        <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-900 to-indigo-800 p-12 flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <img
                src={IMAGES.dataverse_logo}
                alt="Logo"
                className="w-7 h-7 object-contain logo-diamond logo-contrast-dark"
              />
            </div>
            <span className="text-white font-bold text-xl">DataSphere</span>
          </div>

          <div>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <MdBusiness size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-white leading-tight mb-4">
              Company
              <br />
              Portal
            </h1>
            <p className="text-blue-100/80 text-base leading-relaxed">
              Post jobs, evaluate datasets, review candidates, and manage your
              recruitment pipeline securely.
            </p>

            <div className="mt-10 flex gap-6">
              {[
                { label: "Active Jobs", value: "320+" },
                { label: "Candidates", value: "15k+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-white font-black text-2xl">{stat.value}</p>
                  <p className="text-blue-200/60 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-blue-200/50 text-xs">
            © 2025 DataVerse. All rights reserved.
          </p>
        </div>

        {/* Right — Login Form */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <img src={IMAGES.dataverse_logo} alt="Logo" className="w-8 h-8 logo-diamond logo-contrast-dark" />
            <span className="font-bold text-slate-800 text-lg">Company Portal</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900">Partner Login</h2>
            <p className="text-slate-500 mt-1.5 text-sm">
              Sign in to manage your company profile
            </p>
          </div>

          <form onSubmit={handleLoginClick} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Work Email
              </label>
              <div className="relative">
                <MdEmail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="hr@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <MdLock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                </button>
              </div>
            </div>

            {error && typeof error === "string" && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center gap-2">
                <span className="text-red-500">⚠</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {status === "loading" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <MdBusiness size={18} />
                  Access Company Portal
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            Access restricted to authorized company representatives.
          </p>
        </div>
      </div>
    </div>
  );
}
