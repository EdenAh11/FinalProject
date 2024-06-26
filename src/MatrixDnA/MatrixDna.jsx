import {React , useState , createContext , useEffect} from 'react'
import axios from 'axios';
import {Container , Row , Col , Button  } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import { FaEraser } from "react-icons/fa";

import TextField from '@mui/material/TextField';

import { styled } from '@mui/system';
import { TablePagination, tablePaginationClasses as classes } from '@mui/base/TablePagination';



import WeekendIcon from '@mui/icons-material/Weekend';
import plot from '/img/plot.png'

import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddIcon from '@mui/icons-material/Add';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import SendIcon from '@mui/icons-material/Send';

import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/MatrixDna.css'
import './CSS/Analytics.css'
import './CSS/Delivery.css'
import './CSS/Classtified.css'
import './CSS/Meeting.css'
import './CSS/Requests.css'


import ImgMatrix from '/img/imageMatrix.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Opacity } from '@mui/icons-material';





export default function MatrixDnA(props) {
  const location = useLocation();

  //שם משתמש
  const [user, setUser] = useState('');
//שם מחלקה
  const [className, setClassName] = useState('')
  //מערך משתמשים מהדאטה
  const [seatUsers, setSeatUsers] = useState(props.seatsUser);
//כל המשתמשים
  const [AllUsers, setAllUsers] = useState(props.userA);
  //מערך הבקשות
  const [allRequests, setallRequests] = useState(props.reqArr);
//לינק לשרת
  const [apiUrl2, setApiUrl2] = useState("https://proj.ruppin.ac.il/cgroup73/test2/tar1/api/Reservedplace");
  //לינק לשרת בקשות
  const [apiUrl3, setApiUrl3] = useState("https://proj.ruppin.ac.il/cgroup73/test2/tar1/api/Requests");
  //לינק לשרת אימייל
  const [apiUrl4, setApiUrl4] = useState("https://proj.ruppin.ac.il/cgroup73/test2/tar1/api/Email");
  //תאריך נוכחי
  const [date, setDate] = useState(getCurrentDate());
  //בחירת תאריך למקום
  const [selectedDate, setSelectedDate] = useState(new Date());
  //הצגת לוח שנה לבחירת מקום
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [currentSeat, setCurrentSeat] = useState(null);
  //לאחר שריון התאריך
  const [showChoose, setShowChoose] = useState(false);
  //טשטוש הרקע
  const [isBlurred, setIsBlurred] = useState(false);
    //התפריט לאחר לחיצה על מקום
    const [isHidden, setIsHidden] = useState(true);
  //נעילת לחצן תאריך
  const [isDisabled, setIsDisabled] = useState(false);
  //כסא פנוי
  const [greenColor, setGreenColor] = useState("#76BC8B");
  //כסא תפוס
  const [redColor, setRedColor] = useState("#E87D7D");
  //כסא בתהליך
  const [blueColor, setBlueColor] = useState("#33BBFF");

  const [grayColor, setGrayColor] = useState("rgba(199, 199, 201, 1)");
  //מחלקת אנליטיקס
  const [classAnalytics, setClassAnlytics] = useState(false);

  const [btnFinishShow, setbtnFinishShow] = useState(false);

  const [classDelivery, setClassDelivery] = useState(false);

  const [classtified, setClasstified] = useState(false);

  const [meeting, setMeeting] = useState(false);

  const [requests, setRequests] = useState(false);

  const [editUsers, seteditUsers] = useState(false);

  const [pickDiv, setpickDiv] = useState("");

  const [confirmDiv, setConfirmDiv] = useState("");

  const [NewReq, setNewReq] = useState("");
//נושא בקשה חדשה
  const [subReq, setSubReq] = useState("");
//פירוט בקשה חדשה
  const [detailReq, setdetailReq] = useState("");
//תפריט הבקשה החדשה
  const [newReqY, setnewReqY] = useState(false);
//אישור סופי של הבקשה
  const [newReqSuccess, setnewReqSuccess] = useState(null);
  //סטטוס הבקשה
  const [checkStatus, setcheckStatus] = useState('ממתין');

//מנהל
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);




  const [catch1Hide, setCatch1Hide] = useState(true);
  const [catch1Blur, setCatch1Blur] = useState(false);
  const [catch2Hide, setCatch2Hide] = useState(true);
  const [catch2Blur, setCatch2Blur] = useState(false);
  const [catch3Hide, setCatch3Hide] = useState(true);
  const [catch3Blur, setCatch3Blur] = useState(false);
  const [catch4Hide, setCatch4Hide] = useState(true);
  const [catch4Blur, setCatch4Blur] = useState(false);

  const [analyticsSeats, setAnalyticsSeats] = useState([{
                  "desk":{"AdeskA": ["A1","A2","A3","A4"] ,
                          "AdeskB": ["B1","B2","B3"] ,
                          "AdeskC": ["C1","C2","C3"] },
                  "desk2":{"AdeskE": ["AseatE1","AseatE2","AseatE3","AseatE4","AseatE5" , "AseatE6"],
                          "AdeskF": ["AseatF1","AseatF2","AseatF3","AseatF4","AseatF5" , "AseatF6"]
                        }}]);

  const [deliverySeats, setDeliverySeats] = useState({
            "Ddesk":{"DdeskA" : ["DseatA1", "DseatA2","DseatA3"],
                    "DdeskB" : ["DseatB1","DseatB2","DseatB3"],
                    "DdeskC" : ["DseatC1","DseatC2","DseatC3","DseatC4"],
                    "DdeskD": ["DseatD1" , "DseatD2" , "DseatD3" ,"DseatD4"] , 
                    "DdeskE" : ["DseatE1" , "DseatE2","DseatE3" ], 
                    "DdeskF" : ["DseatF1" , "DseatF2"]
                  }});

const [hoveredSeat, setHoveredSeat] = useState(null);





  const rows = AllUsers.sort((a, b) => (a.userId < b.userId ? -1 : 1));

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};


const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;


                                                  

          useEffect(() => {
                        setUser(location.state.userId);
                        setClassName(location.state.classId);
                        chooseClasses(location.state.classId);

                        const fetchData = async () =>{
                          try{
                            const responseReq = await axios.get(apiUrl3);
                            setallRequests(responseReq.data);


                            const responseSeatUsers = await axios.get(apiUrl2);
                            const newResult = responseSeatUsers.data.map(item => {
                              let newd = new Date(item.date);
                              const updatedDate = new Date(newd.getTime() + (3 * 60 * 60 * 1000));
                              return {...item , date: updatedDate}
                            })
                      
                            console.log("fetch Reserves1= ", newResult);
                            setSeatUsers(newResult);

                          }
                          catch (error)
                              {
                                console.log("err post=", error);
                              }
                            };
                            
                            fetchData();

                  //       fetch(apiUrl3, {
                  //         method: 'GET',
                  //         headers: new Headers({
                  //           'Content-Type': 'application/json; charset=UTF-8',
                  //           'Accept': 'application/json; charset=UTF-8',
                  //         })
                  //       })
                  //         .then(res => {
                  //           console.log('res=', res);
                  //           console.log('res.status', res.status);
                  //           console.log('res.ok', res.ok);
                  //           return res.json()
                  //           })
                  //         .then(
                  //           (result) => {
                  //                 console.log("R = " ,result);
                  //                 setallRequests(result);
                           
                  //           },
                  //           (error) => {
                  //             console.log("err post=", error);
                  //           });


                  //         fetch(apiUrl2, {
                  //           method: 'GET',
                  //           headers: new Headers({
                  //             'Content-Type': 'application/json; charset=UTF-8',
                  //             'Accept': 'application/json; charset=UTF-8',
                  //           })
                  //         })
                  //           .then(res => {
                  //             console.log('res=', res);
                  //             console.log('res.status', res.status);
                  //             console.log('res.ok', res.ok);
                  //             return res.json()
                  //             })
                  //           .then(
                  //             (result) => {
                  //               const newResult = result.map(item => {
                  //                 let newd = new Date(item.date);
                  //                 const updatedDate = new Date(newd.getTime() + (3 * 60 * 60 * 1000));
                  //                 return {...item , date: updatedDate}
                  //               })
                          
                  //               console.log("fetch Reserves1= ", newResult);
                  //               setSeatUsers(newResult);
                  //             },
                  //             (error) => {
                  //               console.log("err post=", error);
                  //             });

                  //  console.log(seatUsers);
            
          }, [pickDiv , selectedDate , newReqSuccess]);
          



      
               /// להוסיף פילטור של ימים
      function statusSeats(e){

        return seatUsers.some(users => {
          const [pickDate,selectD] = [new Date(users.date), new Date(selectedDate)];
          const [dateUser,dateSelect] = [getDate(pickDate) , getDate(selectD)];
          
              return(users.table + users.seat === e && dateUser === dateSelect);
        });
     }

     function statusSeats2(e){

      return seatUsers.some(users => {
        const [pickDate,selectD] = [new Date(users.date), new Date(selectedDate)];
        const [dateUser,dateSelect] = [getDate(pickDate) , getDate(selectD)];
      
        
            return(users.table + users.seat === e && dateUser === dateSelect && users.userid === user);
      });
   }

   



  //תאריך נוכחי לכותרת
  function getCurrentDate() {
    var currentDate = new Date();

    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; 
    var year = currentDate.getFullYear();

    var formattedDate = day + '/' + month + '/' + year;

    return formattedDate;
}

//המרת תאריך למחרוזת
function getDate(date) {

  var day = date.getDate();
  var month = date.getMonth() + 1; 
  var year = date.getFullYear();

  var formattedDate = day + '/' + month + '/' + year;

  return formattedDate;
}

//מציאת היום של התאריך
function getDayOfWeek(date) {
  const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  const dayIndex = new Date(date).getDay();
  return daysOfWeek[dayIndex];
}

//בחירת תאריך 
const handleDateChange = (date) => {
      setSelectedDate(date);
      console.log(date);
      setDate(getDate(date));
      setShowChoose(true);
      setShowDatePicker(false);
      setIsDisabled(true);

 
};


//בחירת משתמשים
function UserManagement(){
  seteditUsers(true);
  setMeeting(false);
  setClassDelivery(false);
  setClassAnlytics(false);
  setClasstified(false);
  setRequests(false);
  console.log(rows);
  }

// בחירת מושב
 function pickSeat(e){
      e.style.backgroundColor = blueColor;

      const confirmDiv = (
             
                 <div id="confirmDiv">
                  <label>.המושב אושר בהצלחה</label>
                  <CheckCircleIcon id="checkIconConfirm" />
              </div>
             
      )
      setConfirmDiv(confirmDiv);

      const btnFinish = (
        <input type='button' onClick={() => {finishChose(e)}} id="endBtn" value="סיום" />
      )

      setbtnFinishShow(btnFinish);
                  
  

      }


//תפריט לאחר לחיצת על מקום
      function finishChose(e){

        let x = e;
        setIsBlurred(true);
        setIsHidden(false);

        const pickDiv = (
          <div id="pickDiv">
                      <DisabledByDefaultIcon id="exitIcon" onClick={(e) => {exitMenu(x.style)}} />
                      <CheckCircleIcon id="checkIcon" />
                      <p id="textPick">  המושב שוריין לתאריך {date} יום {getDayOfWeek(selectedDate)}</p>
                      <button id='confimPick' onClick={(e) => {confirmSeat(x)}}>אישור הבחירה וסיום<CheckIcon /></button>
                      <button id='changePick'>שינוי הבחירה<DriveFileRenameOutlineIcon /></button>
                      <button id='anotherPick'>שיריון מושב נוסף<ControlPointIcon /></button>
            </div>
            )
    
    
            setpickDiv(pickDiv);

      }

  //אישור כיסא
      const confirmSeat = async (e) => {
          
          setIsBlurred(false);
          setIsHidden(true);
    
    
    
    
          const [desk, seatNumber] = e.id.match(/[A-Z]+|[0-9]+/g);
        
          const newR = {
            UserID: user,
            Class: className ,
            Date: selectedDate , 
            Seat : seatNumber ,
            Table: desk 
          }

          let datePost = getDate(selectedDate);

          const email = {
            to: "edenah11@gmail.com" , 
            subject : "שריון מקום ישיבה" ,
            body : `<div> <h1>שיריון מקום ישיבה עבר בהצלחה</h1> <p> ${desk + seatNumber}   מקום ישיבה </p>`+                   
                             `<p>בתאריך : ${datePost}</p></div>`
          }
    
                  // fetch(apiUrl2, {
                  //   method: 'POST',
                  //   headers: new Headers({
                  //     'Content-Type': 'application/json; charset=UTF-8',
                  //     'Accept': 'application/json; charset=UTF-8',
                  //   }) ,
                  //   body: JSON.stringify(newR)
                  // })


                  //   .then(res => {
                  //     console.log('res=', res);
                  //     console.log('res.status', res.status);
                  //     console.log('res.ok', res.ok);
                  //     return res.json()
                  //     })
                  //   .then(
                  //     (result) => {
                  //       console.log("fetch btnFetchPostReserve= ", result);
                  //       setReservedSeats(result);
                  //     },
                  //     (error) => {
                  //       console.log("err post=", error);
                  //     });

                   const response = await axios.post(apiUrl2, newR);

                    //const response2 = await axios.post(apiUrl4, email);


                  
                e.disabled = true;
                setpickDiv(null);
                setbtnFinishShow(null);
                setConfirmDiv(null);
    
        }
      


    //יציאה מהתפריט
    function exitMenu(e){

      setIsBlurred(false);
      setIsHidden(true)
      setpickDiv(null);
    }


    //בחירת מחלקות
    function chooseClasses(e){
      if(e == 'analytics'){
        setClasstified(false);
        setClassDelivery(false);
        setMeeting(false);
        setRequests(false);
        setClassAnlytics(false);

        setClassName(e);
      }
      if(e == "delivery"){
        setClasstified(false);
        setClassAnlytics(false);
        setMeeting(false);
        setRequests(false);
        setClassDelivery(true);
        
        setClassName(e);

      }
      if(e == 'classtified'){
        setClassDelivery(false);
        setClassAnlytics(false);
        setMeeting(false);
        setRequests(false);
        setClasstified(true);
        
        setClassName(e);
      }

      if(e == 'בקשות'){
        setClassDelivery(false);
        setClassAnlytics(false);
        setMeeting(false);
        setClasstified(false);
        setRequests(true);

        setClassName(null);

      }

    }

    
    function showMeeting(){
      setMeeting(true)
      setClassDelivery(false);
      setClassAnlytics(false);
      setClasstified(false);
      setRequests(false);
    }




    //בחירת כיסא חוזר
    function LastSeatChose(e){
      if(e.checked){
        const sortedData = seatUsers.slice().sort((a, b) => a.date - b.date);
        let lastDate = new Date();
        setSelectedDate(lastDate);

        let lastChoose = "";
            sortedData.map(item => {
                const current = new Date();
                if(item.date < current && user == item.userid)
                {
                  lastDate = item.date;
                  lastChoose = item.table + item.seat;

                  
                }
              })
        console.log(sortedData);
        console.log(lastChoose);

        const chooseID = document.getElementById(lastChoose);
        

        pickSeat(chooseID);
      }
    }

    function NewRequests(){
        setRequests(false);
        setnewReqY(true);
                          
    }

      const sendReq = async () =>{
        
        let requestsDate = new Date();

        const newRequest = {
          requestid1: allRequests.length + 1,
          userId1: user ,
          topic1: subReq , 
          detail1 : detailReq ,
          requestsDate1: requestsDate ,
          status:checkStatus
        }

        const divAcceptReq =  (<div id='confirmReq'>
                <DisabledByDefaultIcon id="xIcon" onClick={exitReq} />   
                <h1 > <label>בקשה מספר {newRequest.requestid1}#</label> / חדר ישיבות</h1>   
                <p>הבקשה נשלחה לאישור המנהלת. תקבל/י התראה ברגע שתיענה.</p>   
                <button id="acceptReq" onClick={exitReq}>אישור</button>                                                                         
          </div>)

        setnewReqSuccess(divAcceptReq);
        setnewReqY(false);

        const email = {
          to: "edenah11@gmail.com" , 
          subject : newRequest.topic1 ,
          body : newRequest.detail1
        }

        const responseAllReq = await axios.post(apiUrl3, newRequest);
        //const responseEmailReq = await axios.post(apiUrl4, email);

        setallRequests(responseAllReq);

        


  
                // fetch(apiUrl3, {
                //   method: 'POST',
                //   headers: new Headers({
                //     'Content-Type': 'application/json; charset=UTF-8',
                //     'Accept': 'application/json; charset=UTF-8',
                //   }) ,
                //   body: JSON.stringify(newRequest)
                // })
                //   .then(res => {
                //     console.log('res=', res);
                //     console.log('res.status', res.status);
                //     console.log('res.ok', res.ok);
                //     return res.json()
                //     })
                //   .then(
                //     (result) => {
                //       console.log("fetch NewPost= ", result);
                //       setallRequests(result);
                //     },
                //     (error) => {
                //       console.log("err post=", error);
                //     });
      }

      function exitReq(){
        setnewReqSuccess(null);

       
      }


    

    

    //תפיסת שולחנות בחדר הישיבות
    function catchDesk1(){
      setCatch1Blur(true);
      setCatch1Hide(false);
    }
    function catchDesk2(){
      setCatch2Blur(true);
      setCatch2Hide(false);
    }
    function catchDesk3(){
      setCatch3Blur(true);
      setCatch3Hide(false);
    }
    function catchDesk4(){
      setCatch4Blur(true);
      setCatch4Hide(false);
    }



    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        };






 
  return (
    <>
      <Container id='MatrixDiv' fluid style={{filter: isBlurred ? 'blur(4px)' : 'none'}}>
          <Row id="head">
            <Col id="LeftUp">
              <img id='MatrixImg' src={ImgMatrix}/>
            </Col>
            <Col id="RightUp">
              <div id="Sdiv"><div id="imgS"><label>S</label></div>  </div>
              <div id="divName"> <label pUser>!שלום {user} </label>
                                 <label id="pDate"> {getCurrentDate()} </label></div>
        
            </Col>
          </Row>
          <Row id="body">
          <Col xs={12} sm={9}>
      <div id="places">

      {confirmDiv}
   
      {classAnalytics &&
        ( 
          <> 
          <div id="upperDesks">
                              <div id="line"></div>
                              <div id="line2"></div>

                 {Object.keys(analyticsSeats[0].desk).map(desk => (
                        <div id={desk}>
                            <div className="desk"></div>

                            {/* Mapping over the seats of each desk */}
                            {analyticsSeats[0].desk[desk].map(seat => (
                                <button 
                                    key={seat} 
                                    id={seat} 
                                    style={{backgroundColor:statusSeats2(seat) ? redColor :
                                                       statusSeats(seat) ? grayColor : greenColor
                                                                        }}
                                    disabled={statusSeats2(seat) ? false :
                                           statusSeats(seat) ? true : false}
                                    onClick={(e) => {
                                        pickSeat(e.target);
                                    }}
                                  >
                                
                                </button>
                            ))}
                          </div>
                              ))}

           </div>
           
           <div id="DownDesk">

           <div id="line3"></div>
           <div id="line4"></div>

               <div id="AdeskD">

               <button id="AseatD1" onClick={(e) => {
                                     pickSeat(e.target.style)}}>
                                 </button>   
               <div className="desk"></div>
               <button id="AseatD2"  onClick={(e) => {
                                     pickSeat(e.target.style)}}>
                                 </button>  
               <button id="AseatD3"  onClick={(e) => {
                                     pickSeat(e.target.style)}}>
                                 </button>    
               <button id="AseatD4"   onClick={(e) => {
                                     pickSeat(e.target.style)}}>
                                 </button>              
           </div>
           </div>
      
         <div id="leftDesks">
                <div id="line5"></div>
             {Object.keys(analyticsSeats[0].desk2).map(desk => (
                        <div id={desk}>
                            <div className="desk2"></div>

                            {/* Mapping over the seats of each desk */}
                            {analyticsSeats[0].desk2[desk].map(seat => (
                                <button 
                                    key={seat} 
                                    id={seat} 
                                    style={{backgroundColor: statusSeats(seat) ? redColor : greenColor}}  
                                    onClick={(e) => {
                                        pickSeat(e.target.style);
                                    }}
                                >
                                </button>
                            ))}
                        </div>
                              ))}
        </div>
      
           <div id="AdeskG">
                <button id="AseatG1" disabled></button>   
                     <div className="desk5"></div>
                 <button id="AseatG2"  disabled></button> 
           </div>
      
         
    
         <div id="rightSide">
           <WeekendIcon id="couch" />
           <img id="plot" src={plot} />
        </div>
      
      
      
         </>)
            }

       {classDelivery &&
            (<>

                          <div id="Dline1"></div>
                          <div id="Dline2"></div>
                          <div id="Dline3"></div>
                          <div id="Dline4"></div>

                        {Object.keys(deliverySeats["Ddesk"]).map(desk => (
                          
                        <div id={desk}>
                            

                            <div className="Ddesk"></div>

                            {/* Mapping over the seats of each desk */}
                            {deliverySeats["Ddesk"][desk].map(seat => (
                                <button 
                                    key={seat} 
                                    id={seat} 
                                    style={{backgroundColor: statusSeats(seat) ? redColor : greenColor}}  
                                    disabled={statusSeats(seat)}
                                    onClick={(e) => {
                                        pickSeat(e.target);
                                    }}
                                >
                                </button>
                            ))}
                          </div>
                              ))}
                    
               

                  <div id="rightSide2">
                    <WeekendIcon id="couch" />
                    <img id="plot" src={plot} />
                  </div>
            </>) 
            }

        {classtified &&
              ( 
                  <>
                  <div id="CdeskA">
                     <button id="Cseat1"></button>  
                       <div className="desk4"></div>
                      <button id="Cseat2"></button>
                      <button id="Cseat3"></button>
                   </div>

                <div id="CdeskB">
                <button id="Cseat4"></button>  
                  <div  className="desk3"> </div>
                </div>
                     
                  <div id="CdeskC">
                     <button id="Cseat5"></button>  
                       <div className="desk3"></div>
                      <button id="Cseat6"></button>
                   </div>


                   <div id="CdeskD">
                     <button id="Cseat7"></button>  
                       <div className="desk"></div>
                      <button id="Cseat8"></button>
                   </div>

                <div id="CdeskE">
                     <button id="Cseat9"></button>  
                       <div className="desk3"></div>
                      <button id="Cseat10"></button>
                </div>

                 <div id="CdeskF">
                     <button id="Cseat11"></button>  
                       <div className="desk3"></div>
                      <button id="Cseat12"></button>
                  </div>

                  </>
              )
            }

            {meeting &&(
                <>
                  <div id="Mdesk1" onClick={catchDesk1} 
                                      style={{filter: catch1Blur ? 'blur(1px)' : 'none'}}>
                          <div id="mline"></div>
                          <div id="mline2"></div>

                          <button id="Mseat1" disabled></button>
                        <div className="mdesk"></div>
                        <button id="Mseat2" disabled></button>
                        <button id="Mseat3" disabled></button>
                        <button id="Mseat4" disabled></button>

                        <div id="mline3"></div>

                        <img id="plot2" src={plot}></img>
                        <img id="plot3" src={plot}></img>

                   </div>

                   <div id="Mdesk2" onClick={catchDesk2} 
                                      style={{filter: catch1Blur ? 'blur(1px)' : 'none'}}>

                        <div id="mline4"></div>
                        <img id="plot4" src={plot}></img>
                        <div className="mdesk2"></div>
                        <div id="Mseat5"></div>
                        <div id="Mseat6"></div>
                        <div id="Mseat7"></div>
                        <div id="Mseat8"></div>
                        <div id="Mseat9"></div>
                        <div id="Mseat10"></div> 
                        <div id="Mseat11"></div>
                        <div id="Mseat12"></div>
                        <div id="Mseat13"></div>
                        <div id="Mseat14"></div>
                        <div id="Mseat15"></div>
                        <div id="Mseat16"></div>
                   
                   </div>

                   <div id='Mdesk3' onClick={catchDesk3} 
                                      style={{filter: catch1Blur ? 'blur(1px)' : 'none'}}>
                            <div id="mline5"></div>
                            <div id="mline6"></div>


                            <button id="Mseat17" disabled></button>
                            <div className="mdesk3"></div>
                                  <button id="Mseat18" disabled></button>
                                  <button id="Mseat19" disabled></button>
                                  <button id="Mseat20" disabled></button>


                   </div>

                   <div id='Mdesk4' onClick={catchDesk4} 
                                      style={{filter: catch1Blur ? 'blur(1px)' : 'none'}}>
                            <div id="mline5"></div>
                            <div id="mline6"></div>
                            <button id="Mseat17" disabled ></button>
                            <div className="mdesk3"></div>
                                  <button id="Mseat18" disabled></button>
                                  <button id="Mseat19" disabled></button>
                                  <button id="Mseat20" disabled></button>


                   </div>
                </>
            )}

            {requests &&(
              <>
                    <div id="requests">
                      <div id="fixedDiv">
                            <DisabledByDefaultIcon id="xIcon2" onClick={() => {setRequests(false) ,
                                                    chooseClasses(location.state.classId);
                                                  }}/>
                            <label id="reqBoard">לוח בקשות</label>

                            <button id="allReq">לכל הבקשות<OpenWithIcon id="openIcon"/></button>
                            <button id="addReq" onClick={NewRequests} > <label style={{position:'relative' , top:"0%"}}
                                                    >הוסף בקשה</label><AddIcon style={{position:'relative' , top:"0%"}} /></button>
                      </div>
                      <div id="reqStatus">
                      {allRequests.map((req,index) => (
                        req.userId1 === user ?
                            (<div className='divReq'>
                                    <labal style={{ 
                                      color: "#2E2B76" , fontWeight: "700" }}>בקשה #{index + 1} </labal>

                                    <span style={{ 
                                      fontWeight: "500"}}>{req.topic1}</span>

                                     {
                                        req.status == 'אושר' ?
                                        <div className="Rstatus" style={{color:"rgba(104, 166, 89, 1)" ,
                                                        border:"2px solid rgba(104, 166, 89, 1)" }}>אושר</div> :

                                        req.status == 'נדחה' ?
                                        <div className="Rstatus" style={{color:"rgba(191, 64, 64, 1)" ,
                                                        border:"2px solid rgba(191, 64, 64, 1)" }}>נדחה</div> :

                                        <div className="Rstatus" style={{color:"rgba(46, 43, 118, 1)" ,
                                                        border:"2px solid rgba(46, 43, 118, 1)"}}>ממתין</div>
                                     }


                                      <br /><br/>
                                      <p>{req.detail1}</p>


                              </div>) : null
                                    
                                ))}
                       
                           

                           
                             
                             
                        
                      </div>
                   
                    </div>
              </>
            )}

            {editUsers &&(
              <>
                  <Root sx={{ maxWidth: '100%' , maxHeight:'100%'}}>
                      <table aria-label="custom pagination table" >
                        <thead>
                          <tr>
                            <th>מספר עובד</th>
                            <th>שם העובד</th>
                            <th>אימייל</th>
                            <th>סיסמא</th>
                            <th>מחלקה</th>
                            <th>תפקיד</th>
                            <th>אדמין</th>
                            <th>מנהל</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                          ).map((row) => (
                            <tr key={row.userId}>
                              <td>{row.userId}</td>
                              <td style={{ width: 160 }}>
                                {row.username}
                              </td>
                              <td style={{ width: 160 }} >
                                {row.email}
                              </td>
                              <td style={{ width: 160 }} >
                                {row.password}
                              </td>
                              <td style={{ width: 160 }} align="right">
                                {row.class}
                              </td>
                              <td style={{ width: 160 }} >
                                {row.title}
                              </td>
                              <td style={{ width: 160 }} align="right">
                              <input type='checkbox' disabled id='checkPlace'checked={row.IsAdmin ? true:false} ></input>
                              </td>
                              <td style={{ width: 160 }} align="right">
                            <input type='checkbox' disable did='checkPlace'  checked={row.IsManager ? true:false} ></input>
                              </td>
                            </tr>
                          ))}
                          {emptyRows > 0 && (
                            <tr style={{ height: 41 * emptyRows }}>
                              <td colSpan={3} aria-hidden />
                            </tr>
                          )}
                        </tbody>
                        <tfoot>
                          <tr>
                            <CustomTablePagination
                              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                              colSpan={3}
                              count={rows.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              slotProps={{
                                select: {
                                  'aria-label': 'rows per page',
                                },
                                actions: {
                                  showFirstButton: true,
                                  showLastButton: true,
                                },
                              }}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                          </tr>
                        </tfoot>
                      </table>
                    </Root>
 

              </>
            )}

        
       </div>
          </Col>
          <Col xs={12} sm={3}>
          <div>
                  <button  id="DateBtn" disabled={isDisabled} onClick={() => {
                                              setShowDatePicker(true), setIsDisabled(true)}} value="בחר/י תאריך">
                    <CalendarMonthIcon  id="CalendarIcon"/>
                    בחר/י תאריך
                  </button>
          <div>                    
                     <label id="labelCheck" htmlFor='checkPlace'> בחר/י שוב את מה שבחרתי בפעם האחרונה</label>

                     <input type='checkbox' id='checkPlace' onChange={(e) => {LastSeatChose(e.target)}}></input>
          </div>


          {showChoose && 
           (<p id="pDiv"><FaEraser id="FaEraser" onClick={(e)=>{
                                      setShowChoose(false),setIsDisabled(false),
                                      setSelectedDate(null) , setConfirmDiv(null);
                                    }}/>
                  <b>{date}</b></p>)}
          {showDatePicker && (
                  <Datepicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}
                    scrollableMonthYearDropdown
                    inline
                  />
                )}
              </div>
        
            <div>
           
           
              <select  className="dropdown-select" value={className}  onChange={(e) => {chooseClasses(e.target.value)}}>
              <option value="" disabled selected>מחלקות</option>
                  <option value="analytics">מחלקת אנליטיקס</option>
                  <option value="delivery">מחלקת דליברי</option>
                  <option value="classtified">מסווגים</option>
              </select>
              <input className='btn1'type="button" value="ניהול משתמשים" onClick={UserManagement} />  
              <input className='btn1' type="button" onClick={showMeeting} value="חדרי ישיבות" />
              <input className='btn1'type="button" value="דיווחים" />
              <input className='btn1' type="button" value="בקשות"  onClick={(e) => chooseClasses(e.target.value)}/>
              { btnFinishShow} 
          
            </div>



          </Col>
          </Row>
            
      </Container>
   
        {pickDiv}

        {newReqSuccess}


        {newReqY ? <div id='newReq'>
                      <DisabledByDefaultIcon id="xIcon"  onClick={() => {setNewReq(null) , 
                                                     chooseClasses(location.state.classId),
                                                              setnewReqY(false) }}/>
                      <div id='newReq1'>
                          <h1 >בקשה חדשה </h1>
                          
                          
                        <input type='text' id='inputReq'onChange={(e) => {setSubReq(e.target.value)}}></input>
                        <label>נושא הבקשה</label>

                        <label>פירוט הבקשה</label>
                        <br />
                        <textarea id="textDetail" onChange={(e) => {setdetailReq(e.target.value)}}></textarea>
                      </div>

                      <button id="sendReq" onClick={sendReq}>שליחת הבקשה<SendIcon id="sendIcon" /></button>
                        </div> : null}

                                                                                       

        { catch1Hide ? null : (<div id="Catch1">תפוס</div>)}

        { catch2Hide ? null : (<div id="Catch2">תפוס</div>)}

        { catch3Hide ? null : (<div id="Catch3">תפוס</div>)}

        { catch4Hide ? null : (<div id="Catch4">תפוס</div>)}


    </>
  )
}
