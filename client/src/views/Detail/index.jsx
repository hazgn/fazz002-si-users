import React, { Component } from "react";
import RouterParams from "../../modules/RouterParams";
import Sidebar from "../../components/Sidebar";
import { Breadcrumbs, Link, Typography, Box } from "@mui/material";

import moment from "moment";

import { connect } from "react-redux";
import { userDetailAction } from "../../redux/actions";

import useMediaSM from "../../components/Sidebar/useMediaSm";
import imageUserDefault from "../../assets/images/default_users.jpg";

export class Detail extends Component {
  componentDidMount() {
    this.props.userDetailDispatch({ id: this.props.params.id });
  }
  render() {
    const { isSmUp, userData } = this.props;
    return (
      <React.Fragment>
        <Sidebar>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/">
              List Users
            </Link>
            <Typography color="text.primary">Detail</Typography>
          </Breadcrumbs>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: !isSmUp ? "center" : "flex-start",
            }}
          >
            <Box
              sx={
                !isSmUp
                  ? {}
                  : { display: "flex", alignItems: "center", marginTop: 3 }
              }
            >
              <img
                src="https://placeimg.com/192/192/people"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `${imageUserDefault}`;
                }}
                style={{ maxWidth: 300, minWidth: 300, borderRadius: 10 }}
              />
              <Box sx={!isSmUp ? { marginTop: 2 } : { marginLeft: 3 }}>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ fontWeight: "bold" }}>Fullname</Typography>
                  <Typography>: {userData.fullname}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
                  <Typography>: {userData.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", maxWidth: !isSmUp ? 300 : "75%" }}>
                  <Typography sx={{ fontWeight: "bold" }}>Biography</Typography>
                  <Typography sx={{ textAlign: "justify" }}>
                    : Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ex labore praesentium quaerat quos ullam, natus doloremque
                    excepturi architecto nemo temporibus deleniti blanditiis qui
                    culpa dolore, perferendis impedit quas adipisci dolorum?
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Created At
                  </Typography>
                  <Typography>
                    :{" "}
                    {userData.created_at
                      ? moment(userData.created_at).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )
                      : "Empty"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Sidebar>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailDispatch: (id) => {
      dispatch(userDetailAction(id));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    userData: state.userDetail.userData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(useMediaSM(RouterParams(Detail)));
