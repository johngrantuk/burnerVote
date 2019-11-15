import React, { Component } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';

class Deposit extends Component {

  /*
  anonymousDeposits(first: 5) {
    id
    SenderAddr
    ContriValue
    PropName
    Choice
  }
  */
  render() {
    return(

      <div className="App">

        <SideBar></SideBar>

        <div className="main-panel">
          <NavBar></NavBar>

            <div className="content">
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="title">Ask a question...</h5>
                    </div>
                    <div className="card-body">
                      <form>

                        <div className="row">
                          <div className="col-md-6 pr-md-1">
                            <div className="form-group">
                              <label>Your Question</label>
                              <input type="text" className="form-control" placeholder="Ask Away" />
                            </div>
                          </div>

                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Deadline</label>
                              <input type="text" className="form-control" placeholder="Block No"  />
                            </div>
                          </div>
                        </div>

                      </form>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-fill btn-primary">Post</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>




        </div>
      </div>

    )

  }
}

export default Deposit
