import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListOfStocks from "./ListOfStocks";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Home() {
  return (
    <div>
      <Box component="main" sx={{ p: 3 }}>
        {/* <Toolbar /> */}
        {/* <Typography>This is home page</Typography> */}
        <Button
          component={Link}
          variant="contained"
          startIcon={<AddCircleIcon />}
          to={`/addStock`}
        >
          Add Stock
          <VisuallyHiddenInput type="file" />
        </Button>
        <ListOfStocks />
      </Box>
    </div>
  );
}
