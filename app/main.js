require('./theme/main.sass');
import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './javascript/components/Graph';
import GraphExchange from './javascript/components/GraphExchange';
import GraphWrapper from './javascript/components/GraphWrapper';
import GraphReactComp from './javascript/components/GraphReactComp';
import Profile from './javascript/components/Profile';
import {useRouterHistory, Router, Route, IndexRoute} from 'react-router';
import {createHashHistory} from 'history';
const history = useRouterHistory(createHashHistory)({ queryKey: false });

const Root = React.createClass({
    render() {
        return (
            <div id='mainContainer'>
                <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
                    <Route name='GraphWrapper' path='/' component={GraphWrapper}>
                        <IndexRoute component={Graph}/>
                    </Route>
                    <Route path="/graph-exchange" component={GraphExchange}></Route>
                    <Route path="/graph-react" component={GraphReactComp}></Route>
                </Router>
            </div>
        );
    }
});
ReactDOM.render(
    <Root/>, document.getElementById('app'));