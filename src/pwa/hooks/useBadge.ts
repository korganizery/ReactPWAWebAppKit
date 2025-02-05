import { useEffect, useState } from "react";

const useBadge = () => {
  const [messageCount, setMessageCount] = useState(0);

  const handlBadgeCount = (count: number) => {
    setMessageCount(count);
  };
  useEffect(() => {
    // 强类型断言
    const navigatorTyped = navigator as Navigator & {
      setAppBadge?: (count: number) => Promise<void>;
      clearAppBadge?: () => Promise<void>;
    };

    if (navigatorTyped.setAppBadge) {
      navigatorTyped.setAppBadge(messageCount).catch((error) => {
        console.error("Failed to set app badge:", error);
      });
    } else if (navigatorTyped.clearAppBadge) {
      navigatorTyped.clearAppBadge().catch((error) => {
        console.error("Failed to clear app badge:", error);
      });
    }
  }, [messageCount]);

  return {
    messageCount,
    handlBadgeCount,
  };
};

export default useBadge;
