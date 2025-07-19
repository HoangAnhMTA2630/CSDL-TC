export default {
  ShowDDF: async () => {
  const path = data_table_KH.triggeredRow.duong_dan_file;
  if (!path) {
    showAlert("Không có đường dẫn file!", "error");
    return null;
  }
  try {
    const response = await fetch('http://170.18.20.138:5000/view_file', {  // 🛠 Đổi API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: path })
    });
    const result = await response.json();
    if (response.ok) {
      const fileUrl = `http://170.18.20.138:5000${result.file_url}`; //  Lấy file_url từ kết quả
      console.log("File URL:", fileUrl);
      return fileUrl; //  Trả về URL file (có thể là .pdf hoặc file gốc)
    } else {
      showAlert("View file thất bại: " + result.error, "error");
      console.error(result);
      return null;
    }
  } catch (error) {
    showAlert("Lỗi khi gọi API view_file!", "error");
    console.error(error);
    return null;
  }
},
	ShowDDFBC: async () => {
  const path = data_tableBC.triggeredRow.duong_dan_file;
  if (!path) {
    showAlert("Không có đường dẫn file!", "error");
    return null;
  }
  try {
    const response = await fetch('http://170.18.20.138:5000/view_file', {  // 🛠 Đổi API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: path })
    });
    const result = await response.json();
    if (response.ok) {
      const fileUrl = `http://170.18.20.138:5000${result.file_url}`; //  Lấy file_url từ kết quả
      console.log("File URL:", fileUrl);
      return fileUrl; //  Trả về URL file (có thể là .pdf hoặc file gốc)
    } else {
      showAlert("View file thất bại: " + result.error, "error");
      console.error(result);
      return null;
    }
  } catch (error) {
    showAlert("Lỗi khi gọi API view_file!", "error");
    console.error(error);
    return null;
  }
},
	ShowDDFBCNoInKH: async () => {
  const path = data_tableBCNotInKH.triggeredRow.duong_dan_file;
  if (!path) {
    showAlert("Không có đường dẫn file!", "error");
    return null;
  }
  try {
    const response = await fetch('http://170.18.20.138:5000/view_file', {  // 🛠 Đổi API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: path })
    });
    const result = await response.json();
    if (response.ok) {
      const fileUrl = `http://170.18.20.138:5000${result.file_url}`; //  Lấy file_url từ kết quả
      console.log("File URL:", fileUrl);
      return fileUrl; //  Trả về URL file (có thể là .pdf hoặc file gốc)
    } else {
      showAlert("View file thất bại: " + result.error, "error");
      console.error(result);
      return null;
    }
  } catch (error) {
    showAlert("Lỗi khi gọi API view_file!", "error");
    console.error(error);
    return null;
  }
},
getTriggeredFilePath: () => {
  const tables = [
    TableKH_LKH_Chart,
    TableKH_CKH_Chart,
    TableBC_LBC_Chart,
    TableBC_CBC_Chart
  ];

  for (let table of tables) {
    if (table.triggeredRow && table.triggeredRow.duong_dan_file) {
      return table.triggeredRow.duong_dan_file;
    }
  }

  return null;
},
	ShowDDFChart: async () => {
  const path = showfile.getTriggeredFilePath();  // ⬅ dùng JS lấy path

  if (!path) {
    showAlert("Không có đường dẫn file!", "error");
    return null;
  }

  try {
    const response = await fetch('http://170.18.20.138:5000/view_file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: path })
    });

    const result = await response.json();

    if (response.ok) {
      const fileUrl = `http://170.18.20.138:5000${result.file_url}`;
      console.log("File URL:", fileUrl);
      return fileUrl;
    } else {
      showAlert("View file thất bại: " + result.error, "error");
      return null;
    }
  } catch (error) {
    showAlert("Lỗi khi gọi API view_file!", "error");
    console.error(error);
    return null;
  }
},
	ShowDDFFilter: async () => {
  const path = TableFilterBC.triggeredRow.duong_dan_file;
  if (!path) {
    showAlert("Không có đường dẫn file!", "error");
    return null;
  }
  try {
    const response = await fetch('http://170.18.20.138:5000/view_file', {  // 🛠 Đổi API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: path })
    });
    const result = await response.json();
    if (response.ok) {
      const fileUrl = `http://170.18.20.138:5000${result.file_url}`; //  Lấy file_url từ kết quả
      console.log("File URL:", fileUrl);
      return fileUrl; //  Trả về URL file (có thể là .pdf hoặc file gốc)
    } else {
      showAlert("View file thất bại: " + result.error, "error");
      console.error(result);
      return null;
    }
  } catch (error) {
    showAlert("Lỗi khi gọi API view_file!", "error");
    console.error(error);
    return null;
  }

},
	ShowDDFFilterKH: async () => {
  const path = TableFilterKH.triggeredRow.duong_dan_file;
  if (!path) {
    showAlert("Không có đường dẫn file!", "error");
    return null;
  }
  try {
    const response = await fetch('http://170.18.20.138:5000/view_file', {  // 🛠 Đổi API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: path })
    });
    const result = await response.json();
    if (response.ok) {
      const fileUrl = `http://170.18.20.138:5000${result.file_url}`; //  Lấy file_url từ kết quả
      console.log("File URL:", fileUrl);
      return fileUrl; //  Trả về URL file (có thể là .pdf hoặc file gốc)
    } else {
      showAlert("View file thất bại: " + result.error, "error");
      console.error(result);
      return null;
    }
  } catch (error) {
    showAlert("Lỗi khi gọi API view_file!", "error");
    console.error(error);
    return null;
  }

}
}