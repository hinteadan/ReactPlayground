var Card = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var self = this;
        $.get('https://api.github.com/users/' + this.props.login, function (data) {
            self.setState(data);
        });
    },
    render: function () {
        return React.createElement(
            'div',
            null,
            React.createElement('img', { src: this.state.avatar_url, width: '80' }),
            React.createElement(
                'h3',
                null,
                this.state.name
            ),
            React.createElement('hr', null)
        );
    }
});

var Form = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var loginInput = this.refs.login;
        this.props.addCard(loginInput.value);
        loginInput.value = '';
    },
    render: function () {
        return React.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            React.createElement('input', { type: 'text', placeholder: 'GitHub Login', ref: 'login' }),
            React.createElement(
                'button',
                null,
                'Add'
            )
        );
    }
});

var Main = React.createClass({
    getInitialState: function () {
        return {
            logins: []
        };
    },
    addCard: function (login) {
        this.state.logins.push(login);
        this.setState({ logins: this.state.logins });
    },
    render: function () {
        var cards = this.state.logins.map(function (login) {
            return React.createElement(Card, { login: login });
        });
        return React.createElement(
            'div',
            null,
            React.createElement(Form, { addCard: this.addCard }),
            cards
        );
    }
});

ReactDOM.render(React.createElement(Main, null), document.getElementById('root'));