import React from "react";
import { Routes, Route } from "react-router-dom";
import ShellLayout from "@/common/components/ShellLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import Dashboard from "@/features/dashboard/pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ShellLayout>
            <LoginPage />
          </ShellLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ShellLayout>
            <Dashboard />
          </ShellLayout>
        }
      />
      {/* Catch-all so you see something rather than a blank: */}
      <Route
        path="*"
        element={
          <ShellLayout>
            <div className="text-center p-4">404 — page not found</div>
          </ShellLayout>
        }
      />
    </Routes>
  );
}

