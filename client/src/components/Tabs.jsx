import { motion } from 'framer-motion';
import { TABS } from "../redux/actions/type";
import { useDispatch } from 'react-redux';
import { toggleTab } from "../redux/actions";
import './Tabs.css'; // Assuming you have a CSS file for styling

const Tabs = ({ currentTab }) => {
  const dispatch = useDispatch();

  return (
    <div className="tabs-container">
      {TABS.map((tab) => (
        <motion.button
          key={tab}
          className={`tab-button ${tab === currentTab ? 'active' : ''}`}
          onClick={() => dispatch(toggleTab(tab))}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tab}
          {tab === currentTab && <motion.span className="underline" layoutId="underline" />}
        </motion.button>
      ))}
    </div>
  )
}

export default Tabs;