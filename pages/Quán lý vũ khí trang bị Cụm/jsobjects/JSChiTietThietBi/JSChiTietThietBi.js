export default {
  formatThietBi() {
    const data = ChiTietThietBi.data[0]; // lấy bản ghi đầu tiên
    if (!data) return [];

    return Object.entries(data).map(([key, value]) => ({
      thuoc_tinh: key.replace(/_/g, ' '),
      gia_tri: value ?? ''
    }));
  }
}
