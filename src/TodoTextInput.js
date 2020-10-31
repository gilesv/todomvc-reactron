import Reactron from "reactron";

let ENTER_KEY = 13;

export default function TodoTextInput({ value, onSave, newTodo, editing, placeholder }) {
  let [text, setText] = Reactron.useState(value || "");

  let handleSubmit = (e) => {
    let newValue = e.target.value.trim();

    if (e.which === ENTER_KEY) {
      onSave(newValue);

      if (newTodo) {
        setText("");
      } else {
        setText(newValue);
      }
    }
  };

  let handleBlur = (e) => {
    let newValue = e.target.value.trim();
    onSave(newValue);

    if (newTodo) {
      setText("");
    } else {
      setText(newValue);
    }
  };

  return (
    <input
      className={`${newTodo ? "new-todo" : "edit"}`}
      type="text"
      placeholder={placeholder}
      autoFocus={true}
      value={text}
      onBlur={handleBlur}
      onKeyDown={handleSubmit}
    />
  );
}
