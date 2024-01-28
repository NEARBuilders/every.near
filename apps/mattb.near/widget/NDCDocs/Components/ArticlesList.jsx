const { allowedAuthors, author } = props;

const ARTICLES_ADDRESS = "ndcWikiArticle";
const ALLOWED_AUTHORS = allowedAuthors || [
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
const ARTICLES_NOT_ALLOWED = [91092435, 91092174, 91051228, 91092223, 91051203];
const WIDGET_AUTHOR = "neardigitalcollective.near";

State.init({
  loaded: false,
  posts: [],
});

function getPosts() {
  setTimeout(() => {
    const postsIndex =
      Social.index(ARTICLES_ADDRESS, "main", {
        order: "desc",
        accountId: undefined,
      }) || [];

    let articles = postsIndex
      .reduce((acc, { accountId, blockHeight }) => {
        const postData = Social.get(
          `${accountId}/${ARTICLES_ADDRESS}/main`,
          blockHeight
        );

        return [...acc, { ...JSON.parse(postData), blockHeight }];
      }, [])
      .filter((article) =>
        ALLOWED_AUTHORS.some(
          (address) =>
            address === article.author &&
            !ARTICLES_NOT_ALLOWED.includes(article.blockHeight)
        )
      );

    let filteredArticles = articles.reduce((acc, article) => {
      if (!acc.some(({ articleId }) => articleId === article.articleId)) {
        return [...acc, article];
      } else {
        return acc;
      }
    }, []);

    State.update({
      posts: filteredArticles,
    });
  }, 200);
}

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
};

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

const ArticlePill = styled.a`
    display:block;
    cursor:pointer;
    width:100%;
    max-width:300px;
    height:200px;
    background-color:rgba(0,0,0,.05);
    border-radius:20px;
    box-sizing:border-box;
    padding:10px;
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

const ArticleTitle = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:100%;
    max-width:300px;
    height:70%;
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

const ArticleDetails = styled.div`
    margin-top:5px;
    display:flex;
    align-items:center;
    width:100%;
    max-width:300px;
    height:30%;
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
        margin-top:5px;
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

const arrowImg = (
  <img
    src="https://ipfs.near.social/ipfs/bafkreigygnp234eyi5ljtxf7czp5emmhihjxitbl6e4zzuol3wgxsvkhcu"
    style={{
      maxWidth: "20px",
    }}
  />
);

function getSkeleton() {
  return (
    <>
      {Array.from(Array(15).keys()).map(() => (
        <ArticlePill className="loading">
          <ArticleTitle className="skeleton">
            <div>
              <h1>TheNDC</h1>
              <p>Published on 03/07/2023</p>
              <p>Last edit by blaze.near</p>
            </div>
            <div></div>
          </ArticleTitle>
          <ArticleDetails className="skeleton">
            <Wrapper>
              <Avatar />
            </Wrapper>
            <Wrapper>
              <h2>NEAR Digital Collective</h2>
              <p>@neardigitalcollective.near</p>
            </Wrapper>
          </ArticleDetails>
        </ArticlePill>
      ))}
    </>
  );
}

const getArticleLink = (idx) => {
  let article = state.posts[idx];
  return article
    ? `#/mattb.near/widget/NDCDocs.Components.Article?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}`
    : "";
};

const getControls = (idx) => {
  let nextArticleLink = getArticleLink(idx + 1);
  let previousArticleLink = getArticleLink(idx - 1);

  let nextArticleLinkParams = nextArticleLink
    ? `&nextArticleLink=${nextArticleLink}&nextArticleName=${
        state.posts[idx + 1].articleId
      }`
    : "";

  let previousArticleLinkParams = previousArticleLink
    ? `&previousArticleLink=${previousArticleLink}&previousArticleName=${
        state.posts[idx - 1].articleId
      }`
    : "";

  return nextArticleLinkParams + previousArticleLinkParams;
};

const getFullArticleLink = (idx) => {
  let currentLink = getArticleLink(idx);
  let controls = getControls(idx);

  return `${currentLink}${controls}`;
};

return (
  <Main>
    {!state.posts.length && getSkeleton()}
    {getPosts()}
    {!!state.posts.length &&
      state.posts
        .filter((post) => (author ? post.author == author : true))
        .map((article, idx) => (
          <>
            <ArticlePill href={getArticleLink(idx)}>
              <ArticleTitle>
                <div>
                  <h1>{article.articleId}</h1>
                  <p>Published on {getDateLastEdit(article.timeCreate).date}</p>
                  <p>Last edit by {article.lastEditor}</p>
                </div>
                <div>{arrowImg}</div>
              </ArticleTitle>
              <ArticleDetails>
                <Wrapper>
                  <Avatar
                    style={{
                      "background-image": `url("${getProfileImage(
                        article.author
                      )}")`,
                    }}
                  />
                </Wrapper>
                <Wrapper>
                  <h2>{getName(article.author)}</h2>
                  <p>@{article.author}</p>
                </Wrapper>
              </ArticleDetails>
            </ArticlePill>
          </>
        ))}
  </Main>
);
