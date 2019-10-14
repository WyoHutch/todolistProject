import React from "react";
import TodoItem from "./todoItem";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      todo: ""
    };
  }

  componentDidMount() {
    fetch("https://enigmatic-earth-83722.herokuapp.com/todos")
      .then(response => response.json())
      .then(data => this.setState({ todos: data }));
  }

  renderTodos = () => {
    return this.state.todos.map(task => {
      return (
        <TodoItem
          key={task.id}
          title={task.title}
          done={task.done}
          id={task.id}
          delete={this.deleteTodo}
        />
      );
    });
  };

  addTodo = event => {
    event.preventDefault();
    fetch("https://enigmatic-earth-83722.herokuapp.com/todo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: this.state.todo,
        done: false
      })
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          todos: [...this.state.todos, this.state.todo],
          todo: ""
        })
      );
  };

  deleteTodo = id => {
    fetch(
      `https://enigmatic-earth-83722.herokuapp.com/todo/${id}`,
      {
        method: "DELETE"
      }.then(
        this.setState({
          todos: this.state.todos.filter(todo => todo.id !== id)
        })
      )
    );
  };

  handleChange = event => {
    this.setState({ todo: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <h1>To Do List</h1>
        <form onSubmit={this.addTodo}>
          <input
            type="text"
            placeholder="Add Task"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <button type="text">Add</button>
        </form>
        <div id="headspace"></div>
        {this.renderTodos()}
      </div>
    );
  }
}

export default App;
