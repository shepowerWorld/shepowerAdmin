import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row, Table, Button, Modal, ModalBody } from "react-bootstrap";
//import './Cards.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "../../main.css"
import "./Cards.css"
import Swal from "sweetalert2";
import { APiURl,socket} from "../../Services/ApiAddress";
import { Profile_img } from "../../Services/ApiAddress";
const Cards = () => {
  const [data, Setdata] = useState([]);
  const [ImageURl, setImageURl] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [modalopen, setmodalopen] = useState(false);
  const token = sessionStorage.getItem('token');
  const dateConverted = (date) => {
    const formatedDate = new Date(date);
    return formatedDate.toLocaleDateString();
  };
  useEffect(() => {
    handle();
  }, []);

  console.log("scoket....",socket)

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

  const handle = async () => {
    try {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(
        APiURl + "getAllUsers",
        requestOptions
      );
      const result = await response.json();
      Setdata(result.response);

      const iscombinedData = result.response.map((users) => {
        const { firstname, lastname, mobilenumber, email, dateConverted, adminBlock } = users
        return {
          firstname, lastname, mobilenumber, email, dateConverted, adminBlock
        }

      })
      setCombinedData(iscombinedData)
      console.log("result", result)
    } catch (error) {
      console.log("error", error);
    }
  };

  const openmodal = (imageurl) => {
    setImageURl(imageurl)
    setmodalopen(true)
  }

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
        }} onClick={() => { row.profile_img != " " && openmodal(Profile_img + row.profile_img) }}>
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            src={row.profile_img != " " ? Profile_img + row.profile_img : require('../../../assets/img/defalutavtar.jpg')}
            alt="Image"
          /></div>
      ),
    },
    {
      name: "Profile Id",
      selector: (row) => row.profileID,
      sortable: true,
      wrap: true,
    },
    {
      name: "First Name",
      selector: (row) => row.firstname ? row.firstname : 'N/A',
      sortable: true,
      wrap: true,
    },

    {
      name: "Last Name",
      selector: (row) => row.lastname ? row.lastname : 'N/A',
      sortable: true,
      wrap: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobilenumber ? row.mobilenumber : 'N/A',
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email ? row.email : 'N/A',
      sortable: true,
      wrap: true,
    },
    {
      name: "DOB",
      selector: (row) => dateConverted(row.dob) ? dateConverted(row.dob) : 'N/A',
      sortable: true,
      wrap: true,
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
  ];

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
  const Blockuser = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

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
        console.log("result of Block",result)
        if (result.status === true) {
          handle();
          socket.emit("AdminBlock",result.response)
          console.log("Scoket Block..",result.response)
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

  const handleChange = (e) => { };

  const handleChange1 = (e) => { };

  const handechange = () => {
    setmodalopen(false)
  }

  return (
    <>
      <div style={{}}>
        <div className="main-container container-fluid">
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
              <span className="main-content-title mg-b-0 mg-b-lg-1">
                All Users
              </span>
            </div>
            <div className="justify-content-center mt-2">
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
                  Users Mangement
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item "
                  active
                  aria-current="page"
                >
                  All Users
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
          <Modal show={modalopen} onHide={handechange} aria-labelledby="contained-modal-title-vcenter" style={{ marginLeft: "10%" }}>
            <ModalBody style={{ width: "fit-content", }}>

              <img src={ImageURl} style={{ width: "150px", maxHeight: "150px", objectFit: "contain" }} />
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Cards;
