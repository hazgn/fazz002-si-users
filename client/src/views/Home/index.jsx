import React, { Component } from "react";
import Sidebar from "../../components/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
  TextField,
  FormLabel,
} from "@mui/material";

import { listUserAction } from "../../redux/actions";
import { connect } from "react-redux";

import { columns } from "./column";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      by: "id",
      order: "asc",
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

  render() {
    const { userListData } = this.props;
    const { search, mouseEnterIconSearch } = this.state;

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
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">List Users</Typography>
          </Breadcrumbs>

          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
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
              <SearchIcon sx={{ color: mouseEnterIconSearch ? "#000" : "" }} />
            </Box>
          </FormLabel>

          <Box style={{ height: 400, width: "100%" }}>
            <DataGrid
              columns={columns}
              pageSize={5}
              rows={dataTable}
              rowsPerPageOptions={[5]}
              componentsProps={{
                oncontextmenu: this.handleContextMenu,
                style: { cursor: "context-menu" },
              }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
