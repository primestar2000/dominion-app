import { supabase } from "@/utils/lib/superbase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useSession = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const getSession = async() => {
            try {
                const { data, error } = await supabase.auth.getSession();
                
                if (error) {
                    console.error("Session error:", error);
                    return;
                }
                
                setSession(data.session);
            } catch (error) {
                console.error("Unexpected error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        getSession();
        
        // Set up auth state change listener
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );
        
        // Clean up subscription on unmount
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []); // Empty dependency array - only run once on mount

    return { session, isLoading };
};

export default useSession;