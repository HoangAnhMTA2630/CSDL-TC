export default {
	/**
	 * Định dạng danh sách ban ngành thành {label, value}
	 * @param {Array} flatData - Dữ liệu từ Query_banNganhTheoHuong.data
	 * @returns {Array} - Mảng [{label, value}]
	 */
	formatData(flatData) {
		if (!flatData || !Array.isArray(flatData)) {
			return [];
		}

		// Gán cả label và value đều là tên ban ngành
		return flatData
			.filter(item => item.ten_to_chuc) // loại bỏ null nếu có
			.map(item => ({
				label: item.ten_to_chuc,
				value: item.ten_to_chuc
			}))
			.sort((a, b) => a.label.localeCompare(b.label)); // sắp xếp theo tên
	},

	/**
	 * Hàm helper để lấy dữ liệu đã định dạng từ truy vấn
	 */
	getOptions() {
		return this.formatData(DSToChuc.data);
	}
};
