import { InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useWatch } from "react-hook-form";
import { REGEXP } from "../../../consts/regex";
import { PasswordInput } from "./FormFields/passwordInputField";

export const PasswordDeportista = ({ ...props }) => {
  const password = useWatch().password;
  return (
    <div className="passwordDeportista">
      <Container className="passwordDeportista__container">
        <Row>
          <Col xs={12} md={8} style={{ padding: "3rem" }}>
            <Row>
              <Col xs={12}>
                <h1
                  className="text-white display__large weight__bold"
                  style={{ textAlign: "start", marginBottom: "3vh" }}
                >
                  Asignar Contraseña
                </h1>
              </Col>
              <Col xs={12}>
                <InputLabel>
                  <h4 style={{ textAlign: "left", color: "white" }}>
                    Contraseña
                  </h4>
                </InputLabel>
                <PasswordInput label="Contraseña" name="user.password" />
                <div style={{ marginTop: "2vh" }}>
                  <InputLabel>
                    <h4 style={{ textAlign: "left", color: "white" }}>
                      Confirmar Contraseña
                    </h4>
                  </InputLabel>
                  <PasswordInput
                    label="Confirmar Contraseña"
                    name="user.passwordConfirmation"
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4} className="p-4 d-flex ">
            <Row>
              <Col className="text-white display__regular weight__bold" xs={12}>
                <p>Para crear tu contraseña ten en cuenta:</p>
              </Col>
              <Col className="text-white display__label" xs={12}>
                <p style={{ textAlign: "left" }}>
                  {password?.length >= 8 && password?.length <= 15 ? (
                    <i className="bi bi-check-lg"></i>
                  ) : (
                    <i className="bi bi-x-lg"></i>
                  )}{" "}
                  Minimo 8 caracteres y máximo 15.
                </p>
              </Col>
              <Col className="text-white display__label" xs={12}>
                <p style={{ textAlign: "left" }}>
                  {" "}
                  {REGEXP.ONE_LOWER_LETTER.test(password) ? (
                    <i className="bi bi-check-lg"></i>
                  ) : (
                    <i className="bi bi-x-lg"></i>
                  )}{" "}
                  Al menos una minúscula.
                </p>
              </Col>
              <Col className="text-white display__label" xs={12}>
                <p style={{ textAlign: "left" }}>
                  {REGEXP.ONE_UPPER_LETTER.test(password) ? (
                    <i className="bi bi-check-lg"></i>
                  ) : (
                    <i className="bi bi-x-lg"></i>
                  )}{" "}
                  Al menos una mayúscula..
                </p>
              </Col>
              <Col className="text-white display__label" xs={12}>
                <p style={{ textAlign: "left" }}>
                  {" "}
                  {REGEXP.ONE_NUMBER.test(password) ? (
                    <i className="bi bi-check-lg"></i>
                  ) : (
                    <i className="bi bi-x-lg"></i>
                  )}{" "}
                  Al menos un número.
                </p>
              </Col>
              <Col className="text-white display__label" xs={12}>
                <p style={{ textAlign: "left" }}>
                  {REGEXP.ONE_SPECIAL_CHAR.test(password) ? (
                    <i className="bi bi-check-lg"></i>
                  ) : (
                    <i className="bi bi-x-lg"></i>
                  )}{" "}
                  Al menos un carácter especial.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
