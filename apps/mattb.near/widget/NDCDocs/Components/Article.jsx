let {
  embedHeader,
  previousArticleLink,
  nextArticleLink,
  previousArticleName,
  nextArticleName,
} = props;

const widgetOwner = "mattb.near";
const addressForComments = "NDCDOCS-comments";
const addressForArticles = "ndcWikiArticle";
const authorForWidget = "neardigitalcollective.near";
const accountId = props.accountId || context.accountId;

const lastEditor = props.lastEditor;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const subscribe = !!props.subscribe;
const raw = !!props.raw;

const path = `${context.widgetSrc}?lastEditor=${lastEditor}&blockHeight=${blockHeight}&subscribe=${subscribe}&raw=${raw}`;

const notifyAccountId = accountId;

State.init({
  currentSection: 0,
  index: null,
  coverImage: null,
  article: null,
  showMenu: false,
});

State.update({
  article:
    JSON.parse(
      Social.get(`${lastEditor}/${addressForArticles}/main`, blockHeight)
    ) || {},
});

const articlesIndex = Social.index(addressForArticles, "main", {
  order: "asc",
  accountId: state.article.author,
});

const resultArticles =
  articlesIndex &&
  articlesIndex.reduce((acc, { accountId, blockHeight }) => {
    const postData = Social.get(
      `${accountId}/${addressForArticles}/main`,
      blockHeight
    );
    const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };
    return [...acc, postDataWithBlockHeight];
  }, []);

const firstArticle =
  resultArticles &&
  resultArticles.find(
    (article) => article.articleId === state.article.articleId
  );

const firstArticleBlockHeight = firstArticle.blockHeight;

const item = {
  type: "social",
  path: `${state.article.author}/${addressForArticles}/main`,
  blockHeight: firstArticleBlockHeight,
};

function getIndex() {
  let titles = [];

  state.article.body.split("\n").map((line, idx) => {
    if (line[0] === "!" && idx == 0) {
      State.update({
        coverImage: line
          .substring(line.indexOf("https"), line.length - 1)
          .trim(),
      });
    }
    if (line[0] === "#" && line[1] !== "#") {
      titles = titles.map((title) => {
        if (title.contentEnd == null) {
          title.contentEnd = idx - 1;
        }
        return title;
      });

      titles.push({
        title: line.substring(1, line.length).trim(),
        contentStart: idx,
        contentEnd: null,
      });
    }
  });

  if (titles.length == 0) {
    titles.push({
      title: articleId,
      contentStart: 0,
      contentEnd: null,
    });
  }

  State.update({ index: titles });
}

getIndex();

console.log(state.article);

const Main = styled.div`
    display:flex;
    position:relative;
    overflow:hidden;
    background-color:#fff;
`;

const Content = styled.div`
    flex-grow:1;
    box-sizing:border-box;
    padding:2rem;
    min-height:100vh;

    @media screen and (min-width:800px) {
      padding:1.2rem;
    }

    h1 {
        font-weight:bold;
    }

    .markdown {
      position:relative;
      padding:10px 0;

      .link {
        cursor:pointer;
        opacity:0;
        width:20px;
        height:20px;
        position:absolute;
        top:15px;
        left:-20px;
        transition:all .2s;
      }

      &:hover {
        .link {
          opacity:.7;
          transition:all .2s;
        }
      }
      
      &:first-of-type {
        padding-top:0;

        .link {
          top:5px;
        }
      }
    }
`;

const Wrapper = styled.div`
  max-width:800px;
  margin:0 auto;

  & > div > img, & > div > p img {
      display:block;
      height:400px;
      border-radius:20px;
      background-color:rgba(0,0,0,.05);
      margin:30px auto;
  }

  h1 {
    font-size:1.8rem;
    margin-bottom:13px;

    &:first-of-type {
      margin-top:0;
    }
  }

  h4 {
    font-size:1.2rem;
  }

`;

const CommentSection = styled.div`
    padding-top:2rem;
    border-top: 1px solid rgba(0,0,0,.05);
    background-color:#fff;

    .place-comment {
        margin-bottom:2rem;

        .btn.btn-dark {
          border:0;
          background: linear-gradient(to right, rgba(147,51,234,1), rgba(79,70,229,1));
        }

        .btn.btn-outline-secondary:hover {
          color:#000;
          background:rgb(255, 213, 13);
        }
    }

    h3 {
        margin-bottom:1rem;
    }
`;

return (
  <>
    {(typeof embedHeader == "undefined" || embedHeader) && (
      <Widget
        src={`${widgetOwner}/widget/NDCDocs.Components.Header`}
        props={{
          onClick: (newState) => State.update({ showMenu: newState }),
        }}
      />
    )}
    <Main>
      <Widget
        src={`${widgetOwner}/widget/NDCDocs.Components.SideBar`}
        props={{
          showMenu: state.showMenu,
          article: state.article,
          index: state.index,
        }}
      />
      <Content>
        <Wrapper>
          <Widget
            src={`${widgetOwner}/widget/NDCDocs.Components.ArticleContent`}
            props={{
              article: state.article,
              index: state.index,
              coverImage: state.coverImage,
            }}
          />
        </Wrapper>
        <Widget
          src={`${widgetOwner}/widget/NDCDocs.Components.Controls`}
          props={{
            previousArticle: {
              link: previousArticleLink,
              name: previousArticleName,
            },
            nextArticle: {
              link: nextArticleLink,
              name: nextArticleName,
            },
          }}
        />
        <CommentSection>
          <Wrapper>
            <h3>Comments</h3>
            <div className="place-comment">
              <Widget
                src={`neardigitalcollective.near/widget/WikiOnSocialDB_Comment.Compose`}
                props={{
                  notifyAccountId,
                  item,
                }}
              />
            </div>
            <Widget
              src={`neardigitalcollective.near/widget/WikiOnSocialDB_Comment.Feed`}
              props={{
                item,
                highlightComment: props.highlightComment,
                limit: props.commentsLimit,
                subscribe,
                raw,
              }}
            />
          </Wrapper>
        </CommentSection>
      </Content>
    </Main>
  </>
);
