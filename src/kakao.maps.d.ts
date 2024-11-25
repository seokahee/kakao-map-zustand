declare global {
  interface Window {
    kakao: {
      maps: {
        Map: any;
        LatLng: any;
        CustomOverlay: any;
        services: {
          Geocoder: any;
          Status: any;
        };
      };
    };
  }
}

export {};
