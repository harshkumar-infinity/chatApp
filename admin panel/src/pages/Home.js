import React, { useEffect, useState } from "react";
import Description from "../components/HomeComponents/Description";
import NavBar from "../components/HomeComponents/NavBar";
import LoadingPage from "./LoadingPage";
import Service from "./Service";

import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const cookie = localStorage.getItem("jwt");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/protect`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        navigate("/home/message", { replace: true });
      } else {
        setIsLoading(false);
      }
    };

    if (cookie) {
      checkIfLoggedIn();
    } else {
      setIsLoading(false);
    }
  }, [navigate, cookie]);

  return (
    <div>
      {isLoading && <LoadingPage></LoadingPage>}
      {!isLoading && (
        <>
          <div className="h-[100vh] px-40 py-5 max-[885px]:px-20 max-[653px]:px-14 bg-[#012478]">
            <NavBar />
            <Description></Description>
          </div>
          <Service></Service>
        </>
      )}
    </div>
  );
}
