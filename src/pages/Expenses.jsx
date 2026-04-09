import { Receipt, PlusCircle, TrendingUp, CreditCard } from 'lucide-react';

const expenses = [
  { id: 1, category: 'Fuel', description: 'Toyota Camry - 45.2L', amount: 72.50, date: 'Apr 8, 2026' },
  { id: 2, category: 'Insurance', description: 'Honda Civic - Monthly', amount: 150.00, date: 'Apr 1, 2026' },
  { id: 3, category: 'Parking', description: 'Downtown Parking', amount: 25.00, date: 'Apr 5, 2026' },
  { id: 4, category: 'Toll', description: 'Highway 101', amount: 12.50, date: 'Apr 3, 2026' },
];

const categories = [
  { name: 'Fuel', color: '#4F46E5' },
  { name: 'Insurance', color: '#34D399' },
  { name: 'Service', color: '#FBBF24' },
  { name: 'Parking', color: '#F87171' },
];

export default function Expenses() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Expenses</h1>
        <p className="page-subtitle">Track all your vehicle expenses</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">This Month</div>
          <div className="stat-value">$1,240</div>
          <div className="stat-change negative">+$120 vs last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Year to Date</div>
          <div className="stat-value">$8,450</div>
          <div className="stat-change positive">On track</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg. per Vehicle</div>
          <div className="stat-value">$413</div>
          <div className="stat-change">Per month</div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Expenses</h3>
          <button className="btn btn-primary">
            <PlusCircle size={18} />
            Add Expense
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const cat = categories.find(c => c.name === expense.category);
              return (
                <tr key={expense.id}>
                  <td>
                    <span className="badge" style={{ backgroundColor: `${cat?.color}20`, color: cat?.color }}>
                      {expense.category}
                    </span>
                  </td>
                  <td>{expense.description}</td>
                  <td style={{ color: '#F87171' }}>-${expense.amount.toFixed(2)}</td>
                  <td>{expense.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
