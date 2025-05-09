// useOllama.js
import { useState, useCallback } from "react";
import { Ollama } from "ollama/browser";

export function useOllamaStreaming(host = "http://127.0.0.1:11434") {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = useCallback(
    async (model, messages) => {
      setOutput("");
      setLoading(true);

      try {
        const client = new Ollama({ host });
        const stream = await client.chat({ model, messages, stream: true });

        for await (const part of stream) {
          setOutput((o) => o + part.message.content);
        }
      } catch (err) {
        console.error(err);
        setOutput("[Error: " + err.message + "]");
      } finally {
        setLoading(false);
      }
    },
    [host]
  );

  return { output, loading, send };
}
