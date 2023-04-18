import React from 'react'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
function DoneBtn(props) {
  return (
    <button onClick={props.onClick}> <DoneOutlineIcon/></button>
  )
}

export default DoneBtn