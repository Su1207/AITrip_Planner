import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlaceCardItems = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && getPhoto();
  }, [place]);

  const getPhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };

    const result = await GetPlaceDetails(data).then((res) => {
      console.log(res.data?.places[0]?.photos[2]?.name);

      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data?.places[0]?.photos[2]?.name
      );

      setPhotoUrl(photoURL);
    });
  };

  return (
    <div>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
        target="_blank"
      >
        <div className="border p-3 rounded-xl flex xs:flex-row flex-col gap-2 xs:gap-3 md:gap-5 min-h-[200px] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer">
          {photoUrl ? (
            <img
              src={place ? photoUrl : "/placeholder.jpeg"}
              alt=""
              className=" rounded-xl xs:w-[130px] h-[200px] xs:h-[150px] object-cover"
            />
          ) : (
            <div className=" rounded-xl xs:w-[130px] xs:h-[150px] bg-slate-200"></div>
          )}
          <div className=" flex flex-col gap-2">
            <h2 className=" font-bold text-xl">{place?.placeName}</h2>
            <p className=" text-sm text-gray-400">{place?.placeDetails}</p>
            <h2>🕙 {place?.timeToTravel}</h2>
            <h2>🎟️ {place?.ticketPricing}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaceCardItems;
