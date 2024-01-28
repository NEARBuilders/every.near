const { showMenu, article, index, onChange } = props;

State.init({
  currentSection: 0,
});

const changeSection = (key) => {
  State.update({ currentSection: key });
  if (typeof onChange === "function") {
    onChange(key);
  }
};

const SideBarWrapper = styled.div`
  min-width:250px;
  position:relative;
  z-index:99999;
  height:100vh;
  display:none;

  @media screen and (max-width:800px) {
    position:absolute;
    left:0;
    background-color:#fff;
    width:100%;
  }

  &.show {
    display:block;
  }
`;

const SideBar = styled.div`
    display:flex;
    flex-direction:column;
    width:250px;
    height:calc(100vh - 1.5rem);
    border-right:3px solid rgba(0,0,0,.02);
    box-sizing:border-box;
    padding:1.5rem;
    background-color:#fff;

    @media screen and (max-width:800px) {
      width:100%;
    }

    h1 {
      font-size:1.4rem;
      font-weight:bold;

      @media screen and (min-width:800px) {
        text-overflow: ellipsis;
        width: 200px;
        overflow: hidden;
      }
    }

    div:nth-child(1) {
        flex-grow:1;
        overflow-y:auto;
    }

    ul {
        list-style:none;

        li {
            cursor:pointer;
            position:relative;

            a {
              color:#000;
            }
            
            h2 {
                font-size:.8rem;
                padding:.5rem;
                transition: all .2s;
            }

            &::after {
                position:absolute;
                top:0;
                bottom:0;
                left:-10px;
                margin:auto;
                content: '';
                width:5px;
                height:5px;
                border-radius:100%;
                background-color:#E5E5E5;
                box-shadow: 0 0 0 4px #fff;
                transition: all .2s;
            }

            &:not(:last-of-type) {
                &::before {
                    content: '';
                    position:absolute;
                    width:2px;
                    height:100%;
                    left:-8.5px;
                    background-color:#E5E5E5;
                    transform:translateY(50%);
                    
                }
            }

            &.selected {
                h2 {
                    position:relative;
                    transition: all .2s;
                    font-weight:bold;
                }

                &::after {
                    transition: all .2s;
                    width:10px;
                    height:10px;
                    left:-12.5px;
                }
            }
        }
    }
`;

return (
  <SideBarWrapper className={showMenu ? "show" : ""}>
    <SideBar>
      <div>
        <h1>{article.articleId}</h1>
        <ul>
          {index.map((obj, key) => (
            <li
              onClick={() => changeSection(key)}
              className={key === state.currentSection ? "selected" : ""}
            >
              <a href={`#${obj.contentStart}`}>
                <h2>{obj.title}</h2>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SideBar>
  </SideBarWrapper>
);
