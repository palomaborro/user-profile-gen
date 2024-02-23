import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";
import SessionProvider from "./SessionProvider";

// A function component that wrap the entire application to offer all needed
// global providers
const Providers: React.FC<PropsWithChildren> = async ({ children }) => {

    const session = await getServerSession();

    return (
        <SessionProvider session={session} >
            {session && children}
        </SessionProvider>
    );
}

export default Providers;