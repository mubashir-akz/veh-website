import { useAuth } from '../context/AuthContext';
import { Car, Fuel, Receipt, Wrench, TrendingUp, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Total Vehicles', value: '3', icon: Car, change: '+1 this month', positive: true },
    { label: 'Fuel Expenses', value: '$485', icon: Fuel, change: '+$65 vs last month', positive: false },
    { label: 'Total Expenses', value: '$1,240', icon: Receipt, change: '+$120 vs last month', positive: false },
    { label: 'Services', value: '8', icon: Wrench, change: '2 upcoming', positive: true },
  ];

  const recentActivities = [
    { id: 1, text: 'Fuel logged for Toyota Camry', time: '2 hours ago', type: 'fuel' },
    { id: 2, text: 'Oil change scheduled for Honda Civic', time: '1 day ago', type: 'service' },
    { id: 3, text: 'New vehicle added: Tesla Model 3', time: '3 days ago', type: 'vehicle' },
    { id: 4, text: 'Insurance payment recorded', time: '5 days ago', type: 'expense' },
  ];

  const upcomingServices = [
    { id: 1, vehicle: 'Toyota Camry', service: 'Oil Change', date: 'Apr 15, 2026', status: 'scheduled' },
    { id: 2, vehicle: 'Honda Civic', service: 'Tire Rotation', date: 'Apr 20, 2026', status: 'scheduled' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user?.name || 'User'}</h1>
        <p className="page-subtitle">Here's what's happening with your vehicles</p>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                  {stat.change}
                </div>
              </div>
              <stat.icon size={24} style={{ color: '#4F46E5' }} />
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivities.map((activity) => (
              <div key={activity.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '12px',
                backgroundColor: '#334155',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: activity.type === 'fuel' ? '#4F46E5' : 
                                   activity.type === 'service' ? '#34D399' : 
                                   activity.type === 'vehicle' ? '#FBBF24' : '#F87171'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px' }}>{activity.text}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Upcoming Services</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingServices.map((service) => (
              <div key={service.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '12px',
                backgroundColor: '#334155',
                borderRadius: '8px'
              }}>
                <Wrench size={20} style={{ color: '#4F46E5' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>{service.vehicle}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{service.service} • {service.date}</div>
                </div>
                <span className="badge badge-warning">{service.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
