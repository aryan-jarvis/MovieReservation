import { Route, Routes, Navigate } from "react-router-dom";
import History_Page from "./components/History_Page";
import Home_Page from "./components/Home_Page";
import Movie_Description_Page from "./components/Movie_Description_Page";
import Movie_List_Page from "./components/Movie_List_Page";
import NoHistory from "./components/NoHistory";
import Payment_Summary_Page from "./components/Payment_Summary_Page";
import Theatre_Selection_Page from "./components/Theatre_Selection_Page";
import ShowBooking_Page from "./components/ShowBooking_Page";
import Ticket from "./components/Ticket";
import Login from "./components/login";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home_Page />} />
        <Route path="/movies" element={<Movie_List_Page />} />
        <Route path="/description" element={<Movie_Description_Page />} />
        <Route path="/theatre" element={<Theatre_Selection_Page />} />
        <Route path="/seatselect" element={<ShowBooking_Page />} />
        <Route path="/payment" element={<Payment_Summary_Page />} />
        <Route path="/history" element={<History_Page />} />
        <Route path="/no_history" element={<NoHistory />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
