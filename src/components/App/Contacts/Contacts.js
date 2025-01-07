import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Table,
  Button,
  Modal,
  ModalBody,
} from "react-bootstrap";
import "./Contacts.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "../../main.css";
import "./main.css";
import Swal from "sweetalert2";
import { APiURl, Profile_img, socket } from "../../Services/ApiAddress";

const Contacts = () => {
  const [data, Setdata] = useState([]);
  const [result2, setResult2] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setloading] = useState(true);
  const [ImageURl, setImageURl] = useState([]);
  const [modalopen, setmodalopen] = useState(false);
  const token = sessionStorage.getItem("token");

  const dateConverted = (date) => {
    const formatedDate = new Date(date);
    return formatedDate.toLocaleDateString();
  };

  useEffect(() => {
    handle();
  }, []);

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
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(APiURl + "getAllUsers", requestOptions);
      const result = await response.json();
      // console.log("leaders..", result.response);

      const filteredData = result.response
        .filter((item) => item.profileID.includes("Leader"))
        .map((item) => ({
          ...item,
          isLeader: false,
        }));

      setCombinedData(filteredData);
      Setdata(filteredData);
      console.log("Data____________________________", filteredData);
    } catch (error) {
      console.log("error", error);
    }
  };

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
      onClick={onChange}>
      <div className={`switch-slider ${checked ? "active" : ""}`} />
    </div>
  );

  const CustomSwitchApprove = ({ checked, onChange }) => (
    <div
      className={`custom-switch ${checked ? "active" : ""}`}
      onClick={onChange}>
      <div className={`switch-slider ${checked ? "active" : ""}`} />
    </div>
  );

  const Blockuser = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      _id: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(APiURl + "adminBlock", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.status);
        if (result.status === true) {
          socket.emit("AdminBlock", result.response);
          console.log("Scoket Block..", result.response);
          handle();
          Title(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const BlockApproveLeader = (id) => {
    console.log("id________________________________", id);
    // api writeen here
    const _id = id;
    handle();
    Title("Leader Approved Successfully");
  };

  const openmodel = (imageurls) => {
    setImageURl(imageurls);
    setmodalopen(true);
  };

  const columns = [
    {
      name: "Profile Image",
      selector: (row) => row.profileID,
      sortable: true,
      wrap: true,
      maxWidth: "40px",
      cell: (row) => (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
          onClick={() => {
            row?.profile_img != " " &&
              openmodel(Profile_img + row?.profile_img);
          }}>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={
              row?.profile_img != " "
                ? Profile_img + row?.profile_img
                : require("../../../assets/img/defalutavtar.jpg")
            }
            alt="Image"
          />
        </div>
      ),
    },
    {
      name: "First Name",
      selector: (row) => row?.firstname,
      sortable: true,
      wrap: true,
    },

    {
      name: "Last Name",
      selector: (row) => row.lastname,
      sortable: true,
      wrap: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobilenumber,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "DOB",
      selector: (row) => dateConverted(row.dob),
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
    {
      name: "Approve/Reject",
      cell: (row) => (
        <CustomSwitchApprove
          checked={row.isLeader == true}
          onChange={() => BlockApproveLeader(row._id)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };

  const Export = ({ onExport }) => (
    <Button onClick={(e) => onExport(e)}>Export</Button>
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(combinedData)} />,
    [combinedData]
  );

  const handleChange = (e) => {};

  const handleChange1 = (e) => {};

  const handechange = () => {
    setmodalopen(false);
  };

  return (
    <>
      <div>
        <div className="main-container container-fluid">
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
              <span className="main-content-title mg-b-0 mg-b-lg-1">
                List of Leaders
              </span>
            </div>
            <div className="justify-content-center mt-2">
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
                  User Management
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item "
                  active
                  aria-current="page">
                  Leader Management
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>

          <Row className=" row-sm">
            <Col lg={12}>
              <Card className="custom-card">
                <Card.Body>
                  <div>
                    <h6 className="main-content-label mb-1"></h6>
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
          <Modal
            show={modalopen}
            onHide={handechange}
            aria-labelledby="contained-modal-title-vcenter"
            style={{ marginLeft: "10%" }}>
            <ModalBody style={{ width: "fit-content" }}>
              <img
                src={ImageURl}
                style={{
                  width: "150px",
                  maxHeight: "150px",
                  objectFit: "contain",
                }}
              />
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Contacts;
