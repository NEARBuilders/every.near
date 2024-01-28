const DefaultTheme = VM.require("mattb.near/widget/Linktree.Themes.Default");

const TagsSection = styled.div`
  display: grid;
  gap: 24px;

  ul {
    justify-content:center;

    li {
      padding: 7px 15px;
      background-color: rgba(255, 209, 220, .2);
      border: 2px solid rgba(255, 209, 220, .4);
      font-weight: 700;
      color:#505050;
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
  background-color:#F7F7F7;
  border-radius:20px;
  color:#505050;

  > a img {
    box-shadow: 0 0 0 10px rgba(255, 209, 220, .2);
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
      border-radius:30px;
      max-width:230px;
      background-color:#FFD1DC;
      padding: 10px;
      font-weight: 500;
      border:0;
      color:#505050;

      i {
        font-size:1.4rem;
        margin-right:10px;
      }

      :hover {
        background-color:#505050;
        color:#FFD1DC;
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
