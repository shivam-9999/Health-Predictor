import { withRouter } from "react-router-dom";

import React, { Component } from "react";

import { Container, Row, Col } from "react-bootstrap";

function Home(props) {
  const styles = {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: "30px",
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="display-4" style={styles}>
            GraphQl Application
          </h2>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(Home);
