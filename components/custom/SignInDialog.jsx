import React, { useContext } from "react";
import lookup from "@/data/lookup";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const SignInDialog = ({ openDialog, closeDialog }) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } },
      );

      console.log(userInfo);
      setUserDetail(userInfo?.data);

      //save this inside out database
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Sign In Required
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-2">
              <span className="mt-2 text-sm text-gray-500">
                Please sign in to continue using our services
              </span>
              <Button
                onClick={() => googleLogin()}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Sign in with Google
              </Button>
              <p className="text-sm text-gray-500">
                {lookup.SIGNIn_AGREEMENT_TEXT}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
