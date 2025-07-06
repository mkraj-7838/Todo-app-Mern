import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  return (
    <motion.header 
      className="app-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="app-title"
        whileHover={{ scale: 1.02 }}
      >
        TodoList
      </motion.h1>
      <p className="app-subtitle">Get things done, one task at a time</p>
    </motion.header>
  )
}

export default Header;