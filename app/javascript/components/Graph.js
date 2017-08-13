import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var Graph = React.createClass({
    getInitialState() {
        return {
            graphJson: {
                "nodes": [
                    {
                        "id": 1,
                        "name": "Webonise"
                    }, {
                        "id": 2,
                        name: "Hr"
                    }, {
                        "id": 3,
                        name: "gn",
                        src: "https://avatars0.githubusercontent.com/u/6252327?v=4&s=460"
                    }, {
                        "id": 4,
                        name: "sd"
                    }, {
                        "id": 5,
                        name: "ssdfd"
                    }, {
                        "id": 6,
                        name: "ssdfd"
                    }, {
                        "id": 7,
                        name: "ssdfd"
                    }, {
                        "id": 8,
                        name: "ssdfd"
                    }, {
                        "id": 9,
                        name: "ssdfd"
                    }, {
                        "id": 10,
                        name: "ssdfd"
                    }, {
                        "id": 11,
                        name: "ssdfd"
                    }, {
                        "id": 12,
                        name: "ssdfd"
                    }, {
                        "id": 13,
                        name: "ssdfd"
                    }, {
                        "id": 14,
                        name: "ssdfd"
                    }, {
                        "id": 15,
                        name: "ssdfd"
                    }, {
                        "id": 16,
                        name: "ssdfd"
                    }, {
                        "id": 17,
                        name: "ssdfd"
                    }, {
                        "id": 18,
                        name: "ssdfd"
                    }, {
                        "id": 19,
                        name: "ssdfd"
                    }, {
                        "id": 20,
                        name: "ssdfd"
                    }, {
                        "id": 21,
                        name: "ssdfd"
                    }, {
                        "id": 22,
                        name: "ssdfd"
                    }, {
                        "id": 23,
                        name: "ssdfd"
                    }, {
                        "id": 24,
                        name: "ssdfd"
                    }, {
                        "id": 25,
                        name: "ssdfd"
                    }
                ],
                "links": [
                    {
                        "source": 1,
                        "target": 0
                    }, {
                        "source": 2,
                        "target": 0
                    }, {
                        "source": 3,
                        "target": 0
                    }, {
                        "source": 4,
                        "target": 0
                    }, {
                        "source": 5,
                        "target": 0
                    }, {
                        "source": 6,
                        "target": 0
                    }, {
                        "source": 7,
                        "target": 0
                    }, {
                        "source": 8,
                        "target": 0
                    }, {
                        "source": 9,
                        "target": 0
                    }, {
                        "source": 10,
                        "target": 0
                    }, {
                        "source": 11,
                        "target": 0
                    }, {
                        "source": 12,
                        "target": 0
                    }, {
                        "source": 13,
                        "target": 0
                    }, {
                        "source": 14,
                        "target": 0
                    }, {
                        "source": 15,
                        "target": 0
                    }, {
                        "source": 16,
                        "target": 0
                    }, {
                        "source": 17,
                        "target": 0
                    }, {
                        "source": 18,
                        "target": 0
                    }, {
                        "source": 19,
                        "target": 0
                    }, {
                        "source": 20,
                        "target": 0
                    }, {
                        "source": 21,
                        "target": 0
                    }, {
                        "source": 22,
                        "target": 0
                    }, {
                        "source": 23,
                        "target": 0
                    }, {
                        "source": 24,
                        "target": 0
                    }
                ]
            }
        }
    },

    contextTypes: {
        router: React.PropTypes.object
    },

    componentWillMount() {
        // this.createGraph()
    },

    componentDidMount() {
        this.createGraph()
    },

    createGraph() {
        var width = 1000,
            height = 1000;

        var color = d3
            .scale
            .ordinal()
            .range(["#ff0000", "#fff000", "#ff4900"]);

        var force = d3
            .layout
            .force()
            .charge(-120)
            .linkDistance(100)
            .size([width, height])
            .start();

        var svg = d3
            .select("#theVizness")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        var loading = svg
            .append("text")
            .attr("class", "loading")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text("Loading...");
        var graphJson = this.state.graphJson;
        console.log(graphJson)
        var nodes = graphJson.nodes;
        force
            .nodes(nodes)
            .links(graphJson.links)
            .charge(function (d) {
                var charge = -2010;
                if (d.index === 0) {
                    charge = -20100;
                }
                return charge;
            });

        var link = svg
            .selectAll(".link")
            .data(graphJson.links)
            .enter()
            .append("line")
            .attr("class", "link")
            .style("stroke-width", 1);

        var files = svg
            .selectAll(".mainNode")
            .data(graphJson.nodes)
            .enter()
            .append("g")
            .attr("class", "mainNode")
        var totalNodes = files[0].length;

        files
            .append("circle")
            .attr("class", "file")
            .attr("r", 30)
            .attr("fill", function (d) {
                return "#a5abb6";
            })
            .attr("stroke", "#a5abb6");
        files
            .append("text")
            .attr("class", "text-name")
            .text((d) => d.name)
            .attr("x", 0 + "px")
            .attr("y", 0 + "px")
            .attr("text-anchor", "middle")
            .attr("stroke", "#000");
        files
            .append("image")
            .attr("href", (d) => d.src)
            .attr("width", 50 + "px")
            .attr("height", 50 + "px")
            .attr("x", -25 + "px")
            .attr("y", -75 + "px")
            .on("click", (d) => {
                if(d.src) {
                    this.context.router.push('/my-profile');
                }
            })

        force.start();
        // for (var i = totalNodes * totalNodes; i > 0; --i) force.tick();

        nodes[0].x = width / 2;
        nodes[0].y = height / 2;

        link.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        files.attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
                return d.y;
            })
            .attr("class", function (d) {
                var classString = "file"

                if (d.index === 0) 
                    classString += " rootFile";
                
                return classString;
            })
            .attr("r", function (d) {
                var radius = 10;

                if (d.index === 0) 
                    radius = radius * 2;
                
                return radius;
            });
        force.on("tick", function () {
            link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });
            files.attr("transform", (d) => 'translate(' + d.x + ',' + d.y + ')')
        });

        loading.remove();
    },

    render() {
        return (
            <div>
                <h1>Hello</h1>
                <div id="theVizness"></div>
                {/*svg id="c" width={500} height={500}></svg>*/}
            </div>
        )
    }
});

export default Graph;