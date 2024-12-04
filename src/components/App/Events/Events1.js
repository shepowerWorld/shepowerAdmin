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
import data from "../../appps3.js";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { APiURl } from "../../Services/ApiAddress";
import "../../main.css";
import { Profile_img } from "../../Services/ApiAddress";

const Events = () => {
  const [data, Setdata] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [ImageURl, setImageURl] = useState([]);
  const [modalopen, setmodalopen] = useState(false);
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    handle();
  }, []);

  const handle = async () => {
    try {
      var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(APiURl + "allEvents", requestOptions);
      const result = await response.json();
      console.log("events", result);

      const currentDate = new Date();
      const twoDaysLater = new Date(currentDate);
      twoDaysLater.setDate(currentDate.getDate() + 2); // Calculate the date that is two days later

      const upcomingEventsWithin2Days = result.response.filter((item) => {
        const eventDate = new Date(item.eventtime);

        // Check if the eventDate falls within the next 2 days
        return eventDate >= currentDate && eventDate <= twoDaysLater;
      });

      setCombinedData(upcomingEventsWithin2Days)

      console.log(upcomingEventsWithin2Days);
      Setdata(upcomingEventsWithin2Days);
      console.log("result", new Date().toLocaleDateString());

      console.log("result", currentDate);
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
      onClick={onChange}
    >
      <div className={`switch-slider ${checked ? "active" : ""}`} />
    </div>
  );

  const handleClick = (link) => {
    window.open(link, "_blank");
  };
  const columns = [
    {
      name: "GroupImage",
      selector: (row) => row.eventimage,
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
            row.eventimage != " " && openmodal(Profile_img + row.eventimage);
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={
              row.eventimage != " "
                ? Profile_img + row.eventimage
                : require("../../../assets/img/defalutavtar.jpg")
            }
            alt="GroupImage"
          />
        </div>
      ),
    },

    {
      name: "Event Name",
      selector: (row) => row.eventname,
      sortable: true,
      wrap: true,
    },
    {
      name: "Event description",
      selector: (row) => row.eventdescription,
      sortable: true,
      wrap: true,
    },
    {
      name: "Event location",
      selector: (row) => row.eventlocation,
      sortable: true,
      wrap: true,
    },
    {
      name: "Timings",
      selector: (row) => row.eventtime,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <div>
          <div>Date: {new Date(row.eventtime).toLocaleDateString()}</div>
          <div>Time: {new Date(row.eventtime).toLocaleTimeString()}</div>
        </div>
      ),
    },

    {
      name: "Google Meet link",
      selector: (row) => row.eventlink,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <span
          onClick={(e) => {
            handleClick(row.eventlink, e);
          }}
        >
          {row.eventlink}
        </span>
      ),
    },
  ];

  const openmodal = (imageurl) => {
    setImageURl(imageurl);
    setmodalopen(true);
  };

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
                Upcoming Events
              </span>
            </div>
            <div className="justify-content-center mt-2">
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
                  Events
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item "
                  active
                  aria-current="page"
                >
                  Upcoming Events
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

Events.propTypes = {};

Events.defaultProps = {};

export default Events;
