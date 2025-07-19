export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await TrangBiDonVi.run(); // 👉 đổi tên phù hợp với truy vấn của bạn
        if (TrangBiDonVi.data && TrangBiDonVi.data.length >= 0) {
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

    const dataRows = TrangBiDonVi.data.map(row => ({
      donVi: String(row["ten_don_vi"]),
      soLuong: Number(row["so_luong_thiet_bi"])
    }));

    const labels = dataRows.map(item => item.donVi);
    const values = dataRows.map(item => item.soLuong);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}: {c} thiết bị"
      },
      title: {
        text: "Đơn vị",
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
          name: "Đơn vị"
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "Số thiết bị",
          minInterval: 1
        }
      ],
      series: [
        {
          name: "Thiết bị",
          type: "bar",
          data: values,
					label: {
      			show: true,           // 👈 Hiển thị nhãn
      			position: "top",      // 👈 Vị trí trên đầu cột
      			formatter: "{c}"      // 👈 Hiển thị giá trị y (số lượng)
   		 			},
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
