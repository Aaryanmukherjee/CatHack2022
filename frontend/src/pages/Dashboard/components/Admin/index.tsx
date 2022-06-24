import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ManageUsers from "./components/ManageUsers";
import { render } from "@testing-library/react";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";

import axios from "axios";

interface adminProps {}
type userType = {
  email: string;
  role: string;
};

const steps = ["User Info", "Access Details"];

const theme = createTheme();
export default function Admin(props: adminProps) {
  const [activeStep, setActiveStep] = React.useState(0);

  const [users, setUsers] = useState<Array<userType>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currUser, setCurrUser] = useState<userType>({ email: "", role: "" });
  const [currRole, setRole] = useState("");

  const [newUser, setNewUser] = useState<userType>({
    email: "",
    role: "viewer",
  });

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm setNewUser={setNewUser} newUser={newUser} />;
      case 1:
        return <PaymentForm setNewUser={setNewUser} newUser={newUser} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const getUsers = async () => {
    axios
      .get("/get_users")
      .then((response) => {
        console.log("SUCCESS", response);

        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addUser = async (email: string, role: string) => {
    const req = { email: email, role: role };

    axios
      .post("/add_user", req)
      .then((response) => {
        getUsers();
        console.log("SUCCESS", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateUser = async (email: string, role: string) => {
    const req = { email: email, role: role };

    axios
      .post("/update_user", req)
      .then((response) => {
        getUsers();
        console.log("SUCCESS", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = async (email: string) => {
    const req = { email: email };

    axios
      .post("/delete_user", req)
      .then((response) => {
        getUsers();
        console.log("SUCCESS", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNext = () => {
    if (activeStep == 1) {
      addUser(newUser.email, newUser.role);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setNewUser({ email: "", role: "" });
    setActiveStep(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser(currUser.email, currRole);
    setOpenModal(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" alignItems={"flex-start"} pt="50px">
          <ManageUsers
            users={users}
            setOpenModal={setOpenModal}
            setCurrUser={setCurrUser}
            deleteUser={deleteUser}
          />
          <Container maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
              <Typography component="h1" variant="h4" align="center">
                Admin Panel
              </Typography>
              <Stepper
                activeStep={activeStep}
                color="yellow"
                sx={{ pt: 3, pb: 5 }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Done!
                    </Typography>
                    <Typography variant="subtitle1">
                      User has been authorized.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleReset}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Authorize new user
                    </Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                        disabled={
                          activeStep === steps.length - 1
                            ? newUser.role === ""
                              ? true
                              : false
                            : newUser.email === ""
                            ? true
                            : false
                        }
                      >
                        {activeStep === steps.length - 1 ? "Activate" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </Container>
        </Box>

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                width: "80%",
              }}
              display="flex"
              flexDirection="column"
              // justifyContent={"center"}
              // alignItems="center"
            >
              <Typography variant="h6" gutterBottom>
                Manage Access
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="viewer"
                    control={<Radio />}
                    label="Viewer"
                    onClick={() => setRole("viewer")}
                  />
                  <FormControlLabel
                    value="buyer"
                    control={<Radio />}
                    label="Buyer"
                    onClick={() => setRole("buyer")}
                  />
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                    onClick={() => setRole("admin")}
                  />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  "&:hover": {},
                  width: "30%",
                }}
                disabled={currRole ? false : true}
              >
                {"Submit"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </ThemeProvider>
    </Container>
  );
}
