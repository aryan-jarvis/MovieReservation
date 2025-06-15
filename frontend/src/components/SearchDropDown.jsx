import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function SearchDropDown() {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "Delhi", code: "DL" },
    { name: "Mumbai", code: "MU" },
    { name: "Chennai", code: "CN" },
    { name: "Kolkata", code: "KL" },
    { name: "Bokaro", code: "BK" },
  ];

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const dropdownStyle = {
    backgroundColor: "white",
    borderRadius: "4px",
    fontSize: "1rem",
    width: "100%",
    maxWidth: "14rem",
  };

  const cityItemTemplate = (option) => {
    return <div className="custom-dropdown-item">{option.name}</div>;
  };

  return (
    <>
      <style>{`
        .custom-dropdown-item {
          padding: 8px 12px;
          cursor: pointer;
          font-weight: 500;
          color: #333;
          border-bottom: 1px solid #eee;
          background-color: #fff;
          transition: background-color 0.2s ease;
        }
        .custom-dropdown-item:hover {
          background-color: #f5f5f5;
        }
      `}</style>
      <div style={containerStyle}>
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Select a City"
          className="w-full md:w-14rem"
          style={dropdownStyle}
          itemTemplate={cityItemTemplate}
        />
      </div>
    </>
  );
}
