import React, { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Range, getTrackBackground } from "react-range"; // Import from react-range

function Lighting({
  isOpen,
  closeModal,
  title,
  options,
  setSelectedModalValues,
}) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [rangeSelection, setRangeSelection] = useState(null);
  const [rangeValues, setRangeValues] = useState({}); // Object to hold range values

  const toggleOption = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions[option]) {
        const updatedOptions = { ...prevSelectedOptions };
        delete updatedOptions[option];
        return updatedOptions;
      } else {
        return { ...prevSelectedOptions, [option]: 1 };
      }
    });
  };

  const renderRangeSelectors = () => {
    if (Object.keys(selectedOptions).length > 0) {
      return (
        <div>
          {Object.keys(selectedOptions).map((option) => (
            <div key={option}>
              <p>{option}:</p>
              <input
                type="range"
                min={1}
                max={5}
                value={selectedOptions[option] || 1}
                onChange={(e) => handleRangeChange(option, e.target.value)}
              />
              <span>{selectedOptions[option] || 1}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleRangeChange = (option, value) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [option]: parseInt(value),
    }));
  };

  // const closeAndShowRanges = () => {
  //   setRangeSelection(Object.keys(selectedOptions));
  //   closeModal();
  // };
  const closeAndShowRanges = () => {
    setSelectedModalValues({ ...selectedOptions, ...rangeValues }); // Combine options and range values
    closeModal();
  };
  // Define the RangeBar component
  const RangeBar = () => {
    const STEP = 0.1;
    const MIN = 0;
    const MAX = 5;

    const [values, setValues] = useState([5]);
  };

  return (
    <Transition appaear show={isOpen} as={Fragment}>
      {/* <div style={{overflow:"auto"}}> */}
      <Dialog as="div" className="relative z-10" onClose={closeAndShowRanges}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {options.map((option) => (
                    <div
                      key={option}
                      className={`border p-4 cursor-pointer ${
                        selectedOptions[option] ? "bg-blue-100" : "bg-white"
                      }`}
                      onClick={() => toggleOption(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeAndShowRanges}
                  >
                    Click
                  </button>
                </div>
                {renderRangeSelectors()}
                <RangeBar /> {/* Add the RangeBar component here */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </Transition>
  );
}

export default Lighting;
