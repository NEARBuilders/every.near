const { onLoad, loaded } = props;

const TOKEN_DECIMALS = 18;
const GEOQUETE_CONTRACT_ADDRESS = "0x3C6DdF92d31E1728C23c062b3C1D552E6eA77137";
const APECOIN_CONTRACT_ADDRESS = "0x328507DC29C95c170B56a1b3A758eB7a9E73455c";
const GEOQUETE_CONTRACT_ABI = fetch(
  "https://raw.githubusercontent.com/paris-geo-hackers/ParisContracts/main/contracts/Game.json"
);

const APECOIN_CONTRACT_ABI = fetch(
  "https://raw.githubusercontent.com/paris-geo-hackers/ParisContracts/main/contracts/ApeCoinToken.json"
);

const APECOIN_CONTRACT_METHODS = [
  "function increaseAllowance(address spender, uint256 addedValue) public {}",
];

const GEOQUETE_CONTRACT_METHODS = ["function joinQuest(uint256 _questId) {}"];

const iface = new ethers.utils.Interface(GEOQUETE_CONTRACT_ABI.body);
const apecoinIface = new ethers.utils.Interface(APECOIN_CONTRACT_ABI.body);

const GeoqueteSDK = {
  encode: (method, params) => {
    return iface.encodeFunctionData(method, params);
  },
  decode: (method, rawResponse) => {
    return iface.decodeFunctionResult(method, rawResponse);
  },
  call: (method, params) => {
    return Ethers.provider().call({
      to: GEOQUETE_CONTRACT_ADDRESS,
      data: GeoqueteSDK.encode(method, params),
    });
  },
  listQuests: () => {},
  getQuest: (questId) => {
    return GeoqueteSDK.call("viewQuest", [questId]);
  },
  createQuest: (quest) => {
    return GeoqueteSDK.call("createQuest", [
      quest.questName,
      quest.location,
      quest.description,
      quest.coordinates,
      quest.numberOfPlayers,
      quest.questPrize,
      10,
    ]);
  },
  joinQuest: (questId) => {
    // Test
    const contract = new ethers.Contract(
      GEOQUETE_CONTRACT_ADDRESS,
      GEOQUETE_CONTRACT_METHODS,
      Ethers.provider().getSigner()
    );

    return contract.joinQuest(questId, {
      gasPrice: ethers.utils.parseUnits("100", "gwei"),
      gasLimit: 1000000,
    });
  },
  submitSolution: (questId, zkProof, ipfsPhotoUrl) => {
    return GeoqueteSDK.call("submitSolution", [questId, zkProof, ipfsPhotoUrl]);
  },
  allowSpend: (amount) => {
    const contract = new ethers.Contract(
      APECOIN_CONTRACT_ADDRESS,
      APECOIN_CONTRACT_METHODS,
      Ethers.provider().getSigner()
    );

    return contract.increaseAllowance(GEOQUETE_CONTRACT_ADDRESS, amount);
  },
  hexToInteger: (hex) => {
    return parseInt(hex, 16) / Math.pow(10, TOKEN_DECIMALS);
  },
};

if (!!onLoad && typeof onLoad === "function" && !loaded) {
  onLoad(GeoqueteSDK);
}
