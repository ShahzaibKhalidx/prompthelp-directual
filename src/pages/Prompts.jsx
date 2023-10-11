import React, { useState, Fragment } from 'react';
import copy from 'clipboard-copy';
import { useAuth } from '../auth'
import { Tooltip } from 'react-tooltip';
import { Dialog, Transition } from '@headlessui/react'
import Lighting from '../components/modals/Lighting';

function Prompts() {
    const [prompt, setPrompt] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({});
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    let [isOpen, setIsOpen] = useState(true)
    const [selectedModalValues, setSelectedModalValues] = useState([]);


    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const filtersData = {
        Aspect: ['1:1', '5:4', '3:2', '7:4', '16:9', '2:1', '9:6', '1:2'],
        Version: ['5.2', '5.1', '5', '4', '3', '2', '1', 'niji'],
        Quality: ['.25', '.5', '1'],
        Tile: ['no', 'yes'],
        Exclude: '',
        Stylize: 0,
        Chaos: 0,
        Stopped: 0,
        Repeat: 0,
        Weird: 0,
        Seed: 0,
    };

    // Create an object to hold dummy placeholders
    const filterPlaceholders = {
        Stylize: "0 to 1000",
        Chaos: "0 to 100",
        Stopped: "10 to 100",
        Repeat: "20 to 40",
        Weird: "0 to 3000",
        Seed: "0 to 4294967295",
        Exclude: "Avoid these terms",
    };

    // Create an object to hold tooltip information for each filter
    const filterTooltips = {
        Aspect: "Change the Aspect Ratio (width-to-height ratio) of the generated image. Default is 1:1",
        Version: "Specify the Midjourney model to use. Default is 5.2",
        Quality: "Decide how much time is spent generating an image (higher number, higher quality). Defualt is 1",
        Tile: "Generate images that can be used as repeating tiles to create seamless patterns for fabrics, wallpapers and textures.",
        Exclude: "Tell the Midjourney Bot what not to include in your image",
        Stylize: "Low values will closely match the prompt but are less artistic. High value will be very artictic but less connected to the prompt. Default is 100",
        Chaos: "Influence how how varied your image grid will be. Higher chaos means more unusual and unexpected results. Default is 0",
        Stopped: "Create Blurrier, less detailed results by stopping your job partway through. Default is 100",
        Repeat: "Run your prompt multiple times",
        Weird: "Introduce quirky and offbeat qualities to your images, resulting in unique and unexpexted outcomes. Defualt is 0",
        Seed: "If you use the same seed number and prompt, you will get similar final images. Defualt is random.",
    };

    // NEW Filter Modals
    const filterModalOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];




    const handlePromptChange = (e) => {
        const newText = e.target.value;
        setPrompt(newText);
        updateGeneratedPrompt(newText, selectedFilters);
    };

    const handleFilterChange = (filterName, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
        updateGeneratedPrompt(prompt, { ...selectedFilters, [filterName]: value });
    };

    const updateGeneratedPrompt = (text, filters) => {
        let generated = text;

        for (const filterName in filters) {
            if (filters.hasOwnProperty(filterName)) {
                const filterValue = filters[filterName];

                if (filterName === 'Exclude') {
                    generated += ` --no ${filterValue}`;
                } else if (filterValue !== 0 && filterValue !== '') {
                    if (Array.isArray(filtersData[filterName])) {
                        generated += ` --${filterName.toLocaleLowerCase()} ${filterValue}`;
                    } else {
                        generated += ` --${filterName.toLocaleLowerCase()} ${filterValue}`;
                    }
                }
            }
        }
        if (selectedModalValues.length > 0) {
            generated += ` --lighting:: ${selectedModalValues.join(',')}`;
        }

        setGeneratedPrompt(generated);
    };

    const handleCopyToClipboard = async () => {
        try {
            await copy("/imagine prompt: " + generatedPrompt);
            setCopySuccess(true);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };
    const authContext = useAuth();
    return (
        <div className='bg-zinc-100 min-h-screen flex items-center justify-center'>
            <div className="w-full md:w-9/12 p-6 text-gray-800">
                <h1 className="text-4xl font-bold text-grey-900 uppercase text-center">Midjourney Prompt Helper</h1>
                <p className='text-center p-4 mb-4'>NEW: Save your prompts for later use. Give it a try below ⬇️</p>
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
                        Enter your prompt:
                    </label> */}
                    <textarea
                        id="prompt"
                        placeholder="Start typing your idea..."
                        className="w-full p-4 rounded shadow placeholder-slate-400 outline-0"
                        value={prompt}
                        onChange={handlePromptChange}
                    />
                </div>
                <div className="my-4">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2">Generated Prompt:</label> */}
                    <div className="bg-zinc-200 p-4 border rounded">/imagine prompt: {generatedPrompt}</div>
                    {copySuccess && <p className="text-green-600 mt-2 text-center">Copied to clipboard!</p>}
                </div>
                {/* Buttons */}
                <div className="m-4 flex justify-center">
                    <button
                        className="bg-blue-700 text-white hover:hover:bg-blue-900 rounded-2xl p-2 w-52"
                        onClick={handleCopyToClipboard}> Copy Prompt </button>
                    {authContext.isAutorised() && <li>
                        <button
                            className="bg-emerald-500 text-white hover:hover:bg-emerald-600 rounded-2xl p-2 w-52"
                            onClick=''> Save to My Prompts
                        </button>
                    </li>}
                </div>
                <div className='bg-white p-6 rounded-lg shadow-lg'>
                <div className="md:flex md:flex-wrap">
                    {Object.keys(filtersData).map((filterName) => (
                        <div className="mb-4 w-full md:w-1/6 md:pr-2" key={filterName}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={filterName}
                                data-tooltip-id="my-tooltip" data-tooltip-content={filterTooltips[filterName]}>
                                {filterName}:
                            </label>
                            {typeof filtersData[filterName] === 'string' ? (
                                <input
                                    type="text"
                                    id={filterName}
                                    className="w-full p-2 border rounded outline-0"
                                    value={selectedFilters[filterName] || ''}
                                    onChange={(e) => handleFilterChange(filterName, e.target.value)}
                                    placeholder={filterPlaceholders[filterName] || filtersData[filterName]}
                                />
                            ) : Array.isArray(filtersData[filterName]) ? (
                                <select
                                    id={filterName}
                                    className="w-full p-2 border rounded outline-0"
                                    value={selectedFilters[filterName] || ''}
                                    onChange={(e) => handleFilterChange(filterName, e.target.value)}
                                >
                                    <option value="">---</option>
                                    {filtersData[filterName].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="number"
                                    id={filterName}
                                    className="w-full p-2 border rounded outline-0"
                                    value={selectedFilters[filterName] || ''}
                                    onChange={(e) => handleFilterChange(filterName, e.target.value)}
                                    min="0"
                                    max="50"
                                    placeholder={filterPlaceholders[filterName] || filtersData[filterName]}
                                />
                            )}
                        </div>
                    ))}
                    <Tooltip
                        id="my-tooltip"
                        events={['hover']}
                        style={{
                            backgroundColor: "#d7d2e7ef", color: "#333", maxWidth: "180px",
                            fontSize: "11px"
                        }}
                    />
                    </div>
                    <div className='flex items-center justify-center'>
                    {/* Popup */}
                    <div className="inset-0 flex items-center justify-center">
                        <button
                            type="button"
                            onClick={openModal}
                            className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                            Lighting
                        </button>
                    </div>

                    <div className="inset-0 flex items-center justify-center">
                        <button
                            type="button"
                            onClick={openModal}
                            className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                            Styles
                        </button>
                    </div>

                    <div className="inset-0 flex items-center justify-center">
                        <button
                            type="button"
                            onClick={openModal}
                            className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                            Camera
                        </button>
                    </div>
                    </div>
                </div>
                    {/* <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                                Payment successful
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Your payment has been successfully submitted. We’ve sent
                                                    you an email with all of the details of your order.
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Got it, thanks!
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition> */}

                    <Lighting
                        isOpen={isOpen}
                        closeModal={closeModal}
                        title="Lighting"
                        content="Select Any Modal"
                        options={filterModalOptions}
                        setSelectedModalValues={setSelectedModalValues}
                    />
                </div>

            </div>
    );
}

export default Prompts;