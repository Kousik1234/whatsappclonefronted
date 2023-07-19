import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/Auth/Action";

const Profile = ({handleOpenCloseProfile}) => {
  const [flag,setFlag] = useState(false);
  const [username , setUsername] = useState();
  const [tempPicture , setTempPicture] = useState();
  const dispatch = useDispatch();
  const {auth} = useSelector((store) => store)

  const handleFlag = ()=> {
    setFlag(true);
  }
  const handleCheckClick = ()=> {
    setFlag(false);
    const data1 = {
      token:localStorage.getItem("token"),
      data: {id:auth.reqUser.id,fullname:username}
    }
    dispatch(updateUser(data1))
  }
  const handleSetUsername = (e)=> {
    setUsername(e.target.value);
  }

  const handleUpdateName =(e)=> {
    const data1 = {
       token:localStorage.getItem("token"),
       data: {id:auth.reqUser.id,fullname:username}
     }
    if(e.target.key==="Enter") {
      dispatch(updateUser(data1))
    }
  }

  const uploadToCloudnary = (pics)=> {
    const data = new FormData();
    data.append("file",pics);
    data.append("upload_preset","whatsapp");
    data.append("cloud_name","dpzgjso8w");
    fetch("https://api.cloudinary.com/v1_1/dpzgjso8w/image/upload",{
      method:"post",
      body:data,
    })
    .then((res)=>res.json())
    .then((data)=>{
      setTempPicture(data.url.toString());
      console.log("imgurl" , data.url.toString());
      const data1 = {
       // id: auth.reqUser.id,
        token:localStorage.getItem("token"),
        data: {id:auth.reqUser.id,profile_picture:data.url.toString()}
      }
      dispatch(updateUser(data1));
    })
  }
  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={handleOpenCloseProfile}
        />
        <p className="cursor-pointer font-semibold">profile</p>
      </div>
      {/* update profile pic section section */}
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img
            className="rounded-full w-[15vw] h-[15vw] cursor-pointer"
            src={auth.reqUser?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt=""
          />
        </label>
        <input onChange={(e)=>uploadToCloudnary(e.target.files[0])} type="file" id="imgInput" className="hidden" />
      </div>
      {/* name section */}
      <div className="bg-white px-3">
        <p className="py-3"> Your Name </p>
        {!flag && <div className="w-fll flex justify-between items-center">
          <p className="py-3">{username || "Username"}</p>
          <BsPencil onClick={handleFlag} className="cursor-pointer" />
        </div> }

{
  flag && <div className="w-fll flex justify-between items-center py-2">
    <input onKeyPress={handleUpdateName} onChange={handleSetUsername} className="w-[80%] outline-none border-b-2 border-blue-700 p-2" type="text" placeholder="Enter Your Name"/>
    <BsCheck2 onClick={handleCheckClick} className="cursor-pointer text-2xl"/>
  </div>
}

      </div>
      <div className="px-3 my-5">
        <p className="py-10">this is not your username , this name will be visible to your whatsapp contents.</p>
      </div>
    </div>
  );
};

export default Profile;
