import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          فشرده‌ساز هوشمند تصاویر
        </h1>
        <p className="text-slate-300 max-w-md mx-auto leading-relaxed">
          کیفیت بالا، حجم پایین — با فناوری WebP و پردازش ابری تصاویرت رو سریع و
          رایگان فشرده کن.
        </p>
        <Link
          to="/upload"
          className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        >
          شروع فشرده‌سازی
        </Link>
      </div>

      <footer className="absolute bottom-4 text-xs text-slate-500">
        ساخته شده با ❤️ و React
      </footer>
    </div>
  );
}
