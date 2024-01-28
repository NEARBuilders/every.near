const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  background-color: #333;
  color: #fff;
  padding: 20px;
`;

const EditorWrapper = styled.div`
  flex: 1;
  padding: 96px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const EditorTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 16px;
  resize: none;
  outline: none;
`;

const PreviewContent = styled.div`
  color: #333;
  font-size: 16px;
`;

const Select = styled.select``;

const Option = styled.option``;

const Label = styled.label`
  margin-right: 10px;
`;

const draftKey = "draft";

const set = (k, v) => {
  Storage.privateSet(k, v);
};

const get = (k) => {
  return Storage.privateGet(k);
};

const draft = get(draftKey);
const defaultViewMode = get("viewMode");
const defaultPreview = get("preview");
const defaultEditor = get("editor");

if (draft === null || viewMode === null || defaultPreview === null || defaultEditor === null) {
  return "";
}

const [content, setContent] = useState(draft);
const [viewMode, setViewMode] = useState(defaultViewMode || "single"); // 'single' or 'split'
const [showPreview, setShowPreview] = useState(defaultPreview || false);
const [editor, setEditor] = useState(defaultEditor || "");

const handleToggleViewMode = () => {
  const newMode = viewMode === "single" ? "split" : "single";
  set("viewMode", newMode);
  setViewMode(newMode);
};

const handleTogglePreview = () => {
  set("preview", !showPreview);
  setShowPreview(!showPreview);
};

const editors = [
  {
    value: "",
    label: "default textarea",
  },
  {
    value: "alpha.near/widget/SimpleMDE",
    label: "SimpleMDE",
  },
  {
    value: "alpha.near/widget/MarkdownEditorIframe",
    label: "MarkdownEditorIframe",
  },
];

const DefaultEditor = ({ value, onChange }) => (
  <EditorTextarea
    placeholder="Start typing..."
    value={value}
    onChange={onChange}
  />
);

return (
  <PageContainer>
    <Header>
      {viewMode === "single" && (
        <button onClick={handleTogglePreview}>
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      )}
      <button onClick={handleToggleViewMode}>Toggle View Mode</button>
      <div>
        <Label>editor:</Label>
        <Select
          onChange={(e) => {
            set("editor", e.target.value)
            setEditor(e.target.value);
          }}
        >
          {editors &&
            editors.map((it) => (
              <Option value={it.value} selected={it.value === editor}>
                {it.label}
              </Option>
            ))}
        </Select>
      </div>
    </Header>
    {viewMode === "single" ? (
      <EditorWrapper>
        {showPreview ? (
          <PreviewContent>{content}</PreviewContent>
        ) : (
          <>
            {editor ? (
              <Widget
                src={editor}
                props={{
                  value: { content },
                  onChange: (v) => {
                    setContent(v);
                    set(draftKey, v);
                  },
                }}
              />
            ) : (
              <DefaultEditor
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  Storage.privateSet(draftKey, e.target.value);
                }}
              />
            )}
          </>
        )}
      </EditorWrapper>
    ) : (
      <div style={{ display: "flex", height: "100%" }}>
        <EditorWrapper>
          <EditorTextarea
            placeholder="Start typing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </EditorWrapper>
        <EditorWrapper>
          <PreviewContent>{content}</PreviewContent>
        </EditorWrapper>
      </div>
    )}
  </PageContainer>
);
