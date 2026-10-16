import { Search, Plus, Edit2, MoreVertical } from 'lucide-react';

export default function VoucherManagementPage() {
  return (
    <div className="p-6 bg-[#f5f7f9] min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Voucher Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Tìm kiếm voucher..." className="pl-9 pr-4 py-2 border rounded-md" />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tạo voucher
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Loại</th>
              <th className="px-4 py-3 font-medium">Max</th>
              <th className="px-4 py-3 font-medium">Limit</th>
              <th className="px-4 py-3 font-medium">Đã dùng</th>
              <th className="px-4 py-3 font-medium">Đối tượng</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Bắt đầu</th>
              <th className="px-4 py-3 font-medium">Kết thúc</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-4 font-semibold text-blue-600">NEWEMP50</td>
              <td className="px-4 py-4">Percentage (50%)</td>
              <td className="px-4 py-4">50.000₫</td>
              <td className="px-4 py-4">1000</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs">412</span>
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: '41.2%' }}></div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">Employer mới</td>
              <td className="px-4 py-4 text-gray-500">Tất cả</td>
              <td className="px-4 py-4">01/10/2026</td>
              <td className="px-4 py-4">31/10/2026</td>
              <td className="px-4 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Active</span></td>
              <td className="px-4 py-4 flex gap-2">
                <button className="text-blue-600 hover:text-blue-800"><Edit2 className="w-4 h-4" /></button>
                <button className="text-gray-500 hover:text-gray-700"><MoreVertical className="w-4 h-4" /></button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-4 font-semibold text-blue-600">FREESHIP10K</td>
              <td className="px-4 py-4">Fixed (10.000₫)</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4">500</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs">500</span>
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-gray-400 h-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">Tất cả</td>
              <td className="px-4 py-4 text-gray-500">Giao hàng</td>
              <td className="px-4 py-4">15/09/2026</td>
              <td className="px-4 py-4">15/10/2026</td>
              <td className="px-4 py-4"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">Expired</span></td>
              <td className="px-4 py-4 flex gap-2">
                <button className="text-blue-600 hover:text-blue-800"><Edit2 className="w-4 h-4" /></button>
                <button className="text-gray-500 hover:text-gray-700"><MoreVertical className="w-4 h-4" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
