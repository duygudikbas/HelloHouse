var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var HelloBankApp = require('./HelloBankApp.js');
var Choices = require('./Choices.js');
var Advice = require('./Advice.js');
var Search = require('./Search.js');
var Compare = require('./Compare.js');
var ResultList = require('./ResultList.js');
var PropertyDetail = require('./PropertyDetail.js');
          
ReactDOM.render(
    <Router>
    <Route path="/" component={HelloBankApp}>
     <IndexRoute component={Choices}  />
     <Route path="Search" component={Search} />
     <Route path="Advice" component={Advice} />
     <Route path="Compare" component={Compare} />
     <Route path="ResultList" component={ResultList} />
     <Route path="PropertyDetail" component={PropertyDetail} />
    </Route>
  </Router>,
  document.getElementById('root')
);
