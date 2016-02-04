var React = require('react');
var Link = require('react-router').Link;
var Choices = React.createClass({
  render: function(){
    return(


          <div className="jumbotron jumbotron_main"> 
           <div className="text-center">
              <div>
                  <h2><b>You Dream !</b></h2>
                   <h2>We will make it true !</h2>
                   <p id="signature">By BNP PARIBAS FORTIS</p>    
              </div>
              <div className="list-group list-group-horizontal">
               <Link to="Search"  onClick={this.handleHidePage}><div className="timer_box"><h1>Search</h1><p>Property</p></div></Link>
                <Link to="Advice"  onClick={this.handleHidePage}><div className="timer_box"><h1>Ask</h1><p>Advice</p></div></Link>
              <Link to="Compare"   onClick={this.handleHidePage}><div className="timer_box"><h1>Best</h1><p>Invest</p></div></Link>
                <Link to="Favorites"  onClick={this.handleHidePage}><div className="timer_box"><h1>Get</h1><p>Favorites</p></div></Link>
                 </div>
            </div>
          </div> 
  
    );
  }
});
module.exports = Choices;
