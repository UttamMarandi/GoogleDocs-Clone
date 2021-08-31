import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";

function DocumentRow({ id, fileName, date }) {
  // define a router variable that will push and redirect the user to /doc/id when clicked on a document
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-2  rounded-lg hover:bg-gray-100 cursor-pointer mx-auto max-w-3xl text-sm justify-center"
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="flex-grow pl-5 w-10 truncate">{fileName}</p>
      <p className="pr-7 text-sm">{date?.toDate().toLocaleDateString()}</p>
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
  );
}

export default DocumentRow;
