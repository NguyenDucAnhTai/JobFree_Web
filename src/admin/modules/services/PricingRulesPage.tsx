import { Info, Edit2, CheckCircle2, Clock } from 'lucide-react';

export default function PricingRulesPage() {
  return (
    <div className="p-6 bg-[#f5f7f9] min-h-screen text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Pricing Rules</h1>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-1">Pricing rules theo service</h2>
        <p className="text-gray-500 mb-4">Cấu hình giá cơ bản, phụ phí và phí nền tảng</p>
        
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Base</th>
                <th className="px-4 py-3 font-medium">Theo giờ</th>
                <th className="px-4 py-3 font-medium">Theo task</th>
                <th className="px-4 py-3 font-medium">Phụ phí đêm</th>
                <th className="px-4 py-3 font-medium">Phụ phí cuối tuần</th>
                <th className="px-4 py-3 font-medium">Platform fee</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium">Phụ kho</td>
                <td className="px-4 py-4">220.000₫</td>
                <td className="px-4 py-4">60.000₫</td>
                <td className="px-4 py-4">40.000₫</td>
                <td className="px-4 py-4">+20%</td>
                <td className="px-4 py-4">+15%</td>
                <td className="px-4 py-4">15%</td>
                <td className="px-4 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Active</span></td>
                <td className="px-4 py-4 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800"><Edit2 className="w-4 h-4" /></button>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium">Phụ shop & livestream</td>
                <td className="px-4 py-4">200.000₫</td>
                <td className="px-4 py-4">55.000₫</td>
                <td className="px-4 py-4">35.000₫</td>
                <td className="px-4 py-4">+20%</td>
                <td className="px-4 py-4">+15%</td>
                <td className="px-4 py-4">15%</td>
                <td className="px-4 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Active</span></td>
                <td className="px-4 py-4 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800"><Edit2 className="w-4 h-4" /></button>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium">Dọn sân vườn/sân thượng</td>
                <td className="px-4 py-4">300.000₫</td>
                <td className="px-4 py-4">70.000₫</td>
                <td className="px-4 py-4">50.000₫</td>
                <td className="px-4 py-4">+20%</td>
                <td className="px-4 py-4">+15%</td>
                <td className="px-4 py-4">15%</td>
                <td className="px-4 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Active</span></td>
                <td className="px-4 py-4 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800"><Edit2 className="w-4 h-4" /></button>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Priority fees</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">Tức thì</h3>
              <CheckCircle2 className="text-green-500 w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Clock className="w-4 h-4" />
              <span>Thời gian: <span className="font-medium text-gray-900">10-30 phút</span></span>
            </div>
            <div className="text-gray-600 mb-4">
              Phí: <span className="font-medium text-red-600 text-lg">30.000₫</span>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline w-full text-center border border-blue-100 rounded py-2">
              Chỉnh sửa
            </button>
          </div>
          
          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">Nhanh</h3>
              <CheckCircle2 className="text-green-500 w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Clock className="w-4 h-4" />
              <span>Thời gian: <span className="font-medium text-gray-900">45-90 phút</span></span>
            </div>
            <div className="text-gray-600 mb-4">
              Phí: <span className="font-medium text-orange-500 text-lg">15.000₫</span>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline w-full text-center border border-blue-100 rounded py-2">
              Chỉnh sửa
            </button>
          </div>

          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">Bình thường</h3>
              <CheckCircle2 className="text-green-500 w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Clock className="w-4 h-4" />
              <span>Thời gian: <span className="font-medium text-gray-900">4-6 giờ</span></span>
            </div>
            <div className="text-gray-600 mb-4">
              Phí: <span className="font-medium text-gray-900 text-lg">0₫</span>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline w-full text-center border border-blue-100 rounded py-2">
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-yellow-50 p-4 rounded-md border border-yellow-100">
        <Info className="w-5 h-5 text-yellow-500 flex-shrink-0" />
        <p>Ghi chú: Mọi thay đổi giá chỉ áp dụng cho job tạo sau thời điểm lưu.</p>
      </div>
      
      <button className="bg-blue-600 text-white font-medium px-6 py-2.5 rounded-md hover:bg-blue-700 transition shadow-sm">
        Lưu thay đổi
      </button>
    </div>
  );
}
