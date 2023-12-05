import {
  React,
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import { useAuth } from "../auth";
import { Tooltip } from "react-tooltip";

import Lighting from "../components/modals/Lighting";
import Camera from "../components/modals/Camera";
import Styles from "../components/modals/Styles";
import Artists from "../components/modals/Artists";
import Colors from "../components/modals/Colors";
import Materials from "../components/modals/Materials";

import {
  FaRegLightbulb,
  FaPhotoVideo,
  FaCamera,
  FaPaintBrush,
  FaHome,
  FaPalette,
} from "react-icons/fa";

// lighting images
import LightingOne from "../assets/01-lighting.jpg";
import Lighting2 from "../assets/02-lighting.jpg";
import Lighting3 from "../assets/03-lighting.jpg";
import Lighting4 from "../assets/04-lighting.jpg";
import Lighting5 from "../assets/05-lighting.jpg";
import Lighting6 from "../assets/06-lighting.jpg";
import Lighting7 from "../assets/07-lighting.jpg";
import Lighting8 from "../assets/08-lighting.jpg";
import Lighting9 from "../assets/09-lighting.jpg";
import Lighting10 from "../assets/10-lighting.jpg";
import Lighting11 from "../assets/11-lighting.jpg";
import Lighting12 from "../assets/12-lighting.jpg";
import Lighting13 from "../assets/13-lighting.jpg";
import Lighting14 from "../assets/14-lighting.jpg";
import Lighting15 from "../assets/15-lighting.jpg";
import Lighting16 from "../assets/16-lighting.jpg";
import Lighting17 from "../assets/17-lighting.jpg";
import Lighting18 from "../assets/18-lighting.jpg";
import Lighting19 from "../assets/19-lighting.jpg";
import Lighting20 from "../assets/20-lighting.jpg";
import Lighting21 from "../assets/21-lighting.jpg";
import Lighting22 from "../assets/22-lighting.jpg";
import Lighting23 from "../assets/23-lighting.jpg";
import Lighting24 from "../assets/24-lighting.jpg";
import Lighting25 from "../assets/25-lighting.jpg";
import Lighting26 from "../assets/26-lighting.jpg";
import Lighting27 from "../assets/27-lighting.jpg";

// Style Images
import Style1 from "../assets/Style/Style1.jpg";
import Style2 from "../assets/Style/Style2.jpg";
import Style3 from "../assets/Style/Style3.jpg";
import Style4 from "../assets/Style/Style4.jpg";
import Style5 from "../assets/Style/Style5.jpg";
import Style6 from "../assets/Style/Style6.jpg";
import Style7 from "../assets/Style/Style7.jpg";
import Style8 from "../assets/Style/Style8.jpg";
import Style9 from "../assets/Style/Style9.jpg";
import Style10 from "../assets/Style/Style10.jpg";
import Style11 from "../assets/Style/Style11.jpg";
import Style12 from "../assets/Style/Style12.jpg";
import Style13 from "../assets/Style/Style13.jpg";
import Style14 from "../assets/Style/Style14.jpg";
import Style15 from "../assets/Style/Style15.jpg";
import Style16 from "../assets/Style/Style16.jpg";
import Style17 from "../assets/Style/Style17.jpg";
import Style18 from "../assets/Style/Style18.jpg";
import Style19 from "../assets/Style/Style19.jpg";
import Style20 from "../assets/Style/Style20.jpg";
import Style21 from "../assets/Style/Style21.jpg";
import Style22 from "../assets/Style/Style22.jpg";
import Style23 from "../assets/Style/Style23.jpg";
import Style24 from "../assets/Style/Style24.jpg";
import Style25 from "../assets/Style/Style25.jpg";
import Style26 from "../assets/Style/Style26.jpg";
import Style27 from "../assets/Style/Style27.jpg";
import Style28 from "../assets/Style/Style28.jpg";
import Style29 from "../assets/Style/Style29.jpg";
import Style30 from "../assets/Style/Style30.jpg";
import Style31 from "../assets/Style/Style31.jpg";
import Style32 from "../assets/Style/Style32.jpg";
import Style33 from "../assets/Style/Style33.jpg";
import Style34 from "../assets/Style/Style34.jpg";
import Style35 from "../assets/Style/Style35.jpg";
import Style36 from "../assets/Style/Style36.jpg";
import Style37 from "../assets/Style/Style37.jpg";
import Style38 from "../assets/Style/Style38.jpg";
import Style39 from "../assets/Style/Style39.jpg";
import Style40 from "../assets/Style/Style40.jpg";
import Style41 from "../assets/Style/Style41.jpg";
import Style42 from "../assets/Style/Style42.jpg";
import Style43 from "../assets/Style/Style43.jpg";
import Style44 from "../assets/Style/Style44.jpg";
import Style45 from "../assets/Style/Style45.jpg";
import Style46 from "../assets/Style/Style46.jpg";
import Style47 from "../assets/Style/Style47.jpg";
import Style48 from "../assets/Style/Style48.jpg";
import Style49 from "../assets/Style/Style49.jpg";
import Style50 from "../assets/Style/Style50.jpg";
import Style51 from "../assets/Style/Style51.jpg";
import Style52 from "../assets/Style/Style52.jpg";
import Style53 from "../assets/Style/Style53.jpg";
import Style54 from "../assets/Style/Style54.jpg";
import Style55 from "../assets/Style/Style55.jpg";
import Style56 from "../assets/Style/Style56.jpg";
import Style57 from "../assets/Style/Style57.jpg";
import Style58 from "../assets/Style/Style58.jpg";
import Style59 from "../assets/Style/Style59.jpg";
import Style60 from "../assets/Style/Style60.jpg";
import Style61 from "../assets/Style/Style61.jpg";
import Style62 from "../assets/Style/Style62.jpg";
import Style63 from "../assets/Style/Style63.jpg";
import Style64 from "../assets/Style/Style64.jpg";
import Style65 from "../assets/Style/Style65.jpg";

const GeneratedPromptsContext = createContext();

export function useGeneratedPrompts() {
  return useContext(GeneratedPromptsContext);
}

export function GeneratedPromptsProvider({ children }) {
  const [generatedPrompts, setGeneratedPrompts] = useState([]);

  const saveGeneratedPrompt = (prompt) => {
    setGeneratedPrompts([...generatedPrompts, prompt]);
  };

  return (
    <GeneratedPromptsContext.Provider
      value={{ generatedPrompts, saveGeneratedPrompt }}>
      {children}
    </GeneratedPromptsContext.Provider>
  );
}

function Prompts() {
  const [prompt, setPrompt] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedModalValues, setSelectedModalValues] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const divRef = useRef(null);

  // buttons modal
  let [islighting, setlighting] = useState(false);
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [isStylesOpen, setStylesOpen] = useState(false);
  const [isArtistsOpen, setArtistsOpen] = useState(false);
  const [isColorsOpen, setColorsOpen] = useState(false);
  const [isMaterialsOpen, setMaterialsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openModal = () => {
    setlighting(true);
  };

  const openCameraModal = () => {
    setCameraOpen(true);
  };

  const openStylesModal = () => {
    setStylesOpen(true);
  };
  const openArtistsModal = () => {
    setArtistsOpen(true);
  };
  const openColorsModal = () => {
    setColorsOpen(true);
  };
  const openMaterialsModal = () => {
    setMaterialsOpen(true);
  };

  const closeModal = () => {
    setlighting(false);
  };

  const closeCameraModal = () => {
    setCameraOpen(false);
  };
  const closeStylesModal = () => {
    setStylesOpen(false);
  };
  const closeArtistsModal = () => {
    setArtistsOpen(false);
  };
  const closeColorsModal = () => {
    setColorsOpen(false);
  };
  const closeMaterialsModal = () => {
    setMaterialsOpen(false);
  };

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

  // Convert a filter name to a CSS variable name

  const transformedKeys = [""];

  for (const key in filtersData) {
    if (Object.hasOwnProperty.call(filtersData, key)) {
      transformedKeys.push(`--${key.toLowerCase()}`);
    }
  }

  console.log(transformedKeys); // const transformedKeys = [''];

  for (const key in filtersData) {
    if (Object.hasOwnProperty.call(filtersData, key)) {
      transformedKeys.push(`--${key.toLowerCase()}`);
    }
  }

  console.log(transformedKeys);

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

  // print the generated prompt to the console

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    // Update generated prompt when Aspect, Version, Quality, or Tile filters change
    if (
      filterName === "Aspect" ||
      filterName === "Version" ||
      filterName === "Quality" ||
      filterName === "Tile" ||
      filterName === "Exclude" ||
      filterName === "Stylize" ||
      filterName === "Chaos" ||
      filterName === "Stopped" ||
      filterName === "Repeat" ||
      filterName === "Weird" ||
      filterName === "Seed"
    ) {
      updateGeneratedPrompt(prompt, {
        ...selectedFilters,
        [filterName]: value,
      });
    }
  };

  // Modals Start

  // Lighting Modal

  const filterModalOptions = [
    {
      name: "Accent Lighting",
      image: LightingOne,
    },
    {
      name: "Backlight",
      image: Lighting2,
    },
    {
      name: "Blacklight",
      image: Lighting3,
    },
    {
      name: "Blinding Light",
      image: Lighting4,
    },
    {
      name: "Candlelight",
      image: Lighting5,
    },
    {
      name: "Concert Lighting",
      image: Lighting6,
    },
    {
      name: "Crepuscular Rays",
      image: Lighting7,
    },
    {
      name: "Direct Sunlight",
      image: Lighting8,
    },
    {
      name: "Dusk",
      image: Lighting9,
    },
    {
      name: "Edison Bulb",
      image: Lighting10,
    },
    {
      name: "Electric Arc",
      image: Lighting11,
    },
    {
      name: "Fire",
      image: Lighting12,
    },
    {
      name: "Fluorescent",
      image: Lighting13,
    },
    {
      name: "Glowing",
      image: Lighting14,
    },
    {
      name: "Glowing Radioactively",
      image: Lighting15,
    },
    {
      name: "Glowstick",
      image: Lighting16,
    },
    {
      name: "Lava Glow",
      image: Lighting17,
    },
    {
      names: "Moonlight",
      image: Lighting18,
    },
    {
      name: "Natural Lighting",
      image: Lighting19,
    },
    {
      name: "Neon Lamp",
      image: Lighting20,
    },
    {
      name: "Nightclub Lighting",
      image: Lighting21,
    },
    {
      name: "Nuclear Waste Glow",
      image: Lighting22,
    },
    {
      name: "Quantum Dot Display",
      image: Lighting23,
    },
    {
      name: "Spotlight",
      image: Lighting24,
    },
    {
      name: "Strobe",
      image: Lighting25,
    },
    {
      name: "Sunlight",
      image: Lighting26,
    },
    {
      name: "Ultraviolet",
      image: Lighting27,
    },
  ];

  // Camera Modal

  const filterModalCameraOptions = [
    {
      name: "Accent Lighting",
      image: LightingOne,
    },
    {
      name: "Backlight",
      image: Lighting2,
    },
    {
      name: "Blinding Light",
      image: Lighting4,
    },
    {
      name: "Candlelight",
      image: Lighting5,
    },
    {
      name: "Concert Lighting",
      image: Lighting6,
    },
  ];

  // Styles Modal

  const filterModalStyle = [
    {
      name: "16-bit",
      image: Style1,
    },
    {
      name: "1800s",
      image: Style2,
    },
    {
      name: "1980s",
      image: Style3,
    },
    {
      name: "4-bit",
      image: Style4,
    },
    {
      name: "8-bit",
      image: Style5,
    },
    {
      names: "Amber",
      image: Style6,
    },
    {
      names: "Anatomical Drawing",
      image: Style7,
    },
    {
      names: "Ancient",
      image: Style8,
    },
    {
      names: "Anime",
      image: Style9,
    },
    {
      names: "Antimatter",
      image: Style10,
    },
    {
      names: "Arabic",
      image: Style11,
    },
    { names: "Blocky", image: Style12 },
    { names: "Blueprint Drawing", image: Style13 },
    { names: "Blueprint Drawing", image: Style14 },

    //
    { names: "Carbon Fiber", image: Style15 },
    { names: "Caribbean", image: Style16 },
    { names: "Cartoon", image: Style17 },
    { names: "Carved Lacquer", image: Style18 },
    { names: "Celestial", image: Style19 },
    { names: "Cellulose", image: Style20 },
    { names: "Charcoal Style", image: Style21 },
    { names: "Chromatic", image: Style22 },
    { names: "Comicbook Drawing", image: Style23 },
    { names: "Computer Chip", image: Style24 },
    { names: "Concept Art", image: Style25 },
    { names: "Coral", image: Style26 },
    { names: "Cyberpunk", image: Style27 },
    { names: "Dangerous", image: Style28 },
    { names: "Dark Matter", image: Style29 },
    { names: "Da Vinci", image: Style30 },
    { names: "Da Vinci Drawing", image: Style31 },
    { names: "Deep Sea", image: Style32 },
    { names: "Diabolic", image: Style33 },
    { names: "Diffraction Grading", image: Style34 },
    { names: "Dna", image: Style35 },
    { names: "Dots", image: Style36 },
    { names: "Dripping Paint", image: Style37 },
    { names: "Dune", image: Style38 },
    { names: "Electronic Circuitry", image: Style39 },
    { names: "Etching", image: Style40 },
    { names: "Extraterrestrial", image: Style41 },
    { names: "Fiber Optic", image: Style42 },
    { names: "Fibonacci", image: Style43 },
    { names: "Floral", image: Style44 },
    { names: "Flower Of Life", image: Style45 },
    { names: "Fossil", image: Style46 },
    { names: "Fractal", image: Style47 },
    { names: "Futuristic", image: Style48 },
    { names: "Galactic", image: Style49 },
    { names: "Gasoline", image: Style50 },
    { names: "Glass", image: Style51 },
    { names: "Glass Blowing", image: Style52 },
    { names: "Glitchart", image: Style53 },
    { names: "Gouache", image: Style54 },
    { names: "Helix", image: Style55 },
    { names: "Hell", image: Style55 },
    { names: "Higgs Boson", image: Style56 },
    { names: "Horror", image: Style57 },
    { names: "Ice Age", image: Style58 },
    { names: "Icy", image: Style59 },
    { names: "Jurassic", image: Style60 },
    { names: "Kaleidoscope", image: Style61 },
    { names: "Knitted", image: Style62 },
    { names: "Latex", image: Style63 },
    { names: "Lightspeed", image: Style64 },
    { names: "Liquid", image: Style65 },
  ];

  // Artists Modal
  const filterModalArtists = [
    {
      name: "Accent Lighting",
      image: LightingOne,
    },
    {
      name: "Backlight",
      image: Lighting2,
    },
    {
      name: "Blinding Light",
      image: Lighting4,
    },
    {
      name: "Candlelight",
      image: Lighting5,
    },
    {
      name: "Concert Lighting",
      image: Lighting6,
    },
  ];

  // Colors Modal
  const filterModalColors = [
    {
      name: "Accent Lighting",
      image: LightingOne,
    },
    {
      name: "Backlight",
      image: Lighting2,
    },
    {
      name: "Blinding Light",
      image: Lighting4,
    },
    {
      name: "Candlelight",
      image: Lighting5,
    },
    {
      name: "Concert Lighting",
      image: Lighting6,
    },
  ];

  // Materials Modal
  const filterModalMaterials = [
    {
      name: "Accent Lighting",
      image: LightingOne,
    },
    {
      name: "Backlight",
      image: Lighting2,
    },
    {
      name: "Blinding Light",
      image: Lighting4,
    },
    {
      name: "Candlelight",
      image: Lighting5,
    },
    {
      name: "Concert Lighting",
      image: Lighting6,
    },
  ];
  // Modals End

  // const images = [];
  const handlePromptChange = (e) => {
    const newText = e.target.value;
    setPrompt(newText);

    updateGeneratedPrompt(newText, selectedFilters);
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
    if (selectedModalValues.length > 0) {
      generated += ` --lighting:: ${selectedModalValues.join(",")}`;
    }
    if (filterModalOptions.length > 0) {
      const names = filterModalOptions.map((option) => option.name);
      generated += `:: ${names.join(", ")}`;
    }
    if (filterModalCameraOptions.length > 0) {
      const names = filterModalCameraOptions.map((option) => option.name);
      generated += `:: ${names.join(", ")}`;
    }
    if (filterModalStyle.length > 0) {
      const names = filterModalStyle.map((option) => option.name);
      generated += `:: ${names.join(", ")}`;
    }
    if (filterModalArtists.length > 0) {
      const names = filterModalArtists.map((option) => option.name);
      generated += `:: ${names.join(", ")}`;
    }
    if (filterModalColors.length > 0) {
      const names = filterModalColors.map((option) => option.name);
      generated += `:: ${names.join(", ")}`;
    }
    if (filterModalMaterials.length > 0) {
      const names = filterModalMaterials.map((option) => option.name);
      generated += `:: ${names.join(", ")}`;
    }
    setGeneratedPrompt(generated);
  };

  // copy to clipboard
  const handleCopyClick = () => {
    const divContent = divRef.current.innerText;
    const tempInput = document.createElement("textarea");
    tempInput.value = divContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  // Save Prompt to DB
  const handleSavePrompt = async () => {
    const summary = Object.keys(filtersData)
      .map((key) => {
        if (Array.isArray(filtersData[key])) {
          return `${key}: ${filtersData[key].join(", ")}`;
        } else {
          return `${key}: ${filtersData[key]}`;
        }
      })
      .join("\n");
  };

  const authContext = useAuth();
  const handleLightingOption = (data) => {
    // Update selectedModalValues with data received from the Lighting modal
    setSelectedModalValues(data);

    // Update the generated prompt with selectedModalValues
    updateGeneratedPrompt(prompt, selectedFilters);
  };
  console.log(selectedModalValues);

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
          {/* <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='prompt'>
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
          {/* <label className='block text-gray-700 text-sm font-bold mb-2'>Generated Prompt:</label> */}

          {/* /imagine prompt: */}

          <div>
            {isMounted && (
              <div className="bg-zinc-200 p-4 border rounded" ref={divRef}>
                /imagine prompt: {prompt}::
                {Object.keys(selectedModalValues).map(
                  (_) => `${_}:${selectedModalValues[_]} `
                )}
                {Object.keys(selectedFilters).map(
                  (_) => `${_}:${selectedFilters[_]} `
                )}
              </div>
            )}
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
            onClick={handleCopyClick}>
            {" "}
            Copy Prompt{" "}
          </button>

          <button
            className="bg-green-700 text-white hover:hover:bg-blue-900 rounded-2xl p-2 w-52"
            onClick={handleSavePrompt}>
            {" "}
            Save to My Prompts{" "}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="md:flex md:flex-wrap">
            {Object.keys(filtersData).map((filterName) => (
              <div className="mb-4 w-full md:w-1/6 md:pr-2" key={filterName}>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={filterName}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={filterTooltips[filterName]}>
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
                    }>
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
          </div>
          <div>
            <div className="md:flex md:flex-wrap items-center justify-center">
              <div className="inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={openModal}
                  style={{ width: "110px" }}
                  className="flex items-center justify-center rounded-md bg-blue-100 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <FaRegLightbulb style={{ marginRight: "8px" }} />
                  Lighting
                </button>
              </div>

              {/* Style Button */}

              <div className="inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={openStylesModal}
                  className="flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <FaPhotoVideo style={{ marginRight: "8px" }} /> Styles
                </button>
              </div>

              <div className="inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={openCameraModal}
                  className="flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <FaCamera /> Camera
                </button>
              </div>
              <br />
              <div className="inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={openArtistsModal}
                  className="flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <FaPaintBrush style={{ marginRight: "8px" }} />
                  Artists
                </button>
              </div>
              <div className="inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={openColorsModal}
                  className="flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <FaPalette style={{ marginRight: "8px" }} /> Colors
                </button>
              </div>
              <div className="inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={openMaterialsModal}
                  className="flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <FaHome style={{ marginRight: "8px" }} /> Materials
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* end this.props. */}

        {islighting && (
          <div>
            <Lighting
              isOpen={islighting}
              closeModal={closeModal}
              title="Lighting"
              content="Select Any Modal"
              options={filterModalOptions}
              setSelectedModalValues={handleLightingOption}
            />
          </div>
        )}

        {isCameraOpen && (
          <Camera
            isCameraOpen={isCameraOpen}
            closeCameraModal={closeCameraModal}
            title="Camera"
            content="Select Any Modal"
            options={filterModalCameraOptions}
            setSelectedModalValues={handleLightingOption}
          />
        )}
        {isStylesOpen && (
          <div>
            <Styles
              isStylesOpen={isStylesOpen}
              closeStylesModal={closeStylesModal}
              title="Styles"
              content="Select Any Modal"
              options={filterModalStyle}
              setSelectedModalValues={handleLightingOption}
            />
          </div>
        )}

        {isArtistsOpen && (
          <div>
            <Artists
              isArtistsOpen={isArtistsOpen}
              closeArtistsModal={closeArtistsModal}
              title="Artists"
              content="Select Any Modal"
              options={filterModalArtists}
              setSelectedModalValues={handleLightingOption}
            />
          </div>
        )}
        {isColorsOpen && (
          <div>
            <Colors
              isColorsOpen={isColorsOpen}
              closeColorsModal={closeColorsModal}
              title="Colors"
              content="Select Any Modal"
              options={filterModalColors}
              setSelectedModalValues={handleLightingOption}
            />
          </div>
        )}
        {isMaterialsOpen && (
          <div>
            <Materials
              isMaterialsOpen={isMaterialsOpen}
              closeMaterialsModal={closeMaterialsModal}
              title="Materials"
              content="Select Any Modal"
              options={filterModalMaterials}
              setSelectedModalValues={handleLightingOption}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Prompts;
