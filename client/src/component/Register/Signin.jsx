import { Alert, Button, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, login } from "../../Redux/Auth/Action";

const Signin = () => {
  const [inputData, setInputData] = useState({email : "", password : ""});
  const navigate = useNavigate();
  const [openSnackbar , setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const{auth} = useSelector(store=>store);
  const token = localStorage.getItem("token");
  const handleNavigates = ()=> {
    navigate(`/signup`)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSnackbar(true)
    console.log("submit",inputData);
    dispatch(login(inputData))
  };
  const handleSnackbarClose = ()=>{
    setOpenSnackbar(false)
  }
  const handleChange = (e, name) => {
    const { value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };

  useEffect (()=>{
    if(token) dispatch(currentUser(token))
},[token])

useEffect(()=>{
if(auth.reqUser?.email) {
navigate("/")
}
},[auth.reqUser])
  
  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">Email</p>
              <input
                placeholder="Enter Your Email"
                onChange={(e) => handleChange(e, 'email')}
                value={inputData.email}
                type="text"
                className="py-2 outline outline-green-600 w-full rounded-md border"
              />
            </div>
            <div>
              <p className="mb-2">Password</p>
              <input
                placeholder="Enter Your Password"
                onChange={(e) => handleChange(e, 'password')}
                value={inputData.password}
                type="text"
                className="py-2 outline outline-green-600 w-full rounded-md border"
              />
            </div>
            <div>
             <Button type="submit" sx={{bgcolor:green[700],padding:".5rem 0rem"}} className="w-full" variant="contained">Sign In</Button>
            </div>
          </form>
          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0">Create New Account</p>
            <Button variant="text" onClick={handleNavigates}>SignUp</Button>
          </div>
        </div>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
    <Alert onClose={handleSnackbarClose} severity="success" sx={{width:'100%'}}>
   Sign In SuccesFully!
    </Alert>
      </Snackbar>
    </div>
  );
};

export default Signin;
