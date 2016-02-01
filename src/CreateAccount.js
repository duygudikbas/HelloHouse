var React = require('react');
var $ = require('jquery');

var CreateAccount = React.createClass({
  getInitialState: function() {
    return {account:{}};
  },
  handleCreateAccount: function(event){
    event.preventDefault();
    console.log("handleCreateAccount");
    var account =  {number: "ZZZZ",name: "AAAAA",type: "OOOO",balance: "9999"};
    // this.setState({accounts: accounts});
    // if (this.isMounted()) {   
    //     console.log("if");   
    // console.log(this.state.accounts);   
     var that = this;
    $.post({
        url: "http://localhost:3000/accounts",
          dataType: 'json',
         contentType: "application/json",
         data:  JSON.stringify(account),
         success: function(data) {
           if (that.isMounted()) {  
            that.setState({account: data});
            that.props.accounts.push(data);
           }
           console.log("data");
           console.log(data);
         },
         error: function(data) {
            console.log("data error");
            console.log(data);
        }
      });
   // }
  },
  componentDidUpdate: function(){
  //   console.log("Posting:");
  //   console.log(this.state.accounts);
  //   var that = this;
  // $.post({
  //     url: "http://localhost:3000/accounts",
  //       dataType: 'json',
  //      contentType: "application/json",
  //      data:  JSON.stringify(this.state.accounts),
  //      success: function(data) {
  //       console.log("data");
  //       console.log(data);
  //      },
  //      error: function(data) {
  //         console.log("data error");
  //         console.log(data);
  //     }
  //   });
  },
  render: function(){
    console.log(this.state.accounts);
    return(
     <div className="container">
      <form role="form" onSubmit={this.handleCreateAccount}>
          <div className="panel panel-info">
            <div className="panel-heading">CREATE ACCOUNT</div>
              <div className="panel-body">
                    <div className="form-group">
                      <select className="selectpicker" ref="select">
                        <option >savings</option>
                        <option >other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" id="accountName" placeholder="ACCOUNT NAME" ref="accountName"/>
                         <input type="number" className="form-control" id="accountNumber" placeholder="ACCOUNT NUMBER"  ref="accountNumber"/>
                         <input type="number" className="form-control" id="balance" placeholder="BALANCE"  ref="accountNumber"/>
                         <div className="col-md-12 text-center"> 
                          <button type="submit" className="btn btn-primary">Create Account</button>
                        </div>
                    </div>
                </div>
            </div>
          </form>
       </div>
    );
  }

});

module.exports = CreateAccount;