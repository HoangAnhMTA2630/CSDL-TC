export default {
	/**
	 * Chuyển đổi dữ liệu phẳng từ truy vấn 'huong' thành định dạng
	 * mảng các object {label, value} để sử dụng trong UI.
	 * @param {Array} flatData - Dữ liệu từ Query_huong.data
	 * @returns {Array} - Mảng đã được định dạng và sắp xếp
	 */
	formatData(flatData) {
		// 1. Kiểm tra nếu không có dữ liệu thì trả về mảng rỗng
		if (!flatData || !Array.isArray(flatData)) {
			return [];
		}

		// 2. Dùng .map() để chuyển đổi mỗi dòng dữ liệu
		const formatted = flatData.map(item => ({
	
			label: item.tinh_trang,
	
			value: item.tinh_trang
		}));

		// 3. Sắp xếp mảng kết quả theo ID (value) tăng dần
		formatted.sort((a, b) => a.value - b.value);

		return formatted;
	},

	/**
	 * Hàm helper để lấy và định dạng dữ liệu từ truy vấn
	 * Giả sử bạn có một truy vấn tên là Query_huong
	 */
	getOptions() {
		return this.formatData(DSTinhTrang.data);
	}
};