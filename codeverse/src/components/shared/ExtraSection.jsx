import React from "react";
import AccountSuggestion from "../subshare/AccountSuggestion";
import LatestNotifications from "../subshare/LatestNotifications";

const ExtraSection = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <AccountSuggestion />
      <LatestNotifications />
    </div>
  );
};

export default ExtraSection;
