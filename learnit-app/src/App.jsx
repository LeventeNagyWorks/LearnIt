/* eslint-disable no-unused-vars */

import Wave from './assets/wave.svg';

//bg-[url('./images/white.png')]
function App() {

  return (
    <>
      <div className="h-screen w-screen flex justify-end items-center bg-[url('./images/dark_laptop_fixed.png')] bg-center bg-cover overflow-hidden">

        <div className="w-[60%] h-full flex flex-col justify-between items-center px-28 py-36">

          <div className="flex flex-col justify-between gap-5">
            <h1 className="text-white text-9xl mb-14 select-none">Learn <span className="text-accent_purple_dark">It</span></h1>
            <p className="text-white text-7xl select-none">Learn everything you want.</p>
            <p className="text-white text-5xl select-none">Let me help you.</p>
          </div>

          <button className="w-fit text-accent_purple_dark hover:text-slate-950 font-medium hover:bg-accent_purple_dark text-3xl border-2 border-accent_purple_dark rounded-xl px-12 py-2 duration-700 select-none">Getting Started</button>

        </div>
        
      </div>
    </>
  )
}

export default App
