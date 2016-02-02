var React = require('react');
var $ = require('jquery');

var Appointment = React.createClass({
  getInitialState: function() {
    return {appointmentDetail: {where:"", when:""}};
  }, 
  onInputAppointmentWhere: function(where) {
    this.setState({appointmentDetail: {where: where}});
  },
  onInputAppointmentWhen: function(when) {
    var appointmentDetail = this.state.appointmentDetail;
    appointmentDetail.when = when;
    this.setState({appointmentDetail: appointmentDetail});
  },
  render: function(){
    console.log("this.state.appointmentDetail");
    console.log(this.state.appointmentDetail);
    return(
      <div className="container appointment">        
        <div className="panel panel-default">
          <div className="panel-heading">Appointment</div>
          <div className="panel-body">
            { React.cloneElement(this.props.children, {
               appointmentDetailInputWhere: this.onInputAppointmentWhere, 
               appointmentDetailInputWhen:this.onInputAppointmentWhen,
               when:this.state.appointmentDetail.when,
               where:this.state.appointmentDetail.where
            })}
          </div>
        </div>
         </div>
    );
  }
});

module.exports = Appointment;