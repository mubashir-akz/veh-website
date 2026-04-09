import { Link } from 'react-router-dom';
import { Car, PlusCircle, ChevronRight } from 'lucide-react';

const vehicles = [
  { id: 1, name: 'Toyota Camry', number: 'ABC-1234', fuel: 'Petrol', odometer: '45,230 km', nextService: 'Apr 15' },
  { id: 2, name: 'Honda Civic', number: 'XYZ-5678', fuel: 'Petrol', odometer: '32,100 km', nextService: 'Apr 20' },
  { id: 3, name: 'Tesla Model 3', number: 'EV-0012', fuel: 'Electric', odometer: '18,500 km', nextService: 'May 5' },
];

export default function Vehicles() {
  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">My Vehicles</h1>
          <p className="page-subtitle">Manage your registered vehicles</p>
        </div>
        <Link to="/add-vehicle" className="btn btn-primary">
          <PlusCircle size={18} />
          Add Vehicle
        </Link>
      </div>
      
      <div className="vehicle-list">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-card">
            <div className="vehicle-icon">
              <Car size={28} color="#fff" />
            </div>
            <div className="vehicle-info">
              <div className="vehicle-name">{vehicle.name}</div>
              <div className="vehicle-meta">
                {vehicle.number} • {vehicle.fuel} • {vehicle.odometer}
              </div>
            </div>
            <div style={{ textAlign: 'right', marginRight: '15px' }}>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>Next Service</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{vehicle.nextService}</div>
            </div>
            <ChevronRight size={24} className="vehicle-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
}
