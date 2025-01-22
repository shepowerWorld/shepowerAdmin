import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "../../main.css";
import "./sos.css";
import Swal from "sweetalert2";
import { APiURl, Profile_img, socket } from "../../Services/ApiAddress";
import defaultAvatar from "../../../assets/img/defalutavtar.jpg";

const Sosuser = () => {
  const [data, setData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = sessionStorage.getItem("token");

  const showSuccessAlert = useCallback((message) => {
    Swal.fire({
      title: "Well done!",
      icon: "success",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
      text: message,
    });
  }, []);

  const dateConverted = useCallback((date) => {
    const formatedDate = new Date(date);
    return formatedDate.toLocaleDateString();
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`${APiURl}getAllUsers`, {
        method: "GET",
        headers: myHeaders,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();

      const filteredData = result.response
        .filter((item) => item.profileID.includes("Leader"))
        .map((item) => ({
          ...item,
          isLeader: false,
        }));

      setCombinedData(filteredData);
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching users:", error);
      showSuccessAlert("Failed to fetch users. Please try again.");
    }
  }, [token, showSuccessAlert]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const blockUser = useCallback(
    async (id) => {
      try {
        const response = await fetch(`${APiURl}adminBlock`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id }),
        });

        const result = await response.json();

        if (result.status) {
          socket.emit("AdminBlock", result.response);
          await fetchUsers();
          showSuccessAlert(result.message);
        }
      } catch (error) {
        console.error("Error blocking user:", error);
        showSuccessAlert("Failed to block user. Please try again.");
      }
    },
    [token, fetchUsers, showSuccessAlert]
  );

  const handleLeaderApproval = useCallback(
    async (id) => {
      try {
        await fetchUsers();
        showSuccessAlert("Leader Approved Successfully");
      } catch (error) {
        console.error("Error approving leader:", error);
        showSuccessAlert("Failed to approve leader. Please try again.");
      }
    },
    [fetchUsers, showSuccessAlert]
  );

  const CustomSwitch = useMemo(() => {
    return ({ checked, onChange }) => (
      <div
        className={`custom-switch ${checked ? "active" : ""}`}
        onClick={onChange}
        role="button"
        tabIndex={0}
      >
        <div className={`switch-slider ${checked ? "active" : ""}`} />
      </div>
    );
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "Profile Image",
        selector: (row) => row.profileID,
        sortable: true,
        wrap: true,
        maxWidth: "40px",
        cell: (row) => (
          <div
            className="profile-image-container"
            onClick={() =>
              row?.profile_img !== " " &&
              setImageUrl(Profile_img + row?.profile_img)
            }
            role="button"
            tabIndex={0}
          >
            <img
              className="profile-image"
              src={
                row?.profile_img !== " "
                  ? Profile_img + row?.profile_img
                  : defaultAvatar
              }
              alt={`${row?.firstname}'s profile`}
            />
          </div>
        ),
      },
      {
        name: "First Name",
        selector: (row) => row?.firstname,
        sortable: true,
        wrap: true,
      },
      {
        name: "Last Name",
        selector: (row) => row?.lastname,
        sortable: true,
        wrap: true,
      },
      {
        name: "Mobile Number",
        selector: (row) => row?.mobilenumber,
        sortable: true,
        wrap: true,
      },
      {
        name: "Email",
        selector: (row) => row?.email,
        sortable: true,
        wrap: true,
      },
      {
        name: "DOB",
        selector: (row) => dateConverted(row?.dob),
        sortable: true,
        wrap: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <CustomSwitch
            checked={row.adminBlock === true}
            onChange={() => blockUser(row._id)}
          />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        name: "Approve/Reject",
        cell: (row) => (
          <CustomSwitch
            checked={row.isLeader === true}
            onChange={() => handleLeaderApproval(row._id)}
          />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    [CustomSwitch, blockUser, handleLeaderApproval, dateConverted]
  );

  const exportToCSV = useCallback((array) => {
    const keys = Object.keys(array[0]);
    const csvContent = [
      keys.join(","),
      ...array.map((item) => keys.map((key) => item[key]).join(",")),
    ].join("\n");

    const link = document.createElement("a");
    const csv = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    link.setAttribute("href", csv);
    link.setAttribute("download", "export.csv");
    link.click();
  }, []);

  const ExportButton = useMemo(() => {
    return ({ onExport }) => <Button onClick={onExport}>Export</Button>;
  }, []);

  const actionsMemo = useMemo(
    () => <ExportButton onExport={() => exportToCSV(combinedData)} />,
    [combinedData, exportToCSV, ExportButton]
  );

  const tableData = useMemo(
    () => ({
      columns,
      data,
    }),
    [columns, data]
  );

  return (
    <div className="main-container container-fluid">
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            List of SOS User
          </span>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
              User Management
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item"
              active
              aria-current="page"
            >
              Sos Management
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Row className="row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              <div className="table-responsive fileexport">
                <DataTableExtensions
                  {...tableData}
                  print={false}
                  exportHeaders={true}
                  filterPlaceholder="Search Records"
                >
                  <DataTable
                    columns={columns}
                    data={data}
                    actions={actionsMemo}
                    selectableRows
                    pagination
                  />
                </DataTableExtensions>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal
        show={Boolean(imageUrl)}
        onHide={() => setImageUrl("")}
        aria-labelledby="profile-image-modal"
        centered
      >
        <ModalBody className="text-center">
          <img
            src={imageUrl}
            alt="Profile"
            className="modal-profile-image"
            style={{
              width: "500px",
              maxHeight: "500px",
              objectFit: "contain",
            }}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default React.memo(Sosuser);
