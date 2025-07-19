export default {
  getTenDonVi: () => {
    return TableQNTB.updatedRow?.ten_don_vi 
        || TableQNTB.newRow?.ten_don_vi 
        || TableQNTB.selectedRow?.ten_don_vi;
  }
}
