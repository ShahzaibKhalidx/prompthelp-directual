import React, { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { GrClose } from "react-icons/gr";

function Artists({
  openArtistsModal,
    closeArtistsModal,
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
    closeArtistsModal();
  };
  // Define the RangeBar component
  const RangeBar = () => {
    const STEP = 0.1;
    const MIN = 0;
    const MAX = 5;

    const [values, setValues] = useState([5]);
  };
  return (
    <Transition appaear show={true} as={Fragment}>
      {/* <div style={{overflow:"auto"}}> */}
      <Dialog as="div" className="relative z-10" onClose={closeAndShowRanges}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-70 " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 bg-black bg-opacity-20  ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* close button */}
                <button
                  onClick={closeArtistsModal}
                  className="absolute top-2 right-4 p-1 bg-white hover:bg-red-300">
                  <GrClose />
                </button>
                {/* title */}
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900 mb-4 mx-auto">
                  {title}
                </Dialog.Title>
                {/* Scrollable Content Area */}
                <div className="overflow-y-auto max-h-[400px]">
                  {/* Content */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-2 cursor-pointer border rounded ${
                          selectedOptions[option.name]
                            ? "bg-blue-200"
                            : "bg-white"
                        }`}
                        onClick={() => toggleOption(option.name)}>
                        <img src={option?.image} alt={option?.name} />
                        {option?.name}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Sticky Continue Button */}
                <div className="sticky bottom-0 p-4 bg-white">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-black hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeAndShowRanges}>
                    Continue
                  </button>
                </div>
                {renderRangeSelectors()}
                <RangeBar /> {/* RangeBar component */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </Transition>
  );
}

export default Artists;
