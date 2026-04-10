import { useState } from 'react';
import { Navigation, Plus, Clock, MapPin, User, ChevronRight, Play, Square, Trash2 } from 'lucide-react';

const vehicles = [
  { id: 1, name: 'Toyota Camry', plate: 'ABC-1234' },
  { id: 2, name: 'Honda Civic', plate: 'XYZ-5678' },
  { id: 3, name: 'Tesla Model 3', plate: 'EV-0012' },
];

const initialTrips = [
  { id: 1, vehicleId: 1, vehicleName: 'Toyota Camry', startOdometer: 45200, endOdometer: 45280, distance: 80, startTime: '2026-04-09 08:30', endTime: '2026-04-09 10:15', purpose: 'Business', driver: 'Self', status: 'completed' },
  { id: 2, vehicleId: 2, vehicleName: 'Honda Civic', startOdometer: 32100, endOdometer: 32250, distance: 150, startTime: '2026-04-08 14:00', endTime: '2026-04-08 18:30', purpose: 'Personal', driver: 'Self', status: 'completed' },
  { id: 3, vehicleId: 1, vehicleName: 'Toyota Camry', startOdometer: 45280, endOdometer: null, distance: null, startTime: '2026-04-10 09:00', endTime: null, purpose: 'Commute', driver: 'Self', status: 'active' },
];

export default function TripLogger() {
  const [trips, setTrips] = useState(initialTrips);
  const [showAdd, setShowAdd] = useState(false);
  const [activeTrip, setActiveTrip] = useState(null);
  const [newTrip, setNewTrip] = useState({
    vehicleId: '',
    purpose: 'Business',
    notes: ''
  });

  const totalDistance = trips.reduce((sum, t) => sum + (t.distance || 0), 0);
  const businessTrips = trips.filter(t => t.purpose === 'Business').length;
  const personalTrips = trips.filter(t => t.purpose === 'Personal').length;

  const startTrip = () => {
    if (!newTrip.vehicleId) return;
    const vehicle = vehicles.find(v => v.id === parseInt(newTrip.vehicleId));
    const trip = {
      id: Date.now(),
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      startOdometer: 0,
      endOdometer: null,
      distance: null,
      startTime: new Date().toLocaleString(),
      endTime: null,
      purpose: newTrip.purpose,
      driver: 'Self',
      status: 'active'
    };
    setTrips([trip, ...trips]);
    setActiveTrip(trip);
    setShowAdd(false);
    setNewTrip({ vehicleId: '', purpose: 'Business', notes: '' });
  };

  const endTrip = (tripId, endOdometer) => {
    setTrips(trips.map(t => {
      if (t.id === tripId) {
        const distance = endOdometer - t.startOdometer;
        return { ...t, endOdometer, distance, endTime: new Date().toLocaleString(), status: 'completed' };
      }
      return t;
    }));
    setActiveTrip(null);
  };

  const deleteTrip = (id) => {
    setTrips(trips.filter(t => t.id !== id));
  };

  const activeTripData = trips.find(t => t.status === 'active');

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Trip Logger</h1>
          <p className="page-subtitle">Track your trips and distances</p>
        </div>
        {!activeTripData && (
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            <Play size={18} />
            Start Trip
          </button>
        )}
      </div>

      {/* Active Trip Banner */}
      {activeTripData && (
        <div className="card" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', border: 'none', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Navigation size={28} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Trip in Progress</div>
                <div style={{ fontSize: '20px', fontWeight: '700' }}>{activeTripData.vehicleName}</div>
                <div style={{ fontSize: '13px', opacity: 0.8 }}>{activeTripData.purpose} • Started {activeTripData.startTime}</div>
              </div>
            </div>
            <button className="btn" style={{ background: '#fff', color: '#4F46E5' }} onClick={() => {
              const endOdo = prompt('Enter ending odometer:', activeTripData.startOdometer + 50);
              if (endOdo) endTrip(activeTripData.id, parseInt(endOdo));
            }}>
              <Square size={18} />
              End Trip
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.15)' }}>
            <Navigation size={24} color="#4F46E5" />
          </div>
          <div className="stat-label">Total Distance</div>
          <div className="stat-value">{totalDistance.toLocaleString()} km</div>
          <div className="stat-change positive">{trips.filter(t => t.status === 'completed').length} completed trips</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(52, 211, 153, 0.15)' }}>
            <User size={24} color="#34D399" />
          </div>
          <div className="stat-label">Business Trips</div>
          <div className="stat-value">{businessTrips}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
            <User size={24} color="#FBBF24" />
          </div>
          <div className="stat-label">Personal Trips</div>
          <div className="stat-value">{personalTrips}</div>
        </div>
      </div>

      {/* Trip List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Trips</h3>
        </div>
        <div className="activity-list">
          {trips.map(trip => (
            <div key={trip.id} className="activity-item" style={{ opacity: trip.status === 'active' ? 1 : 0.85 }}>
              <div className="activity-dot" style={{ 
                backgroundColor: trip.status === 'active' ? '#34D399' : 
                                trip.purpose === 'Business' ? '#4F46E5' : '#FBBF24' 
              }} />
              <div className="activity-content" style={{ flex: 1 }}>
                <div className="activity-text">{trip.vehicleName}</div>
                <div className="activity-time">
                  {trip.startTime} {trip.endTime && `→ ${trip.endTime}`}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                  <span className="badge" style={{ 
                    backgroundColor: trip.purpose === 'Business' ? 'rgba(79, 70, 229, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                    color: trip.purpose === 'Business' ? '#818CF8' : '#FBBF24'
                  }}>
                    {trip.purpose}
                  </span>
                  {trip.distance && (
                    <span style={{ color: '#94A3B8', fontSize: '13px' }}>
                      {trip.distance} km
                    </span>
                  )}
                  {trip.status === 'active' && (
                    <span className="badge badge-success">Active</span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {trip.status !== 'active' && (
                  <button className="btn btn-outline" style={{ padding: '8px' }} onClick={() => deleteTrip(trip.id)}>
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Trip Modal */}
      {showAdd && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ maxWidth: '480px', width: '100%', margin: '20px' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '20px' }}>Start New Trip</h3>
            
            <div className="form-group">
              <label className="form-label">Select Vehicle</label>
              <select 
                className="form-input"
                value={newTrip.vehicleId}
                onChange={e => setNewTrip({...newTrip, vehicleId: e.target.value})}
              >
                <option value="">Choose a vehicle...</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.name} ({v.plate})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Purpose</label>
              <select 
                className="form-input"
                value={newTrip.purpose}
                onChange={e => setNewTrip({...newTrip, purpose: e.target.value})}
              >
                <option value="Business">Business</option>
                <option value="Personal">Personal</option>
                <option value="Commute">Commute</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={startTrip}>
                <Play size={18} />
                Start Trip
              </button>
              <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
