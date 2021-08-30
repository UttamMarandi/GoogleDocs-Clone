import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signIn } from "next-auth/client";
import Image from "next/image";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        src="/images/docs.png"
        width="300"
        height="300"
        objectFit="contain"
      />
      <h2 className="font-semibold text-[50px] text-gray-700">Google Docs</h2>
      <Button
        className="px-10"
        color="blue"
        buttonType="flled"
        iconOnly={true}
        ripple="light"
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
