import React, { Fragment, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { Range, getTrackBackground } from 'react-range'; // Import from react-range

function Lighting({ isOpen, closeModal, title, options, setSelectedModalValues }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [rangeSelection, setRangeSelection] = useState(null);

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
    setSelectedModalValues(selectedOptions);
  };

  const renderRangeSelectors = () => {
    if (rangeSelection !== null) {
      return (
        <div>
          {rangeSelection.map((option) => (
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

  const closeAndShowRanges = () => {
    setRangeSelection(Object.keys(selectedOptions));
    closeModal();
  };

  // Define the RangeBar component
  const RangeBar = () => {
    const STEP = 0.1;
    const MIN = 0;
    const MAX = 5;

    const [values, setValues] = useState([5]);

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: '2em',
        }}
      >
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(newValues) => setValues(newValues)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%',
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '5px',
                  width: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values,
                    colors: ['#548BF4', '#ccc'],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: 'center',
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '42px',
                width: '42px',
                borderRadius: '4px',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
              }}
            >
              <div
                style={{
                  height: '16px',
                  width: '5px',
                  backgroundColor: isDragged ? '#548BF4' : '#CCC',
                }}
              />
            </div>
          )}
        />
        <output style={{ marginTop: '30px' }}>
          {values[0].toFixed(1)}
        </output>
      </div>
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                        selectedOptions[option] ? 'bg-blue-100' : 'bg-white'
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
    </Transition>
  );
}

export default Lighting;
