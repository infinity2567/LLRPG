import { useEffect, useState } from "react";
import { useOllamaStreaming } from "../utils";
import "./mainComponent.css";

export default function MainComponent() {
  const [messages, setMessages] = useState([]);
  const { output, loading, send } = useOllamaStreaming();

  useEffect(() => {
    if (!loading && output) {
      setMessages((prev) => [...prev, { role: "assistant", content: output }]);
    }
  }, [loading, output]);

  function submitMessage(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userMsg = {
      role: "user",
      content: formData.get("msg") + " (reply using only one sentence)",
    };

    e.currentTarget.reset();

    send("gemma3:4b-it-qat", [...messages, userMsg]);
    setMessages((prev) => [...prev, userMsg]);
  }

  return (
    <>
      <h1>LLM Chat</h1>
      <form onSubmit={submitMessage}>
        <label>Input</label>
        <input name="msg"></input>
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.role + ": " + msg.content}</li>
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
