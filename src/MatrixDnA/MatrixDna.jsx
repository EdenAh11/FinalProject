import {React , useState , createContext , useEffect} from 'react'
import {Container , Row , Col , Button  } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import { FaEraser } from "react-icons/fa";

import TextField from '@mui/material/TextField';


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





export default function MatrixDnA(props) {
  const location = useLocation();

  //שם משתמש
  const [user, setUser] = useState('');
//שם מחלקה
  const [className, setClassName] = useState('')
  //מערך משתמשים מהדאטה
  const [seatUsers, setSeatUsers] = useState(props.seatsUser);
//לינק לשרת
  const [apiUrl2, setApiUrl2] = useState("https://proj.ruppin.ac.il/cgroup73/test2/tar1/api/Reservedplace");
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
  const [isDisabled, setIsDisabled] = useState(true);
  //כסא פנוי
  const [greenColor, setGreenColor] = useState("#76BC8B");
  //כסא תפוס
  const [redColor, setRedColor] = useState("#E87D7D");
  //כסא בתהליך
  const [blueColor, setBlueColor] = useState("#33BBFF");
  //מחלקת אנליטיקס
  const [classAnalytics, setClassAnlytics] = useState(false);

  const [btnFinishShow, setbtnFinishShow] = useState(false);

  const [classDelivery, setClassDelivery] = useState(false);

  const [classtified, setClasstified] = useState(false);

  const [meeting, setMeeting] = useState(false);

  const [requests, setRequests] = useState(false);

  const [pickDiv, setpickDiv] = useState("");

  const [confirmDiv, setConfirmDiv] = useState("");

  const [NewReq, setNewReq] = useState("")

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


                                                  

          useEffect(() => {
                        setUser(location.state.userId);
                        setClassName(location.state.classId);
                        chooseClasses(location.state.classId);

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
                          
                                console.log("fetch Reserves1= ", newResult);
                                setSeatUsers(newResult);
                              },
                              (error) => {
                                console.log("err post=", error);
                              });

                   console.log(seatUsers);
            
          }, [pickDiv , selectedDate]);
          



       


               /// להוסיף פילטור של ימים
      function statusSeats(e){

          

        return seatUsers.some(user => {
          const [pickDate,selectD] = [new Date(user.date), new Date(selectedDate)];
          const [dateUser,dateSelect] = [getDate(pickDate) , getDate(selectD)];
          
              return(user.table + user.seat === e && dateUser === dateSelect);
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
        function confirmSeat(e){
          
          setIsBlurred(false);
          setIsHidden(true);
    
    
    
    
          const [desk, seatNumber] = e.id.match(/[A-Z]+|[0-9]+/g);
        
          const newR = {
            UserID: "Eden",
            Class: className ,
            Date: selectedDate , 
            Seat : seatNumber ,
            Table: desk 
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
                        console.log("fetch btnFetchPostReserve= ", result);
                        setReservedSeats(result);
                      },
                      (error) => {
                        console.log("err post=", error);
                      });
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
        setClassAnlytics(true);

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

      setIsDisabled(false);
    }

    
    function showMeeting(){
      setMeeting(true)
      setClassDelivery(false);
      setClassAnlytics(false);
      setClasstified(false);
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
                if(item.date < current)
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
        const newReq = (<div id='newReq'>
                      <DisabledByDefaultIcon id="xIcon"  onClick={() => {setNewReq(null) , 
                                                     chooseClasses(location.state.classId)
                                                                                            }}/>
                      <div id='newReq1'>
                          <h1 >/ בקשה חדשה </h1>
                          
                          
                        <input type='text' id='inputReq'></input>
                        <label>נושא הבקשה</label>

                        <label>פירוט הבקשה</label>
                        <br />
                        <textarea id="textDetail"></textarea>
                      </div>

                      <button id="sendReq">שליחת הבקשה<SendIcon id="sendIcon" /></button>
                        </div>
          )
                        setNewReq(newReq);
                          
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
                      
                            <DisabledByDefaultIcon id="xIcon" onClick={() => {setRequests(false) ,
                                                    chooseClasses(location.state.classId);
                                                  }}/>
                            <label id="reqBoard">לוח בקשות</label>

                            <button id="allReq">לכל הבקשות<OpenWithIcon id="openIcon"/></button>
                            <button id="addReq" onClick={NewRequests}>הוסף בקשה <AddIcon /></button>
                 
                      <div id="reqStatus">
                       
                             <div className='divReq'>
                                    <labal style={{ 
                                      color: "#2E2B76" , fontWeight: "700" }}>בקשה #4556 </labal>

                                    <span style={{ 
                                      fontWeight: "500"}}>חדר ישיבות תפוח</span>

                                      <div className="Rstatus">אושר</div>


                                      <br /><br/>
                                      <p>...ברצוני לבקש 3 כסאות נוספים</p>


                              </div>

                              <div className='divReq'>
                                    <labal style={{ 
                                      color: "#2E2B76" , fontWeight: "700"}}>בקשה #4556 </labal>

                                    <span style={{ 
                                      fontWeight: "500"}}>חדר ישיבות תפוח</span>

                                      <div className="Rstatus">אושר</div>


                                      <br /><br/>
                                      <p>...ברצוני לבקש 3 כסאות נוספים</p>


                              </div>

                              <div className='divReq'>
                                    <labal style={{ 
                                      color: "#2E2B76" , fontWeight: "700"}}>בקשה #4556 </labal>

                                    <span style={{ 
                                      fontWeight: "500"}}>חדר ישיבות תפוח</span>

                                      <div className="Rstatus"><label>אושר</label></div>


                                      <br /><br/>
                                      <p>...ברצוני לבקש 3 כסאות נוספים</p>


                              </div>
                             
                             
                        
                      </div>
                   
                    </div>
              </>
            )}

        
       </div>
          </Col>
          <Col xs={3}>
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
                                      setShowChoose(false),setIsDisabled(false),setSelectedDate(null)}}/>
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
              <input className='btn1' type="button" onClick={showMeeting} value="חדרי ישיבות" />
              <input className='btn1'type="button" value="דיווחים" />
              <input className='btn1' type="button" value="בקשות"  onClick={(e) => chooseClasses(e.target.value)}/>
              { btnFinishShow} 
          
            </div>
          </Col>
          </Row>
            
      </Container>
   
        {pickDiv}

        {NewReq}

        { catch1Hide ? null : (<div id="Catch1">תפוס</div>)}

        { catch2Hide ? null : (<div id="Catch2">תפוס</div>)}

        { catch3Hide ? null : (<div id="Catch3">תפוס</div>)}

        { catch4Hide ? null : (<div id="Catch4">תפוס</div>)}


    </>
  )
}
