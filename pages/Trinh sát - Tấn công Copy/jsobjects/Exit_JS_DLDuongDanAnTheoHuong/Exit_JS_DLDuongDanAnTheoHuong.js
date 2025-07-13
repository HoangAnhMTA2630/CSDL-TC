export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SLDuongDanAnTheoHuong.run(); // Đổi thành tên truy vấn đúng trong Appsmith
        if (SLDuongDanAnTheoHuong.data && SLDuongDanAnTheoHuong.data.length > 0) {
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

    const dataRows = SLDuongDanAnTheoHuong.data.map(row => ({
      huong: row["huong"] ?? "Không rõ",
      count: Number(row["so_luong_duong_dan_an"])
    }));

    const huongs = dataRows.map(item => item.huong);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: "{b}: {c} đường dẫn ẩn"
      },
      title: {
        text: "Số lượng Đường Dẫn Ẩn theo Hướng",
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
          name: "Số lượng Đường Dẫn Ẩn",
          minInterval: 1
        }
      ],
      series: [
        {
          name: "Đường dẫn ẩn",
          type: "bar",
          stack: "total", // Để stack nếu thêm loại
          data: counts,
          encode: {
            x: "Hướng",
            y: "Số lượng Đường Dẫn Ẩn"
          }
        }
      ]
    };

    return options;
  }
};
