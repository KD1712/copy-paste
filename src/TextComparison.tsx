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

// //KEEP THIS ONE
// import React, { useState } from "react";

// const TextComparison: React.FC = () => {
//   const [text, setText] = useState("");
//   const [pastedText, setPastedText] = useState("");

//   const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setText(event.target.value);
//   };
// //
//   const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
//     event.preventDefault();
//     const pasted = event.clipboardData.getData("text");
//     setPastedText(pasted);
//     const updatedText = text + pasted;
//     setText(updatedText);
//   };

//   const renderHighlightedText = () => {
//     const parts = text.split(pastedText);
//     return parts.map((part, index) => (
//       <span key={index}>
//         {index > 0 && <span style={{ color: "yellow" }}>{pastedText}</span>}
//         {part}
//       </span>
//     ));
//   };

//   return (
//     <div>
//       <textarea
//         rows={5}
//         cols={50}
//         value={text}
//         onChange={handleTextChange}
//         onPaste={handlePaste}
//         placeholder="Type or paste something..."
//       />
//       <div>
//         <h2>Text from TextArea:</h2>
//         <p>{renderHighlightedText()}</p>
//       </div>
//     </div>
//   );
// };

// // export default TextComparison;
import React, { useState, useRef } from "react";

const TextComparison: React.FC = () => {
  const [text, setText] = useState("");
  const [pastedText, setPastedText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text");
    setPastedText(pasted);

    const textarea = textareaRef.current;
    if (textarea) {
      const selectionStart = textarea.selectionStart || 0;
      const selectionEnd = textarea.selectionEnd || 0;
      const updatedText =
        text.substring(0, selectionStart) +
        pasted +
        text.substring(selectionEnd);
      setText(updatedText);
      textarea.focus();
      textarea.setSelectionRange(
        selectionStart + pasted.length,
        selectionStart + pasted.length
      );
    }
  };

  const renderHighlightedText = () => {
    const parts = text.split(pastedText);
    return parts.map((part, index) => (
      <span key={index}>
        {index > 0 && <span style={{ color: "yellow" }}>{pastedText}</span>}
        {part}
      </span>
    ));
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        rows={5}
        cols={50}
        value={text}
        onChange={handleTextChange}
        onPaste={handlePaste}
        placeholder="Type or paste something..."
      />
      <div>
        <h2>Text from TextArea:</h2>
        <p>{renderHighlightedText()}</p>
      </div>
    </div>
  );
};

export default TextComparison;





