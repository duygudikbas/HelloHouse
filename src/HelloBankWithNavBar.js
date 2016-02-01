var React = require('react');
var Link = require('react-router').Link

var NavBar = React.createClass({ 
  render: function() {
    return (
    <nav className="navbar navbar-inverse" role="navigation" id="navigation">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="index.html">Home</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                  <li className="active"><Link to="/Advice">Get Advice</Link></li>
                  <li><Link to="/Buy">Buy Property</Link></li>
                  <li><Link to="/Compare">Compare Loan / Price</Link></li>&nbsp;&nbsp;&nbsp; 
                </ul>
            </div>
        </div>
    </nav>
    );
  }
});

var HelloBankWithNavBar = React.createClass({
  render: function(){
    return(
      <div className="container">   
        <NavBar />
         
           { this.props.children }
        </div> 
    );
  }
});

module.exports = HelloBankWithNavBar;