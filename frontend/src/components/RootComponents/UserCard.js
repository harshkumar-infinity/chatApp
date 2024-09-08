import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FlustAllChats,
  NullifyActiveChat,
} from "../../services/Actions/Chat/action";
export default function UserCard() {
  const dispatch = useDispatch();
  const dataredux = useSelector((state) => state.user.userInfo);

  const Obj = JSON.parse(localStorage.getItem("info"));
  const [Name, setName] = useState(Obj.name);
  const [Pic, setPic] = useState(Obj.pic);

  useEffect(() => {
    if (dataredux === null) return;

    setName(dataredux.name);
    setPic(dataredux.pic);
  }, [dataredux]);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    const cookie = localStorage.getItem("jwt");

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/users/logout`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: null,
      }
    );

    const responseData = await response.json();

    if (responseData.status !== "fail") {
      localStorage.removeItem("jwt");
      localStorage.removeItem("info");
      navigate("/", { replace: true });
      dispatch(NullifyActiveChat());
      dispatch(FlustAllChats());
    }
  };

  let image = Pic;
  if (Pic.startsWith("user")) image = `${process.env.REACT_APP_API_URL}/${Pic}`;

  return (
    <div className="flex flex-row  items-center ml-[10%] max-[1024px]:hidden">
      <Avatar
        referrerPolicy="no-referrer"
        alt="User-pic"
        sx={{ width: 48, height: 48 }}
        src={image}
      />
      <div className="flex flex-col ml-2">
        <div className="max-[1250px]:text-[12px] font-bold font-Roboto text-sm">
          {Name}
        </div>
        <div
          onClick={logoutHandler}
          className="max-[1250px]:text-[10px] text-xs cursor-pointer text-[#979797]"
        >
          Logout
        </div>
      </div>
    </div>
  );
}
