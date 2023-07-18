import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, register } from "../../Redux/Auth/Action";

const SignUp = () => {
    const [inputData, setInputData] = useState({fullname:"",email:"",password:""});
    const navigate = useNavigate();
    const{auth} = useSelector(store=>store);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const [openSnackbar , setOpenSnackbar] = useState(false);
    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(register(inputData))
      setOpenSnackbar(true)
      console.log("submit",inputData);
    };
    const handleSnackbarClose = ()=>{
      setOpenSnackbar(false)
    }
    const handleChange = (e, name) => {
      const { value } = e.target;
      setInputData((values) => ({ ...values,[name]:value }));
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
                <p className="mb-2">Fullname</p>
                <input
                  placeholder="Enter Your Fullname"
                  onChange={(e) => handleChange(e, 'fullname')}
                  value={inputData.fullname}
                  type="text"
                  className="py-2 outline outline-green-600 w-full rounded-md border"
                />
              </div>
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
               <Button type="submit" sx={{bgcolor:green[700],padding:".5rem 0rem"}} className="w-full" variant="contained">Sign Up</Button>
              </div>
            </form>
            <div className="flex space-x-3 items-center mt-5">
              <p className="m-0">Already Have Account</p>
              <Button variant="text" onClick={()=>navigate("/signin")}>SignIn</Button>
            </div>
          </div>
        </div>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity="success" sx={{width:'100%'}}>
     Your Account Succesfully Created!
      </Alert>
        </Snackbar>
      </div>
    );
}

export default SignUp
