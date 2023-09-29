// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// const Quill = () => {
//   const [editorHtml, setEditorHtml] = useState('');

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const text = e.clipboardData.getData('text/plain');
//     const highlightedText = `<span class="highlighted">${text}</span>`;
//     document.execCommand('insertHTML', false, highlightedText);
//   };

//   const handleKeyDown = (e) => {
//     // You can add logic to handle typed text here if needed
//   };

//   const modules = {
//     clipboard: {
//       matchers: [
//         ['text/plain', handlePaste],
//       ],
//     },
//     keyboard: {
//       bindings: {
//         // Add custom key bindings here if needed
//       },
//     },
//   };

//   return (
//     <div className="custom-editor">
//       <ReactQuill
//         theme="snow"
//         modules={modules}
//         value={editorHtml}
//         onChange={setEditorHtml}
//         onKeyDown={handleKeyDown}
//       />
//       <style>
//         {`
//           .highlighted {
//             background-color: yellow; // Customize the highlight color
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Quill;
// import React, { useState } from "react";
// import ReactQuill from "react-quill";

// import "react-quill/dist/quill.snow.css";

// function Quill() {
//   const [value, setValue] = useState("");

//   return <ReactQuill theme="snow" value={value} onChange={setValue} />;
// }
// export default Quill;
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuillEditor: React.FC = () => {
  const [delta, setDelta] = useState<any>([]); // State to hold the Delta

  // Function to handle Quill's 'onChange' event
  const handleQuillChange = (content: string, delta: any, source: any, editor: any) => {
    setDelta(editor.getContents());
    console.log(editor.getContents());
  };

  // Function to handle paste events
  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    // Access the clipboard data from the event
    const clipboardData = event.clipboardData || (window as any).clipboardData;

    if (clipboardData) {
      // Get the pasted content as plain text
      const pastedText = clipboardData.getData("text/plain");

      // Create a Delta with the pasted text and insert it into the editor
      const newDelta = [{ insert: pastedText }];
      setDelta((prevDelta: any) => [...prevDelta, ...newDelta]);
    }
  };

  return (
    <div >
      <h1>Quill Editor</h1>
      <ReactQuill
        value={delta}
        onChange={handleQuillChange}
        onPas
      />
    </div>
  );
};

export default QuillEditor;
