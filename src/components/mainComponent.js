import { useEffect, useState } from "react";
import { useOllamaStreaming } from "../utils";

export default function MainComponent() {
  const [messages, setMessages] = useState([]);
  const { output, loading, send } = useOllamaStreaming();

  function submitMessage(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const chatTurn = formData.get("msg");

    setMessages((prev) => [...prev, chatTurn]);
    e.currentTarget.reset();

    send("llama3.2", [{ role: "user", content: chatTurn }]);
  }

  return (
    <>
      <h1>Test App</h1>
      <form onSubmit={submitMessage}>
        <label>Input</label>
        <textarea name="msg"></textarea>
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <div>
        <h2>LLM test</h2>
        <pre>
          {output}
          {loading && <span>▌</span>}
        </pre>
      </div>
    </>
  );
}
