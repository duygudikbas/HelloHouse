var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var AppointmentWhere = React.createClass({
  handleUserAppointmentWhere: function() {
    this.props.appointmentDetailInputWhere(this.refs.autocomplete.value);
  },
   componentDidMount: function() {
      var url = "http://localhost:3000/cities";

      $.get(url, function(data) {
          console.log(data);
          var doubles = data.map(function(num) {
              return num.zip + "-" + num.name;
          });
          $(this.refs.autocomplete).autocomplete({


              source: doubles
          });
      }.bind(this), 'json');

      console.log(this.refs.autocomplete);
  },
  render: function(){
    return(  
         <form className="form">
            <div className="form-group">
                <div className="form-group">
        
                  < input id="appLocAutoComplete" type = 'text' ref = 'autocomplete'  placeholder="Enter location"/>
                  <Link to="Appointment/AppointmentWhen" className="btn btn_default pull-right" onClick={this.handleUserAppointmentWhere}>Next</Link>
                </div>

            </div>
          </form>
    );
  }
});

module.exports = AppointmentWhere;