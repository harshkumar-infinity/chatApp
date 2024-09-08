import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { IconButton } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import React from "react";

export default function SearchBar({ onChange, searchHandler }) {
  return (
    <div className=" h-[10%] w-[100%] flex box-border justify-center py-2 relative">
      <FormControl sx={{ m: 1, width: "60%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
        <OutlinedInput
          onChange={onChange}
          id="outlined-adornment-password"
          type="text"
          spellCheck={false}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={searchHandler}>
                <SearchOutlined></SearchOutlined>
              </IconButton>
            </InputAdornment>
          }
          label="Search"
        />
      </FormControl>
    </div>
  );
}
