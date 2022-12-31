import React from 'react'
import axios from 'axios'

const baseUrl_For_Bus = "http://localhost:9090";

class busService
{
 getBuses(search)
 {
  return axios.post(`${baseUrl_For_Bus}/getBuses`,search);
 }

 bookBusTickets(tickets)
 {
  console.log(tickets);
  return axios.post(`${baseUrl_For_Bus}/bookTickets`,tickets);
 }

 cancelBooking(id)
 {
  return axios.delete(`${baseUrl_For_Bus}/cancel-booking/${id}`);
 }
}

export default new busService