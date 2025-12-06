import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAdmin, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-semibold">
            P
          </div>
          <div className="text-lg font-semibold">Product Showcase</div>
        </Link>

        <div className="flex items-center gap-4">
          {!isAdmin ? (
            <Link to="/admin/login" className="text-sm">
              <button className="bg-primary text-white px-3 py-2 rounded-md">
                Admin Login
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/admin/enquiries" className="text-sm">
                <button className="px-3 py-2 rounded-md border border-gray-200">
                  Enquiries
                </button>
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
