import React, { useState } from "react";

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
import { Button, Flex } from "@chakra-ui/react";
import { useAddCategoryMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import { Textarea } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AdminCategory = () => {
  const [category, setCategory] = useState("");

  const [Category] = useAddCategoryMutation()
  const navigate = useNavigate();

  const addCategory = async (e) => {
    debugger
    e.preventDefault();
    try {
      
      if (category.trim() ) {
        const res = await Category({ category}).unwrap();
        console.log(res);
      }

      navigate("/admin/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ color: "white" }}>
      <form onSubmit={addCategory}>
        <MDBRow className="mb-4">
          <MDBInput
          style={{marginTop:"100px"}}
            id="form6Example1"
            label="Category name"
            onChange={(e) => setCategory(e.target.value)}
          />
        </MDBRow>

        <Button
          class="btn btn-primary"
          type="submit"
          style={{ marginTop: "30px" }}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default AdminCategory;
