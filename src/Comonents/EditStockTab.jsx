import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";

export default function EditStockTab(prop) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    prop.setUdatedStockValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div>
        {console.log("Updated stcks: " + prop.updatedStockValues)}
        {prop.error != null && (
          <Alert className="alert" severity="error">
            {prop.error}
          </Alert>
        )}
        <TextField
          id="stock-read-only"
          label="Stock"
          name="stockName"
          value={prop.stock.stockName}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
        <br />
        <TextField
          id="price-input"
          label="Price"
          type="number"
          variant="standard"
          name="price"
          onChange={handleChange}
          value={prop.updatedStockValues.price}
          on
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="quantity-input"
          label="Quantity"
          type="number"
          variant="standard"
          name="quantity"
          onChange={handleChange}
          value={prop.updatedStockValues.quantity}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </Box>
  );
}
