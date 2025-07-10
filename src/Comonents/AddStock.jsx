import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import AddScreenModal from "./AddScreenModal";
import { useNavigate } from "react-router-dom";

export default function AddStock() {
  const userLoggedIn = useSelector((state) => state.global.loggedInUser);
  const navigate = useNavigate();
  const [stock, setStock] = React.useState({
    stockName: "",
    price: 0,
    quantity: 0,
    description: "",
    categoryName: "",
  });
  const [categoryOptions, setCategoryOptions] = React.useState([]);
  const [error, setError] = React.useState(null);

  const handleChange = (event) => {
    console.log(stock);
    console.log(event.target);
    const { name, value } = event.target;
    setStock((prevState) => ({ ...prevState, [name]: value }));
  };

  React.useState((event) => {
    axios
      .get(`http://localhost:8082/category/viewAll/${userLoggedIn.id}`)
      .then((res) => {
        setCategoryOptions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(stock);
    axios
      .post(`http://localhost:8082/stock/add/${userLoggedIn.id}`, stock)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
    // navigate("/");
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
          ADD STOCK
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
              label="Stock Name"
              placeholder="Enter name of stock"
              multiline
              variant="standard"
              required
              name="stockName"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              id="standard-textarea"
              label="Stock Price"
              placeholder="Enter Price"
              multiline
              variant="standard"
              required
              name="price"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{"₹"}</InputAdornment>
                ),
              }}
            />
            <TextField
              id="standard-textarea"
              label="Quantity"
              placeholder="Enter Quantity"
              multiline
              variant="standard"
              required
              name="quantity"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              id="standard-textarea"
              label="Description"
              placeholder="Description"
              multiline
              variant="standard"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              id="standard-textarea"
              label="Category"
              placeholder="Choose Category"
              multiline
              variant="standard"
              required
              name="categoryName"
              select
              value={stock.categoryName || ""}
              MenuProps={{ PaperProps: { style: { textAlign: "left" } } }}
              InputProps={{ style: { textAlign: "left" } }} // Align selected item to the left
              onChange={handleChange}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option.id} value={option.categoryName}>
                  {option.categoryName}
                </MenuItem>
              ))}
            </TextField>
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
      <div>{error && <AddScreenModal error={error} />}</div>
    </div>
  );
}
