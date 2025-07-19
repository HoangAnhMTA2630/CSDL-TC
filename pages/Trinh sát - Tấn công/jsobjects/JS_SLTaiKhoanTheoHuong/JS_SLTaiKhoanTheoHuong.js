export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SLTaiKhoanTheoHuong.run(); // 👉 Thay bằng tên truy vấn thực tế
        if (SLTaiKhoanTheoHuong.data && SLTaiKhoanTheoHuong.data.length > 0) {
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

    const dataRows = SLTaiKhoanTheoHuong.data.map(row => ({
      huong: String(row["huong"]),
      count: Number(row["so_luong_tai_khoan"])
    }));

    const huongs = dataRows.map(item => item.huong);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}: {c} tài khoản"
      },
      title: {
        text: "SL tài khoản theo hướng",
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
          name: "SL tài khoản",
          minInterval: 1
        }
      ],
      series: [
        {
          name: "Tài khoản",
          type: "bar",
          data: counts,
					label: {
      			show: true,           // 👈 Hiển thị nhãn
      			position: "top",      // 👈 Vị trí trên đầu cột
      			formatter: "{c}"      // 👈 Hiển thị giá trị y (số lượng)
   		 			},
          itemStyle: {
            color: "#73C0DE"
          }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
