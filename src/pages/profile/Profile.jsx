import React from "react";
import { useUserDetail } from "../hooks/useUserDetail";

const Profile = () => {
  const { decode } = useUserDetail();
  console.log(decode);
  return (
    <div className="flex items-center gap-3 mt-4 md:mt-0">
      <div className="text-right">
        <p className="text-sm font-medium text-gray-700">
          {decode &&
            decode[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ]}
        </p>
        <p className="text-xs text-gray-500">
          {decode &&
            decode[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ]}
        </p>
      </div>
      <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold">
        A
      </div>
    </div>
  );
};

export default Profile;