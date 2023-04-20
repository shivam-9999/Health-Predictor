
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

import { DELETE_SYMPTOMS } from '../../graphql/symptoms';
import { useMutation } from '@apollo/client';

import { useNavigate } from 'react-router';
import EditSymptomsRecord from "../modals/EditSymptomsRecord";

const SymptomsTable = ({ symptoms }) => {
  const totalSymptoms = symptoms.length;

  const navigate = useNavigate();

  const [deleteSymptoms] = useMutation(DELETE_SYMPTOMS);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [entriesPerPage] = React.useState(10);

  const numberOfPages = React.useMemo(() => {
    return Math.ceil(symptoms.length / entriesPerPage)
  }, [symptoms, entriesPerPage]);

  const paginatedData = React.useMemo(() => {
    return symptoms.slice(entriesPerPage * currentPage, entriesPerPage * (currentPage + 1));
  }, [symptoms, entriesPerPage, currentPage]);

  const onPreviousClick = () => {
    setCurrentPage((curr) => curr > 0 ? curr - 1 : curr)
  }

  const onNextClick = () => {
    setCurrentPage((curr) => curr + 1 < numberOfPages ? curr + 1 : curr)
  }

  const TableRow = (props) => {
    const { _id, timestamp, fever, cough, breathing_difficulty, headache, sore_throat, key } = props;

    return (
      <tr key={key}>
        <td>
          <span className="fw-normal">
            {_id}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {timestamp}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {fever ? 'Yes' : 'No'}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {cough ? 'Yes' : 'No'}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {breathing_difficulty ? 'Yes' : 'No'}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {headache ? 'Yes' : 'No'}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {sore_throat ? 'Yes' : 'No'}
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
              <EditSymptomsRecord
                data={{
                  _id,
                  timestamp,
                  fever,
                  cough,
                  breathing_difficulty,
                  headache,
                  sore_throat
                }}
              />
              <Dropdown.Item className="text-danger"
                onClick={() => {
                  deleteSymptoms({
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
              <th className="border-bottom">#</th>
              <th className="border-bottom">Timestamp</th>
              <th className="border-bottom">Fever</th>
              <th className="border-bottom">Cough</th>
              <th className="border-bottom">Breathing Difficulty</th>
              <th className="border-bottom">Headache</th>
              <th className="border-bottom">Sore Throat</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(t => <TableRow key={`symptom-${t._id}`} {...t} />)}
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
            Showing <b>{entriesPerPage}</b> out of <b>{totalSymptoms}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default SymptomsTable;