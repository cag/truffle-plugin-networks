# truffle-save-networks-plugin

Truffle plugin for saving/loading networks info from/to artifacts.

```sh
npm install --save-dev truffle-save-networks-plugin
```

To save known networks declared in `truffle-config.js` from artifacts into `networks.json`, use

```sh
truffle run save-networks
```

To load networks from `networks.json` and merge that info with the info present in artifacts, use

```sh
truffle run load-networks
```

May be worthwhile to run `truffle networks --clean` if producing build files.
