var React = require('react');
var $ = require('jquery');
require('jquery-ui');
var Link = require('react-router').Link;
var BasicSearch = React.createClass({
    handle: function() {
        console.log("wake up!!")
        this.setState({
            open: !this.state.open
        });
    },
    getInitialState: function() {
        return {
            open: false
        };
    },


    render: function() {
        var advancedSearch;
        if (this.state.open) {
            advancedSearch = < div >
                < div className = "form-group" >
                < div className = "form-group row" >
                < label htmlFor = "usr"  className="col-xs-4"> Room: < /label> < input type = "number"
            id = "email"
            placeholder = "min"  className="col-xs-3"/ >

                < label htmlFor = "usr"  className="col-xs-2"> To: < /label> < input type = "number"
            id = "email" className="col-xs-3"
            placeholder = "max" / >
                < /div> < /div> < div className = "form-group row" >
                < label htmlFor = "usr" className="col-xs-4" > Surface: < /label> < input type = "number"
            id = "email" className="col-xs-3"
            placeholder = "min" / >

                < label htmlFor = "usr" className="col-xs-2"> To: < /label> < input type = "number"
            id = "email"
            placeholder = "max"  className="col-xs-3"/ >
                < /div> < div className = "form-group row" >
                < input className="col-xs-1" type = "checkbox"
            name = "garden"
            value = "garden" / >
                < label className="col-xs-3" > Garden < /label> < input type = "checkbox"
            name = "garage"
            value = "garage" className="col-xs-1" / >
                < label className="col-xs-3" > Garage < /label> < input type = "checkbox"
            name = "pool"
            value = "pool"  className="col-xs-1"/ >
                < label  className="col-xs-3"> pool  < /label> < /div></div > ;
        } else {
            advancedSearch = "";
        }
        return ( 
<div className="masterSearch">

          < div className = "search" >
        
            < div className = "row form-group topSearch" >
              < label htmlFor = "usr" className="col-xs-4"  > Type: < /label> 
              < input type = "checkbox" name = "Appartment" value = "Appartment"  className="col-xs-1 appartment"/ >
              < label   className="col-xs-4" > Appartment < /label> 
              < input type = "checkbox"   name = "House" value = "House"  className="col-xs-1" / >
              < label  className="col-xs-1 marginright" > House < /label> 

            < /div> 
            < div className = "row form-group" >
              < label htmlFor = "usr" className="col-xs-4"  > Location: < /label> 
              < input type = 'text' ref = 'autocomplete' placeholder = "Enter location" className="col-xs-8"  / >
            < /div>

            < div className = " row form-group" >
            < label htmlFor = "usr" className="col-xs-4"  > Price: < /label> < input type = "number"
            id = "minPrice"
            placeholder = "min" className="col-xs-3" / >

            < label htmlFor = "usr" className="col-xs-2"> To: < /label> < input type = "number"
            id = "max" className="col-xs-3"
            placeholder =  "max" / >
            < /div> < div className = "form-group" >
            < button onClick = {
                this.handle
            } > Advanced Search < /button> {
                advancedSearch
            } 
            < Link to = "/ResultList" > Search < /Link> < /div> < /div>
            </div>
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
