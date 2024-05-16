import {React , useState , createContext , useEffect} from 'react'
import axios from 'axios';
import {Container , Row , Col , Button  } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import { FaEraser } from "react-icons/fa";

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
import { CheckBox, Opacity } from '@mui/icons-material';


// הפעלת הבדיקה כאשר האפליקציה נטענת

/////
export default function MatrixDnA(props) {
  const location = useLocation();

//שם משתמש
  const [user, setUser] = useState('');
//id של המשתמש
  const [userId, setuserId] = useState("");
//שם מחלקה
  const [className, setClassName] = useState(location.state.classId);
//סטטוס מנהל?
  const [isManager, setisManager] = useState(location.state.IsManager);
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
//התראה על בחירה נוספת 
  const [MoreThanOne, setMoreThanOne] = useState(false);
//לא המחלקה שלך
  const [notYourClass, setnotYourClass] = useState(false);

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
                  "desk":{"AdeskA": ["AA1","AA2","AA3","AA4"] ,
                          "AdeskB": ["AB1","AB2","AB3"] ,
                          "AdeskC": ["AC1","AC2","AC3"] },
                  "desk2":{"AdeskE": ["AE1","AE2","AE3","AE4","AE5" , "AE6"],
                          "AdeskF": ["AF1","AF2","AF3","AF4","AF5" , "AF6"]
                        }}]);

  const [deliverySeats, setDeliverySeats] = useState({
            "Ddesk":{"DdeskA" : ["DA1", "DA2","DA3"],
                    "DdeskB" : ["DB1","DB2","DB3"],
                    "DdeskC" : ["DC1","DC2","DC3","DC4"],
                    "DdeskD": ["DD1" , "DD2" , "DD3" ,"DD4"] , 
                    "DdeskE" : ["DE1" , "DE2","DE3" ], 
                    "DdeskF" : ["DF1" , "DF2"]
                  }});



//עיצוב טבלת המשתמשים
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
                        setUser(location.state.username);
                        setuserId(location.state.userId);
                       console.log(location.state.username);
                       // setClassName(location.state.classId);
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

                 
            
          }, [pickDiv , selectedDate , newReqSuccess ]);


          ///האם המנהל מחובר
//const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(user.IsManager);
//function checkAdminLogin() {
//  setIsAdminLoggedIn();
//  console.log(user.IsManager);
//  console.log(isAdminLoggedIn)
///}
//useEffect(() => {
  //checkAdminLogin();
//}, []);



               /// להוסיף פילטור של ימים
      function statusSeats(e){

        return seatUsers.some(users => {
          const [pickDate,selectD] = [new Date(users.date), new Date(selectedDate)];
          const [dateUser,dateSelect] = [getDate(pickDate) , getDate(selectD)];
          
              return(users.seat === e && dateUser === dateSelect);
        });
     }

     function statusSeats2(e){

      return seatUsers.some(users => {
        const [pickDate,selectD] = [new Date(users.date), new Date(selectedDate)];
        const [dateUser,dateSelect] = [getDate(pickDate) , getDate(selectD)];
      
        
            return(users.seat === e && dateUser === dateSelect && users.userid === userId);
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
    
      setDate(getDate(date));
      setShowChoose(true);
      setShowDatePicker(false);
      setIsDisabled(true);

 
};

//בדיקת האם המשתמש בחר יותר מכסא אחד
function checkNumOfChoose(e){

  let check = true;

    AllUsers.map(user1 => {
        if(user == user1.username){
          seatUsers.map(seat => {
            if(getDate(seat.date) == getDate(selectedDate)){
              check = false;
            }
          })
        }
    })

    return check;
}

// בחירת מושב
 function pickSeat(e){
   if(checkNumOfChoose()){
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
    else{
      setMoreThanOne(true);      
    }
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
  
          const desk = e.id[0]
        
          const newR = {
            reservedplaceId : `${seatUsers.length + 1}` ,
            userid: userId,
            class: className ,
            date: selectedDate , 
            seat : e.id ,
            table: desk 
          }

          let datePost = getDate(selectedDate);

          const email = {
            to: "edenah11@gmail.com" , 
            subject : "שריון מקום ישיבה" ,
            body : `<div> <h1>שיריון מקום ישיבה עבר בהצלחה</h1> <p> ${e.id}   מקום ישיבה </p>`+                   
                             `<p>בתאריך : ${datePost}</p></div>`
          }
    
               

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
      setConfirmDiv(null);
     seteditUsers(false);
     setRequests(false);
     setClassDelivery(false);
     setClassAnlytics(false);
     setMeeting(false);
     setClasstified(false);
     seteditUsers(false);
     setMeeting(false);

    
            if(e == 'analytics'){       
              setClassAnlytics(true);
              setClassName(e);

              e == className ? null : (setnotYourClass(true), setIsBlurred(true)) ;
            }
            if(e == "delivery"){      
              setClassDelivery(true);
              setClassName(e);

              e == className ? null : (setnotYourClass(true) , setIsBlurred(true)) ;
            }
            if(e == 'classtified'){       
              setClasstified(true);        
              setClassName(e);

              e == className ? null : (setnotYourClass(true) ,  setIsBlurred(true));
            }
            if(e == 'בקשות'){      
              setRequests(true);       
              setClassName(null);

            }  
            if(e  =='ניהול משתמשים')
              { seteditUsers(true);
                setClassName(null);}
            if(e=='חדרי ישיבות')
            { setMeeting(true); }
          }

    
    
  

//בחירת משתמשים



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

    function changeClass(){
      chooseClasses(location.state.classId);
      setIsBlurred(false);
      setnotYourClass(false);
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
              <div id="Sdiv"><div id="imgS"><label>{user[0]}</label></div>  </div>
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

               <button id="AseatD1" style={{backgroundColor:statusSeats2("DD1") ? redColor :
                                                       statusSeats("DD1") ? grayColor : greenColor
                                                                        }}
                                    disabled={statusSeats2("DD1") ? false :
                                           statusSeats("DD1") ? true : false}
                                    onClick={(e) => {
                                        pickSeat(e.target);
                                    }}
                                  >
                                 </button>   
               <div className="desk"></div>
               <button id="AseatD2"  style={{backgroundColor:statusSeats2("DD2") ? redColor :
                                                       statusSeats("DD2") ? grayColor : greenColor
                                                                        }}
                                    disabled={statusSeats2("DD2") ? false :
                                           statusSeats("DD2") ? true : false}
                                    onClick={(e) => {
                                        pickSeat(e.target);
                                    }}
                                  >
                                 </button>  
               <button id="AseatD3"  style={{backgroundColor:statusSeats2("DD3") ? redColor :
                                                       statusSeats("DD3") ? grayColor : greenColor
                                                                        }}
                                    disabled={statusSeats2("DD3") ? false :
                                           statusSeats("DD3") ? true : false}
                                    onClick={(e) => {
                                        pickSeat(e.target);
                                    }}
                                  >
                                 </button>    
               <button id="AseatD4"   style={{backgroundColor:statusSeats2("DD4") ? redColor :
                                                       statusSeats("DD4") ? grayColor : greenColor
                                                                        }}
                                    disabled={statusSeats2("DD4") ? false :
                                           statusSeats("DD4") ? true : false}
                                    onClick={(e) => {
                                        pickSeat(e.target);
                                    }}
                                  >
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
                              <button id="CC1" style={{backgroundColor:statusSeats2(`CC1`) ?
                                             redColor : statusSeats(`CC1`) ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2(`CC1`) ? false :
                                           statusSeats(`CC1`) ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}> 
                                              </button>  
                                <div className="desk4"></div>
                              <button id="CC2" style={{backgroundColor:statusSeats2("CC2") ?
                                             redColor : statusSeats("CC2") ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2("CC2") ? false :
                                           statusSeats("CC2") ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}>

                                        </button>
                              <button id="CC3" style={{backgroundColor:statusSeats2("CC3") ?
                                             redColor : statusSeats("CC3") ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2("CC3") ? false :
                                           statusSeats("CC3") ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}>

                                        </button>
                            </div>

                          <div id="CdeskB">
                          <button id="CC4" style={{backgroundColor:statusSeats2("CC4" ) ?
                                             redColor : statusSeats("CC4" ) ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2("CC4" ) ? false :
                                           statusSeats("CC4" ) ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}>
                                          </button>  
                            <div  className="desk3"> </div>
                          </div>
                              
                            <div id="CdeskC">
                              <button id="CC5" style={{backgroundColor:statusSeats2("CC5") ?
                                             redColor : statusSeats("CC5") ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2("CC5") ? false :
                                           statusSeats("CC5") ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}></button>  
                                <div className="desk3"></div>
                                <button id="CC6" style={{backgroundColor:statusSeats2("CC6") ?
                                             redColor : statusSeats("CC6") ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2("CC6") ? false :
                                           statusSeats("CC6") ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}></button>
                            </div>


                            <div id="CdeskD">
                              <button id="CC7" style={{backgroundColor:statusSeats2("CC7" ) ?
                                             redColor : statusSeats("CC7" ) ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2("CC7") ? false :
                                           statusSeats("CC7") ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}></button>  
                                <div className="desk"></div>
                                <button id="CC8" style={{backgroundColor:statusSeats2("CC8") ?
                                             redColor : statusSeats("CC8") ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2("CC8") ? false :
                                           statusSeats("CC8") ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}></button>
                            </div>

                          <div id="CdeskE">

                              <button id="CC9" style={{backgroundColor:statusSeats2("CC9") ?
                                             redColor : statusSeats("CC9") ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2("CC9") ? false :
                                           statusSeats("CC9") ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}>
                                          </button>  

                                <div className="desk3"></div>
                                <button id="CC10" style={{backgroundColor:statusSeats2("CC10") ?
                                             redColor : statusSeats("CC10") ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2("CC10") ? false :
                                           statusSeats("CC10") ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}>

                                        </button>
                          </div>

                          <div id="CdeskF">

                              <button id="CC11" style={{backgroundColor:statusSeats2("CC11") ?
                                             redColor : statusSeats("CC11") ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2("CC11") ? false :
                                           statusSeats("CC11") ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}>
                                          </button>  

                                <div className="desk3"></div>
                                <button id="CC12" style={{backgroundColor:statusSeats2("CC12") ?
                                             redColor : statusSeats("CC12") ? grayColor : greenColor
                                                                        }}
                                        disabled={statusSeats2("CC12") ? false :
                                           statusSeats("CC12") ? true : false}
                                        onClick={(e) => {
                                        pickSeat(e.target);}}>

                                        </button>
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
                                                    changeClass() ;
                                                  }}/>
                            <label id="reqBoard">לוח בקשות</label>

                            <button id="allReq">לכל הבקשות<OpenWithIcon id="openIcon"/></button>
                            <button id="addReq" onClick={NewRequests} > <label style={{position:'relative' , top:"0%"}}
                                                    >הוסף בקשה</label><AddIcon style={{position:'relative' , top:"0%"}} /></button>
                      </div>
                      <div id="reqStatus">
                      {allRequests.map((req,index) => (
                        req.userId1 === userId ?
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
                                      setSelectedDate(new Date()) , setConfirmDiv(null) ,
                                      setbtnFinishShow(null);
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

             {isManager ? (<input className='btn1'type="button" value="ניהול משתמשים" 
                            onClick={(e) => chooseClasses(e.target.value)}></input> ) : null }
              <input className='btn1' type="button" onClick={(e) => chooseClasses(e.target.value)} value="חדרי ישיבות" />
              <input className='btn1'type="button" value="בקרוב-דיווחים" />
              <input className='btn1' type="button" value="בקשות"  onClick={(e) => chooseClasses(e.target.value)}/>
            
              <div style={{margin:'2% 25%'}}  >
                 <div style={{float: 'left'}} >                  
                    <div style={{ backgroundColor:'rgb(118, 188, 139)',height:'30px',width:'30px',margin:'5px',borderRadius:'5px'}}></div>
                    <div style={{ backgroundColor:'#33BBFF',height:'30px',width:'30px',margin:'5px',borderRadius:'5px'}}></div>
                    <div style={{ backgroundColor:'#E87D7D',height:'30px',width:'30px',margin:'5px',borderRadius:'5px'}}></div>
                    <div style={{ backgroundColor:'rgba(199, 199, 201, 1)',height:'30px',width:'30px',margin:'5px',borderRadius:'5px'}}></div>
                 </div>
                <div style={{textAlign:'right'}} >
                        <div> <h6 style={{height:'30px',alignItems:'right'}}>זמין</h6></div>
                    
                        <div><h6  style={{height:'30px',alignItems:'right'}}>ממתין</h6></div>
                                  
                        <div> <h6  style={{height:'30px',alignItems:'right'}}>מקום משורין</h6></div>
                    
                        <div> <h6  style={{height:'30px',alignItems:'right'}}> לא זמין</h6></div>
                 

                </div>
             </div>
              { btnFinishShow} 
          
            </div>



          </Col>
          </Row>
            
      </Container>
   
        {pickDiv}

        {MoreThanOne ? (<div id="moreThanOne">
                           <DisabledByDefaultIcon id="exitIcon" onClick={() => {setMoreThanOne(false)}} />
                           <label id="moreThanOneBoard">לרשותך רק שריון מקום אחד ליום</label>
                           <button id='confimMoreThan' onClick={() => {setMoreThanOne(false)}}>אישור</button>

                          </div>) : null}
          
        {notYourClass ? (<div id="moreThanOne">
                           <DisabledByDefaultIcon id="exitIcon" onClick={() => {
                             setClassName(location.state.classId) , changeClass()
                             }} />
                           <label id="notYourClassBoard">אין גישה למחלקה זאת, להמשך טיפול תשלח בקשה</label>
                           <button id='confimnotYourClass' onClick={() => {setnotYourClass(false) ,
                            NewRequests()}}>הוסף בקשה<AddIcon style={{position:'relative' , top:"0%"}} /> 
                             </button>
                        </div>) : null}

        {newReqSuccess}

        {newReqY ? <div id='newReq'>
                      <DisabledByDefaultIcon id="xIcon"  onClick={() => {setNewReq(null) , 
                                                                   changeClass(),
                                                              setnewReqY(false) 
                                                              }}/>
                      <div id='newReq1'>
                          <h1 >בקשה חדשה </h1>
                          
                          
                        <input type='text' id='inputReq'onChange={(e) => {setSubReq(e.target.value)}}></input>
                        <label>נושא הבקשה</label>

                        <label>פירוט הבקשה</label>
                        <br />
                        <textarea id="textDetail" onChange={(e) => {setdetailReq(e.target.value)}}></textarea>
                      </div>
                 <button id="sendReq" onClick={() => {sendReq() , setIsBlurred(false)}}>שליחת הבקשה<SendIcon id="sendIcon" /></button> 
                    </div> : null}

        { catch1Hide ? null : (<div id="Catch1">תפוס</div>)}

        { catch2Hide ? null : (<div id="Catch2">תפוס</div>)}

        { catch3Hide ? null : (<div id="Catch3">תפוס</div>)}

        { catch4Hide ? null : (<div id="Catch4">תפוס</div>)}


    </>
  )
}
