export default {
	buildUnitTree: (flatData) => {
		const nodes = {}; // Sử dụng để lưu trữ các node theo ID để dễ dàng truy cập
		const tree = [];  // Mảng chứa các node gốc của cây
		// Bước 1: Tạo các node cơ bản và lưu vào 'nodes' map
		// Đồng thời, nếu node là gốc, thêm vào mảng 'tree'
		flatData.forEach(unit => {
			// Tạo cấu trúc node mong muốn
			nodes[unit.id] = {
				label: unit.ten_don_vi,
				value: unit.id
				// children sẽ được thêm sau nếu có con
			};
			// Nếu đây là đơn vị cấp cao nhất (không có cha), thêm vào mảng gốc của cây
			// Đảm bảo kiểm tra đúng tên cột `don_vi_cha_id` từ query của bạn
			if (unit.don_vi_cha_id === null || unit.don_vi_cha_id === undefined) {
				tree.push(nodes[unit.id]);
			}
		});

		// Bước 2: Duyệt lại và gắn các node con vào node cha
		flatData.forEach(unit => {
			// Nếu đơn vị này có cha
			// Đảm bảo kiểm tra đúng tên cột `don_vi_cha_id` từ query của bạn
			if (unit.don_vi_cha_id !== null && unit.don_vi_cha_id !== undefined) {
				const parent = nodes[unit.don_vi_cha_id]; // Tìm cha trong map
				// Đảm bảo cha tồn tại trước khi thêm con
				if (parent) {
					// Nếu cha chưa có mảng 'children', khởi tạo nó
					if (!parent.children) {
						parent.children = [];
					}
					// Thêm node hiện tại vào mảng 'children' của cha
					parent.children.push(nodes[unit.id]);
				}
			}
		});
		// Sắp xếp các node con theo 'value' (ID) để đảm bảo thứ tự nhất quán
		// Đây là bước tùy chọn nhưng thường hữu ích cho hiển thị
		function sortChildren(nodeList) {
			nodeList.sort((a, b) => a.value - b.value); // Sắp xếp tăng dần theo value (ID)
			nodeList.forEach(node => {
				if (node.children && node.children.length > 0) {
					sortChildren(node.children); // Đệ quy sắp xếp các node con
				}
			});
		}
		sortChildren(tree);
		return tree;
	},
	getUnitTreeData: () => {
		// `QueryCayDonVi.data` là kết quả của truy vấn SQL .
		if (QueryCayDonVi.data && Array.isArray(QueryCayDonVi.data)) {
			return this.buildUnitTree(QueryCayDonVi.data);
		}
		return []; // Trả về mảng rỗng nếu không có dữ liệu
	}
};
