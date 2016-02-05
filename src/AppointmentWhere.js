var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var AppointmentWhere = React.createClass({
  handleUserAppointmentWhere: function() {
    this.props.appointmentDetailInputWhere(this.refs.autocomplete.value);
    this.props.handleAppointmentStep(1);
  },

  componentDidMount: function() {
    $(this.refs.autocomplete).val( this.props.where );
      var url = "https://estates-api-custom.herokuapp.com/cities";

      $.get(url, function(data) {
          var doubles = data.map(function(num) {
              return num.zip + "-" + num.name;
          });
          $(this.refs.autocomplete).autocomplete({


              source: doubles
          });
      }.bind(this), 'json');
  },
  render: function(){
    return(  
         <form className="form">
            <div className="form-group">
                <div className="form-group">
        
                  < input id="appLocAutoComplete" type = 'text' ref = 'autocomplete' placeholder="Choose Branch"/>
                  <Link to="Appointment/AppointmentWhen" className="btn btn_default pull-right" onClick={this.handleUserAppointmentWhere}>Next</Link>
                </div>

            </div>
          </form>
    );
  }
});

module.exports = AppointmentWhere;