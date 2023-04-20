
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { DELETE_EMERGENCY } from "../../graphql/emergency";
import { useMutation } from "@apollo/client";

import { useNavigate } from "react-router-dom";
import EditEmergencyAlert from "../modals/EditEmergencyAlert";


const EmergenciesTable = ({ emergencies }) => {
  const totalEmergencies = emergencies.length;

  const navigate = useNavigate();

  const [deleteEmergency] = useMutation(DELETE_EMERGENCY);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [entriesPerPage] = React.useState(10);

  const numberOfPages = React.useMemo(() => {
    return Math.ceil(emergencies.length / entriesPerPage)
  }, [emergencies, entriesPerPage]);

  const paginatedData = React.useMemo(() => {
    return emergencies.slice(entriesPerPage * currentPage, entriesPerPage * (currentPage + 1));
  }, [emergencies, entriesPerPage, currentPage]);

  const onPreviousClick = () => {
    setCurrentPage((curr) => curr > 0 ? curr - 1 : curr)
  }

  const onNextClick = () => {
    setCurrentPage((curr) => curr + 1 < numberOfPages ? curr + 1 : curr)
  }

  const TableRow = (props) => {
    const { _id, timestamp, patient, concern, key } = props;

    return (
      <tr key={key}>
        <td>
          <span className="fw-normal">
            {timestamp}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {patient.firstName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {patient.lastName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {concern}
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
              <EditEmergencyAlert
                data={{
                  _id,
                  timestamp,
                  patient,
                  concern
                }}
              />
              <Dropdown.Item className="text-danger"
                onClick={() => {
                  deleteEmergency({
                    variables: {
                      id: _id
                    }
                  });

                  navigate(0);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
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
              <th className="border-bottom">Timestamp</th>
              <th className="border-bottom">First Name</th>
              <th className="border-bottom">Last Name</th>
              <th className="border-bottom">Concern</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(t => <TableRow key={`emergency-${t._id}`} {...t} />)}
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
            Showing <b>{entriesPerPage}</b> out of <b>{totalEmergencies}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default EmergenciesTable;