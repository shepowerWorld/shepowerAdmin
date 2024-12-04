// import { useEffect, useState } from "react";
// import { Breadcrumb, Card, Col, Row, Table } from "react-bootstrap";
// import { useLocation } from "react-router-dom";


// function EchartView() {

//     const [result, setResult] = useState([]);
//     const location = useLocation();

//     const response = location.state
//     const id = response._id;
//     console.log("response", response)
//     // const response = state.location

//     useEffect(() => {
//         var myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         var raw = JSON.stringify({
//             "_id": id
//         });

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//         };

//         fetch("http://192.168.1.16:4002/viewGroupReport", requestOptions)
//             .then(response => response.json())
//             .then(result => { setResult(result.chat); console.log(result) })
//             .catch(error => console.log('error', error));


//         // var myHeaders = new Headers();
//         // myHeaders.append("Content-Type", "application/json");

//         // var raw = JSON.stringify({
//         //     "_id": id
//         // });

//         // var requestOptions = {
//         //     method: 'POST',
//         //     headers: myHeaders,
//         //     body: raw,
//         //     redirect: 'follow'
//         // };

//         // fetch("http://192.168.1.16:4002/viewOneToOneReport", requestOptions)
//         //     .then(response => response.json())
//         //     .then(result => { setResult(result.chat); console.log(result) })
//         //     .catch(error => console.log('error', error));
//     }, [])

//     return (
//         <div>
//             <div className="breadcrumb-header justify-content-between">
//                 <div className="left-content">
//                     <span className="main-content-title mg-b-0 mg-b-lg-1">Report Management</span>
//                 </div>
//                 {/* <div className="justify-content-center mt-2">
//           <Breadcrumb className="breadcrumb">
//             <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
//               Tables
//             </Breadcrumb.Item>
//             <Breadcrumb.Item
//               className="breadcrumb-item "
//               active
//               aria-current="page"
//             >
//               Basic tables
//             </Breadcrumb.Item>
//           </Breadcrumb>
//         </div> */}


//                 <div id="right-menu">
//                     <div id="search-container">
//                         <input type="text" id="search-box"></input>

//                         <img src="https://www.edyoda.com/static/media/icon-search-black.659381fa.svg" id="search-icon" />
//                     </div>
//                 </div>

//             </div>

//             <Row className="row-sm">

//                 <Col xl={12}>
//                     <Card>
//                         <Card.Header className=" pb-0">
//                             <div className="d-flex justify-content-between">
//                                 {/* <h4 className="card-title mg-b-0">Delivery Guy Details</h4> */}
//                             </div>
//                             {/* <p className="tx-12 tx-gray-500 mb-2">
//             Example of Nowa Hoverable Rows Table.. <Link to="#">Learn more</Link>
//           </p> */}
//                         </Card.Header>
//                         <Card.Body>
//                             <div className="table-responsive">
//                                 <Table className="table table-bordered table-hover mb-0 text-md-nowrap">
//                                     <thead>
//                                         <tr>
//                                             {/* <th>Messages</th>
//                                             <th>Status</th> */}

//                                             <th>Name</th>
//                                             <th>Mobilenumber</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {result.map((list, index) => (
//                                             <tr key={index}>
//                                                 <th scope="row">{index}</th>
//                                                 <td>{list.name}</td>
//                                                 <td>{list.mobilenumber}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </Table>
//                             </div>
//                         </Card.Body>
//                     </Card>
//                 </Col>

//             </Row>

//         </div >
//     )
// }


// export default EchartView;

