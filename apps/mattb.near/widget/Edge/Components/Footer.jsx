const twitter = "edgeintelligence";
const LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreie26u27gg5sxrotho2ferb7dj75ck6etivegc3do47mfyk2dmpl24";

const Footer = styled.div`
    position:relative;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:2rem 1rem;
    box-sizing:border-box;
    border-top:1px solid rgba(0,0,0,.05);
`;

const Logo = styled.div`
    display:flex;
    font-family: Times New Roman;
    align-items:center;

    img {
        max-width:60px;
    }

    p {
        margin:0;
        padding:0;
        font-size:1.1rem;
        margin-left:.5rem;
        color:#000;
        font-weight:bold;
    }
`;

const Nav = styled.div`
    p {
        margin:0;
        padding:0;
        font-size:.8rem;
    }
`;

return (
  <Footer>
    <Logo>
      <img src={LOGO_URL} />
      <p>EDGE NETWORK</p>
    </Logo>
    <Nav>
      <p>
        Twitter <a href={`https://twitter.com/${twitter}`}>@{twitter}</a>
      </p>
      <p>This web has been built with NEAR bOS</p>
    </Nav>
  </Footer>
);
