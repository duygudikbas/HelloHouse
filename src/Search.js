var React = require('react');

var BasicSearch= React.createClass({
  render : function(){
    return (
      <div>
     <h1>basicSearch</h1>
     <div class="form-group">
    <label for="usr">email:</label>
    <input type="email" class="form-control" id="email"/>
  </div>
  </div>
    );
  }
});

module.exports = BasicSearch;