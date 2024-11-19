import React from "react";
import { Link } from "react-router-dom";
import PlaceCardItems from "./PlaceCardItems";

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className=" text-xl font-bold mt-8 mb-5">Places to Visit</h2>

      <div className=" ">
        {trip?.tripData?.itinerary?.map((places, index) => (
          <div className=" " key={index}>
            <h2 className=" text-lg font-medium mb-2">{places.day}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {places?.plan?.map((place, i) => (
                <div key={i} className="">
                  <h2 className=" text-orange-500 text-base font-medium mb-1">
                    {place.time}
                  </h2>
                  <PlaceCardItems place={place} />
                </div>
              ))}
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
