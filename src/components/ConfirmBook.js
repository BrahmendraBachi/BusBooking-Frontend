import React from 'react'

const ConfirmBook = (props) => {
  return (
    <div>
     <div className='p-1'></div>
     {/* <div className='p-5'></div> */}
      {
       props.confirm()
      }
     <div className='p-1'></div>
    </div>
  )
}

export default ConfirmBook
