export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await SoLuongCPU.run(); // 👈 Đổi tên hàm tương ứng với truy vấn của bạn
        if (SoLuongCPU.data && SoLuongCPU.data.length >= 0) {
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

    const dataRows = SoLuongCPU.data.map(row => ({
      cpu: String(row["loai_cpu"]),
      count: Number(row["so_luong_may_tinh"])
    }));

    const cpuNames = dataRows.map(item => item.cpu);
    const values = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}: {c} máy tính"
      },
      title: {
        text: "Số lượng máy tính theo loại CPU",
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
          data: cpuNames,
          name: "Loại CPU"
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "SL máy tính",
          minInterval: 1,
					
        }
      ],
      series: [
        {
          name: "Máy tính",
          type: "bar",
          data: values,
					label: {
      			show: true,           // 👈 Hiển thị nhãn
      			position: "top",      // 👈 Vị trí trên đầu cột
      			formatter: "{c}"      // 👈 Hiển thị giá trị y (số lượng)
   		 			},
          itemStyle: {
            color: "#5470C6"
          }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
