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
//   const [customText, setCustomText] = useState<string>(""); // State to store user's custom text

//   const handleTextareaChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setTextToHighlight(event.target.value);
//     setCursorPosition(event.target.selectionStart || 0);
//     console.log(highlights, "h");
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

//   const handleCustomTextChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setCustomText(event.target.value);
//   };

//   const handleTextAdd = () => {
//     const newText = customText; // Use the user's custom text
//     const newPosition = cursorPosition + newText.length;

//     const adjustedHighlights = highlights.map((highlight) => ({
//       start:
//         highlight.start >= cursorPosition
//           ? highlight.start + newText.length
//           : highlight.start,
//       end:
//         highlight.end > cursorPosition
//           ? highlight.end + newText.length
//           : highlight.end,
//     }));

//     const newTextToHighlight =
//       textToHighlight.slice(0, cursorPosition) +
//       newText +
//       textToHighlight.slice(cursorPosition);

//     setPreviousHighlights([...highlights]);
//     setHighlights([...adjustedHighlights]);

//     setTextToHighlight(newTextToHighlight);
//     setCursorPosition(newPosition);
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
//       <input
//         type="text"
//         value={customText}
//         onChange={handleCustomTextChange}
//         placeholder="Enter custom text"
//       />
//       <button onClick={handleTextAdd}>Add Custom Text</button>
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

// import React, { useState } from "react";

// interface Highlight {
//   start: number;
//   end: number;
// }

// function CoordinateTesting() {
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

// export default CoordinateTesting;

import React, { useState } from "react";

interface Highlight {
  start: number;
  end: number;
}

function CoordinateTesting() {
  const initialText = "This is some example text that we want to highlight.";

  const [textToHighlight, setTextToHighlight] = useState<string>(initialText);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [previousHighlights, setPreviousHighlights] = useState<Highlight[]>([]);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedText = event.target.value;

    // Update coordinates for highlights that are on the right side of the cursor
    const updatedHighlights = highlights.map((highlight) => ({
      start: highlight.start > cursorPosition ? highlight.start + 1 : highlight.start,
      end: highlight.end > cursorPosition ? highlight.end + 1 : highlight.end,
    }));

    const updatedPreviousHighlights = previousHighlights.map((highlight) => ({
      start: highlight.start > cursorPosition ? highlight.start + 1 : highlight.start,
      end: highlight.end > cursorPosition ? highlight.end + 1 : highlight.end,
    }));

    setTextToHighlight(updatedText);
    setCursorPosition(event.target.selectionStart || 0);
    setHighlights(updatedHighlights);
    setPreviousHighlights(updatedPreviousHighlights);
  };

  

  const handleCursorPositionChange = (
    event: React.SyntheticEvent<HTMLTextAreaElement>
  ) => {
    setCursorPosition(event.currentTarget.selectionStart);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = event.clipboardData.getData("text");
    setCopiedText(pastedText);

    const newText =
      textToHighlight.slice(0, cursorPosition) +
      pastedText +
      textToHighlight.slice(cursorPosition);

    setTextToHighlight(newText);

    // Update coordinates for highlights that are on the right side of the cursor
    const updatedHighlights = highlights.map((highlight) => ({
      start: highlight.start > cursorPosition ? highlight.start + pastedText.length : highlight.start,
      end: highlight.end > cursorPosition ? highlight.end + pastedText.length : highlight.end,
    }));

    setCursorPosition(cursorPosition + pastedText.length);
    setHighlights(updatedHighlights);

    const newHighlight: Highlight = {
      start: cursorPosition,
      end: cursorPosition + pastedText.length,
    };

    setPreviousHighlights([...highlights]);
    setHighlights([...highlights, newHighlight]);

    event.preventDefault();
  };

  return (
    <div>
      <h1>Text Highlighter</h1>
      <textarea
        value={textToHighlight}
        onChange={handleTextareaChange}
        onSelect={handleCursorPositionChange}
        onPaste={handlePaste}
        rows={5}
        cols={50}
      />
      <p>Cursor Position: {cursorPosition}</p>
      <p>Copied Text: {copiedText}</p>

      <p>Highlighted Text:</p>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {textToHighlight.split("").map((char, index) => {
          const highlightStyle = highlights.some(
            (h) =>
              (index >= h.start && index < h.end) ||
              (previousHighlights.some(
                (prevH) => index >= prevH.start && index < prevH.end
              ) &&
                !highlights.some(
                  (newH) => index >= newH.start && index < newH.end
                ))
          )
            ? { backgroundColor: "yellow", color: "black" }
            : { backgroundColor: "inherit" };
          return (
            <span key={index} style={highlightStyle}>
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default CoordinateTesting;


// import React, { useState } from "react";

// interface Highlight {
//   start: number;
//   end: number;
// }

// function CoordinateTesting() {
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

// const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (event.key === "Backspace" || event.key === "Delete") {
//       const removedTextLength = event.key === "Backspace" ? -1 : 0;
//       const newCursorPosition = cursorPosition + removedTextLength;
  
//       // Remove highlights inside or intersecting with the removed text
//       const filteredHighlights = highlights.filter(
//         (highlight) =>
//           highlight.start < cursorPosition || highlight.end > newCursorPosition
//       );
  
//       // Adjust highlights greater than the current position
//       const adjustedHighlights = filteredHighlights.map((highlight) => {
//         const adjustedStart =
//           highlight.start > cursorPosition
//             ? highlight.start + removedTextLength
//             : highlight.start;
//         const adjustedEnd =
//           highlight.end > cursorPosition
//             ? highlight.end + removedTextLength
//             : highlight.end;
  
//         // If we reach a highlight coordinate, adjust its end to the current pointer
//         if (highlight.start <= newCursorPosition && highlight.end > newCursorPosition) {
//           return {
//             start: adjustedStart,
//             end: newCursorPosition,
//           };
//         }
  
//         return {
//           start: adjustedStart,
//           end: adjustedEnd,
//         };
//       });
  
//       setHighlights(adjustedHighlights);
//       setCursorPosition(newCursorPosition);
//     }
//   };
  

//   const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
//     const pastedText = event.clipboardData.getData("text");
//     setCopiedText(pastedText);

//     const newText =
//       textToHighlight.slice(0, cursorPosition) +
//       pastedText +
//       textToHighlight.slice(cursorPosition);

//     setTextToHighlight(newText);

//     const updatedHighlights = highlights.map((highlight) => ({
//       start: highlight.start > cursorPosition ? highlight.start + pastedText.length : highlight.start,
//       end: highlight.end > cursorPosition ? highlight.end + pastedText.length : highlight.end,
//     }));

//     setCursorPosition(cursorPosition + pastedText.length);
//     setHighlights(updatedHighlights);

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
//         onKeyDown={handleKeyDown}
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

// export default CoordinateTesting;
