import React, { useEffect, useState } from "react";
import { MotionAnimate } from "react-motion-animate";
import { useDispatch, useSelector } from "react-redux";
import BasicModal from "../components/ChatComponents/BasicModel";
import ChatBar from "../components/ChatComponents/ChatBar";
import ChatDetails from "../components/ChatComponents/ChatDetails";
import ChatMessages from "../components/ChatComponents/ChatMessages";
import ChatTitle from "../components/ChatComponents/ChatTitle";
import TopBar from "../components/ChatComponents/TopBar";
import Type from "../components/ChatComponents/Type";
import {
  InitializeChat,
  NullifyActiveChat,
  removeChat,
  SetActiveChat,
} from "../services/Actions/Chat/action";
import { socket } from "../socket/socket";
import Loading from "./util/Loading";
import NoChats from "./util/NoChats";
export default function HomeChat() {
  const state = useSelector((state) => state.chat.AllChats);
  const dispatch = useDispatch();
  const [chatModel, setChatModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [requestSent, setRequestSent] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const chatfn = (chatid) => {
      console.log("REmove the chatbar for the id", chatid);
      dispatch(removeChat(chatid));
      dispatch(NullifyActiveChat());
    };

    socket.on("removechatbar-recieve", chatfn);
    return () => {
      socket.off("removechatbar", chatfn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getAllChats = async () => {
      setIsLoading(true);
      setRequestSent(true);
      const cookie = localStorage.getItem("jwt");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/chat`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      const data = await response.json();
      if (data.data.length === 0) setIsEmpty(true);

      setIsLoading(false);
      dispatch(InitializeChat(data.data));
    };
    if (state.length > 0) {
      return;
    }
    getAllChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const selectChat = (data) => {
    // eslint-disable-next-line no-unused-vars
    const isPresent = data.hasOwnProperty("notify");
    dispatch(SetActiveChat(data));
  };

  const createGroupChat = () => {
    handleOpen();
  };

  const openChatDetails = () => {
    setChatModel(true);
  };
  const closeChatDetails = () => {
    setChatModel(false);
  };

  console.log("This is chat state", state);

  return (
    <div className="grid max-[1250px]:w-[82vw] max-[1024px]:w-[92vw] max-[1250px]:grid-cols-[4.5fr,7fr] max-[900px]:grid-cols-[5.5fr,7fr]  w-[80vw] relative grid-rows-[1fr,7fr] grid-cols-[3.5fr,7fr] ">
      <BasicModal handleClose={handleClose} open={open}></BasicModal>
      <ChatDetails
        closeChat={closeChatDetails}
        chatModel={chatModel}
      ></ChatDetails>
      <TopBar createGroup={createGroupChat}></TopBar>
      <div className="flex flex-row items-center  border-[1px] border-[#f5f5f5]">
        <ChatTitle openChatModel={openChatDetails}></ChatTitle>
      </div>
      <div className=" border-[1px] overflow-y-scroll no-scrollbar border-[#f5f5f5]">
        {isLoading && <Loading></Loading>}
        {!isLoading &&
          state &&
          state.map((data, index) => {
            return (
              <MotionAnimate key={index} animation="fadeInUp">
                <ChatBar select={selectChat} data={data}></ChatBar>
              </MotionAnimate>
            );
          })}
        {isEmpty === true && state.length === 0 && <NoChats></NoChats>}
      </div>
      <div className="bg-[#F6F8FC] flex flex-col relative overflow-hidden">
        <ChatMessages></ChatMessages>
        <Type></Type>
      </div>
    </div>
  );
}
