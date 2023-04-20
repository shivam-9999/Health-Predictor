
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faBoxOpen, faFileAlt } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const PatientsTable = ({ patients }) => {
  const totalPatients = patients.length;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = React.useState(0);
  const [entriesPerPage] = React.useState(10);

  const numberOfPages = React.useMemo(() => {
    return Math.ceil(patients.length / entriesPerPage)
  }, [patients, entriesPerPage]);

  const paginatedData = React.useMemo(() => {
    return patients.slice(entriesPerPage * currentPage, entriesPerPage * (currentPage + 1));
  }, [patients, entriesPerPage, currentPage]);

  const onPreviousClick = () => {
    setCurrentPage((curr) => curr > 0 ? curr - 1 : curr)
  }

  const onNextClick = () => {
    setCurrentPage((curr) => curr + 1 < numberOfPages ? curr + 1 : curr)
  }

  const TableRow = (props) => {
    const { _id, firstName, lastName, address, phoneNumber, email, key } = props;

    return (
      <tr key={key}>
        <td>
          <span className="fw-normal">
            {_id}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {firstName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {lastName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {address}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {phoneNumber}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {email}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate(`/vitals/${_id}`)}>
                <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Vitals
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate(`/symptoms/${_id}`)}>
                <FontAwesomeIcon icon={faFileAlt} className="me-2" /> COVID-19 Symptoms
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">First Name</th>
              <th className="border-bottom">Last Name</th>
              <th className="border-bottom">Address</th>
              <th className="border-bottom">Phone Number</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(t => <TableRow key={`patient-${t._id}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev onClick={onPreviousClick}>
                Previous
              </Pagination.Prev>
              { Array.from(Array(numberOfPages), (_, i) => {
                return (
                  <Pagination.Item active={i === currentPage} onClick={() => setCurrentPage(i)}>
                    {i + 1}
                  </Pagination.Item>
                )
              }) }
              <Pagination.Next onClick={onNextClick}>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{entriesPerPage}</b> out of <b>{totalPatients}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default PatientsTable;