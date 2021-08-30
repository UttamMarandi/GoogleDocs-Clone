import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signIn, signOut, signout, useSession } from "next-auth/client";

function Header() {
  const [session] = useSession();
  console.log("session", session);
  //session logs undefined.
  //so we cannot use useSession()
  //What we need to use is use server side rendering which authenticates the user before loading the page.so all asynchronous code in handled before page is loaded
  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className=" md:inline-flex h-20 w-20 border-0"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="5xl" color="blue" />
      <h1 className="ml-2 text-gray-700 text-2xl">Docs</h1>

      <div className="mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <Icon name="search" size="3xl" color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-5 text-base bg-transparent outline-none "
        />
      </div>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className=" ml-5 md:inline-flex h-20 w-20 border-0"
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>
      <div onClick={signOut}>
        <img
          loading="lazy"
          className="cursor-pointer h-12 w-12 rounded-full ml-2"
          src={session?.user?.image}
          //session.user.image will not work as fetching image is asynchronous.so we need to use optional chaining
          //session?.user?.image
          //still it not works b.c we need implement serversideProps
          alt=""
        />
        <h2
          className="text-gray-700 text-[16px] cursor-pointer"
          onClick={signOut}
        >
          Sign Out
        </h2>
      </div>
    </header>
  );
}

export default Header;
