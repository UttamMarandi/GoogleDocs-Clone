import "tailwindcss/tailwind.css";
import "@material-tailwind/react/tailwind.css";
import Head from "next/head";
import { Provider } from "next-auth/client";
import "../styles.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/dist/client/router";

// implementing progress bar
const progress = new ProgressBar({
  size: 4,
  color: "#2196F3",
  className: "z-50",
  delay: 100,
});

//Router has various event , for each event we we want to do the following
//When a route is clciked , it triggers routeChange start , on that we want the progressbar to start
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
