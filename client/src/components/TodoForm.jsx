import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../redux/actions";
import './TodoForm.css';

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addNewTodo(text));
      setText('');
    }
  };

  return (
    <motion.form
      className="todo-form"
      onSubmit={onFormSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <input
        type="text"
        placeholder="What needs to be done?"
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <motion.button
        type="submit"
        className="add-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!text.trim()}
      >
        <svg viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </motion.button>
    </motion.form>
  );
};

export default TodoForm;