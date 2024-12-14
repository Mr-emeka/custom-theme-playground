"use client";
import React, { useState } from "react";
import PreviewFrame from "./PreviewFrame";
import { ThemeProvider } from "../providers/Theme";

function ThemeCustomizer() {
  const [theme, setTheme] = useState({
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    backgroundColor: "#f0f0f0",
  });

  const [value, setValue] = useState("");

  const handleColorChange = (colorKey: string, value: string) => {
    setTheme((prev) => ({ ...prev, [colorKey]: value }));
  };

  const saveTheme = () => {
    console.log("saving theme;", theme);
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "300px", padding: "20px" }}>
        <h2>Theme Customizer</h2>
        {Object.entries(theme).map(([key, value]) => {
          return (
            <div key={key}>
              <label>{key}:</label>
              <input
                type="color"
                value={value}
                onChange={(e) => handleColorChange(key, e.target.value)}
              />{" "}
            </div>
          );
        })}

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-black"
        />
        <button onClick={saveTheme}>Save Theme</button>
        <div style={{ flex: 1 }}>
          <ThemeProvider>
            <PreviewFrame theme={theme} text={value} />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default ThemeCustomizer;
