import React from "react";
import { useNavigate } from "react-router-dom";
import Head2 from "../components/Head2";

export default function AddShow() {
  const navigate = useNavigate();
  const cancelClick = () => {
    navigate("/listS");
  };
  const styles = {
    container: {
      // display: "flex",
      // flexDirection: "column",
      // padding: "20px",
      // fontFamily: "Arial, sans-serif",
      // backgroundColor: "lightgreen",
    },
    breadcrumb: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginLeft: "2rem",
    },
    formWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    formBox: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    label: {
      fontWeight: "600",
      fontSize: "1.4rem",
    },
    input: {
      // height: "2.5rem",
      height: "0.35rem",
      padding: "1rem",
      border: "0.1rem #A1A2A4, solid",
      borderRadius: "0.3rem",
      fontSize: "1rem",
    },
    textarea: {
      height: "8rem",
      padding: "1rem",
      border: "0.1rem #A1A2A4, solid",
      borderRadius: "0.3rem",
      fontSize: "1rem",
    },
    _selectRow: {
      display: "flex",
      justifyContent: "space-between",
      gap: "2rem",
    },
    get selectRow() {
      return this._selectRow;
    },
    set selectRow(value) {
      this._selectRow = value;
    },
    select: {
      height: "2.5rem",
      padding: "0.6rem",
      border: "0.1rem #A1A2A4, solid",
      borderRadius: "0.3rem",
      fontSize: "1rem",
      backgroundColor: "white",
    },
    posterSection: {
      fontWeight: "600",
    },
    posterUpload: {
      width: "9rem",
      height: "6rem",
      border: "0.1rem #5A5A61 dotted",
      borderRadius: "1rem",
      paddingTop: "1rem",
      textAlign: "center",
    },
    posterImage: {},
    buttonsRow: {
      display: "flex",
      gap: "20px",
      marginTop: "1rem",
    },
    addButton: {
      backgroundColor: "#FF5295",
      color: "#fff",
      fontWeight: "600",
      width: "6rem",
      height: "2.5rem",
      border: "solid 0.1rem white",
      borderRadius: "0.3rem",
    },
    cancelButton: {
      backgroundColor: "#fff",
      color: "black",
      fontWeight: "600",
      width: "6rem",
      height: "2.5rem",
      border: "solid 0.1rem #FF5295",
      borderRadius: "0.3rem",
    },
  };

  return (
    <div>
      <div>
        <Head2 />
        <span style={styles.breadcrumb}>
          <a href="/home" style={{ color: "grey", textDecoration: "none" }}>
            <p>Home</p>
          </a>
          <p> / </p>
          <a href="/listS" style={{ color: "grey", textDecoration: "none" }}>
            <p>Showtime Scheduling</p>
          </a>
          <p> / </p>
          <p style={{ color: "#000" }}>Add New Showtime</p>
        </span>
      </div>
      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={styles.formBox}>
            <p style={styles.label}>Basic Info</p>

            <input type="text" placeholder="Movie Name" style={styles.input} />
            <input
              type="text"
              placeholder="Theatre Name"
              style={styles.input}
            />

            <div style={styles.selectRow}>
              <input type="date" style={{ ...styles.input, width: "50%" }} />
              <select style={{ ...styles.select, width: "50%" }}>
                <option>Language(s)</option>
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
                <option>Telugu</option>
                <option>Punjabi</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            <div style={{ border: "0.01rem black solid" }}>
              <h4>Add showtime</h4>
              <div style={styles.selectRow}>
                <input type="date" style={{ ...styles.input, width: "50%" }} />
                <input type="date" style={{ ...styles.input, width: "50%" }} />
              </div>
            </div>

            <div style={styles.buttonsRow}>
              <button style={styles.addButton}>Add</button>
              <button style={styles.cancelButton} onClick={cancelClick}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Head2 from "../components/Head2";

// export default function AddShow() {
//   const navigate = useNavigate();

//   // Form states
//   const [movieName, setMovieName] = useState("");
//   const [theatreName, setTheatreName] = useState("");
//   const [showDate, setShowDate] = useState("");
//   const [language, setLanguage] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const cancelClick = () => {
//     navigate("/listS");
//   };

//   const styles = {
//     container: {},
//     breadcrumb: {
//       display: "flex",
//       alignItems: "center",
//       gap: "0.5rem",
//       marginLeft: "2rem",
//     },
//     formWrapper: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//     },
//     formBox: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "1rem",
//     },
//     label: {
//       fontWeight: "600",
//       fontSize: "1.4rem",
//     },
//     input: {
//       height: "2.5rem",
//       padding: "1rem",
//       border: "0.1rem #A1A2A4 solid",
//       borderRadius: "0.3rem",
//       fontSize: "1rem",
//     },
//     selectRow: {
//       display: "flex",
//       justifyContent: "space-between",
//       gap: "2rem",
//     },
//     select: {
//       height: "2.5rem",
//       padding: "0.6rem",
//       border: "0.1rem #A1A2A4 solid",
//       borderRadius: "0.3rem",
//       fontSize: "1rem",
//       backgroundColor: "white",
//     },
//     buttonsRow: {
//       display: "flex",
//       gap: "20px",
//       marginTop: "1rem",
//     },
//     addButton: {
//       backgroundColor: "#FF5295",
//       color: "#fff",
//       fontWeight: "600",
//       width: "6rem",
//       height: "2.5rem",
//       border: "solid 0.1rem white",
//       borderRadius: "0.3rem",
//     },
//     cancelButton: {
//       backgroundColor: "#fff",
//       color: "black",
//       fontWeight: "600",
//       width: "6rem",
//       height: "2.5rem",
//       border: "solid 0.1rem #FF5295",
//       borderRadius: "0.3rem",
//     },
//   };

//   return (
//     <div>
//       <Head2 />
//       <span style={styles.breadcrumb}>
//         <a href="/home" style={{ color: "grey", textDecoration: "none" }}>
//           <p>Home</p>
//         </a>
//         <p> / </p>
//         <a href="/listS" style={{ color: "grey", textDecoration: "none" }}>
//           <p>Showtime Scheduling</p>
//         </a>
//         <p> / </p>
//         <p style={{ color: "#000" }}>Add New Showtime</p>
//       </span>

//       <div style={styles.container}>
//         <div style={styles.formWrapper}>
//           <div style={styles.formBox}>
//             <p style={styles.label}>Basic Info</p>

//             <input
//               type="text"
//               placeholder="Movie Name"
//               style={styles.input}
//               value={movieName}
//               onChange={(e) => setMovieName(e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="Theatre Name"
//               style={styles.input}
//               value={theatreName}
//               onChange={(e) => setTheatreName(e.target.value)}
//             />

//             <div style={styles.selectRow}>
//               <input
//                 type="date"
//                 style={{ ...styles.input, width: "50%" }}
//                 value={showDate}
//                 onChange={(e) => setShowDate(e.target.value)}
//               />
//               <select
//                 style={{ ...styles.select, width: "50%" }}
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//               >
//                 <option value="">Language(s)</option>
//                 <option>English</option>
//                 <option>Hindi</option>
//                 <option>Marathi</option>
//                 <option>Telugu</option>
//                 <option>Punjabi</option>
//                 <option>Spanish</option>
//                 <option>French</option>
//                 <option>German</option>
//               </select>
//             </div>

//             <div style={{ border: "0.01rem black solid", padding: "1rem" }}>
//               <h4>Add showtime range</h4>
//               <div style={styles.selectRow}>
//                 <input
//                   type="date"
//                   style={{ ...styles.input, width: "50%" }}
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                 />
//                 <input
//                   type="date"
//                   style={{ ...styles.input, width: "50%" }}
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div style={styles.buttonsRow}>
//               <button style={styles.addButton}>Add</button>
//               <button style={styles.cancelButton} onClick={cancelClick}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
