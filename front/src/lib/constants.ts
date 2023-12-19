import { Icon } from 'leaflet';

export const START_MAP = {
	lat: -16.504112,
	lng: -68.126548,
	zoom: 12.18,
};

export const HOUSE_ICON = new Icon({
	iconUrl: 'assets/house.png',

	iconSize: [38, 38],
	popupAnchor: [-3, -76],
});
