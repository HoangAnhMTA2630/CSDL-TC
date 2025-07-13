export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SLKhuVucTheoHuong.run(); // Đổi tên truy vấn SQL tương ứng trong Appsmith
        if (SLKhuVucTheoHuong.data && SLKhuVucTheoHuong.data.length > 0) {
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

    const dataRows = SLKhuVucTheoHuong.data.map(row => ({
      huong: row["ten_huong"] ?? "Không rõ",
      count: Number(row["so_luong_doi_tuong"])
    }));

    const huongs = dataRows.map(item => item.huong);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: "{b}: {c} đối tượng"
      },
      title: {
        text: "Số lượng Đối Tượng theo Hướng",
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
          name: "Số lượng",
          minInterval: 1
        }
      ],
      series: [
        {
          name: "Đối tượng",
          type: "bar",
          data: counts,
          itemStyle: {
            color: "#5470C6"
          }
        }
      ]
    };

    return options;
  }
};
