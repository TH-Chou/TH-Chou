const cities = [
  ["北京", 39.9042, 116.4074],
  ["天津", 39.3434, 117.3616],
  ["石家庄", 38.0428, 114.5149],
  ["太原", 37.8706, 112.5489],
  ["呼和浩特", 40.8426, 111.7492],
  ["沈阳", 41.8057, 123.4315],
  ["长春", 43.8171, 125.3235],
  ["哈尔滨", 45.8038, 126.5349],
  ["上海", 31.2304, 121.4737],
  ["南京", 32.0603, 118.7969],
  ["杭州", 30.2741, 120.1551],
  ["合肥", 31.8206, 117.2272],
  ["福州", 26.0745, 119.2965],
  ["南昌", 28.6829, 115.8582],
  ["济南", 36.6512, 117.1201],
  ["郑州", 34.7466, 113.6254],
  ["武汉", 30.5928, 114.3055],
  ["长沙", 28.2282, 112.9388],
  ["广州", 23.1291, 113.2644],
  ["南宁", 22.817, 108.3669],
  ["海口", 20.0442, 110.1999],
  ["重庆", 29.563, 106.5516],
  ["成都", 30.5728, 104.0668],
  ["贵阳", 26.647, 106.6302],
  ["昆明", 25.0389, 102.7183],
  ["拉萨", 29.652, 91.1721],
  ["西安", 34.3416, 108.9398],
  ["兰州", 36.0611, 103.8343],
  ["西宁", 36.6171, 101.7782],
  ["银川", 38.4872, 106.2309],
  ["乌鲁木齐", 43.8256, 87.6168],
  ["台北", 25.033, 121.5654],
  ["香港", 22.3193, 114.1694],
  ["澳门", 22.1987, 113.5439],
];

const internationalCities = [
  ["曼谷", 13.7563, 100.5018],
  ["新加坡", 1.3521, 103.8198],
  ["胡志明市", 10.8231, 106.6297],
  ["河内", 21.0278, 105.8342],
  ["大阪", 34.6937, 135.5023],
  ["东京", 35.6762, 139.6503],
];

const bounds = { left: 40, top: 35, width: 920, height: 520 };
const svgNamespace = "http://www.w3.org/2000/svg";

const outlines = [
  {
    className: "map-outline",
    points: [[97, 41], [91, 43], [88, 47], [103, 47], [112, 45], [121, 44], [129, 47], [135, 45], [133, 39], [130, 36], [126, 34], [123, 31], [119, 28], [116, 24], [111, 22], [108, 18], [105, 20], [104, 24], [101, 26], [98, 28], [94, 29], [91, 31], [88, 34], [91, 36], [95, 37]],
  },
  {
    className: "map-outline secondary",
    points: [[126, 38], [129, 43], [130, 39], [128, 35]],
  },
  {
    className: "map-outline secondary",
    points: [[131, 34], [135, 36], [140, 42], [145, 44], [146, 40], [142, 34], [138, 31], [134, 31]],
  },
  {
    className: "map-outline secondary",
    points: [[106, 23], [110, 22], [111, 18], [109, 13], [106, 10], [104, 8], [102, 12], [104, 17]],
  },
  {
    className: "map-outline secondary",
    points: [[99, 20], [103, 21], [105, 17], [103, 12], [100, 10], [99, 14]],
  },
];

function project(latitude, longitude) {
  return {
    x: bounds.left + ((longitude - 86) / 59) * bounds.width,
    y: bounds.top + ((47 - latitude) / 47) * bounds.height,
  };
}

function makeSvgElement(tag, attributes = {}) {
  const element = document.createElementNS(svgNamespace, tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function drawOutline(group, points, className) {
  const pathData = points
    .map(([longitude, latitude], index) => {
      const { x, y } = project(latitude, longitude);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  group.appendChild(makeSvgElement("path", { class: className, d: `${pathData} Z` }));
}

function drawCity(group, city, international = false) {
  const [name, latitude, longitude] = city;
  const { x, y } = project(latitude, longitude);
  const cityGroup = makeSvgElement("g", { class: international ? "city international" : "city" });
  const marker = makeSvgElement("circle", {
    class: international ? "map-marker international" : "map-marker",
    cx: x.toFixed(1),
    cy: y.toFixed(1),
    r: international ? "5" : "4",
  });
  const label = makeSvgElement("text", {
    class: international ? "map-label international" : "map-label",
    x: (x + 7).toFixed(1),
    y: (y - 7).toFixed(1),
  });
  label.textContent = name;
  cityGroup.append(marker, label);
  group.appendChild(cityGroup);
}

const mapElement = document.querySelector("#east-asia-map");

if (mapElement) {
  const outlineGroup = mapElement.querySelector("#map-outlines");
  const cityGroup = mapElement.querySelector("#map-cities");
  outlines.forEach(({ points, className }) => drawOutline(outlineGroup, points, className));
  cities.forEach((city) => drawCity(cityGroup, city));
  internationalCities.forEach((city) => drawCity(cityGroup, city, true));
}
