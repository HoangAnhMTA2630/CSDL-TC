export default {
	async fetchData() {
		let success = false;
		let time_delay = Math.random() * 1000;
		let retryCount = 0;
		const maxRetries = 5;
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		while (!success && retryCount < maxRetries) {
			try {
				await MucTieu_Huong.run(); // gọi truy vấn
				if (MucTieu_Huong.data && MucTieu_Huong.data.length >= 0) {
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

		const dataRows = MucTieu_Huong.data.map(row => ({
			huong: String(row["huong"]),
			soLuong: Number(row["so_luong_muc_tieu"])
		}));

		const huongLabels = dataRows.map(item => item.huong);
		const soLuongValues = dataRows.map(item => item.soLuong);

		const options = {
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow"
				},
				formatter: "{b}: {c} mục tiêu"
			},
			title: {
				text: "Số lượng mục tiêu theo hướng",
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
			xAxis: [{
				type: "category",
				data: huongLabels,
				name: "Hướng",
				axisLabel: {
					interval: 0,
					rotate: 20
				}
			}],
			yAxis: [{
				type: "value",
				name: "Số lượng",
				minInterval: 1
			}],
			series: [{
				name: "Số lượng mục tiêu",
				type: "bar",
				data: soLuongValues,
				itemStyle: {
					color: "#91CC75"
				}
			}]
		};

		console.log(options);
		return options;
	}
}
