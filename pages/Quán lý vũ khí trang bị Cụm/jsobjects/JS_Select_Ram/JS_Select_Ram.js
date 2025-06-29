export default {
  getUnitTreeData() {
    return DSThuocTinhRam.data.map(item => ({
      label: item.gia_tri,
      value: item.gia_tri
    }));
  }
};
