import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="bg-[#f8f9fa] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          {/* Image component of next js converts all images into webp format */}
          <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700">
            <img
              loading="lazy"
              src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              alt=""
            />
          </div>
          <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">Blank</p>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0 pt-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-5 text-sm text-gray-700">
            <h2 className="font-medium flex-grow">My documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>
      </section>
    </div>
  );
}
