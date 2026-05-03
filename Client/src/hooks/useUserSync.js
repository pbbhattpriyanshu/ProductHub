import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { syncUser } from "../lib/api";

// the best way to implement this is by using webhooks
function useUserSync() {
    const { isSignedIn } = useAuth();
    const { user } = useUser();

    const [lastSyncedId, setLastSyncedId] = useState(null);
    const { mutate: syncUserMutation, isPending, isError } = useMutation({ 
        mutationFn: syncUser,
        onSuccess: () => setLastSyncedId(user?.id)
    });

    useEffect(() => {
        if (!isSignedIn) {
            setLastSyncedId(null);
        }
    }, [isSignedIn]);

    useEffect(() => {
        if (isSignedIn && user && !isPending && lastSyncedId !== user.id && !isError) {
            syncUserMutation({
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName || user.firstName,
                imageUrl: user.imageUrl,
            });
        }
    }, [isSignedIn, user, syncUserMutation, isPending, lastSyncedId, isError]);

    return { isSynced: lastSyncedId === user?.id };
}

export default useUserSync;