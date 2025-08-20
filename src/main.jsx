import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import MoodTrackerPage from "./pages/MoodTrackerPage.jsx";
import JournalPage from "./pages/JournalPage.jsx";
import ChatbotPage from "./pages/ChatbotPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import LogMoodPage from "./pages/LogMoodPage.jsx";
import TherapistsPage from "./pages/TherapistsPage.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/logmood", element: <LogMoodPage /> },
  { path: "/mood-tracker", element: <MoodTrackerPage /> },
  { path: "/journal", element: <JournalPage /> },
  { path: "/chatbot", element: <ChatbotPage /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "/therapists", element: <TherapistsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
