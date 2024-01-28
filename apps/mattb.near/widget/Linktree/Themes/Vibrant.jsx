const DefaultTheme = VM.require("mattb.near/widget/Linktree.Themes.Default");

const TagsSection = styled.div`
  display: grid;
  gap: 24px;

  ul {
    justify-content:center;
    overflow:visible;

    li {
      padding: 7px 15px;
      background-color: #fff;
      border:0;
      border-radius:0;
      font-weight: 700;
      color:#283593;
      transform: skewX(-10deg);
      transform-origin:bottom;
    }
  }
`;

const Linktree = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap: 16px;
  padding: 0 8px;
  height:100vh;
  background-color:#FFEB3B;
  border-radius:20px;
  color:#283593;

  > a img {
    box-shadow: 0 0 0 10px rgba(255,255,255, .4);
  }
`;

const LinktreeLinks = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
  width:100%;
  max-width:400px;
  margin-top:1rem;

  a {
    text-align:center;
    
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius:0;
      max-width:230px;
      background-color:#fff;
      padding: 10px;
      font-weight: 700;
      border:0;
      color:#283593;
      text-transform:uppercase;
      transform: skewX(10deg);
      transform-origin:bottom;

      i {
        font-size:1.4rem;
        margin-right:10px;
      }

      :hover {
        background-color:#283593;
        opacity:.8;
      }
    }
  }
`;

return {
  ...DefaultTheme,
  Linktree,
  LinktreeLinks,
  TagsSection,
};
