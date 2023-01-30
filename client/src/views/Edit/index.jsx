import React, { Component } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Breadcrumbs,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Navigate } from "react-router-dom";
import RouterParams from "../../modules/RouterParams";

import { listUserAction } from "../../redux/actions";
import { getUserDetail, patchUserUpdate } from "../../modules/utils/users";
import { connect } from "react-redux";

import Swal from "sweetalert2";

export class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id !== "null" ? this.props.params.id : null,
      selectId: "",
      params: {
        search: "",
        by: "id",
        order: "asc",
      },
      fullname: "",
      email: "",
      isSuccess: false,
    };
  }

  componentDidMount() {
    this.props.listUserDispatch(this.state.params);
    if (this.state.id) {
      this.setState({ selectId: this.state.id });
      getUserDetail({ id: this.state.id }).then((res) => {
        this.setState({ fullname: res.data.result.fullname });
        this.setState({ email: res.data.result.email });
      });
    }
  }

  handleChange = (e) => {
    this.setState({ selectId: e.target.value });
    getUserDetail({ id: e.target.value }).then((res) => {
      this.setState({ fullname: res.data.result.fullname });
      this.setState({ email: res.data.result.email });
    });
  };

  onSubmit = () => {
    patchUserUpdate(this.state.selectId, {
      email: this.state.email,
      fullname: this.state.fullname,
    })
      .then((res) => {
        Swal.fire({
          title: res.data.result.message,
          icon: "success",
        });
        setTimeout(() => {
          this.setState({ isSuccess: true });
        }, 3000);
      })
      .catch((err) => {
        Swal.fire({
          title: "There an Error?",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  render() {
    const { selectId, fullname, email, isSuccess } = this.state;

    const { userListData } = this.props;
    return (
      <React.Fragment>
        <Sidebar>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography>Edit User</Typography>
          </Breadcrumbs>
          <FormControl sx={{ m: 1, width: "100%", mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Select Users</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectId}
              label="Select Users"
              onChange={this.handleChange}
            >
              {userListData?.map(({ id, fullname }) => (
                <MenuItem value={id} key={id}>
                  {fullname}
                </MenuItem>
              ))}
            </Select>
            <Box sx={{ marginTop: 3 }}>
              <TextField
                id="standard-basic"
                label="Input fullname"
                variant="standard"
                sx={{ width: "100%", marginBottom: 4 }}
                value={fullname}
                onChange={(e) => {
                  this.setState({ fullname: e.target.value });
                }}
              />
              <TextField
                id="standard-basic"
                label="Input Email"
                variant="standard"
                sx={{ width: "100%" }}
                value={email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
              <Button
                variant="contained"
                sx={{ marginTop: 4, width: "100%" }}
                disabled={!selectId ? true : false}
                onClick={this.onSubmit}
              >
                Submit
              </Button>
            </Box>
          </FormControl>
          {isSuccess && <Navigate to={`/${selectId}/detail`} replace={true} />}
        </Sidebar>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listUserDispatch: (params) => {
      dispatch(listUserAction(params));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    userListData: state.userList.userListData,
    meta: state.userList.meta,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterParams(Edit));
