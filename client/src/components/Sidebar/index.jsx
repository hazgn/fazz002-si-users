import React, { Component } from "react";

import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../Navigator";
import Header from "../Header";

const drawerWidth = 256;

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      isSmUp: window.innerWidth,
    };
  }

  handleDrawerToggle = () => {
    this.setState({ isMobile: !this.state.isMobile });
  };

  render() {
    const { isSmUp, isMobile } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <CssBaseline />
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {isSmUp <= 640 ? null : (
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={isMobile}
                onClose={this.handleDrawerToggle}
              />
            )}
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              sx={{ display: { sm: "block", xs: "none" } }}
            />
          </Box>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Header onDrawerToggle={this.handleDrawerToggle} />
            <Box
              component="main"
              sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
            >
              {this.props.children}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

export default Sidebar;
