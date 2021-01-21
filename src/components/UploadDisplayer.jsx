import React, {useState} from "react";
import FilesList from "./FilesList";
import UploadFile from "./UploadFile";

export default function UploadDisplayer({homework_id}) {
    const [fileUploadedAt, setFileUploadedAt] = useState(null)
    return (
    <>
      <UploadFile homework_id={homework_id} setFileUploadedAt={setFileUploadedAt} />
      <FilesList homework_id={homework_id} fileUploadedAt={fileUploadedAt} />
    </>
  );
}
