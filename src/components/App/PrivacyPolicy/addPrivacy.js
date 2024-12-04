import React,{useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "react-draft-wysiwyg";
import { Button, Form, Table, FormGroup } from "react-bootstrap";
// import { API_URL } from "../../../../service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { APiURl } from "../../Services/ApiAddress";

 function FormEditorstyle1  () {

  const [isLoading, setIsLoading] = useState(false);
  const [editorContent, setEditorContent] = useState("");
    
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate()

    function Warningalert(errorMessage) {
      Swal.fire({
        title: errorMessage,
        icon: "warning",
      });
    }

    

    const Addprivacy =()=> {


      setIsLoading(true)

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "text": editorContent
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
        console.log("raw..",raw)

        fetch(APiURl+"addPAP", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            if(result.status === true){
              setIsLoading(false)
              Swal.fire("", "Privacy Policy Added successfully", "success");
              navigate("/app/PrivacyPolicy")

            } else {
              Warningalert(result.message)
              setIsLoading(false)
            }
          })
          .catch(error => {
            setIsLoading(false)
            console.log('error', error)})
         

    }
  
  
    return (
      <div
      className="app-container"
      style={{ width: "80%", marginLeft: "10%", marginTop: "3%" }}
    >
      
      <FormGroup className="form-group">
        <label className="labelfont">Add Privacy Policy</label>
        <textarea
          style={{
            height :200
          }}
          type="text"
          value={editorContent}
          className="form-control border"
          id="inputEmail3"
          placeholder="Enter Privacy Policy"
          onChange={(e) => {
            setEditorContent(e.target.value);
          }}
          
        />
      </FormGroup>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant=""
          className="btn btn-primary mb-3 px-50"
          icon="true"
                    style={{
                      height: "50px", // Set the desired height here
                      marginTop: 20,
                      float: "right",
                      marginRight: "30px",
                      display: "flex",
                      padding: "5px 70px",
                      fontSize: "16px",
                      fontWeight: "700",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "rgba(243,63,129,255)",
                    }}
        //   style={{ padding: "5px 70px", fontSize: "16px", fontWeight: "700" }}
          disabled={isLoading}
          onClick={()=>Addprivacy()}
        >
          Create  Privacy Policy
        </Button>
      </div>

    </div>
    );
  };

  export default FormEditorstyle1