import React, { Component } from "react";
import Proposals from './components/Proposals';
import Deposits from './components/Deposits';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import "./black-dashboard/assets/css/black-dashboard-react.css";
import "./black-dashboard/assets/css/nucleo-icons.css";
import { getProposals } from "./utils/GraphHelper";
import { Container, Row, Col } from "reactstrap";
import "./App.css";


class App extends Component {

  state = { proposals: [], deposits: [] };

  componentDidMount = async () => {
    try {
      // Loads all proposals using the subgraph
      var proposals = await getProposals();
      this.setState({ proposals: proposals });
    } catch (error) {
      alert(
        'Error loading The Graph',
      );
      console.error(error);
    }
  };

  render() {

    return (
      <div className="App">
        <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                TEST
              </Col>
            </Row>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <div className="card">
                  <div className="card-header">
                    <div className="title proposal">Should Ethereum implement EIR-1057 ProgPow?</div>
                  </div>
                  <div className="card-body">
                    <div className="github-detail">See GitHub for full details:</div>
                    <div className='buttons'>
                      <button class="btn btn-primary btn-simple vote-yes">Yes</button>
                      <button class="btn btn-primary btn-simple vote-no">No</button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <div className="card">
                  <div className="card-header">
                    <div className="title">Results</div>
                  </div>
                  <div className="card-body">
                    { this.props.address }
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <div className="card">
                  <div className="card-header">
                    <div className="title">Details</div>
                  </div>
                  <div className="card-body">
                    { this.props.address }
                  </div>
                </div>
              </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default App;
