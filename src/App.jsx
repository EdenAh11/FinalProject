import { useState , useEffect } from 'react'
import './App.css'
import Login from './MatrixDnA/Login.jsx'
import Matrix from './MatrixDnA/MatrixDna.jsx'

function App() {

  const [apiUrl, setApiUrl] = useState("https://localhost:7180/api/User");
  const [apiUrl2, setApiUrl2] = useState("https://localhost:7180/api/Reservedplace");
  const [users, setUsers] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [first, setfirst] = useState(false)

//לקיחת דאטה מהמערכת
//const fetchData2 = async () => {
  //const response = await fetch(apiUrl2);
 // const data = await response.json();
  //return data;
//};

useEffect(() => {

                fetch(apiUrl2, {
                method: 'GET',
                headers: new Headers({
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Accept': 'application/json; charset=UTF-8',
                })
                })
                .then(res => {
                  console.log('res=', res);
                  console.log('res.status', res.status);
                  console.log('res.ok', res.ok);
                  return res.json()
                  })
                .then(
                  (result) => {
                    console.log("fetch btnFetchGetStudents= ", result);
                    setReservedSeats(result);
                  },
                  (error) => {
                    console.log("err post=", error);
                  });

              
              fetch(apiUrl, {
                method: 'GET',
                headers: new Headers({
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Accept': 'application/json; charset=UTF-8',
                })
              })
                .then(res => {
                  console.log('res=', res);
                  console.log('res.status', res.status);
                  console.log('res.ok', res.ok);
                  return res.json()
                  })
                .then(
                  (result) => {
                    console.log("fetch btnFetchGetStudents= ", result);
                    setUsers(result);
                  },
                  (error) => {
                    console.log("err post=", error);
                  });

                 
              } , []);



    //useEffect(() => {
      //const fetchDataFromApi = async () => {
       // const data = await fetchData();
       // const data2 = await fetchData2();
       // setUsers(data);
       // setSeats(data2);
     // };
      //fetchDataFromApi();
    //} , []);
  

  return (
    <>
    
    { first > 0 ?<Login usersArr={users} />: null} 
    {reservedSeats.length > 0 ? <Matrix seatsUser={reservedSeats} /> : null}
    
      
    </>
  )
}

export default App
