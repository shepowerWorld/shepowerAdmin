import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row, Table, Button } from "react-bootstrap";
//import './Cards.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "../../main.css";
import Swal from "sweetalert2";
import { APiURl } from "../../Services/ApiAddress";
import { Profile_img } from "../../Services/ApiAddress";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const router = useNavigate();
  const [data, Setdata] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const token = sessionStorage.getItem("token");
  const dateConverted = (date) => {
    const formatedDate = new Date(date);
    return formatedDate.toLocaleDateString();
  };

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
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(APiURl + "getAllShareCitizen", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        Setdata(result.response);

        const dataforexport = result.response.map((items) => {
          const { _id, firstname } = items;
          const connectionss = items.connections.map((conn) => conn?.firstname);
          return {
            _id,
            firstname,
          };
        });
        console.log("dataforexport", dataforexport);
        setCombinedData(dataforexport);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const columns = [
    {
      name: "Profile Image",
      selector: (row) => row.userdeatils.profileID,
      sortable: true,
      wrap: true,

      cell: (row) => (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            overflow: "hidden",
          }}>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={
              row.userdeatils?.profile_img != " "
                ? Profile_img + row.userdeatils?.profile_img
                : require("../../../assets/img/defalutavtar.jpg")
            }
            alt="Image"
          />
        </div>
      ),
    },

    {
      name: "User Name",
      selector: (row) => row.userdeatils?.firstname,
      sortable: true,
      wrap: true,
    },

    {
      name: "User Id",
      selector: (row) => row.userdeatils.profileID,
      sortable: true,
      wrap: true,
    },

    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      wrap: true,
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
      onClick={onChange}>
      <div className={`switch-slider ${checked ? "active" : ""}`} />
    </div>
  );

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
      <div>
        <div className="main-container container-fluid">
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
              <span className="main-content-title mg-b-0 mg-b-lg-1">
                Idea Management
              </span>
            </div>
            <div className="justify-content-center mt-2">
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
                  Citizen
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item "
                  active
                  aria-current="page">
                  Citizen
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

Connections.propTypes = {};

Connections.defaultProps = {};

export default Connections;
