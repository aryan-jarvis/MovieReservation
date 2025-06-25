import { useNavigate } from "react-router-dom";
import Head2 from "../components/Head2";

export default function AddTheatre() {
  const navigate = useNavigate();
  const cancelClick = () => {
    navigate("/listT");
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
      height: "2.5rem",
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
        <div style={styles.breadcrumb}>
          <a href="/home" style={{ color: "grey", textDecoration: "none" }}>
            <p>Home</p>
          </a>
          <p> / </p>
          <a href="/listT" style={{ color: "grey", textDecoration: "none" }}>
            <p>Theatre Management</p>
          </a>
          <p> / </p>
          <p style={styles.breadcrumbActive}>Add New Theatre</p>
        </div>
      </div>
      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={styles.formBox}>
            <p style={styles.label}>Basic Info</p>

            <input
              type="text"
              placeholder="Theatre Name"
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Theatre Address"
              style={styles.input}
            />
            <div style={styles.selectRow}>
              <input type="text" placeholder="City Name" style={styles.input} />
              <input
                type="text"
                placeholder="State Name"
                style={styles.input}
              />
            </div>
            <div style={styles.selectRow}>
              <input type="text" placeholder="Status" style={styles.input} />
              <input
                type="text"
                placeholder="Total Number of Screens"
                style={styles.input}
              />
            </div>
            <input
              type="text"
              placeholder="Current Movies"
              style={styles.input}
            />

            <p style={styles.posterSection}>Upload Theatre Icon</p>
            <div style={styles.posterUpload}>
              <img
                src="../src/assets/images/upload.png"
                alt="Upload Icon"
                style={styles.posterImage}
              />
              <p style={{ fontSize: "12px", color: "#6b7280" }}>
                Upload file here
              </p>
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

// export default function AddTheatre() {
//   const navigate = useNavigate();

//   const [theatreName, setTheatreName] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [stateName, setStateName] = useState("");
//   const [status, setStatus] = useState("");
//   const [totalScreens, setTotalScreens] = useState("");
//   const [currentMovies, setCurrentMovies] = useState("");
//   const [icon, setIcon] = useState(null);

//   const cancelClick = () => {
//     navigate("/listT");
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
//     posterSection: {
//       fontWeight: "600",
//     },
//     posterUpload: {
//       width: "9rem",
//       height: "6rem",
//       border: "0.1rem #5A5A61 dotted",
//       borderRadius: "1rem",
//       paddingTop: "1rem",
//       textAlign: "center",
//     },
//     posterImage: {
//       width: "2rem",
//       height: "2rem",
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

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setIcon(file);
//   };

//   return (
//     <div>
//       <Head2 />
//       <div style={styles.breadcrumb}>
//         <a href="/home" style={{ color: "grey", textDecoration: "none" }}>
//           <p>Home</p>
//         </a>
//         <p> / </p>
//         <a href="/listT" style={{ color: "grey", textDecoration: "none" }}>
//           <p>Theatre Management</p>
//         </a>
//         <p> / </p>
//         <p style={{ color: "#000" }}>Add New Theatre</p>
//       </div>

//       <div style={styles.container}>
//         <div style={styles.formWrapper}>
//           <div style={styles.formBox}>
//             <p style={styles.label}>Basic Info</p>

//             <input
//               type="text"
//               placeholder="Theatre Name"
//               style={styles.input}
//               value={theatreName}
//               onChange={(e) => setTheatreName(e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="Theatre Address"
//               style={styles.input}
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />

//             <div style={styles.selectRow}>
//               <input
//                 type="text"
//                 placeholder="City Name"
//                 style={styles.input}
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="State Name"
//                 style={styles.input}
//                 value={stateName}
//                 onChange={(e) => setStateName(e.target.value)}
//               />
//             </div>

//             <div style={styles.selectRow}>
//               <input
//                 type="text"
//                 placeholder="Status"
//                 style={styles.input}
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Total Number of Screens"
//                 style={styles.input}
//                 value={totalScreens}
//                 onChange={(e) => setTotalScreens(e.target.value)}
//               />
//             </div>

//             <input
//               type="text"
//               placeholder="Current Movies"
//               style={styles.input}
//               value={currentMovies}
//               onChange={(e) => setCurrentMovies(e.target.value)}
//             />

//             <p style={styles.posterSection}>Upload Theatre Icon</p>
//             <label style={styles.posterUpload}>
//               <img
//                 src="../src/assets/images/upload.png"
//                 alt="Upload Icon"
//                 style={styles.posterImage}
//               />
//               <p style={{ fontSize: "12px", color: "#6b7280" }}>
//                 Upload file here
//               </p>
//               <input
//                 type="file"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//               />
//             </label>

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
