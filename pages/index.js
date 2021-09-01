import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import DocumentRow from "../components/DocumentRow";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";

//nextAuth
import { getSession, useSession } from "next-auth/client";
import firebase from "firebase";
//Hooks
import { useState } from "react";
import { db } from "../firebase";
import {
  useCollectionOnce,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { useRouter } from "next/dist/client/router";

export default function Home() {
  const [session] = useSession();
  const router = useRouter();
  //useSession() tells if a user is logged in or not . undefined if not logged not in

  //if session is false show Login page else show home page
  if (!session) return <Login />;

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState(""); //keep track document name input

  //snapshot contains the realitme content of the doc/collection that we are trying to access from db
  //order by timestamp that we created while creating db and pushing the file name to db

  // useCollection pulls the collection , useDocument pulls the document
  const [snapshot] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );
  // const [snapshot] = useDocumentOnce(
  //   db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  // );

  // When user clicks Enter , run createDocument function
  function createDocument() {
    //if the user has input no name , return
    if (!input) return;

    //add a document inside docs collection for the document which is epecific to users email within userDocs collection
    db.collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        router.push(`/doc/${doc.id}`);
      });
    setInput("");
    setShowModal(false);
  }
  const modal = (
    <Modal
      size="sm" //size is small
      active={showModal} //Modal depends on showModal value
      toggler={() => setShowModal(false)} //on clicking outside of Modal or x , setShowModal to false, i.e close the modal.
    >
      {/* Create Modal Body */}
      <ModalBody>
        <input
          className="outline-none w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Please enter document name"
          onKeyDown={(e) => e.target.value === "Enter" && createDocument}
          // onKeyDown triggers when user presses a key
          //if user clicks enter than runCreateDocument
        />
      </ModalBody>
      {/* Modal foter contains the create and cancel button */}
      <ModalFooter>
        <Button
          color="gray"
          ripple="dark"
          buttonType="link"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>
        <Button color="blue" ripple="light" onClick={createDocument}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}
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
          <div
            onClick={() => setShowModal(true)}
            className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
          >
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
      {/* accessing snapshot is asynchronous so functional chaning 
      doc.data gives the fields for each document*/}
      <section>
        {snapshot?.docs.map((doc) => (
          <DocumentRow
            key={doc.id}
            id={doc.id}
            fileName={doc.data().fileName}
            date={doc.data().timestamp}
          />
        ))}
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  //context provides data about any reqest that the user sent
  const session = await getSession(context);
  //we cannot use useSession hook within getServerSideProps b.c it is a node js block
  //so we use getSession(context) and pass the context

  return {
    props: {
      session,
    },
  };
  //getServerSideProps returns an object conataining props key which contains the session of current user logged in
  //we can pass props to Home componet to access it

  //But the best way is to wrap the whole app in _app.js in <Provider> component and pass session props as pageProps.session
  //pageProps- need to look more into it

  //after that we can use useSession hook as normal
}
