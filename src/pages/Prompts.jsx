import React, { useState } from "react";
import copy from "clipboard-copy";
import { useAuth } from "../auth";
import { ImFilePicture } from "react-icons/im";
import {GiLightBulb} from 'react-icons/gi'
import {AiFillCamera} from 'react-icons/ai'
import {FaPaintBrush} from 'react-icons/fa'
import {IoColorPaletteOutline} from 'react-icons/io5'
import {ImHome} from 'react-icons/im'
import { Tooltip } from "react-tooltip";

function Prompts() {
  const tags = [
    {
      title: "Styles",
      icon: <ImFilePicture className="w-8 h-8" />,
    },
    {
      title: "Lightening",
      icon: <GiLightBulb className="w-8 h-8" />,
    },
    {
      title: "Camera",
      icon: <AiFillCamera className="w-8 h-8" />,
    },
    {
      title: "Artists",
      icon: <FaPaintBrush className="w-8 h-8" />,
    },
    {
      title: "Colors",
      icon: <IoColorPaletteOutline className="w-8 h-8" />,
    },
    {
      title: "Materials",
      icon: <ImHome className="w-8 h-8" />,
    },
  ];
  const [prompt, setPrompt] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const filtersData = {
    Aspect: ["1:1", "5:4", "3:2", "7:4", "16:9", "2:1", "9:6", "1:2"],
    Version: ["5.2", "5.1", "5", "4", "3", "2", "1", "niji"],
    Quality: [".25", ".5", "1"],
    Tile: ["no", "yes"],
    Exclude: "",
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
    Aspect:
      "Change the Aspect Ratio (width-to-height ratio) of the generated image. Default is 1:1",
    Version: "Specify the Midjourney model to use. Default is 5.2",
    Quality:
      "Decide how much time is spent generating an image (higher number, higher quality). Defualt is 1",
    Tile: "Generate images that can be used as repeating tiles to create seamless patterns for fabrics, wallpapers and textures.",
    Exclude: "Tell the Midjourney Bot what not to include in your image",
    Stylize:
      "Low values will closely match the prompt but are less artistic. High value will be very artictic but less connected to the prompt. Default is 100",
    Chaos:
      "Influence how how varied your image grid will be. Higher chaos means more unusual and unexpected results. Default is 0",
    Stopped:
      "Create Blurrier, less detailed results by stopping your job partway through. Default is 100",
    Repeat: "Run your prompt multiple times",
    Weird:
      "Introduce quirky and offbeat qualities to your images, resulting in unique and unexpexted outcomes. Defualt is 0",
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

        if (filterName === "Exclude") {
          generated += ` --no ${filterValue}`;
        } else if (filterValue !== 0 && filterValue !== "") {
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
      console.error("Failed to copy to clipboard:", error);
    }
  };
  const authContext = useAuth();
  return (
    <div className="bg-zinc-100 min-h-screen flex items-center justify-center">
      <div className="w-full md:w-9/12 p-6 text-gray-800">
        <h1 className="text-4xl font-bold text-grey-900 uppercase text-center">
          Midjourney Prompt Helper
        </h1>
        <p className="text-center p-4 mb-4">
          NEW: Save your prompts for later use. Give it a try below ⬇️
        </p>
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
          <div className="bg-zinc-200 p-4 border rounded">
            /imagine prompt: {generatedPrompt}
          </div>
          {copySuccess && (
            <p className="text-green-600 mt-2 text-center">
              Copied to clipboard!
            </p>
          )}
        </div>
        {/* Buttons */}
        <div className="m-4 flex justify-center">
          <button
            className="bg-blue-700 text-white hover:hover:bg-blue-900 rounded-2xl p-2 w-52"
            onClick={handleCopyToClipboard}
          >
            {" "}
            Copy Prompt{" "}
          </button>
          {authContext.isAutorised() && (
            <li>
              <button
                className="bg-emerald-500 text-white hover:hover:bg-emerald-600 rounded-2xl p-2 w-52"
                onClick=""
              >
                {" "}
                Save to My Prompts
              </button>
            </li>
          )}
        </div>
        <div className="md:flex md:flex-wrap bg-white pb-[1%] p-6 rounded-lg shadow-lg">
          {Object.keys(filtersData).map((filterName) => (
            <div className="mb-4 w-full md:w-1/6 md:pr-2" key={filterName}>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={filterName}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={filterTooltips[filterName]}
              >
                {filterName}:
              </label>
              {typeof filtersData[filterName] === "string" ? (
                <input
                  type="text"
                  id={filterName}
                  className="w-full p-2 border rounded outline-0"
                  value={selectedFilters[filterName] || ""}
                  onChange={(e) =>
                    handleFilterChange(filterName, e.target.value)
                  }
                  placeholder={
                    filterPlaceholders[filterName] || filtersData[filterName]
                  }
                />
              ) : Array.isArray(filtersData[filterName]) ? (
                <select
                  id={filterName}
                  className="w-full p-2 border rounded outline-0"
                  value={selectedFilters[filterName] || ""}
                  onChange={(e) =>
                    handleFilterChange(filterName, e.target.value)
                  }
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
                  value={selectedFilters[filterName] || ""}
                  onChange={(e) =>
                    handleFilterChange(filterName, e.target.value)
                  }
                  min="0"
                  max="50"
                  placeholder={
                    filterPlaceholders[filterName] || filtersData[filterName]
                  }
                />
              )}
            </div>
          ))}

          <Tooltip
            id="my-tooltip"
            events={["hover"]}
            style={{
              backgroundColor: "#d7d2e7ef",
              color: "#333",
              maxWidth: "180px",
              fontSize: "11px",
            }}
          />

          <div className="mt-[3%] w-full flex justify-center space-x-[1%]">
            {tags.map((item, index) => {
              return (
                <div className="bg-blue-100 py-[1%] space-x-[5%] rounded-2xl flex w-[15%] justify-center cursor-pointer" >
                  {item.icon}
                  <p className="text-blue-700 text-xl pt-[2%] font-sm">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="w-full flex mt-[3%]  justify-center bg--black">
          <div className="flex justify-center rounded-lg cursor-pointer bg-green-600  text-white w-[40%] py-[1%]"><IoColorPaletteOutline className="w-8 h-8"/><p className="text-2xl pt-[2]">Upload Inpirational Image</p></div>
          </div>
          <div className="w-full flex mt-[3%]  justify-center bg--black">
          <div className="flex justify-center rounded-2xl cursor-pointer bg-blue-700 text-white w-[15%] py-[1%]"><p className="text-2xl pt-[2]">All Clear</p></div>
          </div>
        </div>
        <div className="md:flex md:flex-wrap bg-white p-6 rounded-lg shadow-lg mt-[4%] text-xl space-y-[3%] font-thin pb-[2%]">
            <h1 className="text-4xl">How to Use the Midjourney Prompt Helper</h1>
            <p>Midjourney’s AI-powered image generation bot is incredibly powerful. But unless you have a photographic memory, it can be really hard to remember all of the parameters and styling options the Midjourney bot supports! That's where this prompt helper comes in handy</p>
            <p>Start by typing the main concept for your image. Then set any parameters (like aspect ratio to change your image dimensions, or chaos to increase variation) you'd like the Midjourney bot to follow. From there, you can apply some of our style presets and "weight" parts of your prompt (Midjourney will strongly follow a weighting of 5, and lightly consider a weighting of 1).</p>
            <p>Once you've got your prompt dialed in, copy it to your clipboard and run it in Midjourney. Be sure to save it to your PromptFolder account so you can come back to it later!</p>


            <h1 className="text-4xl">What is Midjourney?</h1>
            <p>Midjourney’s AI-powered image generation bot is incredibly powerful. But unless you have a photographic memory, it can be really hard to remember all of the parameters and styling options the Midjourney bot supports! That's where this prompt helper comes in handy</p>
        </div>
      </div>
    </div>
  );
}

export default Prompts;
