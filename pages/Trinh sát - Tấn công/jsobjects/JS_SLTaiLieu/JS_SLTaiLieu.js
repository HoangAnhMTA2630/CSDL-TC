export default {
  async fetchData() {
    let success = false;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    let retryCount = 0;

    while (!success && retryCount < maxRetries) {
      try {
        await SLTaiLieu.run(); // tên của truy vấn Appsmith

        if (SLTaiLieu.data && SLTaiLieu.data.length > 0) {
          success = true;
        } else {
          throw new Error("Không có dữ liệu");
        }
      } catch (error) {
        retryCount++;
        console.warn(`Thử lần ${retryCount}: ${error.message}`);
        await delay(300 + Math.random() * 500);
      }
    }

    if (!success) {
      throw new Error("Không thể tải dữ liệu sau nhiều lần thử.");
    }

    const dataRows = SLTaiLieu.data.map(row => ({
      huong: row.ten_huong ?? "Không rõ",
      count: Number(row.so_luong_tai_lieu)
    }));

    const huongs = dataRows.map(item => item.huong);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: "{b}: {c} tài liệu"
      },
      title: {
        text: "Tài Liệu",
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
          name: "Số lượng Tài Liệu",
          minInterval: 1
        }
      ],
      series: [
        {
          name: "Tài liệu",
          type: "bar",
          data: counts,
					label: {
      			show: true,           // 👈 Hiển thị nhãn
      			position: "top",      // 👈 Vị trí trên đầu cột
      			formatter: "{c}"      // 👈 Hiển thị giá trị y (số lượng)
   		 			},
          itemStyle: {
            color: "#4b7bec"
          }
        }
      ]
    };

    return options;
  }
};
