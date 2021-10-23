import React from "react";
import { Button } from "@material-ui/core";

const Card = ({ id, title, onSelect }) => {
  return (
    <div className="term">
      <h1>{title}</h1>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={() => onSelect(id)}
      >
        Select
      </Button>
    </div>
  );
};

export default Card;
