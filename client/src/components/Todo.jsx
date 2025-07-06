import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toggleTodo, updateTodo, deleteTodo } from "../redux/actions";
import { useDispatch } from "react-redux";
import './Todo.css'; // Assuming you have a CSS file for styling

const Todo = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo?.data);
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    dispatch(updateTodo(todo._id, text));
  }

  return (
    <motion.li
      className={`todo-item ${todo?.done ? 'completed' : ''}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="todo-content">
        <motion.div
          className="checkbox"
          onClick={() => dispatch(toggleTodo(todo._id))}
          whileTap={{ scale: 0.9 }}
        >
          {todo?.done && (
            <motion.svg
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </motion.svg>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {editing ? (
            <motion.form
              onSubmit={onFormSubmit}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                value={text}
                className="edit-input"
                onChange={(e) => setText(e.target.value)}
                autoFocus
                onBlur={onFormSubmit}
              />
            </motion.form>
          ) : (
            <motion.span
              className="todo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => setEditing(true)}
            >
              {todo?.data}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="todo-actions">
        <motion.button
          className="action-button edit"
          onClick={(e) => {
            e.stopPropagation();
            setEditing(!editing);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </motion.button>

        <motion.button
          className="action-button delete"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteTodo(todo._id));
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </motion.button>
      </div>
    </motion.li>
  )
}

export default Todo;