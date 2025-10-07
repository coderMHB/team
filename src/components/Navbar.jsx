import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function Navbar() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between text-white">
        <Link to="/" className="font-bold text-xl tracking-tight">
          فشرده‌ساز هوشمند
        </Link>

        <div className="flex gap-4 text-sm sm:text-base">
          <Link
            to="/"
            className="hover:text-cyan-400 transition-all duration-200"
          >
            صفحه اصلی
          </Link>
          <Link
            to="/upload"
            className="hover:text-cyan-400 transition-all duration-200"
          >
            فشرده‌سازی
          </Link>
        </div>
      </div>
    </nav>
  );
}
