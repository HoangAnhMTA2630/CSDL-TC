export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SLTheoCap.run(); // đổi tên theo query Appsmith bạn dùng
        if (SLTheoCap.data && SLTheoCap.data.length > 0) {
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

    const dataRows = SLTheoCap.data.map(row => ({
      cap: String(row["cap_trang_bi"] ?? "Không rõ"),
      count: Number(row["so_luong_thiet_bi"])
    }));

    const labels = dataRows.map(item => item.cap);
    const values = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}: {c} thiết bị"
      },
      title: {
        text: "Số lượng thiết bị theo cấp trang bị",
        left: "center"
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 40,
        top: 80,
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: labels,
          name: "Cấp trang bị"
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "Số lượng",
          minInterval: 1
        }
      ],
      series: [
        {
          name: "Thiết bị",
          type: "bar",
          data: values,
          itemStyle: {
            color: "#3BA272"
          }
        }
      ]
    };

    return options;
  }
}
