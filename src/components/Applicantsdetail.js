import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { styled } from "@mui/material/styles";
import { BiUserCircle } from "react-icons/bi";
export default function Applicantsdetail({ data }) {
  const clas = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log(data, "data");

  return (
    <>
      <div>
        <div
          className="modal fade"
          id="exampleModalCenter1"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className="modal-content"
              // style={{ display: "grid", placeItems: "end" }}
            >
              {/* <div className="modal-header"> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px",
                }}
              >
                <h4>Applicants</h4>
                <button
                  type="button"
                  className="close crossbtn1"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="crossbtn1" aria-hidden="true">
                    &times;
                  </span>
                </button>
              </div>
              {!data?.length ? (
                <div style={{ textAlign: "center", width: "100%" }}>
                  OPPSS...! NO APPLICANTS YET
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {data?.map((v, i) => (
                    // <div >
                    <div style={{ margin: "3px" }}>
                      <Accordion
                        expanded={expanded === i}
                        onChange={handleChange(i)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography className={clas.heading}>
                            <BiUserCircle color="#0072ff" size={"23px"} />{" "}
                            {v.name}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <p style={{ color: "royalblue" }}>
                              {" "}
                              Email : {v.email}
                            </p>
                            {/* <br /> */}
                            <p style={{ color: "royalblue" }}>
                              {" "}
                              Address : {v.Address}
                            </p>
                            {/* <br /> */}
                            <p style={{ color: "royalblue" }}>
                              {" "}
                              phone: +92{v.phone}
                            </p>
                            {/* <h6 style={{ visibility: "hidden" }}>
                              Nulla facilisi. Phasellus sollicitudin nulla et
                              quam mattquam matt
                            </h6> */}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
