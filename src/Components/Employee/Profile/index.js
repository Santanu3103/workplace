import NavBar from '../Navbar'
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import {companySize,industryType} from "../../constants";
import UploadFile from "../../Common/UploadFile";
import { userContext } from "../../../context/userContext";
import { db } from "../../../FireBase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toastMessage from "../../../utils/toastMessage";
import { useNavigate } from "react-router-dom";
import FormLoading from "../../Common/Skeleton/FormLoading.js";

const EmployeeProfile = () => {
  const [state, dispatch] = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [disabledField, setDisabledField] = useState(true);
  const [companyData, setcompanyData] = useState({
    name: "",
      email: "",
      phone: "",
      companyName: "",
      companySize: "",
      role: "",
      companyWebsite: "",
      companyTag: "",
      companyBio: "",
      industryType: "",
      companyLogo: "",
    
  });
  const fetchUserData = async () => {
   
    setLoading(true);
    const userId = state.userInfo.email;
    const docRef = doc(db, "userInfo", userId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data(), "userinfo");
        setcompanyData(docSnap.data());
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setcompanyData({
      name: state.userInfo.displayName,
      email: state.userInfo.email,
      phone: "",
      companyName: "",
      companySize: "",
      role: "",
      companyWebsite: "",
      companyTag: "",
      companyBio: "",
      industryType: "",
      companyLogo: "",
    })
    console.log(state);
 
    fetchUserData();
  }, []);
  const setSkills = (skill) => {
    if (companyData.skills.includes(skill)) {
      setcompanyData({
        ...companyData,
        skills: companyData.skills.filter((item) => item !== skill),
      });
    } else {
      setcompanyData({ ...companyData, skills: [...companyData.skills, skill] });
    }
  };
  const submitData = async (e) => {
    const userId = state.user.email;
    try {
      await setDoc(doc(db, "userInfo", userId), {
        ...companyData,
        userId,
        userType: "employer",
      });
      toastMessage("data saved successfully", "success");
    } catch (err) {
      console.log(err);
      toastMessage("something went wrong", "error");
    }
  };
  const saveData = () => {
    if (disabledField) {
      setDisabledField(false);
    } else {
      submitData();
      setDisabledField(true);
    }
  };
  return (
    loading ? (
      <div><FormLoading fields={9} /></div>
    ) : (
    <form onSubmit={submitData}>
      <div>
        <Button>Logout</Button>
        <Button onClick={saveData}>{disabledField ? "Edit" : "Save"}</Button>
      </div>
      <Grid className="grid-container" container  spacing={2}
    
      >
        <Grid className="grid-item" item xs={12} sm={6}>
          <label> Company Name</label>
          <TextField
          disabled={disabledField}
            size="small"
            fullWidth
            required
            value={companyData.companyName}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) => setcompanyData({ ...companyData, companyName: e.target.value })}
          />
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>phone</label>
          <TextField
          disabled={disabledField}
            size="small"
            fullWidth
            required
            value={companyData.phone}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) =>
              setcompanyData({ ...companyData, phone: e.target.value })
            }
          />
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Industry Type</label>
          <Select
          disabled={disabledField}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={companyData.industryType}
            size="small"
            fullWidth
            onChange={(e) =>
              setcompanyData({ ...companyData, industryType: e.target.value })
            }
          >
            {industryType.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Comapny size</label>
          <Select
          disabled={disabledField}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={companyData.companySize}
            size="small"
            fullWidth
            onChange={(e) =>
              setcompanyData({ ...companyData, companySize: e.target.value })
            }
          >
            {companySize.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Name </label>
          <TextField
            disabled={disabledField}
            size="small"
            fullWidth
            required
            value={companyData.name}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) =>
              setcompanyData({ ...companyData, name: e.target.value })
            }
          />
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Email</label>
          <TextField
            disabled
            size="small"
            type={"email"}
            fullWidth
            required
            value={companyData.email}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) =>
              setcompanyData({ ...companyData, email: e.target.value })
            }
          />
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Role</label>
          <TextField
            disabled={disabledField}
            size="small"
          
            fullWidth
            required
            value={companyData.role}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) =>
              setcompanyData({ ...companyData, role: e.target.value })
            }
          />
        </Grid>
        
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Company Website </label>
          <TextField
            disabled={disabledField}
            size="small"
            type="url"
            fullWidth
            value={companyData.companyWebsite}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) =>
              setcompanyData({ ...companyData, companyWebsite: e.target.value })
            }
          />
        </Grid>
     
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>linkedin </label>
          <TextField
          disabled={disabledField}
            size="small"
            type="url"
            fullWidth
            value={companyData.linkedin}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) =>
              setcompanyData({ ...companyData, linkedin: e.target.value })
            }
          />
        </Grid>
        <Grid className="grid-item" item xs={12}>
          <label>comapny tag</label>
          <TextField
          disabled={disabledField}
            size="small"
           
            fullWidth
            required
            value={companyData.companyTag}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) => setcompanyData({ ...companyData, companyTag: e.target.value })}
          />
        </Grid>
        <Grid className="grid-item" item xs={12}>
          <label>company bio</label>
          <TextField
            size="small"
            disabled={disabledField}
            multiline
            minRows={4}
            fullWidth
            required
            value={companyData.companyBio}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) => setcompanyData({ ...companyData, companyBio: e.target.value })}
          />
        </Grid>
        <Grid className="grid-item" item xs={12}>
          <label>Company logo</label>
          <UploadFile
          disabled={disabledField}
            type="image"
            onUpload={(url) => setcompanyData({ ...companyData, companyLogo: url })}
            value={companyData.companyLogo}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          className="grid-item"
          item
          xs={12}
        >
        
        </Grid>
      </Grid>
    </form>)
  );
}

export default EmployeeProfile
