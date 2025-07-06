import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getAllTodos } from '../redux/actions';
import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from '../redux/actions/type';
import Todo from './Todo';
import Tabs from './Tabs';
import './Todos.css'; // Assuming you have a CSS file for styling

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const currentTab = useSelector(state => state.currentTab);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  const getTodos = () => {
    if (currentTab === ALL_TODOS) return todos;
    if (currentTab === ACTIVE_TODOS) return todos.filter(todo => !todo.done);
    if (currentTab === DONE_TODOS) return todos.filter(todo => todo.done);
    return [];
  };

  const removeDoneTodos = () => {
    todos.forEach(({ done, _id }) => {
      if (done) dispatch(deleteTodo(_id));
    });
  };

  return (
    <motion.article
      className="todos-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="todos-controls">
        <Tabs currentTab={currentTab} />
        
        {todos.some(todo => todo.done) && (
          <motion.button
            onClick={removeDoneTodos}
            className="clear-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Clear Completed
            <svg viewBox="0 0 24 24">
              <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z" />
            </svg>
          </motion.button>
        )}
      </div>

      <ul className="todos-list">
        <AnimatePresence>
          {getTodos().length > 0 ? (
            getTodos().map(todo => (
              <Todo key={todo._id} todo={todo} />
            ))
          ) : (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
              </svg>
              <p>No tasks found</p>
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </motion.article>
  );
};

export default Todos;