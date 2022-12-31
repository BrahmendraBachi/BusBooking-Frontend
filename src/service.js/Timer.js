import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


class Timer{


 timer=(props)=>{
  console.log("Cancel is triggered");
    const timer = setTimeout(() => {
     toast.dismiss();
  }, props.time);

   return () => clearTimeout(timer);
  }
}

export default new Timer