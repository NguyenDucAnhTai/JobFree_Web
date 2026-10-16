import { useState } from 'react';
import { BreakGlassModal } from './BreakGlassModal';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'Employer' | 'Worker';
  phone: string;
  verified: 'Verified' | 'Pending' | 'Rejected';
  rating: string;
  jobs: number;
  wallet: string;
  status: 'Active' | 'Suspended' | 'Flagged';
  createdAt: string;
}

const mockUsers: UserData[] = [
  { id: 'U001', name: 'Đặng Thị Lan', email: 'lan.dang@gmail.com', role: 'Employer', phone: '0906 789 012', verified: 'Pending', rating: '4.4 ★', jobs: 7, wallet: '0₫', status: 'Active', createdAt: '2026-04-02' },
  { id: 'U002', name: 'Hoàng Văn Đức', email: 'vanduc@gmail.com', role: 'Worker', phone: '0907 890 123', verified: 'Rejected', rating: '3.9 ★', jobs: 12, wallet: '50.000₫', status: 'Suspended', createdAt: '2025-11-19' },
  { id: 'U003', name: 'Võ Gia Hân', email: 'giahan@gmail.com', role: 'Worker', phone: '0905 678 901', verified: 'Verified', rating: '4.7 ★', jobs: 92, wallet: '660.000₫', status: 'Active', createdAt: '2025-07-08' },
  { id: 'U004', name: 'Phạm Hoàng Nam', email: 'hoangnam@gmail.com', role: 'Worker', phone: '0904 567 890', verified: 'Pending', rating: '4.2 ★', jobs: 26, wallet: '180.000₫', status: 'Flagged', createdAt: '2026-01-15' },
  { id: 'U005', name: 'Bùi Khánh Linh', email: 'khanhlinh@gmail.com', role: 'Worker', phone: '0908 901 234', verified: 'Verified', rating: '4.8 ★', jobs: 156, wallet: '1.320.000₫', status: 'Active', createdAt: '2025-05-22' },
  { id: 'U006', name: 'Nguyễn Minh Anh', email: 'minhanh@gmail.com', role: 'Employer', phone: '0901 234 567', verified: 'Verified', rating: '4.8 ★', jobs: 42, wallet: '1.250.000₫', status: 'Active', createdAt: '2025-08-12' },
  { id: 'U007', name: 'Trần Quốc Bảo', email: 'quocbao@gmail.com', role: 'Worker', phone: '0902 345 678', verified: 'Verified', rating: '4.9 ★', jobs: 138, wallet: '850.000₫', status: 'Active', createdAt: '2025-06-03' },
  { id: 'U008', name: 'Lê Thanh Hương', email: 'thanhhuong@gmail.com', role: 'Employer', phone: '0903 456 789', verified: 'Verified', rating: '4.6 ★', jobs: 19, wallet: '420.000₫', status: 'Active', createdAt: '2025-09-21' },
];

export function AllUsersPage() {
  const [isBreakGlassOpen, setBreakGlassOpen] = useState(false);
  const [isPIIRevealed, setPIIRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  
  const handleBreakGlassSubmit = () => {
    setPIIRevealed(true);
    setBreakGlassOpen(false);
  };

  const getVerifiedBadgeColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Suspended': return 'bg-gray-100 text-gray-600'; // or red
      case 'Flagged': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const maskPhone = (phone: string) => {
    if (isPIIRevealed) return phone;
    return phone.replace(/(\d{4})\s(\d{3})\s(\d{3})/, '$1 *** ***');
  };

  const tabs = ['All', 'Employers', 'Workers', 'Suspended', 'Flagged'];

  return (
    <div className="p-6 bg-[#f5f7f9] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        {!isPIIRevealed && (
          <button 
            onClick={() => setBreakGlassOpen(true)}
            className="bg-red-100 text-red-600 px-4 py-2 rounded font-semibold border border-red-200 hover:bg-red-200"
          >
            Yêu cầu Break-glass
          </button>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2 bg-white p-1 rounded border border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`px-4 py-1 rounded text-sm font-medium ${activeTab === tab ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo tên, SĐT, email…"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-md font-medium flex items-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tạo user
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#e1e5ea] rounded shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-[#e1e5ea] text-gray-600">
              <th className="p-4 font-semibold whitespace-nowrap">Tên</th>
              <th className="p-4 font-semibold whitespace-nowrap">Role</th>
              <th className="p-4 font-semibold whitespace-nowrap">SĐT</th>
              <th className="p-4 font-semibold whitespace-nowrap">Verified</th>
              <th className="p-4 font-semibold whitespace-nowrap">Rating</th>
              <th className="p-4 font-semibold whitespace-nowrap">Jobs</th>
              <th className="p-4 font-semibold whitespace-nowrap">Ví</th>
              <th className="p-4 font-semibold whitespace-nowrap">Status</th>
              <th className="p-4 font-semibold whitespace-nowrap">Tạo lúc</th>
              <th className="p-4 font-semibold whitespace-nowrap text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map(user => (
              <tr key={user.id} className="border-b border-[#e1e5ea] hover:bg-gray-50">
                <td className="p-4">
                  <a href="#" className="font-semibold text-blue-600 hover:underline">{user.name}</a>
                  <div className="text-gray-500 text-xs mt-1">{isPIIRevealed ? user.email : user.email.replace(/(.{2})(.*)(?=@)/, "$1***")}</div>
                </td>
                <td className="p-4 text-gray-700">{user.role}</td>
                <td className="p-4 text-gray-700">{maskPhone(user.phone)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getVerifiedBadgeColor(user.verified)}`}>
                    {user.verified}
                  </span>
                </td>
                <td className="p-4 text-gray-700 font-medium">{user.rating}</td>
                <td className="p-4 text-gray-700">{user.jobs}</td>
                <td className="p-4 text-gray-700 font-medium">{user.wallet}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-gray-700">{user.createdAt}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-blue-600 hover:underline font-medium text-sm">Xem</button>
                  <button className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1 rounded shadow-sm text-sm font-medium hover:bg-yellow-100">
                    Cảnh báo
                  </button>
                  <button className="bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded shadow-sm text-sm font-medium hover:bg-gray-100">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BreakGlassModal 
        isOpen={isBreakGlassOpen} 
        onClose={() => setBreakGlassOpen(false)}
        onSubmit={handleBreakGlassSubmit}
      />
    </div>
  );
}
