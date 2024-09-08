import LockOpenIcon from "@mui/icons-material/LockOpen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { validate } from "react-email-validator";
import { useSubmit } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "./Input";
import Square from "./Square";
export default function Main() {
  const submit = useSubmit();
  const [loginData, setloginData] = useState({ email: "", password: "" });
  const [submitting, setSubmiting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function submitData(e, googleauth, information) {
    setSubmiting(true);
    setTimeout(() => {
      setSubmiting(false);
    }, 5000);
    if (googleauth) {
      const name = information.name;
      const pic = information.picture;

      submit({ ...googleauth, name, pic }, { method: "post" });
      return;
    }

    e.preventDefault();
    if (!loginData.email || !validate(loginData.email) || !loginData.password) {
      return toast.error("Please enter valid email and password", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    submit(loginData, { method: "post" });
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <div className="flex flex-col items-center h-[100vh] w-[100vw] relative overflow-hidden px-2">
      <Square></Square>
      <Square isRight={true}></Square>
      <Paper
        className="z-20 w-full max-w-[370px] p-[2rem] my-auto"
        elevation={3}
      >
        <div className="font-Poppins text-3xl font-extrabold flex items-center flex-col">
          <LockOpenIcon fontSize="large" color="primary" />
          <Typography variant="h5">Log In</Typography>
        </div>
        <br />
        <hr></hr>
        <form className="mt-6 relative">
          <Input
            onSetData={setloginData}
            name="email"
            text="Email ID"
            placeholder="Email address"
            type="text"
          ></Input>
          <div className="relative">
            <Input
              onSetData={setloginData}
              name="password"
              text="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              style={{
                position: "absolute",
                right: "10px",
                top: "70%",
                transform: "translateY(-50%)",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          <div className="flex flex-row justify-center mt-10">
            <Button
              sx={{ padding: ".5rem 4rem" }}
              onClick={submitData}
              variant="contained"
            >
              {!submitting && <div>LOG IN</div>}
              {submitting && (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress size={25} style={{ color: "#FFFFFF" }} />
                </Box>
              )}
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}
