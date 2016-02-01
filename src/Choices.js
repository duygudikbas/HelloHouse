var React = require('react');

var Choices = React.createClass({
  render: function(){
    return(
       <div className="container">        
        <div className="jumbotron jumbotron_main">
          <div className="text-center">
              <div>
                  <h2>You Dream ! We will make it true !</h2>
                  <div className="signature">By BNP PARIBAS FORTIS</div>
              </div>
            </div>
          </div> 
        </div>
    );
  }
});
module.exports = Choices;
