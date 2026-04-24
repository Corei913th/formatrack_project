import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.2, ease: "easeIn" } },
};

interface IPageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: IPageTransitionProps) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    style={{ minHeight: "100%" , width: "100%" }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
