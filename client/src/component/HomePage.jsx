import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import ChatCard from "./ChatCard/ChatCard";
import MessageCard from "./MessageCard/MessageCard";
import Profile from "./ProfileNew/Profile";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import CreateGroup from "./CreateGroup/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logOutAction, searchUser } from "../Redux/Auth/Action";
import { createChat, getUsersChat } from "../Redux/Chat/Action";
import { createMessage, getAllMessages } from "../Redux/Message/Action";

const HomePage = () => {
  const navigate = useNavigate();
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [anchorE1, setAncchorE1] = useState(null);
  const open = Boolean(anchorE1);
  const [isGroup, setIsGroup] = useState(false);
  const dispatch = useDispatch();
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const handleClick = (e) => {
    setAncchorE1(e.currentTarget);
  };
  const handleClose = () => {
    setAncchorE1(null);
  };

  const handleLogOut = () => {
    dispatch(logOutAction());
    navigate("/signup");
  };

  useEffect(() => {
    dispatch(currentUser(token));
  }, [token]);

  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signup");
    }
  }, [auth.reqUser]);

  useEffect(() => {
    dispatch(getUsersChat(token));
  }, [chat.createdChat, chat.createdGroup]);

  useEffect(()=> {
    if(currentChat?.id){
      dispatch(getAllMessages({chatId:currentChat.id,jwt:token}))
    }
  },[currentChat,message.newMessage])
  const handleClickOnChatCard = (userId) => {
    //setCurrentChat(true)
    dispatch(createChat(token, userId));
    setQuerys("");
  };
  const handleSearch = (emailOrname) => {
    dispatch(searchUser(emailOrname));
  };
  const handleCreateNewMessage = () => {
    dispatch(createMessage({jwt:token,data:{chatId:currentChat.id,content:content}}))
  };
  const handleNavigate = () => {
    setIsProfile(true);
  };
  const handleOpenCloseProfile = () => {
    setIsProfile(false);
  };
  const handleCreteGroup = () => {
    setIsGroup(true);
  };
  const handleCurrentChat = (item) => {
    setCurrentChat(item);
  };
  function handleNavigateStatus() {
    navigate("/status");
  }
  return (
    <div className="relative">
      <div className="w-full py-14 bg-[#00a884]"></div>
      <div className="flex bg-[@fof2f5] h-[95vh] w-[96vw] absolute top-[5vh] left-[2vw]">
        <div className="left w-[30%] bg-[#e8e9ec] h-full">
          {/* profile */}
          {isGroup && <CreateGroup />}
          {isProfile && (
            <div className="w-full h-full">
              <Profile handleOpenCloseProfile={handleOpenCloseProfile} />
            </div>
          )}
          {/* home */}
          {!isProfile && !isGroup && (
            <div className="w-full">
              <div className="flex justify-between items-center p-3">
                <div
                  onClick={handleNavigate}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer"
                    src="https://cdn.pixabay.com/photo/2023/06/21/09/52/pied-flycatcher-8078925_1280.jpg"
                    alt=""
                  />
                  <p>{auth.reqUser?.fullname}</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={handleNavigateStatus}
                  />
                  <BiCommentDetail />
                  <div>
                    <BsThreeDotsVertical
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />
                    <Menu
                      id="basic-menu"
                      anchorE1={anchorE1}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleCreteGroup}>
                        Create Group
                      </MenuItem>
                      <MenuItem onClick={handleLogOut}>logout</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-center items-center bg-white py-4 px-3">
                <input
                  className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                  type="text"
                  placeholder="Search Or Start New Chat"
                  onChange={(e) => {
                    setQuerys(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={querys}
                />
                <AiOutlineSearch className="left-5 top-7 absolute" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>
              {/* all user */}
              <div className="bg-white overflow-y-scroll h-[70vh] px-3">
                {querys &&
                  auth.serachUsers?.map((item) => (
                    <div onClick={() => handleClickOnChatCard(item.id)}>
                      {" "}
                      <hr />
                      <ChatCard
                        name={item.fullname}
                        userImage={
                          item.profile_picture ||
                          "https://cdn.pixabay.com/photo/2023/05/23/15/13/new-8012937_1280.jpg"
                        }
                      />
                    </div>
                  ))}

                {chat.chats.length > 0 &&
                  !querys &&
                  chat.chats?.map((item) => (
                    <div onClick={() => handleCurrentChat(item)}>
                      <hr />{" "}
                      {item.isGroup ? (
                        <ChatCard
                          name={item.chat_name}
                          userImage={
                            item.chat_image ||
                            "https://cdn.pixabay.com/photo/2023/05/23/15/13/new-8012937_1280.jpg"
                          }
                        />
                      ) : (
                        <ChatCard
                          isChat={true}
                          name={
                            auth.reqUser.id !==
                            (item.users && item.users[0]?.id)
                              ? item.users && item.users[0]?.fullname
                              : item.users && item.users[1]?.fullname
                          }
                          userImage={
                            auth.reqUser.id !== item.users && item.users[0]?.id
                              ? (item.users && item.users[0].profile_picture) ||
                                "https://cdn.pixabay.com/photo/2023/05/30/15/12/blue-butterfuly-8028888_1280.jpg"
                              : (item.users && item.users[1].profile_picture) ||
                                "https://cdn.pixabay.com/photo/2023/06/29/10/33/lion-8096155_1280.png"
                          }
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        {/* default whatsapp page  */}
        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center h-full">
            <div className="max-w-[70%] text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSACICh62CBAvsbuEUKROPtnsEyCbS1MIEug&usqp=CAU"
                alt=""
              />
              <h1 className="text-4xl text-grey-600">whatsapp web</h1>
              <p className="my-9">
                send and reveive message without keeping your phone online. use
                whatsapp on up to 4 Linked devices and 1 phone at the same time.
              </p>
            </div>
          </div>
        )}
        {/* right side message  */}

        {currentChat && (
          <div className="w-[70%] relative">
            <div className="header absolute top-0 w-full bg-[#fof2f5]">
              <div className="flex justify-between">
                <div className="py-3 space-x-4 flex items-center px-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      currentChat.isGroup
                        ? currentChat.chat.chat_image
                        : auth.reqUser.id !== currentChat.users &&
                          currentChat.users[0]?.id
                        ? (currentChat.users &&
                            currentChat.users[0].profile_picture) ||
                          "https://cdn.pixabay.com/photo/2023/05/30/15/12/blue-butterfuly-8028888_1280.jpg"
                        : (currentChat.users &&
                            currentChat.users[1].profile_picture) ||
                          "https://cdn.pixabay.com/photo/2023/06/29/10/33/lion-8096155_1280.png"
                    }
                    alt=""
                  />
                  <p>
                    {currentChat.isGroup
                      ? currentChat.chat_name
                      : auth.reqUser?.id === currentChat.users[0].id
                      ? currentChat.users[1].fullname
                      : currentChat.users[0].fullname}
                  </p>
                </div>
                <div className="py-3 flex space-x-4 items-center px-3">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>
            {/* message section */}
            <div className="px-13 py-2 h-[85vh] overflow-y-scroll bg-blue-200">
              <div className="space-y-1 flex flex-col justify-center border mt-20 py-2">
                {message.messages.length>0 && message.messages.map((item, i) => (
                  <MessageCard
                    isReqUserMessage={item.user.id!==auth.reqUser.id}
                    content={item.content}
                  />
                ))}
              </div>
            </div>
            {/* fotter part */}
            <div className="footer bg-[#fof2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center  px-5 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment />
                <input
                  className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type Message"
                  value={content}
                  onKeyPress={(e) => {
                    if (e.key == "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />
                <BsMicFill />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
