export default {
  // Hàm lấy dữ liệu từ điểm được click trên biểu đồ
  getSelectedChartData: () => {
    const point = ChartSL_CapKH.selectedDataPoint.rawEventData.name;
		
    if (!point || !point.x || !point.seriesTitle) {
      return null;
    }

    return {
      loai: point.x,
      cap: point.seriesTitle,
      so_luong: point.y
    };
  },

  // Hàm chạy khi click: lưu giá trị & mở modal
  handleChartClick: async () => {
    const selected = ColumnChart1.selectedDataPoint;
    if (!selected) return;

    await storeValue("selectedLoaiKH", selected.x);
    await storeValue("selectedCap", selected.seriesTitle);
    await showModal("ModalChiTietKH");
  }
};
