import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import List from "@mui/material/List";

interface listProps {
  handleActive: Function;
  activeItem: Number;
  isAdmin: boolean;
}

export default function MainListItems(props: listProps) {
  const { handleActive, activeItem, isAdmin } = props;
  return (
    <List component="nav">
      <ListItemButton
        onClick={() => {
          handleActive(0);
        }}
        selected={activeItem == 0}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Data" />
      </ListItemButton>

      {isAdmin ? (
        <ListItemButton
          onClick={() => {
            handleActive(1);
          }}
          selected={activeItem == 1}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </ListItemButton>
      ) : (
        <></>
      )}
    </List>
  );
}
