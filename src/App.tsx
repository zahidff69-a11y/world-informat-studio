/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Splash from "./components/Splash";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import History from "./components/History";
import { ViewType, UserProfile } from "./types";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [user, setUser] = useState<any>(null); // Firebase user will go here

  useEffect(() => {
    // Initial load simulation for splash screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleLogin = async (email: string, pass: string) => {
    console.log("Logging in...", email);
    // Real Firebase auth logic will go here
    setCurrentView("home");
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    console.log("Social login with", provider);
    // Real Firebase social auth logic will go here
    setCurrentView("home");
  };

  const handleSignUp = async (profile: Omit<UserProfile, "createdAt" | "email">, email: string, pass: string) => {
    console.log("Signing up...", profile);
    // Real Firestore profile creation logic will go here
    setCurrentView("home");
  };

  return (
    <div className="relative w-full h-screen bg-black select-none overflow-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <Splash key="splash" />
        ) : (
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {currentView === "home" && (
              <Home onNavigate={handleNavigate} user={user} />
            )}
            {currentView === "login" && (
              <Login 
                onNavigate={handleNavigate} 
                onLogin={handleLogin} 
                onSocialLogin={handleSocialLogin} 
              />
            )}
            {currentView === "signup" && (
              <SignUp onNavigate={handleNavigate} onSignUp={handleSignUp} />
            )}
            {currentView === "history" && (
              <History onNavigate={handleNavigate} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
