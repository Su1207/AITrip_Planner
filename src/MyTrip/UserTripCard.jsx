import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserTripCard = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    trip && getPhoto();
  }, [trip]);

  const getPhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    const result = await GetPlaceDetails(data).then((res) => {
      //   console.log(res.data.places[0].photos[2].name);

      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[2].name
      );

      setPhotoUrl(photoURL);
    });
  };

  return (
    <div
      className=" cursor-pointer"
      onClick={() => navigate(`/view-trip/${trip?.id}`)}
    >
      <img
        src={trip ? photoUrl : "/placeholder.jpeg"}
        alt=""
        className=" rounded-xl object-cover h-[220px] w-full hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
      />
      <div>
        <h2 className=" font-medium">{trip?.userSelection?.location?.label}</h2>
        <h2 className=" text-sm text-gray-500">
          {trip?.userSelection?.noOfDays} days trip with{" "}
          {trip?.userSelection?.budget} budget
        </h2>
      </div>
    </div>
  );
};

export default UserTripCard;
