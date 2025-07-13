export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SLLoHongTheoHuong.run(); 
        if (SLLoHongTheoHuong.data && SLLoHongTheoHuong.data.length > 0) {
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

    const dataRows = SLLoHongTheoHuong.data.map(row => ({
      huong: row["huong"] ?? "Không rõ",
      count: Number(row["so_luong_lo_hong"])
    }));

    const huongs = dataRows.map(item => item.huong);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: "{b}: {c} lỗ hổng"
      },
      title: {
        text: "Số lượng Lỗ Hổng Bảo Mật Web theo Hướng",
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
          name: "Số lượng Lỗ Hổng",
          minInterval: 1
        }
      ],
      series: [
        {
          name: "Lỗ hổng",
          type: "bar",
          data: counts,
          encode: {
            x: "Hướng",
            y: "Số lượng Lỗ Hổng"
          }
        }
      ]
    };

    return options;
  }
};
