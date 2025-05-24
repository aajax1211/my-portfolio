import { ResumeButton } from './ResumeButton';
import AudioController from './AudioController/AudioController';
import { BASE_URL } from './constants/constants';
import { Tooltip } from './Tooltip';
import { useAtom } from 'jotai';
import { pageAtom } from './UI';

export const Navigation = ({ audioRef }) => {
  const [page] = useAtom(pageAtom);

  const getTooltipProps = (pageNumber) => {
    switch (pageNumber) {
      case 3:
        return {
          link: 'https://github.com/aajax1211/proshop.com-django.git',
          projectName: 'ProShop'
        };
      case 4:
        return {
          link: 'https://github.com/aajax1211/chit-chat-react-node.git',
          projectName: 'Chit-Chat'
        };
      default:
        return null;
    }
  };

  const tooltipProps = getTooltipProps(page);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Name */}
        <div className="flex items-center gap-3">
          <img 
            src={`${BASE_URL}svgs/logo.png`} 
            alt="Logo" 
            className="h-20 w-20 object-contain"
          />
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Audio Control */}
          <AudioController audioRef={audioRef} />

          {/* Resume Button */}
          <ResumeButton />
        </div>
      </div>
      {tooltipProps && (
        <Tooltip 
          show={page === 3 || page === 4}
          link={tooltipProps.link}
          projectName={tooltipProps.projectName}
        />
      )}
    </nav>
  );
}; 