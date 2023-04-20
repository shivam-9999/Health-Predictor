
import React from "react";
import moment from "moment-timezone";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = (props) => {
  const currentYear = moment().get("year");

  return (
    <div>
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © {`${currentYear} `}
            </p>
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default Footer;