import React from "react";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: props.done
    };
  }

  toggleDone = () => {
    fetch(`https://enigmatic-earth-83722.herokuapp.com/todo/${this.props.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: this.props.title,
        done: !this.state.done
      }).then(this.setState({ done: !this.state.done }))
    });
  };

  render() {
    return (
      <div className="todoitems">
        <input
          type="checkbox"
          onChange={this.toggleDone}
          defaultChecked={this.state.done}
        />
        <p className={this.state.done && "done"}>{this.props.title}</p>
        <button onClick={() => this.props.deleted(this.props.id)}></button>
      </div>
    );
  }
}

export default TodoItem;
