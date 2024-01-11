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
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Button, Flex } from "@chakra-ui/react";
import { useAddCourseMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import { Textarea } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../slices/userApiSlice";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [list, setList] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `/api/student/getProfile?_id=${userInfo._id}`
      );
      console.log(res.data);
      setList(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateProfile = async (e) => {
    debugger;
    e.preventDefault();
    try {
      if (!name.trim() || !email.trim()) {
        toast.error("Please enter all fields");
      } else {
        try {
          const res = await axios.post(`/api/student/updateProfile`, {
            params: {
              name: name,
              email: email,
              userInfo: userInfo,
            },
          });
          toast.success("Profile updated successfully");
          navigate("/");
    
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ color: "white" }}>
      <form onSubmit={updateProfile}>
        {list ? (
          <div key={1}>
            <MDBRow className="mb-4">
              <MDBInput
                id={`2`}
                placeholder="Enter your phonenumber"
                value={name}
                label="Name"
                onChange={(e) => setName(e.target.value)}
              ></MDBInput>
            </MDBRow>
            
            <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="enter your email address"
                  _placeholder={{ color: "gray.800" }}
                  style={{color:"white"}}
                  type="email"
                  value={email}
                  isDisabled
                />
              </FormControl>
            <Button
              class="btn btn-primary"
              type="submit"
              style={{ marginTop: "30px" }}
            >
              Save changes
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Profile;
