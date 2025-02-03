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
  // Form,
  Table,
  Form,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { APiURl, Profile_img, socket } from "../../Services/ApiAddress";
import Swal from "sweetalert2";
import { FaFilePdf, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const Banner = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [payload, setPayload] = useState({
    policy_page_link: "",
    States_or_union_territories: "",
    locationType: "",
  });
  const [isedit, setIsEdit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const Warningalert = (title) => {
    Swal.fire({
      title: title,
      icon: "warning",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
    });
  };

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

  const options = [
    { value: "state", label: "State" },
    { value: "territory", label: "Union Territory" },
  ];

  const handleClose = () => {
    setShow(false);
    setPayload({
      policy_page_link: "",
      States_or_union_territories: "",
      locationType: "",
    });
    setValidated(false);
    setModalDelete(false);
  };

  const addPolicy = () => {
    setIsEdit(false);
    setShow(true);
    setPayload({
      policy_page_link: "",
      States_or_union_territories: "",
      locationType: "",
    });
    setValidated(false);
  };

  const editPolicy = (item) => {
    setIsEdit(true);
    setShow(true);
    setPayload(item);
    setValidated(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (!payload.States_or_union_territories || !payload.policy_page_link) {
      Warningalert("All fields are required", "error");
      return;
    }

    setIsLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = payload._id
        ? `${APiURl}updateScheme?_id=${payload._id}`
        : `${APiURl}addgovscheme`;

      const method = payload._id ? "PUT" : "POST";

      const response = await axios({
        method,
        url,
        headers,
        data: payload,
      });

      if (response.status === 200 || response.status === 201) {
        showAlert(
          payload._id
            ? "Policy updated successfully!"
            : "Policy added successfully!",
          "success"
        );
        fetchUsers();
        handleClose();
      } else {
        // throw new Error("Failed to update policy");
      }
    } catch (error) {
      console.error("Error:", error);
      //   showAlert(error.message || "Something went wrong!", "error");
    } finally {
      setIsLoading(false);
      setShow(false);
    }
  };
  const openDelete = (event) => {
    console.log("event delete ", event);
    setModalDelete(true);
    setSelectedItem(event);
  };
  const handleDelete = async (itemToDelete) => {
    console.log("Deleting item with ID:", selectedItem._id);

    // console.log('payload._id',payload);

    // console.log("Deleting item with ID:", itemToDelete);
    // delete api call
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const response = await fetch(
        `${APiURl}deleteScheme?_id=${selectedItem._id}`,
        {
          method: "DELETE",
          headers: myHeaders,
        }
      );
      if (response.status === 200 || response.status === 201) {
        showAlert("Policy Deleted successfully!");
        fetchUsers();
        setModalDelete(false);
      } else {
        // throw new Error("Failed to update policy");
      }
    } catch (error) {
      showAlert(
        error.message || "Failed to fetch users. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const response1 = await fetch(`${APiURl}getStateScheme`, {
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

  //   const CustomSwitch = useMemo(() => {
  //     return React.memo(({ checked, onChange }) => (
  //       <div
  //         className={`custom-switch ${checked ? "active" : ""}`}
  //         onClick={onChange}
  //         role="button"
  //         tabIndex={0}
  //       >
  //         <div className={`switch-slider ${checked ? "active" : ""}`} />
  //       </div>
  //     ));
  //   }, []);

  const columns = useMemo(
    () => [
      {
        name: "State",
        selector: (row) => row?.States_or_union_territories || "N/A",
        sortable: true,
        wrap: true,
      },
      {
        name: "Policy",
        selector: (row) => row?.policy_page_link || "N/A",
        sortable: true,
        wrap: true,
        cell: (row) =>
          row.policy_page_link ? (
            <a
              href={row.policy_page_link}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-link"
            >
              <FaFilePdf size={20} color="red" /> PDF Icon
            </a>
          ) : (
            "N/A"
          ),
      },
      {
        name: "Action",
        selector: (row) => row?.States_or_union_territories || "N/A",
        sortable: true,
        wrap: true,
        cell: (row) => (
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => editPolicy(row)}
              className="edit-btn"
              style={{
                background: "blue",
                color: "white",
                border: "none",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => openDelete(row)}
              className="delete-btn"
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              <FaTrash /> Delete
            </button>
          </div>
        ),
      },
    ],
    []
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

  const printTableData = useCallback(() => {
    console.log("Table Data:");
    console.table(data); // Prints in a table format
    console.log("Tree View:", JSON.stringify(data, null, 2)); // Prints in tree format
  }, [data]);
  const ExportButton = useMemo(
    () =>
      React.memo(({ onExport }) => <Button onClick={onExport}>Export</Button>),
    []
  );
  const actionsMemo = useMemo(
    () =>
      (
        <>
          <ExportButton onExport={() => exportToCSV(combinedData)} />,
          <Button onClick={printTableData} className="ml-2">
            Print Data
          </Button>
        </>
      )[(combinedData, exportToCSV, ExportButton)]
  );
  const tableData = useMemo(
    () => ({
      columns,
      data,
    }),
    [columns, data]
  );

  return (
    <div className="container mt-4">
      <div className="flex text-end mb-3">
        <Button variant="primary" onClick={() => addPolicy()}>
          Add Policy
        </Button>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isedit ? "Edit Item" : "Add Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formItemName">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                required
                value={payload.States_or_union_territories}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    States_or_union_territories: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                State is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formItemName">
              <Form.Label>Policy Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Policy Link"
                required
                value={payload.policy_page_link}
                onChange={(e) =>
                  setPayload({ ...payload, policy_page_link: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Policy Link is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formItemName">
              <Form.Label>Location Type</Form.Label>
              <Form.Select
                name="locationType"
                value={payload.locationType}
                isInvalid={validated && !payload.locationType}
                onChange={(e) =>
                  setPayload({ ...payload, locationType: e.target.value })
                }
              >
                <option value="">Select Location</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Location Type is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {isedit ? "Update" : "Save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Delete Modal  */}
      <Modal show={modalDelete} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <FaTrash size={50} className="text-danger mb-3" />
          <h4 className="mb-2">Are you sure you want to delete?</h4>
          <p className="text-muted">
            This action is permanent and cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Banner;
