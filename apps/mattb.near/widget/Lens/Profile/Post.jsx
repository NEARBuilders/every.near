const { postId, post } = props;
const DEFAULT_POST_ID = "0x01-0x02";

State.init({
  post: post || null,
  sdk: null,
  displayCommentSection: false,
  comments: [],
});

if (!state.post && state.sdk) {
  state.sdk.getPost(postId || DEFAULT_POST_ID).then((payload) => {
    State.update({ post: payload.body.data.publication });
  });
}

if (state.displayCommentSection && state.sdk) {
  state.sdk.getPostComments(postId || DEFAULT_POST_ID).then((payload) => {
    console.log(payload.body.data.publications.items);
    State.update({ comments: payload.body.data.publications.items });
  });
}

const Box = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    max-width:500px;
    background-color:#F2F2F2;
    border-radius:20px;
    border: 3px solid rgba(0,0,0,.05);
    box-sizing:border-box;
    padding:1.5rem;

    * {
        padding:0;
        margin:0;
    }
`;

const Profile = styled.div`
    display:flex;
`;

const Avatar = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:60px;
    height:60px;
    border-radius:100%;
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
    background-color:rgba(0,0,0,.05);
    box-shadow: 0 0 0 3px rgba(0,0,0,.05);
`;

const Details = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    flex-grow:1;
    box-sizing:border-box;
    padding: 0 .7rem;
    color;#000;
    opacity:.7;
    line-height:1.4rem;
    transition: all .2s;

    &:hover {
        transition: all .2s;
        opacity:.9;
    }

    p.name {
        font-size:1.3rem;
        font-weight:bold;
        letter-spacing:-.5px;
    }

    p.handle {
        font-size:.8rem;
        font-weight:bold;
        opacity:.7;
    }

    p.time {
        font-size:.8rem;
    }
`;

const Post = styled.div`
    width:100%;
    height:100%;
    flex-grow:1;
    background-color:#fff;
    border-radius:20px;
    margin:1.3rem 0;
    box-sizing:border-box;
    padding:1rem;
    color:rgba(0,0,0,.8);
    word-break:break-words;
`;

const Time = styled.div`
    margin-top:1rem;
    padding: .8rem 0 0;
    font-size:.8rem;
    border-top:1px solid rgba(0,0,0,.1);
`;

const Actions = styled.div`
    display:flex;
    justify-content:space-between;
    padding:1.6rem 0 0;
    text-align:center;
    border-top: 2px solid rgba(0,0,0,.05);

    p {
        position:relative;
        display:flex;
        align-items:center;
        justify-content:center;
        width:calc(30px + 1rem);
        height:calc(30px + 1rem);
        font-size:1.2rem;
        font-weight:bold;
        padding:1rem;
        border-radius:100%;
        background-color:#E6E6E6;
        color:red;
        cursor:pointer;
        border: 2px solid rgba(0,0,0,.05);

        &:hover {
            img {
                opacity:.9;
                transition: all .2s;
            }

            .tip {
                opacity:1;
                transition: all .2s;
            }
        }

        .badge {
            position:absolute;
            top:0;
            transform:translateX(calc(50% + 8px));
            font-size:.7rem;
            color:#fff;
            padding: 2px 4px;
            background-color:#35393C;
            border-radius:10px;
            border: 1px solid rgba(0,0,0,.05);
        }

        .tip {
            opacity:0;
            pointer-events:none;
            display:block;
            position:absolute;
            bottom:-85%;
            font-size:.8rem;
            color: #fff;
            background-color:#35393C;
            padding: 2px 8px;
            border-radius:5px;
            font-weight:normal;
            transition: all .2s;
        }
        
        img {
            max-height:24px;
            opacity:.6;
            transition: all .2s;
        }
    }
`;

const Comments = styled.div`
    border-top: 2px solid rgba(0,0,0,.05);
    margin-top:1.5rem;
`;

const Comment = styled.div`
    width:100%;
    min-height:100px;
    margin-top:20px;
    border-bottom: 2px solid rgba(0,0,0,.05);
`;

const Content = styled.div`
    padding:1rem 0;
    font-size:.8rem;
`;

return (
  <>
    <Widget
      src="mattb.near/widget/LensSDK"
      props={{
        onLoad: (sdk) => State.update({ sdk: sdk }),
        onRefresh: (sdk) => State.update({ sdk: sdk }),
        loaded: !!state.sdk,
      }}
    />

    {state.sdk && state.post && (
      <Box>
        <Profile>
          <Avatar
            style={{
              backgroundImage: `url("${state.post.profile.picture.original.url}")`,
            }}
          ></Avatar>
          <Details>
            <p class="name">{state.post.profile.name}</p>
            <p class="handle">@{state.post.profile.handle}</p>
          </Details>
        </Profile>
        <Post>
          <p>{state.post.metadata.content}</p>
          <Time>
            <p>
              {state.post.createdAt} ·{" "}
              {state.post.appId && `Posted via ${state.post.appId}`}
            </p>
          </Time>
        </Post>
        <Actions>
          <p
            onClick={() =>
              State.update({
                displayCommentSection: !state.displayCommentSection,
              })
            }
          >
            <img src="https://ipfs.near.social/ipfs/bafkreihzp4er5k54cqym5tzj6yqo5oftnpfillxshuou6qyjbbap677lyu" />
            <span class="badge">{state.post.stats.totalAmountOfComments}</span>
            <span class="tip">Comment</span>
          </p>
          <p>
            <img src="https://ipfs.near.social/ipfs/bafkreihzytwkhu3u6jc7yapsbuwsff33wlltrlcyv2s7h6jqld7qdmfxqm" />
            <span class="badge">{state.post.stats.totalAmountOfMirrors}</span>
            <span class="tip">Mirror</span>
          </p>
          <p>
            <img src="https://ipfs.near.social/ipfs/bafkreiag6hlzwic63nonmqon5cdfs6hbw3qzpdvz3nhckfvezcthc3otrq" />
            <span class="badge">{state.post.stats.totalAmountOfCollects}</span>
            <span class="tip">Collect</span>
          </p>
          <p>
            <img src="https://ipfs.near.social/ipfs/bafkreieqyco26dt23l4v66ppp3sdh6pei72h4pdirhl7ety6rxpmxdtra4" />
            <span class="badge">{state.post.stats.totalUpvotes}</span>
            <span class="tip">Like</span>
          </p>
        </Actions>
        {state.displayCommentSection && (
          <Comments>
            {state.comments.length > 0 &&
              state.comments.map((comment) => (
                <Comment>
                  <Profile>
                    <Avatar
                      style={{
                        backgroundImage: `url("${comment.profile.picture.original.url}`,
                        maxWidth: "40px",
                        maxHeight: "40px",
                      }}
                    ></Avatar>
                    <Details>
                      <p class="name">{comment.profile.name}</p>
                      <p class="handle">@{comment.profile.handle}</p>
                    </Details>
                  </Profile>
                  <Content>{comment.metadata.content}</Content>
                </Comment>
              ))}
          </Comments>
        )}
      </Box>
    )}
  </>
);
