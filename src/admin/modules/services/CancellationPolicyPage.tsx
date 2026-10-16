export default function CancellationPolicyPage() {
  return (
    <div className="p-6 bg-[#f5f7f9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Chính sách hủy (Theo nhóm dịch vụ)</h1>
      <div className="bg-white border border-[#e1e5ea] p-6 rounded shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Cấu hình mức phạt</h2>
        <div className="space-y-4 max-w-2xl">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span>Thời gian miễn phí sau khi đăng:</span>
            <input type="text" defaultValue="5 phút" className="border border-[#e1e5ea] p-1 text-center w-24 rounded" />
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span>Mốc trước ca (miễn phí):</span>
            <input type="text" defaultValue="2 giờ" className="border border-[#e1e5ea] p-1 text-center w-24 rounded" />
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span>Phí cố định phạt hủy muộn (VNĐ):</span>
            <input type="number" defaultValue={20000} className="border border-[#e1e5ea] p-1 text-center w-32 rounded" />
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span>Phần trăm phí muộn (trên Base Price):</span>
            <input type="number" defaultValue={10} className="border border-[#e1e5ea] p-1 text-center w-24 rounded" />
          </div>
        </div>
        <button className="mt-6 bg-[#fdd506] px-4 py-2 rounded font-semibold text-black hover:bg-[#ffb330]">
          Cập nhật chính sách
        </button>
      </div>
    </div>
  );
}
