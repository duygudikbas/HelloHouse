var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var AppointmentWhen = React.createClass({
    componentDidMount: function() {

    },
  render: function(){
    return(  
         <form className="form">
            <div className="form-group">
                <div className="form-group">
                  <label htmlFor="usr">WHEN:</label>
                  < input type = 'text'
                          ref = 'autocomplete'  placeholder="Enter location"/ >
                </div>
               <div className="list-group list-group-horizontal">
                <Link to="Appointment/AppointmentCompleted" className="list-group-item active pull-right" >Next</Link>
              </div>
            </div>
          </form>
    );
  }
});

module.exports = AppointmentWhen;