import React, { Component } from "react";
import { Icon, Menu, Table, Button } from "semantic-ui-react";

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
              {/* <Table.Cell>
                <Button circular icon size="mini" color="grey">
                  <Icon name="question" />
                </Button>
              </Table.Cell> */}
              <Table.Cell>
                <a href={job.Link}/>
                  {job.title}
              
              </Table.Cell>
              <Table.Cell>{job.company}</Table.Cell>
              <Table.Cell>{job.location}</Table.Cell>
              <Table.Cell>{job.seniority}</Table.Cell>
              <Table.Cell>{job.description}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button
                    onClick={() => this.props.onSetLabel(job, 1)}
                    icon
                    size="mini"
                    color="green"
                  >
                    <Icon name="thumbs up" />
                  </Button>
                  <Button
                    onClick={() => this.props.onSetLabel(job, 0)}
                    icon
                    size="mini"
                    color="red"
                  >
                    <Icon name="thumbs down" />
                  </Button>
                </Button.Group>
              </Table.Cell>
              <Table.Cell>{job.postedDate}</Table.Cell>
              {/* <Table.Cell>
                <b>{job.Score}</b>
              </Table.Cell> */}
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
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
        </Table.Footer>
      </Table>
    );
  }
}

export default JobTable;

