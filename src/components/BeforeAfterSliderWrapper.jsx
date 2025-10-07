import BeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

export default function BeforeAfterSliderWrapper({ before, after }) {
  if (!before || !after) return null;

  return (
    <div className="before-after-slider">
      <BeforeAfterSlider
        firstImage={{ imageUrl: before }}
        secondImage={{ imageUrl: after }}
      />
    </div>
  );
}
