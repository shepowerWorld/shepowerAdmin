import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Card, Breadcrumb } from "react-bootstrap";
import DataTableExtensions from "react-data-table-component-extensions";
//import { API_URL, KYC_img, Profile_img } from "../../../service";
import { useLocation, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { APiURl, Profile_img } from "../../Services/ApiAddress";
import { Rating, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

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

    fetch(APiURl + "getAllratingsReview", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        Setdata(result.result);
        console.log("result", result);
        const filterdata = result.FAQ.map((items) => {
          const { Question, Answer } = items;

          return {
            Question,
            Answer,
          };
        });

        setCombinedData(filterdata);
      })
      .catch((error) => console.log("error", error));
  };

  const Delete = (id) => {
    console.log("id", id);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(APiURl + `deleteFAQ`, requestOptions)
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
      name: "Leader Name",
      selector: (row) => row.leaderuserDeatils[0]?.firstname,
      sortable: true,
      wrap: true,
    },

    {
      name: " Leader Profile ",
      selector: (row) => row.leaderuserDeatils[0]?.profile_img,
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
              row.leaderuserDeatils[0]?.profile_img != " "
                ? Profile_img + row.leaderuserDeatils[0]?.profile_img
                : require("../../../assets/img/defalutavtar.jpg")
            }
            alt="Image"
          />
        </div>
      ),
    },

    {
      name: "Leader Courageous",
      selector: (row) => row.courageous,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <Stack
          spacing={1}
          className="rating-stars block my-rating-7 ratingcenter">
          <Rating
            name="half-rating-read"
            value={row.courageous}
            max={5}
            size="large"
            readOnly
          />
        </Stack>
      ),
    },

    {
      name: "Leader Efficient",
      selector: (row) => row.efficient,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <Stack
          spacing={1}
          className="rating-stars block my-rating-7 ratingcenter">
          <Rating
            name="half-rating-read"
            value={row.efficient}
            max={5}
            size="large"
            readOnly
          />
        </Stack>
      ),
    },

    {
      name: "Leader Helpful",
      selector: (row) => row.helpful,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <Stack
          spacing={1}
          className="rating-stars block my-rating-7 ratingcenter">
          <Rating
            name="half-rating-read"
            value={row.helpful}
            max={5}
            size="large"
            readOnly
          />
        </Stack>
      ),
    },

    {
      name: "Leader Knowledgeable",
      selector: (row) => row.knowledgeable,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <Stack
          spacing={1}
          className="rating-stars block my-rating-7 ratingcenter">
          <Rating
            name="half-rating-read"
            value={row.knowledgeable}
            max={5}
            size="large"
            readOnly
          />
        </Stack>
      ),
    },

    {
      name: "Citizen Name",
      selector: (row) => row.citizenuserDeatils[0]?.firstname,
      sortable: true,
      wrap: true,
    },

    {
      name: " Citizen Profile ",
      selector: (row) => row.citizenuserDeatils[0]?.profile_img,
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
              row.leaderuserDeatils[0]?.profile_img != " "
                ? Profile_img + row.leaderuserDeatils[0]?.profile_img
                : require("../../../assets/img/defalutavtar.jpg")
            }
            alt="Image"
          />
        </div>
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
