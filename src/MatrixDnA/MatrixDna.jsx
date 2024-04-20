import {React , useState , createContext , useEffect} from 'react'
import {Container , Row , Col , Button  } from 'react-bootstrap';
import {InputLabel , MenuItem , FormControl , Select } from '@mui/material';

import { FaEraser } from "react-icons/fa";


import WeekendIcon from '@mui/icons-material/Weekend';
import plot from '/img/plot.png'

import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/MatrixDna.css'
import './CSS/Analytics.css'
import './CSS/Delivery.css'
import './CSS/Classtified.css'
import './CSS/Meeting.css'


import ImgMatrix from '/img/imageMatrix.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';




export default function MatrixDnA(props) {
  //שם משתמש
  const [user, setUser] = useState("רופין רופין");
//לינק לשרת
  const [apiUrl2, setApiUrl2] = useState("https://localhost:7180/api/Reservedplace");
  //תאריך נוכחי
  const [date, setDate] = useState(getCurrentDate());
  //בחירת תאריך למקום
  const [selectedDate, setSelectedDate] = useState(null);
  //הצגת לוח שנה לבחירת מקום
  const [showDatePicker, setShowDatePicker] = useState(false);
  //לאחר שריון התאריך
  const [showChoose, setShowChoose] = useState(false);
  //גישה למושבים
  const [btnDisabled, setbtnDisabled] = useState(true);
  //טשטוש הרקע
  const [isBlurred, setIsBlurred] = useState(false);
  //התפריט לאחר לחיצה על מקום
  const [isHidden, setIsHidden] = useState(true);
  //לחצן הלוח השנה 
  const [isDisabled, setIsDisabled] = useState(false);
//כסא נוכחי
  const [currentSeat, setCurrentSeat] = useState('');
  //כסא פנוי
  const [greenColor, setGreenColor] = useState("#76BC8B");
  //כסא תפוס
  const [redColor, setRedColor] = useState("#E87D7D");
  //כסא בתהליך
  const [blueColor, setBlueColor] = useState("#33BBFF");
  //מחקת אנליטיקס
  const [classAnalytics, setClassAnlytics] = useState(false);

  const [classDelivery, setClassDelivery] = useState(false);

  const [classtified, setClasstified] = useState(false);

  const [meeting, setMeeting] = useState(false);

  const [seatUsers, setSeatUsers] = useState(props.seatsUser);

  const [pickDiv, setpickDiv] = useState("");

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
            "AdeskB": ["B1","B2","AseatB3"] ,
             "AdeskC": ["AseatC1","AseatC2","AseatC3"] },
    "desk2":{"AdeskE": ["AseatE1","AseatE2","AseatE3","AseatE4","AseatE5","AseatE6"],
            "AdeskF": ["AseatF1","AseatF2","AseatF3","AseatF4","AseatF5","AseatF6"]
                        }}]);

const [status, setStatus] = useState(false)
                                                  

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
                                setSeatUsers(result);
                              },
                              (error) => {
                                console.log("err post=", error);
                              });

                   console.log(seatUsers);
            
          }, [pickDiv]);
          


      function statusSeats(e){
        return seatUsers.some(seat => seat.table + seat.seat === e);
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
const handleDateChange = date => {
  setSelectedDate(date);
  setDate(getDate(date));
  setShowChoose(true);
  setShowDatePicker(false);
  setbtnDisabled(false);
  setIsDisabled(true);
};

// בחירת מושב
 function pickSeat(e){
      let x = e;
      e.style.backgroundColor = blueColor;
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
    //יציאה מהתפריט
    function exitMenu(e){
      setIsBlurred(false);
      setIsHidden(true);
      setpickDiv(null);
      e.backgroundColor = greenColor;
    }


    //בחירת מחלקות
    function chooseClasses(e){
      if(e.value == 'analytics'){
        setClasstified(false);
        setClassDelivery(false);
        setMeeting(false)
        setClassAnlytics(true);
      }
      if(e.value == "delivery"){
        setClasstified(false);
        setClassAnlytics(false);
        setMeeting(false)
        setClassDelivery(true);
       
      }
      if(e.value == 'classtified'){
        setClassDelivery(false);
        setClassAnlytics(false);
        setMeeting(false)
        setClasstified(true);
      }
    }

    function showMeeting(){
      setMeeting(true)
      setClassDelivery(false);
      setClassAnlytics(false);
      setClasstified(false);
    }

    //אישור כיסא
    function confirmSeat(e){
      setIsBlurred(false);
      setIsHidden(true);

      const [desk, seatNumber] = e.id.match(/[A-Z]+|[0-9]+/g);

      const newR = {
        UserID: "Eden",
        Class: "analytics" ,
        Date: new Date() , 
        Seat : seatNumber ,
        Table: desk ,
      }

              fetch(apiUrl2, {
                method: 'POST',
                headers: new Headers({
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Accept': 'application/json; charset=UTF-8',
                }) ,
                body: JSON.stringify(newR)
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
            e.disabled = true;
            setpickDiv(null);

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
          <Row id="body" >
          <Col xs={9}>
      <div id="places">
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
                                    style={{backgroundColor: statusSeats(seat) ? redColor : greenColor}}  
                                    disabled={btnDisabled} 
                                    onClick={(e) => {
                                        setCurrentSeat(e.target.id);
                                        pickSeat(e.target);
                                    }}
                                >
                                </button>
                            ))}
                          </div>
                              ))}

                     
                     
      
           </div>
           
           <div id="AdeskD">

           <div id="line3"></div>
           <div id="line4"></div>
               <button id="AseatD1" disabled={btnDisabled} onClick={(e) => {
                                     setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                 </button>   
               <div className="desk"></div>
               <button id="AseatD2" disabled={btnDisabled} onClick={(e) => {
                                     setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                 </button>  
               <button id="AseatD3" disabled={btnDisabled} onClick={(e) => {
                                     setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                 </button>    
               <button id="AseatD4" disabled={btnDisabled} onClick={(e) => {
                                     setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                 </button>              
           </div>
      
      <div id="leftDesks">
             {Object.keys(analyticsSeats[0].desk2).map(desk => (
                        <div id={desk}>
                            <div className="desk2"></div>

                            {/* Mapping over the seats of each desk */}
                            {analyticsSeats[0].desk2[desk].map(seat => (
                                <button 
                                    key={seat} 
                                    id={seat} 
                                    style={{backgroundColor: statusSeats(seat) ? redColor : greenColor}}  
                                    disabled={btnDisabled} 
                                    onClick={(e) => {
                                        setCurrentSeat(e.target.id);
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
      
         
    
           < hr id="line5" />
           < hr id="line6" />
           < hr id="line7" />
      
           <WeekendIcon id="couch" />
           <img id="plot" src={plot} />
      
      
      
         </>)
            }

       {classDelivery &&
            (<>
                  <div id="DdeskA">
                     <button id="DseatA1"></button>  
                       <div className="desk"></div>
                      <button id="DseatA2"></button>
                      <button id="DseatA3"></button>    
                  </div>

                  <div id="DdeskB">
                     <button id="DseatB1"></button>  
                       <div className="desk"></div>
                      <button id="DseatB2"></button>
                      <button id="DseatB3"></button>    
                  </div>

                  <div id="DdeskC">
                     <button id="DseatC1"></button>  
                       <div className="desk"></div>
                      <button id="DseatC2"></button>
                      <button id="DseatC3"></button> 
                      <button id="DseatC4"></button>    
                  </div>

                  <div id="DdeskD">
                     <button id="DseatD1"></button>  
                       <div className="desk"></div>
                      <button id="DseatD2"></button>
                      <button id="DseatD3"></button> 
                      <button id="DseatD4"></button>    
                  </div>

                  <div id="DdeskE">
                     <button id="DseatE1"></button>  
                       <div className="desk"></div>
                      <button id="DseatE2"></button>
                      <button id="DseatE3"></button>    
                  </div>

                  
                  <div id="DdeskF">
                     <button id="DseatF1"></button>  
                       <div className="desk"></div>
                      <button id="DseatF2"></button>
                       
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
       </div>
          </Col>
          <Col xs={3}>
          <div>
                  <button  id="DateBtn" disabled={isDisabled} onClick={() => 
                                                    setShowDatePicker(true)} value="בחר/י תאריך">
                    <CalendarMonthIcon id="CalendarIcon"/>
                    בחר/י תאריך
                  </button>
          <div>                    
                     <label id="labelCheck" htmlFor='checkPlace'> בחר/י שוב את מה שבחרתי בפעם האחרונה</label>

                     <input type='checkbox' id='checkPlace'></input>
          </div>
          {showChoose && 
           (<p id="pDiv"><FaEraser id="FaEraser" onClick={(e)=>{
                                      setShowChoose(false),setIsDisabled(false)}}/>
                  <b>{date}</b></p>)}
          {showDatePicker && (
                  <Datepicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/mm/yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}
                    scrollableMonthYearDropdown
                    inline
                  />
                )}
              </div>
        
            <div>
           
           
              <select className="dropdown-select" onChange={(e) => {chooseClasses(e.target)}}>
              <option value="" disabled selected>מחלקות</option>
                  <option value="analytics">מחלקת אנליטיקס</option>
                  <option value="delivery">מחלקת דליברי</option>
                  <option value="classtified">מסווגים</option>
              </select>
              <input type="button" onClick={showMeeting} value="חדרי ישיבות" />
              <input type="button" value="דיווחים" />
              <input type="button" value="בקשות"/>
              <input type='button' id="endBtn" value="סיום" />
          
            </div>
          </Col>
          </Row>
            
      </Container>
   
        {pickDiv}

        { catch1Hide ? null : (<div id="Catch1">תפוס</div>)}

        { catch2Hide ? null : (<div id="Catch2">תפוס</div>)}

        { catch3Hide ? null : (<div id="Catch3">תפוס</div>)}

        { catch4Hide ? null : (<div id="Catch4">תפוס</div>)}


    </>
  )
}
