import { Wrench, PlusCircle, Calendar, CheckCircle } from 'lucide-react';

const services = [
  { id: 1, vehicle: 'Toyota Camry', service: 'Oil Change', date: 'Mar 15, 2026', cost: 85.00, status: 'completed', odometer: '44,500 km' },
  { id: 2, vehicle: 'Honda Civic', service: 'Tire Rotation', date: 'Mar 10, 2026', cost: 45.00, status: 'completed', odometer: '31,800 km' },
  { id: 3, vehicle: 'Toyota Camry', service: 'Brake Inspection', date: 'Feb 28, 2026', cost: 0, status: 'completed', odometer: '44,000 km' },
  { id: 4, vehicle: 'Tesla Model 3', service: 'Annual Inspection', date: 'Feb 15, 2026', cost: 120.00, status: 'completed', odometer: '18,000 km' },
];

export default function ServiceHistory() {
  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Service History</h1>
          <p className="page-subtitle">Track your vehicle maintenance</p>
        </div>
        <button className="btn btn-primary">
          <PlusCircle size={18} />
          Schedule Service
        </button>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Services</div>
          <div className="stat-value">8</div>
          <div className="stat-change positive">This year</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value">$1,240</div>
          <div className="stat-change">Service costs YTD</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Upcoming</div>
          <div className="stat-value">2</div>
          <div className="stat-change">Scheduled</div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Service Records</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {services.map((service) => (
            <div 
              key={service.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#334155',
                borderRadius: '10px'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                backgroundColor: '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wrench size={24} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{service.service}</div>
                <div style={{ fontSize: '13px', color: '#94A3B8' }}>
                  {service.vehicle} • {service.odometer}
                </div>
              </div>
              <div style={{ textAlign: 'right', marginRight: '15px' }}>
                <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '4px' }}>{service.date}</div>
                {service.cost > 0 ? (
                  <div style={{ fontWeight: '600', color: '#F87171' }}>${service.cost.toFixed(2)}</div>
                ) : (
                  <div style={{ fontSize: '13px', color: '#34D399' }}>Warranty</div>
                )}
              </div>
              <CheckCircle size={20} style={{ color: '#34D399' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
