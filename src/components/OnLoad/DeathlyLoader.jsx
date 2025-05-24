import { BASE_URL } from "../constants/constants";


export default function DeathlyLoader() {

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="relative w-[300px] h-[200px] flex justify-center items-center">
        {/* Triangle */}
        <img
          src={`${BASE_URL}svgs/Triangle.svg`}
          alt="Triangle"
          className="absolute w-[200px] h-[200px] opacity-0 animate-fade-in-triangle"
        />

        {/* Circle */}
        <img
          src={`${BASE_URL}svgs/Circle.svg`}
          alt="Circle"
          className="absolute w-[200px] h-[200px] opacity-0 animate-fade-in-circle"
        />

        {/* Wand */}
        <img
          src={`${BASE_URL}svgs/Wand.svg`}
          alt="Wand"
          className="absolute w-[200px] h-[200px] opacity-0 animate-fade-in-wand"
        />
      </div>

      {/* Lumos Text */}
      <div className="mt-6 flex gap-2 text-white text-xl lumos-text lg:text-3xl xl:text-4xl">
  <span className="word word-1">I</span>
  <span className="word word-2">open</span>
  <span className="word word-3">at</span>
  <span className="word word-4">the</span>
  <span className="word word-5">close</span>
</div>

    </div>
  );
}
