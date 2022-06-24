import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

import Avatar from "@mui/material/Avatar";
import axios from "axios";

import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

type userType = {
  email: string;
  role: string;
};

interface ManageUsersProps {
  users: Array<userType>;
  setOpenModal: Function;
  setCurrUser: Function;
  deleteUser: Function;
}

export default function ManageUsers(props: ManageUsersProps) {
  const { users, setOpenModal, setCurrUser, deleteUser } = props;

  return (
    <List dense sx={{ width: "100%", maxWidth: 500, bgcolor: "white" }}>
      <ListItem>
        <Typography align={"center"} fontSize={"24px"} width="100%">
          Manage Users
        </Typography>
      </ListItem>
      <Divider />
      {users.map((user, index) => {
        const labelId = `checkbox-list-secondary-label-${user.email}`;
        return (
          <ListItem
            key={index}
            secondaryAction={
              <Box>
                <Tooltip title="Manage Access">
                  <IconButton
                    edge="end"
                    aria-label="update"
                    sx={{ mr: "5px" }}
                    onClick={() => {
                      setOpenModal(true);
                      setCurrUser({ email: user.email, role: user.role });
                      // updateUser(user.email, user.role);
                    }}
                  >
                    <ManageAccountsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      deleteUser(user.email);
                    }}
                  >
                    <PersonRemoveIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText
                id={labelId}
                primary={`Email: ${user.email}`}
                secondary={`Role: ${user.role}`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
