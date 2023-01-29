import React, { Component } from "react";
import Sidebar from "../../components/Sidebar";
import { Breadcrumbs, Typography, Box, TextField, Button } from "@mui/material";

import { createUsers } from "../../modules/utils/users";
import { Navigate } from "react-router-dom";

import Swal from "sweetalert2";

export class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      isSuccess: false,
      idSuccess: null,
    };
  }
  onSubmit = () => {
    createUsers({
      fullname: this.state.fullname,
      email: this.state.email,
    })
      .then((res) => {
        Swal.fire({
          title: res.data.result.message,
          text: `Fullname ${res.data.result.fullname} Email ${res.data.result.email}`,
        });
        this.setState({ idSuccess: res.data.result.id });
        setTimeout(() => {
          this.setState({ isSuccess: true });
        }, 3000);
      })
      .catch((err) => {
        Swal.fire({
          title: "Something an Error?",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };
  render() {
    const { isSuccess, idSuccess } = this.state;
    return (
      <React.Fragment>
        <Sidebar>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography>Create User</Typography>
          </Breadcrumbs>
          <Box sx={{ marginTop: 3 }}>
            <TextField
              id="standard-basic"
              label="Input fullname"
              variant="standard"
              sx={{ width: "100%", marginBottom: 3 }}
              onChange={(e) => {
                this.setState({ fullname: e.target.value });
              }}
            />
            <TextField
              id="standard-basic"
              label="Input Email"
              variant="standard"
              sx={{ width: "100%" }}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
            <Button
              variant="contained"
              sx={{ marginTop: 4, width: "100%" }}
              onClick={this.onSubmit}
            >
              Submit
            </Button>
          </Box>
          {isSuccess && <Navigate to={`/${idSuccess}/detail`} replace={true} />}
        </Sidebar>
      </React.Fragment>
    );
  }
}

export default Create;
