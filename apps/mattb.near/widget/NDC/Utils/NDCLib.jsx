const { onLoad, onRefresh, loaded } = props;

const ARTICLES_ADDRESS = "ndcWikiArticle";
const ALLOWED_AUTHORS = [
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

const NDCLib = {
  getFormattedDate: (unixTimestamp) => {
    const date = new Date(Number(unixTimestamp));
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  },
  getAccountName: (accountId) => {
    return Social.getr(`${accountId}/profile`).name || "-";
  },
  getDocsArticle: (lastEditor, addressForArticles) => {
    return (
      JSON.parse(
        Social.get(`${lastEditor}/${addressForArticles}/main`, blockHeight)
      ) || {}
    );
  },
  getDocsArticleIndex: (post) => {
    let titles = [];

    post.body.split("\n").map((line, idx) => {
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

    return titles;
  },
  getDocsArticleFull: (lastEditor, addressForArticles) => {
    let article = NDCLib.getDocsArticle(lastEditor, addressForArticles);

    return {
      post: article,
      index: NDCLib.getDocsArticleIndex(article),
    };
  },
  getDocsArticles: () => {
    const articlesIndex =
      Social.index(ARTICLES_ADDRESS, "main", {
        order: "desc",
        accountId: undefined,
      }) || [];

    let articles = articlesIndex
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

    return articles.reduce((acc, article) => {
      if (!acc.some(({ articleId }) => articleId === article.articleId)) {
        return [...acc, article];
      } else {
        return acc;
      }
    }, []);
  },
  getAccountProfileImage: (accountId) => {
    return `https://ipfs.near.social/ipfs/${
      Social.getr(`${accountId}/profile`).image.ipfs_cid || ""
    }`;
  },
};

if (!loaded && onLoad && typeof onLoad === "function") {
  onLoad(NDCLib);
}
