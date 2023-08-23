import React, { useState } from 'react';

function DefineWord() {
  const [text, setText] = useState('');
  const [highlight, setHighlight] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!highlight && event.key === 'Enter') {
      setHighlight(true);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault(); // Prevent default paste behavior

    setHighlight(true);
    const pastedText = event.clipboardData.getData('text');
    setText(pastedText);
  };

  return (
    <div className="App">
      <textarea
        rows={4}
        cols={50}
        placeholder="Type something..."
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onChange={(e) => setText(e.target.value)}
        style={{ borderColor: highlight ? 'blue' : 'initial' }}
      />
      <p style={{ color: highlight ? 'blue' : 'initial', backgroundColor: highlight ? 'yellow' : 'initial' }}>
        {text}
      </p>
    </div>
  );
}

export default DefineWord;
