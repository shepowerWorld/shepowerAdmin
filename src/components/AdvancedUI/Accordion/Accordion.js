import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Card,
  Breadcrumb,
  Form,
} from "react-bootstrap";

import { APiURl, socket } from "../../Services/ApiAddress";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "./main.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Profile_img } from "../../Services/ApiAddress";

const Calendar = () => {
  const router = useNavigate();
  const [combinedData, setCombinedData] = useState([]);
  const token = sessionStorage.getItem('token');
  const [data, setdata] = useState();
  useEffect(() => {
    getallgroups();
  }, [])

  const Blockuser = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "_id": "650ad7596d19058c71e5221f"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://13.126.45.34:6002/groupBlockUnblock", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status == true) {
          getallgroups();
          Title(result.message)
        }
      })
      .catch(error => console.log('error', error));
  }

  function Title(message) {
    Swal.fire({
      title: "Well done!",
      icon: "success",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
      text: message,
    });
  }
  const getallgroups = () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(APiURl+"groupmanagement", requestOptions)
      .then(response => response.json())
      .then(result => {
        setdata(result.response)
        console.log("group",result)
      })
      .catch(error => console.log('error', error));
  }
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const CustomSwitch = ({ checked, onChange }) => (
    <div
      className={`custom-switch ${checked ? "active" : ""}`}
      onClick={onChange}
    >
      <div className={`switch-slider ${checked ? "active" : ""}`} />
    </div>
  );

  const columns = [
    {
      name: "Profile Image",
      selector: (row) => row.profileID,
      sortable: true,
      wrap: true,
      maxWidth: "40px",
      cell: (row) => (
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          overflow: 'hidden',
        }}
        //  onClick={()=>{ row.profile_img != " " && openmodal(Profile_img + row.profile_img)}}
        >
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            src={row.group_profile_img != " " ? Profile_img + row.group_profile_img : require('../../../assets/img/defalutavtar.jpg')}
            alt="Image"
          /></div>
      ),
    },

    {
      name: "Group Name",
      selector: (row) => row.groupName,
      sortable: true,
      wrap: true,
      maxWidth: "270px",
    },

    {
      name: "Admin Name",
      selector: (row) => row.admin_id.firstname,
      sortable: true,
      wrap: true,
      maxWidth: "270px",
    },
    {
      name: "No of Participants Joined",
      selector: (row) => row.totalParticepants,
      sortable: true,

      maxWidth: "270px",
      cell: (row) => (
        <button
          className="w-25"
          style={{
            height: "30px",
            width: "50px",
            borderColor: "rgba(243,63,129,255)",
            backgroundColor: "rgba(243,63,129,255)",
            borderRadius: "50rem",
          }}
          onClick={() => { router("/app/filemanager", { state: row.joining_group }) }}
        >
          {row.totalParticepants}{" "}
        </button>
      ),
    },
    {
      name: "No of Pending Request",
      selector: (row) => row.totalrequestcount,
      sortable: true,
      maxWidth: "270px",
      cell: (row) => (
        <button
          className="w-25"
          style={{
            height: "30px",
            width: "50px",
            borderColor: "rgba(243,63,129,255)",
            backgroundColor: "rgba(243,63,129,255)",
            borderRadius: "50rem",
          }}
        // onClick={()=>{router("/app/filemanager1")}}
        >
          {row.totalrequestcount}{" "}
        </button>
      ),
    },

    {
      name: "Actions",
      cell: (row) => (
        <CustomSwitch

          checked={row.adminBlock == true}
          onChange={() => Blockuser(row._id)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      name: "Join Room",
      selector: (row) => row,
      sortable: true,
      cell: (row) => (
        <button
          className="w-25"
          style={{
            height: "30px",
            minWidth: "100px",
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            borderColor: "rgba(243,63,129,255)",
            backgroundColor: "rgba(243,63,129,255)",
            borderRadius:"50rem"
          }}
          onClick={() => { 
            socket.emit('joinRoom', row.room_id)
            console.log("joining room",row.room_id)
            router("/app/ChatRoom",
           { state: row },
          );
        }}
        >
          Join 
        </button>
      ),
    },
  ];

  const groupBlockUnblock = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "text/plain");

    var raw = JSON.stringify({
      "_id": id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(APiURl + "adminBlock", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.status)
        if (result.status == true) {
          getallgroups();
          Title(result.message)
        }

      })
      .catch(error => console.log('error', error));
  }



  const tableData = {
    columns,
    data,
  };

  const Export = ({ onExport }) => (
    <Button onClick={(e) => onExport(e.target.value)}>Export</Button>
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(combinedData)} />,
    [combinedData]
  );

  return (
    <>
      <div style={{}}>
        <div className="main-container container-fluid">
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
              <span className="main-content-title mg-b-0 mg-b-lg-1">
                GROUP MANGEMENT
              </span>
            </div>
            <div className="justify-content-center mt-2">
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
                  GROUP MANGEMENT
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item "
                  active
                  aria-current="page"
                >
                  All GROUPS
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>

          <Row className=" row-sm">
            <Col lg={12}>
              <Card className="custom-card">
                <Card.Body>
                  <div>
                    <h6 className="main-content-label mb-1">
                      {/* Sender Kyc Mangement */}
                    </h6>
                    {/* <p className="text-muted card-sub-title">
                  Exporting data from a table can often be a key part of a
                  complex application. The Buttons extension for DataTables
                  provides three plug-ins that provide overlapping functionality
                  for data export:
                </p> */}
                  </div>
                  <div className="table-responsive fileexport pos-relative">
                    <DataTableExtensions {...tableData}>
                      <DataTable
                        columns={columns}
                        data={data}
                        actions={actionsMemo}
                        selectableRows
                        pagination
                        style={{ position: "relative" }}
                      />
                    </DataTableExtensions>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Calendar;
