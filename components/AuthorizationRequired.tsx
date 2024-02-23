"use client"

import { signIn, useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

// a component that if the user is not authenticated, call the signIn() from
// next-auth
const AuthorizationRequired: React.FC<PropsWithChildren> = ({ children }) => {
    const { status } = useSession();

    if (status === "unauthenticated") {
        signIn();
        return null;
    }

    return <>{children}</>
}

export default AuthorizationRequired