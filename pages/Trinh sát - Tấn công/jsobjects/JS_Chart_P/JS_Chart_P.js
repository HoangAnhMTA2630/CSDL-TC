export default {
  /**
   * Định dạng dữ liệu SQL trả về thành dạng [{x, y}]
   * @param {Array} data - Kết quả từ truy vấn SQL (ví dụ Query_TaiLieuTheoThang.data)
   * @returns {Array}
   */
  formatTaiLieuByMonth() {
    if (!Array.isArray()) return [];

    return Chart_Huong_P.data.map(row => ({
      x: row.thang,             // YYYY/MM
      y: row.so_luong_tai_lieu  // Số lượng
    }));
  }
};
