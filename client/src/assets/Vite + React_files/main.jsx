import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=63afbb9c"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=91f76856"; const ReactDOM = __vite__cjsImport1_reactDom_client.__esModule ? __vite__cjsImport1_reactDom_client.default : __vite__cjsImport1_reactDom_client;
import { BrowserRouter } from "/node_modules/.vite/deps/react-router-dom.js?v=a16c5eb7";
import { Provider } from "/node_modules/.vite/deps/react-redux.js?v=fdefeb00";
import { store } from "/src/states/store.js";
import { QueryClient, QueryClientProvider } from "/node_modules/.vite/deps/react-query.js?v=2f4fa75e";
const queryClient = new QueryClient();
import App from "/src/App.jsx?t=1709835931748";
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(Provider, { store, children: /* @__PURE__ */ jsxDEV(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxDEV(BrowserRouter, { children: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
    fileName: "C:/Users/lucac/Documents/GitHub/FlickPicks/client/src/main.jsx",
    lineNumber: 13,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "C:/Users/lucac/Documents/GitHub/FlickPicks/client/src/main.jsx",
    lineNumber: 12,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/lucac/Documents/GitHub/FlickPicks/client/src/main.jsx",
    lineNumber: 11,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "C:/Users/lucac/Documents/GitHub/FlickPicks/client/src/main.jsx",
    lineNumber: 10,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBWVE7QUFaUixPQUFPQSxjQUFjO0FBQ3JCLFNBQVNDLHFCQUFxQjtBQUM5QixTQUFTQyxnQkFBZ0I7QUFDekIsU0FBU0MsYUFBYTtBQUN0QixTQUFTQyxhQUFhQywyQkFBMkI7QUFDakQsTUFBTUMsY0FBYyxJQUFJRixZQUFZO0FBQ3BDLE9BQU9HLFNBQVM7QUFFaEJQLFNBQVNRLFdBQVdDLFNBQVNDLGVBQWUsTUFBTSxDQUFDLEVBQUVDO0FBQUFBLEVBQ25ELHVCQUFDLFlBQVMsT0FDUixpQ0FBQyx1QkFBb0IsUUFBUUwsYUFDM0IsaUNBQUMsaUJBQ0MsaUNBQUMsU0FBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQUksS0FETjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBRUEsS0FIRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSUEsS0FMRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBTUE7QUFDRiIsIm5hbWVzIjpbIlJlYWN0RE9NIiwiQnJvd3NlclJvdXRlciIsIlByb3ZpZGVyIiwic3RvcmUiLCJRdWVyeUNsaWVudCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJxdWVyeUNsaWVudCIsIkFwcCIsImNyZWF0ZVJvb3QiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIl0sInNvdXJjZXMiOlsibWFpbi5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gXCIuL3N0YXRlcy9zdG9yZS5qc1wiO1xuaW1wb3J0IHsgUXVlcnlDbGllbnQsIFF1ZXJ5Q2xpZW50UHJvdmlkZXIgfSBmcm9tIFwicmVhY3QtcXVlcnlcIjtcbmNvbnN0IHF1ZXJ5Q2xpZW50ID0gbmV3IFF1ZXJ5Q2xpZW50KCk7XG5pbXBvcnQgQXBwIGZyb20gXCIuL0FwcC5qc3hcIjtcblxuUmVhY3RET00uY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikpLnJlbmRlcihcbiAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XG4gICAgICA8QnJvd3NlclJvdXRlcj5cbiAgICAgICAgPEFwcCAvPlxuICAgICAgPC9Ccm93c2VyUm91dGVyPlxuICAgIDwvUXVlcnlDbGllbnRQcm92aWRlcj5cbiAgPC9Qcm92aWRlcj5cbik7XG4iXSwiZmlsZSI6IkM6L1VzZXJzL2x1Y2FjL0RvY3VtZW50cy9HaXRIdWIvRmxpY2tQaWNrcy9jbGllbnQvc3JjL21haW4uanN4In0=