export default {
	// Hàm chuyển base64 thành ArrayBuffer
	base64ToArrayBuffer: (base64) => {
		var binaryString = atob(base64);
		var bytes = new Uint8Array(binaryString.length);
		for (var i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		return bytes.buffer;
	},
	uploadFileDDF: async () => {
		const file = FilePickerHSPT.files[0];

		if (!file) {
			showAlert("Chưa chọn file!", "error");
			return;
		}
		const base64Data = file.data.split('base64,')[1];
		const arrayBuffer = this.base64ToArrayBuffer(base64Data);
		const response = await fetch('http://170.18.20.138:5000/upload_file', {
			method: 'POST',
			headers: {
				'Content-Type': file.type, // Ví dụ image/png, application/pdf, v.v...
				'File-Name': btoa(encodeURIComponent(file.name)) // Tên file gửi kèm header, không cần `unescape`
			},
			body: arrayBuffer
		});
		const result = await response.json();
		if (response.ok) {
			showAlert("Upload thành công!", "success");
			console.log(result);
			storeValue("uploadedFilePath", result.file_path);
		} else {
			showAlert("Upload thất bại: " + result.error, "error");
			console.error(result);
		}
	},
	uploadFileSDTC: async () => {
		const file = FilePickerSDTC.files[0];

		if (!file) {
			showAlert("Chưa chọn file!", "error");
			return;
		}
		const base64Data = file.data.split('base64,')[1];
		const arrayBuffer = this.base64ToArrayBuffer(base64Data);
		const response = await fetch('http://170.18.20.138:5000/upload_file', {
			method: 'POST',
			headers: {
				'Content-Type': file.type, // Ví dụ image/png, application/pdf, v.v...
				'File-Name': btoa(encodeURIComponent(file.name)) // Tên file gửi kèm header, không cần `unescape`
			},
			body: arrayBuffer
		});

		const result = await response.json();

		if (response.ok) {
			showAlert("Upload thành công!", "success");
			console.log(result);
			storeValue("uploadedSDTC", result.file_path);
		} else {
			showAlert("Upload thất bại: " + result.error, "error");
			console.error(result);
		}
	},
	uploadFileSDLG: async () => {
		const file = FilePickerSDLG.files[0];

		if (!file) {
			showAlert("Chưa chọn file!", "error");
			return;
		}
		const base64Data = file.data.split('base64,')[1];
		const arrayBuffer = this.base64ToArrayBuffer(base64Data);
		const response = await fetch('http://170.18.20.138:5000/upload_file', {
			method: 'POST',
			headers: {
				'Content-Type': file.type, // Ví dụ image/png, application/pdf, v.v...
				'File-Name': btoa(encodeURIComponent(file.name)) // Tên file gửi kèm header, không cần `unescape`
			},
			body: arrayBuffer
		});

		const result = await response.json();

		if (response.ok) {
			showAlert("Upload thành công!", "success");
			console.log(result);
			storeValue("uploadedSDLG", result.file_path);
		} else {
			showAlert("Upload thất bại: " + result.error, "error");
			console.error(result);
		}
	},
	uploadFileSDTR: async () => {
		const file = FilePickerSDTR.files[0];

		if (!file) {
			showAlert("Chưa chọn file!", "error");
			return;
		}
		const base64Data = file.data.split('base64,')[1];
		const arrayBuffer = this.base64ToArrayBuffer(base64Data);
		const response = await fetch('http://170.18.20.138:5000/upload_file', {
			method: 'POST',
			headers: {
				'Content-Type': file.type, // Ví dụ image/png, application/pdf, v.v...
				'File-Name': btoa(encodeURIComponent(file.name)) // Tên file gửi kèm header, không cần `unescape`
			},
			body: arrayBuffer
		});

		const result = await response.json();

		if (response.ok) {
			showAlert("Upload thành công!", "success");
			console.log(result);
			storeValue("uploadedSDTR", result.file_path);
		} else {
			showAlert("Upload thất bại: " + result.error, "error");
			console.error(result);
		}
	},
	

}
