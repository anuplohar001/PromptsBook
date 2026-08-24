"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Loader from "./Loader";

const AutoLogin = ({ children }) => {
    const { status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn("credentials", {
                email: "dummy123@gmail.com",
                password: "1234",
                callbackUrl: "/",
            });
        }
    }, [status]);

    if (status === "loading" || status === "unauthenticated") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader/>
            </div>
        );
    }

    return children;
};

export default AutoLogin;