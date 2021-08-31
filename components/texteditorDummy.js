import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { db } from "../firebase";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

//we need to import the Editor dynamically. It's b.c Editor uses the window object. But next js offers both server side and client side rendering. So while on server side it does not have access to window object.Hence we get a bug "window is not defined". Way to solve this is to use dynamic imports
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false, //set server side rendering to false
  }
);

function TextEditor() {
  // on page refresh whatever we typed to editor vanishes, so we need to use useState to keep track of state
  //We cannot initialize editorstate with empty values , we have to import EditorState from "draft.js" and initialize it with EditorState.createEmpty
  const session = useSession();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  //to grab id
  const router = useRouter();
  const { id } = router.query;

  const [snapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  );

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);
  //useEffect runs when there is a change in snapshot or at first load.
  //if editorState field in snapshot is not empty , then we set the Editor state to update values
  //convertFromRaw converts the storable data i.e json(doubt) to text

  //this function is imp to keep track of the state of editor
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    db.collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(id)
      .set(
        { editorState: convertToRaw(editorState.getCurrentContent()) },
        {
          merge: true,
        }
      );
    //   convertToRaw converts the editorState conent to storagebale format , I think json
    //than on option object we have to set merge to true so that new content is updated instead of overwritten
    //
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      <Editor
        // Editor will take two specific props editorState , and onEditorStateChange
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center max-w-4xl mx-auto"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-4xl mx-auto"
      />
    </div>
  );
}

export default TextEditor;
