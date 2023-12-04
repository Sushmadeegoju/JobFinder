import React, { Component } from "react";
import { Icon, Menu, Table, Button } from "semantic-ui-react";

const handleLike = async (id, onLikesUpdated) => {
  try {
    const response = await fetch(`http://localhost:4000/addLikes/${id}`, {
      method: "POST"
    })
    if(response.ok) {
      console.log("Added likes!", response.json());
      if (onLikesUpdated) {
        onLikesUpdated();
      }
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

class JobTable extends Component {
  render() {
    const { rows } = this.props;
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            {this.props.header.map((x) => (
              <Table.HeaderCell key={x}>{x}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((job, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <a href={job.Link}>
                  {job.title}
                </a>
              </Table.Cell>
              <Table.Cell>{job.company}</Table.Cell>
              <Table.Cell>{job.location}</Table.Cell>
              <Table.Cell>{job.seniority}</Table.Cell>
              <Table.Cell>{job.description}</Table.Cell>
              <Table.Cell>{job.postedDate}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button
                    onClick={() => this.props.onSetLabel(job, 1)}
                    icon
                    size="mini"
                    color="green"
                  >
                    <Icon name="thumbs up" onClick={() => handleLike(job._id)}/>
                  </Button>
                  
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        {/* <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="34">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                {Array.from({ length: this.props.numPages }, (x, i) => (
                  <Menu.Item
                    active={this.props.page === i}
                    key={i}
                    onClick={() => this.props.onPageClick(i)}
                    as="a"
                  >
                    {i + 1}
                  </Menu.Item>
                ))}
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer> */}
      </Table>
    );
  }
}

export default JobTable;

