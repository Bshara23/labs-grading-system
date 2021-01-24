import React, { useState, useEffect } from "react";
import { getFiles, downloadFile } from "../API/API";
import { toDateTimeString } from "../Util/TimeUtil";

const FilesList = ({ fkValue, fk, table, fileUploadedAt }) => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const getFilesList = async () => {
    try {
      getFiles(fkValue, fk, table).then((res) => {
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

  const downloadFileCapsule = (id, table, path, mimetype) => {
    downloadFile(id, table, path, mimetype);
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
                id,
                mimetype,
                path,
                title,
              }) => (
                <tr key={id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">
                    {toDateTimeString(created_at)}
                  </td>
                  <td>
                    <a
                      className="file-download"
                      onClick={() => downloadFileCapsule(id, table, path, mimetype)}
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
