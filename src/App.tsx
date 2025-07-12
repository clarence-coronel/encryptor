import { useState } from "react";
import { MODE } from "./constants/mode";
import Encrypt from "./components/encrypt";
import Decrypt from "./components/decrypt";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [mode, setMode] = useState<MODE>(MODE.ENCRYPT);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-start pt-[10vh]">
        <div className="max-w-xl w-full flex flex-col justify-center items-end">
          <div className="bg-white flex p-2 pb-0 rounded-2xl rounded-b-none">
            <button
              className={`${
                mode != MODE.ENCRYPT && "bg-gray-300"
              } rounded-lg rounded-r-none rounded-b-none`}
              disabled={mode === MODE.ENCRYPT}
              onClick={() => setMode(MODE.ENCRYPT)}
            >
              Encrypt
            </button>
            <button
              className={`${
                mode != MODE.DECRYPT && "bg-gray-300"
              } rounded-lg rounded-l-none rounded-b-none`}
              disabled={mode === MODE.DECRYPT}
              onClick={() => setMode(MODE.DECRYPT)}
            >
              Decrypt
            </button>
          </div>
          <div className="relative bg-white w-full rounded-2xl p-4 rounded-tr-none">
            {mode === MODE.ENCRYPT ? <Encrypt /> : <Decrypt />}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
