import { createRoot } from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import "./index.css"
import App from "./App.tsx"
import { persistor, store } from "./redux/stores/store.ts"
import { PersistGate } from "redux-persist/integration/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
