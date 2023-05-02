import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  Profile,
  ProfileCampaign,
  PostCase,
  Donate,
  CampaignDetails,
  ClientPostCase,
  AdminCheckCase,
  CashFlowDashboard,
  AdminCaseDetails,
  OrganizeInfo,
  DonationHistory,
  CampaignPage,
} from "./pages/index";

import { NavBar, Case, Footer } from "./components/index";

import AuthService from "./services/auth.service";

function App() {
  let [caseData, setCaseData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [onHome, setOnHome] = useState(false);
  const [inCampaignPage, setInCampaignPage] = useState(false);

  const [showNavBar, setShowNavBar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const handleRouteChange = () => {
      const shouldHide =
        window.location.pathname === "/register" ||
        window.location.pathname === "/login";
      setShowNavBar(!shouldHide);
      setShowFooter(!shouldHide);
    };

    handleRouteChange(); // Call it once on mount
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      // Clean up the listener when the component unmounts
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  console.log("currentuser:", currentUser);
  console.log("App page: ", caseData);
  return (
    <div>
      {showNavBar && (
        <NavBar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setCaseData={setCaseData}
          setLoading={setLoading}
          onHome={onHome}
          inCampaignPage={inCampaignPage}
        />
      )}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              caseData={caseData}
              Loading={Loading}
              onHome={onHome}
              setOnHome={setOnHome}
              setInCampaignPage={setInCampaignPage}
            />
          }
        />
        <Route
          exact
          path="/CampaignPage"
          element={
            <CampaignPage
              caseData={caseData}
              Loading={Loading}
              onHome={onHome}
              setInCampaignPage={setInCampaignPage}
              setOnHome={setOnHome}
            />
          }
        />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/login"
          element={
            <Login
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setInCampaignPage={setInCampaignPage}
            />
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setInCampaignPage={setInCampaignPage}
            />
          }
        />
        <Route
          exact
          path="/profilecases"
          element={
            <ProfileCampaign
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setInCampaignPage={setInCampaignPage}
            />
          }
        />
        <Route
          exact
          path="/case"
          element={
            <Case
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setInCampaignPage={setInCampaignPage}
            />
          }
        />
        <Route
          exact
          path="/postcase"
          element={
            <PostCase
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setInCampaignPage={setInCampaignPage}
            />
          }
        />
        <Route
          exact
          path="/donate"
          element={
            <Donate
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setInCampaignPage={setInCampaignPage}
            />
          }
        />
        <Route exact path="/:title" element={<CampaignDetails />} />

        <Route
          exact
          path="admincheckcase/:title"
          element={<AdminCaseDetails />}
        />

        <Route exact path="profilecases/:title" element={<CampaignDetails />} />
        <Route
          exact
          path="/clientpostcase"
          element={
            <ClientPostCase
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          exact
          path="/admincheckcase"
          element={
            <AdminCheckCase
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          exact
          path="/CashFlowDashBoard"
          element={
            <CashFlowDashboard
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          exact
          path="/organizeInfo"
          element={
            <OrganizeInfo
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          exact
          path="/DonationHistory"
          element={
            <DonationHistory
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
