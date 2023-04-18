import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
function EditBtn(props) {
  return (
   <button onClick={props.onClick}>
<CreateIcon/>
   </button>
  )
}

export default EditBtn