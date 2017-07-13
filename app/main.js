require('./theme/stylesheets/main.sass');
import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './javascript/components/Graph';

ReactDOM.render(<Graph/>, document.getElementById('app'));