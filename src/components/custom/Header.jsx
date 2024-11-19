import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeRes) => GetUserProfile(codeRes),
    onError: (err) => console.log(err),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className=" p-3 flex items-center justify-between px-5 shadow-sm">
      <Link to={"/"}>
        <img src="/logo.svg" alt="" className="h-6 sm:h-8 cursor-pointer" />
      </Link>
      {user ? (
        <div className=" flex items-center gap-2 sm:gap-3">
          <Button
            onClick={() => navigate("/create-trip")}
            variant="outline"
            className="rounded-full xs:block hidden sm:text-base text-sm"
          >
            Create Trip
          </Button>

          <Button
            onClick={() => navigate("/myTrip")}
            variant="outline"
            className="rounded-full xs:block hidden sm:text-base text-sm"
          >
            My Trips
          </Button>

          <Popover>
            <PopoverTrigger>
              <img
                src={user ? user.picture : "/logo.svg"}
                alt=""
                className=" rounded-full h-8 cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent>
              <div className=" flex flex-col gap-2">
                <h2
                  className=" cursor-pointer xs:hidden"
                  onClick={() => navigate("/create-trip")}
                >
                  Create Trip
                </h2>
                <h2
                  className=" cursor-pointer xs:hidden"
                  onClick={() => navigate("/myTrip")}
                >
                  My Trips
                </h2>
                <h2 className=" cursor-pointer" onClick={handleLogout}>
                  Logout
                </h2>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
      )}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" />
              <h2 className=" font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in to the app using Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex items-center gap-2"
              >
                <FcGoogle className=" h-7 w-7" /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
