import { BASE_API_URL } from "../../Config/Api";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

export const createMessage = (messageData)=>async(dispatch)=> {
    
    try {
        const res=await fetch(`${BASE_API_URL}/api/v1/send/message?jwt=${messageData.jwt}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
             body: JSON.stringify(messageData.data),
        })
        const resData = await res.json();
        console.log("ctrate message",resData)
        dispatch({type:CREATE_NEW_MESSAGE,payload:resData});
    } catch (error) {
        alert("CREATE message error",error);
    }
}

export const getAllMessages = (messageData)=>async(dispatch)=> {
    try {
        console.log("kousik");
        const res=await fetch(`${BASE_API_URL}/api/v1/All/chat?chatId=${messageData.chatId}&jwt=${messageData.jwt}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        })
        const resData = await res.json();
        console.log("all message",resData)
        dispatch({type:GET_ALL_MESSAGE,payload:resData});
    } catch (error) {
        alert("create group chat error ",error);
    }
}
