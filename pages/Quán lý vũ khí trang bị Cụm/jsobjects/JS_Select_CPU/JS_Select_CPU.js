export default {
  getUnitTreeData() {
    return DSThuocTinhCPU.data.map(item => ({
      label: item.gia_tri,
      value: item.gia_tri
    }));
  }
};
