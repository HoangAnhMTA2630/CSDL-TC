export default {
  buildTree: (data) => {
    if (!data || !Array.isArray(data)) return [];

    // Tạo map id -> node
    const nodes = {};
    data.forEach(item => {
      nodes[item.x] = {
        label: item.y,
        value: item.x,
        children: []
      };
    });

    // Tạo cây
    const tree = [];
    data.forEach(item => {
      if (item.z === null || item.z === undefined) {
        // Node gốc
        tree.push(nodes[item.x]);
      } else {
        // Node con, gắn vào cha
        const parent = nodes[item.z];
        if (parent) {
          parent.children.push(nodes[item.x]);
        }
      }
    });

    // Loại bỏ children rỗng để gọn
    function clean(nodes) {
      nodes.forEach(n => {
        if (n.children.length === 0) {
          delete n.children;
        } else {
          clean(n.children);
        }
      });
    }
    clean(tree);

    return tree;
  }
}
