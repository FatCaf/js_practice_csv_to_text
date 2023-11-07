const fileInput = document.getElementById("fileInput");
const open = document.getElementById("open");
const output = document.getElementById("output");
const textArea = document.getElementById("output");

function readFileContent(file, callback) {
  const reader = new FileReader();

  reader.onload = (ev) => {
    const content = ev.target.result;
    const lines = content.split(/\r\n/).map((line) => line.split(","));

    const cleanedLines = lines
      .map((line) =>
        line.filter(
          (item) => item.trim() !== "" && !item.trim().startsWith("#")
        )
      )
      .filter((line) => {
        return line.length > 1;
      });

    callback(cleanedLines);
  };

  reader.readAsText(file);
}

function createAssociativeArray(lines) {
  const cityData = [];

  lines.forEach((line) => {
    if (line.length < 4) return;
    cityData.push({
      x: parseFloat(line[0]),
      y: parseFloat(line[1]),
      name: line[2],
      population: parseInt(line[3]),
    });
  });

  // Sort cities by population
  cityData.sort((a, b) => b.population - a.population);

  return cityData;
}

function generateCityObject(associativeArray) {
  // Sort the associative array by population in descending order
  associativeArray.sort((a, b) => b.population - a.population);

  const cityObject = {};

  // Calculate the rank and create the object
  associativeArray.forEach((city, index) => {
    const rank = index + 1; // Rank starts from 1

    // Create an object for the city with population and rank
    cityObject[city.name] = {
      population: city.population,
      rating: rank,
    };
  });

  return (text) => {
    // Get all the keys of the city object
    const cityNames = Object.keys(cityObject);

    // Replace all occurrences of the city names in the text with the corresponding city information
    cityNames.forEach((cityName) => {
      const cityInfo = cityObject[cityName];
      text = text.replaceAll(
        cityName,
        `Місто ${cityName} займає ${cityInfo.rating} у топ-10 самих великих міст України, та має населення ${cityInfo.population} чоловік.`
      );
    });

    // Return the formatted text
    return text;
  };
}

function onUpload(options = {}) {
  let cityData = [];

  if (options.multi) {
    fileInput.setAttribute("multiple", true);
  }

  if (options.accept && Array.isArray(options.accept)) {
    fileInput.setAttribute("accept", options.accept.join(","));
  }

  const clickTrigger = () => fileInput.click();

  const changeHandler = (event) => {
    if (event.target && event.target.files) {
      const selectedFiles = event.target.files;

      if (!selectedFiles.length) {
        return;
      }

      const files = Array.from(event.target.files);
      const inputText = textArea.value;

      // Process each selected file
      files.forEach((file) => {
        readFileContent(file, (cleanedLines) => {
          const associativeArray = createAssociativeArray(cleanedLines);
          cityData = cityData.concat(associativeArray);
          const cityObject = generateCityObject(cityData);
          textArea.value = cityObject(inputText);
        });
      });
    }
  };

  open.addEventListener("click", clickTrigger);
  fileInput.addEventListener("change", changeHandler);
}

onUpload({ multi: true, accept: [".csv"] });
