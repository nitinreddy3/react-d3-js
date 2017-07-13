import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var Graph = React.createClass({
    getInitialState() {
        return {
            graph: {
                "nodes": [{ name: "Peter", label: "Person", id: 1 }, { name: "Michael", label: "Person", id: 2 },
                { name: "Neo4j", label: "Database", id: 3 }],
                "links": [{ source: 0, target: 1, type: "KNOWS", since: 2010 }, { source: 0, target: 2, type: "FOUNDED" },
                { source: 1, target: 2, type: "WORKS_ON" }]
            }
        }
    },

    componentWillMount() {
        this.createGraph()
    },

    componentDidMount() {
        this.createGraph()
    },

    createGraph() {
        debugger;
        var graph = this.state.graph;
        var width = 800;
        var height = 800;
        // force layout setup
        var force = d3.layout.force()
            .charge(-100).linkDistance(100).size([width, height]);

        // setup svg div
        var svg = d3.select("#graph").append("svg")
            .attr("width", "800px").attr("height", "800px")
            .attr("pointer-events", "all");
        force.nodes(graph.nodes).links(graph.links).start();
        // render relationships as lines
        var link = svg.selectAll(".link")
            .data(graph.links).enter()
            .append("line").attr("class", "link")

        // render nodes as circles, css-class from label
        var node = svg.selectAll(".node")
            .data(graph.nodes).enter()
            .append("circle")
            .attr("class", (d) => "node " + d.label)
            .attr("r", 10);

        // html title attribute for title node-attribute
        node.append("title")
            .text((d, i) => d.label)

        // force feed algo ticks for coordinate computation
        force.on("tick", () => {
            link.attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node.attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; });
        });
    },

    render() {
        return (<div>
            <h1>Hello</h1>
            <div id="graph"></div>
            {/*svg id="c" width={500} height={500}></svg>*/}
        </div>
        )
    }
});

export default Graph;