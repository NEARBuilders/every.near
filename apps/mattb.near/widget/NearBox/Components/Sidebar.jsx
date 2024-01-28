const { selected, writeMessage, onRefresh } = props;
const TABS = [
  {
    name: "Inbox",
    disabled: true,
  },
  {
    name: "Sent",
  },
  {
    name: "Social",
    disabled: true,
  },
  {
    name: "Spam",
    disabled: true,
  },
];

State.init({
  selected: selected || "Sent",
});

const SideBar = styled.div`
    position:relative;
    width:100%;
    max-width:200px;
    min-width:200px;
    height:calc(100vh - 70px);
    background-color:#fff;
    box-sizing:border-box;
    padding:1rem;
    padding-left:0;

    ul {
        padding:0;
        margin:0;
        list-style:none;
        margin-top:1rem;

        li {
            padding: 0 .5rem;
            cursor:pointer;
            transition: all .2s;
            border-left:4px solid transparent;
            font-size:.9rem;

            :not(:last-of-type) {
                margin-bottom:.5rem;
            }

            &.selected {
                font-weight:bold;
                border-left:4px solid #0178D4;
                transition: all .2s;
            }

            &.disabled {
              opacity:.5;
              user-select:none;
              cursor:default;
            }
        }
    }
`;

const CreateButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:30px;
    background-color: #0178D4;
    border:0;
    color:#fff;
    border-radius:30px;
    font-size:.8rem;

    span {
      position:relative;
      margin-right:7px;
      top:-1px;
    }
`;

const DropNFTButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:30px;
    background-color: #7102d3;
    border:0;
    color:#fff;
    border-radius:30px;
    font-size:.8rem;
    margin-top:.5rem;

    span {
      position:relative;
      margin-right:7px;
      top:-1px;
    }
`;

const Powered = styled.div`
    position:absolute;
    bottom:0;
    padding:2rem 0;
    opacity:.5;
    font-size:.8rem;
    text-align:center;
`;

return (
  <SideBar>
    <CreateButton onClick={() => onRefresh({ writeMessage: true })}>
      <span>
        <img
          src="https://ipfs.near.social/ipfs/bafkreigcqqwqre4gtaurevwm34xw5vlrwkckjpt5esqydphghetlwb6h6i"
          style={{
            width: "15px",
            height: "15px",
          }}
        />
      </span>{" "}
      Send message
    </CreateButton>
    <DropNFTButton onClick={() => onRefresh({ dropNft: true })}>
      <span>
        <img
          src="https://ipfs.near.social/ipfs/bafkreieey7jgpxjc67yhgmn4bo5ohc37hv3omqa7ovkvs7pakcgepuvqxy"
          style={{
            width: "15px",
            height: "15px",
          }}
        />
      </span>{" "}
      Drop NFT
    </DropNFTButton>
    <ul>
      {TABS.map((tab) => (
        <li
          className={`${tab.name === state.selected ? "selected" : ""} ${
            tab.disabled ? "disabled" : ""
          }`}
          onClick={() => {
            if (tab.disabled) {
              return;
            }
            State.update({ selected: tab.name });
            onRefresh({ selected: tab.name });
          }}
        >
          {tab.name}
        </li>
      ))}
    </ul>
    <Powered>
      Powered by <strong>MailChain</strong>
    </Powered>
  </SideBar>
);
