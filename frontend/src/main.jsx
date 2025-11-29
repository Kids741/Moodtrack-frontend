import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MoodTrackerPage from "./pages/MoodTrackerPage.jsx";
import JournalPage from "./pages/JournalPage.jsx";
import ChatbotPage from "./pages/ChatbotPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import LogMoodPage from "./pages/LogMoodPage.jsx";
import Therapists from "./pages/Therapists.jsx";
import About from "./pages/AboutPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FlowerPage from "./pages/Flower.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { ErrorPage } from "./components/ErrorBoundary.jsx";


import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/logmood", element: <LogMoodPage /> },
      { path: "/mood-tracker", element: <MoodTrackerPage /> },
      { path: "/journal", element: <JournalPage /> },
      { path: "/chatbot", element: <ChatbotPage /> },
      { path: "/about", element: <About /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/therapists", element: <Therapists /> },
      { path: "/flower", element: <FlowerPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap  app in AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
