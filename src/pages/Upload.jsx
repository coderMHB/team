import { useState, useRef } from "react";
import axios from "axios";
import { notify } from "../components/Toasts";
import BeforeAfterSliderWrapper from "../components/BeforeAfterSliderWrapper";

export default function Upload() {
  const [beforeUrl, setBeforeUrl] = useState(null);
  const [afterUrl, setAfterUrl] = useState(null);
  const [beforeSize, setBeforeSize] = useState(null);
  const [afterSize, setAfterSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0); // برای ذخیره درصد پیشرفت بارگذاری
  const fileInputRef = useRef();

  const handleUpload = async (file) => {
    if (!file) return;
    setFileName(file.name);
    setBeforeUrl(URL.createObjectURL(file));
    setBeforeSize(file.size);
    setAfterUrl(null);
    setAfterSize(null);
    setLoading(true);
    setUploadProgress(0); // بازنشانی نوار پیشرفت

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "https://compress.pythonanywhere.com/image/",
        formData,
        {
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress); // به‌روز رسانی درصد پیشرفت
          },
        }
      );

      const blob = new Blob([res.data], { type: "image/webp" });
      const url = URL.createObjectURL(blob);
      setAfterUrl(url);
      setAfterSize(res.data.size);
      notify("✅ تصویر با موفقیت فشرده شد!");
    } catch (err) {
      console.error(err);
      notify("❌ خطایی در فشرده‌سازی رخ داد. دوباره امتحان کن.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!afterUrl) return;
    const link = document.createElement("a");
    link.href = afterUrl;
    link.download = fileName.replace(/\.[^.]+$/, ".webp");
    link.click();
  };

  const formatSize = (size) => {
    if (!size) return "--";
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  };

  const reductionPercentage = () => {
    if (!beforeSize || !afterSize) return "--";
    return Math.round(((beforeSize - afterSize) / beforeSize) * 100) + "%";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">
          فشرده‌سازی تصویر
        </h2>
        <p className="text-slate-300 text-center mb-8">
          عکس خودت رو انتخاب کن تا خروجی WebP بگیری با حجم کمتر.
        </p>

        <div className="flex flex-col items-center gap-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-lg font-semibold shadow-md transition-all hover:scale-105"
          >
            انتخاب و آپلود تصویر
          </button>

          {loading && (
            <div className="w-full max-w-xs">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200">
                      در حال فشرده‌سازی...
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600">
                      {uploadProgress}%
                    </span>
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-cyan-500 h-2.5 rounded-full"
                      style={{
                        width: `${uploadProgress}%`,
                        transition: "width 0.3s ease-in-out", // باعث حرکت نرم نوار پیشرفت میشه
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && beforeUrl && afterUrl && (
            <div className="w-full mt-6 flex flex-col gap-4">
              <BeforeAfterSliderWrapper before={beforeUrl} after={afterUrl} />
              <div className="flex justify-between text-slate-200 text-sm mt-2">
                <span>حجم قبل: {formatSize(beforeSize)}</span>
                <span>حجم بعد: {formatSize(afterSize)}</span>
                <span>کاهش: {reductionPercentage()}</span>
              </div>
              <button
                onClick={downloadImage}
                className="mt-4 w-full py-3 rounded-full bg-green-500 hover:bg-green-400 font-semibold text-lg shadow-md transition-all hover:scale-105 flex justify-center items-center gap-2"
              >
                ⬇️ دانلود تصویر کم‌حجم
              </button>
            </div>
          )}

          {!loading && beforeUrl && !afterUrl && (
            <img
              src={beforeUrl}
              alt="پیش‌نمایش تصویر"
              className="w-full max-h-80 object-contain rounded-lg shadow-md mt-6"
            />
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            ⚠️ تصاویر فقط برای پیش‌نمایش هستند و ذخیره نمی‌شوند.
          </p>
        </div>
      </div>
    </div>
  );
}
