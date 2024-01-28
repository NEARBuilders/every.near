const DefaultTheme = VM.require("mattb.near/widget/Linktree.Themes.Default");

const TagsSection = styled.div`
  display: grid;
  gap: 24px;

  ul {
    justify-content:center;

    li {
      padding: 7px 15px;
      background-color: rgba(255,255,255,.02);
      border: 2px solid rgba(255,255,255,.05);
      font-weight: 700;
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
  background-color:#1a1a1a;
  border-radius:20px;
  color:#fff;

  > a img {
    box-shadow: 0 0 0 10px rgba(255,255,255,.05);
  }
`;

return {
  ...DefaultTheme,
  Linktree,
  TagsSection,
};
