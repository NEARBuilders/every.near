const RICHTEXT_PREVIEW_MODE = "rich";
const MARKDOWN_PREVIEW_MODE = "markdown";
const DEFAULT_PREVIEW_MODE = RICHTEXT_PREVIEW_MODE;
const MARKDOWN_ICON_URL = "https://ipfs.near.social/ipfs/bafkreiatzdufjgkofiwg4pe3otrfqqunnwrad5obwl4kmcnudfcm2yuvgu";
const RICHTEXT_ICON_URL = "https://ipfs.near.social/ipfs/bafkreifny5bvi5ad5bmfimhvi6dl52cwg4nb3koqlsp6thldpll2khnm3a";

const TEXT_FORMATS = {
  format: (text, startSymbol, endSymbol) => {
    return text.length == 0 ? "" : `${startSymbol}${text}${endSymbol}`;
  },
  bold: {
    symbol: "B",
    length: 2,
    format: (text) => TEXT_FORMATS.format(text, "**", "**"),
  },
  italic: {
    symbol: "I",
    length: 1,
    format: (text) => TEXT_FORMATS.format(text, "*", "*"),
  },
  underline: {
    symbol: "U",
    length: 2,
    format: (text) => TEXT_FORMATS.format(text, "++", "++"),
  },
  code: {
    symbol: "</>",
    length: 2,
    format: (text) => TEXT_FORMATS.format(text, "`", "`"),
  },
};

const getRichText = () => {
  let text = state.document.rawText;

  if (state.format) {
    let positions = 0;

    state.format.map((val) => {
      if (val.end) {
        text =
          text.substring(0, val.start + positions) +
          TEXT_FORMATS[val.type].format(
            text.substring(val.start + positions, val.end + positions)
          ) +
          text.substring(val.end + positions, text.length);

        positions += TEXT_FORMATS[val.type].length * 2;
      } else {
        if (state[val.type]) {
          text =
            text.substring(0, val.start + positions) +
            TEXT_FORMATS[val.type].format(
              text.substring(val.start + positions, text.length)
            );
        }
      }
    });

    return text;
  }

  return text;
};

State.init({
  previewMode: DEFAULT_PREVIEW_MODE,
  format: [],
  bold: false,
  italic: false,
  underline: false,
  code: false,
  document: Storage.get("document") || {
    richText: getRichText(),
    rawText: "",
  },
  history: Storage.get("document-history") || {
    backIndex: null,
    forwardIndex: null,
    currentIndex: null,
    data: []
  }
});

const Editor = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:calc(100vh - 50px - 4rem);
`;

const Toolbar = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    height:50px;
    background-color:#fff;
    border: 1px solid rgba(0,0,0,.05);
`;

const Logo = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:50px;
    height:100%;
    border-right:1px solid rgba(0,0,0,.05);
    font-weight:bold;
    font-size:1.7rem;
`;

const Document = styled.div`
    flex-grow:1;
    background-color:rgba(0,0,0,.02);
    padding: 2rem;
    box-sizing:border-box;
`;

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    max-width:800px;
    margin: 0 auto;
`;

const TitleInput = styled.input`
    border:0;
    color:rgba(0,0,0,.9);
    font-weight:bold;
    background-color:transparent;
    outline-style:none;
    font-size:2rem;
    margin-bottom:1rem;

    ::placeholder {
        color:rgba(0,0,0,.6)!important;
        font-weight:bold!important;
        font-size:2rem;
    }
`;

const DocumentBody = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    font-size:1rem;
    height:100%;
`;

const BodyArea = styled.textarea`
    border:0;
    width:100%;
    flex-grow:1;
    background-color:transparent;
    outline-style:none;
    font-size:1rem;
    color:transparent;
    caret-color:black;
    resize:none;

    ::placeholder {
        color:rgba(0,0,0,.4)!important;
        font-size:1rem;
    }
`;

const Options = styled.ul`  
    display:flex;
    list-style:none;
    padding:0;
    margin:0;
    padding:1rem;
    flex-grow:1;
    text-transform:capitalize;

    li {
        display:flex;
        align-items:center;
        justify-content:center;
        min-width:30px;
        min-height:30px;
        border-radius:7px;
        border:2px solid rgba(0,0,0,.05);
        font-size:.8rem;
        font-weight:bold;
        cursor:pointer;
        transition:all .2s;

        &.selected {
          background-color:rgba(0,0,0,.05);
        }

        &.italic {
          font-style:italic;
          span {
            position:relative;
            left:-1px;
          }
        }

        &.underline {
          text-decoration:underline;
        }

        :not(:last-of-type) {
            margin-right:5px;
        }

        :hover {
            transition:all .2s;
            box-shadow: 0 0 0 2px rgba(0,0,0,.05);
        }
    }
`;

const TextVisualizer = styled.div`
    position:absolute;
    top:0;
    left:0;

    * {
        margin:0;
        padding:0;
    }
`;

const Actions = styled.div`
    padding: .7rem;
    
    .save, .back {
        padding:.3rem 1rem;
        border:0;
        border-radius:5px;
        font-size:.8rem;
        transition: all .2s;

        :hover {
            transition: all .2s;
            opacity:.9;
        }
    }

    .save {
        background-color: #2142e7;
        color:#fff;

        :hover {
            background-color: #2142e7;
        }
    }

    .back {
        opacity:.6;
        color:#000;
        background-color:#fff;
        box-shadow: inset 0 0 0 2px rgba(0,0,0,.1)!important;

        :hover {
            opacity:.9;
        }
    }
`;

const DocumentFooter = styled.div`
  width:100%;
  min-height:30px;
  font-size:.8rem;
  text-align:right;
  color:rgba(0,0,0,.4)
`;

const toggleOption = (optionType) => {
  let option = {};
  option[optionType] = !state[optionType];

  State.update(option);

  if (state[optionType]) {
    State.update({
      format: [
        ...state.format,
        {
          type: optionType,
          start: state.document.rawText.length,
          end: null,
        },
      ],
    });
  } else {
    let newFormat = state.format.map((val, idx) => {
      if (val.type === optionType && !val.end) {
        val.end = state.document.rawText.length;
      }

      return val;
    });
    State.update({
      format: newFormat,
    });

    State.update({
      document: {
        ...state.document,
        richText: getRichText(),
      },
    });
  }
};

return (
  <Editor>
    <Toolbar>
      <Logo>n</Logo>
      <Options>
        {Object.keys(TEXT_FORMATS)
          .filter((key) => key !== "format")
          .map((format) => (
            <OverlayTrigger
              key={format}
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-${format}`}>{format.substring(0,1).toUpperCase() + format.substring(1, format.length)}</Tooltip>
                }
            >
              <li
                className={`format ${state[format] ? "selected" : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={(e) => toggleOption(format)}
              >
                {TEXT_FORMATS[format].symbol}
              </li>
            </OverlayTrigger>
          ))}
      </Options>
      <Actions>
        <Options>
          <li className={state.history.data.length == 0}>{"<"}</li>
          <li>{">"}</li>
          <li><button className="back">Close</button></li>
          <li><button className="save">Save</button></li>
        </Options>
      </Actions>
    </Toolbar>
    <Document>
      <Wrapper>
        <TitleInput type="text" placeholder="This is the title." />
        <DocumentBody>
          {RICHTEXT_PREVIEW_MODE === state.previewMode && (
            <TextVisualizer>
              <Markdown text={state.document.richText} />
            </TextVisualizer>
          )}
          <BodyArea
            value={state.document.rawText}
            style={{
              color:
                MARKDOWN_PREVIEW_MODE === state.previewMode
                  ? "#000"
                  : "transparent",
                caretColor: `${state.document.rawText.length > 0 ? "transparent" : "#000"}`
            }}
            onChange={(event) => {
              State.update({
                document: {
                  ...state.document,
                  rawText: event.target.value,
                },
              });

              State.update({
                document: {
                  ...state.document,
                  richText: getRichText(),
                },
              });

              Storage.set("document", state.document);
            }}
            placeholder="This is the body of your document. Type something."
          />
        </DocumentBody>
        <DocumentFooter>
          {state.document.rawText.split(" ").length - 1} words
          <br />
          {state.document.rawText.length} characters
        </DocumentFooter>
      </Wrapper>
    </Document>
  </Editor>
);
