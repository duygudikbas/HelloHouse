var React = require('react');
var $ = require('jquery');

var CompleteInformation = React.createClass({
  render : function(){
    return (
      <div className = "successFeedback">
        Your appointment is successfully done!
      </div>
    );
  }
});

var AppointmentCompleted = React.createClass({
getInitialState: function() {
     return ({showInfoDiv:false});
  },     
  HandleOnAppointmentComplete: function(){
    console.log("HandleOnAppointmentComplete");
     this.setState({showInfoDiv: true});
     $('#completeBtn').hide();
     console.log(this.state.showInfoDiv);
  },
  render: function(){
    return(  
         <form className="form appointmentComplete">
            {this.state.showInfoDiv ? <CompleteInformation /> : null}  
            <div className="form-group">
                <div className="form-group">
                <p>Your appointment will take place on <em>{this.props.when}</em> 
                  &nbsp;at <em>Rue Royal 45, {this.props.where}</em></p>
                  <button type="button" id="completeBtn" className="btn btn_default pull-right" onClick={this.HandleOnAppointmentComplete}>Complete</button>
                </div>
            </div>
          </form>
    );
  }
});

module.exports = AppointmentCompleted;