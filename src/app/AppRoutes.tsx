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
      {/* …etc */}
    </Routes>
  );
}

