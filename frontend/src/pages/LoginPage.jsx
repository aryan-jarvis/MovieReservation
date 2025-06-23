import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/authP");
  };
  const styles = {
    mainDiv: {
      display: "flex",
      gap: "30rem",
      padding: "0.5rem",
    },
    textLeft: {
      padding: "1rem",
    },
    logo: {
      marginBottom: "1rem",
    },
    centerText: {
      marginLeft: "12rem",
      marginTop: "3rem",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    imageRight: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      borderRadius: "8px",
      fontSize: "1.2rem",
      cursor: "pointer",
      width: "25rem",
      height: "4rem",
      border: "0.1rem solid #898888",
      backgroundColor: "#fff",
      color: "#626262",
      justifyContent: "center",
    },
    para: {
      marginTop: "19.9rem",
      color: "#626262",
    },
    txt: {
      color: "#626262",
    },
    input: {
      width: "25rem",
      height: "4rem",
      padding: "0 1rem",
      fontSize: "1.2rem",
      border: "none",
      borderBottom: "1px solid #898888",
      outline: "none",
      color: "#626262",
      backgroundColor: "#fff",
    },
  };

  return (
    <div>
      <div className="main-div" style={styles.mainDiv}>
        <div className="text-left" style={styles.textLeft}>
          <div className="logo" style={styles.logo}>
            <img src="../src/assets/images/logo.png" alt="company logo" />
          </div>
          <div className="center-text" style={styles.centerText}>
            <h1 style={styles.txt}>Welcome 👋</h1>

            <div>
              <button style={styles.button}>
                <img
                  src="../src/assets/images/google_icon.png"
                  alt="Google icon"
                  width="24"
                  height="24"
                />
                <span>Continue with Google</span>
              </button>
            </div>

            <div>
              <button style={styles.button} onClick={handleClick}>
                <img
                  src="../src/assets/images/mail_icon.png"
                  alt="Email icon"
                  width="24"
                  height="24"
                />
                <span>Continue with Email</span>
              </button>
            </div>

            <h2 style={styles.txt}>OR</h2>

            <div>
              <input
                type="tel"
                placeholder="Continue with mobile number"
                style={styles.input}
              />
            </div>

            <p style={styles.para}>
              I agree to the Terms & Conditions & Privacy Policy
            </p>
          </div>
        </div>

        <div className="image-right" style={styles.imageRight}>
          <div>
            <img src="../src/assets/images/theatre.png" alt="theatre" />
          </div>
        </div>
      </div>
    </div>
  );
}
