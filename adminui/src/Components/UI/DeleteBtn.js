import React from "react";
import DeleteIcon from '@mui/icons-material/Delete'

function DeleteBtn(props) {
  return (
    <button onClick={props.onClick}>
      <DeleteIcon/>
    </button>
  );
}

export default DeleteBtn;
