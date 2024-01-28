const DefaultTheme = VM.require("mattb.near/widget/Linktree.Themes.Default");

const TagsSection = styled.div`
  display: grid;
  gap: 24px;

  ul {
    justify-content:center;

    li {
      padding: 7px 15px;
      font-weight: 700;
      background-color:#98FB98;
      color:#800080;
      border:0;

      &:nth-child(1) {
            background-color:#FFDB58;
            color:#505050;

            &:hover {
                color:#FFDB58;
                background-color:#505050;
            }
        }

        &:nth-child(2) {
            background-color:#FFB6C1;
            color: #008B45;

            &:hover {
                color:#FFB6C1;
                background-color: #008B45;
            }
        }

        &:nth-child(3) {
            background-color:#FF6F61;
            color:#fff;

            &:hover {
                color:#FF6F61;
                background-color:#fff;
            }
        }

        &:nth-child(4) {
            background-color:#0047AB;
            color:#FF69B4;

            &:hover {
                color:#0047AB;
                background-color:#FF69B4;
            }
        }
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
  background-color:#E0F7FA;
  border-radius:20px;
  color:#505050;

  > a img {
    box-shadow: 0 0 0 10px rgba(0,0,0, .1);
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
      background-color:#98FB98;
      color:#800080;
      padding: 10px;
      font-weight: 700;
      border:0;
      text-transform:uppercase;

      i {
        font-size:1.4rem;
        margin-right:10px;
      }

      :hover {
        background-color:#800080;
        color:#98FB98;
        opacity:.8;
      }
    }

    &:nth-child(1) {
        button {
            background-color:#FFDB58;
            color:#505050;

            &:hover {
                color:#FFDB58;
                background-color:#505050;
            }
        }
    }

    &:nth-child(2) {
        button {
            background-color:#FFB6C1;
            color: #008B45;

            &:hover {
                color:#FFB6C1;
                background-color: #008B45;
            }
        }
    }

    &:nth-child(3) {
        button {
            background-color:#FF6F61;
            color:#fff;

            &:hover {
                color:#FF6F61;
                background-color:#fff;
            }
        }
    }

    &:nth-child(4) {
        button {
            background-color:#0047AB;
            color:#FF69B4;

            &:hover {
                color:#0047AB;
                background-color:#FF69B4;
            }
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
