interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, caseId: string, duration: number) => void;
}

export function BreakGlassModal({ isOpen, onClose, onSubmit }: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full border border-[#e1e5ea]">
        <h2 className="text-xl font-bold mb-4 text-red-600">Break-glass Authorization</h2>
        <p className="text-sm text-gray-600 mb-4">
          Hành động này sẽ ghi lại toàn bộ nhật ký hệ thống. Vui lòng nhập thông tin để xem dữ liệu PII đầy đủ.
        </p>
        <div className="space-y-3 mb-6">
          <input type="text" placeholder="Case ID (Bắt buộc)" className="w-full border border-[#e1e5ea] p-2 rounded" />
          <input type="text" placeholder="Lý do truy cập" className="w-full border border-[#e1e5ea] p-2 rounded" />
          <select className="w-full border border-[#e1e5ea] p-2 rounded">
            <option value="15">Thời hạn: 15 phút</option>
            <option value="30">Thời hạn: 30 phút</option>
          </select>
          <input type="password" placeholder="Re-auth Password" className="w-full border border-[#e1e5ea] p-2 rounded" />
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-[#e1e5ea] rounded">Hủy</button>
          <button onClick={() => onSubmit('test', '123', 15)} className="px-4 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700">
            Xác thực & Xem
          </button>
        </div>
      </div>
    </div>
  );
}
