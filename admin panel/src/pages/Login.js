import React from "react";
import { redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "../components/LoginComponents/Main";

const notify = (message) => {
  return toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export default function Login() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Main></Main>
    </>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const authdata = {
    email: data.get("email"),
    password: data.get("password"),
    pic: data.get("pic"),
  };

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/admin/login`,
    {
      method: request.method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(authdata),
    }
  );

  const responseData = await response.json();

  if (responseData.status === "fail") {
    notify("Something went wrong");
    return null;
  }

  localStorage.setItem("jwt", responseData.token);
  return redirect("/home");
}
