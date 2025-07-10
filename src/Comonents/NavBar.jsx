import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "Category", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Logout", path: "/logout" },
];

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const userLoggedIn = useSelector((state) => state.global.loggedInUser);

  const handleLogout = async () => {
    try {
      const logoutDto = {
        userName: userLoggedIn.userName, // Replace with actual data
      };

      await axios.post("http://localhost:8082/stockHolder/logout", logoutDto, {
        withCredentials: true, // if using cookies/session
      }); // Optionally clear localStorage/sessionStorage // localStorage.removeItem('token');

      navigate("/logout");
    } catch (error) {
      console.error("Logout failed:", error); // Optionally show a toast or alert
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Portfolio Hisab
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              {/* <ListItemText primary={item} /> */}
              <NavLink
                to={item.path}
                // to={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary={item.label} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textAlign: "left",
            }}
          >
            Portfolio Hisab
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) =>
              item.label === "Logout" ? (
                <IconButton
                  key={item.label}
                  onClick={handleLogout}
                  sx={{ color: "#fff" }}
                >
                  <LogoutIcon />
                </IconButton>
              ) : (
                <Button key={item.label} sx={{ color: "#fff" }}>
                  <NavLink
                    to={item.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item.label}
                  </NavLink>
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBar;
