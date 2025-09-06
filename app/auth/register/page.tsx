import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pojok Kamera - Online Shop",
};

import React from 'react'
import RegisterPage from "./RegisterPage";
import AuthController from "../AuthPageController";

export default function Page() {
  return (
    <AuthController>
      <RegisterPage />
    </AuthController>
  )
}
