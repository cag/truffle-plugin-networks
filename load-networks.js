const fs = require("fs");
const path = require("path");

module.exports = async (config) => {
  if (config.help) {
    console.log(`Usage: truffle run load-networks`);
    return;
  }

  const networks = JSON.parse(fs.readFileSync(
    path.join(config.working_directory, 'networks.json')
  ));

  const contractsBuildDir = config.contracts_build_directory
  for (const contractName of Object.keys(networks)) {
    const artifactNetworkInfo = networks[contractName];
    const artifactPath = path.join(contractsBuildDir, `${contractName}.json`);
    const artifact = JSON.parse(fs.readFileSync(artifactPath));
    Object.assign(artifact.networks, artifactNetworkInfo);
    fs.writeFileSync(artifactPath, JSON.stringify(artifact, null, 2));
  }
}
