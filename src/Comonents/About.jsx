import React from "react";
import Box from "@mui/material/Box";
import ListOfCategory from "./ListOfCategory";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
export default function About() {
  const location = useLocation();
  const shouldRefresh = location.state?.refresh;
  return (
    <div>
      <Box component="main" sx={{ p: 3 }}>
        <Button
          component={Link}
          variant="contained"
          startIcon={<AddCircleIcon />}
          to={`/addCategory`}
        >
          Add Category
          <VisuallyHiddenInput type="file" />
        </Button>
        <ListOfCategory refresh={shouldRefresh} />
      </Box>
    </div>
  );
}
