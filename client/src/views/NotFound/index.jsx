import React, { Component } from "react";
import Sidebar from "../../components/Sidebar";

import { Box, Typography, Link } from "@mui/material";

export class NotFound extends Component {
  render() {
    return (
      <Sidebar>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "11%" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 63 }}>
              404
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: 43 }}>
              Page Not Found
            </Typography>
            <Link href="/">
              <Typography sx={{ fontWeight: "bold", fontSize: 23 }}>
                Back to Home
              </Typography>
            </Link>
          </Box>
        </Box>
      </Sidebar>
    );
  }
}

export default NotFound;
