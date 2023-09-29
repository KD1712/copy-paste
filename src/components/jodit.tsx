import { useState, useRef, useMemo } from "react";
// import JoditEditor from "jodit-react";
import JoditEditor, { IJoditEditorProps } from "jodit-react";

const MyEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const placeholder = "test";
  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || "Start typing...",
  }), [placeholder]);
  

  // const config: IJoditEditorProps['config'] = {
  //   defaultTimeout: 5000, // Adjust as needed
  //   // Add other properties you need here
  //   defaultActionOnPaste: 'insert_as_text',
  //   defaultActionOnEnter: 'insert_break',
  //   buttons: 'bold,italic,underline,|,align,ul,ol,|,font,fontsize,color',
  //   defaultForeColor: 'red', // Set your desired default text color here
  // };
  const handlePaste = () => {
    console.log("paste");
  };
  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
        // config={{ events: { onpaste: handlePaste } }}
        config={config}
      />

      {content}
    </div>
  );
};
export default MyEditor;
