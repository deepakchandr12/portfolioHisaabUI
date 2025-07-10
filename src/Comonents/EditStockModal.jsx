import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import EditStockTab from "./EditStockTab";
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EditStockModal(props) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [error, setError] = useState(null);

  const [updatedStockValues, setUdatedStockValues] = useState({
    price: null,
    quantity: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log();
    value === 1 && updatedStockValues.quantity > props.stock.quantity
      ? setError("Available quantity is: " + props.stock.quantity)
      : axios
          .put(
            `http://localhost:8082/stock/${value === 0 ? "buy" : "sell"}/${
              props.stock.id
            }`,
            updatedStockValues
          )
          .then((res) => {
            console.log(res);
            setOpen(false);
            setError(null);
            props.onClose();
          })
          .catch((err) => {
            console.log(err);
            setError(err.response.data.message);
          });
    // navigate("/");
  };

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "primary.main",
            letterSpacing: 1,
          }}
        >
          {"EDIT STOCK"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="Add Stock" {...a11yProps(0)} />
              <Tab label="Remove Stock" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <EditStockTab
              stock={props.stock}
              setUdatedStockValues={setUdatedStockValues}
              updatedStockValues={updatedStockValues}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <EditStockTab
              stock={props.stock}
              setUdatedStockValues={setUdatedStockValues}
              updatedStockValues={updatedStockValues}
              error={error}
            />
          </CustomTabPanel>
        </Box>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            {value === 0 ? "add" : "remove"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
