export default {
  showTableByCategory(category) {
    if (category === "Còn lại") {
      DSMayTinhTheoThuocTinhRAMCPU.run();
			showWidget("");
		} else {
      DSMayTinhTheoThuocTinhRAMCPU.run()
    }
  }
}