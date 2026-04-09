import { useState } from 'react';
import { Fuel, PlusCircle, Calendar, Droplet } from 'lucide-react';

const fuelLogs = [
  { id: 1, vehicle: 'Toyota Camry', date: 'Apr 8, 2026', liters: 45.2, cost: 72.50, odometer: '45,230 km' },
  { id: 2, vehicle: 'Honda Civic', date: 'Apr 5, 2026', liters: 38.5, cost: 61.60, odometer: '32,100 km' },
  { id: 3, vehicle: 'Toyota Camry', date: 'Apr 1, 2026', liters: 42.0, cost: 67.20, odometer: '44,890 km' },
];

export default function FuelLog() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Fuel Log</h1>
          <p className="page-subtitle">Track your fuel expenses</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          <PlusCircle size={18} />
          Log Fuel
        </button>
      </div>
      
      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <div className="stat-card">
          <div className="stat-label">This Month</div>
          <div className="stat-value">$485</div>
          <div className="stat-change positive">125.7L consumed</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg. Price/Liter</div>
          <div className="stat-value">$1.60</div>
          <div className="stat-change negative">+$0.05 vs last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Efficiency</div>
          <div className="stat-value">14.2 km/L</div>
          <div className="stat-change positive">+0.8 km/L</div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Fuel Logs</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Date</th>
              <th>Liters</th>
              <th>Cost</th>
              <th>Odometer</th>
            </tr>
          </thead>
          <tbody>
            {fuelLogs.map((log) => (
              <tr key={log.id}>
                <td style={{ fontWeight: '500' }}>{log.vehicle}</td>
                <td>{log.date}</td>
                <td>{log.liters}L</td>
                <td style={{ color: '#34D399' }}>${log.cost.toFixed(2)}</td>
                <td>{log.odometer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
