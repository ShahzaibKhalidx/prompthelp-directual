import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function StylesFilterModal({ isOpen, onClose, selectedStyles, onSelection, styleOptions }) {


    const [selected, setSelected] = useState(selectedStyles);

    const handleStyleClick = (style) => {
      if (selected.includes(style)) {
        // Remove the style if it's already selected
        setSelected((prevSelected) => prevSelected.filter((s) => s !== style));
      } else {
        // Add the style if it's not selected
        setSelected((prevSelected) => [...prevSelected, style]);
      }
    };

    const handleSave = () => {
        onSelection(selected);
        onClose();
      };

    return (
        <Transition.Root show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
          {/* ... (rest of the code remains the same) */}
          <div className="mt-2">
            <div className="grid grid-cols-2 gap-4">
              {/* Render your styles options here */}
              {styleOptions.map((style) => (
                <label
                  key={style}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => handleStyleClick(style)}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={selected.includes(style)}
                    readOnly
                  />
                  <span className="text-gray-900">{style}</span>
                </label>
              ))}
            </div>
          </div>
          {/* ... (rest of the code remains the same) */}
        </Dialog>
      </Transition.Root>
    );
}

export default StylesFilterModal;
