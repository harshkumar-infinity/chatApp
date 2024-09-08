import { Skeleton } from "@mui/material";
import React from "react";
export default function Loading() {
  return (
    <div className="w-[100%] border-[#acacac] flex flex-col">
      <Skeleton height={70} />
      <Skeleton height={70} />
    </div>
  );
}
