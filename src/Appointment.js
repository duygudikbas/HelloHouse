var React = require('react');
var $ = require('jquery');

var Appointment = React.createClass({
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
      <div className="container appointment">        
           <h1>Do you need to make an appointment ?</h1>
        <div className="panel panel-default">
          <div className="panel-heading">Appointment</div>
          <div className="panel-body">
            {this.props.children}
          </div>
        </div>
         </div>
    );
  }
});

module.exports = Appointment;