import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Fuel, 
  Receipt, 
  Wrench,
  Bell,
  Navigation,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import { useState } from 'react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/vehicles', icon: Car, label: 'My Vehicles' },
  { to: '/fuel-log', icon: Fuel, label: 'Fuel Log' },
  { to: '/expenses', icon: Receipt, label: 'Expenses' },
  { to: '/trips', icon: Navigation, label: 'Trip Logger' },
  { to: '/reminders', icon: Bell, label: 'Reminders' },
  { to: '/service-history', icon: Wrench, label: 'Service History' },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">V</div>
            <span className="sidebar-title">Veh</span>
          </div>
          
          <nav className="sidebar-nav">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                end={to === '/'}
              >
                <Icon />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
          
          <div className="sidebar-footer">
            <div style={{ marginBottom: '10px', color: theme.textMuted, fontSize: '13px' }}>
              {user?.email}
            </div>
            <button 
              className="nav-link" 
              onClick={handleLogout}
              style={{ border: 'none', width: '100%', textAlign: 'left' }}
            >
              <LogOut />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      )}
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
