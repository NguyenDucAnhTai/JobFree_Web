import { useState } from 'react';

const mockRefunds = [
  { id: 'RF1201', job: 'J10248', employer: 'Nguyễn Minh Anh', amount: '280.000₫', reason: 'Worker không đến đúng giờ', status: 'Pending', createdAt: '2026-06-24 08:40' },
  { id: 'RF1202', job: 'J10251', employer: 'Lê Thanh Hương', amount: '250.000₫', reason: 'Worker làm sai yêu cầu', status: 'Pending', createdAt: '2026-06-23 19:10' },
  { id: 'RF1200', job: 'J10240', employer: 'Đặng Thị Lan', amount: '360.000₫', reason: 'Hủy do thời tiết', status: 'Approved', createdAt: '2026-06-22 11:00' },
  { id: 'RF1199', job: 'J10231', employer: 'Nguyễn Minh Anh', amount: '180.000₫', reason: 'Không đủ chứng cứ', status: 'Rejected', createdAt: '2026-06-21 15:00' },
];

const mockWithdrawals = [
  { id: 'WD0891', worker: 'Hoàng Văn Đức', bank: 'Vietcombank • 1029384756', amount: '500.000₫', status: 'Pending', createdAt: '2026-06-24 08:20' },
  { id: 'WD0890', worker: 'Lý Minh Hiếu', bank: 'MBBank', amount: '1.200.000₫', status: 'Pending', createdAt: '2026-06-23 10:15' },
  { id: 'WD0889', worker: 'Võ Gia Hân', bank: 'Techcombank', amount: '300.000₫', status: 'Approved', createdAt: '2026-06-22 09:00' },
  { id: 'WD0888', worker: 'Phạm Hoàng Nam', bank: 'ACB', amount: '450.000₫', status: 'Rejected', createdAt: '2026-06-21 14:20' },
];

export const RefundsWithdrawalsPage = () => {
  const [activeTab, setActiveTab] = useState<'refunds' | 'withdrawals'>('refunds');
  const [filter, setFilter] = useState('Tất cả');
  
  const [refunds, setRefunds] = useState(mockRefunds);
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const updateStatus = (status: string) => {
    if (activeTab === 'refunds') {
      setRefunds(refunds.map(r => r.id === selectedItem.id ? { ...r, status } : r));
    } else {
      setWithdrawals(withdrawals.map(w => w.id === selectedItem.id ? { ...w, status } : w));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Refunds & Withdrawals</h1>
      
      <div className="flex gap-4 border-b mb-4">
        <button 
          className={`py-2 px-4 ${activeTab === 'refunds' ? 'border-b-2 border-blue-600 font-bold' : ''}`}
          onClick={() => setActiveTab('refunds')}
        >
          Refund requests
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'withdrawals' ? 'border-b-2 border-blue-600 font-bold' : ''}`}
          onClick={() => setActiveTab('withdrawals')}
        >
          Withdrawal requests
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {['Tất cả', 'Pending', 'Approved', 'Rejected'].map(f => (
          <button 
            key={f}
            className={`px-3 py-1 rounded-full border text-sm ${filter === f ? 'bg-blue-100 border-blue-600' : 'bg-white'}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 border rounded shadow-sm">
        <h2 className="text-lg font-bold mb-4">
          {activeTab === 'refunds' ? 'Yêu cầu hoàn tiền' : 'Yêu cầu rút tiền'}
        </h2>
        
        <table className="w-full text-left border-collapse">
          <thead>
            {activeTab === 'refunds' ? (
              <tr className="border-b">
                <th className="py-2">Request</th>
                <th className="py-2">Job</th>
                <th className="py-2">Employer</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Lý do</th>
                <th className="py-2">Status</th>
                <th className="py-2">Tạo lúc</th>
                <th className="py-2">Thao tác</th>
              </tr>
            ) : (
              <tr className="border-b">
                <th className="py-2">Request</th>
                <th className="py-2">Worker</th>
                <th className="py-2">Ngân hàng</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
                <th className="py-2">Tạo lúc</th>
                <th className="py-2">Thao tác</th>
              </tr>
            )}
          </thead>
          <tbody>
            {activeTab === 'refunds' && refunds.filter(r => filter === 'Tất cả' || r.status === filter).map((r) => (
              <tr key={r.id} className="border-b">
                <td className="py-2">{r.id}</td>
                <td className="py-2">{r.job}</td>
                <td className="py-2">{r.employer}</td>
                <td className="py-2">{r.amount}</td>
                <td className="py-2">{r.reason}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-xs ${r.status === 'Approved' ? 'bg-green-100 text-green-700' : r.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="py-2">{r.createdAt}</td>
                <td className="py-2 flex gap-2">
                  <button onClick={() => handleAction(r)} className="border px-2 py-1 rounded text-sm hover:bg-gray-50">Xem</button>
                  {r.status === 'Pending' && (
                    <>
                      <button onClick={() => handleAction(r)} className="bg-green-600 text-white px-2 py-1 rounded text-sm">Duyệt</button>
                      <button onClick={() => handleAction(r)} className="bg-red-600 text-white px-2 py-1 rounded text-sm">Từ chối</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {activeTab === 'withdrawals' && withdrawals.filter(w => filter === 'Tất cả' || w.status === filter).map((w) => (
              <tr key={w.id} className="border-b">
                <td className="py-2">{w.id}</td>
                <td className="py-2">{w.worker}</td>
                <td className="py-2">{w.bank}</td>
                <td className="py-2">{w.amount}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-xs ${w.status === 'Approved' ? 'bg-green-100 text-green-700' : w.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {w.status}
                  </span>
                </td>
                <td className="py-2">{w.createdAt}</td>
                <td className="py-2 flex gap-2">
                  <button onClick={() => handleAction(w)} className="border px-2 py-1 rounded text-sm hover:bg-gray-50">Xem</button>
                  {w.status === 'Pending' && (
                    <>
                      <button onClick={() => handleAction(w)} className="bg-green-600 text-white px-2 py-1 rounded text-sm">Duyệt</button>
                      <button onClick={() => handleAction(w)} className="bg-red-600 text-white px-2 py-1 rounded text-sm">Từ chối</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Thao tác {selectedItem.id}</h3>
            <p className="mb-6">Cập nhật trạng thái cho yêu cầu này.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Hủy</button>
              <button onClick={() => updateStatus('Approved')} className="px-4 py-2 bg-green-600 text-white rounded">Duyệt</button>
              <button onClick={() => updateStatus('Rejected')} className="px-4 py-2 bg-red-600 text-white rounded">Từ chối</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
