import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import "./onboarding.css";
import { companySize, industryType } from "../../../constants";
import SearchableDropDown from "../../common/SearchableDropDown";
import UploadFile from "../../common/UploadFile";
import { userContext } from "../../../context/userContext";
import { db } from "../../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import toastMessage from "../../../utils/toastMessage";
import { useNavigate } from "react-router-dom";
function Onboarding() {
  const [state, dispatch] = useContext(userContext);
  const navigate = useNavigate();
  const [companyData, setcompanyData] = useState({
    name: state.user.displayName,
    email: state.user.email,
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
  const setSkills = (skill) => {
    //if skill is already present in the array then remove it
    // else add it
    if (companyData.skills.includes(skill)) {
      setcompanyData({
        ...companyData,
        skills: companyData.skills.filter((item) => item !== skill),
      });
    } else {
      setcompanyData({
        ...companyData,
        skills: [...companyData.skills, skill],
      });
    }
  };
  const submitData = async (e) => {
    e.preventDefault();
    console.log(companyData);

    // push data to firebase to collection userInfo
    const userId = state.user.email;

    // setDoc(doc ref, data)
    // doc(db ref, collection name, doc id)

    try {
      await setDoc(doc(db, "userInfo", userId), {
        ...companyData,
        userId,
        userType: "employer",
      });
      toastMessage("data saved successfully", "success");
      // redirect to profile page
      dispatch({
        type: "AddUSERINFO",
        payload: { ...companyData, userId, userType: "employer" },
      });
      navigate("/employer/profile");
    } catch (err) {
      console.log(err);
      toastMessage("something went wrong", "error");
    }
  };
  return (
    <form onSubmit={submitData}>
      <div>
        <Button>Logout</Button>
      </div>
      <Grid className="grid-container" container spacing={2}>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label> Company Name</label>
          <TextField
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
            onChange={(e) =>
              setcompanyData({ ...companyData, companyName: e.target.value })
            }
          />
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>phone</label>
          <TextField
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
            disabled
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
            onChange={(e) =>
              setcompanyData({ ...companyData, companyTag: e.target.value })
            }
          />
        </Grid>
        <Grid className="grid-item" item xs={12}>
          <label>company bio</label>
          <TextField
            size="small"
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
            onChange={(e) =>
              setcompanyData({ ...companyData, companyBio: e.target.value })
            }
          />
        </Grid>
        <Grid className="grid-item" item xs={12}>
          <label>Company logo</label>
          <UploadFile
            type="image"
            onUpload={(url) =>
              setcompanyData({ ...companyData, companyLogo: url })
            }
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
          <Button type="sumbit">Complete Setup</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Onboarding;
