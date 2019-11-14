import React, { Component } from 'react';
import Deposits from './Deposits';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { Row, Col } from "reactstrap";

class Proposal extends Component {

  state = { deposits: [], uniqueAddresses: [] };


  componentDidMount = async () => {
      await this.graph();
  };

  async graph(){

    console.log('graph(): ' + this.props.proposal.name)
    // https://thegraph.com/docs/graphql-api
    // Gets all deposits for this proposal
    const query = `{ anonymousDeposits (where: {PropName: "` + this.props.proposal.name + `"}) {
        id
        SenderAddr
        ContriValue
        PropName
        Choice
      }
    }`;

    const results = {}

    const result = await fetch('https://api.thegraph.com/subgraphs/name/madhur4444/imgovdynamic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      })
    }).then(r => r.json()).then(data => data).catch(error => console.log(error))

    // console.log('Result:');
    // console.log(result);

    if(!result.data)
      return;

    var anonymousDeposits = result.data.anonymousDeposits;

    var yes = 0;
    var no = 0;
    var totalDeposits = anonymousDeposits.length;
    var unique = [];
    var values = {};
    var totalValue = 0;

    for(var i = 0;i < totalDeposits;i++){

      if(unique.indexOf(anonymousDeposits[i].SenderAddr) === -1){
        unique.push(anonymousDeposits[i].SenderAddr);
        values[anonymousDeposits[i].SenderAddr] = parseFloat(anonymousDeposits[i].ContriValue);
      }else{
        values[anonymousDeposits[i].SenderAddr] += parseFloat(anonymousDeposits[i].ContriValue);
      }

      if(anonymousDeposits[i].Choice == 'yes'){
        yes++;
      } else {
        no++;
      }

      totalValue += parseFloat(anonymousDeposits[i].ContriValue);
    }
    console.log(this.props.proposal.name)
    console.log('Total: ' + totalDeposits);
    console.log('Yes: ' + yes);
    console.log('No: ' + no);
    console.log('No Unique Addresses: ' + unique.length)
    console.log(unique)
    console.log('Total Value: ' + totalValue)
    console.log(values)

    this.setState({
      deposits: anonymousDeposits,
      yesCount: yes,
      noCount: no,
      uniqueAddresses: unique
    });

    console.log('graph() OUT')
  }

  render() {
    /*
    newProposalIssueds(first: 5) {
      id
      issuer
      deadline
      name
      data
      optionBaddr
      optionAaddr
    }

    */
    // <Deposits name={this.props.proposal.name} deposits={this.state.deposits} />
    var noUniqueAdresses = this.state.uniqueAddresses.length;

    return(
      <div>
        <h3>{this.props.proposal.name}</h3>
        <Row>
          <Col className="col-sm">
            <p>ID: {this.props.proposal.id}</p>
            <p>Issuer: {this.props.proposal.issuer}</p>
            <p>Deadline: {this.props.proposal.deadline}</p>
            <p>Name: {this.props.proposal.name}</p>
            <p>Data: {this.props.proposal.data}</p>
            <p>optionBaddr: {this.props.proposal.optionBaddr}</p>
            <p>optionAaddr: {this.props.proposal.optionAaddr}</p>
            <br/>
            <p>Yes Votes: {this.state.yesCount}</p>
            <p>No Votes: {this.state.noCount}</p>
            <p>uniqueAddresses: {noUniqueAdresses}</p>
          </Col>
          <Col className="col-sm">
            <ReactMinimalPieChart
              animate={false}
              animationDuration={500}
              animationEasing="ease-out"
              cx={50}
              cy={50}
              data={[
                {
                  color: '#E38627',
                  title: 'Yes',
                  value: this.state.yesCount
                },
                {
                  color: '#C13C37',
                  title: 'Two',
                  value: this.state.noCount
                }
              ]}
              label
              labelPosition={50}
              labelStyle={{
                fill: '#121212',
                fontFamily: 'sans-serif',
                fontSize: '5px'
              }}
              lengthAngle={360}
              lineWidth={100}
              onClick={undefined}
              onMouseOut={undefined}
              onMouseOver={undefined}
              paddingAngle={0}
              radius={50}
              ratio={1}
              rounded={false}
              startAngle={0}
              style={{
                height: '300px'
              }}
            />
          </Col>
        </Row>



        <hr/>

      </div>
    )

  }
}

export default Proposal
