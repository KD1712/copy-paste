// import {Editor, EditorState, RichUtils} from 'draft-js';

// class MyEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {editorState: EditorState.createEmpty()};
//     this.onChange = editorState => this.setState({editorState});
//     this.handleKeyCommand = this.handleKeyCommand.bind(this);
//   }

//   handleKeyCommand(command, editorState) {
//     const newState = RichUtils.handleKeyCommand(editorState, command);

//     if (newState) {
//       this.onChange(newState);
//       return 'handled';
//     }

//     return 'not-handled';
//   }

//   render() {
//     return (
//       <Editor
//         editorState={this.state.editorState}
//         handleKeyCommand={this.handleKeyCommand}
//         onChange={this.onChange}
//       />
//     );
//   }
// }

// import React, { useState, useRef } from 'react';

// const RichTextEditor: React.FC = () => {
//   const [content, setContent] = useState<string>('');
//   const editorRef = useRef<HTMLDivElement | null>(null);
//   const isPasting = useRef<boolean>(false);

//   const handleBoldClick = () => {
//     document.execCommand('bold', false, undefined);
//     editorRef.current?.focus();
//   };

//   const handleItalicClick = () => {
//     document.execCommand('italic', false, undefined);
//     editorRef.current?.focus();
//   };

//   const handleUnderlineClick = () => {
//     document.execCommand('underline', false, undefined);
//     editorRef.current?.focus();
//   };

//   const handleTextColorChange = (color: string) => {
//     document.execCommand('foreColor', false, color);
//     editorRef.current?.focus();
//   };

//   const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
//     // Prevent the default paste behavior
//     e.preventDefault();

//     // Get the pasted text
//     const pastedText = e.clipboardData.getData('text/plain');

//     // Wrap the pasted text in <b> tags to make it bold
//     document.execCommand('insertHTML', false, `<b>${pastedText}</b>`);

//     // Set the isPasting flag to true to indicate that we are currently pasting
//     isPasting.current = true;
//   };

//   const handleInput = () => {
//     // Remove the bold formatting when new text is typed directly
//     if (!isPasting.current) {
//       document.execCommand('bold', false, undefined);
//     }
//     isPasting.current = false;

//     // Update the content state
//     setContent(editorRef.current?.innerHTML || '');
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={handleBoldClick}>Bold</button>
//         <button onClick={handleItalicClick}>Italic</button>
//         <button onClick={handleUnderlineClick}>Underline</button>
//         <input
//           type="color"
//           onChange={(e) => handleTextColorChange(e.target.value)}
//         />
//       </div>
//       <div
//         ref={editorRef}
//         contentEditable
//         style={{
//           width: '100%',
//           minHeight: '200px',
//           border: '1px solid #ccc',
//           padding: '5px',
//         }}
//         onInput={handleInput}
//         onPaste={handlePaste}
//       ></div>
//       {/* <div>
//         <strong>Formatted Content:</strong>
//         <div
//           style={{
//             border: '1px solid #ccc',
//             padding: '5px',
//             minHeight: '100px',
//           }}
//           dangerouslySetInnerHTML={{ __html: content }}
//         />
//       </div> */}
//     </div>
//   );
// };

// export default RichTextEditor;
import React, { useState, useRef } from 'react';

const RichTextEditor: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const editorRef = useRef<HTMLDivElement | null>(null);
  const isPasting = useRef<boolean>(false);

  const handleBoldClick = () => {
    insertText('<b></b>');
    editorRef.current?.focus();
  };

  const handleItalicClick = () => {
    insertText('<i></i>');
    editorRef.current?.focus();
  };

  const handleUnderlineClick = () => {
    insertText('<u></u>');
    editorRef.current?.focus();
  };

  const handleTextColorChange = (color: string) => {
    insertText(`<span style="color: ${color};"></span>`);
    editorRef.current?.focus();
  };

  const insertText = (text: string) => {
    if (editorRef.current && document.getSelection) {
      const selection = document.getSelection();
      const range = selection?.getRangeAt(0);
      if (range) {
        const span = document.createElement('span');
        span.innerHTML = text;
        range.deleteContents();
        range.insertNode(span);
        selection?.selectAllChildren(span);
        selection?.collapseToEnd();
        handleInput();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain');
    insertText(pastedText);
  };

  const handleInput = () => {
    setContent(editorRef.current?.innerHTML || '');
  };

  return (
    <div>
      <div>
        <button onClick={handleBoldClick}>Bold</button>
        <button onClick={handleItalicClick}>Italic</button>
        <button onClick={handleUnderlineClick}>Underline</button>
        <input
          type="color"
          onChange={(e) => handleTextColorChange(e.target.value)}
        />
      </div>
      <div
        ref={editorRef}
        contentEditable
        style={{
          width: '100%',
          minHeight: '200px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
        onInput={handleInput}
        onPaste={handlePaste}
      ></div>
      <div>
        <strong>Formatted Content:</strong>
        <div
          style={{
            border: '1px solid #ccc',
            padding: '5px',
            minHeight: '100px',
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
