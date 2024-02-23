import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "../../../Shared/Components/Header/Header";
import RecipeHeader from "../../../Shared/Components/RecipeHeader/RecipeHeader";

export default function Home({ adminData }) {
  return (
    <>
      <ToastContainer />
      <Header
        title="Welcome "
        subTitle={adminData?.userName}
        description="This is a welcoming screen for the entry of the application , you can now see the options"
      />
      <RecipeHeader />
    </>
  );
}
