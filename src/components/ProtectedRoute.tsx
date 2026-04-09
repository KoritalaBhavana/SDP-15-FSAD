import { Navigate, useLocation } from "react-router-dom";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { AUTH_PATH, dashboardPathByRole } from "@/lib/routes";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn || !user) {
    return <Navigate to={`${AUTH_PATH}?mode=signin&redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={dashboardPathByRole[user.role]} replace />;
  }

  if (["host", "guide", "chef"].includes(user.role) && user.status?.toUpperCase() === "PENDING") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="max-w-md w-full bg-card border border-border rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Profile Under Review</h2>
          <p className="text-sm text-muted-foreground">
            Your account is pending admin approval. You can access your dashboard once your status becomes APPROVED.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
