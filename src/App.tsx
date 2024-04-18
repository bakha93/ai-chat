import "./App.css";
import { Container } from "@/components/common/Container.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { CopilotChat } from "@/components/CopilotChat";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <CopilotChat />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
