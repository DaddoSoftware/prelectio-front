import { IconButton, InputLabel, TextField } from "@mui/material";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

// al inicio del componente


export const Trayectoria = (props) => {
  const { setValue } = useFormContext();
  
  const addFields = () => {
    const newField = {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
    };
    props.setTrayectoria([...props.trayectoria, newField]);
  };

  const handleFormChange = (index, name, value) => {
    const data = [...props.trayectoria];
    data[index][name] = value;
    props.setTrayectoria(data);
  };

  const removeField = (index) => {
    const data = [...props.trayectoria];
    data.splice(index, 1);
    props.setTrayectoria(data);
  };

  useEffect(() => {
    setValue("careers", props.trayectoria);
  }, [props.trayectoria, setValue]);

  return (
    <div className="trayectoria">
      <Container className="trayectoria__container">
        <Row>
          <h1 style={{ color: "white" }}>Trayectoria</h1>
        </Row>
        <Row className="trayectoria__container__cardRow">
          {props.trayectoria.map((item, index) => (
            <Card
              className="trayectoria__container__cardRow__card"
              key={index}
            >
              <Row style={{ height: "100%" }}>
                <Col
                  md={11}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Row style={{ width: "100%" }}>
                    <Col md={4}>
                      <InputLabel>
                        <h4 style={{ textAlign: "left", color: "white" }}>
                          Título
                        </h4>
                      </InputLabel>
                      <TextField
                        fullWidth
                        value={item.title || ""}
                        onChange={(e) =>
                          handleFormChange(index, "title", e.target.value)
                        }
                        sx={{
                          border: "1px solid white",
                          borderRadius: "5px",
                          input: { color: "white" },
                        }}
                      />
                    </Col>

                    <Col md={4}>
                      <InputLabel>
                        <h4 style={{ textAlign: "left", color: "white" }}>
                          Fecha Inicio
                        </h4>
                      </InputLabel>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          format="DD/MM/YYYY"
                          value={
                            item.startDate
                              ? moment(item.startDate)
                              : null
                          }
                          onChange={(val) =>
                            handleFormChange(
                              index,
                              "startDate",
                              val ? val.toISOString() : ""
                            )
                          }
                          sx={{
                            border: "1px solid white",
                            borderRadius: "5px",
                            width: "100%",
                            input: { color: "white" },
                            "& .MuiSvgIcon-root": {
                              color: "white",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Col>

                    <Col md={4}>
                      <InputLabel>
                        <h4 style={{ textAlign: "left", color: "white" }}>
                          Fecha Fin
                        </h4>
                      </InputLabel>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          format="DD/MM/YYYY"
                          value={
                            item.endDate ? moment(item.endDate) : null
                          }
                          onChange={(val) =>
                            handleFormChange(
                              index,
                              "endDate",
                              val ? val.toISOString() : ""
                            )
                          }
                          sx={{
                            border: "1px solid white",
                            borderRadius: "5px",
                            width: "100%",
                            input: { color: "white" },
                            "& .MuiSvgIcon-root": {
                              color: "white",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Col>
                  </Row>

                  <Row style={{ width: "100%", marginTop: "1rem" }}>
                    <Col md={12}>
                      <InputLabel>
                        <h4 style={{ textAlign: "left", color: "white" }}>
                          Descripción
                        </h4>
                      </InputLabel>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={item.description || ""}
                        onChange={(e) =>
                          handleFormChange(index, "description", e.target.value)
                        }
                        sx={{
                          border: "1px solid white",
                          borderRadius: "5px",
                          input: { color: "white" },
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col
                  md={1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                  }}
                >
                  {index > 0 && (
                    <IconButton
                      style={{ padding: 0 }}
                      onClick={() => removeField(index)}
                    >
                      <DeleteIcon
                        fontSize="large"
                        sx={{ color: "#00ccff" }}
                      />
                    </IconButton>
                  )}
                </Col>
              </Row>
            </Card>
          ))}
        </Row>

        <Row className="trayectoria__container__bottomRow">
          <IconButton onClick={addFields}>
            <AddIcon
              fontSize="large"
              sx={{
                color: "#00ccff",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
          </IconButton>
        </Row>
      </Container>
    </div>
  );
};
