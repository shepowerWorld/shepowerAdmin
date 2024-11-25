import React, { useEffect, useState ,useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import { Breadcrumb,
    Button,
    Card,
    Col,
    Dropdown,
    Nav,
    OverlayTrigger,
    Row,
    Tooltip,} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { APiURl,Profile_img,socket } from "../../Services/ApiAddress";
import "./catroom.css"




function Chatroom () {

    const [message,setMessage]=useState('')
    const [chatmessage,setChatmessage]=useState([])
    const scrollbarsRef = useRef(null);

    const location = useLocation()
    const token = sessionStorage.getItem('token');
    // console.log("scoket",socket)
    const response = location?.state
    const Group_name = response?.groupName
    const roomid = response?.room_id
    const senderid = response?.mainadmin_id
    const group_profile = response?.group_profile_img
   
    
  const handleMessageReceived = (data) => {
    console.log('message....listing', data);
    setChatmessage((prevMessages) => [...prevMessages, data]);
    scrollToBottom()
  };

 useEffect(() => {
  socket.on('messageSend', handleMessageReceived);
  socket.emit('joinRoom',roomid)
  allmesseges();

  return () => {
     console.log("scoket disconnecting")
  }

  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatmessage]);

  const scrollToBottom = () => {
    if (scrollbarsRef.current) {
      const scrollbars = scrollbarsRef.current;
      scrollbars.scrollToBottom();
    }
  };


 

   const allmesseges =()=> {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

    fetch(APiURl+"getmessage/" + roomid, requestOptions)
      .then(response => response.json())
      .then(result => {console.log("get",result)
          if(result.status==="Success") {
        
            let allmsg = []
            for (let i=0;i<result.result.length;i++){
              allmsg.push(result.result[i])
            }
            console.log("allmessages",allmsg)
            setChatmessage(allmsg)
          }
      })
      .catch(error => console.log('error', error));
   }

   


    const sendmessage =()=>{
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "sender_id": senderid,
        "room_id": roomid,
        "senderName": "Admin",
        "msg": message
        });
      
        console.log('joined room emitting',raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

        fetch(APiURl+"storeMessage", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status==="Success") {
                socket.emit('message',result.results)
                console.log("emitt",result.results)
                setMessage("");
               
            }
        })
        .catch(error => console.log('error', error));
    }



    

    return (
        <div>
            <Row style={{marginTop:20,marginLeft:200,}} className=" row-sm mb-4">
        <Col xl={12}>
          <Row>
            <Col xl={4} lg={20}>
              <Card style={{width:500}}>
              <div  className="main-chat-body" id="ChatBody">
              <Nav
                      className="nav main-nav-line main-nav-line-chat"
                      defaultActiveKey="Recent"
                    >
                      <Nav.Item>
                        <div style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center',justifyContent:'center'}}>
                        <img style={{width:35,height:35,borderRadius:'100%',alignItems:'center',justifyContent:'center',display:'flex'}} src={Profile_img+group_profile} alt="" /> 
                      <span style={{fontSize:16,fontWeight:700,color:'rgb(243, 63, 129)'}}>{Group_name}</span>
                        </div>
                       
                      </Nav.Item>
                    </Nav>
                      <Scrollbars ref={scrollbarsRef} style={{ height:"500px", }}>
                      {/* <div className="main-msg-wrapper right"> */}
                      {chatmessage.map((msg,index ) => (
                        <div key={index} 
                        className={msg.sender_id === senderid ? "sent-message" : "received-message"} 
                        >
                         <div className="message-header">
                      <span>{msg.senderName}</span>
                    </div>
                    <div className="message-body">
                      {msg.message}
                    </div>
                    <div className="message-footer">
                    <span className="message-time">{msg.Time}</span>
                    </div>
                           
                        </div>
                      ))}
                      {/* {chatmessage.map((msg,index) => (
                          <div key={index}>
                          <p style={{ width: 50 }}>{msg.message}</p>
                        </div>
                        <p style={{width:50}} key={index}>{msg.message}</p>
                      ))} */}
                              
                      </Scrollbars>
                      <div className="main-chat-footer">
                      <Nav className="nav"></Nav>
                      <input
                       style={{outline:'rgb(243, 63, 129)',borderColor:'rgb(243, 63, 129)'}}
                        className="form-control"
                        placeholder="Type your message here..."
                        type="text"
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            sendmessage();
                          }
                        }}
                      />
                      {/* <OverlayTrigger
                        placement="top"
                        href=""
                        overlay={<Tooltip>Add Emoticons</Tooltip>}
                      >
                        <i className="nav-link me-2 fe fe-paperclip"></i>
                      </OverlayTrigger> */}
                     <Button
                     onClick={sendmessage}
                    
                     >
                        <i className="fe fe-send"></i>
                        </Button>
                    </div>
                    </div>
              </Card>
              </Col>
              </Row>
              </Col>
              </Row>
        </div>
    )
}
export default Chatroom