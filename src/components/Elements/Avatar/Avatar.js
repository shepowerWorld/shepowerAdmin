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

function Avatar() {
  const [data, setData] = useState([]);
  const [result, setResult] = useState();
  const [combinedData, setCombinedData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    allcatogery();
  }, []);

  const allcatogery = () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(APiURl+"getSubCategory", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        setData(result.categoryList);
        const filtereddata = result.categoryList.map((items) => {
          const { category, subcategories } = items;

          const { name: categoryName } = category;
          const subcategoriesName = subcategories.map((subcategory) => subcategory.name); // Extract names from subcategories

  console.log("subcategories", subcategories);
          console.log("subcategories",subcategories)
          return {
            categoryName,
            subcategoriesName,
          };
        });
        console.log("filtereddata",filtereddata)

        setCombinedData(filtereddata);
      })
      .catch((error) => console.log("error", error));
  };

  function openSubcategoryModal(subcategory) {
    const list = subcategory;
    setSelectedSubcategory(list);
    console.log("list", list);
    setModalVisible(true);
    // Logic to open the modal here (e.g., changing modal state)
  }

  function closeModal() {
    setModalVisible(false);
    setSelectedSubcategory(null); // Clear the selected subcategory
  }

  function Primaryalert(messsage) {
    Swal.fire({
      title: "Well done!",
      icon: "success",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
      text: messsage,
    });
  }

  function handleDelete(subcategoryId) {
    console.log("id", subcategoryId);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(
      APiURl+`deleteSubCategory/${subcategoryId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("delete", result);
        if (result.message.includes("delete")) {
          Primaryalert(result.message);
          closeModal();
          allcatogery();
        }
      })
      .catch((error) => console.log("error", error));
  }

  function handleUpdate(subcategory) {
    navigate(
      `${process.env.PUBLIC_URL}/elements/avatar2`,
      {
        state: subcategory,
      },
      console.log("navigating data", subcategory)
    );
  }

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.category.name,
      sortable: true,
      wrap: true,
    },

    {
      name: "subcatogery",
      selector: (row) => row.subcategories.name,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {row.subcategories.map((list, index) => (
            <div
              key={list.id}
              style={{
                padding: "4px",
                margin: "2px",
                width: "auto",
                // boxSizing: "border-box",
                // wordBreak: "break-word", // Allow long subcategory names to break
              }}
            >
              <Button onClick={() => openSubcategoryModal(list)}>
                {list.name}
              </Button>
            </div>
          ))}
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

  return (
    <>
      <div>
        <div className="main-container container-fluid">
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
              <span className="main-content-title mg-b-0 mg-b-lg-1">
                SubCategory
              </span>
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
                  }}
                >
                  <Button
                    variant=""
                    className="btn rounded btn-primary text-white"
                    onClick={() => navigate("/elements/avatar1")}
                    icon="true"
                    style={{
                      height: "30px", // Set the desired height here
                      width: "200px",
                      marginTop: 20,
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "rgba(243,63,129,255)",
                    }}
                  >
                    Add SubCategory
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
                  <div>
                    <Modal show={modalVisible} onHide={() => closeModal()}>
                      <Modal.Header closeButton>
                        <Modal.Title>Subcategory Options</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {selectedSubcategory && (
                          <div
                            style={{
                              display: "flex",
                              gap: 5,
                            }}
                          >
                            <Button
                              onClick={() =>
                                handleDelete(selectedSubcategory.id)
                              }
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={() => handleUpdate(selectedSubcategory)}
                            >
                              Update
                            </Button>
                          </div>
                        )}
                      </Modal.Body>
                    </Modal>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Avatar;
