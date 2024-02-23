"use client"

import { signIn, useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import { LoginButton } from "./login-button";

// a component that if the user is not authenticated, call the signIn() from
// next-auth
const AuthorizationRequired: React.FC<PropsWithChildren> = ({ children }) => {
    const { status } = useSession();

    if (status === "unauthenticated") {
        return <LoginButton onClick={() => signIn()} />
    }

    return <>{children}</>
}

export default AuthorizationRequired