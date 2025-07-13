export default {
  async getDSQuanNhanOptions() {
    await DSQuanNhan.run();
    return DSQuanNhan.data.map(item => ({
      label: item.ten_quan_nhan,
      value: item.id
    }));
  }
}