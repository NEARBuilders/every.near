State.init({
  sdk: null,
  quest: null,
  verify: false,
});

const fetchQuest = () => {
  state.sdk.getQuest(0).then((rawResponse) => {
    const response = state.sdk.decode("viewQuest", rawResponse);
    if (response["creator"] === "0x0000000000000000000000000000000000000000") {
      return;
    }

    const quest = {
      id: i,
      creator: response["creator"],
      creatorFee: state.sdk.hexToInteger(response["creatorFee"]["_hex"]),
      location: response["location"],
      payoutCompleted: response["payoutCompleted"],
      players: response["players"],
      questName: response["questName"],
      questPrize: state.sdk.hexToInteger(response["questPrize"]["_hex"]),
      questStatus: response["questStatus"],
      winner: response["winner"],
      alreadyJoined: true,
    };
    State.update({ quest });
  });
};

if (state.sdk && state.quest === null) {
  fetchQuest();
}

return (
  <>
    <div
      style={{
        display: "none",
      }}
    >
      <Widget
        src="mattb.near/widget/Geoquete.Libs.GeoqueteSDK"
        props={{
          onLoad: (sdk) => State.update({ sdk: sdk }),
          loaded: state.sdk,
        }}
      />
    </div>

    {!state.verify && state.quest && (
      <Widget
        src="mattb.near/widget/Geoquete.Components.Quest"
        props={{
          quest: state.quest,
          onVerify: (questId) => {
            State.update({ verify: true });
          },
        }}
      />
    )}

    {state.verify && (
      <Widget src="mattb.near/widget/Geoquete.Views.KeyVerification" />
    )}
  </>
);
