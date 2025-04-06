import React, { useEffect, useState } from "react";
import prelectioLogo from "../../assets/logo_prelectio.png";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Step, StepLabel, Stepper } from "@mui/material";
import { getMunicipalities } from "../../services/locationServices";
import {
  InformacionDeportiva,
  InformacionPersonal,
  VideoYFotoPerfil,
} from "../../components/components";
import { CODES } from "../../consts/codes";
import { useNavigate } from "react-router-dom";
import { RegisterDeportistaService } from "../../services/deportistaServices";
import { ModalInfo } from "../../components/components/modals/ModalInfo";
import { ModalAction } from "../../components/components/modals/ModalAction";
import { PasswordDeportista } from "../../components/components/registerDeportista/passwordDeportista";
import { Trayectoria } from "../../components/components/registerDeportista/trayectoria";
import { InformacionAcudiente } from "../../components/components/registerDeportista/informacionAcudiente";
import { m } from "framer-motion";
import { ModalSimpleAction } from "../../components/components/modals/ModalSimpleAction";

const defaultValues = {
  user: {
    userName: "",
    documentType: "",
    documentNumber: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    birthDate: "",
    address: "",
  },
  athlete: {

  },
  careers: [

  ]
};

const getFormSteps = ({ underaged, context }) => [
  {
    label: "Información Personal",
    component: (
      <InformacionPersonal
        departamentos={context.departments}
        setSelectedDpto={context.setSelectedDpto}
        selectedCities={context.selectedCities}
        setUnderaged={context.setUnderaged}
      />
    ),
    validationSchema: yup.object({}), // to be filled later
  },
  {
    label: "Información Deportiva",
    component:<InformacionDeportiva />,
    validationSchema: yup.object({}), // to be filled later
  },
  {
    label: "Video y Foto de Perfil",
    component: (
      <VideoYFotoPerfil
        allowImage={context.allowImage}
        handleImageChange={context.handleImageChange}
        imagePreviewUrl={context.imagePreviewUrl}
      />
    ),
    validationSchema: yup.object({}), // to be filled later
  },
  {
    label: "Trayectoria",
    component: (
      <Trayectoria
        trayectoria={context.trayectoria}
        setTrayectoria={context.setTrayectoria}
      />
    ),
    validationSchema: yup.object({}),
  },
  {
    label: "Contraseña",
    component: <PasswordDeportista />,
    validationSchema: yup.object({}), // to be filled later
  },
  {
    label: "Información Acudiente",
    condition: underaged,
    component: <InformacionAcudiente />,
    validationSchema: yup.object({}), // to be filled later
  },
].filter((step) => step.condition === undefined || step.condition);

export const RegisterDeportista = () => {
  const MAX_FILE_SIZE = 5242880;
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [municipalitiesData, setMunicipalitiesData] = useState([]);
  const [selectedDpto, setSelectedDpto] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const [openModalAction, setOpenModalAction] = useState(false);
  const [allowImage, setAllowImage] = useState(true);
  const [underaged, setUnderaged] = useState(false);
  const [trayectoria, setTrayectoria] = useState([]);

  useEffect(() => {
    if (selectedDpto !== "") {
      const deptData = municipalitiesData.find((item) => item.department === selectedDpto);
      if (deptData) {
        const filteredMunicipalities = deptData.municipalities.map((municipality) => ({
          value: municipality,
          label: municipality,
        }));
        setSelectedCities(filteredMunicipalities);
      } else {
        setSelectedCities([]);
      }
    }
  }, [selectedDpto, municipalitiesData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMunicipalities();
        if (response.data) {
          setMunicipalitiesData(response.data);
          const dptos = response.data.map((item) => ({
            label: item.department,
            value: item.department,
          }));
          setDepartments(dptos);
        }
      } catch (error) {
        console.error("Error al obtener los datos de municipios:", error);
      }
    };

    fetchData();
  }, []);

  const context = {
    departments,
    setSelectedDpto,
    selectedCities,
    setUnderaged,
    allowImage,
    handleImageChange: (event) => {
      const file = event.target.files[0];
      setAllowImage(true);
      if (file.size > MAX_FILE_SIZE) {
        setAllowImage(false);
      } else {
        setAllowImage(true);
        setImageFile(file);
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageDataUrl = reader.result;
            setImagePreviewUrl(imageDataUrl);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    imagePreviewUrl,
    trayectoria,
    setTrayectoria,
  };

  const formSteps = getFormSteps({ underaged, context });

  const methods = useForm({ defaultValues });
  const { handleSubmit, watch } = methods;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("[SUBMIT] Enviando datos al backend:", data);
  
      const response = await RegisterDeportistaService(data); // <- ajusta si necesita formateo
  
      console.log(response);

      setResponseMessage({
        title: "¡Registro exitoso!",
        message: "Tu información ha sido registrada correctamente.",
      });
      setOpenModalAction(true);
    } catch (error) {
      console.error("[ERROR] Error al registrar:", error);
      setResponseMessage({
        title: "Error en el registro",
        message: "Ocurrió un problema al registrar. Intenta nuevamente.",
      });
      setOpenModalInfo(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const values = watch();
    console.log("[DEBUG] Form values before moving to next step:", values);
    setActiveStep((prev) => prev + 1);
  };

  return (
    <div className="registerDeportista">
      <img src={prelectioLogo} alt="logo" className="registerDeportista__logo" />
      <Container className="registerDeportista__container">
        <ModalInfo data={responseMessage} open={openModalInfo} setOpen={setOpenModalInfo} />
        <ModalSimpleAction data={responseMessage} open={openModalAction} setOpen={setOpenModalAction} action={() => navigate("/login", { replace: true })} />

        <Row className="registerDeportista__container__topRow">
          <Col xs={2} className="registerDeportista__container__topRow__buttonCol">
            <Button onClick={() => navigate(-1)} className="registerDeportista__container__topRow__buttonCol__button">
              ←
            </Button>
            <div className="registerDeportista__container__topRow__buttonCol__div">
              <p>Ir atrás {JSON.stringify(underaged)}</p>
            </div>
          </Col>
        </Row>

        <Stepper activeStep={activeStep} className="registerDeportista__container__stepper">
          {formSteps.map((step, index) => (
            <Step key={step.label} sx={{
              "& .Mui-completed .MuiStepIcon-root": { color: "#00ccff", height: "25px", width: "25px" },
              "& .Mui-disabled .MuiStepIcon-root": { color: "#484848", height: "25px", width: "25px" },
              "& .Mui-active .MuiStepIcon-root": { color: "#00ccff", height: "25px", width: "25px" },
            }} className="registerDeportista__container__stepper__step">
              <StepLabel sx={{ color: "white !important" }} className="registerDeportista__container__stepper__step__label">
                <p style={{ color: "white" }}>{step.label}</p>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <div style={{ minHeight: "50%" }}>
          {activeStep === formSteps.length ? (
            <Button onClick={() => setActiveStep(0)}>Reset</Button>
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="registerDeportista__container__content">
                  {formSteps[activeStep].component}
                </div>
                <div style={{ paddingTop: "5vh" }}>
                  <Row>
                    <Col xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                      {activeStep !== 0 && (
                        <Button variant="contained" color="primary" onClick={() => setActiveStep((prev) => prev - 1)} className="registerDeportista__container__nextButton">
                          Anterior
                        </Button>
                      )}
                    </Col>
                    <Col xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                      {activeStep === formSteps.length - 1 ? (
                        <Button variant="contained" color="primary" className="registerDeportista__container__nextButton" type="submit">
                          {loading ? <Spinner animation="border" /> : "Finalizar"}
                        </Button>
                      ) : (
                        <Button variant="contained" color="primary" onClick={handleNext} className="registerDeportista__container__nextButton">
                          Siguiente
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </form>
            </FormProvider>
          )}
        </div>
      </Container>
    </div>
  );
};
