import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SelectedMember = ({ handleRemoveMember, member }) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full">
      <img
        className="w-7 h-7 rounded-full"
        src="https://media.istockphoto.com/id/1337232523/photo/high-angle-view-of-a-lake-and-forest.jpg?s=1024x1024&w=is&k=20&c=EPh5_6vL4mywUc3AfLRKJCChgAs41oI9nMveOInep_0="
        alt=""
      />
      <p className="px-2">
           username
      </p>
      <AiOutlineClose
      onClick={handleRemoveMember}
      className="pr-1 cursor-pointer"
      />
    </div>
  );
};

export default SelectedMember;
