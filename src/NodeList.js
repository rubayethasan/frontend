import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class NodeList extends Component {

    constructor(props) {
        super(props);
        this.state = {apiNodes: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/nodes')
            .then(response => response.json())
            .then(data => this.setState({apiNodes: data}));
    }

    async remove(id) {
        await fetch(`/nodes/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedApiNodes = [...this.state.apiNodes].filter(i => i.id !== id);
            this.setState({apiNodes: updatedApiNodes});
        });
    }

    render() {
        const {apiNodes, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const apiNodeList = apiNodes.map(apiNode => {
            return <tr key={apiNode.id}>
                <td style={{whiteSpace: 'nowrap'}}>{apiNode.name}</td>
                <td>{apiNode.type}</td>
                <td>{apiNode.overview}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/nodes/" + apiNode.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(apiNode.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/nodes/new">Add Node</Button>
                    </div>
                    <h3>Nodes</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Type</th>
                            <th width="40%">Overview</th>
                            <th width="20%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {apiNodeList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default NodeList;