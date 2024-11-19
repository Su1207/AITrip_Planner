import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  AI_PROMPT,
  selectBudget,
  selectTravellerList,
} from "../constants/option";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { chatSession } from "../service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/Firebase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
        onGenerateTrip();
      });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all the details");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    setLoading(false);
    SaveAiTrip(result.response.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrip", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  return (
    <div className=" px-5 sm:px-10 md:px-32 lg:px-48 xl:px-60 my-10">
      <h2 className=" text-3xl font-bold">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className=" text-lg mt-3 text-gray-500">
        Just provide some basic informations, and our trip planner generate a
        customized itinerary based on your preferences.
      </p>

      <div className=" mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-lg font-medium my-3">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-lg font-medium my-3">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-lg font-medium my-3">What is Your Budget?</h2>
          <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {selectBudget.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 flex flex-col items-center sm:items-start transition-all duration-300 ease-in-out border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.budget === item.title
                    ? "border-black shadow-lg"
                    : ""
                }`}
              >
                <h2 className=" text-[2.5rem]">{item.icon}</h2>
                <h2 className=" font-bold text-lg">{item.title}</h2>
                <h2 className=" text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium my-3">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {selectTravellerList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 flex flex-col items-center sm:items-start transition-all duration-300 ease-in-out border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.traveler === item.people
                    ? "border-black shadow-lg"
                    : ""
                }`}
              >
                <h2 className=" text-[2.5rem]">{item.icon}</h2>
                <h2 className=" font-bold text-lg">{item.title}</h2>
                <h2 className=" text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center sm:justify-end mt-5">
          <Button disabled={loading} onClick={onGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

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
    </div>
  );
};

export default CreateTrip;
