import React, { useEffect, useState } from "react";
import { InputLabel, TextField } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { InputField } from "./FormFields/inputField";
import { MultipleSelectField } from "./FormFields/multipleSelectFields";
import { SelectField } from "./FormFields/selectField";
import {
  getPlayerPositions,
  getPredominantTraits,
  getSkills,
} from "../../../services/athleteService";
import { TextAreaField } from "./FormFields/textAreaField";

export const InformacionDeportiva = () => {
  const [posiciones, setPosiciones] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [rasgos, setRasgos] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const [posRes, habRes, rasgoRes] = await Promise.all([
          getPlayerPositions(),
          getSkills(),
          getPredominantTraits(),
        ]);

        const posicionesOptions = Object.entries(posRes.data).map(
          ([value, label]) => ({
            value,
            label: getNombreCompletoPosicion(value),
          })
        );

        const habilidadesOptions = Object.entries(habRes.data).map(
          ([value, label]) => ({ value, label })
        );

        const rasgosOptions = Object.entries(rasgoRes.data).map(
          ([value, label]) => ({ value, label })
        );

        setPosiciones(posicionesOptions);
        setHabilidades(habilidadesOptions);
        setRasgos(rasgosOptions);
      } catch (error) {
        console.error("Error al cargar enums:", error);
      }
    };

    fetchEnums();
  }, []);

  const getNombreCompletoPosicion = (code) => {
    const diccionario = {
      GK: "Portero",
      CB: "Central",
      SW: "Líbero",
      RB: "Lateral Derecho",
      LB: "Lateral Izquierdo",
      RWB: "Carrilero Derecho",
      LWB: "Carrilero Izquierdo",
      CDM: "Volante de Marca",
      CM: "Volante Central",
      CAM: "Volante Ofensivo",
      RM: "Extremo Derecho",
      LM: "Extremo Izquierdo",
      RCM: "Volante Central Derecho",
      LCM: "Volante Central Izquierdo",
      RW: "Extremo Ofensivo Derecho",
      LW: "Extremo Ofensivo Izquierdo",
      ST: "Delantero Centro",
      CF: "Delantero Retrasado",
      F9: "Falso 9",
    };

    return diccionario[code] || code;
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      setPdfFile(null);
    }
  };

  return (
    <div className="informacionDeportiva">
      <Container className="informacionDeportiva__container">
        <Row className="informacionDeportiva__container__row">
          <Col md={4}>
            <InputLabel><h4 style={{ color: "white" }}>Estatura (cm)</h4></InputLabel>
            <InputField label="Estatura (cm)" name="athlete.height" />
          </Col>
          <Col md={4}>
            <InputLabel><h4 style={{ color: "white" }}>Peso (kg)</h4></InputLabel>
            <InputField label="Peso (kg)" name="athlete.weight" />
          </Col>
          <Col md={4}>
            <InputLabel><h4 style={{ color: "white" }}>Pierna Hábil</h4></InputLabel>
            <SelectField
              placeholder="Pierna Hábil"
              label="Pierna Hábil"
              name="athlete.dominantFoot"
              options={[
                { label: "Derecha", value: "DERECHA" },
                { label: "Izquierda", value: "IZQUIERDA" },
              ]}
            />
          </Col>
        </Row>

        <Row className="informacionDeportiva__container__row">
          <Col md={6}>
            <InputLabel><h4 style={{ color: "white" }}>Posición</h4></InputLabel>
            <SelectField
              placeholder="Posición"
              label="Posición"
              name="athlete.position"
              options={posiciones}
            />
          </Col>
          <Col md={6}>
            <InputLabel><h4 style={{ color: "white" }}>Habilidades (máximo 5)</h4></InputLabel>
            <MultipleSelectField
              placeholder="Habilidades"
              label="Habilidades"
              name="athlete.skills"
              options={habilidades}
            />
          </Col>
        </Row>

        <Row className="informacionDeportiva__container__row">
          <Col md={6}>
            <InputLabel><h4 style={{ color: "white" }}>Rasgo Predominante</h4></InputLabel>
            <SelectField
              placeholder="Rasgo Predominante"
              label="Rasgo Predominante"
              name="athlete.predominantTraits"
              options={rasgos}
            />
          </Col>
          <Col md={6}>
            <InputLabel><h4 style={{ color: "white" }}>Subir Historia Clínica (PDF)</h4></InputLabel>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
              style={{ color: "white" }}
            />
          </Col>
        </Row>

        <Row className="informacionDeportiva__container__row">
          <Col md={12}>
            <InputLabel><h4 style={{ color: "white" }}>Historia Clínica</h4></InputLabel>
            <TextAreaField
              name="athlete.clinicalHistory"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { color: "white" } }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};