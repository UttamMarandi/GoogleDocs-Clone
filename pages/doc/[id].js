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

function Doc() {
  const [session] = useSession();

  //if no session i.e user is not logged in than show Login page
  if (!session) return <Login />;
  const router = useRouter();
  const { id } = router.query;

  //id is the /doc/id path which is a random string passed as id
  //id is the variable name within [id] in file name
  //its present in router.query

  const [snapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  );

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
        <div className="flex-grow">
          {/* asunchronous so optional chaining */}
          <h2>{snapshot?.data()?.fileName}</h2>
        </div>
      </header>
    </div>
  );
}

export default Doc;
