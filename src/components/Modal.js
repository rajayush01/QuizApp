import { X } from "lucide-react";
import { motion } from "framer-motion";

export const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative bg-gradient-to-br from-black to-blue-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-white/30 shadow-2xl p-6"
      >
        <div className="border-b border-white/10 flex justify-between items-center pb-4 relative">
          <h3 className="text-3xl font-extrabold text-white drop-shadow-lg">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white backdrop-blur-lg"
          >
            <X size={28} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] text-gray-400/90 space-y-4 flex flex-col gap-4">
          {children}
        </div>
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-blue-700 rounded-full blur-3xl opacity-20 animate-pulse" />
      </motion.div>
    </motion.div>
  );
};
