import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
//import './Cards.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "../../main.css";
import Swal from "sweetalert2";
import { APiURl } from "../../Services/ApiAddress";
import { Profile_img } from "../../Services/ApiAddress";
import { useLocation, useNavigate } from "react-router-dom";

const Attachments = () => {
  const location = useLocation();
  const data = location.state;
  const [combinedData, setCombinedData] = useState(data);
  const [ModalTrue, setModalTrue] = useState(false);
  const [ImageUrl, setImageUrl] = useState();

  const enlargeModalImage = (imageutl) => {
    setImageUrl(imageutl);
    setModalTrue(true);
  };

  const columns = [
    {
      name: "Post Image",
      selector: (row) => row.Post,
      sortable: true,
      wrap: true,

      cell: (row) => (
        <button
          onClick={(e) => {
            enlargeModalImage(Profile_img + row.Post);
          }}
          style={{
            width: "50px",
            height: "50px",
            marginBottom: "10px",
            marginTop: "10px",
            border: "none",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={
              row.Post != " "
                ? Profile_img + row.Post
                : require("../../../assets/img/defalutavtar.jpg")
            }
            alt="Image"
          />
        </button>
      ),
    },

    {
      name: "Post Description",
      selector: (row) => row.Post_discription,
      sortable: true,
      wrap: true,
    },
    {
      name: "Total Likes ",
      selector: (row) => row.totallikesofpost,
      sortable: true,
      wrap: true,
    },
    {
      name: "Total Comments ",
      selector: (row) => row.totalcomments,
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
  const handleClose = () => {
    setModalTrue(false);
  };

  console.log(data);
  return (
    <>
      <div style={{}}>
        <div className="main-container container-fluid">
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
              <span className="main-content-title mg-b-0 mg-b-lg-1">Posts</span>
            </div>
            <div className="justify-content-center mt-2">
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
                  Users Post
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item "
                  active
                  aria-current="page"
                >
                  Post
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
        <Modal show={ModalTrue} onHide={handleClose}>
          <Modal.Body style={{}}>
            <img
              src={ImageUrl}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

Attachments.propTypes = {};

Attachments.defaultProps = {};

export default Attachments;
