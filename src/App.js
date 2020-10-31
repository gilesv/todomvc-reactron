import Reactron from "reactron";
import Header from "./Header.js";
import MainSection from "./MainSection.js";

let getTodosNumber = () => {
  let params = window.location.href.split('?')[1];
  if (params) {
    let str = params.split("todos=")[1];
    return Object.is(Number(str), NaN) ? 0 : Number(str);
  }
  return 0;
}

let defaultTodos = Array(getTodosNumber()).fill(0).map((_, i) => {
  return { id: i, completed: false, text: `Todo #${i}` };
})

const useTodos = (defaultTodos = []) => {
  const [todos, setTodos] = Reactron.useState(defaultTodos);

  const addTodo = text => {
    setTodos([
      ...todos,
      {
        id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text
      }
    ]);
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, text) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text } : todo)));
  };

  const toggleTodo = id => {
    setTodos(
      todos.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleAllTodo = () => {
    const areAllMarked = todos.every(todo => todo.completed);
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  return [
    todos,
    {
      addTodo,
      deleteTodo,
      editTodo,
      toggleTodo,
      toggleAllTodo,
      clearCompleted
    }
  ];
};

export default function App() {
  const [
    todos,
    { addTodo, deleteTodo, editTodo, toggleTodo, toggleAllTodo, clearCompleted }
  ] = useTodos(defaultTodos);
  return (
    <div className="todoapp">
      <Header addTodo={addTodo} />
      <MainSection
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
        toggleAllTodo={toggleAllTodo}
        clearCompleted={clearCompleted}
      />
    </div>
  );
};
