State.init({
    currentView: "create",
    isConnected: false,
    connection: () => null,
    account: ""
});

let views = {
  create: (
    <>
      <Widget src="mattb.near/widget/Geoquete.Components.CreateQuest" />
    </>
  ),
  join: (
    <>
      <Widget src="mattb.near/widget/Geoquete.Components.QuestList" />
    </>
  ),
  review: (
    <>
      <Widget src="mattb.near/widget/Geoquete.Views.ReviewQuests" />
    </>
  )
};


// Init
if (state.account == "") {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ account: accounts[0] });
  }
}

const Main = styled.div`
  padding:2rem 0;
`;

return (
  <>
    <Widget src="mattb.near/widget/Geoquete.Components.Header" 
      props={{
        onRefresh: (tab) => State.update({ currentView: tab })
      }}
    />
    <Main>
      {state.account && (state.currentView in views ? views[state.currentView] : "404")}
      {!state.account && (
        <h2 className="text-center">Please, connect your wallet</h2>
      )}
    </Main>
  </>
);
