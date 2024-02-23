"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export const LoginLogoutButton: React.FC = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <span>Signed in as {session.user?.name}</span>
                {" "}
                <button onClick={() => signOut()}>Sign out</button>
            </>);
    }

    return <button onClick={() => signIn()}>Sign in</button>;
};
