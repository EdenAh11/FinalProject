import { useState , useEffect } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import './App.css'
import Login from './MatrixDnA/Login.jsx'
import Matrix from './MatrixDnA/MatrixDna.jsx'

function App() {

  const [apiUrl, setApiUrl] = useState("https://proj.ruppin.ac.il/cgroup73/test2/tar1/api/User");
  const [apiUrl2, setApiUrl2] = useState("https://proj.ruppin.ac.il/cgroup73/test2/tar1/api/Reservedplace");
  const [apiUrl3, setApiUrl3] = useState("https://proj.ruppin.ac.il/cgroup73/test2/tar1/api/Class");
  const [apiUrl4, setApiUrl4] = useState("https://proj.ruppin.ac.il/cgroup73/test2/tar1/api/Requests");

  const [users, setUsers] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [classes, setClasses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [first, setfirst] = useState(false)


// useEffect(() => {


//                 fetch(apiUrl4, {
//                   method: 'GET',
//                   headers: new Headers({
//                     'Content-Type': 'application/json; charset=UTF-8',
//                     'Accept': 'application/json; charset=UTF-8',
//                   })
//                   })
//                   .then(res => {
//                     console.log('res=', res);
//                     console.log('res.status', res.status);
//                     console.log('res.ok', res.ok);
//                     return res.json()
//                     })
//                   .then(
//                     (result) => {
//                       console.log("fetch btnFetchGetClass= ", result);
//                       setRequests(result);
//                     },
//                     (error) => {
//                       console.log("err post=", error);
//                     });



//                 fetch(apiUrl3, {
//                   method: 'GET',
//                   headers: new Headers({
//                     'Content-Type': 'application/json; charset=UTF-8',
//                     'Accept': 'application/json; charset=UTF-8',
//                   })
//                   })
//                   .then(res => {
//                     console.log('res=', res);
//                     console.log('res.status', res.status);
//                     console.log('res.ok', res.ok);
//                     return res.json()
//                     })
//                   .then(
//                     (result) => {
//                       console.log("fetch btnFetchGetClass= ", result);
//                       setClasses(result);
//                     },
//                     (error) => {
//                       console.log("err post=", error);
//                     });

//                 fetch(apiUrl2, {
//                 method: 'GET',
//                 headers: new Headers({
//                   'Content-Type': 'application/json; charset=UTF-8',
//                   'Accept': 'application/json; charset=UTF-8',
//                 })
//                 })
//                 .then(res => {
//                   console.log('res=', res);
//                   console.log('res.status', res.status);
//                   console.log('res.ok', res.ok);
//                   return res.json()
//                   })
//                 .then(
//                   (result) => {
//                     const newResult = result.map(item => {
//                       let newd = new Date(item.date);
//                       const updatedDate = new Date(newd.getTime() + (3 * 60 * 60 * 1000));
//                       return {...item , date: updatedDate}
//                     })
//                     console.log("fetch Reserves= ", newResult);
//                     setReservedSeats(newResult);
//                   },
//                   (error) => {
//                     console.log("err post=", error);
//                   });

              
//               fetch(apiUrl, {
//                 method: 'GET',
//                 headers: new Headers({
//                   'Content-Type': 'application/json; charset=UTF-8',
//                   'Accept': 'application/json; charset=UTF-8',
//                 })
//               })
//                 .then(res => {
//                   console.log('res=', res);
//                   console.log('res.status', res.status);
//                   console.log('res.ok', res.ok);
//                   return res.json()
//                   })
//                 .then(
//                   (result) => {
//                     console.log("fetch btnFetchGetStudents= ", result);
//                     setUsers(result);
//                   },
//                   (error) => {
//                     console.log("err post=", error);
//                   });

                 
//               } , []);







//לקיחת דאטה מהשרת



useEffect(() => {
  
      const fetchData = async () =>{
        try{

          const responseUser = await axios.get(apiUrl);
          const responseReserve = await axios.get(apiUrl2);
          const responseClass= await axios.get(apiUrl3);
          const responseRequest = await axios.get(apiUrl4);

          setUsers(responseUser.data || []);
          setReservedSeats(responseReserve.data || []);
          setClasses(responseClass.data || []);
          setRequests(responseRequest.data || []);

          console.log(responseUser.data);
          console.log(responseReserve.data);
          console.log(responseClass.data);
          console.log(responseRequest.data);


        }
        catch (error)
        {
          console.log("err post=", error);
        }
      };
      
      fetchData();
      }, [])


  

  return (
    <>
    <Router>
      <Routes>
    { users.length > 0 && reservedSeats.length > 0  &&
         (<Route path="/" element={<Login usersArr={users} classArr={classes} />} />)
    }

    { classes.length > 0 && requests.length > 0 &&
       (<Route path="/matrix" element={<Matrix userA={users} seatsUser={reservedSeats} reqArr={requests}/>} />)
    }
      </Routes>
    </Router>
      
    </>
  )
}

export default App
