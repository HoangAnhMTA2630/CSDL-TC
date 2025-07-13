export default {
	/**
	 * Định dạng danh sách ban ngành thành {label, value}
	 * @param {Array} flatData - Dữ liệu từ Query_banNganhTheoHuong.data
	 * @returns {Array} - Mảng [{label, value}]
	 */
	formatBanNganhData(flatData) {
		if (!flatData || !Array.isArray(flatData)) {
			return [];
		}

		// Gán cả label và value đều là tên ban ngành
		return flatData
			.filter(item => item.ban_nganh) // loại bỏ null nếu có
			.map(item => ({
				label: item.ban_nganh,
				value: item.ban_nganh
			}))
			.sort((a, b) => a.label.localeCompare(b.label)); // sắp xếp theo tên
	},

	/**
	 * Hàm helper để lấy dữ liệu đã định dạng từ truy vấn
	 */
	getBanNganhOptions() {
		return this.formatBanNganhData(DSBanNganh.data);
	}
};
