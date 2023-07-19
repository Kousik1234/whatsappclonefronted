import { json } from "react-router-dom"
import {BASE_API_URL} from "../../Config/Api"
import { LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";
export const register = (data)=>async(dispatch)=> {
    console.log(data);
    try {
        const res=await fetch(`http://localhost:8080/api/v1/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data),
        })
        const resData = await res.json();
        if(resData.jwt) localStorage.setItem('token',resData.jwt)
        console.log("register",resData)
        dispatch({type:REGISTER,payload:resData});
    } catch (error) {
        alert("error",error);
    }
}

export const login = (data)=>async(dispatch)=> {
    try {
        console.log("kousik");
        const res=await fetch(`${BASE_API_URL}/api/v1/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data),
        })
        const resData = await res.json();
        if(resData.jwt) localStorage.setItem('token',resData.jwt)
        console.log("register",resData)
        dispatch({type:LOGIN,payload:resData});
    } catch (error) {
        alert(" login error ",error);
    }
}



export const currentUser = (jwt)=>async(dispatch)=> {
    try {
        const res=await fetch(`${BASE_API_URL}/api/v1/user/profile?jwt=${jwt}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        })
        const resData = await res.json();
        console.log("current User",resData)
        dispatch({type:REQ_USER,payload:resData});
    } catch (error) {
        alert(" current user error ",error);
    }
}


export const searchUser = (emailOrname)=>async(dispatch)=> {
    try {
        const res=await fetch(`${BASE_API_URL}/api/v1/search/user?emailOrname=${emailOrname}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
           // body:json.stringfy(emailOrphone)
        })
        const resData = await res.json();
        console.log("search user",resData)
        dispatch({type:SEARCH_USER,payload:resData});
    } catch (error) {
        alert("error ",error);
    }
}


export const updateUser = (data1) => async (dispatch) => {
    try {
      const res = await fetch(`${BASE_API_URL}/api/v1/update/user?jwt=${data1.token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data1.data),
      });
      const resData = await res.json();
      console.log("register", resData);
      dispatch({ type: UPDATE_USER, payload: resData });
    } catch (error) {
      alert("update user error ", error);
    }
  };

  export const logOutAction = ()=>async(dispatch)=> {
        localStorage.removeItem("token");
        dispatch({type:LOGOUT,payload:null})
        dispatch({type:REQ_USER,payload:null})
  }
  