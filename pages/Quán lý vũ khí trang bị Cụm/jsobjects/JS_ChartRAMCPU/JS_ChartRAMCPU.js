export default {
	myVar1: [],
	myVar2: {},
	myFun1() {
		// logic thường
	},
	async myFun2(category) {
		if (category === "Còn lại") {
			await DSMayTinhTheoThuocTinhRAMCPU.run();
			showModal(Modal_DSRamCPU.name)
		} else {
			await DSMayTinhTheoThuocTinhRAMCPU.run();
			showModal("Modal_DSMayYeu");
		}
	}
}
