import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

export const IFrame = ({ children, theme, ...props }: any) => {
  const [contentRef, setContentRef] = useState(null);

  useEffect(() => {
    const iframe = contentRef;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) return;
    console.log("here, styles");
    // Apply theme
    Object.entries(theme).forEach(([key, value]) => {
      iframeDoc.documentElement.style.setProperty(`--${key}`, value);
    });

    // Inject global styles
    const style = iframeDoc.createElement("link");
    style.rel = "stylesheet";
    style.href = "../globals.css";
    iframeDoc.head.appendChild(style);

    return () => {
      // Cleanup
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [contentRef, theme]);

  useEffect(() => {
    const iframe = contentRef;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) return;

    console.log("tailwind");
    // Inject Tailwind CSS
    const script = iframeDoc.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    iframeDoc.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [contentRef]);

  const mountNode = contentRef?.contentWindow?.document?.body;

  console.log(mountNode)

  return (
    <iframe
      {...props}
      ref={setContentRef}
      style={{ width: "100%", height: "500px", border: "1px solid white" }}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
