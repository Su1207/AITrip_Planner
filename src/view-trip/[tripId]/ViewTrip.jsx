import { db } from "@/service/Firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSextion from "../components/InfoSextion";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "AiTrip", tripId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      setTrip(docSnapshot.data());
    } else {
      toast("No Such Trip Data");
    }
  };

  //   console.log(trip?.userSelection?.location?.label);

  return (
    <div className=" p-5 sm:p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSextion trip={trip} />

      {/* Hotels Options */}
      <Hotels trip={trip} />

      {/* Itinerary */}
      <PlacesToVisit trip={trip} />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default ViewTrip;
