import { db } from "@/service/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCard from "./UserTripCard";

const MyTrip = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
    }

    const q = query(
      collection(db, "AiTrip"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    setUserTrips([]);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.data());
      setUserTrips((prevData) => [...prevData, doc.data()]);
    });
  };

  return (
    <div className=" px-5 sm:px-10 md:px-32 lg:px-48 xl:px-60 my-10">
      <h2 className=" text-3xl font-bold">My Trips</h2>
      <div className=" grid sm:grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {userTrips.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCard trip={trip} key={index} />
            ))
          : [1, 2, 3, 4, 5, 6].map((data, index) => (
              <div
                key={index}
                className=" h-[250px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default MyTrip;
