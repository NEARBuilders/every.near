State.init({
  sdk: null,
  quests: [],
  account: null,
});

if (!state.account) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length > 0) {
    State.update({ account: accounts[0] });
  }
}

const Main = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    align-items:flex-start;
    justify-content:space-evenly;
    flex-wrap:wrap;

    & > div {
        margin-top:15px;
        
        &:not(:last-of-type) {
            margin-right:15px;
        }
    }

`;

const loadQuests = () => {
  for (let i = 0; i < 5; i++) {
    state.sdk.getQuest(i).then((rawResponse) => {
      const response = state.sdk.decode("viewQuest", rawResponse);

      if (
        response["creator"] === "0x0000000000000000000000000000000000000000"
      ) {
        return;
      }

      const quest = {
        id: i,
        creator: response["creator"],
        creatorFee: state.sdk.hexToInteger(response["creatorFee"]["_hex"]),
        location: response["location"],
        payoutCompleted: response["payoutCompleted"],
        players: response["players"],
        description: response["description"],
        questName: response["questName"],
        questPrize: state.sdk.hexToInteger(response["questPrize"]["_hex"]),
        questStatus: response["questStatus"],
        winner: response["winner"],
      };

      let quests = state.quests;
      quests.push(quest);
      State.update({ quests: quests });
    });
  }
};

if (state.sdk && state.quests.length == 0) {
  loadQuests();
}

return (
  <Main>
    <div
      style={{
        display: "none",
      }}
    >
      <Widget
        src="mattb.near/widget/Geoquete.Libs.GeoqueteSDK"
        props={{
          onLoad: (sdk) => State.update({ sdk: sdk }),
          loaded: !!state.sdk,
        }}
      />
    </div>

    {state.quests.map((quest) => (
      <Widget
        src="mattb.near/widget/Geoquete.Components.Quest"
        props={{
          quest,
          onJoin: (questId) => {
            console.log(state.account);
            state.sdk.allowSpend(1000000000).then((rawResponse) => {
              state.sdk.joinQuest(questId).then((response) => {
                console.log(response);
              });
            });
          },
        }}
      />
    ))}
  </Main>
);
