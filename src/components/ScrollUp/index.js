import React, { useState } from "react";
import "./_scrollUp.scss";

export default function ScrollUp() {
  const [visible, setVisible] = useState(false);
  //handle scroll to top
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div>
      {visible && (
        <div className="scroll-to-top" onClick={() => scrollToTop()}>
          <i className="fas fa-chevron-up fa-2x"></i>
        </div>
      )}
    </div>
  );
}
