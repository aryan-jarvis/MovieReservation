import React, { useState } from "react";

export default function LanguageDropdown({ selected, setSelected }) {
  const options = [
    "English",
    "Hindi",
    "Marathi",
    "Telugu",
    "Punjabi",
    "Spanish",
    "French",
    "German",
  ];

  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (lang) => {
    if (selected.includes(lang)) {
      setSelected(selected.filter((l) => l !== lang));
    } else {
      setSelected([...selected, lang]);
    }
  };

  const styles = {
    dropdownContainer: {
      position: "relative",
      width: "100%",
    },
    dropdownButton: {
      height: "2.5rem",
      padding: "0.6rem",
      border: "0.1rem #A1A2A4 solid",
      borderRadius: "0.3rem",
      fontSize: "1rem",
      backgroundColor: "white",
      textAlign: "left",
      cursor: "pointer",
    },
    dropdownList: {
      position: "absolute",
      top: "110%",
      left: 0,
      right: 0,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      borderRadius: "0.3rem",
      zIndex: 10,
      maxHeight: "10rem",
      overflowY: "auto",
    },
    dropdownItem: {
      padding: "0.5rem 1rem",
      cursor: "pointer",
    },
    selectedItem: {
      backgroundColor: "#f0f0f0",
      fontWeight: "600",
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginTop: "0.5rem",
    },
    chip: {
      backgroundColor: "#FF5295",
      color: "#fff",
      padding: "0.3rem 0.6rem",
      borderRadius: "1rem",
      fontSize: "0.8rem",
    },
  };

  return (
    <div style={styles.dropdownContainer}>
      <div style={styles.dropdownButton} onClick={toggleDropdown}>
        {selected.length === 0 ? "Select languages" : selected.join(", ")}
      </div>

      {open && (
        <div style={styles.dropdownList}>
          {options.map((lang) => (
            <div
              key={lang}
              onClick={() => handleSelect(lang)}
              style={{
                ...styles.dropdownItem,
                ...(selected.includes(lang) ? styles.selectedItem : {}),
              }}
            >
              {lang}
            </div>
          ))}
        </div>
      )}

      <div style={styles.chips}>
        {selected.map((lang) => (
          <div key={lang} style={styles.chip}>
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
}
