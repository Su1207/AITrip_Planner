import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPi";
import React, { useEffect, useState } from "react";

const InfoSextion = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

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
    <div>
      {photoUrl ? (
        <img
          src={trip ? photoUrl : "/placeholder.jpeg"}
          alt=""
          className=" h-[300px] w-full object-cover rounded-xl"
        />
      ) : (
        <div className=" h-[300px] w-full bg-slate-200 rounded-xl"></div>
      )}

      <div className=" my-5 flex flex-col gap-2">
        <h2 className=" font-bold text-2xl">
          {trip?.userSelection?.location?.label}
        </h2>
        <div className=" flex flex-wrap items-center gap-3">
          <h2 className=" p-1  px-3 bg-gray-600 text-gray-200 rounded-full text-xs md:text-base">
            ⌛ {trip?.userSelection?.noOfDays} Day
          </h2>
          <h2 className=" p-1  px-3 bg-gray-600 text-gray-200 rounded-full text-xs md:text-base">
            💰 {trip?.userSelection?.budget} Budget
          </h2>
          <h2 className=" p-1  px-3 bg-gray-600 text-gray-200 rounded-full text-xs md:text-base">
            🥂 No. of Traveler: {trip?.userSelection?.traveler}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InfoSextion;
