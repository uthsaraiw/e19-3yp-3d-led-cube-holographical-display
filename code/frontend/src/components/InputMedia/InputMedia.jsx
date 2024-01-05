import React from "react";

function InputMedia(props) {
  return (
    <div>
      <input
        type="file"
        accept={props.acceptedFileTypes}
        ref={props.fileInputRef}
        onChange={props.handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default InputMedia;
