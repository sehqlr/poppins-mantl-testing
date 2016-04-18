module.exports = function (poppins) {
	poppins.plugins.exec.commands.push([
			{ re: /^kickoff command here$/, exec: 'echo "Start mantl testing command"' }
	]);

	poppins.plugins.mantl-testing.owners = ["sehqlr"];
};
