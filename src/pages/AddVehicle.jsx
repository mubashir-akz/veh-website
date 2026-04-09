import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, ArrowLeft } from 'lucide-react';

export default function AddVehicle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    brand: '',
    model: '',
    year: '',
    fuelType: '',
    odometer: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    navigate('/vehicles');
  };

  return (
    <div>
      <div className="page-header">
        <button 
          onClick={() => navigate('/vehicles')} 
          className="btn btn-outline"
          style={{ marginBottom: '20px', padding: '8px 16px' }}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="page-title">Add New Vehicle</h1>
        <p className="page-subtitle">Register a new vehicle to your account</p>
      </div>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Vehicle Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="e.g., My Toyota Camry"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">License Plate</label>
              <input
                type="text"
                name="number"
                className="form-input"
                placeholder="e.g., ABC-1234"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Year</label>
              <input
                type="text"
                name="year"
                className="form-input"
                placeholder="e.g., 2024"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Brand</label>
              <input
                type="text"
                name="brand"
                className="form-input"
                placeholder="e.g., Toyota"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Model</label>
              <input
                type="text"
                name="model"
                className="form-input"
                placeholder="e.g., Camry"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Fuel Type</label>
              <select
                name="fuelType"
                className="form-input"
                value={formData.fuelType}
                onChange={handleChange}
                required
              >
                <option value="">Select fuel type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Current Odometer (km)</label>
              <input
                type="number"
                name="odometer"
                className="form-input"
                placeholder="e.g., 45000"
                value={formData.odometer}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Vehicle'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/vehicles')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
