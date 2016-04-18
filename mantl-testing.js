module.exports = function (poppins) {
	poppins.plugins.exec.commands.push([
			{ re: /^@mantlbot start/, exec: 'echo "Start mantl testing command"' }
	]);

	poppins.plugins.mantl-testing.owners = ["sehqlr"];
};
