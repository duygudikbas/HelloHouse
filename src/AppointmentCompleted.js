var React = require('react');
var $ = require('jquery');

var AppointmentCompleted = React.createClass({
    componentDidMount: function() {

    },
  render: function(){
    return(  
         <form className="form">
            <div className="form-group">
                <div className="form-group">
                  <label htmlFor="usr">COMPLETED:</label>
                  < input type = 'text'
                          ref = 'autocomplete'  placeholder="Enter location"/ >
                </div>
               <button type="button" className="btn btn-primary pull-right">Next</button>
            </div>
          </form>
    );
  }
});

module.exports = AppointmentCompleted;