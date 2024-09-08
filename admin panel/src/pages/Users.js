import React, { useEffect, useMemo, useState } from "react";
import Table from "../components/UserComponents/Table";
import { capitalizeWords } from "./util/Format";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      field: "profile_img",
      header: "",
      sortable: false,
      width: "2rem",
    },
    { field: "id", header: "User Id", sortable: true, width: "6rem" },
    {
      field: "join_date",
      header: "Join Date",
      sortable: true,
      width: "4rem",
    },
    {
      field: "name",
      header: "Name",
      sortable: true,
      width: "5rem",
    },
    { field: "email", header: "Email", sortable: true, width: "7rem" },
    { field: "gender", header: "Gender", sortable: true, width: "3rem" },
    { field: "isActive", header: "IsActive", sortable: true, width: "3rem" },
  ];

  useEffect(() => {
    const getUsers = async () => {
      const cookie = localStorage.getItem("jwt");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/users`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      const data = await response.json();

      if (data.status === "success") {
        setUsers(data.users);
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  const userData = useMemo(() => {
    return users
      .filter((data) => !data?.isAdmin)
      .map((data) => {
        return {
          id: data?._id,
          isActive: (
            <span
              className={`capitalize px-3 py-1 rounded-sm w-[65px] flex items-center justify-center ${
                data?.isActive ? "bg-green-400" : "bg-red-400"
              }`}
            >
              {data?.isActive ? "Active" : "Inactive"}
            </span>
          ),
          profile_img: (
            <img
              src={data?.pic}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ),
          name: capitalizeWords(data?.name),
          gender: capitalizeWords(data?.gender),
          email: data?.email,
          join_date: new Date(data?.createdAt)
            .toLocaleString("en-US")
            .split(",")?.[0],
        };
      });
  }, [users]);

  const exportData = useMemo(() => {
    return users
      .filter((data) => !data?.isAdmin)
      .map((data) => {
        return {
          id: data?._id,
          isActive: data?.isActive,
          profile_img: data?.pic,
          name: capitalizeWords(data?.name),
          gender: capitalizeWords(data?.gender),
          email: data?.email,
          join_date: new Date(data?.createdAt)
            .toLocaleString("en-US")
            .split(",")?.[0],
        };
      });
  }, [users]);

  console.log(isLoading);

  return (
    <div className="grid w-[80vw] relative">
      <div className="border-[1px] border-[#f5f5f5] overflow-auto h-full searchbox">
        <div className="px-[2%] pb-[2%]">
          <Table
            actions={false}
            data={userData || []}
            columns={columns}
            exportData={exportData || []}
            marginTop={true}
            onRowEdit={() => {}}
            handleRedirect={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
