import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  Profile,
  PostCase,
  Donate,
  CampaignDetails,
  ProfileCampaign,
  ClientPostCase,
  AdminCheckCase,
  AdminCaseDetails,
} from "./pages/index";

import { NavBar, Case } from "./components/index";

import AuthService from "./services/auth.service";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route exact path="/" element={<Home />} />
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
            // currentUser={currentUser}
            // setCurrentUser={setCurrentUser}
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
        <Route exact path="profile/:title" element={<ProfileCampaign />} />
        <Route
          exact
          path="admincheckcase/:title"
          element={<AdminCaseDetails />}
        />
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
