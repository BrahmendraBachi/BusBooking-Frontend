import React from 'react'
import '../Grid.css'

const ShowSeats = (props) => {
 console.log(props)

 console.log(props.AllSeats);

  return (
    <div>
      {
          props.AllSeats.map(
            (seat, index) => (
              <tr key={index}>
                <div className='side-by-side'>
                  <div className='p-1'></div>
                  {
                    props.checkBooked(seat[0])
                  }
                  <div className='p-1'></div>
                  {
                    props.checkBooked(seat[1])
                  }
                  <div className='p-4'></div>
                  {
                    props.checkBooked(seat[2])
                  }
                  <div className='p-1'></div>
                  {
                    props.checkBooked(seat[3])
                  }
                </div>
                {/* <div className='p-1'></div> */}
              </tr>
            )
          )
        }
        <div className='side-by-side'>
          <div className='p-1'></div>
         {
           props.checkBooked('21')
         }
         <div className='p-1'></div>
         {
           props.checkBooked('22')
         }
         <div className='p-1'></div>
         {
           props.checkBooked('23')
         }
         <div className='p-1'></div>
         {
           props.checkBooked('24')
         }
         <div className='p-1'></div>
         {
           props.checkBooked('25')
         }
        </div>
    </div>
  )
}

export default ShowSeats
