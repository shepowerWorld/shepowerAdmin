import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Card, Breadcrumb } from "react-bootstrap";
import DataTableExtensions from "react-data-table-component-extensions";
//import { API_URL, KYC_img, Profile_img } from "../../../service";
import { useLocation, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { APiURl } from "../../Services/ApiAddress";

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

const Export = ({ onExport }) => (
  <Button onClick={(e) => onExport(e.target.value)}>Export</Button>
);

function Alerts() {
  const [result, setResult] = useState();
  const [data, Setdata] = useState([]);
  console.log(data);
  const [combinedData, setCombinedData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://13.126.45.34:6002/getAllPAP", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        Setdata(result.result);
        console.log("result", result);
        const filterdata = result.result.map((items) => {
          const { text } = items;

          return {
            text,
          };
        });
        setCombinedData(filterdata);
      })
      .catch((error) => console.log("error", error));
  };

  const Delete = (id) => {
    console.log("id", id);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(APiURl + `deletePAP/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        getAll();
        Primaryalert(result.message);
      })
      .catch((error) => console.log("error", error));
  };

  const columns = [
    {
      name: "Privacy Policy",
      selector: (row) => row.text,
      sortable: true,
      wrap: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      wrap: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <Button
          variant=""
          className="btn btn-info-light rounded-pill"
          onClick={() =>
            navigate(
              "/app/UpdatePrivacyPolicy",
              {
                state: row,
              },
              console.log("navigated", row)
            )
          }
          icon="true"
          style={{
            height: "30px",
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(25,192,192,.2)",
          }}>
          Update
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      name: "Action",
      selector: (row) => row._id,
      sortable: true,
      cell: (row) => (
        <Button
          variant=""
          type="button"
          className="btn rounded-pill btn-danger-light"
          onClick={() => Delete(row._id)}
          style={{
            height: "30px", // Set the desired height here
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(243,67,67,.2)",
          }}>
          Delete
        </Button>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(combinedData)} />,
    [combinedData]
  );

  function Primaryalert(message) {
    Swal.fire({
      title: "Well done!",
      icon: "success",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
      text: message,
    });
  }

  return (
    <>
      <div>
        <div className="main-container container-fluid">
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
              <span className="main-content-title mg-b-0 mg-b-lg-1"></span>
            </div>
          </div>

          <Row className=" row-sm">
            <Col lg={12}>
              <Card className="w-100">
                <div
                  style={{
                    width: "100% !important",
                    float: "right",
                    marginRight: "40px",
                  }}>
                  <Button
                    variant=""
                    className="btn rounded btn-primary text-white"
                    onClick={() => navigate("/app/AddPrivacyPolicy")}
                    icon="true"
                    style={{
                      height: "30px", // Set the desired height here
                      marginTop: 20,
                      float: "right",
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(243,63,129,255)",
                    }}>
                    Add Privacy Policy
                  </Button>
                </div>
                <Card.Body className="custom-card">
                  <div>
                    <h6 className="main-content-label mb-1">
                      {/* Sender Kyc Mangement */}
                    </h6>
                  </div>
                  <div className="table-responsive fileexport pos-relative">
                    <DataTableExtensions {...tableData}>
                      <DataTable
                        columns={columns}
                        data={data}
                        actions={actionsMemo}
                        selectableRows
                        pagination
                      />
                    </DataTableExtensions>
                  </div>
                  <div></div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Alerts;
