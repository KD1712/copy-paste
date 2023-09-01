// import Highlighter from 'react-highlight-words';
// import TextComparison from "./TextComparison";
import CoordinateTesting from "./components/coordinateTesting";
function App() {
  // const textToHighlight = "This is some example text that we want to highlight.";
  // const searchWords = ["example", "highlight"];

  return (
    <div>
      {/* <TextComparison/> */}
      <CoordinateTesting/>
    </div>
  );
}

export default App;

// import React, { useState } from "react";

// interface Highlight {
//   start: number;
//   end: number;
// }

// function App() {
//   const initialText = "This is some example text that we want to highlight.";

//   const [textToHighlight, setTextToHighlight] = useState<string>(initialText);
//   const [cursorPosition, setCursorPosition] = useState<number>(0);
//   const [copiedText, setCopiedText] = useState<string | null>(null);
//   const [highlights, setHighlights] = useState<Highlight[]>([]);
//   const [previousHighlights, setPreviousHighlights] = useState<Highlight[]>([]);

//   const handleTextareaChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setTextToHighlight(event.target.value);
//     setCursorPosition(event.target.selectionStart || 0);
//   };

//   const handleCursorPositionChange = (
//     event: React.SyntheticEvent<HTMLTextAreaElement>
//   ) => {
//     setCursorPosition(event.currentTarget.selectionStart);
//   };

//   const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
//     const pastedText = event.clipboardData.getData("text");
//     setCopiedText(pastedText);

//     const newText =
//       textToHighlight.slice(0, cursorPosition) +
//       pastedText +
//       textToHighlight.slice(cursorPosition);
//     setTextToHighlight(newText);
//     setCursorPosition(cursorPosition + pastedText.length);

//     const newHighlight: Highlight = {
//       start: cursorPosition,
//       end: cursorPosition + pastedText.length,
//     };

//     setPreviousHighlights([...highlights]);
//     setHighlights([...highlights, newHighlight]);

//     event.preventDefault();
//   };

//   return (
//     <div>
//       <h1>Text Highlighter</h1>
//       <textarea
//         value={textToHighlight}
//         onChange={handleTextareaChange}
//         onSelect={handleCursorPositionChange}
//         onPaste={handlePaste}
//         rows={5}
//         cols={50}
//       />
//       <p>Cursor Position: {cursorPosition}</p>
//       <p>Copied Text: {copiedText}</p>
//       <p>Previous Highlights:</p>

//       <p>Highlighted Text:</p>
//       <div style={{ whiteSpace: "pre-wrap" }}>
//         {textToHighlight.split("").map((char, index) => {
//           const highlightStyle = highlights.some(
//             (h) =>
//               (index >= h.start && index < h.end) ||
//               (previousHighlights.some(
//                 (prevH) => index >= prevH.start && index < prevH.end
//               ) &&
//                 !highlights.some(
//                   (newH) => index >= newH.start && index < newH.end
//                 ))
//           )
//             ? { color: "yellow" }
//             : { color: "inherit" };
//           return (
//             <span key={index} style={highlightStyle}>
//               {char}
//             </span>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;
// // KEEP THIS
// import React, { useState } from "react";

// interface Highlight {
//   start: number;
//   end: number;
// }

// function App() {
//   const initialText = "This is some example text that we want to highlight.";

//   const [textToHighlight, setTextToHighlight] = useState<string>(initialText);
//   const [cursorPosition, setCursorPosition] = useState<number>(0);
//   const [copiedText, setCopiedText] = useState<string | null>(null);
//   const [highlights, setHighlights] = useState<Highlight[]>([]);
//   const [previousHighlights, setPreviousHighlights] = useState<Highlight[]>([]);

//   const handleTextareaChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setTextToHighlight(event.target.value);
//     setCursorPosition(event.target.selectionStart || 0);
//   };

//   const handleCursorPositionChange = (
//     event: React.SyntheticEvent<HTMLTextAreaElement>
//   ) => {
//     setCursorPosition(event.currentTarget.selectionStart);
//   };

//   const shiftHighlights = (startIndex: number, shiftAmount: number) => {
//     const updatedHighlights = highlights.map((highlight) => ({
//       start:
//         highlight.start >= startIndex
//           ? highlight.start + shiftAmount
//           : highlight.start,
//       end:
//         highlight.end >= startIndex
//           ? highlight.end + shiftAmount
//           : highlight.end,
//     }));
//     setHighlights(updatedHighlights);
//     setPreviousHighlights(
//       previousHighlights.map((highlight) => ({
//         start:
//           highlight.start >= startIndex
//             ? highlight.start + shiftAmount
//             : highlight.start,
//         end:
//           highlight.end >= startIndex
//             ? highlight.end + shiftAmount
//             : highlight.end,
//       }))
//     );
//   };

//   const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
//     const pastedText = event.clipboardData.getData("text");
//     setCopiedText(pastedText);

//     const newText =
//       textToHighlight.slice(0, cursorPosition) +
//       pastedText +
//       textToHighlight.slice(cursorPosition);

//     setTextToHighlight(newText);
//     setCursorPosition(cursorPosition + pastedText.length);

//     shiftHighlights(cursorPosition, pastedText.length);

//     const newHighlight: Highlight = {
//       start: cursorPosition,
//       end: cursorPosition + pastedText.length,
//     };

//     setPreviousHighlights([...highlights]);
//     setHighlights([...highlights, newHighlight]);

//     event.preventDefault();
//   };

//   return (
//     <div>
//       <h1>Text Highlighter</h1>
//       <textarea
//         value={textToHighlight}
//         onChange={handleTextareaChange}
//         onSelect={handleCursorPositionChange}
//         onPaste={handlePaste}
//         rows={5}
//         cols={50}
//       />
//       <p>Cursor Position: {cursorPosition}</p>
//       <p>Copied Text: {copiedText}</p>

//       <p>Highlighted Text:</p>
//       <div style={{ whiteSpace: "pre-wrap" }}>
//         {textToHighlight.split("").map((char, index) => {
//           const highlightStyle = highlights.some(
//             (h) =>
//               (index >= h.start && index < h.end) ||
//               (previousHighlights.some(
//                 (prevH) => index >= prevH.start && index < prevH.end
//               ) &&
//                 !highlights.some(
//                   (newH) => index >= newH.start && index < newH.end
//                 ))
//           )
//             ? { backgroundColor: "yellow", color: "black" }
//             : { backgroundColor: "inherit" };
//           return (
//             <span key={index} style={highlightStyle}>
//               {char}
//             </span>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;
