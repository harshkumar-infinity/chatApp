import React from 'react';
// import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { MotionAnimate } from 'react-motion-animate';
import { NavLink } from 'react-router-dom';
// import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import InfoIcon from '@mui/icons-material/Info';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const iconComponent = [<ForumOutlinedIcon />, <SearchOutlinedIcon />, <InfoIcon></InfoIcon>, <SettingsOutlinedIcon></SettingsOutlinedIcon>]
export default function Item({ text, to, val }) {
  return (
    <MotionAnimate reset={true}>
      <NavLink to={to} style={(value) => { return value.isActive ? { backgroundColor: '#0147FF', color: 'white' } : {} }} className='w-[80%] max-[1250px]:text-sm max-[1024px]:my-4 max-[1024px]:justify-center max-[1024px]:items-center max-[1024px]:py-[6%]  transition ease-in-out delay-250 flex flex-row px-[6%] py-[3%] rounded-lg my-[10%]'>
        {iconComponent[val]}
        <div className=" max-[1024px]:hidden ml-[12%]">{text}</div>
      </NavLink>
    </MotionAnimate>
  )
}


// className={value=>{return value.isActive?'bg-blue-700':''}