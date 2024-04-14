import { useState , useEffect } from 'react'
import './App.css'
import Login from './MatrixDnA/Login.jsx'
import Analytics from './MatrixDnA/Analytics.jsx'

function App() {

  const [apiUrl, setApiUrl] = useState("https://localhost:7180/api/users");
  const [apiUrl2, setApiUrl2] = useState("https://localhost:7180/api/Seats");
  const [users, setUsers] = useState([]);
  const [seats, setSeats] = useState([]);
  const [first, setfirst] = useState(false)

//לקיחת דאטה מהמערכת
const fetchData2 = async () => {
  const response = await fetch(apiUrl2);
  const data = await response.json();
  return data;
};

    //לקיחת דאטה מהמערכת
    const fetchData = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    };


    useEffect(() => {
      const fetchDataFromApi = async () => {
        const data = await fetchData();
        const data2 = await fetchData2();
        setUsers(data);
        setSeats(data2);
      };
      fetchDataFromApi();
    } , []);
  

  return (
    <>
    
    { first ?<Login usersArr={users} />: null}
    {seats.length > 0  ? <Analytics seatsUser={seats} /> : null}
      
    </>
  )
}

export default App
