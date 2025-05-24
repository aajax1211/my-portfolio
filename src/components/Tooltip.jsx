import { useEffect, useState } from 'react';

export const Tooltip = ({ show, message, link, projectName }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClick = () => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  if (!visible) return null;

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-100 animate-float`}>
      <div 
        className={`bg-black/90 border-2 border-yellow-500/50 px-6 py-3 rounded-lg shadow-lg animate-fade-in cursor-pointer hover:bg-black/80 transition-colors`}
        onClick={handleClick}
      >
        <div className="text-yellow-400 font-mono text-lg tracking-wider">
          Clicking <span className="text-white font-bold">here</span> will take you to the {projectName} source code
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black/90 border-r-2 border-b-2 border-yellow-500/50 rotate-45"></div>
      </div>
    </div>
  );
}; 