import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MyForm from "./Form";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State lưu user đang chỉnh sửa

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch danh sách users từ API
  const fetchUsers = () => {
    fetch("https://67da1be535c87309f52afe6f.mockapi.io/api/v1/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Xoá user theo ID
  const handleDelete = (id) => {
    fetch(`https://67da1be535c87309f52afe6f.mockapi.io/api/v1/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Delete failed");
        }
        return response.json();
      })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        alert("Xóa thành công!");
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Khi nhấn "Edit", cập nhật form với dữ liệu của user
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  return (
    <>
      {/* Truyền editingUser và setEditingUser xuống Form */}
      <MyForm editingUser={editingUser} setEditingUser={setEditingUser} fetchUsers={fetchUsers} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(user.id)} style={{ marginLeft: 10 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
