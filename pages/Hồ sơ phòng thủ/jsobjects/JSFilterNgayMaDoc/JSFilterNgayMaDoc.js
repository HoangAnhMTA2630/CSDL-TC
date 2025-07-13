export default {
  fromDate: () => {
    if (DatePicker_TuNgay.selectedDate) {
      return moment(DatePicker_TuNgay.selectedDate).format("YYYY-MM-DD");
    } else if (DatePicker_DenNgay.selectedDate) {
      return '1900-01-01'; // từ ngày rất sớm
    } else {
      return null;
    }
  },

  toDate: () => {
    if (DatePicker_DenNgay.selectedDate) {
      return moment(DatePicker_DenNgay.selectedDate).format("YYYY-MM-DD");
    } else if (DatePicker_TuNgay.selectedDate) {
      return moment().format("YYYY-MM-DD"); // hôm nay
    } else {
      return null;
    }
  },

  hasDate: () => {
    return !!(DatePicker_TuNgay.selectedDate || DatePicker_DenNgay.selectedDate);
  }
}
