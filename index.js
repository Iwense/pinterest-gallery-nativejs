const imageSrcs = [
  "https://picsum.photos/250/350",
  "https://picsum.photos/300/180",
  "https://picsum.photos/380/280",
  "https://picsum.photos/250/350",
  "https://picsum.photos/200/300",
  "https://picsum.photos/420/310",
  "https://picsum.photos/250/350",
  "https://picsum.photos/400/300",
  "https://picsum.photos/300/200",
  "https://picsum.photos/380/280",
  "https://picsum.photos/250/350",
  "https://picsum.photos/200/300",
  "https://picsum.photos/340/500",
  "https://picsum.photos/400/300",
  "https://picsum.photos/450/400",
  "https://picsum.photos/400/300"
];

const container = document.querySelector("#app");
let arrayOfColumns = [];

const imageOnLoad = (image) => {
  return Promise.resolve(() => {
    let minHeightIndex = 0;
    let minHeight = Infinity;
    for (let i = 0; i < arrayOfColumns.length; i++) {
      if (arrayOfColumns[i].height < minHeight) {
        minHeightIndex = i;
        minHeight = arrayOfColumns[i].height;
      }
    }
    arrayOfColumns[minHeightIndex].element.appendChild(image);
    arrayOfColumns[minHeightIndex].height += image.height;
  });
};

const addImages = async () => {
  for (let item of imageSrcs) {
    const image = document.createElement("img");
    image.src = item;
    image.style.width = "100%";
    image.style.borderRadius = "8px";
    image.style.marginBottom = "12px";
    image.onload = await imageOnLoad(image);
  }
};

const generateColumns = (count) => {
  container.innerHTML = "";
  arrayOfColumns = [];
  for (let i = 0; i < count; i++) {
    const element = document.createElement("div");
    element.style.width = "300px";
    const column = {
      height: 0,
      element
    };
    arrayOfColumns.push(column);
    container.appendChild(element);
  }

  addImages();
};

const countOfColumns = () => {
  const fixImageSize = 200;
  const countOfColumn = Math.floor(window.innerWidth / fixImageSize);
  generateColumns(countOfColumn);
};

window.addEventListener("resize", countOfColumns);
countOfColumns();
