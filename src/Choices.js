var React = require('react');
var Link = require('react-router').Link;
var Choices = React.createClass({
  render: function(){
    return(


          <div className="jumbotron jumbotron_main"> 
           <div className="text-center">
              <div>
                  <h2>You Dream !</h2>
                   <h2>We will make it true !</h2>
                   <p id="signature">By BNP PARIBAS FORTIS</p>    
              </div>
              <div className="list-group list-group-horizontal">
                <Link to="Search" className="list-group-item active" onClick={this.handleHidePage}>Search Property</Link>
                <Link to="Advice"  className="list-group-item" onClick={this.handleHidePage}>Get Advice</Link>
                <Link to="Compare" className="list-group-item" onClick={this.handleHidePage}>Investement</Link>
                <Link to="Favorites" className="list-group-item" onClick={this.handleHidePage}>Favorites</Link>
              </div>
            </div>
          </div> 
  
    );
  }
});
module.exports = Choices;
