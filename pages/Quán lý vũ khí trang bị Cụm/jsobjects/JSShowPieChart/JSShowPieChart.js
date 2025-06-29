export default {
  showTableByCategory(category) {
    if (category === "Còn lại") {
      DSMayYeu.run();
			showWidget("");
		} else {
      DSMayYeu.run()
    }
  }
}