import { atom, useAtom } from "jotai";
import { Tooltip } from "./Tooltip";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];

// Only create pages up to page 5 (index 4)
for (let i = 1; i < 9; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

// Add back cover
pages.push({
  front: pictures[9],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  const getPageName = (index) => {
    switch (index) {
      case 0:
        return "Cover";
      case 1:
        return "About & Skills";
      case 2:
        return "Experience";
      case 3:
        return "Project 1";
      case 4:
        return "Project 2";
      case 5:
        return "Testimonials";
      default:
        return `Page ${index}`;
    }
  };

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
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <div className="pointer-events-auto mt-10 ml-10">
        </div>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {getPageName(index)}
              </button>
            ))}
          </div>
        </div>
      </main>
      {tooltipProps && (
        <Tooltip 
          show={page === 3 || page === 4}
          link={tooltipProps.link}
          projectName={tooltipProps.projectName}
        />
      )}
    </>
  );
};
