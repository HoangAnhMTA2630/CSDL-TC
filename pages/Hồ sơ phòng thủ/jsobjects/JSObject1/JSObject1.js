export default {
  initializeUI: () => {
    storeValue("showContainerTBM", false);
    storeValue("showTabTBM", true);
		storeValue("showContainerWeb", false);
    storeValue("showTabWeb", true);
  },
	bcUI: () => {
		(TreeSelect.selectedOptionValue > 0) ? storeValue("showContainerBC", true) : storeValue("showContainerBC", false);
    storeValue("showTabBC", true);
	}
}