import React, {useState} from 'react';
import FilesList from './FilesList';
import UploadFile from './UploadFile';

export default function UploadDisplayer({fkValue, fk, table, allowUpload, allowDelete=false, style=""}) {
  const [fileUploadedAt, setFileUploadedAt] = useState(null);
  return (
    <div className={`upload-displayed-container ${style}`}>
      <h3>Files</h3>
      {allowUpload && (
        <UploadFile
          fkValue={fkValue}
          fk={fk}
          table={table}
          setFileUploadedAt={setFileUploadedAt}
        />
      )}

      <FilesList
        fkValue={fkValue}
        fk={fk}
        table={table}
        fileUploadedAt={fileUploadedAt}
        allowDelete={allowDelete}
      />
    </div>
  );
}
