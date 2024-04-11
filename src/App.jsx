import { useState , useEffect } from 'react'
import './App.css'
import Login from './MatrixDnA/Login.jsx'
import Analytics from './MatrixDnA/Analytics.jsx'

function App() {

  const [apiUrl, setApiUrl] = useState("https://localhost:7180/api/users");
  const [users, setUsers] = useState([]);
  const [first, setfirst] = useState(false)

//לקיחת דאטה מהמערכת
  function fetchData2(){
    fetch(apiUrl,{
      method: 'GET' ,
      headers: new Headers({
        'Contect-Type' : 'application/json; charset=UTF-8',
        'Accept' : 'application/json; charset=UTF-8',
      })
    })

      .then(res => {
        console.log('res=' , res);
        console.log('res.status=' , res.status);
        console.log('res=' , res.ok);
        return res.json()
      })

      .then(
        (result) => {
          console.log(result);
          return result;
        })

      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

    }

    //לקיחת דאטה מהמערכת
    const fetchData = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    };


    useEffect(() => {
      const fetchDataFromApi = async () => {
        const data = await fetchData();
        setUsers(data);
      };
      fetchDataFromApi();
    } , []);
  

  return (
    <>
    
    { first ?<Login usersArr={users} />:
      <Analytics />}
      
    </>
  )
}

export default App
