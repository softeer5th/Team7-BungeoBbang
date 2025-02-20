// ProtectedLayout.tsx
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const ProtectedLayout = () => {
  return (
    <AnimatePresence mode="sync">
      <Outlet key={location.pathname} />
    </AnimatePresence>
  );
};

export default ProtectedLayout;
