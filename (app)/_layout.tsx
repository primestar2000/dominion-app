import LoaderComponent from "@/components/loaderComponent";
import { useAuth } from "@/context/auth-context";
import useOnBoarded from "@/hooks/useOnboarded";
import { Redirect, router, Slot } from "expo-router"
import { useEffect } from "react";

const AppLayout = () => {
    const {isAuthenticated} = useAuth();
    const {isOnboarded} = useOnBoarded();

    return(
        <Slot/>
    )
}

export default AppLayout;