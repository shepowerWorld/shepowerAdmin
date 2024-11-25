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
import data from "../../data3";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "../../main.css"
const Events1 = () => {
  const [combinedData, setCombinedData] = useState([]);
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
      name: "Name",
      selector: (row) => row.LeaderName,
      sortable: true,
      wrap: true,
      maxWidth:"200px"
    },
    
    {
      name: "Number",
      selector: (row) => row.LeaderNumber,
      sortable: true,
      wrap: true,
      maxWidth:"200px"
    },
    {
      name: "description",
      selector: (row) => row.status,
      sortable: true,
      wrap: true,
    },

    
  ];


  
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

  return <>
  <div>
        <div className="main-container container-fluid">
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
              <span className="main-content-title mg-b-0 mg-b-lg-1">
              Helpline
              </span>
            </div>
            <div className="justify-content-center mt-2">
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
                Helpline
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item "
                  active
                  aria-current="page"
                >
                Helpline
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
      </div></>;
};

Events1.propTypes = {};

Events1.defaultProps = {};

export default Events1;





