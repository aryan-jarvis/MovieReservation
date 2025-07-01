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
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";
import PayUResponseHandler from "./components/PayUResponseHandler";
import PaymentResponse from "./components/PaymentReponse";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ListMovie from "./pages/ListMovie";
import ListShow from "./pages/ListShow";
import ListTheatre from "./pages/ListTheatre";
import AuthPopUp from "./pages/AuthPopUp";
import AddMovie from "./pages/AddMovie";
import AddShow from "./pages/AddShow";
import AddTheatre from "./pages/AddTheatre";
import Head2 from "./components/Head2";
import AzaadDates from "./components/AzaadDates";
import ProfilePage from "./components/ProfilePage";
import MovieCard from "./components/AzaadPvr";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <div className="App">
      <Routes>
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
        <Route path="/payment-response" element={<PayUResponseHandler />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        {/* <Route path="/payment-response" element={<PaymentResponse />} /> */}
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/listM" element={<ListMovie />} />
        <Route path="/listS" element={<ListShow />} />
        <Route path="/listT" element={<ListTheatre />} />
        <Route path="/authP" element={<AuthPopUp />} />
        <Route path="/addM" element={<AddMovie />} />
        <Route path="/addS" element={<AddShow />} />
        <Route path="/addT" element={<AddTheatre />} />
        <Route path="/h2" element={<Head2 />} />
        <Route path="/description/:id" element={<Movie_Description_Page />} />
        <Route path="/theatre/:id" element={<Theatre_Selection_Page />} />
        <Route path="/movie/:id/dates" element={<AzaadDates />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/moviecard/:id" element={<MovieCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
