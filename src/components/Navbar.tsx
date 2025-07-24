import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/me";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { data, loading } = useQuery(GET_ME);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!data?.me;

  const navButton =
    "px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium shadow hover:scale-105";

  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-lg relative">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold tracking-wide text-green-400 cursor-pointer">
        Odeon
      </h1>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        {isLoggedIn && !loading && (
          <>
            <button
              className={`${navButton} bg-green-500 hover:bg-green-600`}
              onClick={() => navigate("/topsongs")}
            >
              Top Songs
            </button>
            <button
              className={`${navButton} bg-purple-500 hover:bg-purple-600`}
              onClick={() => navigate("/topartists")}
            >
              Top Artists
            </button>
          </>
        )}

        {!isLoggedIn && !loading ? (
          <button className={`${navButton} bg-green-500 hover:bg-green-600`}>
            Log In With Spotify
          </button>
        ) : (
          <div className="relative">
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <img
                src={data?.me?.image || "/default-avatar.png"}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-green-500 hover:scale-110 transition-transform duration-300"
              />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg w-44 overflow-hidden z-50">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  My Profile
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
