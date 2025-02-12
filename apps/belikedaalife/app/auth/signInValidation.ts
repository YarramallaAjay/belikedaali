import axios from "axios";
import { BACKEND_URL } from "../config";
import { headers } from "next/headers";

// Validate Signin Function (without the `useRouter` hook)
export async function validateSignIn(email: string, password: string) {
  try {
    const token=localStorage.getItem("belikedaaliusertoken")
    console.log(token)
    const response = await axios.post(`${BACKEND_URL}/signin`, {
        data: {
            email: email,
            password: password,
          },

        withCredentials:true
      
    });

    if (response.status === 200) {
        return response.status;
      // If signin is successful, store token and return the response
    }
    return 

  } catch (error) {
    console.error("Signin failed:", error);
    return null;
  }
}

// Validate Signup Function (without the `useRouter` hook)
export async function validateSignup(username: string, password: string, email: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}/signup`, {
      username,
      password,
      email,
    });

    if (response.status === 200||201) {
      // If signup is successful, store the token
      const token = response.data.token;
      localStorage.setItem('belikedaaliusertoken',"Bearer " + token);
    }
    return response;

  } catch (error) {
    console.error("Signup failed:", error);
    return null;
  }
}
