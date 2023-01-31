import React, { Component } from "react";
import Sidebar from "../../components/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import {
  Breadcrumbs,
  Typography,
  Box,
  Button,
  TextField,
  FormLabel,
} from "@mui/material";

import { listUserAction } from "../../redux/actions";
import { connect } from "react-redux";

import { column } from "./column";

import { deleteUserMutiple } from "../../modules/utils/users";

import Swal from "sweetalert2";

export class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      by: "id",
      order: "asc",
      idSelect: [],
      // limit: 10,
      // page: 1,
      contextMenu: null,
      mouseEnterIconSearch: false,
    };
  }

  componentDidMount() {
    this.props.listUserDispatch({
      search: this.state.search,
      by: this.state.by,
      order: this.state.order,
      // limit:this.state.limit,
      // page:this.state.page
    });
  }

  handleContextMenu = (e) => {
    e.preventDefault();
    this.setState({
      contextMenu:
        this.state.contextMenu === null
          ? { mouseX: e.clientX - 2, mouseY: e.clientY - 4 }
          : null,
    });
  };

  onSearch = () => {
    this.props.listUserDispatch({
      search: this.state.search,
      by: this.state.by,
      order: this.state.order,
      // limit:this.state.limit,
      // page:this.state.page
    });
  };

  onDeleteMutiple = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure you want Delete users ?",
        text: "once the data is deleted it will not be able to return!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "No, Cancel!",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteUserMutiple({
            idBatch: this.state.idSelect,
          }).then(() => {
            swalWithBootstrapButtons.fire({
              title: "Delete User is Successed",
              icon: "success",
            });
            this.props.listUserDispatch({
              search: this.state.search,
              by: this.state.by,
              order: this.state.order,
              // limit:this.state.limit,
              // page:this.state.page
            });
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Ok, Data is still safe",
            "info"
          );
        }
      });
  };

  render() {
    const { userListData } = this.props;

    const { search, mouseEnterIconSearch, idSelect } = this.state;

    let dataTable = [];
    const no = 1;

    userListData.forEach((data, idx) => {
      dataTable.push({
        no: no + idx,
        id: data.id,
        email: data.email,
        fullname: data.fullname,
        created_at: data.created_at,
      });
    });

    return (
      <React.Fragment>
        <Sidebar>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">Delete Users</Typography>
          </Breadcrumbs>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                display: "flex",
                alignItems: "center",
                minWidth: "280px",
                maxWidth: "280px",
                justifyContent: "space-between",
              }}
            >
              <TextField
                id="outlined-basic"
                value={search}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    this.onSearch();
                  }
                }}
                label="Search"
                variant="outlined"
                sx={{ my: 2 }}
                onChange={(e) => {
                  this.setState({ search: e.target.value });
                }}
              />
              <Box
                sx={{
                  border: 1,
                  padding: 1,
                  pt: 2,
                  px: 1,
                  borderRadius: 1,
                  color: "gray",
                  cursor: "pointer",
                  backgroundColor: mouseEnterIconSearch
                    ? "rgba(108, 122, 137, 0.1)"
                    : "",
                  borderColor: mouseEnterIconSearch
                    ? "black"
                    : "rgba(108, 122, 137, 0.6)",
                }}
                onClick={this.onSearch}
                onMouseEnter={() => {
                  this.setState({ mouseEnterIconSearch: true });
                }}
                onMouseLeave={() => {
                  this.setState({ mouseEnterIconSearch: false });
                }}
              >
                <SearchIcon
                  sx={{ color: mouseEnterIconSearch ? "#000" : "" }}
                />
              </Box>
            </FormLabel>
            <Button
              variant="contained"
              sx={{ height: 50 }}
              onClick={this.onDeleteMutiple}
              disabled={idSelect.length > 0 ? false : true}
            >
              Delete Mutiple
            </Button>
          </Box>
          <Box style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={dataTable}
              columns={column}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={(data) => {
                this.setState({ idSelect: data });
              }}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
