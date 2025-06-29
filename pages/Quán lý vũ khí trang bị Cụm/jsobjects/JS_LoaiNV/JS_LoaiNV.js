export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SL_TB_NhiemVu.run(); // 👈 Tên function tương ứng với truy vấn SQL
        if (SL_TB_NhiemVu.data && SL_TB_NhiemVu.data.length >= 0) {
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

    const dataRows = SL_TB_NhiemVu.data.map(row => ({
      loai: String(row["loai_vu_khi"]),
      count: Number(row["so_luong_thiet_bi"])
    }));

    const labels = dataRows.map(item => item.loai);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}: {c} thiết bị"
      },
      title: {
        text: "Thống kê thiết bị theo loại vũ khí",
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
      xAxis: [
        {
          type: "category",
          data: labels,
          name: "Loại vũ khí"
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "Số lượng thiết bị",
          minInterval: 1
        }
      ],
      series: [
        {
          name: "Thiết bị",
          type: "bar",
          data: counts,
          itemStyle: {
            color: "#91cc75"
          }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
