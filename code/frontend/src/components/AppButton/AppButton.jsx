import appbutton from "./appbutton.css";
import { Button } from "@mui/material";

export default function AppButton(props) {
  return (
    <Button className="customButton" variant="contained">
      Upload
    </Button>
  );
}
