require('./theme/stylesheets/main.sass');
import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './javascript/components/Graph';
import GraphWrapper from './javascript/components/GraphWrapper';
import Profile from './javascript/components/Profile';
import {useRouterHistory, Router, Route, IndexRoute} from 'react-router';
import {createHashHistory} from 'history';
const history = useRouterHistory(createHashHistory)({ queryKey: false });

const Root = React.createClass({
    render() {
        return (
            <div id='mainContainer'>
                <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
                    <Route name='GraphWrapper' path='/graph-d3' component={GraphWrapper}>
                        <IndexRoute component={Graph}/>
                    </Route>
                    <Route path="/my-profile" component={Profile}></Route>
                </Router>
            </div>
        );
    }
});
ReactDOM.render(
    <Root/>, document.getElementById('app'));