export default {
	myVar1: [],
	myVar2: {},
	myFun1() {
		// logic thường
	},
	async myFun2(category) {
		if (category === "Còn lại") {
			await DSMayYeu.run();
			showModal(Modal_DSRamCPU.name)
		} else {
			await DSMayYeu.run();
			showModal("Modal_DSMayYeu");
		}
	}
}
