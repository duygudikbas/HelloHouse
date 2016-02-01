var React = require('react');
var $ = require('jquery');
require('jquery-ui');
var BasicSearch = React.createClass({

    render: function() {

        return ( < div >
            < input type = 'text'
            ref = 'autocomplete' / >
            < /div>
        );
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

});

module.exports = BasicSearch;
