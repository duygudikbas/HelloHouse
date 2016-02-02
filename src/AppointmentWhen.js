var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var AppointmentWhen = React.createClass({
  handleAppointmentWhen:function(){
     this.props.appointmentDetailInputWhen(this.refs.date.value);
  },
  handleDatePicker: function(){
    console.log("handleDatePicker");


    $('#sandbox-container input').on('show', function(e){
        console.debug('show', e.date, $(this).data('stickyDate'));
        
        if ( e.date ) {
             $(this).data('stickyDate', e.date);
        }
        else {
             $(this).data('stickyDate', null);
        }
    });

    $('#sandbox-container input').on('hide', function(e){
        console.debug('hide', e.date, $(this).data('stickyDate'));
        var stickyDate = $(this).data('stickyDate');
        
        if ( !e.date && stickyDate ) {
            console.debug('restore stickyDate', stickyDate);
            $(this).datepicker('setDate', stickyDate);
            $(this).data('stickyDate', null);
        }
    });
  },
  componentDidMount: function() {
    $('#sandbox-container input').datepicker({
      autoclose: true
    });
  },
  render: function(){
    return(  
         <form className="form">
            <div className="form-group">
                <div className="form-group">
                  <div id="sandbox-container">
                      <input type="input" id="datepickerInput" type="text" ref="date" placeholder="Appointment Date" className="form-control" onClick={this.handleDatePicker}/>
                  <Link to="Appointment/AppointmentCompleted" className="btn btn_default" onClick={this.handleAppointmentWhen}>Next</Link>
                  </div>
                </div>
            </div>
          </form>
    );
  }
});

module.exports = AppointmentWhen;