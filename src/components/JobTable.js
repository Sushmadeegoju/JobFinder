import React from "react";
import { Icon, Table, Button } from "semantic-ui-react";

const handleLike = async (id, onLikesUpdated) => {
  try {
    const response = await fetch(`http://localhost:4000/addLikes/${id}`, {
      method: "POST"
    });
    if (response.ok) {
      console.log("Added likes!", await response.json());
      onLikesUpdated();
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

const JobTable = ({ header, rows, onSetLabel, userId }) => {

  const handleDelete = async (id, onLikesUpdated) => {
    try {
      const response = await fetch(`http://localhost:4000/deleteJobPosting/${id}/${userId}`, {
        method: "DELETE"
      });
      if(response.ok) {
        console.log("Deleted Job! ", await response.json());
        onLikesUpdated();
      }
      else {
        const errorText = await response.json();
        alert(`${errorText["error"]} since you have not posted this job` );
      }
    } catch(error) {
      console.log("Error: ", error);
    }
  };

  const handleUpdate = async (id, onLikesUpdated) => {
    try {
      const response = await fetch(`http://localhost:4000/updateJobPosting/${id}/${userId}`, {
        method: "DELETE"
      });
      if(response.ok) {
        console.log("Deleted Job! ", await response.json());
        // onLikesUpdated();
      }
      else {
        const errorText = await response.json();
        alert(`${errorText["error"]} since you have not posted this job` );
      }
    } catch(error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {header.map((x) => (
            <Table.HeaderCell key={x}>{x}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map((job, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <a href={job.Link}>{job.title}</a>
            </Table.Cell>
            <Table.Cell>{job.company}</Table.Cell>
            <Table.Cell>{job.location}</Table.Cell>
            <Table.Cell>{job.seniority}</Table.Cell>
            <Table.Cell>{job.description}</Table.Cell>
            <Table.Cell>{job.postedDate}</Table.Cell>
            <Table.Cell>
              <Button.Group>
                <Button
                  onClick={() => onSetLabel(job, 1)}
                  icon
                  size="mini"
                  color="green"
                >
                  <Icon name="thumbs up" onClick={() => handleLike(job._id)} />
                </Button>
              </Button.Group>
            </Table.Cell>
            {/* <Table.Cell>
              <Icon name="pencil" color="blue" />
            </Table.Cell> */}
            <Table.Cell>
              {/* Delete icon with a trash bin */}
              <Icon name="trash alternate" color="red" onClick={() => handleDelete(job._id)}/>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default JobTable;


