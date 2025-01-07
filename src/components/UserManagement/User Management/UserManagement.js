// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
// // import './User.css'
// import './Aboutus.css'
// import styled from '@emotion/styled';
// // import { API_URL } from '../../service';

// function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="pagination" >
//       <button
//         style={{
//           padding: "8px 12px",
//           backgroundColor: "#f2f2f2",
//           border: "1px solid #ddd",
//           color: "#333",
//           cursor: "pointer",
//           transition: "background-color 0.3s ease",
//           marginRight: "5px",
//           ...(currentPage === 1 && { cursor: "not-allowed", backgroundColor: "#ddd" })
//         }}
//         disabled={currentPage === 1}
//         onClick={() => onPageChange(currentPage - 1)}
//       >
//         Previous
//       </button>
//       {pageNumbers.map((number) => (
//         <button
//           key={number}
//           style={{
//             padding: "8px 12px",
//             backgroundColor: currentPage === number ? "#666" : "#f2f2f2",
//             color: currentPage === number ? "#fff" : "#333",
//             border: "1px solid #ddd",
//             cursor: "pointer",
//             transition: "background-color 0.3s ease",
//             marginRight: "5px"
//           }}
//           onClick={() => onPageChange(number)}
//           className={currentPage === number ? "active" : ""}
//         >
//           {number}
//         </button>
//       ))}
//       <button
//         style={{
//           padding: "8px 12px",
//           backgroundColor: "#f2f2f2",
//           border: "1px solid #ddd",
//           color: "#333",
//           cursor: "pointer",
//           transition: "background-color 0.3s ease",
//           marginRight: "5px",
//           ...(currentPage === pageNumbers.length && { cursor: "not-allowed", backgroundColor: "#ddd" })
//         }}
//         disabled={currentPage === pageNumbers.length}
//         onClick={() => onPageChange(currentPage + 1)}
//       >
//         Next
//       </button>
//     </div>

//   );
// }

// function DynamicTable() {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1)
//   const [itemsPerPage, setItemsPerPage] = useState(8)
//   const navigate = useNavigate();

//   useEffect(() => {
//     var myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');

//     var requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow',
//     };
//     fetch(+ 'getAllProfile', requestOptions)
//       .then(response => response.json())
//       .then(data => setData(data.result), console.log("result", data))
//       .catch(error => console.error(error));
//   }, []);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber)
//   }
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
//   //const headers = ['Name', 'Username', 'Email', 'Phone', 'Website'];

//   //const handleNavigateClick = () => {
//   // navigate('/Astro');

//   return (
//     <div className="container1">
//       <h1>UserManagement</h1>

//       < table >
//         <thead>
//           <tr>

//             <th>username</th>
//             <th>userid</th>
//             <th>phonenumber</th>
//             <th>devicetype</th>
//             <th>blockunblock</th>
//             <th>delete</th>
//             {/* <th>searchbar</th> */}
//             <th></th>

//           </tr>
//         </thead>

//         < tbody >

//           {
//             currentItems.map((item) => (
//               <tr key={item.id}>

//                 <td>{item.username}</td>
//                 <td>{item.userid}</td>
//                 <td>{item.phonenumber}</td>
//                 <td>{item.devicetype}</td>
//                 <td><img style={{ width: 100, height: 50, alignSelf: "center", marginTop: 15 }} src={'https://latestsoulipiebucket2.s3.ap-south-1.amazonaws.com/images/' + item?.profile_img} alt={item.AstroSign_name} /></td>
//                 {/* <td>{item.block / unblock}</td> */}
//                 <td>{item.delete}</td>
//                 {/* <td>{item.searchbar}</td> */}

//                 <td />
//               </tr>
//             ))
//           }
//         </tbody>
//       </table >
//       <Pagination
//         totalItems={data.length}
//         itemsPerPage={itemsPerPage}
//         currentPage={currentPage}
//         onPageChange={handlePageChange}
//       />
//     </div >
//   );
// }

// export default DynamicTable;
