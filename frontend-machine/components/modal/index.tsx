import React from "react";
import useClickOutside from "@/frontend-machine/hooks/useClickOutside";
import { on } from "events";
interface ModalProps {
  open: boolean;
  onClose: () => void;
}
const index = ({ open, onClose }: ModalProps) => {
    const ref = useClickOutside(onClose);//

  return (
    <>
      {open && (
        <div ref={ref} className="fixed inset-0  z-50 flex items-center bg-opacity-50 justify-center  bg-black/50">
          <div className="bg-blue-500 relative p-4 flex flex-col items-center gap-2">
            <div onClick={onClose} className="absolute cursor-pointer right-5">
              X
            </div>
            <h2 className="">Modal Title</h2>
            <p>Hey Modal is Opened</p>
            <button className="cursor-pointer" onClick={onClose}>Close </button>
          </div>

        </div>
       
      )}
    </>
  );
};

export default index;

// {open && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//     <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-xl">
//       <h2 className="text-lg font-semibold">Modal Title</h2>

//       <p className="mt-2 text-sm text-gray-600">
//         This modal is perfectly centered.
//       </p>

//       <button
//         onClick={() => setOpen(false)}
//         className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}
