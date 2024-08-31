import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/sonner.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { toastStyles } from "./toastConfig.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster
            position="top-center"
            visibleToasts={1}
            duration={3000}
            toastOptions={toastStyles}
          />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </>
);
