import { motion } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import Todos from './components/Todos';

function App() {
  return (
    <motion.div 
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-container">
        <Header />
        <main className="content-wrapper">
          <TodoForm />
          <Todos />
        </main>
      </div>
    </motion.div>
  );
}

export default App;