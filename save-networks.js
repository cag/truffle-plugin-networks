const fs = require("fs");
const path = require("path");

module.exports = async (config) => {
  if (config.help) {
    console.log(`Usage: truffle run save-networks`);
    return;
  }

  const contractsBuildDir = config.contracts_build_directory;
  const artifacts = fs.readdirSync(contractsBuildDir)
    .filter(fname => fname.toLowerCase().endsWith('.json'))
    .map(fname => JSON.parse(fs.readFileSync(path.join(contractsBuildDir, fname))));

  const configNetworkIds = config.networks == null ? [] :
    Object.values(config.networks)
      .map(({ network_id, networkId }) => networkId || network_id)
      .filter(id => id != null && id !== '*');

  const networks = {};
  for (const artifact of artifacts) {
    const artifactNetworks = artifact.networks || {};

    const writtenNetworkIds = Object.keys(artifactNetworks)
      .filter(id => configNetworkIds.includes(id));

    if (writtenNetworkIds.length > 0) {
      const networkInfo = {};
      for (const id of writtenNetworkIds) {
        networkInfo[id] = {
          address: artifactNetworks[id].address,
          transactionHash: artifactNetworks[id].transactionHash,
          links: artifactNetworks[id].links,
          // skip events
        };
      }
      networks[artifact.contractName] = networkInfo;
    }
  }

  fs.writeFileSync(
    path.join(config.working_directory, 'networks.json'),
    JSON.stringify(networks, null, 2) + '\n'
  );
}
