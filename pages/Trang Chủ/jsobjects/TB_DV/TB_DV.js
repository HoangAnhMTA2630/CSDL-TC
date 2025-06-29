export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SoLuongTB_DV.run(); // Thay bằng tên đúng của truy vấn
        if (SoLuongTB_DV.data && SoLuongTB_DV.data.length >= 0) {
          success = true;
        } else {
          throw new Error("Không có dữ liệu");
        }
      } catch (error) {
        retryCount++;
        console.log(`Thử lại lần ${retryCount}: ${error.message}`);
        await delay(time_delay);
      }
    }

    if (!success) {
      throw new Error("Không thể lấy dữ liệu sau nhiều lần thử.");
    }

    const dataRows = SoLuongTB_DV.data.map(row => ({
      donVi: String(row["ten_don_vi"]),
      soLuong: Number(row["so_luong_thiet_bi"])
    }));

    const labels = dataRows.map(item => item.donVi);
    const values = dataRows.map(item => item.soLuong);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: "{b}: {c} thiết bị"
      },
      title: {
        text: "Số lượng thiết bị theo đơn vị",
        left: "center",
        textStyle: {
          width: 300,
          overflow: "truncate"
        }
      },
      grid: {
        left: 15,
        right: 15,
        bottom: 30,
        top: 100,
        containLabel: true
      },
      xAxis: [{
        type: "category",
        data: labels,
        name: "Đơn vị",
        axisLabel: {
          interval: 0,
          rotate: 20
        }
      }],
      yAxis: [{
        type: "value",
        name: "Số lượng TB",
        minInterval: 1
      }],
      series: [{
        name: "Thiết bị",
        type: "bar",
        data: values,
        itemStyle: {
          color: "#5470C6"
        }
      }]
    };

    console.log(options);
    return options;
  }
}
