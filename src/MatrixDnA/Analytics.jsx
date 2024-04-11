import {React , useState , createContext} from 'react'
import {Container , Row , Col , Button  } from 'react-bootstrap';
import {InputLabel , MenuItem , FormControl , Select } from '@mui/material';

import { FaEraser } from "react-icons/fa";

import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import WeekendIcon from '@mui/icons-material/Weekend';
import SpaIcon from '@mui/icons-material/Spa';

import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Analytics.css'
import './Delivery.css'
import './Classtified.css'


import ImgMatrix from '/img/imageMatrix.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';




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
      e.backgroundColor = blueColor;
      setIsBlurred(true);
      setIsHidden(false);
    }

    //יציאה מהתפריט
    function exitMenu(){
      setIsBlurred(false);
      setIsHidden(true);
      document.getElementById(currentSeat).style.backgroundColor = greenColor;
    }


    //בחירת מחלקות
    function chooseClasses(e){
      if(e.value == 'analytics'){
        setClasstified(false);
        setClassDelivery(false);
        setClassAnlytics(true);
      }
      if(e.value == "delivery"){
        setClasstified(false);
        setClassAnlytics(false);
        setClassDelivery(true);
       
      }
      if(e.value == 'classtified'){
        setClassDelivery(false);
        setClassAnlytics(false);
        setClasstified(true);
       
      }
    }

    //אישור כיסא
    function confirmSeat(){
      document.getElementById(currentSeat).style.backgroundColor = redColor;
      document.getElementById(currentSeat).disabled = true;
      setIsBlurred(false);
      setIsHidden(true);
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
      <div id="places">
      {classAnalytics &&
          (<> 
             <div id="AdeskA">
                  <button id="AseatA1" disabled={btnDisabled} onClick={(e) => {
                                  setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                    </button>  
                  <div className="desk"></div>
                  <button id="AseatA2" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                  </button>
                  <button id="AseatA3" disabled={btnDisabled} onClick={(e) => {
                                          setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}> 
                                  </button>   
                  <button id="AseatA4" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
              </div>

              <div id="AdeskB">
              <button id="AseatB1" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>   
                  <div className="desk"></div>
                  <button id="AseatB2" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
                  <button id="AseatB3" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
              </div>

              <div id="AdeskC">
              <button id="AseatC1" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>   
                  <div className="desk"></div>
                  <button id="AseatC2" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
                  <button id="AseatC3" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>     
              </div>

              
              <div id="AdeskD">
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

              <div id="AdeskE">
                  <button id="AseatE1" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>   
                  <div className="desk2"></div>
                  <button id="AseatE2"  disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
                  <button id="AseatE3"  disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>     
                  <button id="AseatE4" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
                  <button id="AseatE5" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
                  <button id="AseatE6" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
              </div>

              <div id="AdeskF">
                  <button id="AseatF1" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>   
                  <div className="desk2"></div>
                  <button id="AseatF2"  disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
                  <button id="AseatF3" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>   
                  <button id="AseatF4" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
                  <button id="AseatF5" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
                  <button id="AseatF6" disabled={btnDisabled} onClick={(e) => {
                                        setCurrentSeat(e.target.id) , pickSeat(e.target.style)}}>
                                    </button>  
              </div>

              <div id="AdeskG">
                   <button id="AseatG1" disabled></button>   
                        <div className="desk5"></div>
                    <button id="AseatG2"  disabled></button> 
              </div>

              < hr id="line" />
              < hr id="line2" />
              < hr id="line3" />
              < hr id="line4" />
              < hr id="line5" />
              < hr id="line6" />
              < hr id="line7" />

              <WeekendIcon id="couch" />
              <SpaIcon id="spa"/>



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
        </div>
          </Col>
          <Col xs={3}>
          <div>
      <button  id="DateBtn" disabled={isDisabled} onClick={() => 
                                        setShowDatePicker(true)} value="בחר/י תאריך">
        <CalendarMonthIcon id="CalendarIcon"/>
        בחר/י תאריך
      </button>

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
                      <DisabledByDefaultIcon id="exitIcon" onClick={(e) => {exitMenu()}} />
                      <CheckCircleIcon id="checkIcon" />
                      <p id="textPick">  המושב שוריין לתאריך {date} יום {getDayOfWeek(selectedDate)}</p>
                      <button id='confimPick' onClick={(e) => {confirmSeat()}}>אישור הבחירה וסיום<CheckIcon /></button>
                      <button id='changePick'>שינוי הבחירה<DriveFileRenameOutlineIcon /></button>
                      <button id='anotherPick'>שיריון מושב נוסף<ControlPointIcon /></button>
            </div>
            )
      }
    </>
  )
}
