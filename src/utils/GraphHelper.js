

export async function getDeposits() {

};

export async function getProposals() {
  console.log('TheGraph - getProposals()');
  // https://thegraph.com/docs/graphql-api
  // anonymousDeposits (where: {PropName: "qwwafae"}) {
  const query = `{
    newProposalIssueds(where: { name_not_contains: "fae" }) {
      id
      issuer
      deadline
      name
      data
      optionBaddr
      optionAaddr
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
  console.log('TheGraph - got Proposals.');
  return result.data.newProposalIssueds;
};
