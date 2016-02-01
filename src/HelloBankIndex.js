var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var HelloBankApp = require('./HelloBankApp.js');
var Choices = require('./Choices.js');
var Advice = require('./Advice.js');
var Buy = require('./Buy.js');
var Compare = require('./Compare.js');
var ResultList = require('./ResultList.js');

// var HelloBankWithNavBar = require('./HelloBankWithNavBar.js');
          
ReactDOM.render(
    <Router>
    <Route path="/" component={ResultList}>
    <IndexRoute component={ResultList} />
     <Route path="Advice" component={Advice} />
     <Route path="Buy" component={Buy} />
     <Route path="Compare" component={Compare} />
  
    </Route>
  </Router>,
  document.getElementById('root')
);

// ReactDOM.render(
//     <ResultList/>,
//   document.getElementById('root')
// );

