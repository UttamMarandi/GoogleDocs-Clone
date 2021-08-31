import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";
import { db } from "../../firebase";
import {
  useDocumentOnce,
  useDocument,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import { getSession, signOut, useSession } from "next-auth/client";
import Login from "../../components/Login";
import TextEditor from "../../components/TextEditor";

function Doc() {
  const [session] = useSession();

  //if no session i.e user is not logged in than show Login page
  if (!session) return <Login />;
  const router = useRouter();
  const { id } = router.query;

  //id is the /doc/id path which is a random string passed as id
  //id is the variable name within [id] in file name
  //its present in router.query

  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  );

  //if snapShot is completly loaded i.e !loadingSnapshot and we dont have a snapshot.data.fileName , than redirect user to home page
  //this can happen if user is logged in but trying to access somebody else document
  if (!loadingSnapshot && !snapshot?.data()?.fileName) {
    router.push("/");
  }

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        {/* On clcik redirect user to root path i.e ("/") */}
        <span
          onClick={() => router.push("/")}
          className="cursor-pointer flex flex-col items-center"
        >
          <Icon name="description" size="5xl" color="blue" />
          <Icon name="arrow_back" size="1xl" color="blue" />
        </span>
        <div className="flex-grow pl-5">
          {/* asunchronous so optional chaining */}
          <h2 className="pt-1">{snapshot?.data()?.fileName}</h2>
          <div className="flex items-center text-sm space-x-2  -ml-1 h-10 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>
        <Button
          buttonType="filled"
          size="regular"
          className="hidden md:!inline-flex h-10"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
        >
          <Icon name="people" size="md" color="white" />
          SHARE
        </Button>
        <img
          className="rounder-full cursor-pointer h-12 w-12"
          src={session.user.image}
          alt=""
        />
      </header>
      <TextEditor />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  // we need session , so that the user credential is loaded from the server , so that we dont have any latency issues
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

// Bug fix
//filename not showing
//solution
//earilier : snapshot?.data?.filenName
//now : snapshot?.data()?.fileName
