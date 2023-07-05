import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "./logo512.png";
import * as data from "./data.json";

function App() {
  const [fname, setFirstName] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatData, setChatData] = useState(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);


  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom on component mount
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      scrollToBottom(); // Scroll to the bottom after updating the chat history
    }
  }, [chatHistory]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setChatData(data.default);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    fetchData();
  }, []);

  const getChatCompletion = async (query) => {
    setIsProcessing(true);

    try {
      const messages = [
        {
          role: "user",
          content: query,
        },
      ];

      if (chatData) {
        const matchingData = chatData[query.toLowerCase()];
        if (matchingData) {
          setIsProcessing(false);
          return matchingData;
        }
      }

      messages.unshift(...chatHistory);

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages,
          max_tokens: 100,
          model: "gpt-3.5-turbo",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "put ur key here",
          },
        }
      );

      const responseData = response.data.choices[0].message.content;
      if (chatData) {
        if (query.toLowerCase().includes("who is colin casey")) {
          setIsProcessing(false);
          return chatData["colin"];
        } else if (query.toLowerCase().includes("who is bryan hinkle")) {
          setIsProcessing(false);
          return chatData["hinkle"];
        } else if (query.toLowerCase().includes("who's bryan hinkle")) {
          setIsProcessing(false);
          return chatData["hinkle"];
        } else if (query.toLowerCase().includes("who's colin casey")) {
          setIsProcessing(false);
          return chatData["colin"];
        } else if (query.toLowerCase().includes("whos colin casey")) {
          setIsProcessing(false);
          return chatData["colin"];
        } else if (query.toLowerCase().includes("privvy")) {
          setIsProcessing(false);
          return chatData["privvy"];
        } else if (query.toLowerCase().includes("who are you")) {
        setIsProcessing(false);
        return chatData["gpt"];
      } else if (query.toLowerCase().includes("who is steve casey")) {
        setIsProcessing(false);
        return chatData["steve"];
       } else if (query.toLowerCase().includes("what are you")) {
         setIsProcessing(false);
         return chatData["gptt"];
      }
      }

      setIsProcessing(false);
      return responseData;
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      throw error;
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight -
        chatContainerRef.current.clientHeight;
    }, 0);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { role: "user", content: fname };
    const updatedChatHistory = [...chatHistory, userMessage];
    setChatHistory(updatedChatHistory);
    setFirstName(""); // Clear the input field

    try {
      const responseData = await getChatCompletion(fname);

      const botMessage = { role: "assistant", content: responseData };
      const updatedChatHistoryWithResponse = [
        ...updatedChatHistory,
        botMessage,
      ];

      setChatHistory(updatedChatHistoryWithResponse);
      scrollToBottom(); // Scroll to the bottom after adding the new message
    } catch (error) {
      console.error(error);
    }
  };




const styles = {
  container: {
    borderRadius: "5px",
    maxHeight: "100%",
    height: "70vh",
    margin: "0 auto",
    background: "#151414",
    display: "flex",
    flexDirection: "column",
    maxWidth: "950px",
  },
  chatContainer: {
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    maxHeight: "100%",
    height: "60vh",
    margin: "0px",
    background: "#514f62",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
  },

  logo: {
    width: "55px",
    height: "55px",
  },

  overflow: {
    overflowY: "scroll",
  },
  card: {
    borderRadius: "5px",
    paddingLeft: "20px",
    paddingRight: "20px",
    background: "#282727",
  },
  cardContent: {
    marginBottom: "0",
  },
  inputField: {
    marginBottom: "20px",
    padding: "20px"
  },
  inputText: {
    border: "1px solid #e0e0e0",
    padding: "15px",
    borderRadius: "5px",
    width: "calc(100% - 30px)",
    
    marginTop: "15px",
   // height: "3em",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",

  },



  label: {
    fontWeight: "bold",
    color: "white",
  },
  centerAlign: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "15px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  messageContainer: {
    marginBottom: "1px",
  },
  userMessage: {
    fontWeight: "bold",
    color: "white",
    paddingLeft: "40px",
    paddingRight: "40px",
   backgroundColor: "#62606f",
   paddingBottom: "30px",
   paddingTop: "10px",
   margin: "0px",
   
  },
  userName: {
    fontWeight: "bold",
    color: "lightblue",
   backgroundColor: "#62606f",
   paddingLeft: "20px",
   paddingTop: "10px",
   margin: "0px",
  
  },
  botMessage: {
    fontWeight: "bold",
    color: "#25c925",
    background: "#3f3e54",
    paddingLeft: "40px",
    paddingRight: "40px",
    whiteSpace: "pre-wrap", // Add this line to preserve line breaks
    paddingBottom: "30px",
    paddingTop: "5px",
    margin: "0px",
  },

  botName: {
    fontWeight: "bold",
    color: "lightblue",
    background: "#3f3e54",
    paddingLeft: "20px",
    paddingTop: "10px",
    margin: "0px",
    whiteSpace: "pre-wrap", // Add this line to preserve line breaks

  },

  title: {
    color: "white", // Add this line to preserve line breaks

  },

  
  botMessagePre: {
    backgroundColor: "#282727",
    padding: "10px",
    whiteSpace: "pre-wrap",
    color: "#25c925",
    paddingLeft: "20px",
    margin: "0px",
  },
};


return (
    <div className="container" style={styles.container}>
      <div className="card" style={styles.card}>
        <div className="card-content" style={styles.overflow}>
          <header className="center-align" style={styles.centerAlign}>
            <h2 className="font-semibold text-white">
              <img src={logo} alt="Logo" style={styles.logo} />
            </h2>
          </header>
          <div
            id="chat-container"
            style={styles.chatContainer}
            ref={chatContainerRef}
          >
            {chatHistory.map((message, index) => (
              <div key={index} style={styles.messageContainer}>
                {message.role === "user" ? (
                  <div>
                    <p className="user-message" style={styles.userName}>
                      User:
                    </p>
                    <p className="user-message" style={styles.userMessage}>
                      {message.content}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="bot-message" style={styles.botName}>
                      ColinGPT:
                    </p>
                    <p className="bot-message" style={styles.botMessage}>
                      {message.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {isProcessing && (
              <p className="bot-message" style={styles.botMessagePre}>
                ColinGPT is processing your question...
              </p>
            )}
          </div>
        </div>
        </div>
        <br></br>
        <form onSubmit={handleSubmit} className="input-field" style={styles.inputField}>
          <label htmlFor="fname" className="text-white" style={styles.label}>
            Question:
          </label>
          <br />
     
          <textarea
  ref={textareaRef}
  id="question"
  name="question"
  style={{
    ...styles.inputText,
    fontFamily: 'Arial, sans-serif',
    textAlign: 'left', // Add this line to center the text
  }}
  className="border border-gray-300 rounded px-2 py-1 w-full"
  rows="1"
  value={fname}
  onChange={(e) => setFirstName(e.target.value)}
/>   <br /><br />  
          <button
            type="submit"
            style={styles.button}
            className="btn bg-green-500 hover:bg-green-600 text-white"
          >
            <span className="text-800 font-bold">Send to GPT</span>
          </button>
        </form>
   
    </div>
  );
}

export default App;