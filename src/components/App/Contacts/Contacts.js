import React, { useEffect, useState, useMemo, useCallback } from "react";
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const token = sessionStorage.getItem("token");

  const dateConverted = useCallback((date) => {
    const formatedDate = new Date(date);
    return formatedDate.toLocaleDateString();
  }, []);

  const showNotification = useCallback((title, message, icon = "success") => {
    Swal.fire({
      title,
      text: message,
      icon,
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
    });
  }, []);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(APiURl + "getAllUsers", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const result = await response.json();

      const filteredData = result.response
        .filter((item) => item.profileID.includes("Leader"))
        .map((item) => ({
          ...item,
          isLeader: false,
        }));

      setData(filteredData);
    } catch (error) {
      setError(error.message);
      showNotification("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [token, showNotification]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const convertArrayOfObjectsToCSV = useCallback((array) => {
    if (!array.length) return null;

    const keys = Object.keys(array[0]);
    const csvRows = [
      keys.join(","),
      ...array.map((item) =>
        keys
          .map((key) => {
            const cell = item[key]?.toString() ?? "";
            return cell.includes(",") ? `"${cell}"` : cell;
          })
          .join(",")
      ),
    ];

    return csvRows.join("\n");
  }, []);

  const downloadCSV = useCallback(
    (array) => {
      const csv = convertArrayOfObjectsToCSV(array);
      if (!csv) return;

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", "export.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [convertArrayOfObjectsToCSV]
  );

  const handleBlockUser = useCallback(
    async (id) => {
      try {
        setLoading(true);
        const response = await fetch(APiURl + "adminBlock", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id }),
        });

        const result = await response.json();

        if (result.status) {
          socket.emit("AdminBlock", result.response);
          await fetchContacts();
          showNotification("Success", result.message);
        } else {
          throw new Error(result.message || "Failed to block user");
        }
      } catch (error) {
        showNotification("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    },
    [token, fetchContacts, showNotification]
  );

  const handleApproveLeader = useCallback(
    async (id) => {
      try {
        await fetchContacts();
        showNotification("Success", "Leader Approved Successfully");
      } catch (error) {
        showNotification("Error", "Failed to approve leader", "error");
      }
    },
    [fetchContacts, showNotification]
  );

  const CustomSwitch = useMemo(
    () =>
      ({ checked, onChange }) =>
        (
          <div
            className={`custom-switch ${checked ? "active" : ""}`}
            onClick={onChange}
          >
            <div className={`switch-slider ${checked ? "active" : ""}`} />
          </div>
        ),
    []
  );

  const columns = useMemo(
    () => [
      {
        name: "Profile Image",
        selector: (row) => row.profileID,
        sortable: true,
        width: "80px",
        cell: (row) => (
          <div
            className="profile-image-container"
            onClick={() =>
              row?.profile_img !== " " &&
              setImageUrl(Profile_img + row?.profile_img)
            }
          >
            <img
              className="profile-image"
              src={
                row?.profile_img !== " "
                  ? Profile_img + row?.profile_img
                  : require("../../../assets/img/defalutavtar.jpg")
              }
              alt={`${row.firstname}'s profile`}
            />
          </div>
        ),
      },
      {
        name: "First Name",
        selector: (row) => row?.firstname,
        sortable: true,
      },
      {
        name: "Last Name",
        selector: (row) => row.lastname,
        sortable: true,
      },
      {
        name: "Mobile Number",
        selector: (row) => row.mobilenumber,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "DOB",
        selector: (row) => dateConverted(row.dob),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <CustomSwitch
            checked={row.adminBlock === true}
            onChange={() => handleBlockUser(row._id)}
          />
        ),
        ignoreRowClick: true,
        button: true,
      },
      {
        name: "Approve/Reject",
        cell: (row) => (
          <CustomSwitch
            checked={row.isLeader === true}
            onChange={() => handleApproveLeader(row._id)}
          />
        ),
        ignoreRowClick: true,
        button: true,
      },
    ],
    [CustomSwitch, dateConverted, handleBlockUser, handleApproveLeader]
  );

  const tableData = useMemo(
    () => ({
      columns,
      data,
    }),
    [columns, data]
  );

  const actionsMemo = useMemo(
    () => <Button onClick={() => downloadCSV(data)}>Export</Button>,
    [downloadCSV, data]
  );

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="main-container container-fluid">
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Contacts</span>
        </div>
      </div>

      <Row className="row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              <div className="table-responsive">
                <DataTableExtensions {...tableData}>
                  <DataTable
                    columns={columns}
                    data={data}
                    noHeader
                    defaultSortField="id"
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                    dense
                    progressPending={loading}
                    actions={actionsMemo}
                  />
                </DataTableExtensions>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={!!imageUrl} onHide={() => setImageUrl(null)} centered>
        <ModalBody>
          <img src={imageUrl} alt="Profile" style={{ width: "100%" }} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Contacts;
