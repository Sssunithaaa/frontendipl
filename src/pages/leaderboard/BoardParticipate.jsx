import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../Components/Input";
import { useForm } from "react-hook-form";
import MainLayout from "../../Components/MainLayout";
import Button from "../../Components/Button";
import { images } from "../../constants";

const LeaderboardForm = () => {
  const userState = useSelector((state) => state.user);

  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      leaderboardname: "",
      password: "",
      username: userState?.userInfo?.user?.username,
    },
    mode: "onChange",
  });

  const handleSubmitParticipate = async ({ leaderboardname, password }) => {
    const formData = {
      leaderboardname: leaderboardname,
      password: password,
    };
    try {
      const response = await fetch(
        "http://localhost:8000/ipl2/lb_participation/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Redirect or perform any action upon successful submission
        window.location.href = "/"; // Redirect to home page
      } else {
        // Handle error
        const responseData = await response.json(); // Parse JSON response
        console.error("Error:", responseData.error); // Log error to console
        window.alert(responseData.error); // Display error message to user
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = (data) => {
    const { leaderboardname, password } = data;
    handleSubmitParticipate({ leaderboardname, password });
  };

  return (
    <MainLayout>
      <div className="mt-24 bg-[rgb(237,236,237)] flex flex-col lg:flex-row justify-center items-center lg:h-[600px] h-[750px]">
        <div className="lg:hidden w-[100%] mt-20 lg:mt-0 lg:w-[50%] flex justify-center items-center">
          <img src={images.lb} alt="" className="w-[70%] lg:w-[60%]" />
        </div>
        <div className="w-[100%] lg:w-[50%] flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-[70%] lg:w-[80%]  mb-10 lb:mb-0 p-8 bg-white shadow-md rounded-b"
          >
            <h2 className="text-xl text-[rgb(64,21,48)] font-semibold mb-4">
              Participate in Leaderboard along with your friends
            </h2>
            <Input
              label="Leaderboard Name"
              id="leaderboardname"
              type="text"
              register={register}
              errors={errors}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              register={register}
              errors={errors}
            />
            <Button
              type="submit"
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default LeaderboardForm;
