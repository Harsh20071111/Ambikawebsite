"use client";

import { useEffect, useState } from "react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("ambika-loaded")) {
      setVisible(false);
      return;
    }

    const handleLoad = () => {
      // Small delay so animations complete
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("ambika-loaded", "true");
        }, 600);
      }, 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`page-loader ${fadeOut ? "page-loader--fade" : ""}`}
      aria-hidden="true"
    >
      {/* Animated logo */}
      <div className="page-loader__content">
        <div className="page-loader__logo">
          <div className="page-loader__mark">A</div>
          <div className="page-loader__ring" />
        </div>
        <div className="page-loader__text">
          <span className="page-loader__brand">AMBIKA</span>
          <span className="page-loader__sub">ENGINEERING</span>
        </div>
        <div className="page-loader__bar">
          <div className="page-loader__bar-fill" />
        </div>
      </div>
    </div>
  );
}
