import React, { useState } from "react";

export default function AzaadDates() {
  const [selectedDate, setSelectedDate] = useState(null);

  const dates = [
    { month: "May", date: 21, day: "Wed" },
    { month: "May", date: 22, day: "Thu" },
    { month: "May", date: 23, day: "Fri" },
    { month: "May", date: 24, day: "Sat" },
    { month: "May", date: 25, day: "Sun" },
    { month: "May", date: 26, day: "Mon" },
    { month: "May", date: 27, day: "Tue" },
  ];

  return (
    <>
      <div className="Azaad" style={{ display: "flex" }}>
        <div>
          <img src="../src/assets/images/azaad.png" alt="Company Logo" />
        </div>
        <div style={{ margin: "100px" }}>
          <h1>Azaad</h1>
          <p>2h 49m Drama, Action | UA13+ | English, Hindi</p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {dates.map((d, index) => (
              <div
                key={index}
                onClick={() => setSelectedDate(index)}
                style={{
                  border: "solid 0.2rem #FF5295",
                  width: "5rem",
                  textAlign: "center",
                  borderRadius: "1rem",
                  height: "7rem",
                  cursor: "pointer",
                  // fontSize: "1.5rem",
                  // fontSize: selectedDate === index ? "1.5rem" : "1rem",
                  // height: selectedDate === index ? "11rem" : "7rem",
                  // width: selectedDate === index ? "7rem" : "5rem",
                  backgroundColor: selectedDate === index ? "#FF5295" : "white",
                  color: selectedDate === index ? "white" : "black",
                }}
              >
                <p>{d.month}</p>
                <p>{d.date}</p>
                <p>{d.day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
