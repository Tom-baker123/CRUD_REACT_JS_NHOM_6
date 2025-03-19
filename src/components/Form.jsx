import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function MyForm({ editingUser, setEditingUser, fetchUsers }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });

  // Khi editingUser thay đổi, cập nhật dữ liệu form
  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  // Hàm cập nhật giá trị khi nhập input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gửi dữ liệu lên API (POST hoặc PUT)
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    if (formData.id) {
      // Nếu có ID -> Chỉnh sửa user (PUT)
      fetch(`https://67da1be535c87309f52afe6f.mockapi.io/api/v1/users/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Updated:", data);
          alert("Cập nhật thành công!");
          setEditingUser(null); // Reset editing mode
          fetchUsers(); // Refresh lại danh sách
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Cập nhật thất bại!");
        });
    } else {
      // Nếu không có ID -> Tạo mới user (POST)
      fetch("https://67da1be535c87309f52afe6f.mockapi.io/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Created:", data);
          alert("Tạo mới thành công!");
          fetchUsers(); // Refresh danh sách users
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Tạo mới thất bại!");
        });
    }

    // Reset form sau khi gửi
    setFormData({ id: "", name: "", email: "" });
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField label="ID" name="id" value={formData.id} onChange={handleChange} disabled />
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} />

      <Button type="submit" variant="contained">
        {formData.id ? "Update" : "Create"}
      </Button>
    </Box>
  );
}
  