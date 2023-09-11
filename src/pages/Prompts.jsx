import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useAuth } from '../auth'
import { Tooltip } from 'react-tooltip';

function Prompts() {
    const [prompt, setPrompt] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({});
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

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
        <div className='bg-white min-h-screen flex items-center justify-center'>
            <div className="w-full md:w-2/3 bg-indigo-100 p-6 rounded-lg shadow-lg bg-darkcream text-gray-800">
                <h1 className="text-4xl font-bold mb-4 text-violet-900 uppercase text-center p-4">Midjourney Prompt Helper</h1>
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
                        Enter your prompt:
                    </label> */}
                    <textarea
                        id="prompt"
                        placeholder="Start typing your idea..."
                        className="w-full p-2 rounded shadow placeholder-slate-400 outline-0"
                        value={prompt}
                        onChange={handlePromptChange}
                    />
                </div>
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
                        style={{ backgroundColor: "#d7d2e7ef", color: "#333", maxWidth:"180px",
                        fontSize:"11px" }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Generated Prompt:</label>
                    <div className="bg-gray-100 p-2 border rounded">/imagine prompt: {generatedPrompt}</div>
                    {copySuccess && <p className="text-green-600 mt-2 text-center">Copied to clipboard!</p>}
                </div>
                <div className="m-4 flex justify-center">
                    <button
                        className="bg-violet-100 text-violet-900 py-2 px-4 m-2 rounded hover:bg-violet-200"
                        onClick={handleCopyToClipboard}> Copy Prompt </button>

                    {authContext.isAutorised() && <li>
                        <button
                            className="bg-violet-900 text-violet-100 py-2 px-4 m-2 rounded hover:bg-violet-200 hover:text-violet-900"
                            onClick=''> Save to My Prompts
                        </button>
                    </li>}
                </div>
            </div>
        </div>
    );
}

export default Prompts;
