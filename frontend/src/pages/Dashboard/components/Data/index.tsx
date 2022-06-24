import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import InfoIcon from "@mui/icons-material/Info";

import axios from "axios";

interface dataprops {
  role: string;
}

type assetType = {
  company: string;
  machine_hours: string;
  major_code: string;
  name: string;
  partsId: string;
  stdcost: string;
};

export default function Data(props: dataprops) {
  const [assets, setAssets] = useState<Array<assetType>>([]);
  const { role } = props;
  useEffect(() => {
    axios
      .get("/get_assets")
      .then((response) => {
        console.log("SUCCESS", response);
        setAssets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div>
        {assets.map((a, index) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{a.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Cost: ${a.stdcost}</Typography>
                <Typography>Major Code: {a.major_code}</Typography>
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  Machine Hours: {a.machine_hours}
                  {Number(a.machine_hours) > 15000 ? (
                    <Tooltip title="This part has been over used, re-servicing recommended">
                      <IconButton edge="end" aria-label="delete">
                        <InfoIcon color="info" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                </Typography>
                {role === "buyer" ? (
                  <Button
                    variant="contained"
                    href="https://parts.cat.com/en/catcorp"
                    target="_blank"
                    sx={{ mt: 1, ml: 0 }}
                  >
                    Parts.cat.com
                  </Button>
                ) : (
                  <></>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Dozer</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>10,000 Hours</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Excavator</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>15,000 Hours</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>You need admin access to see this data</Typography>
          </AccordionSummary>
        </Accordion> */}
      </div>
    </Container>
  );
}
