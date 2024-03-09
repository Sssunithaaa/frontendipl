import { useQuery } from "@tanstack/react-query";
import MainLayout from "../Components/MainLayout";
import React from "react";
import { images } from "../constants";

const ProfilePage = () => {
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryFn: () => {},
    queryKey: ["profile"],
  });
  return (
    <MainLayout>
      <div className="container h-screen w-screen justify-center bg-[#071e34] "></div>
    </MainLayout>
  );
};

export default ProfilePage;
