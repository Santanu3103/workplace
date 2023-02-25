import { TextField } from "@mui/material";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase";
function UploadFile({ type = "doc", onUpload, value, disabled }) {
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
    <div>
      <TextField
      
        size="small"
        type={"file"}
        inputProps={{
          accept: type === "doc" ? ".doc,.docx,.pdf" : ".jpg,.jpeg,.png",
        }}
        onChange={(e) => upload(e)}
        fullWidth
        sx={{
          display: disabled ? "none" : "block",
          fieldset: {
            borderRadius: "10px",
            border: "1px solid #00000036",
          },
        }}
      />
      <div>
        {value ? (
          <div>
            {type === "doc" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <a href={value} target="_blank" rel="noreferrer">
                  <img
                    width={"50px"}
                    src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                    alt="pdf"
                  />
                </a>
              </div>
            ) : (
              <h3 
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
              >
                <img
                  width={"100px"}
                src={value}
                alt="img"
                />
              </h3>
            )}
          </div>
        ) : (
          <h2>please upload a doc</h2>
        )}
      </div>
    </div>
  );
}

export default UploadFile;
