import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { useState, useEffect } from "react";
import API from "../services/api";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { notifications, setNotifications } = useSocket();
  const [open, setOpen] = useState(false);
  

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpen = async () => {
    setOpen(!open);
    if (!open) {
      const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
      if (unreadIds.length) {
        await API.put("/notifications/read", { ids: unreadIds });
        setNotifications((prev) =>
          prev.map((n) => ({ ...n, read: true }))
        );
      }
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;


  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <div className="logo">DriveNow</div>
      <ul className="nav-links">
      <li>
        <Link to="/" className="text-white/80 hover:text-white transition">Home</Link>
      </li>
      <li>
        <Link to="/Cars" className="text-white/80 hover:text-white transition">Browse Cars</Link>
      </li>
      {user && user?.user?.role !== "admin" && (
        <li>
          <Link to="/my-bookings" className="text-white/80 hover:text-white transition">My Bookings</Link>
        </li>
      )}
      {user?.user?.role === "admin" && (
        <>
          <li>
            <Link to="/admin" className="text-white/80 hover:text-white transition">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/dashboard" className="text-white/80 hover:text-white transition">Admin</Link>
          </li>
        </>
      )}
    </ul>


        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Bell only when authenticated */}
          {user && (
            <div className="relative">
              <button
                onClick={handleOpen}
                className="primary-btn bg-white/10 hover:bg-white/20 text-white relative p-2 rounded-full"
                style={{padding: "1rem", margin: "1rem"}}
                aria-label="Notifications"
              >
                <span role="img" aria-hidden className="">🔔</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-red-500 text-[10px] leading-5 text-white rounded-full text-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-xl shadow-2xl border border-black/10 max-h-72 overflow-y-auto z-[60]">
                  {notifications.length === 0 ? (
                    <p className="p-3 text-sm text-gray-500">No notifications</p>
                  ) : (
                    notifications.map((notif, i) => (
                      <p key={i} className={`p-3 border-b text-sm ${notif.read ? 'text-gray-500' : 'text-black font-medium'}`}>
                        {notif.message}
                      </p>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Auth actions */}
          {!user ? (
           <div className="flex items-center gap-3">
           <Link
             to="/login"
             className="cta-btn no-underline"
             style={{marginRight: "0.5rem"}}
           >
             Login
           </Link>
           <Link
             to="/register"
             className="cta-btn no-underline"
             style={{marginLeft: "0.5rem"}}
           >
             Sign Up
           </Link>
         </div>
         
          ) : (
            <button
              onClick={logout}
              className="secondary-btn bg-white/10 hover:bg-white/20 text-white"
            >
              Logout
            </button>
          )}

         
          
        </div>
    </nav>
  );
}
