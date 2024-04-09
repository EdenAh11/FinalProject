import { useState , useEffect } from 'react'
import './App.css'
import Login from './MatrixDnA/Login.jsx'
import Analytics from './MatrixDnA/Analytics.jsx'

function App() {

  const [apiUrl, setApiUrl] = useState("https://localhost:7180/api/users");
  const [users, setUsers] = useState([]);



  useEffect(() => {
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
          setUsers(result);
      })
  }, [])
  

  return (
    <>
    
      <Login users={users} />
      
    </>
  )
}

export default App
