var Card = React.createClass({
    getInitialState: function () {
        return {

        };
    },
    componentDidMount: function () {
        var self = this;
        $.get('https://api.github.com/users/' + this.props.login, function (data) {
            self.setState(data);
        });
    },
    render: function () {
        return (
            <div>
                <img src={this.state.avatar_url} width="80" />
                <h3>{this.state.name}</h3>
                <hr />
            </div>
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
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="GitHub Login" ref="login" />
                <button>Add</button>
            </form>
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
        this.state.logins.push(login)
        this.setState({ logins: this.state.logins });
    },
    render: function () {
        var cards = this.state.logins.map(function (login) {
            return (<Card login={login } />);
        });
        return (
            <div>
                <Form addCard={this.addCard} />
                {cards}
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('root'));