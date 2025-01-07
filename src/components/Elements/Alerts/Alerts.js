import React, { useState, useEffect, useMemo } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { APiURl } from "../../Services/ApiAddress";

// Utility functions
const convertArrayOfObjectsToCSV = (array) => {
  if (!array.length) return null;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  return [
    keys.join(columnDelimiter),
    ...array.map((item) => keys.map((key) => item[key]).join(columnDelimiter)),
  ].join(lineDelimiter);
};

const downloadCSV = (array) => {
  const csv = convertArrayOfObjectsToCSV(array);
  if (!csv) return;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "categories_export.csv";
  link.click();
};

const ExportButton = ({ onExport }) => (
  <Button onClick={onExport} className="mb-2 btn-secondary">
    Export CSV
  </Button>
);

const Alerts = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${APiURl}getCategory`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }

        const result = await response.json();
        setData(result.intrest || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${APiURl}/deleteCategory/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete category.");
      }

      const result = await response.json();

      if (result.message.includes("deleted")) {
        setData((prevData) => prevData.filter((item) => item._id !== id));
        showAlert("Success", result.message, "success");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const showAlert = (title, message, icon) => {
    Swal.fire({
      title,
      text: message,
      icon,
      confirmButtonText: "OK",
      allowOutsideClick: false,
    });
  };

  const columns = useMemo(
    () => [
      {
        name: "Category Name",
        selector: (row) => row.name,
        sortable: true,
        wrap: true,
      },
      {
        name: "Created At",
        selector: (row) => new Date(row.createdAt).toLocaleDateString(),
        sortable: true,
        wrap: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <Button
            variant="info"
            className="btn-light rounded-pill"
            onClick={() => navigate("/elements/alerts2", { state: row })}
            style={{ height: "30px", width: "100px" }}>
            Update
          </Button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
      },
      {
        name: "Delete",
        cell: (row) => (
          <Button
            variant="danger"
            className="btn-light rounded-pill"
            onClick={() => handleDelete(row._id)}
            style={{ height: "30px", width: "100px" }}>
            Delete
          </Button>
        ),
        ignoreRowClick: true,
      },
    ],
    [navigate]
  );

  const actionsMemo = useMemo(
    () => <ExportButton onExport={() => downloadCSV(data)} />,
    [data]
  );

  return (
    <div className="main-container container-fluid">
      <div className="breadcrumb-header justify-content-between">
        <h4>No. of Categories: {data.length}</h4>
      </div>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <Button
                className="mb-3 btn-primary"
                onClick={() => navigate("/elements/alerts1")}
                style={{ float: "right" }}>
                Add Category
              </Button>
              <DataTableExtensions {...{ columns, data }}>
                <DataTable
                  columns={columns}
                  data={data}
                  actions={actionsMemo}
                  selectableRows
                  pagination
                />
              </DataTableExtensions>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Alerts;
