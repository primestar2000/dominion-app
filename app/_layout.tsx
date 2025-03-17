import LoaderComponent from "@/components/loaderComponent";
import { AuthProvider, useAuth } from "@/context/auth-context";
import useOnBoarded from "@/hooks/useOnboarded";
import { Slot, Redirect } from "expo-router";
import React, { useEffect, useState } from "react";

const RootLayout = () => {
  // const { isAuthenticated } = useAuth();
  // const { isOnboarded } = useOnBoarded();
  const [isLoading, setIsLoading] = useState(true);

useEffect(()=>{
  setIsLoading(false);
},[])

if (isLoading) {
  return <LoaderComponent isLoading={true} />
}
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;
