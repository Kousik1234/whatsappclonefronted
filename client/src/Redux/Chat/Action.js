import { BASE_API_URL } from "../../Config/Api";
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";

export const createChat = (jwt,recUserId)=>async(dispatch)=> {
    try {
        const res=await fetch(`${BASE_API_URL}/api/v1/create/chat?jwt=${jwt}&recUserId=${recUserId}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            // body: JSON.stringify(data),
        })
        const resData = await res.json();
        console.log("ctrate chat",resData)
        dispatch({type:CREATE_CHAT,payload:resData});
    } catch (error) {
        alert("CREATE CHAT error",error);
    }
}

export const createGroupChat = (groupData)=>async(dispatch)=> {
    try {
        console.log("kousik");
        const res=await fetch(`${BASE_API_URL}/api/v1/create/group?jwt=${groupData.jwt}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(groupData.jwt),
        })
        const resData = await res.json();
        console.log("register",resData)
        dispatch({type:CREATE_GROUP,payload:resData});
    } catch (error) {
        alert("create group chat error ",error);
    }
}



export const getUsersChat = (jwt)=>async(dispatch)=> {
    try {
        const res=await fetch(`${BASE_API_URL}/api/v1/allChat/user?jwt=${jwt}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        })
        const resData = await res.json();
        console.log("User chat",resData)
        dispatch({type:GET_USERS_CHAT,payload:resData});
    } catch (error) {
        alert(" get user chat error ",error);
    }
}

