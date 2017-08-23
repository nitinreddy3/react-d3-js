import GraphTemplate from '../common/GraphTemplate';

class GraphReactComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nodes: [{
                id: 1,
                name: "Puja",
                src: "https://avatars0.githubusercontent.com/u/6252327?v=4&s=460",
                opacity: 1,
                emailId: "puja@yopmail.com",
                myKpi: [
                    { kpiId: 10, kpiName: "Rest" },
                    { kpiId: 11, kpiName: "Best" },
                    { kpiId: 12, kpiName: "Gst" }
                ],
                isAnOwner: false
            }, {
                id: 2,
                name: "Nitin",
                src: "https://avatars3.githubusercontent.com/u/2829600?v=4&s=460",
                opacity: 0.5,
                emailId: "nitin@yopmail.com",                
                myKpi: [
                    { kpiId: 13, kpiName: "GHT" },
                    { kpiId: 14, kpiName: "FGS" },
                    { kpiId: 15, kpiName: "EWE" }
                ],
                isAnOwner: false
            }, {
                id: 3,
                name: "Peter",
                src: "https://avatars2.githubusercontent.com/u/110953?v=4&s=460",
                opacity: 0.5,
                emailId: "peter@yopmail.com",                
                myKpi: [
                    { kpiId: 16, kpiName: "HSD" },
                    { kpiId: 17, kpiName: "JSDF" },
                    { kpiId: 18, kpiName: "YWER" }
                ],
                isAnOwner: false
            }, {
                id: 4,
                name: "Webonise",
                src: "https://avatars0.githubusercontent.com/u/6252327?v=4&s=460",
                opacity: 1,
                emailId: "Webonise@yopmail.com",                
                myKpi: [
                    { kpiId: 19, kpiName: "JJJ" },
                    { kpiId: 20, kpiName: "FGG" },
                    { kpiId: 21, kpiName: "oos" }
                ],
                isAnOwner: true
            }],
            links: [{
                source: 1, target: 0
            }, {
                source: 2, target: 0
            }, {
                source: 3, target: 0
            }],
            selectedKpi: [],
            selectedUser: {},
            currentUserKpi: []
        };
        this.selectKpiFromUser = this.selectKpiFromUser.bind(this)
        this.showTooltipMouseOver = this.showTooltipMouseOver.bind(this)
        this.showToolTipMouseMove = this.showToolTipMouseMove.bind(this)
        this.hideToolTipMouseOut = this.hideToolTipMouseOut.bind(this)
    }

    componentDidMount() {
        let currentUser = _.findWhere(this.state.nodes, { name: "Puja" });
        this.setState({ currentUserKpi: currentUser.myKpi })
    }

    selectKpiFromUser(user, opacity) {
        let { nodes } = this.state;
        nodes = _.map(nodes, (node, key) => {
            if (node.id == user.id || node.isAnOwner) {
                node.opacity = 1;
            } else {
                node.opacity = 0.5;
            }
            return node;
        });
        this.state.selectedKpi = user.myKpi;
        this.setState(this.state)
    }

    showTooltipMouseOver() {
        console.log("over");
        this.refs.toolTip.style.visibility = "visible"
    }

    showToolTipMouseMove(node, event) {
        console.log('moving')
        this.refs.toolTip.style.top = event.pageY+"px"
        this.refs.toolTip.style.left = event.pageX+"px"
        this.setState({ selectedUser: node })
    }

    hideToolTipMouseOut() {
        console.log('out')
        this.refs.toolTip.style.visibility = "hidden"
    }

    render() {
        let {selectedUser} = this.state;
        return (
            <div>
                <GraphTemplate nodes={this.state.nodes} links={this.state.links} 
                selectKpiFromUser={this.selectKpiFromUser}
                showTooltipMouseOver={this.showTooltipMouseOver}
                showToolTipMouseMove={this.showToolTipMouseMove}
                hideToolTipMouseOut={this.hideToolTipMouseOut}/>
                <div className="myToolTip" style={{position: "absolute", zIndex: "10", visibility: "hidden"}} ref="toolTip">
                    <p>{selectedUser.emailId}</p>
                </div>
            </div>
        );
    }
}

export default GraphReactComp;