var React = require('react');
var $ = require('jquery');
require('jquery-ui');
var BasicSearch = React.createClass({
handle:function(){
    console.log("wake up!!")
     this.setState({
      open: !this.state.open
   });
},
  getInitialState: function() {
    return {
      open:false
      };
    },


    render: function() {
        var advancedSearch;
        if(this.state.open) {
          advancedSearch = <div>
 <div className="form-group"> 
<div className="form-group">
    <label htmlFor="usr">Room:</label>
    <input type="number"  id="email"  placeholder="minRoom"/>
  
    <label htmlFor="usr">de:</label>
    <input type="number" id="email" placeholder="maxRoom" />
  </div>
  </div>
  <div className="form-group">
    <label htmlFor="usr">Surface:</label>
    <input type="number"  id="email"  placeholder="minSurface"/>
  
    <label htmlFor="usr">de:</label>
    <input type="number" id="email" placeholder="maxSurface" />
  </div>
          <div className="form-group"> 
  <input type="checkbox" name="garden" value="garden" />
  <label>Garden</label>
  <input type="checkbox" name="garage" value="garage"/>
    <label>Garage</label>
      <input type="checkbox" name="piscine" value="piscine"/>
    <label>Piscine</label>
  </div></div>;
        } else {
            advancedSearch = "";
        }
        return ( 
          < div className="search">
           <div className="form-group">
             <label htmlFor="usr">Type:</label>
  <input type="checkbox" name="Appartment" value="Appartment" />
  <label>Appartment</label>
  <input type="checkbox" name="House" value="House"/>
    <label>House</label>
  </div>
            <div className="form-group">
    <label htmlFor="usr">Location:</label>
    < input type = 'text'
            ref = 'autocomplete'  placeholder="Enter location"/ >
  </div>
            
            <div className="form-group">
    <label htmlFor="usr">Price:</label>
    <input type="number"  id="minPrice"  placeholder="minPrice"/>
  
    <label htmlFor="usr">de:</label>
    <input type="number" id="maxPrice" placeholder="maxPrice" />
  </div>
  <div className="form-group">
  <button onClick={this.handle}>Advanced Search</button>
    {advancedSearch}
</div>
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
