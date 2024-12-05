import { FaRegUserCircle } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white shadow-lg">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-700 transition">
          <IoReorderThreeOutline className="text-3xl" />
        </button>
        <p className="text-xl font-semibold tracking-wide">JOBS</p>
      </div>
      {/* Center Logo */}
      <div className="text-2xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        Logo
      </div>
      {/* Right Section */}
      <div className="flex items-center gap-6">
        <span className="text-sm font-light italic opacity-90">12:30 PM</span>
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition">
          <FaRegUserCircle className="text-2xl" />
          <span className="text-sm hidden sm:inline-block">Profile</span>
        </button>
      </div>
    </nav>
  );
}
export default Navbar;
