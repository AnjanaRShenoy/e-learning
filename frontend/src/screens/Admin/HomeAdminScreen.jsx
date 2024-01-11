import React, { useState, useEffect } from "react";

import {
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBCol,
} from "mdb-react-ui-kit";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Button, Flex } from "@chakra-ui/react";
import { useAddCourseMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import { Textarea } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeAdminScreen = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [list, setList] = useState("");

  const [Course] = useAddCourseMutation();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/admin/getCategory`);
      setList(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategory=(categoryName) => {
    debugger
    setCategory(categoryName);
  };

  const addCourse = async (e) => {
    debugger
    e.preventDefault();
    try {
      if (name.trim() || time.trim() || description.trim() || date.trim()|| category.trim()) {
        const res = await Course({ name, time, description, date, category }).unwrap();
      }
      toast.success("Course created");
      navigate("/admin/courseList");
    } catch (err) {
      console.log(err);
    }
  };

 

  return (
    <div style={{ color: "white" }}>
      <form onSubmit={addCourse}>
        <MDBRow className="mb-4">
          <MDBInput
            id="form6Example1"
            label="Course name"
            onChange={(e) => setName(e.target.value)}
          />
        </MDBRow>

        <Menu>
          <MenuButton style={{marginBottom:"30px"}} as={Button}>Category</MenuButton>
          <MenuList>
            {list
              ? list.map((course) => <MenuItem style={{color:"black"}} onClick={() => handleCategory(course.categoryName)}>{course.categoryName}</MenuItem>)
              : null}
          </MenuList>
        </Menu>

        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              type="date"
              id="form6Example5"
              label="Date"
              onChange={(e) => setDate(e.target.value)}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              type="time"
              id="form6Example5"
              label="Time"
              onChange={(e) => setTime(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <Flex direction="column">
          <>Description</>
          <Textarea
            wrapperClass="mb-4"
            textarea
            id="form6Example7"
            rows={4}
            label="Description"
            style={{
              width: "700px",
              height: "230px",
              backgroundColor: "white",
              color: "black",
            }}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            class="btn btn-primary"
            type="submit"
            style={{ marginTop: "30px" }}
          >
            Add
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default HomeAdminScreen;
