import { TextField } from "@mui/material";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../FireBase/index";
function UploadFile({ type = "doc", onUpload, value }) {
  const [progress, setProgress] = useState(0);
  const upload = (e) => {

    const file = e.target.files[0];
    console.log(file);
    setProgress(2);
    const storageRef = ref(storage, `${type}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          onUpload(downloadURL);
          setProgress(0);
        });
      }
    );
  };
  return progress > 0 ? (
    <h2>{progress}</h2>
  ) : (
    <TextField
      size="small"
      type={"file"}
      inputProps={{
        accept: type === "doc" ? ".doc,.docx,.pdf" : ".jpg,.jpeg,.png",
      }}
      onChange={(e) => upload(e)}
      fullWidth
      sx={{
        fieldset: {
          borderRadius: "10px",
          border: "1px solid #00000036",
        },
      }}
    />
  );
}

export default UploadFile;
