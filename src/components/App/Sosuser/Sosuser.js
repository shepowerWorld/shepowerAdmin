import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  // Suspense,
} from "react";
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  // Table,
  Button,
  Modal,
  ModalBody,
  Spinner,
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
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  const showAlert = useCallback((message, type = "success") => {
    Swal.fire({
      title: type === "success" ? "Well done!" : "Error",
      icon: type,
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
      text: message,
    });
  }, []);

  const dateConverted = useCallback((date) => {
    if (!date) return "N/A";
    const formatedDate = new Date(date);
    return formatedDate.toLocaleDateString();
  }, []);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    // setError(null);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const response1 = await fetch(`${APiURl}getAllCounsellingPending`, {
        method: "GET",
        headers: myHeaders,
      });

      if (!response1.ok) {
        throw new Error(`HTTP error! status: ${response1.status}`);
      }

      const result1 = await response1.json();
      if (!result1?.data) {
        throw new Error("Data not found");
      }

      setData(result1.data);
      setCombinedData(result1.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // setError(error.message);
      showAlert(
        error.message || "Failed to fetch users. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  }, [token, showAlert]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSosApproval = useCallback(
    async (id, status) => {
      try {
        const response = await fetch(`${APiURl}updateSosStatus`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id, status }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status) {
          socket.emit("SosApproved", result.response);
          await fetchUsers();
          showAlert(result.message);
        } else {
          throw new Error(result.message || "Failed to update status");
        }
      } catch (error) {
        console.error("Error approving SOS:", error);
        showAlert(
          error.message || "Failed to update status. Please try again.",
          "error"
        );
      }
    },
    [fetchUsers, showAlert, token]
  );

  const CustomSwitch = useMemo(() => {
    return React.memo(({ checked, onChange }) => (
      <div
        className={`custom-switch ${checked ? "active" : ""}`}
        onClick={onChange}
        role="button"
        tabIndex={0}
      >
        <div className={`switch-slider ${checked ? "active" : ""}`} />
      </div>
    ));
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
              loading="lazy"
            />
          </div>
        ),
      },
      {
        name: "First Name",
        selector: (row) => row?.firstname || "N/A",
        sortable: true,
        wrap: true,
      },
      {
        name: "Last Name",
        selector: (row) => row?.lastname || "N/A",
        sortable: true,
        wrap: true,
      },
      {
        name: "Mobile Number",
        selector: (row) => row?.mobilenumber || "N/A",
        sortable: true,
        wrap: true,
      },
      {
        name: "Email",
        selector: (row) => row?.email || "N/A",
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
        name: "SOS Status",
        selector: (row) => row?.sos_status || "N/A",
        sortable: true,
        wrap: true,
      },
      {
        name: "Approve/Reject",
        cell: (row) => (
          <CustomSwitch
            checked={row.sos_status === "Approved"}
            onLabel="Approved"
            offLabel="Pending"
            onChange={() =>
              handleSosApproval(
                row._id,
                row.sos_status === "Approved" ? "Pending" : "Approved"
              )
            }
          />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    [CustomSwitch, handleSosApproval, dateConverted]
  );

  const exportToCSV = useCallback(
    (array) => {
      if (!array?.length) {
        showAlert("No data to export", "error");
        return;
      }
      try {
        const keys = Object.keys(array[0]);
        const csvContent = [
          keys.join(","),
          ...array.map((item) => keys.map((key) => item[key] || "").join(",")),
        ].join("\n");

        const link = document.createElement("a");
        const csv = `data:text/csv;charset=utf-8,${encodeURIComponent(
          csvContent
        )}`;
        link.setAttribute("href", csv);
        link.setAttribute("download", "sos_users_export.csv");
        link.click();
      } catch (error) {
        console.error("Error exporting CSV:", error);
        showAlert("Failed to export data", "error");
      }
    },
    [showAlert]
  );

  const ExportButton = useMemo(
    () =>
      React.memo(({ onExport }) => <Button onClick={onExport}>Export</Button>),
    []
  );

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

  // if (error) {
  //   return (
  //     <div className="error-container">
  //       <h3>Error loading SOS users</h3>
  //       <p>{error}</p>
  //       <Button onClick={fetchUsers}>Retry</Button>
  //     </div>
  //   );
  // }

  return (
    <div className="main-container container-fluid">
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            List of SOS Users
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
              SOS Management
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Row className="row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              {isLoading ? (
                <div className="text-center p-4">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
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
                      progressPending={isLoading}
                      persistTableHead
                      responsive
                    />
                  </DataTableExtensions>
                </div>
              )}
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
            loading="lazy"
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default React.memo(Sosuser);
