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
        data-testid="file-input"
      />
    </div>
  );
}

export default InputMedia;
