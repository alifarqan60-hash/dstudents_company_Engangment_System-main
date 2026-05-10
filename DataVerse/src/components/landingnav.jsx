import { useNavigate } from "react-router-dom";
import Logo from '../assets/new_logo.png';

const Landingnav = () => {
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/register");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleScrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto flex justify-between items-center max-w-screen-lg mt-6">
      <div
        className="flex flex-1 items-center cursor-pointer"
        onClick={() => handleNavigate("/")}
      >
        <img src={Logo} alt="DataSphere Logo" className="h-10 w-10 mr-2 logo-diamond logo-contrast-dark" />
        <p className="text-xl font-bold text-white">DataSphere</p>
      </div>

      <div className="flex flex-1">
        <button
          className="text-md font-medium font-sans text-white mr-4 h-full px-4 hover:text-theme transform-all duration-200"
          onClick={() => handleNavigate("/")}
        >
          Home
        </button>
        <button
          className="text-md font-medium font-sans text-white mr-4 h-full px-4 hover:text-theme transform-all duration-200"
          onClick={() => handleScrollToSection("tracks")}
        >
          Tracks
        </button>
        <button
          className="text-md font-medium font-sans text-white mr-4 h-full px-4 hover:text-theme transform-all duration-200"
          onClick={() => handleScrollToSection("faqs")}
        >
          FAQs
        </button>
        <button
          className="text-md font-medium font-sans text-white mr-4 h-full px-4 hover:text-theme transform-all duration-200"
          onClick={() => handleScrollToSection("about")}
        >
          About
        </button>
      </div>
      <div className="flex flex-1 items-center justify-end">
        <button
          className="text-md font-medium text-white font-sans hover:text-theme mr-10 transform-all duration-200"
          onClick={handleSignin}
        >
          Log in
        </button>
        <button
          className="text-md font-medium text-white font-sans bg-theme bg-opacity-30 hover:bg-opacity-100 py-3 px-8 rounded-lg transform-all duration-200"
          onClick={handleSignin}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landingnav;
