import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";
import SessionProvider from "./SessionProvider";
import AuthorizationRequired from "./AuthorizationRequired";

// A function component that wrap the entire application to offer all needed
// global providers
const Providers: React.FC<PropsWithChildren> = async ({ children }) => {

    const session = await getServerSession();

    return (
        <SessionProvider session={session}>
            <AuthorizationRequired>
                {children}
            </AuthorizationRequired>
        </SessionProvider >
    );
}

export default Providers;