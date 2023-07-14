import React, { useState } from "react";
import "./HomePage.css";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from "react-icons/bs";
import ChatCard from "./ChatCard/ChatCard";
import MessageCard from "./MessageCard/MessageCard";
import Profile from "./ProfileNew/Profile";
import { useNavigate } from "react-router-dom";
import {Menu , MenuItem } from "@mui/material";
import CreateGroup from "./CreateGroup/CreateGroup";



const HomePage = () => {
  const navigate = useNavigate();
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const[content,setContent] = useState("");
  const[isProfile , setIsProfile] = useState(false);
  const [anchorE1 , setAncchorE1] = useState(null);
  const open = Boolean(anchorE1);
  const [isGroup , setIsGroup] = useState(false)
  const handleClick = (e)=> {
    setAncchorE1(e.currentTarget);
  }
  const handleClose = ()=> {
    setAncchorE1(null);
  }
  const handleClickOnChatCard = () => [setCurrentChat(true)];
  const handleSearch = () => {};
  const handleCreateNewMessage = () => {};
  const handleNavigate = () => {setIsProfile(true)};
  const handleOpenCloseProfile = ()=> {
    setIsProfile(false)
  }
  const handleCreteGroup = ()=> {
    setIsGroup(true);
  }
  function handleNavigateStatus() {
    navigate("/status");
  }
  return (
    <div className="relative">
      <div className="w-full py-14 bg-[#00a884]"></div>
      <div className="flex bg-[@fof2f5] h-[95vh] w-[96vw] absolute top-[5vh] left-[2vw]">
        <div className="left w-[30%] bg-[#e8e9ec] h-full">
          {/* profile */}
          {isGroup && <CreateGroup/>}
          {isProfile && <div className="w-full h-full"><Profile handleOpenCloseProfile={handleOpenCloseProfile}/></div>}
           {/* home */}
          {!isProfile && !isGroup && <div className="w-full">
            <div className="flex justify-between items-center p-3">
              <div onClick={handleNavigate} className="flex items-center space-x-3">
                <img
                  className="rounded-full w-10 h-10 cursor-pointer"
                  src="https://cdn.pixabay.com/photo/2023/06/21/09/52/pied-flycatcher-8078925_1280.jpg"
                  alt=""
                />
                <p>username</p>
              </div>
              <div className="space-x-3 text-2xl flex">
                <TbCircleDashed className="cursor-pointer" onClick={handleNavigateStatus}/>
                <BiCommentDetail />
                <div>
                <BsThreeDotsVertical  id = "basic-button"
                aria-controls={open ? 'basic-menu':undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                />
                <Menu id="basic-menu"
                anchorE1={anchorE1}
                open={open}
                onClose={handleClose}
                MenuListProps = {{
                  'aria-labelledby':'basic-button',
                }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleCreteGroup}>Create Group</MenuItem>
                  <MenuItem onClick={handleClose}>logout</MenuItem>
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
                [1, 1, 1, 1, 1].map((item) => (
                  <div onClick={handleClickOnChatCard}>
                    {" "}
                    <hr /> <ChatCard />{" "}
                  </div>
                ))}
            </div>
          </div>}
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
                    src="https://cdn.pixabay.com/photo/2022/12/30/17/10/monstera-7687340_1280.jpg"
                    alt=""
                  />
                  <p>username</p>
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
                {[1,1,1,1,1,1,1,1].map((item,i)=><MessageCard isReqUserMessage={i%2===0} content={"kousik"}/>)}
              </div>
            </div>
            {/* fotter part */}
            <div className="footer bg-[#fof2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center  px-5 relative">
                <BsEmojiSmile className="cursor-pointer"/>
                <ImAttachment/>
              <input className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
               type="text" 
               onChange={(e)=> setContent(e.target.value)}
               placeholder="Type Message"
               value={content}
               onKeyPress={(e)=>{
                if(e.key=="Enter") {
                  handleCreateNewMessage();
                  setContent("");
                }
               }}
               />
               <BsMicFill/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
