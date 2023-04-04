import React, { useState } from "react";
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
  AdminCaseDetails,
} from "./pages/index";

import { NavBar, Case } from "./components/index";

import AuthService from "./services/auth.service";

function App() {
  let [caseData, setCaseData] = useState(null);
  const [Loading, setLoading] = useState(false);

  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  console.log("App page: ", caseData);
  return (
    <div>
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setCaseData={setCaseData}
        setLoading={setLoading}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home caseData={caseData} Loading={Loading} />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/login"
          element={
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
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
            />
          }
        />
        <Route
          exact
          path="/case"
          element={
            <Case currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          exact
          path="/postcase"
          element={
            <PostCase
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          exact
          path="/donate"
          element={
            <Donate currentUser={currentUser} setCurrentUser={setCurrentUser} />
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
      </Routes>
    </div>
  );
}

export default App;
