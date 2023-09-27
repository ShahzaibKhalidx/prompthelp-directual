import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function FilterModal({ isOpen, onClose, title, children }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="inline-block align-middle min-w-full p-8 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
            <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
              {title}
            </Dialog.Title>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
