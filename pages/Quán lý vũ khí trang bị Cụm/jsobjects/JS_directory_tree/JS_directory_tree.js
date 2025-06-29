export default {
	buildUnitTree(flatData) {
		const nodes = {};
		const tree = [];

		flatData.forEach(unit => {
			nodes[unit.id] = {
				label: unit.ten_don_vi,
				value: unit.id
			};

			if (unit.don_vi_cha_id === null || unit.don_vi_cha_id === undefined) {
				tree.push(nodes[unit.id]);
			}
		});

		flatData.forEach(unit => {
			if (unit.don_vi_cha_id !== null && unit.don_vi_cha_id !== undefined) {
				const parent = nodes[unit.don_vi_cha_id];
				if (parent) {
					if (!parent.children) {
						parent.children = [];
					}
					parent.children.push(nodes[unit.id]);
				}
			}
		});

		function sortChildren(nodeList) {
			nodeList.sort((a, b) => a.value - b.value);
			nodeList.forEach(node => {
				if (node.children && node.children.length > 0) {
					sortChildren(node.children);
				}
			});
		}

		sortChildren(tree);

		return tree;
	},

	getUnitTreeData() {
		if (Query_don_vi.data && Array.isArray(Query_don_vi.data)) {
			return this.buildUnitTree(Query_don_vi.data); // ✅ this hoạt động đúng
		}
		return [];
	}
};
