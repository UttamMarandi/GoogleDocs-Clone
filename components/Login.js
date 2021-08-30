import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signin, signIn } from "next-auth/client";
import Image from "next/image";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        src="/images/docs.png"
        width="200"
        height="200"
        objectFit="contain"
      />
      <h2 className="font-semibold text-[40px]  text-gray-500">Google Docs</h2>
      <Button
        className="w-[150px] login-button mt-10"
        color="blue"
        buttonType="flled"
        ripple="light"
        onClick={signin}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
