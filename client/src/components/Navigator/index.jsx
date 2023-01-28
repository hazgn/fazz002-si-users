import React, { Component } from "react";
import { item, itemCategory } from "./style";
import { categories } from "./navigate";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";
import { AlignHorizontalLeft } from "@mui/icons-material";

import { NavLink } from "react-router-dom";

export class Navigator extends Component {
  render() {
    const { ...other } = this.props;
    return (
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem sx={{ ...item, ...itemCategory }}>
            <ListItemIcon>
              <AlignHorizontalLeft />
            </ListItemIcon>
            <ListItemText>FAZZ002</ListItemText>
          </ListItem>
          {categories.map(({ id, children }) => (
            <Box key={id}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, link }) => (
                <ListItem disablePadding key={childId}>
                  <NavLink
                    to={link}
                    style={{ width: "100%", textDecoration: "none", marginBottom:12 }}
                  >
                    <ListItemButton sx={item}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </Box>
          ))}
        </List>
      </Drawer>
    );
  }
}

export default Navigator;
