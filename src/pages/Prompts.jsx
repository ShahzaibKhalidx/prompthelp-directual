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
import Background from "../components/img/bg.png";
import "../App.css";

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

// Camera Images

import Camera1 from "../assets/Camera/camera-1.jpg";
import Camera2 from "../assets/Camera/camera-2.jpg";
import Camera3 from "../assets/Camera/camera-3.jpg";
import Camera4 from "../assets/Camera/camera-4.jpg";
import Camera5 from "../assets/Camera/camera-5.jpg";
import Camera6 from "../assets/Camera/camera-6.jpg";
import Camera7 from "../assets/Camera/camera-7.jpg";
import Camera8 from "../assets/Camera/camera-8.jpg";
import Camera9 from "../assets/Camera/camera-9.jpg";
import Camera10 from "../assets/Camera/camera-10.jpg";
import Camera11 from "../assets/Camera/camera-11.jpg";
import Camera12 from "../assets/Camera/camera-12.jpg";
import Camera13 from "../assets/Camera/camera-13.jpg";
import Camera14 from "../assets/Camera/camera-14.jpg";
import Camera15 from "../assets/Camera/camera-15.jpg";

// Artists Images
import Artists1 from "../assets/Artists/Artists-1.jpg";
import Artists2 from "../assets/Artists/Artists-2.jpg";
import Artists3 from "../assets/Artists/Artists-3.jpg";
import Artists4 from "../assets/Artists/Artists-4.jpg";
import Artists5 from "../assets/Artists/Artists-5.jpg";
import Artists6 from "../assets/Artists/Artists-6.jpg";
import Artists7 from "../assets/Artists/Artists-7.jpg";
import Artists8 from "../assets/Artists/Artists-8.jpg";
import Artists9 from "../assets/Artists/Artists-9.jpg";
import Artists10 from "../assets/Artists/Artists-10.jpg";
import Artists11 from "../assets/Artists/Artists-11.jpg";
import Artists12 from "../assets/Artists/Artists-12.jpg";
import Artists13 from "../assets/Artists/Artists-13.jpg";
import Artists14 from "../assets/Artists/Artists-14.jpg";
import Artists15 from "../assets/Artists/Artists-15.jpg";
import Artists16 from "../assets/Artists/Artists-16.jpg";
import Artists17 from "../assets/Artists/Artists-17.jpg";
import Artists18 from "../assets/Artists/Artists-18.jpg";
import Artists19 from "../assets/Artists/Artists-19.jpg";
import Artists20 from "../assets/Artists/Artists-20.jpg";
import Artists21 from "../assets/Artists/Artists-21.jpg";
import Artists22 from "../assets/Artists/Artists-22.jpg";
import Artists23 from "../assets/Artists/Artists-23.jpg";
import Artists24 from "../assets/Artists/Artists-24.jpg";
import Artists25 from "../assets/Artists/Artists-25.jpg";
import Artists26 from "../assets/Artists/Artists-26.jpg";
import Artists27 from "../assets/Artists/Artists-27.jpg";
import Artists28 from "../assets/Artists/Artists-28.jpg";
import Artists29 from "../assets/Artists/Artists-29.jpg";
import Artists30 from "../assets/Artists/Artists-30.jpg";
import Artists31 from "../assets/Artists/Artists-31.jpg";
import Artists32 from "../assets/Artists/Artists-32.jpg";
import Artists33 from "../assets/Artists/Artists-33.jpg";
import Artists34 from "../assets/Artists/Artists-34.jpg";
import Artists35 from "../assets/Artists/Artists-35.jpg";
// import Artists36 from "../assets/Artists/Artists-36.jpg";
import Artists37 from "../assets/Artists/Artists-37.jpg";
import Artists38 from "../assets/Artists/Artists-38.jpg";
import Artists39 from "../assets/Artists/Artists-39.jpg";
import Artists40 from "../assets/Artists/Artists-40.jpg";
import Artists41 from "../assets/Artists/Artists-41.jpg";
import Artists42 from "../assets/Artists/Artists-42.jpg";
import Artists43 from "../assets/Artists/Artists-43.jpg";
import Artists44 from "../assets/Artists/Artists-44.jpg";

// Colors Images
import Colors1 from "../assets/Colors/Colors-1.jpg";
import Colors2 from "../assets/Colors/Colors-2.jpg";
import Colors3 from "../assets/Colors/Colors-3.jpg";
import Colors4 from "../assets/Colors/Colors-4.jpg";
import Colors5 from "../assets/Colors/Colors-5.jpg";
import Colors6 from "../assets/Colors/Colors-6.jpg";
import Colors7 from "../assets/Colors/Colors-7.jpg";
import Colors8 from "../assets/Colors/Colors-8.jpg";
import Colors9 from "../assets/Colors/Colors-9.jpg";
import Colors10 from "../assets/Colors/Colors-10.jpg";
import Colors11 from "../assets/Colors/Colors-11.jpg";
import Colors12 from "../assets/Colors/Colors-12.jpg";
import Colors13 from "../assets/Colors/Colors-13.jpg";
import Colors14 from "../assets/Colors/Colors-14.jpg";
import Colors15 from "../assets/Colors/Colors-15.jpg";
import Colors16 from "../assets/Colors/Colors-16.jpg";
import Colors17 from "../assets/Colors/Colors-17.jpg";
import Colors18 from "../assets/Colors/Colors-18.jpg";
import Colors19 from "../assets/Colors/Colors-19.jpg";
// import Colors20 from "../assets/Colors/Colors-20.jpg";
import Colors21 from "../assets/Colors/Colors-21.jpg";
import Colors22 from "../assets/Colors/Colors-22.jpg";
import Colors23 from "../assets/Colors/Colors-23.jpg";
import Colors24 from "../assets/Colors/Colors-24.jpg";
import Colors25 from "../assets/Colors/Colors-25.jpg";
import Colors26 from "../assets/Colors/Colors-26.jpg";
import Colors27 from "../assets/Colors/Colors-27.jpg";
import Colors28 from "../assets/Colors/Colors-28.jpg";
import Colors29 from "../assets/Colors/Colors-29.jpg";
import Colors30 from "../assets/Colors/Colors-30.jpg";
import Colors31 from "../assets/Colors/Colors-31.jpg";
import Colors32 from "../assets/Colors/Colors-32.jpg";
import Colors33 from "../assets/Colors/Colors-33.jpg";
import Colors34 from "../assets/Colors/Colors-34.jpg";
import Colors35 from "../assets/Colors/Colors-35.jpg";
import Colors36 from "../assets/Colors/Colors-36.jpg";
import Colors37 from "../assets/Colors/Colors-37.jpg";

// Materials Images
import Materials1 from "../assets/Materials/Materials-1.jpg";
import Materials2 from "../assets/Materials/Materials-2.jpg";
import Materials3 from "../assets/Materials/Materials-3.jpg";
import Materials4 from "../assets/Materials/Materials-4.jpg";
import Materials5 from "../assets/Materials/Materials-5.jpg";
import Materials6 from "../assets/Materials/Materials-6.jpg";
import Materials7 from "../assets/Materials/Materials-7.jpg";
import Materials8 from "../assets/Materials/Materials-8.jpg";
import Materials9 from "../assets/Materials/Materials-9.jpg";
import Materials10 from "../assets/Materials/Materials-10.jpg";
import Materials11 from "../assets/Materials/Materials-11.jpg";
import Materials12 from "../assets/Materials/Materials-12.jpg";
import Materials13 from "../assets/Materials/Materials-13.jpg";
import Materials14 from "../assets/Materials/Materials-14.jpg";
import Materials15 from "../assets/Materials/Materials-15.jpg";
import Materials16 from "../assets/Materials/Materials-16.jpg";
import Materials17 from "../assets/Materials/Materials-17.jpg";
import Materials18 from "../assets/Materials/Materials-18.jpg";
import Materials19 from "../assets/Materials/Materials-19.jpg";

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
      value={{ generatedPrompts, saveGeneratedPrompt }}
    >
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
      "Change the Aspect Ratio (width-to-height ratio) of the generated image. Default is 1:1 ?",
    Version: "Specify the Midjourney model to use. Default is 5.2 ?",
    Quality:
      "Decide how much time is spent generating an image (higher number, higher quality). Defualt is 1 ?",
    Tile: "Generate images that can be used as repeating tiles to create seamless patterns for fabrics, wallpapers and textures. ?",
    Exclude: "Tell the Midjourney Bot what not to include in your image ?",
    Stylize:
      "Low values will closely match the prompt but are less artistic. High value will be very artictic but less connected to the prompt. Default is 100 ?",
    Chaos:
      "Influence how how varied your image grid will be. Higher chaos means more unusual and unexpected results. Default is 0 ?",
    Stopped:
      "Create Blurrier, less detailed results by stopping your job partway through. Default is 100 ?",
    Repeat: "Run your prompt multiple times ?",
    Weird:
      "Introduce quirky and offbeat qualities to your images, resulting in unique and unexpexted outcomes. Defualt is 0 ?",
    Seed: "If you use the same seed number and prompt, you will get similar final images. Defualt is random. ?",
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
      name: "360 Panorama",
      image: Camera1,
    },
    {
      name: "DSLR",
      image: Camera2,
    },
    {
      name: "Electron Microscope",
      image: Camera3,
    },
    {
      name: "Macro Lens",
      image: Camera4,
    },
    {
      name: "Magnification",
      image: Camera5,
    },
    {
      name: "Microscopy",
      image: Camera6,
    },
    {
      name: "Miniature Faking",
      image: Camera7,
    },
    {
      name: "Panorama",
      image: Camera8,
    },
    {
      name: "Pinhole Lens",
      image: Camera9,
    },
    {
      name: "Satellite Imagery",
      image: Camera10,
    },
    {
      name: "Super Resolution Microscopy",
      image: Camera11,
    },
    {
      name: "Telephoto Lens",
      image: Camera12,
    },
    {
      name: "Telescope Lens",
      image: Camera13,
    },
    {
      name: "Ultra Wide Angle Lens",
      image: Camera14,
    },
    {
      name: "Wide Angle Lens",
      image: Camera15,
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
      name: "Amber",
      image: Style6,
    },
    {
      name: "Anatomical Drawing",
      image: Style7,
    },
    {
      name: "Ancient",
      image: Style8,
    },
    {
      name: "Anime",
      image: Style9,
    },
    {
      name: "Antimatter",
      image: Style10,
    },
    {
      name: "Arabic",
      image: Style11,
    },
    { name: "Black Hole", image: Style12 },
    { name: "Blocky", image: Style13 },
    { name: "Blueprint Drawing", image: Style14 },

    //
    { name: "Carbon Fiber", image: Style15 },
    { name: "Caribbean", image: Style16 },
    { name: "Cartoon", image: Style17 },
    { name: "Carved Lacquer", image: Style18 },
    { name: "Celestial", image: Style19 },
    { name: "Cellulose", image: Style20 },
    { name: "Charcoal Style", image: Style21 },
    { name: "Chromatic", image: Style22 },
    { name: "Comicbook Drawing", image: Style23 },
    { name: "Computer Chip", image: Style24 },
    { name: "Concept Art", image: Style25 },
    { name: "Coral", image: Style26 },
    { name: "Cyberpunk", image: Style27 },
    { name: "Dangerous", image: Style28 },
    { name: "Dark Matter", image: Style29 },
    { name: "Da Vinci", image: Style30 },
    { name: "Da Vinci Drawing", image: Style31 },
    { name: "Deep Sea", image: Style32 },
    { name: "Diabolic", image: Style33 },
    { name: "Diffraction Grading", image: Style34 },
    { name: "Dna", image: Style35 },
    { name: "Dots", image: Style36 },
    { name: "Dripping Paint", image: Style37 },
    { name: "Dune", image: Style38 },
    { name: "Electronic Circuitry", image: Style39 },
    { name: "Etching", image: Style40 },
    { name: "Extraterrestrial", image: Style41 },
    { name: "Fiber Optic", image: Style42 },
    { name: "Fibonacci", image: Style43 },
    { name: "Floral", image: Style44 },
    { name: "Flower Of Life", image: Style45 },
    { name: "Fossil", image: Style46 },
    { name: "Fractal", image: Style47 },
    { name: "Futuristic", image: Style48 },
    { name: "Galactic", image: Style49 },
    { name: "Gasoline", image: Style50 },
    { name: "Glass", image: Style51 },
    { name: "Glass Blowing", image: Style52 },
    { name: "Glitchart", image: Style53 },
    { name: "Gouache", image: Style54 },
    { name: "Helix", image: Style55 },
    { name: "Hell", image: Style55 },
    { name: "Higgs Boson", image: Style56 },
    { name: "Horror", image: Style57 },
    { name: "Ice Age", image: Style58 },
    { name: "Icy", image: Style59 },
    { name: "Jurassic", image: Style60 },
    { name: "Kaleidoscope", image: Style61 },
    { name: "Knitted", image: Style62 },
    { name: "Latex", image: Style63 },
    { name: "Lightspeed", image: Style64 },
    { name: "Liquid", image: Style65 },
  ];

  // Artists Modal
  const filterModalArtists = [
    {
      name: "Alphonse Mucha",
      image: Artists1,
    },
    {
      name: "Andy Warhol",
      image: Artists2,
    },
    {
      name: "Art By Yoko Ono",
      image: Artists3,
    },
    {
      name: "Banksy",
      image: Artists4,
    },
    {
      name: "By Francisco De Goya",
      image: Artists5,
    },
    { name: "Caravaggio", image: Artists6 },
    //
    { name: "Claude Monet", image: Artists7 },
    { name: "David Hockney", image: Artists8 },
    { name: "Diego Rivera", image: Artists9 },
    //
    { name: "Edgar Degas", image: Artists10 },
    { name: "Eugene Delacroix", image: Artists11 },
    { name: "Frida Kahlo", image: Artists12 },
    { name: "Garald Brom", image: Artists13 },
    { name: "Gustav Klimt", image: Artists14 },
    { name: "Henri Matisse", image: Artists15 },
    { name: "Jack Kirby", image: Artists16 },
    { name: "Jackson Pollock", image: Artists17 },
    { name: "Jean Michel Basquiat", image: Artists18 },
    { name: "JMW Turner", image: Artists19 },
    { name: "Leonardo Da Vinci", image: Artists20 },
    { name: "Marc Chagall", image: Artists21 },
    { name: "Marcel Duchamp", image: Artists22 },
    { name: "Mark Rothko", image: Artists23 },
    { name: "Michelangelo", image: Artists24 },
    { name: "Monet", image: Artists25 },
    { name: "Paul Cezanne", image: Artists26 },
    { name: "Paul Gauguin", image: Artists27 },
    { name: "Paul Klee", image: Artists28 },
    { name: "Picasso", image: Artists29 },
    { name: "Pierre Auguste Renoir", image: Artists30 },
    { name: "Piet Mondrian", image: Artists31 },
    { name: "Rembrandt", image: Artists32 },
    { name: "Rene Magritte", image: Artists33 },
    { name: "Roy Lichtenstein", image: Artists34 },
    { name: "Salvador Dali", image: Artists35 },
    // {name: "Edward Hopper", image: Artists36 },
    { name: "Sandro Botticelli", image: Artists37 },
    { name: "Takashi Murakami", image: Artists38 },
    { name: "Van Gogh", image: Artists39 },
    { name: "Wassily Handinsky", image: Artists40 },
    { name: "Willem De Koonig", image: Artists41 },
    { name: "Yayoi Kusama", image: Artists42 },
    { name: "Yoji Shinkawa", image: Artists43 },
    { name: "Yoji Shinkawa", image: Artists44 },
  ];

  // Colors Modal
  const filterModalColors = [
    { name: "Baby Blue Color", image: Colors1 },
    { name: "Baby Pink Color", image: Colors2 },
    { name: "Beige", image: Colors3 },
    { name: "Blue", image: Colors4 },
    { name: "Brown Color", image: Colors5 },
    { name: "Citrus", image: Colors6 },
    { name: "Coquelicot Color", image: Colors7 },
    { name: "Cyan", image: Colors8 },
    { name: "CYMK", image: Colors9 },
    { name: "Grayscale Color", image: Colors10 },
    { name: "Green", image: Colors11 },
    { name: "Hot Pink Color", image: Colors12 },
    { name: "Indigo", image: Colors13 },
    { name: "Lavender", image: Colors14 },
    { name: "Magenta", image: Colors15 },
    { name: "Matte Black Color", image: Colors16 },
    { name: "Mint Color", image: Colors17 },
    { name: "Navy Blue", image: Colors18 },
    { name: "Neon Blue Color", image: Colors19 },
    { name: "Neon Orange Color", image: Colors21 },
    { name: "Neon Yellow Color", image: Colors22 },
    { name: "Neon Red Color", image: Colors23 },
    { name: "Orange", image: Colors24 },

    //
    { name: "Pink", image: Colors25 },
    { name: "Red", image: Colors26 },
    { name: "RGB", image: Colors27 },
    { name: "Silver Color", image: Colors28 },
    { name: "Teal", image: Colors29 },
    { name: "Turquoise", image: Colors30 },
    { name: "Vermillion", image: Colors31 },
    { name: "Violet", image: Colors32 },
    { name: "White", image: Colors33 },
    { name: "Yellow", image: Colors34 },
    { name: "White", image: Colors35 },
    { name: "Yellow", image: Colors36 },
    { name: "Zinc", image: Colors37 },
  ];

  // Materials Modal
  const filterModalMaterials = [
    { name: "Aluminum", image: Materials1 },
    { name: "Brick", image: Materials2 },
    { name: "Bronze", image: Materials3 },
    { name: "Cardboard", image: Materials4 },
    { name: "Ceramic", image: Materials5 },
    { name: "Cotton", image: Materials6 },
    { name: "Fabric", image: Materials7 },
    { name: "Emerald", image: Materials8 },
    { name: "Fabric", image: Materials9 },
    { name: "Foil", image: Materials10 },
    { name: "Gold", image: Materials11 },
    { name: "Leather", image: Materials12 },
    { name: "Nickel", image: Materials13 },
    { name: "Nylon", image: Materials14 },
    { name: "Paper", image: Materials15 },
    { name: "Plastic", image: Materials16 },
    { name: "Quartz", image: Materials17 },
    { name: "Sharink Wrap", image: Materials18 },
    { name: "Skin", image: Materials19 },
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

  const handleSavePrompt = async () => {
    // Generate the summary as before
    const summary = Object.keys(filtersData)
      .map((key) => {
        if (Array.isArray(filtersData[key])) {
          return `${key}: ${filtersData[key].join(", ")}`;
        } else {
          return `${key}: ${filtersData[key]}`;
        }
      })
      .join("\n");

    // Set up the API endpoint and headers (replace with your actual endpoint and API key)
    const apiEndpoint =
      "https://api.directual.com/good/api/v5/data/save_prompt/postPrompt?appID=ff949b76-9513-459d-95b3-9dd741fb08e1&sessionID=876081";
    const apiKey = "ff949b76-9513-459d-95b3-9dd741fb08e1"; // Replace with your actual API key

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({ save_prompt: summary }), // Adjust 'fieldInDirectual' to match your Directual data structure
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle the response, e.g., display a success message
      console.log("Prompt saved successfully");
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error saving prompt:", error);
    }
  };

  //

  const authContext = useAuth();
  const handleLightingOption = (data) => {
    // Update selectedModalValues with data received from the Lighting modal
    setSelectedModalValues(data);

    // Update the generated prompt with selectedModalValues
    updateGeneratedPrompt(prompt, selectedFilters);
  };
  console.log(selectedModalValues);

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backdropFilter: "blur(100%)",
      }}
    >
      <div className=" min-h-screen flex items-center justify-center">
        <div className="w-full md:w-9/12 p-6 text-gray-800">
          <h1 className="Midjourney uppercase text-center">
            Midjourney Prompt Helper
          </h1>
          <p className="Save-your-prompt text-center p-4 mb-4">
            Save your prompt for later use. Give it a try blow
          </p>
          <div className="mb-4">
            {/* <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='prompt'>
                        Enter your prompt:
                    </label> */}
            <textarea
              id="prompt"
              placeholder="Start typing your idea..."
              className="text-pad w-full p-8  shadow-md placeholder-slate-400 outline-0 hover:shadow-xl"
              value={prompt}
              onChange={handlePromptChange}
            />
          </div>
          <div className="my-4">
            {/* <label className='block text-gray-700 text-sm font-bold mb-2'>Generated Prompt:</label> */}

            {/* /imagine prompt: */}

            <div>
              {isMounted && (
                <div className="promot w-full p-8 shadow-md hover:shadow-xl" ref={divRef}>
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
              <p className="text-green-600 mt-2 text-center ">
                Copied to clipboard!
              </p>
            )}
          </div>
          {/* Buttons */}

          <div className="m-4 gap-10 flex justify-center">
            <button
            style={{ backgroundColor: "#12BF80", color: "white" }}
              className="button-copy shadow-md hover:shadow-xl "
              onClick={handleCopyClick}
            >
              {" "}
              Copy Prompt{" "}
            </button>

            <button
             style={{ backgroundColor: "white", color: "#7e7e7e" }}
              className="button-copy shadow-md hover:shadow-xl "
              onClick={handleSavePrompt}
            >
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
                        filterPlaceholders[filterName] ||
                        filtersData[filterName]
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
                        filterPlaceholders[filterName] ||
                        filtersData[filterName]
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
              <div className="flex flex-wrap justify-center gap-4 p-4">
                <div className="inset-0 flex items-center justify-center mb-4 md:mb-0">
                  <button
                    type="button"
                    onClick={openModal}
                    style={{ width: "110px" }}
                    className="flex items-center justify-center rounded-md bg-blue-100 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <FaRegLightbulb style={{ marginRight: "8px" }} />
                    Lighting
                  </button>
                </div>

                {/* Style Button */}

                <div className="inset-0 flex items-center justify-center mb-4 md:mb-0">
                  <button
                    type="button"
                    onClick={openStylesModal}
                    className="flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <FaPhotoVideo style={{ marginRight: "8px" }} /> Styles
                  </button>
                </div>

                <div className="inset-0 flex items-center justify-center mb-4 md:mb-0">
                  <button
                    type="button"
                    onClick={openCameraModal}
                    className="flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <FaCamera style={{ marginRight: "8px" }} /> Camera
                  </button>
                </div>

                <div className="inset-0 flex items-center justify-center mb-4 md:mb-0">
                  <button
                    type="button"
                    onClick={openArtistsModal}
                    className="flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <FaPaintBrush style={{ marginRight: "8px" }} />
                    Artists
                  </button>
                </div>
                <div className="inset-0 flex items-center justify-center mb-4 md:mb-0">
                  <button
                    type="button"
                    onClick={openColorsModal}
                    className="flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <FaPalette style={{ marginRight: "8px" }} /> Colors
                  </button>
                </div>
                <div className="inset-0 flex items-center justify-center mb-4 md:mb-0">
                  <button
                    type="button"
                    onClick={openMaterialsModal}
                    className="flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
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
    </div>
  );
}

export default Prompts;
