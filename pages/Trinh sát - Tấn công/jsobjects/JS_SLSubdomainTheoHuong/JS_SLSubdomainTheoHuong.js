export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SLSubdomainTheoHuong.run(); // Đổi tên này thành tên đúng với truy vấn trong Appsmith
        if (SLSubdomainTheoHuong.data && SLSubdomainTheoHuong.data.length > 0) {
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

    const dataRows = SLSubdomainTheoHuong.data.map(row => ({
      huong: String(row["huong"]),
      count: Number(row["so_luong_subdomain"])
    }));

    const huongs = dataRows.map(item => item.huong);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: "{b}: {c} subdomain"
      },
      title: {
        text: "Số lượng Subdomain theo Hướng",
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
          name: "Số lượng Subdomain",
          minInterval: 1
        }
      ],
      series: [
        {
          name: "Subdomain",
          type: "bar",
          stack: "total", // Dòng này để dùng stacked bar
          data: counts,
          encode: {
            x: "Hướng",
            y: "Số lượng Subdomain"
          }
        }
      ]
    };

    return options;
  }
};
