import { CircularProgress } from "@mui/material";
import React from "react";

export default function CircularLoading() {
  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center">
      <CircularProgress />
    </div>
  );
}
