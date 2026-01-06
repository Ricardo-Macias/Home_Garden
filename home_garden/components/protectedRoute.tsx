import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { router } from "expo-router";
import React, { useEffect } from "react";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        if (!token) {
            router.replace("/login");
        }
    }, [token]);

    if (!token) return null; // mientras redirige

    return <>{children}</>;
}
