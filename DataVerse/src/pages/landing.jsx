import Landingnav from "../components/landingnav";
import model from "../assets/model.png";
import icon1 from "../assets/track1.svg";
import icon2 from "../assets/track2.svg";
import icon3 from "../assets/track3.svg";
import profile1 from "../assets/profile1.svg";
import calender from "../assets/calender.svg";
import imagesec from "../assets/imagesec.png";
import Faqs from "../components/faqs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

// Add all brand icons to the library
library.add(fab);

const FeatureCard = ({ icon, head, text }) => (
    <div className="flex gap-4 p-6 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 transition-all hover:-translate-y-1">
        <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0">
            <img src={icon} alt="" className="w-6 h-6 invert" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{head}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">{text}</p>
        </div>
    </div>
);

const TrackCard = ({ icon, head, text, isDark }) => (
    <div className={`p-8 rounded-3xl ${isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900 border border-slate-100 shadow-xl shadow-slate-200/40"}`}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isDark ? "bg-white/10" : "bg-slate-900"}`}>
            <img src={icon} alt="" className={`w-7 h-7 ${!isDark && "invert"}`} />
        </div>
        <h3 className="text-xl font-bold mb-3">{head}</h3>
        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>{text}</p>
    </div>
);

const Landing = () => {
    return (
        <div className="bg-slate-50 selection:bg-slate-900 selection:text-white overflow-hidden font-sans">
            {/* Hero Section */}
            <div className="relative min-h-screen bg-slate-900 overflow-hidden flex flex-col">
                {/* Abstract Background Elements */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-20">
                    <Landingnav />
                </div>

                <div id="home" className="container max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-8 mt-10 lg:mt-0 relative z-10 py-20 lg:py-0">

                    <div className="flex-1 w-full flex flex-col justify-center items-start pt-10 lg:pt-0">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full mb-8">
                            <span className="bg-blue-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">New Update</span>
                            <span className="text-slate-200 text-sm font-medium pr-2">Master Data Science in 180 days</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                            Elevate your <span className="text-transparent border-none bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">tech skills</span><br /> to the next level
                        </h1>

                        <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
                            Join thousands of developers worldwide. Learn, build, and collaborate on real-world projects with DataSphere interactive learning environment.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link to="/register">
                                <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
                                    Start Learning Free <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </Link>
                            <button className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all border border-slate-700">
                                Explore Curriculum
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-4 text-sm text-slate-400">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-10 h-10 rounded-full border-2 border-slate-900" />
                                ))}
                            </div>
                            <p>Trusted by <strong className="text-white">10,000+</strong> students globally</p>
                        </div>
                    </div>

                    <div className="flex-1 w-full h-[300px] lg:h-[600px] relative mt-16 lg:mt-0 right-0">
                        {/* Replace logic model with a floating high-quality UI representation if possible, but keep original asset for now */}
                        <img src={model} alt="Student" className="w-full h-full object-contain object-right drop-shadow-2xl" />
                    </div>
                </div>
            </div>

            {/* Tracks Section */}
            <div id="tracks" className="py-32 container max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Curriculum</h2>
                    <p className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Learning tracks designed for rapid growth</p>
                    <p className="text-lg text-slate-500">We provide practical skills and interactive environments to help you excel in the fastest-growing fields in tech.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TrackCard
                        icon={icon1}
                        isDark={true}
                        head="Premium Resources"
                        text="Access high-quality facilities tailored for mastering Machine Learning and Data Science."
                    />
                    <TrackCard
                        icon={icon2}
                        isDark={false}
                        head="Flexible Environment"
                        text="Write code directly in your browser. No need to worry about complex environment setups."
                    />
                    <TrackCard
                        icon={icon3}
                        isDark={true}
                        head="Practical Approach"
                        text="Learn by doing through hands-on projects, real-world datasets, and interactive challenges."
                    />
                </div>
            </div>

            {/* Features Section */}
            <div id="about" className="py-24 bg-white border-y border-slate-100">
                <div className="container max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1">
                        <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Features</h2>
                        <p className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-8">Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">succeed</span>.</p>

                        <div className="space-y-6">
                            <FeatureCard
                                icon={profile1}
                                head="Global Collaboration"
                                text="Create projects in collaboration with peers worldwide. Share knowledge and grow together."
                            />
                            <FeatureCard
                                icon={calender}
                                head="Exclusive Job Board"
                                text="Get contacted by top tech companies based on your platform performance and skill rankings."
                            />
                            <FeatureCard
                                icon={calender}
                                head="Industry Insights"
                                text="Stay ahead of the curve with the latest news, updates, and trends from the tech industry."
                            />
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-blue-50 transform rotate-3 rounded-[3rem]" />
                        <img src={imagesec} alt="Platform Preview" className="relative z-10 w-full rounded-[2.5rem] shadow-2xl origin-bottom transition-transform hover:-translate-y-2 hover:rotate-1 duration-500" />

                        {/* Floating Badges */}
                        <div className="absolute top-10 -left-10 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
                            <div>
                                <p className="font-bold text-slate-900 text-sm">Code verified</p>
                                <p className="text-xs text-slate-400">Just now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div id="faqs" className="py-24 bg-slate-50">
                <Faqs />
            </div>

            {/* CTA & Footer combined */}
            <div className="relative bg-slate-900 pt-32 pb-16 px-6 lg:px-8 mt-40">
                {/* Floating CTA Box */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 lg:p-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Ready to start your journey?</h2>
                            <p className="text-blue-100 text-lg max-w-xl">Upgrade your skills today. Join DataSphere and get 30 days of free access to premium content.</p>
                        </div>
                        <div className="w-full lg:w-auto">
                            <form className="flex flex-col sm:flex-row gap-3 w-full">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-6 py-4 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-72 shadow-inner"
                                />
                                <button type="button" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                                    Get Started <FontAwesomeIcon icon={faExternalLinkAlt} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Top */}
                <div className="container max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-2">
                        <h1 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-slate-900 font-bold block text-sm">DS</span>
                            </div>
                            DataSphere
                        </h1>
                        <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
                            The premier interactive learning platform for data science, machine learning, and software engineering. Build your future today.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6">Navigation</h3>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#tracks" className="hover:text-white transition-colors">Curriculum</a></li>
                            <li><a href="#about" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all"><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all"><FontAwesomeIcon icon={['fab', 'x-twitter']} /></a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="container max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} DataSphere Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
