import React, { Component } from 'react';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { Row, Col } from "reactstrap";
var QRCode = require('qrcode.react');

class Proposal extends Component {

  state = { deposits: [], uniqueAddresses: [], graphLoaded: false };


  componentDidMount = async () => {
      await this.processVotes();
  };

  async GetProposalGraphData(ProposalName){
    console.log('GetProposalGraphData(): ' + ProposalName)
    // https://thegraph.com/docs/graphql-api
    // Gets all deposits for this proposal
    const query = `{ anonymousDeposits (where: {PropName: "` + ProposalName + `"}) {
        id
        SenderAddr
        ContriValue
        PropName
        Choice
      }
    }`;

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

    return result;
  }

  async CalculateVotesBasic(proposalData){
    var anonymousDeposits = proposalData.data.anonymousDeposits;

    var yes = 0;
    var no = 0;
    var noDeposits = anonymousDeposits.length;
    var unique = [];
    var values = {};
    var totalValue = 0;

    for(var i = 0;i < noDeposits;i++){

      if(unique.indexOf(anonymousDeposits[i].SenderAddr) === -1){
        unique.push(anonymousDeposits[i].SenderAddr);
        values[anonymousDeposits[i].SenderAddr] = parseFloat(anonymousDeposits[i].ContriValue);
      }else{
        values[anonymousDeposits[i].SenderAddr] += parseFloat(anonymousDeposits[i].ContriValue);
      }

      if(anonymousDeposits[i].Choice === 'yes'){
        yes++;
      } else {
        no++;
      }

      totalValue += parseFloat(anonymousDeposits[i].ContriValue);
    }
    console.log(this.props.proposal.name)
    console.log('Total: ' + noDeposits);
    console.log('Yes: ' + yes);
    console.log('No: ' + no);
    console.log('No Unique Addresses: ' + unique.length)
    console.log(unique)
    console.log('Total Value: ' + totalValue)
    console.log(values)

    this.setState({
      graphLoaded: true,
      deposits: anonymousDeposits,
      yesCount: yes,
      noCount: no,
      uniqueAddresses: unique
    });
  }

  async GetAddressVotes(proposalData){
    var anonymousDeposits = proposalData.data.anonymousDeposits;
    var noDeposits = anonymousDeposits.length;
    var voters = {};
    var totalValue = 0;

    // Check all the deposits for proposal
    for(var i = 0;i < noDeposits;i++){

      var yesValue = 0, noValue = 0;

      if(anonymousDeposits[i].Choice === 'yes'){
        yesValue = parseFloat(anonymousDeposits[i].ContriValue);
      } else {
        noValue = parseFloat(anonymousDeposits[i].ContriValue);
      }

      // Check if address has already been counted & initialise if not
      if(voters[anonymousDeposits[i].SenderAddr] === undefined){
        voters[anonymousDeposits[i].SenderAddr] = { yesTotalValue: yesValue, noTotalValue: noValue };
      }else{
        var newYesValue = voters[anonymousDeposits[i].SenderAddr].yesTotalValue + yesValue;
        var newNoValue = voters[anonymousDeposits[i].SenderAddr].noTotalValue + noValue;
        voters[anonymousDeposits[i].SenderAddr] = { yesTotalValue: newYesValue, noTotalValue: newNoValue };
      }

      totalValue += parseFloat(anonymousDeposits[i].ContriValue);
    }
    console.log(this.props.proposal.name)
    console.log('No Deposits: ' + noDeposits);
    console.log('Total Value: ' + totalValue)
    console.log('Voters:')
    console.log(voters)

    this.setState({
      totalValue: totalValue,
      voters: voters
    });

    return voters;
  }

  async GetQuadraticTotals(voters){

    var yes = 0;
    var no = 0;
    var noUniqueAdresses = 0;
    var totalValue = 0;
    for(var key in voters){
      // skip loop if the property is from prototype
      if (!voters.hasOwnProperty(key)) continue;

      var voter = voters[key];
      yes += Math.sqrt(voter.yesTotalValue);
      no += Math.sqrt(voter.noTotalValue);
      noUniqueAdresses += 1;
      totalValue = totalValue + voter.yesTotalValue + voter.noTotalValue;
    }

    this.setState({
      graphLoaded: true,
      yesCount: yes,
      noCount: no,
      noUniqueAdresses: noUniqueAdresses,
      totalValue: totalValue
    });
  }

  async processVotes(){

    var proposalData = await this.GetProposalGraphData(this.props.proposal.name);

    if(!proposalData.data){
      console.log('MMMhhhh this is weird...')
      return;
    }

    var voters = await this.GetAddressVotes(proposalData);

    await this.GetQuadraticTotals(voters);

    console.log('graph() OUT')
  }

  render() {

    let chart;
    if(this.state.graphLoaded){
      chart =  <ReactMinimalPieChart
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

    }

    var noUniqueAdresses = this.state.noUniqueAdresses;

    var quickStyle = {
      textAlign: 'center'
    };

    return(
      <div>

        <Row>
          <Col className="col-sm">
            <h3 style={quickStyle}>Yes</h3>
            <p>Yes Votes: {this.state.yesCount}</p>
            <p>To vote YES to this proposal send any amount of ETH to:</p>
            <div>
              <div style={{textAlign: 'center', backgroundColor: 'white'}}>
                <QRCode value={this.props.proposal.optionAaddr} style={{paddingTop: '10px'}}/>
              </div>
            </div>
            <p>{this.props.proposal.optionAaddr}</p>
          </Col>
          <Col className="col-sm">
            <h2 style={quickStyle}>{this.props.proposal.name}</h2>
            <p>Total Value Burned (wei): {this.state.totalValue}</p>
            <p>Unique Voters: {noUniqueAdresses}</p>
            { chart }
          </Col>
          <Col className="col-sm">
            <h3 style={quickStyle}>No</h3>
            <p>No Votes: {this.state.noCount}</p>
            <p>To vote NO to this proposal send any amount of ETH to:</p>
            <div>
              <div style={{textAlign: 'center', backgroundColor: 'white'}}>
                <QRCode value={this.props.proposal.optionBaddr} style={{paddingTop: '10px'}}/>
              </div>
            </div>
            <p>{this.props.proposal.optionBaddr}</p>
          </Col>
        </Row>
        <hr/>
      </div>
    )

  }
}

export default Proposal
