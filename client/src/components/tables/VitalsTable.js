
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
import PredictHealth from "../modals/PredictHealth";

import { DELETE_VITALS } from '../../graphql/vitals';
import { useMutation } from '@apollo/client';

import { useNavigate } from 'react-router';
import EditVitalsReport from "../modals/EditVitalsReport";

const VitalsTable = ({ vitals }) => {
  const totalVitals = vitals.length;

  const navigate = useNavigate();

  const [deleteVitals] = useMutation(DELETE_VITALS);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [entriesPerPage] = React.useState(10);

  const numberOfPages = React.useMemo(() => {
    return Math.ceil(vitals.length / entriesPerPage)
  }, [vitals, entriesPerPage]);

  const paginatedData = React.useMemo(() => {
    return vitals.slice(entriesPerPage * currentPage, entriesPerPage * (currentPage + 1));
  }, [vitals, entriesPerPage, currentPage]);

  const onPreviousClick = () => {
    setCurrentPage((curr) => curr > 0 ? curr - 1 : curr)
  }

  const onNextClick = () => {
    setCurrentPage((curr) => curr + 1 < numberOfPages ? curr + 1 : curr)
  }

  const TableRow = (props) => {
    const {
      _id,
      heart_rate,
      systolic_pressure,
      diastolic_pressure,
      body_temperature,
      respiratory_rate,
      weight,
      key
    } = props;

    return (
      <tr key={key}>
        <td>
          <span className="fw-normal">
            {_id}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {heart_rate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {systolic_pressure}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {diastolic_pressure}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {body_temperature}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {respiratory_rate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {weight}
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
              <PredictHealth
                heart_rate={heart_rate}
                systolic_pressure={systolic_pressure}
                diastolic_pressure={diastolic_pressure}
                body_temperature={body_temperature}
                respiratory_rate={respiratory_rate}
                weight={weight}
              />
              <EditVitalsReport
                data={{
                  _id,
                  heart_rate,
                  systolic_pressure,
                  diastolic_pressure,
                  body_temperature,
                  respiratory_rate,
                  weight
                }}
              />
              <Dropdown.Item className="text-danger"
                onClick={() => {
                  deleteVitals({
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
              <th className="border-bottom">Heart Rate</th>
              <th className="border-bottom">Systolic Pressure</th>
              <th className="border-bottom">Diastolic Pressure</th>
              <th className="border-bottom">Body Temperature</th>
              <th className="border-bottom">Respiratory Rate</th>
              <th className="border-bottom">Weight</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(t => <TableRow key={`vital-${t._id}`} {...t} />)}
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
            Showing <b>{entriesPerPage}</b> out of <b>{totalVitals}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default VitalsTable;