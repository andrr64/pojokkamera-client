import { Metadata } from "next";
import LoginPage from "./LoginPage";
import AuthController from "../AuthPageController";

export const metadata: Metadata = {
  title: "Pojok Kamera - Online Shop",
};

export default function Page() {
  return (
    <AuthController>
      <LoginPage />
    </AuthController>
  );
}
