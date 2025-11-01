import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Clipboard from "expo-clipboard";
import { DevToolsBubble } from "react-native-react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const onCopy = async (text: string) => {
    try {
      // For Expo:
      await Clipboard.setStringAsync(text);
      // OR for React Native CLI:
      // await Clipboard.setString(text);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <DevToolsBubble
        onCopy={onCopy}
        queryClient={queryClient}
        bubbleStyle={{
          left: 0,
        }}
      />
    </QueryClientProvider>
  );
}
