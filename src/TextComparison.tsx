// import React, { useState } from "react";
// import { readText } from "clipboard-polyfill";

// function TextComparison() {
//   const [inputText, setInputText] = useState("");
//   const [result, setResult] = useState<string | null>(null);

//   async function isLikelyCopyPasted(inputText: string): Promise<boolean> {
//     const similarityThreshold = 0.9;
//     const lengthDifferenceThreshold = 10;
//     const nonAlphanumericThreshold = 0.5;

//     const clipText = await readText();

//     function levenshteinDistance(s1: string, s2: string): number {
//       const len1 = s1.length;
//       const len2 = s2.length;
//       const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));

//       for (let i = 0; i <= len1; i++) {
//         for (let j = 0; j <= len2; j++) {
//           if (i === 0) dp[i][j] = j;
//           else if (j === 0) dp[i][j] = i;
//           else {
//             const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
//             dp[i][j] = Math.min(
//               dp[i - 1][j] + 1,
//               dp[i][j - 1] + 1,
//               dp[i - 1][j - 1] + cost
//             );
//           }
//         }
//       }

//       return dp[len1][len2];
//     }

//     const distance = levenshteinDistance(inputText, clipText);
//     const inputLength = inputText.length;
//     const clipboardLength = clipText.length;

//     const similarity = 1 - distance / Math.max(inputLength, clipboardLength);
//     const lengthDifference = Math.abs(inputLength - clipboardLength);
//     const nonAlphanumericInput =
//       (inputText.match(/[^0-9a-zA-Z]/g) || []).length / inputLength;
//     const nonAlphanumericClipboard =
//       (clipText.match(/[^0-9a-zA-Z]/g) || []).length / clipboardLength;

//     if (
//       similarity >= similarityThreshold &&
//       lengthDifference <= lengthDifferenceThreshold &&
//       nonAlphanumericInput <= nonAlphanumericThreshold &&
//       nonAlphanumericClipboard <= nonAlphanumericThreshold
//     ) {
//       return true; // Likely copy-pasted
//     } else {
//       return false; // Likely typed
//     }
//   }

//   const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const newInput = event.target.value;
//     setInputText(newInput);

//     isLikelyCopyPasted(newInput).then((isCopyPasted) => {
//       if (isCopyPasted) {
//         setResult("Likely copy-pasted");
//       } else {
//         setResult("Likely typed");
//       }
//     });
//   };

//   return (
//     <div>
//       <textarea
//         value={inputText}
//         onChange={handleInputChange}
//         placeholder="Enter text here"
//       />
//       {result && <p>{result}</p>}
//     </div>
//   );
// }

// export default TextComparison;
// import React, { useState } from 'react';

// const TextComparison: React.FC = () => {
//   const [typingPatternData, setTypingPatternData] = useState<number[]>([]);
//   const [typingStartTime, setTypingStartTime] = useState<number | null>(null);

//   const handleKeyDown = (): void => {
//     if (!typingStartTime) {
//       setTypingStartTime(performance.now());
//     }
//   };

//   const handleKeyUp = (): void => {
//     if (typingStartTime) {
//       const currentTime = performance.now();
//       const keyPressTime = currentTime - typingStartTime;
//       setTypingPatternData([...typingPatternData, keyPressTime]);
//       setTypingStartTime(currentTime);
//     }
//   };

//   return (
//     <div>
//       <textarea
//         rows={5}
//         cols={50}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//       ></textarea>
//       <p>Typing Pattern Data: {typingPatternData.join(', ')}</p>
//     </div>
//   );
// };

// export default TextComparison;
// import React, { useState } from 'react';

// function TextComparison() {
//   const [pastedContent, setPastedContent] = useState('');
//   const [copiedHistory, setCopiedHistory] = useState<string[]>([]);

//   const handlePaste = (event:React.ClipboardEvent<HTMLTextAreaElement>) => {
//     if(event.clipboardData)
//     {const pastedText = event.clipboardData.getData('text');
//     setPastedContent(pastedText);

//     // Add the pasted text to the history
//     setCopiedHistory([...copiedHistory, pastedText]);}
//   };

//   return (
//     <div>
//       <h1>Paste Example</h1>
//       <textarea
//         placeholder="Paste here..."
//         onPaste={handlePaste}
//         style={{ width: '300px', height: '150px' }}
//       />
//       <div>
//         <h2>Pasted Content:</h2>
//         <p>{pastedContent}</p>
//       </div>
//       <div>
//         <h2>Copied History:</h2>
//         <ul>
//           {copiedHistory.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default TextComparison;

import React, { useState } from "react";

const PastedTextarea = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (e:React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
  };

  const handlePaste = (e:React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    const coloredText = `<span style="background-color: yellow">${pastedText}</span>`;
    document.execCommand("insertHTML", false, coloredText);
  };

  const handleShowText = () => {
    setContent(content.replace(/<span style="background-color: yellow">|<\/span>/g, ""));
  };

  return (
    <div>
      <div
        contentEditable
        onInput={handleContentChange}
        onPaste={handlePaste}
        placeholder="Type or paste here"
        style={{
          width: "100%",
          height: "300px",
          border: "1px solid #ccc",
          padding: "10px",
          fontFamily: "Arial, sans-serif"
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <button onClick={handleShowText}>Submit</button>
      {content && (
        <div>
          <h2>Text:</h2>
          <pre>
            <span
              style={{
                backgroundColor: "yellow",
                display: "inline-block",
                padding: "2px"
              }}
            >
              {content}
            </span>
          </pre>
        </div>
      )}
    </div>
  );
};

export default PastedTextarea;


//bard result
// import React, { useState, useEffect } from 'react';

// function TextComparison() {
//   const [writtenText, setWrittenText] = useState('');
//   const [copiedHistory, setCopiedHistory] = useState<string[]>([]);

//   const highlightCopiedText = (text: string) => {
//     const copiedTexts = copiedHistory.map(text => `<p style={{color: 'yellow'}}>${text}</p>`);
//     return text.replace(/\b(.*?)\b/g, match => copiedTexts.includes(match) ? `<p style={{color: 'yellow'}}>${match}</p>` : match);
//   }

//   useEffect(() => {
//     const allTextElement = document.querySelector('#allText');
//     if (allTextElement) {
//       allTextElement.innerHTML = highlightCopiedText(writtenText);
//     }
//   }, [writtenText]);

//   return (
//     <div>
//       <h1>Paste Example</h1>
//       <textarea
//         placeholder="Write or paste text here..."
//         onChange={(event) => setWrittenText(event.target.value)}
//         style={{ width: '300px', height: '150px' }}
//       />
//       <button onClick={() => setCopiedHistory([...writtenText])}>
//         Copy Text
//       </button>
//       <button onClick={() => {
//         setWrittenText('');
//         setCopiedHistory([]);
//       }}>
//         Reset
//       </button>
//       <div>
//         <h2>All Text:</h2>
//         <p id="allText">{writtenText}</p>
//       </div>
//     </div>
//   );
// }

// export default TextComparison;

// import React, { useState } from 'react';

// function TextComparison() {
//   const [pastedContent, setPastedContent] = useState('');
//   const [copiedHistory, setCopiedHistory] = useState<string[]>([]);
//   const [wholeText, setWholeText] = useState<{ text: string; isCopied: boolean }[]>([]);

//   const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
//     if (event.clipboardData) {
//       const pastedText = event.clipboardData.getData('text');
//       setPastedContent(pastedText);

//       // Add the pasted text to the history
//       setCopiedHistory([...copiedHistory, pastedText]);
//     }
//   };

//   const handleShowText = () => {
//     // Combine pasted content and copied history
//     const combinedText = copiedHistory.length > 0
//       ? copiedHistory.join('\n') + '\n' + pastedContent
//       : pastedContent;

//     // Compare with the copied history and set the whole text
//     const textLines = combinedText.split('\n').map(line => {
//       const isCopied = copiedHistory.includes(line);
//       return { text: line, isCopied };
//     });

//     setWholeText(textLines);
//   };

//   return (
//     <div>
//       <h1>Paste Example</h1>
//       <textarea
//         placeholder="Paste here..."
//         onPaste={handlePaste}
//         style={{ width: '300px', height: '150px' }}
//       />
//       <button onClick={handleShowText}>Submit</button>
//       {wholeText && (
//         <div>
//           <h2>Text:</h2>
//           <pre>
//             {wholeText.map((lineObj, index) => (
//               <span
//                 key={index}
//                 style={{
//                   backgroundColor: lineObj.isCopied ? 'yellow' : 'transparent',
//                 }}
//               >
//                 {lineObj.text}
//                 {'\n'}
//               </span>
//             ))}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TextComparison;

// import React, { useState } from 'react';

// function TextComparison() {
//   const [copiedHistory, setCopiedHistory] = useState<string[]>([]);
//   const [wholeText, setWholeText] = useState('');

//   const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
//     if (event.clipboardData) {
//       const pastedText = event.clipboardData.getData('text');
//       const updatedHistory = [...copiedHistory, pastedText];
//       setCopiedHistory(updatedHistory);

//       // Combine the current written text and copied history
//       const combinedText = wholeText + updatedHistory.join('\n');

//       // Set the combined text
//       setWholeText(combinedText);
//     }
//   };

//   return (
//     <div>
//       <h1>Paste Example</h1>
//       <textarea
//         placeholder="Paste here..."
//         onPaste={handlePaste}
//         onChange={event => setWholeText(event.target.value)}
//         value={wholeText}
//         style={{ width: '300px', height: '150px' }}
//       />
//       <button onClick={() => setCopiedHistory([])}>Clear History</button>
//       <div>
//         <h2>Text:</h2>
//         <pre>
//           {wholeText.split('\n').map((line, index) => (
//             <span
//               key={index}
//               style={{
//                 backgroundColor: copiedHistory.includes(line) ? 'yellow' : 'transparent',
//               }}
//             >
//               {line}
//               {'\n'}
//             </span>
//           ))}
//         </pre>
//       </div>
//     </div>
//   );
// }

// export default TextComparison;




// import React, { useState } from "react";

// function TextComparison() {
//   const [pastedContent, setPastedContent] = useState("");
//   const [copiedHistory, setCopiedHistory] = useState([]);
//   const [typedText, setTypedText] = useState("");

//   const handlePaste = (event) => {
//     const pastedText = event.clipboardData.getData("text");
//     setPastedContent(pastedText);

//     // Add the pasted text to the history
//     setCopiedHistory([...copiedHistory, pastedText]);

//     // Clear the typed text
//     setTypedText("");
//   };

//   const handleInputChange = (event) => {
//     const text = event.target.value;
//     setTypedText(text);

//     // Add the typed text to the history with white color
//     setCopiedHistory([...copiedHistory, text]);
//   };

//   return (
//     <div>
//       <h1>Paste Example</h1>
//       <textarea
//         placeholder="Paste here..."
//         onPaste={handlePaste}
//         onChange={handleInputChange}
//         value={typedText}
//         style={{ width: "300px", height: "150px" }}
//       />
//       <div>
//         <h2>Pasted Content:</h2>
//         <p style={{ color: "yellow" }}>{pastedContent}</p>
//       </div>
//       <div>
//         <h2>Copied History:</h2>
//         <p>
//           {copiedHistory.map((item, index) => (
//             <span
//               key={index}
//               style={{
//                 // backgroundColor: item === pastedContent ? 'yellow' : 'transparent',
//                 color: item === pastedContent ? "yellow" : "white",
//                 marginRight: "5px",
//                 padding: "2px",
//                 display: "inline-block",
//               }}
//             >
//               {item}
//             </span>
//           ))}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default TextComparison;
