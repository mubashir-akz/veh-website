import { useState } from 'react';
import { Wrench, Plus, Calendar, Bell, CheckCircle, AlertCircle } from 'lucide-react';

const initialReminders = [
  { id: 1, vehicleId: 1, vehicleName: 'Toyota Camry', serviceType: 'Oil Change', dueDate: 'Apr 15, 2026', dueOdometer: '46,000 km', status: 'scheduled', recurring: '3 months' },
  { id: 2, vehicleId: 2, vehicleName: 'Honda Civic', serviceType: 'Tire Rotation', dueDate: 'Apr 20, 2026', dueOdometer: '33,000 km', status: 'scheduled', recurring: '5 months' },
  { id: 3, vehicleId: 1, vehicleName: 'Toyota Camry', serviceType: 'Brake Inspection', dueDate: 'Apr 10, 2026', dueOdometer: '45,500 km', status: 'due_soon', recurring: '6 months' },
];

export default function ServiceReminders() {
  const [reminders, setReminders] = useState(initialReminders);
  const [showAdd, setShowAdd] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return <span className="badge badge-success">Scheduled</span>;
      case 'due_soon':
        return <span className="badge badge-warning">Due Soon</span>;
      case 'overdue':
        return <span className="badge badge-danger">Overdue</span>;
      case 'completed':
        return <span className="badge" style={{ backgroundColor: '#4F46E5', color: '#fff' }}>Completed</span>;
      default:
        return null;
    }
  };

  const markComplete = (id) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, status: 'completed' } : r
    ));
  };

  const overdueCount = reminders.filter(r => r.status === 'overdue').length;
  const dueSoonCount = reminders.filter(r => r.status === 'due_soon').length;
  const upcomingCount = reminders.filter(r => r.status === 'scheduled').length;

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Service Reminders</h1>
          <p className="page-subtitle">Never miss a service again</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          <Plus size={18} />
          Add Reminder
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card" style={{ borderLeft: '4px solid #F87171' }}>
          <div className="stat-label">Overdue</div>
          <div className="stat-value" style={{ color: '#F87171' }}>{overdueCount}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #FBBF24' }}>
          <div className="stat-label">Due Soon</div>
          <div className="stat-value" style={{ color: '#FBBF24' }}>{dueSoonCount}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #34D399' }}>
          <div className="stat-label">Upcoming</div>
          <div className="stat-value" style={{ color: '#34D399' }}>{upcomingCount}</div>
        </div>
      </div>

      {/* Reminder List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Reminders</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#94A3B8' }}>
              <Bell size={14} /> Auto-reminders enabled
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reminders.map((reminder) => (
            <div 
              key={reminder.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#334155',
                borderRadius: '10px',
                opacity: reminder.status === 'completed' ? 0.6 : 1,
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                backgroundColor: reminder.status === 'due_soon' ? '#FBBF24' : 
                                reminder.status === 'overdue' ? '#F87171' : '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {reminder.status === 'overdue' ? (
                  <AlertCircle size={24} color="#fff" />
                ) : (
                  <Wrench size={24} color="#fff" />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{reminder.serviceType}</div>
                <div style={{ fontSize: '13px', color: '#94A3B8' }}>
                  {reminder.vehicleName} • Due: {reminder.dueDate}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  <Calendar size={12} style={{ marginRight: '4px' }} />
                  Odometer: {reminder.dueOdometer} • {reminder.recurring} recurring
                </div>
              </div>

              {getStatusBadge(reminder.status)}

              {reminder.status !== 'completed' && (
                <button 
                  className="btn btn-outline"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                  onClick={() => markComplete(reminder.id)}
                >
                  <CheckCircle size={14} />
                  Mark Done
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Reminder Modal Placeholder */}
      {showAdd && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ maxWidth: '500px', width: '100%', margin: '20px' }}>
            <h3 style={{ marginBottom: '20px' }}>Add Service Reminder</h3>
            <p style={{ color: '#94A3B8' }}>Form would go here...</p>
            <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
