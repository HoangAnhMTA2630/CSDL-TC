export default {
	/**
	 * Chuyển đổi dữ liệu phẳng từ truy vấn 'huong' thành định dạng
	 * mảng các object {label, value} để sử dụng trong UI.
	 * @param {Array} flatData - Dữ liệu từ Query_huong.data
	 * @returns {Array} - Mảng đã được định dạng và sắp xếp
	 */
	formatHuongData(flatData) {
		// 1. Kiểm tra nếu không có dữ liệu thì trả về mảng rỗng
		if (!flatData || !Array.isArray(flatData)) {
			return [];
		}

		// 2. Dùng .map() để chuyển đổi mỗi dòng dữ liệu
		const formatted = flatData.map(item => ({
			// 'label' lấy từ cột 'y' (tức là 'ten_huong')
			label: item.y,
			// 'value' lấy từ cột 'x' (tức là 'id')
			value: item.x
		}));

		// 3. Sắp xếp mảng kết quả theo ID (value) tăng dần
		formatted.sort((a, b) => a.value - b.value);

		return formatted;
	},

	/**
	 * Hàm helper để lấy và định dạng dữ liệu từ truy vấn
	 * Giả sử bạn có một truy vấn tên là Query_huong
	 */
	getHuongOptions() {
		return this.formatHuongData(CayThuMucHuong.data);
	}
};