import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function AddCategory() {
  const userLoggedIn = useSelector((state) => state.global.loggedInUser);
  const [stock, setStock] = React.useState({
    stockName: "",
    price: 0,
    quantity: 0,
    description: "",
    categoryName: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(stock);
    console.log(event.target);
    const { name, value } = event.target;
    setStock((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(stock);
    axios
      .post(`http://localhost:8082/category/add/${userLoggedIn.id}`, stock)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    navigate("/about", { state: { refresh: true } });
    // window.location.reload();
  };
  return (
    <div
      //   sx={{ border: "3px solid black", borderRadius: "10px", margin: "40px" }}
      style={{
        // border: "3px solid black",
        borderRadius: "10px",
        margin: "auto",
        marginTop: "50px",
        padding: "2px",
        paddingTop: "20px",
        width: "50%",
      }}
    >
      <div>
        <Typography
          sx={{
            flex: "1 1 100%",
            paddingBottom: "10px",
            fontWeight: "bold", // Making the font bold
            fontSize: "24px", // Adjusting font size
            // marginBottom: "20px", // Adding some bottom margin for spacing
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          ADD CATEGORY
        </Typography>
      </div>
      <div>
        <Box
          component="form"
          maxWidth="sm"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            borderRadius: "10px",
            margin: "auto",
            padding: "10px",
            boxShadow: "0px 0px 10px 0px",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              id="standard-textarea"
              label="Category Name"
              placeholder="Enter name of Category"
              multiline
              variant="standard"
              required
              name="categoryName"
              onChange={handleChange}
            />
          </div>
          <div>
            <Button
              sx={{ padding: "auto", marginTop: "10px" }}
              variant="contained"
              size="medium"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}
