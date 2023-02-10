import logo from './logo.svg';
import './App.css';
import { useGoogleLogin  } from '@react-oauth/google';
import axios from "axios";
function App() {

  const login = useGoogleLogin({
    onSuccess: codeResponse => {
      axios.post('http://localhost:4000/api/create-tokens',{code : codeResponse}).then(res => {
          console.log(res,'ressss');
          localStorage.setItem('google',JSON.stringify(res.data))
        }).catch(error => {
        console.log(error,'erro')
      })
    },
    flow: 'auth-code',
  });

  const submitCreateEvent = () => {
    let data = {
      summary : 'test',
      description : 'test description',
      location : 'test localtion',
      startDateTime : '2023-02-10 11:00:00',
      endDateTime : '2023-02-10 12:00:00',
    };
    axios.post('http://localhost:4000/api/create-event',data).then(res => {
      console.log(res,'ressss');
      // localStorage.setItem('google',JSON.stringify(res.data))
    }).catch(error => {
      console.log(error,'erro')
    })
  }

  const submitUpdateEvent = () => {
    let data = {
      summary : 'test update',
      description : 'test description update',
      location : 'test localtion update',
      startDateTime : '2023-02-10 07:00:00',
      endDateTime : '2023-02-10 08:00:00',
    };
    axios.post('http://localhost:4000/api/update-event',data).then(res => {
      console.log(res,'ressss');
      // localStorage.setItem('google',JSON.stringify(res.dasxxta))
    }).catch(error => {
      console.log(error,'erro')
    })
  }

  return (
    <div className="App">
     <button onClick={() => login()}>  Sign in with Google </button>
     <button onClick={() => submitCreateEvent()}>  Submit Create Event </button>
     <button onClick={() => submitUpdateEvent()}>  Submit Create Event </button>
    </div>
  );
}

export default App;
