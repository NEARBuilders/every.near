const MESSAGES_SECTION =
  "https://ipfs.near.social/ipfs/bafkreig4cmkw33wqao77ryem2trlf3z774ufwrqgti54rufsrd3hpgewru";

const NEWS_SECTION =
  "https://ipfs.near.social/ipfs/bafkreih6in2z2u5rbav6uwqxilip34tycpnhv575fi7scpyydutvwwxvfe";

const WARBLE_SECTION =
  "https://ipfs.near.social/ipfs/bafkreiauv2dw5m7ytgbjppjyktomjniaezdwbckdpsazvqhny5znsakqz4";

const SHARE_SECTION =
  "https://ipfs.near.social/ipfs/bafkreicbzihpt5wywzccgxk22zh5otwul2zgqsrupv2bdbsqsivjfpfy6a";

const Sidebar = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    max-width:60px;
    height:100vh;
    background-color:rgba(0,0,0,.85);
    padding:10px;
`;

const Sections = styled.div`
    margin-top:${(props) => (props.secondary ? "20px" : "70px")};
    padding-bottom:20px;
    ${(props) =>
      props.secondary ? "" : "border-bottom:1px solid rgba(255,255,255,.08);"}
`;

const SectionButton = styled.button`
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    border:0;
    width:40px;
    height:40px;
    border-radius:100%;
    background-color:${(props) =>
      props.secondary ? "transparent" : "rgba(255,255,255,.08)"};
    padding:5px;
    transition:all .2s;
    box-shadow:0 0 0 0px rgba(255,255,255,.02);

    :not(:last-of-type) {
        margin-bottom:30px;
    }

    :hover {
        transition:all .2s;
        ${(props) =>
          props.secondary ? "" : "box-shadow:0 0 0 3px rgba(255,255,255,.05);"}
    }

    img {
        max-width:20px;
    }
`;

const SidebarWrapper = styled.div`
    display:flex;
    flex-direction:column;
    
    align-items:center;
`;

return (
  <Sidebar>
    <SidebarWrapper>
      <Widget src="mattb.near/widget/Messenger.Components.Avatar" />

      <Sections>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Messenger</Tooltip>}
        >
          <SectionButton>
            <img src={MESSAGES_SECTION} />
          </SectionButton>
        </OverlayTrigger>
        <OverlayTrigger placement="right" overlay={<Tooltip>News</Tooltip>}>
          <SectionButton>
            <img src={NEWS_SECTION} />
          </SectionButton>
        </OverlayTrigger>
        <OverlayTrigger placement="right" overlay={<Tooltip>Warble</Tooltip>}>
          <SectionButton>
            <img src={WARBLE_SECTION} />
          </SectionButton>
        </OverlayTrigger>
      </Sections>
      <Sections secondary>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Share profile</Tooltip>}
        >
          <SectionButton secondary>
            <img src={SHARE_SECTION} />
          </SectionButton>
        </OverlayTrigger>
      </Sections>
    </SidebarWrapper>

    <div></div>
  </Sidebar>
);
