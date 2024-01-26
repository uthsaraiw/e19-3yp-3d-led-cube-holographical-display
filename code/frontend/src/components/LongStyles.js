// card styles. Used in FeedCard.js

const TextFieldStylesForCard = {
  color: "white",
  borderRadius: "50px",
  marginLeft: "10px",
  "& label.Mui-focused": {
    color: "black",
    fontSize: "12px",
  },
  "& label": { color: "white" },
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
