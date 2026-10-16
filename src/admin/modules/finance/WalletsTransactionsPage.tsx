import { useState } from 'react';

const mockTransactions = [
  { id: 'TX982341', user: 'Nguyễn Minh Anh', role: 'Employer', type: 'Job payment', amount: '280.000₫', status: 'Success', method: 'Momo', time: '2026-06-24 09:12' },
  { id: 'TX982342', user: 'Trần Quốc Bảo', role: 'Worker', type: 'Job payout', amount: '252.000₫', status: 'Success', method: 'Bank transfer', time: '2026-06-24 09:15' },
  { id: 'TX982343', user: 'Lê Thanh Hương', role: 'Employer', type: 'Refund', amount: '360.000₫', status: 'Pending', method: 'Momo', time: '2026-06-24 08:50' },
  { id: 'TX982344', user: 'Hoàng Văn Đức', role: 'Worker', type: 'Withdrawal', amount: '500.000₫', status: 'Pending', method: 'Vietcombank', time: '2026-06-24 08:20' },
  { id: 'TX982345', user: 'Võ Gia Hân', role: 'Worker', type: 'Job payout', amount: '350.000₫', status: 'Success', method: 'Bank transfer', time: '2026-06-23 18:40' },
  { id: 'TX982346', user: 'Đặng Thị Lan', role: 'Employer', type: 'Platform fee', amount: '56.000₫', status: 'Success', method: 'Internal', time: '2026-06-23 13:10' },
  { id: 'TX982347', user: 'Phạm Hoàng Nam', role: 'Worker', type: 'Withdrawal', amount: '300.000₫', status: 'Failed', method: 'Techcombank', time: '2026-06-23 16:10' },
  { id: 'TX982348', user: 'Nguyễn Minh Anh', role: 'Employer', type: 'Job deposit', amount: '180.000₫', status: 'Success', method: 'VNPay', time: '2026-06-22 10:00' },
];

export const WalletsTransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tất cả loại');
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (tx: any) => {
    setSelectedTx(tx);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Wallets & Transactions</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 border rounded shadow-sm bg-white">
          <div className="text-sm text-gray-500">Tổng số dư ví</div>
          <div className="text-xl font-bold">2.184.560.000₫</div>
        </div>
        <div className="p-4 border rounded shadow-sm bg-white">
          <div className="text-sm text-gray-500">Tiền giữ escrow</div>
          <div className="text-xl font-bold">184.300.000₫</div>
        </div>
        <div className="p-4 border rounded shadow-sm bg-white relative">
          <div className="text-sm text-gray-500">Pending withdrawals</div>
          <div className="text-xl font-bold">36.200.000₫</div>
          <span className="absolute top-4 right-4 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">6 yêu cầu</span>
        </div>
        <div className="p-4 border rounded shadow-sm bg-white">
          <div className="text-sm text-gray-500">Refunded amount</div>
          <div className="text-xl font-bold">58.700.000₫</div>
        </div>
        <div className="p-4 border rounded shadow-sm bg-white">
          <div className="text-sm text-gray-500">Platform revenue</div>
          <div className="text-xl font-bold">128.500.000₫</div>
        </div>
        <div className="p-4 border rounded shadow-sm bg-white">
          <div className="text-sm text-gray-500">Failed transactions</div>
          <div className="text-xl font-bold">12</div>
        </div>
      </div>

      <div className="bg-white p-4 border rounded shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Giao dịch gần đây</h2>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="TX ID, user…" 
              className="border p-2 rounded" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="border p-2 rounded"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option>Tất cả loại</option>
              <option>Job payment</option>
              <option>Job payout</option>
              <option>Job deposit</option>
              <option>Withdrawal</option>
              <option>Refund</option>
              <option>Platform fee</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Xuất</button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">TX ID</th>
              <th className="py-2">User</th>
              <th className="py-2">Role</th>
              <th className="py-2">Loại</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
              <th className="py-2">Phương thức</th>
              <th className="py-2">Thời gian</th>
              <th className="py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="border-b">
                <td className="py-2">{tx.id}</td>
                <td className="py-2">{tx.user}</td>
                <td className="py-2">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">{tx.role}</span>
                </td>
                <td className="py-2">{tx.type}</td>
                <td className="py-2">{tx.amount}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-xs ${tx.status === 'Success' ? 'bg-green-100 text-green-700' : tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-2">{tx.method}</td>
                <td className="py-2">{tx.time}</td>
                <td className="py-2 flex gap-2">
                  <button onClick={() => handleView(tx)} className="text-blue-600 border border-blue-600 px-2 py-1 rounded text-sm hover:bg-blue-50">Xem</button>
                  <button onClick={() => handleView(tx)} className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedTx && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Chi tiết giao dịch {selectedTx.id}</h3>
            <div className="space-y-2 mb-6">
              <p><strong>User:</strong> {selectedTx.user}</p>
              <p><strong>Amount:</strong> {selectedTx.amount}</p>
              <p><strong>Loại:</strong> {selectedTx.type}</p>
              <p><strong>Status:</strong> {selectedTx.status}</p>
              <p><strong>Thời gian:</strong> {selectedTx.time}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
