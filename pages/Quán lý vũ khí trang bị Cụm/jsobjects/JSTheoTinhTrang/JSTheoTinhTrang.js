export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SLTheoTinhTrang.run(); // Đổi tên thành query của bạn
        if (SLTheoTinhTrang.data && SLTheoTinhTrang.data.length > 0) {
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

    const dataRows = SLTheoTinhTrang.data.map(row => ({
      tinhTrang: String(row["tinh_trang"] ?? "Không rõ"),
      count: Number(row["so_luong_thiet_bi"])
    }));

    const labels = dataRows.map(item => item.tinhTrang);
    const values = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}: {c} thiết bị"
      },
      title: {
        text: "Thống kê số lượng thiết bị theo tình trạng",
        left: "center"
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 40,
        top: 80,
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: labels,
        name: "Tình trạng"
      },
      yAxis: {
        type: "value",
        name: "Số lượng",
        minInterval: 1
      },
      series: [
        {
          name: "Thiết bị",
          type: "bar",
          data: values,
          itemStyle: {
            color: "#5470C6"
          }
        }
      ]
    };

    return options;
  }
}
