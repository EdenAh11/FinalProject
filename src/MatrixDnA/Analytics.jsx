import {React , useState} from 'react'
import {Container , Row , Col , Button  } from 'react-bootstrap';
import {InputLabel , MenuItem , FormControl , Select } from '@mui/material';

import { FaEraser } from "react-icons/fa";

import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Analytics.css'
import ImgMatrix from '/img/imageMatrix.png'
import sImg from '/img/imgS.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Calendar from 'react-calendar' 
import floorImg from '/img/floor.jpg'
import desk3Img from '/img/desk3.png'
import doorImg from '/img/door.png'
import manageImg from '/img/manageroom.png'
import lineImg from '/img/line.png'
import desk6Img from '/img/desk6.png'
import desk4Img from '/img/desk4.png'
import whitelineImg from '/img/whiteline.png'
import matrixImg from '/img/MatrixDnA.png'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import GroupsIcon from '@mui/icons-material/Groups';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

import { Filter, Scale } from '@mui/icons-material'



export default function Analytics() {
  //שם משתמש
  const [user, setUser] = useState("רופין רופין");
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
//צבע כיסא
  const [SeatColor, setSeatColor] = useState('#33BBFF');








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
      e.backgroundColor = SeatColor;
      setIsBlurred(true);
      setIsHidden(false);
 }







 
  return (
    <>
      <Container id='AnalystDiv' fluid style={{filter: isBlurred ? 'blur(4px)' : 'none'}}>
          <Row id="head">
            <Col id="LeftUp">
              <img id='MatrixImg' src={ImgMatrix}/>
            </Col>
            <Col id="RightUp">
              <div id="Sdiv"><div id="imgS"><label>S</label></div>  </div>
              <div id="divName"> !שלום {user}</div>
              <div id="divDate">{getCurrentDate()}</div>
        
            </Col>
          </Row>
          <Row id="body">
          <Col  xs={9}>
            <div id="places" >
              <div id="deskA">
                  <button id="seatA1" disabled={btnDisabled} onClick={(e) => {pickSeat(e.target.style)}}></button>  
                  <div className="desk"></div>
                  <button id="seatA2"></button>
                  <button id="seatA3"></button>   
                  <button id="seatA4"></button>             
              </div>

              <div id="deskB">
              <button id="seatB1"></button>  
                  <div className="desk"></div>
                  <button id="seatB2"></button>
                  <button id="seatB3"></button>
              </div>

              <div id="deskC">
              <button id="seatC1"></button>  
                  <div className="desk"></div>
                  <button id="seatC2"></button>
                  <button id="seatC3"></button>    
              </div>

              
              <div id="deskD">
                  <button id="seatD1"></button>  
                  <div className="desk"></div>
                  <button id="seatD2"></button>
                  <button id="seatD3"></button>   
                  <button id="seatD4"></button>             
              </div>

              <div id="deskE">
                  <button id="seatE1"></button>  
                  <div className="desk2"></div>
                  <button id="seatE2" ></button>
                  <button id="seatE3" ></button>   
                  <button id="seatE4"></button> 
                  <button id="seatE5"></button> 
                  <button id="seatE6"></button> 
              </div>

              <div id="deskF">
                  <button id="seatF1"></button>  
                  <div className="desk2"></div>
                  <button id="seatF2" ></button>
                  <button id="seatF3"></button>   
                  <button id="seatF4"></button> 
                  <button id="seatF5"></button> 
                  <button id="seatF6"></button> 
              </div>

            </div>
          </Col>
          <Col xs={3}>
          <div>
      <button  id="DateBtn" disabled={isDisabled} onClick={() => setShowDatePicker(true)} value="בחר/י תאריך">
        <CalendarMonthIcon id="CalendarIcon"/>
        בחר/י תאריך
      </button>

          {showChoose && 
           (<p id="pDiv"><FaEraser id="FaEraser" onClick={(e)=>{setShowChoose(false),setIsDisabled(false)}}/>
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
           
           
              <select className="dropdown-select" >
              <option value="" disabled selected>מחלקות</option>
                  <option value="analytics">מחלקת אנליטיקס</option>
                  <option value="delivary">מחלקת דליברי</option>
                  <option value="classtified">מסווגים</option>
              </select>
              <input type="button" value="חדרי ישיבות" />
              <input type="button" value="דיווחים" />
              <input type="button" value="בקשות"/>
              <input type='button' id="endBtn" value="סיום" />
          
            </div>
          </Col>
          </Row>
            
      </Container>
      { isHidden ? null :
            (<div id="pickDiv">
                      <DisabledByDefaultIcon id="exitIcon" onClick={(e) => {setIsBlurred(false) , setIsHidden(true)}} />
                      <CheckCircleIcon id="checkIcon" />
                      <p id="textPick">  המושב שוריין לתאריך {date} יום {getDayOfWeek(selectedDate)}</p>
                      <button id='confimPick'>אישור הבחירה וסיום<CheckIcon /></button>
                      <button id='changePick'>שינוי הבחירה<DriveFileRenameOutlineIcon /></button>
                      <button id='anotherPick'>שיריון מושב נוסף<ControlPointIcon /></button>
            </div>
            )
      }
    </>
  )
}
