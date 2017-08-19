import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class GraphExchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: {
                organisation: {
                    name: "Webonise",
                    id: 1,
                    children: [{ name: "my child"}, {name: "nkr"}]
                },
                user: {
                    id: 12,
                    name: "Nitin Reddy",
                    department: "Sales",
                    profileImage: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAfZAAAAJGYwOTc3NTQ5LTBiMjEtNDA5MC05YWUyLTAyNGIzMzE2MmY1Zg.jpg"
                },
                departments: [{
                    id: 2,
                    name: "GIS",
                    children: [{ name: "kumar"}, { name: "kr"}],
                    profileImage: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAfZAAAAJGYwOTc3NTQ5LTBiMjEtNDA5MC05YWUyLTAyNGIzMzE2MmY1Zg.jpg"
                },
                {
                    id: 3,
                    name: "HR",
                    children: [{ name: "mar"}, { name: "nkr"}],
                    profileImage: "https://avatars3.githubusercontent.com/u/2829600?v=4&s=460"                    
                },
                {
                    id: 4,
                    name: "Management",
                    children: [{ name: "umar"}, { name: "gkr"}],
                    profileImage: "https://avatars2.githubusercontent.com/u/110953?v=4&s=460"                    
                },
                {
                    id: 5,
                    name: "Finance",
                    children: [{ name: "kumsdfsdar"}, { name: "sdfr"}],
                    profileImage: "https://avatars2.githubusercontent.com/u/119893?v=4&s=460"                    
                }, {
                    id: 6,
                    name: "Sales",
                    children: [{ name: "kugdfdmar"}, { name: "asdkr"}],
                    profileImage: "https://avatars0.githubusercontent.com/u/6252327?v=4&s=460"                    
                }]
            },
            selectedUserChild: [],
            selectedDepChild: [] 
        }
        this.createGraph = this.createGraph.bind(this);
        /**
         * Kept for future preferences
         */
        this.formatData = this.formatData.bind(this);
    }

    componentDidMount() {
        this.createGraph()
    }

    /**
     * Kept for future preferences
     */
    formatData() {
        var nodes = [], links = [];
        var result = this.state.result;
        nodes.push(result.organisation);
        _.each(result.departments, (department) => {
            department.id = department.id;
            department.name = department.name;
            department.src = department.profileImage
            nodes.push(department)
        })
        links = _.map(result.departments, (department, i) => {
            return {
                source: i + 1, target: 0
            }
        })

        return {
            nodes: nodes,
            links: links
        }
    }

    createGraph() {
        var width = 900,
            height = 900;

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

        var graphJson = this.formatData();
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
        
        var defs = files.append("defs").attr('id', "imgdefs");
        
        var clipPath = defs.append('clipPath').attr('id', 'clip-circle')
            .append("circle")
            .attr("r", 52)
            .attr("cy",  0)
            .attr("cx", 0)
            .attr("stroke", "#ededed")
            // .attr("fill-opacity", 0.2)
            // .attr("stroke-opacity", 0.2)

        files
            .append("circle")
            .attr("class", "file")
            .attr("r", 52)
            .attr("stroke", "#ededed")        
            // .on("click", (d) => {
            //     if(d.name == "Webonise") {
            //        this.setState({ selectedUserChild: d.children });                
            //     } else {
            //         this.setState({ selectedDepChild: d.children });
            //     }
            // })
        files
            .append("foreignObject")
            .text((d) => d.name)
            .attr("x", -48)
            .attr("y", (d) => {
                var yAxis = -75
                if(d.name == "Webonise") {
                    yAxis = 0
                }
                return yAxis
            })
            .attr("width", 95)
            .attr("height", 10)
            .attr("text-anchor", "middle")
            .text((d) => d.name)
        
        files
            .append("image")
            .attr("width", 104)
            .attr("height", 104)
            .attr("x", -52)
            .attr("y", -52)
            // .attr("fill-opacity", 0.2)
            // .attr("stroke-opacity", 0.2)
            .attr("xlink:href", (d) => {
                var urlPath = ""
                if(d.src) {
                    urlPath = d.src
                } 
                return urlPath
            })
            .attr("clip-path", "url(#clip-circle)")
        
        force.start();

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
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div id="theVizness"></div>
                    </div>
                    <div className="col-md-2">
                        <ul>
                            {_.map(this.state.selectedUserChild, (listItem, i) => {
                                return (<li key={i}>
                                    {listItem.name}
                                </li>)
                            })}
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <ul>
                            {_.map(this.state.selectedDepChild, (listItem, i) => {
                                return (<li key={i}>
                                    {listItem.name}
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};

GraphExchange.contextTypes = {
    router: React.PropTypes.object
};


export default GraphExchange;