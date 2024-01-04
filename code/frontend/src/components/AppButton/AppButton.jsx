import React from "react";
import "./appbutton.css"; // Import the CSS file
import { Button } from "@mui/material";

export default function AppButton(props) {
  return (
    <Button
      sx={{
        background: "linear-gradient(180deg, #9039FF 0%, #001FC0 100%)",
        borderRadius: "20px",
        textTransform: "none",
        width: props.width || "auto",
      }}
      variant="contained"
    >
      {props.title}
    </Button>
  );
}


