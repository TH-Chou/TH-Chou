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

const mapElement = document.querySelector("#east-asia-map");

if (mapElement && window.L) {
  const map = L.map(mapElement, {
    scrollWheelZoom: false,
    zoomControl: true,
  }).setView([28, 116], 3.7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 8,
  }).addTo(map);

  const addCity = (city, international = false) => {
    const [name, latitude, longitude] = city;
    const marker = L.marker([latitude, longitude], {
      icon: L.divIcon({
        className: `city-marker-wrapper${international ? " international" : ""}`,
        html: '<span class="city-marker-dot"></span>',
        iconAnchor: [5, 5],
        iconSize: [10, 10],
      }),
    }).addTo(map);

    marker.bindTooltip(name, {
      className: "city-label",
      direction: "top",
      offset: [0, -4],
      permanent: true,
    });
  };

  cities.forEach((city) => addCity(city));
  internationalCities.forEach((city) => addCity(city, true));
}
