import { useAtom } from "jotai";
import { Page } from "./Pages/Page";
import { pageAtom, pages } from "./UI";
import { useEffect, useState } from "react";

export const Book = ({ ...props }) => {
  const [page] = useAtom(pageAtom);
  const [delayedPage, setDelayedPage] = useState(page);

  useEffect(() => {
    // Don't animate if already at target page
    if (page === delayedPage) return;
    
    // Calculate animation speed based on distance
    const animationSpeed = Math.abs(page - delayedPage) > 2 ? 50 : 150;
    
    // Create timeout for the animation
    const timeout = setTimeout(() => {
      // Move one page at a time toward target
      if (page > delayedPage) {
        setDelayedPage(prev => prev + 1);
      } else if (page < delayedPage) {
        setDelayedPage(prev => prev - 1);
      }
    }, animationSpeed);
    
    // Cleanup
    return () => clearTimeout(timeout);
  }, [page, delayedPage]); // Include delayedPage in dependencies

  return (
    <group {...props}>
      {pages.map((pageData, index) => (
        <Page
          key={index}
          number={index}
          front={pageData.front}
          back={pageData.back}
          page={delayedPage}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === pages.length}
          {...pageData}
        />
      ))}
    </group>
  );
};