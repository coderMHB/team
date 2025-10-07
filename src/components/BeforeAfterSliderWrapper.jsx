import BeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

export default function BeforeAfterSliderWrapper({ before, after }) {
  if (!before || !after) return null;

  return (
    <div className="relative w-full">
      <BeforeAfterSlider
        firstImage={{ imageUrl: before }}
        secondImage={{ imageUrl: after }}
      />
      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">
        قبل
      </div>
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">
        بعد
      </div>
    </div>
  );
}
