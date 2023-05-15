import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
  // AdminCaseDetails,
  OrganizeInfo,
  DonationHistory,
  CampaignPage,
  UpdatePage,
  AdminAllCase,
  UserPage,
  OrganizePostCase,
} from "./pages/index";

import { NavBar, Case, Footer } from "./components/index";

import AuthService from "./services/auth.service";

function App() {
  let [caseData, setCaseData] = useState(null);

  const admin = true;
  const [Loading, setLoading] = useState(false);
  const [onHome, setOnHome] = useState(false);
  const [inCampaignPage, setInCampaignPage] = useState(false);

  const [showNavBar, setShowNavBar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  //頁面滾動
  const [triggerScroll, setTriggerScroll] = useState(false);

  // Replace the original handleRouteChange with the new one
  const location = useLocation();

  useEffect(() => {
    const shouldHide =
      location.pathname === "/register" || location.pathname === "/login";
    setShowNavBar(!shouldHide);
    setShowFooter(!shouldHide);
  }, [location]);

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
      <div className="pt-32">
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
            path="/AdminAllCase"
            element={
              <AdminAllCase
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
          <Route
            exact
            path="CampaignPage/:title"
            element={<CampaignDetails setInCampaignPage={setInCampaignPage} />}
          />

          <Route
            exact
            path="AdminAllCase/:title"
            element={<CampaignDetails setInCampaignPage={setInCampaignPage} />}
          />

          <Route
            exact
            path="UserPage"
            element={<UserPage setInCampaignPage={setInCampaignPage} />}
          />

          <Route
            exact
            path="UpdatePage/:title"
            element={
              <CampaignDetails
                setInCampaignPage={setInCampaignPage}
                triggerScroll={triggerScroll}
                setTriggerScroll={setTriggerScroll}
              />
            }
          />
          {/* 
        <Route
          exact
          path="admincheckcase/:title"
          element={<AdminCaseDetails />}
        /> */}

          <Route
            exact
            path="profilecases/:title"
            element={<CampaignDetails setInCampaignPage={setInCampaignPage} />}
          />
          <Route
            exact
            path="/clientpostcase"
            element={
              <ClientPostCase
                currentUser={currentUser}
                setInCampaignPage={setInCampaignPage}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            exact
            path="/OrganizePostCase"
            element={
              <OrganizePostCase
                currentUser={currentUser}
                setInCampaignPage={setInCampaignPage}
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
            path="/admincheckcase/:title"
            element={
              <CampaignDetails
                setInCampaignPage={setInCampaignPage}
                admin={admin}
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
          <Route
            exact
            path="/UpdatePage"
            element={
              <UpdatePage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setTriggerScroll={setTriggerScroll}
              />
            }
          />
        </Routes>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}

export default App;
