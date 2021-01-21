import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import { API_URL, getFiles, downloadFile } from "../API/API";
import { toDateTimeString } from "../Util/TimeUtil";

const FilesList = ({ homework_id, fileUploadedAt }) => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const getFilesList = async () => {
    try {
      getFiles(homework_id ? homework_id : 1).then((res) => {
        setErrorMsg("");
        if (res) setFilesList(res.data);
      });
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  useEffect(() => {
    getFilesList();
  }, [fileUploadedAt]);

  const downloadFileCapsule = (id, path, mimetype) => {
    console.log(id, path, mimetype);
    downloadFile(id, path, mimetype);
  };

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="files-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Uploaded At</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({
                created_at,
                homework_id,
                id,
                mimetype,
                path,
                title,
                updated_at,
              }) => (
                <tr key={id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">
                    {toDateTimeString(created_at)}
                  </td>
                  <td>
                    <a
                      className="file-download"
                      //href="#/"
                      onClick={() => downloadFileCapsule(id, path, mimetype)}
                    >
                      Download
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: "400" }}>
                No files found. Please add files.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;
