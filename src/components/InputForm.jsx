import React, { useEffect, useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

export default function InputForm() {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status == "done") {
      console.log("meta", meta);
      console.log("file", file);
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log('====================================');
    console.log(URL.createObjectURL(allFiles[0].file));
    console.log('====================================');
    
    //URL.createObjectURL(allFiles[0])
    //console.log(files.map(f => f))
    //allFiles.forEach(f => f.remove())
  };

  return (
    <Dropzone
      // getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      PreviewComponent={MyCustomPreview}
      

      //initialFiles={}
      //accept="image/*,audio/*,video/*,zip/*,rar/*"
    />
  );
}

const MyCustomPreview = (props) => {
  const {meta} = props;
  console.log("meta:", props);
  //const temporaryURL = URL.createObjectURL(files[0]);
  const { name, previewUrl, status } = meta
  return (
    <span style={{ alignSelf: 'flex-start', margin: '10px 3%', fontFamily: 'Helvetica' }}>
      {name}, {status}, <MyImg src={previewUrl}/>, {}
    </span>
  )
}


const MyImg = ({src}) => {
  return(
    <>
      <img style={{width: "20%", height:"auto"}} src={src}/>
    </>
  )
}