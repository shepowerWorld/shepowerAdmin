import React from 'react';

import { Link } from 'react-router-dom';
import { Accordion, Breadcrumb, Card, Col, Row, Table } from "react-bootstrap";

const Timeline = () => (
  <>
   <div>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Helpline</span>
        </div>
        <div id="right-menu">
          <div id="search-container">
            <input type="text" id="search-box"  />
            <img
              src="https://www.edyoda.com/static/media/icon-search-black.659381fa.svg"
              id="search-icon"
            />
          </div>
        </div>
      </div>
      <Row className="row-sm">
        <Col xl={12}>
          <Card>
            <Card.Header className="pb-0">
              <div className="d-flex justify-content-between"></div>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table table-bordered table-hover mb-0 text-md-nowrap">
                  <thead>
                    <tr>
                      <th>Profile Pic</th>
                      <th> Name</th>
                      <th>Mobile</th>
                      <th>Action</th>
                      {/* <th>Unblock</th> */}
                    </tr>
                  </thead>
                 <tbody></tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  </>
);

Timeline.propTypes = {};

Timeline.defaultProps = {};

export default Timeline;
