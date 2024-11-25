import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Card, Breadcrumb } from "react-bootstrap";
import DataTableExtensions from "react-data-table-component-extensions";
//import { API_URL, KYC_img, Profile_img } from "../../../service";
import { useLocation, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

import { Link } from "react-router-dom";
import Slider from "react-slick";


const Collapse = () => {
  const columns = [

    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true
    },
    // {
    //   name: "Created At",
    //   selector: (row) => new Date(row.createdAt).toLocaleDateString(),
    //   sortable: true,
    //   wrap: true
    // },

    {
      name: "Actions",
      cell: (row) => (
        <Button
          variant=""
          className="btn btn-info-light rounded-pill"
          

          icon="true"
          style={{
            height: '30px',
            width: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#9e9e9e',
          }}
        >
          Update
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      name: "Action",
      selector: (row) => row.back_image1,
      sortable: true,
      cell: (row) =>
        <Button
          variant=""
          type="button"
          className="btn rounded-pill btn-danger-light"
        
          style={{
            height: '30px', // Set the desired height here
            width: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#AEC6CF',
          }}
        >Delete
        </Button>

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
  
  const Export = ({ onExport }) => (
    <Button onClick={(e) => onExport(e.target.value)}>Export</Button>
  );
  
  const tableData = {
    columns,
    // data,
  };
  // const actionsMemo = React.useMemo(
  //   // () => <Export onExport={() => downloadCSV(combinedData)} />,
  //   // [combinedData]
  // );
  return(
    <>
    <div >
      <div className="main-container container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="left-content">
            <span className="main-content-title mg-b-0 mg-b-lg-1">
              No.of Professionals : 
            </span>
          </div>

        </div>

        <Row className=" row-sm">
          <Col lg={12}>
            <Card className="custom-card">
              <Button
                variant=""
                className="btn rounded-pill btn-primary text-white"
               

                icon="true"
                style={{
                  height: '30px', // Set the desired height here
                  width: '170px',
                  marginTop: 20,
                  marginLeft: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(to right, pink, orange 30%, lightgreen 70%)',
                }}
              >
                Add Professional
              </Button>
              <Card.Body>
                <div>
                  <h6 className="main-content-label mb-1">
                    {/* Sender Kyc Mangement */}
                  </h6>

                </div>
                <div className="table-responsive fileexport pos-relative">
                  <DataTableExtensions {...tableData}>
                    <DataTable
                      columns={columns}
                      // data={data}
                      // actions={actionsMemo}
                      selectableRows
                      pagination
                    />
                  </DataTableExtensions>
                </div>
                <div>

                </div>


              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>


  </>
);}

Collapse.propTypes = {};

Collapse.defaultProps = {};

export default Collapse;
