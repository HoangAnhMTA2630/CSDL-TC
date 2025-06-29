export default {
  async insertBCAndLinkKH() {
    const result = await InsertQueryBC.run();
    const newId = result[0].id;

    await InsertQueryKHBC.run({
      ke_hoach_id: data_table_KH.selectedRow.id,
      bao_cao_id: newId
    });

    showAlert("Thêm báo cáo và liên kết thành công!", "success");
  }
}
