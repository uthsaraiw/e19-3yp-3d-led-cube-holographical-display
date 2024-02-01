// card styles. Used in FeedCard.js

import colors from "../styles/colors";

const TextFieldStylesForCard = {
  color: "white",
  borderRadius: "50px",
  marginLeft: "10px",
  padding: "0px",
  "& label.Mui-focused": {
    color: colors.BlackLow2,
    fontSize: "10px",
  },
  "& .MuiInputBase-input": {
    color: colors.BlackLow2, // replace 'desiredColor' with the color you want
  },
  "& label": { color: colors.BlackLow2 },
  "& .MuiInput-underline:after": { borderBottomColor: "white" },
  "& .MuiInput-underline:before": { borderBottomColor: "white" },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: "purple",
  },
  "& .MuiFilledInput-underline:before": {
    borderBottomColor: "white",
  },
  "& .MuiFilledInput-root": {
    height: "40px",
    bgcolor: "#303030",
    textAlign: "center",
    width: "100%",
  },
};

const TextFieldStylesForSettings = {
  color: "white",
  ".MuiInputBase-input": { color: "white" },
  "& label.Mui-focused": { color: "white" },
  "& .MuiInput-underline:after": { borderBottomColor: "white" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "white" },
    "&:hover fieldset": { borderColor: "white" },
    "&.Mui-focused fieldset": { borderColor: "white" },
  },
};

export { TextFieldStylesForCard, TextFieldStylesForSettings };
