import React, { useState } from 'react'
import '../Popup.css'

const Popup = (props) => {

  // const setTrigger=()=>{
  //   props.trigger = false;
  // }
  return ( props.trigger )?(
   <div className="popup">
    <div className='popup-inner'>
     <button className='close-btn' onClick={()=> this.props.setTrigger(false)}>Close</button>
      { props.children }
    </div>
    </div>   
  ) : ""
}

export default Popup
