var width = 900;
var height = 900;
var force = d3
    .layout
    .force()
    .charge(-120)
    .linkDistance(100)
    .size([width, height])

class GraphTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    
    componentWillMount() {
        setTimeout(() => {
            if (force.alpha() >= 0.005) {
                force.on('tick', () => {
                    this.forceUpdate()
                });
            }
        }, 2000)
    }

    componentWillReceiveProps(nextProps) {
        force
            .nodes(nextProps.nodes)
            .links(nextProps.links)
            .charge(function (d) {
                var charge = -2010;
                if (d.index === 0) {
                    charge = -20100;
                }
                return charge;
            });
        _.first(nextProps.nodes).x = width / 2;
        _.first(nextProps.nodes).y = height / 2;

        force.start();
    }

    componentDidMount() {
        let { nodes, links } = this.props
        force
            .nodes(nodes)
            .links(links)
            .charge(function (d) {
                var charge = -2010;
                if (d.index === 0) {
                    charge = -20100;
                }
                return charge;
            });
        _.first(nodes).x = width / 2;
        _.first(nodes).y = height / 2;

        force.start();
    }

    render() {
        var nodes = _.map(this.props.nodes, (node) => {
            var transform = 'translate(' + node.x + ',' + node.y + ')';
            return (
                <g className={node.index === 0 ? "rootFile file" : "file"} key={node.key} transform={transform} cx={node.x} cy={node.y}
                    opacity={node.opacity} onClick={this.props.selectKpiFromUser.bind(this, node)}
                    onMouseOver={this.props.showTooltipMouseOver}
                    onMouseMove={this.props.showToolTipMouseMove.bind(this, node)}
                    onMouseOut={this.props.hideToolTipMouseOut}>
                    <defs id="imgdefs">
                        <clipPath id="clip-circle">
                            <circle r="52" cx="0" cy="0" stroke="#ededed"></circle>
                        </clipPath>
                    </defs>
                    <circle className="file" r="52" />
                    <foreignObject x="-48" y={node.index == 0 ? 0 : "-75"} width="95" height="10" textAnchor="middle">{node.name}</foreignObject>
                    <image width="104" height="104" x="-52" y="-52" xlinkHref={node.index == 0 ? "" : node.src} clipPath="url(#clip-circle)"></image>
                </g>
            );
        });
        var links = _.map(this.props.links, (link) => {
            return (
                <line className='link' key={link.key} strokeWidth={link.size}
                    x1={link.source.x} x2={link.target.x} y1={link.source.y} y2={link.target.y} />
            );
        });

        return (
            <svg width={width} height={height}>
                {links}
                {nodes}
            </svg>
        );
    }
}

export default GraphTemplate;