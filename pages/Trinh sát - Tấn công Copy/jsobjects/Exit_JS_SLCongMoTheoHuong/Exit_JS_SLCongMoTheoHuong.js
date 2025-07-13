export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SLCongMoTheoHuong.run();
        if (SLCongMoTheoHuong.data && SLCongMoTheoHuong.data.length > 0) {
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

    const dataRows = SLCongMoTheoHuong.data.map(row => ({
      huong: String(row["huong"]),
      count: Number(row["so_luong_cong_mo"])
    }));

    const huongs = dataRows.map(item => item.huong);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}: {c} cổng mở"
      },
      title: {
        text: "SL cổng mở theo hướng",
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
          data: huongs,
          name: "Hướng"
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "SL cổng mở",
          minInterval: 1
        }
      ],
      series: [
        {
          name: "Cổng mở",
          type: "bar",
          data: counts,
          itemStyle: {
            color: "#FAC858"
          }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
