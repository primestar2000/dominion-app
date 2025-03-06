import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useOnBoarded = () => {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);

  useEffect(() => {
    const getOnBoardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("is-onboarded");
        setIsOnboarded(status === "true"); // Convert to boolean
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
        setIsOnboarded(false); // Fallback to `false`
      }
    };

    getOnBoardingStatus();
  }, []);

  useEffect(()=>{
    console.log(`onboarding status`, isOnboarded);
  },[isOnboarded])

  // Update AsyncStorage when `setIsOnboarded` is called
  const updateOnBoardingStatus = async (status: boolean) => {
    try {
      await AsyncStorage.setItem("is-onboarded", String(status));
      setIsOnboarded(status);
    } catch (error) {
      console.error("Error updating onboarding status:", error);
    }
  };

  return { isOnboarded, setIsOnboarded: updateOnBoardingStatus };
};

export default useOnBoarded;
