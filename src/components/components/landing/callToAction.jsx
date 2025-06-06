import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const CallToAction = () => {
  return (
    <div className="callToAction">
      <Container className="callToAction__mainContainer">
        <Row className="callToAction__mainContainer__mainRow">
          <Col
            xs={12}
            md={5}
            className="callToAction__mainContainer__mainRow__leftRow"
          >
            <h1>Comienza ahora, llegó tu momento</h1>
          </Col>
          <Col
            xs={12}
            md={6}
            className="callToAction__mainContainer__mainRow__rightRow"
          >
            <Link to="/register">
              <Button className="callToAction__mainContainer__mainRow__rightRow__button">
                <h1>Únete</h1>
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
