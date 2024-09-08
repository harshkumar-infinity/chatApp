import * as React from "react";
import Item from "./Item";

export default function Menu() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[80%]">
        <Item val={0} to="users" text="Users"></Item>
      </div>
    </div>
  );
}
