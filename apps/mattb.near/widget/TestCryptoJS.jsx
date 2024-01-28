const $ = VM.require("sdks.near/widget/Loader");
const { IframeDependency } = $("@sdks/abstracts");

const code = `
<script type="text/javascript" src="https://unpkg.com/crypto-js@4.2.0/crypto-js.js"></script>
<script type="text/javascript">
    window.top.postMessage(CryptoJS, "*");
</script>
`;

return <IframeDependency code={code} onUpdate={(data) => console.log(data)} />;
