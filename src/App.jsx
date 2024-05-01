import { useState , useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import './App.css'
import Login from './MatrixDnA/Login.jsx'
import Matrix from './MatrixDnA/MatrixDna.jsx'

function App() {

  const [apiUrl, setApiUrl] = useState("https://proj.ruppin.ac.il/cgroup73/test2/tar1/api/User");
  const [apiUrl2, setApiUrl2] = useState("https://proj.ruppin.ac.il/cgroup73/test2/tar1/api/Reservedplace");
  const [apiUrl3, setApiUrl3] = useState("https://proj.ruppin.ac.il/cgroup73/test2/tar1/api/Class");

  const [users, setUsers] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [classes, setClasses] = useState([])
  const [first, setfirst] = useState(false)

//לקיחת דאטה מהמערכת
//const fetchData2 = async () => {
  //const response = await fetch(apiUrl2);
 // const data = await response.json();
  //return data;
//};

useEffect(() => {

                fetch(apiUrl3, {
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
                      console.log("fetch btnFetchGetClass= ", result);
                      setClasses(result);
                    },
                    (error) => {
                      console.log("err post=", error);
                    });

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
                    const newResult = result.map(item => {
                      let newd = new Date(item.date);
                      const updatedDate = new Date(newd.getTime() + (3 * 60 * 60 * 1000));
                      return {...item , date: updatedDate}
                    })
                    console.log("fetch Reserves= ", newResult);
                    setReservedSeats(newResult);
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
    <Router>
      <Routes>
        {users.length > 0 && reservedSeats.length > 0 && classes.length > 0 &&(
          <Route path="/" element={<Login usersArr={users} classArr={classes} />} />
        )}
        <Route path="/matrix" element={<Matrix seatsUser={reservedSeats} />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
