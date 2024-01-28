State.init({
  selectedAuthor: null,
});

const WIDGET_OWNER = "mattb.near";
const addressForArticles = "ndcWikiArticle";
const writersWhiteList = [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "shubham007.near",
  "psalm.near",
  "fiftycent.near",
];

const articleBlackList = [
  91092435, 91092174, 91051228, 91092223, 91051203, 91051228,
];

// ========== GET INDEX ARRAY FOR ARTICLES ==========
const postsIndex = Social.index(addressForArticles, "main", {
  order: "desc",
  accountId: undefined,
}).filter((article) => !articleBlackList.includes(article.blockHeight));
// ========== GET ALL ARTICLES ==========
const resultArticles =
  postsIndex &&
  postsIndex
    .reduce((acc, { accountId, blockHeight }) => {
      const postData = Social.get(
        `${accountId}/${addressForArticles}/main`,
        blockHeight
      );
      return [...acc, JSON.parse(postData)];
    }, [])
    .filter((article) =>
      writersWhiteList.some((addr) => addr === article.author)
    );
// ========== FILTER DUBLICATES ==========
const filteredArticles =
  resultArticles.length &&
  resultArticles.reduce((acc, article) => {
    if (!acc.some(({ articleId }) => articleId === article.articleId)) {
      return [...acc, article];
    } else {
      return acc;
    }
  }, []);

const authors =
  filteredArticles.length &&
  Array.from(filteredArticles, ({ author }) => author);

const getAuthorsStats = (acc, author) => {
  if (!acc.hasOwnProperty(author)) {
    acc[author] = 0;
  }
  acc[author] += 1;
  return acc;
};

const countAuthors = (arr) => arr.reduce(getAuthorsStats, {});

const authorsCountObject = filteredArticles.length && countAuthors(authors);

const authorsCountArray =
  filteredArticles.length && Object.entries(authorsCountObject);

function getName(accountId) {
  return Social.getr(`${accountId}/profile`).name || "-";
}

function getProfileImage(accountId) {
  let image = Social.getr(`${accountId}/profile`).image || {
    ipfs_cid: "",
  };

  return `https://ipfs.near.social/ipfs/${image.ipfs_cid}`;
}

const Main = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-evenly;
    width:100%;
    min-height:100vh;
`;

const AuthorPill = styled.a`
    display:flex;
    flex-direction:column-reverse;
    cursor:pointer;
    width:100%;
    max-width:300px;
    max-height:130px;
    background-color:rgba(0,0,0,.05);
    border-radius:20px;
    box-sizing:border-box;
    padding:0 10px 10px;
    border: 2px solid transparent;
    transition: all .2s;
    margin:0 auto 20px;
    text-decoration:none!important;
    color:#000;

    &:hover {
        transition: all .2s;
        border: 2px solid rgb(0,0,0,.02);
    }

    @keyframes loading {
      0% {
        opacity: 0.5;
      }

      100% { 
        opacity: 1;
      }
    }

    &.loading {
      animation-name:loading;
      animation-duration:.5s;
      animation-iteration-count:infinite;
      animation-fill-mode:both;
      animation-direction: alternate;
    }

`;

const AuthorTitle = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:100%;
    max-width:300px;
    height:40%;
    background-color:#fff;
    border-radius:15px;
    box-sizing:border-box;
    padding:20px;

    &:hover {
      & > div ~ div {
        opacity:1;
        transition: all .2s;
      }
    }

    h1 {
        max-width:200px;
        overflow:hidden;
        text-overflow:ellipsis;
        font-size:1.2rem;
        font-weight:bold;
        margin:0;
        padding:0;

        & ~ p {
          opacity:.4;
          padding:0;
          margin:0;
          font-size:.7rem;
        }
    }

    & > div ~ div {
      opacity:.4;
      transition: all .2s;
    }

    &.skeleton {
      h1 {
        color:transparent;
        background-color:rgba(0,0,0,.02);
        border-radius:5px;
      }
      p {
        color:transparent;
        background-color:rgba(0,0,0,.05);
        border-radius:3px;
        margin-top:5px;
      }
    }
`;

const AuthorDetails = styled.div`
    margin-bottom:15px;
    display:flex;
    align-items:center;
    width:100%;
    max-width:300px;
    color:#000;

    &.skeleton {
      h2 {
        color:transparent;
        background-color:rgba(0,0,0,.02);
        border-radius:5px;
      }
      p {
        color:transparent;
        background-color:rgba(0,0,0,.05);
        border-radius:3px;
        margin-bottom:5px;
      }
    }
`;

const Wrapper = styled.div`
    h2 {
        font-size:.8rem;
        letter-spacing:-.5px;
        padding:0;
        margin:0;
        margin-left:5px;

        & ~ p {
          opacity:.4;
          padding:0;
          margin:0;
          font-size:.7rem;
          margin-left:5px;
        }
    }
`;

const Avatar = styled.div`
    border-radius:100%;
    width:40px;
    height:40px;
    background-color:rgba(0,0,0,.05);
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
`;

return (
  <Main>
    {!state.selectedAuthor &&
      authorsCountArray.map(([author, totalArticles]) => (
        <AuthorPill onClick={() => State.update({ selectedAuthor: author })}>
          <AuthorTitle>
            <div>
              <h1>
                {totalArticles} article{totalArticles > 1 ? "s" : ""}
              </h1>
            </div>
            <div></div>
          </AuthorTitle>
          <AuthorDetails>
            <Wrapper>
              <Avatar
                style={{
                  "background-image": `url("${getProfileImage(author)}")`,
                }}
              />
            </Wrapper>
            <Wrapper>
              <h2>{getName(author)}</h2>
              <p>@{author}</p>
            </Wrapper>
          </AuthorDetails>
        </AuthorPill>
      ))}
    {state.selectedAuthor && (
      <Widget
        src={`${WIDGET_OWNER}/widget/NDCDocs.Components.ArticlesList`}
        props={{
          author: state.selectedAuthor,
        }}
      />
    )}
  </Main>
);
