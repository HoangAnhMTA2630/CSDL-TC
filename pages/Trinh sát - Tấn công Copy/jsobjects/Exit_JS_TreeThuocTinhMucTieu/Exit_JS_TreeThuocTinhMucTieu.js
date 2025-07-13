export default {
	/**
	 * Định dạng danh sách ban ngành thành {label, value}
	 * @param {Array} flatData - Dữ liệu từ Query_banNganhTheoHuong.data
	 * @returns {Array} - Mảng [{label, value}]
	 */
	formatHuong(flatData) {
		if (!flatData || !Array.isArray(flatData)) {
			return [];
		}

		// Gán cả label và value đều là tên ban ngành
		return flatData
			.filter(item => item.ten_huong) // loại bỏ null nếu có
			.map(item => ({
				label: item.ten_huong,
				value: item.ten_huong
			}))
			.sort((a, b) => a.label.localeCompare(b.label)); // sắp xếp theo tên
	},
		formatTenToChuc(flatData) {
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
		formatBanNganh(flatData) {
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
	getOptions() {
		if (Select_ThuocTinh.selectedOptionValue === 1) {
			return this.formatHuong(DSHuong.data);
		} else if (Select_ThuocTinh.selectedOptionValue === 2) {
			return this.formatTenToChuc(DSThuocTinhTenToChuc.data);
		} else if (Select_ThuocTinh.selectedOptionValue === 3) {
			return this.formatBanNganh(DSThuocTinhBanNganh.data);
		} else {
			return [];
		}
	}
};
