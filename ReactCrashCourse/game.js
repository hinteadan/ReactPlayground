var StarsFrame = React.createClass({
    displayName: 'StarsFrame',
    render: function () {

        var numberOfStars = this.props.numberOfStars;

        var stars = [];

        for (var i = 0; i < numberOfStars; i++) {
            stars.push(React.createElement("span", { className: "glyphicon glyphicon-star" }));
        }

        return React.createElement(
            "div",
            { id: "stars-frame" },
            React.createElement(
                "div",
                { className: "well" },
                stars
            )
        );
    }
});

var ButtonFrame = React.createClass({
    displayName: 'ButtonFrame',
    render: function () {
        return React.createElement(
            "div",
            { id: "button-frame" },
            React.createElement(
                "button",
                { className: "btn btn-primary btn-lg" },
                "="
            )
        );
    }
});

var AnswerFrame = React.createClass({
    displayName: 'AnswerFrame',
    render: function () {

        var numbers = this.props.selectedNumbers.map(n => React.createElement(
            "span",
            null,
            n
        ));

        return React.createElement(
            "div",
            { id: "answers-frame" },
            React.createElement(
                "div",
                { className: "well" },
                numbers
            )
        );
    }
});

var NumbersFrame = React.createClass({
    displayName: 'NumbersFrame',
    render: function () {

        var numbers = [],
            className,
            selectedNumbers = this.props.selectedNumbers;

        for (var i = 1; i <= 9; i++) {
            className = 'numbers selected-' + (selectedNumbers.indexOf(i) >= 0);
            numbers.push(React.createElement(
                "div",
                { className: className, onClick: this.props.clickNumber.bind(null, i) },
                i
            ));
        }

        return React.createElement(
            "div",
            { id: "numbers-frame" },
            React.createElement(
                "div",
                { className: "well" },
                numbers
            )
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
        return React.createElement(
            "div",
            { id: "game" },
            React.createElement(
                "h2",
                null,
                "Play Nine"
            ),
            React.createElement("hr", null),
            React.createElement(
                "div",
                { className: "clearfix" },
                React.createElement(StarsFrame, { numberOfStars: this.state.numberOfStars }),
                React.createElement(ButtonFrame, null),
                React.createElement(AnswerFrame, { selectedNumbers: this.state.selectedNumbers })
            ),
            React.createElement(NumbersFrame, { selectedNumbers: this.state.selectedNumbers, clickNumber: this.clickNumber })
        );
    }
});

ReactDOM.render(React.createElement(Game, null), document.getElementById('container'));