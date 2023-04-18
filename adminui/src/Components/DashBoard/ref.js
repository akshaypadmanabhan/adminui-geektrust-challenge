import React, { useState, useEffect } from "react";
import axios from "axios";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "./home.css";
import DoneIcon from "@mui/icons-material/Done";

import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { PaginationBtn } from "./pagination/pagination";

function Home() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchvalue] = useState("");
  const [currPage, setCurrpage] = useState(1);
  const [edit, setEdit] = useState({
    status: false,
    id: null,
    name: "",
    email: "",
    role: "",
  });

  // page settings
  let postPerPage = 10;
  let No_pages = Math.ceil(users.length / postPerPage);
  const lastPostIndex = currPage * postPerPage;
  const firstIndex = lastPostIndex - postPerPage;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = (id) => {
    let tempUsers = users.filter((ele) => {
      return ele.id !== id;
    });
    setUsers(tempUsers);
  };
  //   const saveEdit=(ele)=>{
  //     setEdit({status:false,id:ele.id})
  //   }
  //   const editMode=(ele)=>{
  //     setEdit({
  //       status:true,
  //       id:ele.id,
  //     })
  //   }



//   const handleCheck = (e) => {
//     const { name, checked } = e.target;
//     if (name === "all") {
//       let tempUser = users.map((ele) => {
//         if (ele.id >= firstIndex && ele.id <= lastPostIndex)
//           return { ...ele, isChecked: checked };
//         else {
//           return { ...ele };
//         }
//       });
//       setUsers(tempUser);
//     } else {
//       let tempUser = users.map((ele) =>
//         ele.name === name ? { ...ele, isChecked: checked } : ele
//       );
//       setUsers(tempUser);
//     }
//   };

//   const deleteMultiple = () => {
//     let tempUsers = users.filter((ele) => {
//       let temp = "isChecked" in ele;
//       return !temp ? ele : "";
//     });
//     setUsers(tempUsers);
//   };

  return (
    <div className="container">
      {/* search */}
      <div className="input-group" style={{ marginTop: "100px" }}>
        <input
          type="search"
          class="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(e) => {
            setSearchvalue(e.target.value);
            setCurrpage(1);
          }}
        />
      </div>

      {/* table */}
      <div className="tableMain">
        <MDBRow style={{ paddingTop: "20px" }}>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      name="all"
                      onChange={handleCheck}
                    ></input>
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              {users && users.length === 0 ? (
                <MDBTableBody>
                  <tr>
                    <td colSpan={8} className="text-center mb-0">
                      No data found
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                users
                  .filter((ele) => {
                    if (searchValue === "") {
                      return users;
                    } else if (
                      ele.name.toLowerCase().includes(searchValue) ||
                      ele.email.toLowerCase().includes(searchValue) ||
                      ele.role.toLowerCase().includes(searchValue)
                    ) {
                      return ele;
                    }
                    return "";
                  })
                  .slice(firstIndex, lastPostIndex)
                  .map((ele) => (
                    <MDBTableBody
                      className={ele.isChecked ? "userSelected" : ""}
                    >
                      <tr>
                        <th scope="col">
                          <input
                            type="checkbox"
                            name={ele.name}
                            onClick={handleCheck}
                            checked={ele?.isChecked || false}
                          ></input>
                        </th>
                        <td>
                          {edit.status === true && edit.id === ele.id ? (
                            <input
                              onChange={(e) => (ele["name"] = e.target.value)}
                            ></input>
                          ) : (
                            ele.name
                          )}
                        </td>
                        <td>
                          {edit.status === true && edit.id === ele.id ? (
                            <input
                              onChange={(e) => (ele["email"] = e.target.value)}
                            ></input>
                          ) : (
                            ele.email
                          )}
                        </td>
                        <td>
                          {edit.status === true && edit.id === ele.id ? (
                            <input
                              onChange={(e) => (ele["role"] = e.target.value)}
                            ></input>
                          ) : (
                            ele.role
                          )}
                        </td>
                        <td>
                          {edit.status === true && edit.id === ele.id ? (
                            <button
                              value={ele.id}
                              className="editbtn"
                              style={{ marginRight: "10px", color: "black" }}
                              onClick={(e) => saveEdit(e, ele)}
                            >
                              <DoneIcon />
                            </button>
                          ) : (
                            <button
                              value={ele.id}
                              className="editbtn"
                              style={{ marginRight: "10px", color: "black" }}
                              onClick={() => editMode(ele)}
                            >
                              <BorderColorRoundedIcon />
                            </button>
                          )}
                          <button
                            value={ele.id}
                            className="editbtn"
                            style={{ color: "red" }}
                            onClick={() => deleteUser(ele.id)}
                          >
                            <DeleteRoundedIcon />
                          </button>
                        </td>
                      </tr>
                    </MDBTableBody>
                  ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
        <button className="delete-rows" onClick={deleteMultiple}>
          Delete Selected
        </button>
        {/* pagination */}
        <PaginationBtn
          No_pages={No_pages}
          setCurrpage={setCurrpage}
          currPage={currPage}
        />
      </div>
    </div>
  );
}

export default Home;

// "@emotion/react": "^11.10.6",
// "@emotion/styled": "^11.10.6",
