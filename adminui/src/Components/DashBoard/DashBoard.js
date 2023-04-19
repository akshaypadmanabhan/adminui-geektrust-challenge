import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

import "./DashBoard.css";

// UI Components
import CheckBox from "../UI/CheckBox";
import DeleteBtn from "../UI/DeleteBtn";
import EditBtn from "../UI/EditBtn";
import DoneBtn from "../UI/DoneBtn";

// Search

import SearchBar from "../SearcBar.js/SearchBar";

function DashBoard() {
  const [users, setUsers] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  // const [isCheckedAll, setIsCheckedAll] = useState(false);

  // const [isCheck, setIsCheck] = useState([]);

  const [edit, setEdit] = useState({
    status: false,
    id: null,
    name: "",
    email: "",
    role: "",
  });

  // pagination

  const [pageCount, setPageCount] = useState(0);

  const itemPerPage = 10;
  let pageVisited = pageCount * itemPerPage;

  const totalPages = Math.ceil(users.length / itemPerPage);
  // page change
  const pageChange = ({ selected }) => {
    setPageCount(selected);
  };

  // fetching users deatils

  const fetchUsers = async () => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        let data = res.data;

        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //  deleting function handler

  const deleteUsers = (selectedUsers) => {
    let userAfterDeleting = users.filter((user) => {
      return user.id !== selectedUsers;
    });

    setUsers(userAfterDeleting);
  };

  // edit user handler

  const editUserDetails = (ele) => {
    console.log("edit");
    setEdit({
      status: true,
      id: ele.id,
    });
  };

  const saveEdit = (ele) => {
    setEdit({ status: false, id: ele.id });
  };

  // select multiple and delete multiple - checking

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (name === "all") {
      let selectedUser = users.map((user) => {
        if (user.id >= pageVisited && user.id <= pageVisited + itemPerPage)
          return { ...user, isChecked: checked };
        else {
          return { ...user };
        }
      });
      setUsers(selectedUser);
    } else {
      // setIsCheck(true);
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  const deleteMultiple = () => {
    let tempUsers = users.filter((user) => {
      // console.log(user);
      let temp = user.isChecked;
      return !temp ? user : "";
    });
    setUsers(tempUsers);
  };

  return (
    <div className="container">
      <br />
      <SearchBar onChange={(e) => setSearchValue(e.target.value)} />

      <br />
      <br />
      <table className="table">
        <thead>
          <tr className="headings">
            <th className="headings">
              <CheckBox
                type="checkbox"
                name="all"
                id="selectAll"
                handleClick={handleCheck}
              />
            </th>
            <th className="headings">Name </th>
            <th className="headings">Email </th>
            <th className="headings"> Role</th>
            <th className="headings">Action</th>
          </tr>
        </thead>

        {users
          .filter((user) => {
            if (searchValue === "") return user;
            else if (
              user.name.includes(searchValue) ||
              user.email.includes(searchValue) ||
              user.role.includes(searchValue)
            ) {
              return user;
            }
            return null;
          })
          .slice(pageVisited, pageVisited + itemPerPage)
          .map((user) => (
            <tbody key={user.id}>
              <tr
                key={user.id}
                className={user.isChecked ? "userSelected" : ""}
              >
                <td>
                  <CheckBox
                    key={user.id}
                    type="checkbox"
                    name={user.name}
                    id={user.id}
                    handleClick={handleCheck}
                    isChecked={user.isChecked}
                  />
                </td>

                <td>
                  {edit.status === true && edit.id === user.id ? (
                    <input
                      onChange={(e) => (user["name"] = e.target.value)}
                    ></input>
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {edit.status === true && edit.id === user.id ? (
                    <input
                      onChange={(e) => (user["email"] = e.target.value)}
                    ></input>
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {edit.status === true && edit.id === user.id ? (
                    <input
                      onChange={(e) => (user["role"] = e.target.value)}
                    ></input>
                  ) : (
                    user.role
                  )}
                </td>

                <td className="btn">
                  {edit.status === true && edit.id === user.id ? (
                    <DoneBtn onClick={(e) => saveEdit(e, user)} />
                  ) : (
                    <EditBtn onClick={() => editUserDetails(user)} />
                  )}

                  <DeleteBtn onClick={() => deleteUsers(user.id)} />
                </td>
              </tr>
            </tbody>
          ))}
      </table>

      {/* Pagination Component */}

      <button className="deletemultiple__btn" onClick={deleteMultiple}>
        Delete Selected Users
      </button>

      <ReactPaginate
        className="pagination"
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={totalPages}
        onPageChange={pageChange}
      />
    </div>
  );
}

export default DashBoard;
