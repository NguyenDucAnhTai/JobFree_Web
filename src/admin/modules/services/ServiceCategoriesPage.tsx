import { Search, Plus, Edit, MoreVertical, Package, Camera, Sprout, Store, Utensils } from 'lucide-react';

export default function ServiceCategoriesPage() {
  return (
    <div className="p-6 bg-[#f5f7f9] min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Service Categories</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Tìm kiếm category..." className="pl-9 pr-4 py-2 border rounded-md" />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tạo Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Card 1: Phụ kho */}
        <div className="bg-white border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Phụ kho
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
                </h3>
                <p className="text-sm text-gray-500">Hỗ trợ kho hàng, sắp xếp, kiểm đếm</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-4 text-sm">
            <div><span className="text-gray-500">Base price:</span> <span className="font-medium">220.000₫</span></div>
            <div><span className="text-gray-500">Sub-services:</span> <span className="font-medium">5</span></div>
          </div>
          <div className="mb-6">
            <p className="text-sm font-medium mb-2 text-gray-700">Sub-services</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Kiểm đếm</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Gom đơn</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Phân loại</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Lấy hàng</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Sắp xếp kho</span>
            </div>
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <button className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4"/> Sub</button>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
              <button className="text-gray-500 hover:text-blue-600"><MoreVertical className="w-4 h-4"/></button>
            </div>
          </div>
        </div>

        {/* Card 2: Phụ shop & livestream */}
        <div className="bg-white border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Phụ shop & livestream
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
                </h3>
                <p className="text-sm text-gray-500">Phụ bán hàng online, đóng gói, chốt đơn</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-4 text-sm">
            <div><span className="text-gray-500">Base price:</span> <span className="font-medium">200.000₫</span></div>
            <div><span className="text-gray-500">Sub-services:</span> <span className="font-medium">4</span></div>
          </div>
          <div className="mb-6">
            <p className="text-sm font-medium mb-2 text-gray-700">Sub-services</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Đóng gói</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Dán tem</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Kiểm hàng</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Xử lý đơn sau livestream</span>
            </div>
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <button className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4"/> Sub</button>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
              <button className="text-gray-500 hover:text-blue-600"><MoreVertical className="w-4 h-4"/></button>
            </div>
          </div>
        </div>

        {/* Card 3: Dọn sân vườn/sân thượng */}
        <div className="bg-white border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-3 rounded-lg text-green-600">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Dọn sân vườn/sân thượng
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
                </h3>
                <p className="text-sm text-gray-500">Vệ sinh khu vực ngoài trời tại gia</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-4 text-sm">
            <div><span className="text-gray-500">Base price:</span> <span className="font-medium">300.000₫</span></div>
            <div><span className="text-gray-500">Sub-services:</span> <span className="font-medium">3</span></div>
          </div>
          <div className="mb-6">
            <p className="text-sm font-medium mb-2 text-gray-700">Sub-services</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Cắt cỏ</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Quét dọn</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Tưới cây</span>
            </div>
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <button className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4"/> Sub</button>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
              <button className="text-gray-500 hover:text-blue-600"><MoreVertical className="w-4 h-4"/></button>
            </div>
          </div>
        </div>

        {/* Card 4: Setup quầy bán hàng */}
        <div className="bg-white border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-50 p-3 rounded-lg text-orange-600">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Setup quầy bán hàng
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
                </h3>
                <p className="text-sm text-gray-500">Chuẩn bị gian hàng sự kiện, hội chợ</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-4 text-sm">
            <div><span className="text-gray-500">Base price:</span> <span className="font-medium">280.000₫</span></div>
            <div><span className="text-gray-500">Sub-services:</span> <span className="font-medium">3</span></div>
          </div>
          <div className="mb-6">
            <p className="text-sm font-medium mb-2 text-gray-700">Sub-services</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Khuân vác</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Trưng bày</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Dọn dẹp</span>
            </div>
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <button className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4"/> Sub</button>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
              <button className="text-gray-500 hover:text-blue-600"><MoreVertical className="w-4 h-4"/></button>
            </div>
          </div>
        </div>

        {/* Card 5: Setup tiệc tại gia */}
        <div className="bg-white border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-50 p-3 rounded-lg text-red-600">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Setup tiệc tại gia
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
                </h3>
                <p className="text-sm text-gray-500">Hỗ trợ chuẩn bị và phục vụ tiệc nhỏ</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-4 text-sm">
            <div><span className="text-gray-500">Base price:</span> <span className="font-medium">300.000₫</span></div>
            <div><span className="text-gray-500">Sub-services:</span> <span className="font-medium">4</span></div>
          </div>
          <div className="mb-6">
            <p className="text-sm font-medium mb-2 text-gray-700">Sub-services</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Bàn ghế</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Chén dĩa</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Phục vụ</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Rửa dọn</span>
            </div>
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <button className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4"/> Sub</button>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
              <button className="text-gray-500 hover:text-blue-600"><MoreVertical className="w-4 h-4"/></button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
