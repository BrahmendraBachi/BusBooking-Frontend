import axios from "axios";

const baseUrl_For_User = "http://localhost:9090/user"

const baseUrl_For_Bus = "http://localhost:9090"

class userService{

 addUser(user)
 {
  console.log("Add user is Triggerd");
  return axios.post(`${baseUrl_For_User}/add-user`,user);
 }

 checkUser(user)
 {
  return axios.post(`${baseUrl_For_User}/login`,user);
 }

 getUserById(id)
 {
  return axios.get(`${baseUrl_For_User}/get-user-by-id/${id}`);
 }

 getTripsCompleted(id)
 {
  return axios.get(`${baseUrl_For_Bus}/get-completed-trips/${id}`);
 }

 getTripOnLive(id)
 {
  return axios.get(`${baseUrl_For_Bus}/get-onLive-trips/${id}`);
 }

 getUpcomingTrips(id)
 {
  return axios.get(`${baseUrl_For_Bus}/get-upcoming-trips/${id}`);
 }

 checkUserByEmailId(emailId)
 {
  return axios.get(`${baseUrl_For_User}/check-user-by-emailId/${emailId}`);
 }

 changePassword(newPassword)
 {
  return axios.post(`${baseUrl_For_User}/change-password`,newPassword);
 }


}

export default new userService