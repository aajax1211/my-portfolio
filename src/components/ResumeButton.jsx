import { useState } from 'react';

export const ResumeButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = () => {
    window.open('/r3f-animated-book-slider-starter-main/resume/AjitBehl_SoftwareDeveloper_Resume.pdf', '_blank');
  };

  return (
    <button
      className="magic-btn pointer-events-auto cursor-pointer"
      onClick={handleDownload}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">Download Resume</span>
      {isHovered && (
        <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
      )}
    </button>
  );
}; 