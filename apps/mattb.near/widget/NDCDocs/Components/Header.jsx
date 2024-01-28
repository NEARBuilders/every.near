const { onClick, showMenu, title } = props;

State.init({
  showMenu: showMenu || false,
});

const toggleMenu = () => {
  State.update({ showMenu: !state.showMenu });

  if (typeof onClick === "function") {
    onClick(state.showMenu);
  }
};

const HeaderWrapper = styled.div`
    position:relative;
    height:70px;
    
    @media screen and (max-width:800px) {
        display:block;
    }
`;

const Header = styled.div`
  position:relative;
  box-sizing:border-box;
  padding:1rem;
  align-items:center;
  width:100%;
  display:flex;
  border-bottom:1px solid rgba(0,0,0,.05);
  background-color:#fff;
  z-index:9999;

  @media screen and (max-width: 800px) {
    position:fixed;
  }

  > p {
    margin:0;
    padding:0;
    margin-left:10px;
    font-weight:bold;
  }
`;

const MenuButton = styled.div`
    cursor:pointer;
    width:40px;
    height:40px;
    border-radius:10px;
    background-color:rgba(0,0,0,.05);
    background-image:url(https://ipfs.near.social/ipfs/bafkreiexzn4c2sc53i5k5u7zaazdkf6j2zhzvifsxp7skcucwaxm46aggi);
    background-position:center;
    background-repeat:no-repeat;
    background-size:20px 20px;
    transition: all .2s;
    border: 2px solid rgba(0,0,0,.0);

    &:hover {
        transition: all .2s;
        box-shadow: 0 0 10px 5px rgba(0,0,0,.02);
        border: 2px solid rgba(0,0,0,.02);
    }
`;

return (
  <HeaderWrapper>
    <Header>
      <MenuButton onClick={() => toggleMenu()}></MenuButton>
      <p>{title || "NDCDocs 📝"}</p>
    </Header>
  </HeaderWrapper>
);
