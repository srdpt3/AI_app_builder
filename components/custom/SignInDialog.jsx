import React, { useContext } from "react";
import lookup from "@/data/lookup";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvexClient } from "convex/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const SignInDialog = ({ openDialog, closeDialog }) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  // const db = useConvexClient();
  const createUser = useMutation(api.users.createUser);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } },
      );

      const user = userInfo?.data;
      await createUser({
        name: user.name,
        email: user.email,
        image: user.picture,
        authId: uuidv4(),
      });
      console.log("userInfo?.data " + userInfo?.data);

      setUserDetail(userInfo?.data);

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userInfo?.data));
      }
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
          <DialogDescription className="text-sm text-muted-foreground">
            Sign in to your account
          </DialogDescription>
          <span className="text-sm text-gray-500">
            Sign in to access your account and continue your work
          </span>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
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
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
