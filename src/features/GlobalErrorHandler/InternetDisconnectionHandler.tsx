import { useNetworkStatus, useToast } from "@/hooks";
import { useEffect, useState } from "react";

const InternetDisconnectionHandler: React.FC = () => {
  const [toastId, setToastId] = useState("");

  const { toast, dismiss } = useToast();
  const isOnline = useNetworkStatus();

  useEffect(() => {
    if (!isOnline) {
      const toastId = toast({
        title: "No Internet Connection",
        description: "Please check your internet connection",
      }).id;

      setToastId(toastId);
    }
    if (isOnline && toastId) {
      dismiss(toastId);
    }
  }, [isOnline, toast, dismiss, toastId]);

  return null;
};

export { InternetDisconnectionHandler };
