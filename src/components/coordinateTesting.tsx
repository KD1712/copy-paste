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
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [previousHighlights, setPreviousHighlights] = useState<Highlight[]>([]);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedText = event.target.value;

    // Update coordinates for highlights that are on the right side of the cursor
    const updatedHighlights = highlights.map((highlight) => ({
      start:
        highlight.start > cursorPosition
          ? highlight.start + 1
          : highlight.start,
      end: highlight.end > cursorPosition ? highlight.end + 1 : highlight.end,
    }));

    const updatedPreviousHighlights = previousHighlights.map((highlight) => ({
      start:
        highlight.start > cursorPosition
          ? highlight.start + 1
          : highlight.start,
      end: highlight.end > cursorPosition ? highlight.end + 1 : highlight.end,
    }));
    console.log(updatedHighlights, updatedPreviousHighlights, "onchange");

    const isCursorInsidePreviousHighlight = previousHighlights.some(
      (highlight) => {
        return (
          cursorPosition > highlight.start && cursorPosition < highlight.end
        );
      }
    );

    if (isCursorInsidePreviousHighlight) {
      console.log("hello");
      const newText =
        textToHighlight.slice(0, cursorPosition) +
        updatedText +
        textToHighlight.slice(cursorPosition);

      setTextToHighlight(newText);
      setCursorPosition(event.target.selectionStart || 0);
      const updatedHighlights = highlights.map((highlight) => ({
        // {
        //   start: highlight.start,
        //   //   end: cursorPosition - 1,
        //   // },
        //   // {
        //   //   start: cursorPosition,
        //   end: highlight.end - 1,
        // },
        start:
          highlight.start >= cursorPosition
            ? highlight.start + 1
            : highlight.start,
        end:
          highlight.end >= cursorPosition ? highlight.end + 1 : highlight.end,
      }));

      // const updatedPreviousHighlights = previousHighlights.map((highlight) => ({
      //   start:
      //     highlight.start >= cursorPosition
      //       ? highlight.start + 1
      //       : highlight.start,
      //   end:
      //     highlight.end >= cursorPosition ? highlight.end + 1 : highlight.end,
      // }));
      setTextToHighlight(updatedText);
      setCursorPosition(event.target.selectionStart || 0);

      setHighlights(updatedHighlights);
      // setPreviousHighlights(updatedPreviousHighlights);
    }
    setTextToHighlight(updatedText);

    setCursorPosition(event.target.selectionStart || 0);
    setHighlights(updatedHighlights);
    setPreviousHighlights(updatedPreviousHighlights);
    console.log("handelChange");
  };

  const handleCursorPositionChange = (
    event: React.SyntheticEvent<HTMLTextAreaElement>
  ) => {
    const currentSelectionStart = event.currentTarget.selectionStart || 0;
    const currentSelectionEnd = event.currentTarget.selectionEnd || 0;
    setSelectionStart(currentSelectionStart);
    setSelectionEnd(currentSelectionEnd);
    setCursorPosition(currentSelectionStart);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = event.clipboardData.getData("text");
    setCopiedText(pastedText);

    const newText =
      textToHighlight.slice(0, cursorPosition) +
      pastedText +
      textToHighlight.slice(cursorPosition);

    setTextToHighlight(newText);

    const pastedTextLength = pastedText.length;

    // Update coordinates for highlights that are on the right side of the cursor
    const updatedHighlights = highlights.map((highlight) => ({
      start:
        highlight.start > cursorPosition
          ? highlight.start + pastedTextLength
          : highlight.start,
      end:
        highlight.end > cursorPosition
          ? highlight.end + pastedTextLength
          : highlight.end,
    }));

    setCursorPosition(cursorPosition + pastedTextLength);
    setHighlights(updatedHighlights);

    const newHighlight: Highlight = {
      start: cursorPosition,
      end: cursorPosition + pastedTextLength,
    };

    setPreviousHighlights([...highlights]);
    setHighlights([...highlights, newHighlight]);

    event.preventDefault();
  };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (event.key === "Backspace" || event.key === "Delete") {
  //     const selectionLength = selectionEnd - selectionStart;
  //     if (selectionLength === 0) {
  //       const updatedText =
  //         // textToHighlight.slice(0, selectionStart) +
  //         // textToHighlight.slice(selectionStart + 1);
  //         textToHighlight.slice(0, cursorPosition) +
  //         textToHighlight.slice(cursorPosition);

  //       setTextToHighlight(updatedText);

  //       const updatedHighlights = highlights
  //         .map((highlight) => {
  //           if (
  //             (highlight.start <= cursorPosition &&
  //               highlight.end <= cursorPosition) ||
  //             (highlight.start >= cursorPosition &&
  //               highlight.end >= cursorPosition)
  //           ) {
  //             return highlight; // Preserve non-affected highlights
  //           } else if (
  //             highlight.start < cursorPosition &&
  //             highlight.end > cursorPosition
  //           ) {
  //             // Highlight spans across cursor, split into two highlights
  //             return [
  //               {
  //                 start: highlight.start,
  //                 end: cursorPosition - 1,
  //               },
  //               {
  //                 start: cursorPosition,
  //                 end: highlight.end - 1,
  //               },
  //             ];
  //           } else if (highlight.start > cursorPosition) {
  //             return {
  //               start: highlight.start - 1,
  //               end: highlight.end - 1,
  //             };
  //           } else {
  //             return highlight;
  //           }
  //         })
  //         .flat();

  //       const updatedPreviousHighlights = previousHighlights
  //         .map((highlight) => {
  //           if (
  //             (highlight.start <= cursorPosition &&
  //               highlight.end <= cursorPosition) ||
  //             (highlight.start >= cursorPosition &&
  //               highlight.end >= cursorPosition)
  //           ) {
  //             return highlight; // Preserve non-affected highlights
  //           } else if (
  //             highlight.start < cursorPosition &&
  //             highlight.end > cursorPosition
  //           ) {
  //             // Highlight spans across cursor, split into two highlights
  //             return [
  //               {
  //                 start: highlight.start,
  //                 end: cursorPosition - 1,
  //               },
  //               {
  //                 start: cursorPosition,
  //                 end: highlight.end - 1,
  //               },
  //             ];
  //           } else if (highlight.start > cursorPosition) {
  //             return {
  //               start: highlight.start - 1,
  //               end: highlight.end - 1,
  //             };
  //           } else {
  //             return highlight;
  //           }
  //         })
  //         .flat();

  //       setHighlights(updatedHighlights);
  //       setPreviousHighlights(updatedPreviousHighlights);
  //       // setCursorPosition(cursorPosition - 1);
  //       console.log("keydown");
  //     } else {
  //       const updatedText =
  //         textToHighlight.slice(0, selectionStart) +
  //         textToHighlight.slice(selectionEnd);
  //       // textToHighlight.slice(0, cursorPosition) +
  //       // textToHighlight.slice(cursorPosition);
  //       setTextToHighlight(updatedText);

  //       const updatedHighlights = highlights
  //         .map((highlight) => {
  //           let newStart = highlight.start;
  //           let newEnd = highlight.end;

  //           if (highlight.start > selectionEnd) {
  //             newStart -= selectionLength + 1;
  //             newEnd -= selectionLength + 1;
  //           } else if (highlight.start > selectionStart) {
  //             newStart = selectionStart + 1;
  //             newEnd -= selectionLength + 1;
  //           }

  //           return {
  //             start: newStart,
  //             end: newEnd,
  //           };
  //         })
  //         .filter((highlight) => highlight.start !== highlight.end);

  //       const updatedPreviousHighlights = previousHighlights
  //         .map((highlight) => {
  //           let newStart = highlight.start;
  //           let newEnd = highlight.end;

  //           if (highlight.start > selectionEnd) {
  //             newStart -= selectionLength + 1;
  //             newEnd -= selectionLength + 1;
  //           } else if (highlight.start > selectionStart) {
  //             newStart = selectionStart + 1;
  //             newEnd -= selectionLength + 1;
  //           }

  //           return {
  //             start: newStart,
  //             end: newEnd,
  //           };
  //         })
  //         .filter((highlight) => highlight.start !== highlight.end);

  //       setHighlights(updatedHighlights);
  //       setPreviousHighlights(updatedPreviousHighlights);
  //       console.log("keydown");
  //     }
  //   }
  // };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      const selectionLength = selectionEnd - selectionStart;
      if (selectionLength === 0) {
        const updatedText =
          textToHighlight.slice(0, cursorPosition - 1) +
          textToHighlight.slice(cursorPosition);

        setTextToHighlight(updatedText);

        const isCursorInsidePreviousHighlight = previousHighlights.some(
          (highlight) =>
            cursorPosition > highlight.start && cursorPosition <= highlight.end
        );
        console.log("inside isCursorInsidePreviousHighlight");

        const updatedHighlights = highlights
          .map((highlight) => {
            if (
              highlight.start < cursorPosition &&
              highlight.end < cursorPosition
              //  ||
              //   (highlight.start >= cursorPosition &&
              //     highlight.end >= cursorPosition)
            ) {
              return highlight; // Preserve non-affected highlights
            } else if (
              highlight.start < cursorPosition &&
              highlight.end >= cursorPosition
              //isCursorInsidePreviousHighlight
            ) {
              // Highlight spans across cursor, split into two highlights
              return [
                {
                  start: highlight.start - 1,
                  //   end: cursorPosition - 1,
                  // },
                  // {
                  //   start: cursorPosition,
                  end: highlight.end - 2,
                },
              ];
            } else if (
              highlight.start > cursorPosition &&
              highlight.end > cursorPosition
            ) {
              return {
                start: highlight.start - 2,
                end: highlight.end - 2,
              };
            } else {
              return highlight;
            }
          })
          .flat();

        const updatedPreviousHighlights = previousHighlights
          .map((highlight) => {
            if (
              highlight.start < cursorPosition &&
              highlight.end < cursorPosition
              //    ||
              // (highlight.start >= cursorPosition &&
              //   highlight.end >= cursorPosition)
            ) {
              return highlight; // Preserve non-affected highlights
            } else if (isCursorInsidePreviousHighlight) {
              return [
                {
                  start: highlight.start - 1,
                  //   end: cursorPosition - 1,
                  // },
                  // {
                  //   start: cursorPosition,
                  end: highlight.end - 2,
                },
              ];
            }
            // else if (
            //   highlight.start < cursorPosition &&
            //   highlight.end > cursorPosition
            // ) {
            //   // Highlight spans across cursor, split into two highlights
            //   return [
            //     {
            //       start: highlight.start,
            //       end: cursorPosition - 1,
            //     },
            //     {
            //       start: cursorPosition,
            //       end: highlight.end - 1,
            //     },
            //   ];
            // }
            else if (
              highlight.start > cursorPosition &&
              highlight.end > cursorPosition
            ) {
              return {
                start: highlight.start - 2,
                end: highlight.end - 2,
              };
            } else {
              return highlight;
            }
          })
          .flat();
        console.log(updatedHighlights, updatedPreviousHighlights, "onkeydown");
        // if (isCursorInsidePreviousHighlight) {
        //   // Reduce the end coordinate of the previous highlight
        //   const updatedPreviousHighlightsWithCursor =
        //     updatedPreviousHighlights.map((highlight) => {
        //       if (
        //         cursorPosition >= highlight.start &&
        //         cursorPosition < highlight.end
        //       ) {
        //         return {
        //           start: highlight.start,
        //           end: highlight.end - 1,
        //         };
        //       }
        //       return highlight;
        //     });

        //   // Reduce the coordinates of highlights greater than cursorPosition
        //   const updatedHighlightsWithCursor =
        //     updatedPreviousHighlightsWithCursor.map((highlight) => ({
        //       start:
        //         highlight.start > cursorPosition
        //           ? highlight.start - 1
        //           : highlight.start,
        //       end:
        //         highlight.end > cursorPosition
        //           ? highlight.end - 1
        //           : highlight.end,
        //     }));

        setPreviousHighlights(updatedPreviousHighlights);
        setHighlights(updatedHighlights);
        //   // You might need to update textToHighlight here too
        // } else {
        //   setPreviousHighlights(updatedPreviousHighlights);
        //   setHighlights(updatedHighlights);
        // }

        // setCursorPosition(cursorPosition - 1);
        console.log("keydown1");
      } else {
        const updatedText =
          textToHighlight.slice(0, selectionStart) +
          textToHighlight.slice(selectionEnd);
        // textToHighlight.slice(0, cursorPosition) +
        // textToHighlight.slice(cursorPosition);
        setTextToHighlight(updatedText);

        const updatedHighlights = highlights
          .map((highlight) => {
            let newStart = highlight.start;
            let newEnd = highlight.end;

            if (highlight.start > selectionEnd) {
              newStart -= selectionLength + 1;
              newEnd -= selectionLength + 1;
            } else if (highlight.start > selectionStart) {
              newStart = selectionStart + 1;
              newEnd -= selectionLength + 1;
            }

            return {
              start: newStart,
              end: newEnd,
            };
          })
          .filter((highlight) => highlight.start !== highlight.end);

        const updatedPreviousHighlights = previousHighlights
          .map((highlight) => {
            let newStart = highlight.start;
            let newEnd = highlight.end;

            if (highlight.start > selectionEnd) {
              newStart -= selectionLength + 1;
              newEnd -= selectionLength + 1;
            } else if (highlight.start > selectionStart) {
              newStart = selectionStart + 1;
              newEnd -= selectionLength + 1;
            }

            return {
              start: newStart,
              end: newEnd,
            };
          })
          .filter((highlight) => highlight.start !== highlight.end);

        setHighlights(updatedHighlights);
        setPreviousHighlights(updatedPreviousHighlights);
        console.log("keydown");
      }
    }
  };

  return (
    <div>
      <h1>Text Highlighter</h1>
      <textarea
        value={textToHighlight}
        onChange={handleTextareaChange}
        onSelect={handleCursorPositionChange}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
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
