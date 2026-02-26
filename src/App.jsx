import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "../components/sidebar";
// import Navbar from "../components/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import NewRegistration from "./pages/users/NewRegistration";
import Participants from "./pages/users/Participants";
import Esports from "./pages/Esports";
import Tournament from "./pages/Tournament";
import RewardPage from "./pages/RewardPage";
import CouponsPage from "./pages/CouponsPage";
import ScratchcardsPage from "./pages/ScratchcardsPage";
import WithdrawalConverter from "./pages/WithdrawalConverter";
import RewardsPage from "./pages/RewardsPage";

import Transaction from "./pages/Transaction";
import NotificationPage from "./pages/NotificationPage";
import AnnouncementPage from "./pages/AnnouncementPage";
// import Referral from "./pages/Referral";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";

function App() {
  return (
      <div className="flex w-screen bg-[#020617] text-white">

        {/* Sidebar */}


        {/* Main Section */}
        <div className="flex-1 flex flex-col min-h-screen">

          {/* Top Navbar */}
          {/* <Navbar /> */}

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="users/registration" element={<NewRegistration />} />
              <Route path="users/participants" element={<Participants />} />
              <Route path="/e-sports" element={<Esports />} />
              <Route path="/tournament" element={<Tournament />} />
              <Route path="/rewards" element={<RewardPage />} />
              <Route path="/rewards/coupons" element={<CouponsPage />} />
              <Route path="/rewards/scratchcards" element={<ScratchcardsPage />} /> 
              <Route path="/rewards/withdrawal-converter" element={<WithdrawalConverter />} />
              <Route path="/rewards/daily-rewards" element={<RewardsPage />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/notification" element={<NotificationPage/>}/>
              <Route path="/notification/announcement" element={<AnnouncementPage />} />
              {/* <Route path="/referral" element={<Referral />} /> */}
              // <Route path="/support" element={<Support />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </div>

        </div>
      </div>
  );
}

export default App;
