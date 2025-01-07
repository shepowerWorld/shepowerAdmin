import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Swal from "sweetalert2";
import { APiURl, Profile_img, socket } from "../../Services/ApiAddress";
import "../../main.css";

const Cards = () => {
  const [data, setData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const showAlert = (message, type = "success") => {
    Swal.fire({
      title: type === "success" ? "Well done!" : "Error",
      icon: type,
      allowOutsideClick: false,
      confirmButtonText: "OK",
      cancelButtonColor: "#38cab3",
      text: message,
    });
  };

  const fetchData = async () => {
    try {
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
      });

      const response = await fetch(`${APiURl}getAllUsers`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      if (result.response) {
        const leaders = result.response.filter((item) =>
          item.profileID.includes("Leader")
        );
        setCombinedData(leaders);
        setData(leaders);
      } else {
        showAlert("Failed to fetch data. Please try again later.", "error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showAlert("An error occurred while fetching data.", "error");
    }
  };

  const convertArrayToCSV = (array) => {
    if (!array.length) return "";

    const keys = Object.keys(array[0]);
    const csvContent = [
      keys.join(","),
      ...array.map((item) => keys.map((key) => item[key] || "").join(",")),
    ].join("\n");

    return csvContent;
  };

  const downloadCSV = (array) => {
    const csv = convertArrayToCSV(array);
    if (!csv) return;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = "export.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const blockUser = async (id) => {
    try {
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });

      const response = await fetch(`${APiURl}adminBlock`, {
        method: "POST",
        headers,
        body: JSON.stringify({ _id: id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      if (result.status) {
        socket.emit("AdminBlock", result.response);
        fetchData();
        showAlert(result.message);
      } else {
        showAlert(result.message || "Action failed.", "error");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      showAlert("An error occurred while blocking the user.", "error");
    }
  };

  const openModal = (imageUrl) => {
    setImageURL(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setImageURL("");
    setModalOpen(false);
  };

  const columns = [
    {
      name: "Profile Image",
      cell: (row) => (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() =>
            row?.profile_img && openModal(`${Profile_img}${row?.profile_img}`)
          }>
          <img
            src={
              row?.profile_img
                ? `${Profile_img}${row?.profile_img}`
                : require("../../../assets/img/defalutavtar.jpg")
            }
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ),
      sortable: false,
      maxWidth: "50px",
    },
    {
      name: "First Name",
      selector: (row) => row?.firstname || "N/A",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastname || "N/A",
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobilenumber || "N/A",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "N/A",
      sortable: true,
    },
    {
      name: "DOB",
      selector: (row) =>
        row.dob ? new Date(row.dob).toLocaleDateString() : "N/A",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          variant={row.adminBlock ? "danger" : "success"}
          size="sm"
          onClick={() => blockUser(row._id)}>
          {row.adminBlock ? "Unblock" : "Block"}
        </Button>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div className="main-container container-fluid">
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <h4 className="main-content-title">List of Leaders</h4>
        </div>
        <Breadcrumb>
          <Breadcrumb.Item href="#">User Management</Breadcrumb.Item>
          <Breadcrumb.Item active>Leader Management</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <div className="table-responsive">
                <DataTableExtensions columns={columns} data={data}>
                  <DataTable
                    columns={columns}
                    data={data}
                    actions={
                      <Button onClick={() => downloadCSV(combinedData)}>
                        Export
                      </Button>
                    }
                    selectableRows
                    pagination
                  />
                </DataTableExtensions>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={modalOpen} onHide={closeModal} centered>
        <ModalBody>
          <img
            src={imageURL}
            alt="Profile"
            style={{ width: "150px", maxHeight: "150px", objectFit: "contain" }}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Cards;
