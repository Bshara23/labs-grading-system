import React from "react";
import "./BasicButton.css";
import Button from "react-bootstrap/Button";
const BasicButton = ({ onClick, label }) => {
  return (
    <>
      <Button onClick={onClick} className="btnContainer" variant="primary">
        {label}
      </Button>
    </>
  );
};

export default BasicButton;
