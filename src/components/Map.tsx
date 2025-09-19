'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  stamps?: any[];
  onLocationSelect?: (location: any) => void;
}

// ข้อมูลร้านค้าตัวอย่างในโคราช
const sampleLocations = [
  {
    id: 1,
    name: 'ร้านกาแฟ A',
    address: 'ถนนมิตรภาพ อ.เมือง จ.นครราชสีมา',
    lat: 14.9799,
    lng: 102.0978,
    qrCode: 'CAFE_A_001',
    isVisited: false
  },
  {
    id: 2,
    name: 'ร้านกาแฟ B',
    address: 'ถนนราชดำเนิน อ.เมือง จ.นครราชสีมา',
    lat: 14.9850,
    lng: 102.1000,
    qrCode: 'CAFE_B_002',
    isVisited: false
  },
  {
    id: 3,
    name: 'ร้านกาแฟ C',
    address: 'ถนนสุรนารี อ.เมือง จ.นครราชสีมา',
    lat: 14.9750,
    lng: 102.0950,
    qrCode: 'CAFE_C_003',
    isVisited: false
  },
  {
    id: 4,
    name: 'ร้านกาแฟ D',
    address: 'ถนนจอมพล อ.เมือง จ.นครราชสีมา',
    lat: 14.9900,
    lng: 102.1050,
    qrCode: 'CAFE_D_004',
    isVisited: false
  },
  {
    id: 5,
    name: 'ร้านกาแฟ E',
    address: 'ถนนมหาดไทย อ.เมือง จ.นครราชสีมา',
    lat: 14.9700,
    lng: 102.0900,
    qrCode: 'CAFE_E_005',
    isVisited: false
  }
];

export default function Map({ stamps = [], onLocationSelect }: MapProps) {
  const [locations, setLocations] = useState(sampleLocations);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  useEffect(() => {
    // อัปเดตสถานะการเยี่ยมชมตามสแตมป์ที่เก็บได้
    const updatedLocations = locations.map(location => {
      const hasStamp = stamps.some(stamp => 
        stamp.qr_code_data === location.qrCode || 
        stamp.location_name?.includes(location.name)
      );
      return { ...location, isVisited: hasStamp };
    });
    setLocations(updatedLocations);
  }, [stamps]);

  const handleMarkerClick = (location: any) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
  };

  const getMarkerIcon = (isVisited: boolean) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-content ${isVisited ? 'visited' : 'not-visited'}">
        <div class="marker-icon">${isVisited ? '✓' : '📍'}</div>
      </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
  };

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <MapContainer
        center={[14.9799, 102.0978]} // ศูนย์กลางโคราช
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={getMarkerIcon(location.isVisited)}
            eventHandlers={{
              click: () => handleMarkerClick(location)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-sm">{location.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{location.address}</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    location.isVisited 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {location.isVisited ? 'เยี่ยมชมแล้ว' : 'ยังไม่เยี่ยมชม'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  QR Code: {location.qrCode}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        
        .marker-content {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .marker-content.visited {
          background: #10b981;
          color: white;
        }
        
        .marker-content.not-visited {
          background: #ef4444;
          color: white;
        }
        
        .leaflet-popup-content {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
