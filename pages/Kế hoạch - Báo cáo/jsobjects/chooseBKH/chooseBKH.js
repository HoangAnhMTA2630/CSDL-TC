export default {
  validateSelection: () => {
    const selectedNode = TreeSelect1.selectedOptionLabel;

    if (!selectedNode.startsWith("🗃️")) {
      showAlert("Vui lòng chọn đúng Bộ kế hoạch (biểu tượng 🗃️)", "warning");
			storeValue("IDBoKH", undefined);
      return false;
    }
    // Nếu hợp lệ, lưu vào store
    storeValue("IDBoKH", TreeSelect1.selectedOptionValue);
    return true;
  }
}