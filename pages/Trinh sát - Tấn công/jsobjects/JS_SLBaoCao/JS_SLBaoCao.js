export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SLBaoCao.run(); // 👉 Truy vấn Appsmith trả về dữ liệu báo cáo theo hướng
        if (SLBaoCao.data && SLBaoCao.data.length > 0) {
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

    const dataRows = SLBaoCao.data.map(row => ({
      huong: row["ten_huong"] ?? "Không rõ",
      count: Number(row["so_luong_bao_cao"])
    }));

    const huongs = dataRows.map(item => item.huong);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}: {c} báo cáo"
      },
      title: {
        text: "Báo cáo",
        left: "center"
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
          data: huongs,
          name: "Hướng"
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "Số lượng báo cáo",
          minInterval: 1
        }
      ],
      series: [
        {
          name: "Báo cáo",
          type: "bar",
          data: counts,
					label: {
      			show: true,           // 👈 Hiển thị nhãn
      			position: "top",      // 👈 Vị trí trên đầu cột
      			formatter: "{c}"      // 👈 Hiển thị giá trị y (số lượng)
    				},
          encode: {
            x: "Hướng",
            y: "SL báo cáo"
          }
        }
      ]
    };

    return options;
  }
};
