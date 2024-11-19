import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && getPhoto();
  }, [hotel]);

  const getPhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName} ${hotel?.hotelAddress}`}
        target="_blank"
      >
        <div className=" hover:scale-110 transition-all ease-in-out duration-300">
          {photoUrl ? (
            <img
              src={hotel ? photoUrl : "/placeholder.jpeg"}
              alt=""
              className=" rounded-xl h-[180px] w-full object-cover"
            />
          ) : (
            <div className="rounded-xl h-[180px] w-full bg-slate-200"></div>
          )}
          <div className=" my-2 flex flex-col gap-2">
            <h2 className=" font-medium">{hotel?.hotelName}</h2>
            <p className=" text-xs text-gray-500">📍 {hotel?.hotelAddress}</p>
            <h2 className=" text-sm">💰 {hotel?.price}</h2>
            <h2 className=" text-sm">⭐ {hotel?.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;
