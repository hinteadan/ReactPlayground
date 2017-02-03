var StarsFrame = React.createClass({
    displayName: 'StarsFrame',
    render: function () {

        var numberOfStars = this.props.numberOfStars;

        var stars = [];

        for (var i = 0; i < numberOfStars; i++) {
            stars.push(
                <span className="glyphicon glyphicon-star"></span>
            );
        }

        return (
            <div id="stars-frame">
                <div className="well">
                    {stars}
                </div>
            </div>
        );
    }
});

var ButtonFrame = React.createClass({
    displayName: 'ButtonFrame',
    render: function () {
        return (
            <div id="button-frame">
                <button className="btn btn-primary btn-lg">=</button>
            </div>
        );
    }
});

var AnswerFrame = React.createClass({
    displayName: 'AnswerFrame',
    render: function () {

        var numbers = this.props.selectedNumbers.map(n => <span>{n}</span>);

        return (
            <div id="answers-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
});

var NumbersFrame = React.createClass({
    displayName: 'NumbersFrame',
    render: function () {

        var numbers = [], className, selectedNumbers = this.props.selectedNumbers;

        for (var i = 1; i <= 9; i++) {
            className = 'numbers selected-' + (selectedNumbers.indexOf(i) >= 0);
            numbers.push(
                <div className={className} onClick={this.props.clickNumber.bind(null, i)}>{i}</div>
            );
        }

        return (
            <div id="numbers-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
});

var Game = React.createClass({
    displayName: 'Game',
    getInitialState: function () {
        return {
            numberOfStars: Math.floor(Math.random() * 9) + 1,
            selectedNumbers: []
        };
    },
    clickNumber: function (number) {
        if (this.state.selectedNumbers.indexOf(number) >= 0) {
            return;
        }
        this.setState({
            selectedNumbers: this.state.selectedNumbers.concat(number)
        });
    },
    render: function () {
        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr />
                <div className="clearfix">
                    <StarsFrame numberOfStars={this.state.numberOfStars} />
                    <ButtonFrame />
                    <AnswerFrame selectedNumbers={this.state.selectedNumbers} />
                </div>

                <NumbersFrame selectedNumbers={this.state.selectedNumbers} clickNumber={this.clickNumber} />

            </div>
        );
    }
});

ReactDOM.render(<Game />, document.getElementById('container'));