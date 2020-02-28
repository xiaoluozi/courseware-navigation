let iframe = document.getElementsByTagName("iframe")[0];
const iframeWindow = iframe.contentWindow;
const iframe_Url = "http://localhost:3000/";
function resetState() {
  const message = {
    event: "resetState"
  };
  iframeWindow!.postMessage(message, iframe_Url);
}
function jumpElement(element: string) {
  const message = {
    event: "setElement",
    value: element
  };
  iframeWindow!.postMessage(message, iframe_Url);
}
export { jumpElement, resetState };
