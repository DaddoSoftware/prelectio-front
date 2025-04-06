import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { InputLabel } from "@mui/material";
import { DateField } from "./FormFields/dateField";
import { InputField } from "./FormFields/inputField";
import { DptoSelectField } from "./FormFields/departamentoSelectField";
import { SelectField } from "./FormFields/selectField";
import { useWatch } from "react-hook-form";
import moment from "moment";

export const InformacionPersonal = ({
  departamentos,
  selectedCities,
  setSelectedDpto,
  setUnderaged,
}) => {
  // Se utiliza "birthDate" para el control del formulario
  const birthDate = useWatch({ name: "birthDate" });

  useEffect(() => {
    if (birthDate) {
      const age = moment().diff(moment(birthDate), "years");
      // Si la edad es menor a 18 se marca como underaged
      setUnderaged(age < 18);
    }

    // console.log(birthDate);
  }, [birthDate, setUnderaged]);

  return (
    <div className="informacionPersonal">
      <Container className="informacionPersonal__container">
        <Row className="informacionPersonal__container__row">
          <Col md={6}>
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Nombre</h4>
            </InputLabel>
            {/* Ahora se mapea a "userName" para que coincida con el JSON */}
            <InputField label="Nombre Completo" name="user.userName" />
          </Col>
          <Col md={6}>
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Correo</h4>
            </InputLabel>
            <InputField label="Correo" name="user.email" />
          </Col>
        </Row>

        <Row className="informacionPersonal__container__row">
          <Col md={2}>
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Tipo Documento
              </h4>
            </InputLabel>
            <SelectField
              placeholder="Tipo Documento"
              options={[
                { value: "CC", label: "CC" },
                { value: "CE", label: "CE" },
                { value: "TI", label: "TI" },
              ]}
              label="Tipo Documento"
              name="user.documentType"
            />
          </Col>
          <Col md={4}>
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Número de documento
              </h4>
            </InputLabel>
            <InputField label="Número Documento" name="user.documentNumber" />
          </Col>
          <Col md={3}>
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Fecha Nacimiento
              </h4>
            </InputLabel>
            {/* Se utiliza "birthDate" para el campo de fecha */}
            <DateField label="Fecha Nacimiento" name="user.birthDate"/>
          </Col>
          <Col md={3}>
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Celular</h4>
            </InputLabel>
            <InputField label="Celular" name="user.phone" />
          </Col>
        </Row>

        <Row className="informacionPersonal__container__row">
          <Col md={3}>
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Estado</h4>
            </InputLabel>
            {/* Se utiliza DptoSelectField para seleccionar el "state" */}
            <DptoSelectField
              placeholder="Estado"
              options={departamentos}
              label="Estado"
              name="user.location.state"
              setSelectedDpto={setSelectedDpto}
            />
          </Col>
          <Col md={3}>
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Ciudad</h4>
            </InputLabel>
            {/* La lista de ciudades proviene del nuevo modelo y se asigna a "city" */}
            <SelectField
              label="Ciudad"
              name="user.location.city"
              placeholder="Ciudad"
              options={selectedCities}
            />
          </Col>
          <Col md={3}>
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Dirección</h4>
            </InputLabel>
            <InputField label="Dirección" name="user.address" />
          </Col>
          <Col md={3}>
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Género</h4>
            </InputLabel>
            <SelectField
              label="Género"
              name="user.gender"
              placeholder="Género"
              options={[
                { value: "Masculino", label: "Masculino" },
                { value: "Femenino", label: "Femenino" },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
