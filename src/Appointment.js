var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Appointment = React.createClass({
  getInitialState: function() {
    return {appointmentDetail: {where:"", when:""}, stepCount:1};
  }, 
  handleAppointmentStep: function(stepCount) {
    var stepCountState = this.state.stepCount;
    this.setState({ stepCount : stepCountState += stepCount });
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
      <div>
        <Link to="/" className="homeLink" ><i className="fa fa-home"></i>&nbsp; Home</Link>    
        <div className="container appointment">    
   
          <div className="panel panel-default">
            <div className="panel-heading">Appointment</div>
            <div className="panel-body">
              { React.cloneElement(this.props.children, {
                 appointmentDetailInputWhere: this.onInputAppointmentWhere, 
                 appointmentDetailInputWhen:this.onInputAppointmentWhen,
                 when:this.state.appointmentDetail.when,
                 where:this.state.appointmentDetail.where,
                 handleAppointmentStep: this.handleAppointmentStep
              })}
              <p id="stepCount">Step&nbsp;<span>{ this.state.stepCount }</span>/3</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Appointment;