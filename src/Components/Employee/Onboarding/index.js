import { Button, Grid, TextField ,MenuItem, Select,} from "@mui/material";
import React, { useState,useContext } from "react";
import { userContext } from "../../../context/userContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../FireBase/index";
import "./employerOnboarding.css";
import toastMessage from "../../../utils/toastMessage";
import { useNavigate } from "react-router-dom";
import { getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { storage } from "../../../FireBase/index";
import { industryType,companySize} from "../../constants/index";
function EmployeeOnboarding() {

  
  const [state, dispatch] = useContext(userContext);
  const navigate = useNavigate();

  const [uploadLoading, setUploadLoading] = useState(0);
  let inputRef = React.createRef();
  const [values, setValues] = useState({
    companyDescription: "",
    companyName: "",
    companyWebsite: "",
    companyEmail:state.userInfo.email,
    companyPhone: "",
    industryType: "",
    noOfEmployees: "",
    companyLocation: "",
    companyTagline: "",
    logo: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    console.log(values);
    const user =state.userInfo.uid;
   
    try {
      console.log(state.userInfo);
      await setDoc(doc(db, "userInfo",user), {...values,type: "employer"});
      navigate("/employee/profile");
    } catch (err) {
      console.log(err);

    }
  };

  const uploadLogo = (e) => {
    let file = e.target.files[0];
    console.log(file);
    const storageRef = ref(storage, "company-logo/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setUploadLoading(progress);
      },
      (error) => {
       console.log(error)
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValues({...values,logo: downloadURL,});
          setUploadLoading(0);
        });
      }
    );

  };
  return (
    <form onSubmit={(e) => submit(e)} className="onboarding-container">
     <div>
        <Button onClick={()=>{navigate("/candidate/auth")}}>Logout</Button>
      </div>
      <h2>Setup your Employer Profile</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <label className="field-label">Company Name</label>
          <TextField
            required
            size="small"
            fullWidth
            value={values.companyName}
            onChange={(e) =>
              setValues({ ...values, companyName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="field-label">Company Email</label>
          <TextField
            size="small"
            type="email"
            required
            disabled
            fullWidth
            value={values.companyEmail}
            onChange={(e) =>
              setValues({ ...values, companyEmail: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="field-label">Company Phone</label>
          <TextField
            size="small"
            required
            fullWidth
            value={values.companyPhone}
            onChange={(e) =>
              setValues({ ...values, companyPhone: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <label className="field-label">Company Website</label>
          <TextField
            size="small"
            fullWidth
            value={values.companyWebsite}
            onChange={(e) =>setValues({ ...values, companyWebsite: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <label className="field-label">Company Location</label>
          <TextField
            size="small"
            fullWidth
            value={values.companyLocation}
            onChange={(e) =>
              setValues({ ...values, companyLocation: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <label className="field-label">Company tagline</label>
          <TextField
            size="small"
            fullWidth
            value={values.companyTagline}
            onChange={(e) =>
              setValues({ ...values, companyTagline: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <label className="field-label">Industry Type</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.expectedSalary}
            size="small"
            fullWidth
            onChange={(e) =>
              setValues({ ...values, industryType: e.target.value })
            }
          >
            {industryType.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <label className="field-label">No. of employees</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.companySize}
            size="small"
            fullWidth
            onChange={(e) =>setValues({ ...values, expectedSalary: e.target.value })}
          >
            {companySize.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </Grid>
        <Grid item xs={12} sm={12}>
          <label className="field-label">Company description</label>
          <TextField
            multiline
            minRows={5}
            fullWidth
            value={values.companyDescription}
            onChange={(e) =>
              setValues({ ...values, companyDescription: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label className="field-label">Company Logo</label>
          {uploadLoading > 0 && uploadLoading <= 100 ? (
            <div>Loading {uploadLoading} %</div>
          ) : (
            <>
              <input
                accept="image/*"
                style={{
                  display: "none",
                }}
                ref={inputRef}
                type={"file"}
                value={""}
                onChange={(e) => uploadLogo(e)}
              />
              <div className="upload-btn-container">
                <Button onClick={() => inputRef.current.click()}>
                  Upoad Logo
                </Button>
               { values.logo&&<img alt="logo" width="200px" src={values.logo} />}
              </div>
            </>
          )}
        </Grid>
        <div className="btn-container">
          <Button type="submit">Complete Setup</Button>
        </div>
      </Grid>
    </form>
  );
}

export default EmployeeOnboarding;


