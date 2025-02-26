import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/VerifyToken";
import { JwtPayload } from "jwt-decode";
import { ReactNode } from "react";

import { Navigate } from "react-router-dom";

interface CustomJwtPayload extends JwtPayload {
  role?: string; // Add other necessary properties
}

type TProtectedRoute = {
  children: ReactNode;
  role: string | string[] | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  let user: CustomJwtPayload | null = null;

  if (token) {
    user = verifyToken(token); // Decode the token to get user info
  }

  const dispatch = useAppDispatch();

  if (
    role &&
    (!user?.role ||
      (Array.isArray(role) ? !role.includes(user.role) : user.role !== role))
  ) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
