import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Logo from "../../../imgs/logo.png";
import ToggleButton from "../../Common/Togglebutton";
import { useNavigate } from "react-router-dom";
import {EmployeePages} from '../../constants'

function  NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
 
const navigate=useNavigate();
 
  const handleCloseNavMenu = (path) => {
    navigate(path);
    setAnchorElNav(null);
  };

 
  return (
    <AppBar position="static">
      <Container
      sx={{
        backgroundColor: "white",
      }}
      maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              weight: "100px",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img width="100px" src={Logo} alt="logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" },color:'black' }}>
          
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img width="100px" src={Logo} alt="logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {EmployeePages.map((page) => (
              <Button
                key={page}
                onClick={()=>handleCloseNavMenu(page.path)}
                sx={{ my: 2, color:'black', display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <ToggleButton />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;


