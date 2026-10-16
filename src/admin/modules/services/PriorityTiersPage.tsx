export default function PriorityTiersPage() {
  const tiers = [
    { name: 'Normal', fee: 0, status: 'Active' },
    { name: 'Nhanh', fee: 15000, status: 'Active' },
    { name: 'Tức thì', fee: 30000, status: 'Active' },
  ];
  return (
    <div className="p-6 bg-[#f5f7f9] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gói ưu tiên (Priority Tiers)</h1>
        <button className="bg-[#fdd506] px-4 py-2 rounded font-semibold text-black hover:bg-[#ffb330]">
          + Thêm gói
        </button>
      </div>
      <div className="bg-white border border-[#e1e5ea] rounded shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-[#e1e5ea]">
              <th className="p-4 font-semibold">Tên gói</th>
              <th className="p-4 font-semibold">Phí (VNĐ)</th>
              <th className="p-4 font-semibold">Trạng thái</th>
              <th className="p-4 font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((t, idx) => (
              <tr key={idx} className="border-b border-[#e1e5ea]">
                <td className="p-4">{t.name}</td>
                <td className="p-4">{t.fee.toLocaleString()}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{t.status}</span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="text-blue-600 hover:underline text-sm">Sửa</button>
                  <button className="text-red-600 hover:underline text-sm">Tắt</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-500">Chỉ admin_system mới có quyền thêm/sửa/tắt gói ưu tiên.</p>
    </div>
  );
}
