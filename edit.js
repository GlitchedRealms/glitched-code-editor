import React, { useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';
import { Terminal } from 'xterm';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'xterm/css/xterm.css';
import './editor2.css';

const CodeEditor = () => {
  const terminalRef = useRef(null);
  const [editorValue, setEditorValue] = useState(`function foo(items) {
  var x = "All this is syntax highlighted";
  return x;
}`);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Initialize terminal
    if (terminalRef.current) {
      const term = new Terminal({
        theme: {
          background: '#2e2e2e',
          foreground: '#d6d6d6'
        }
      });
      term.open(terminalRef.current);
      term.writeln('Terminal initialized');
    }
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    
    if (event.dataTransfer.items) {
      const newFiles = [];
      [...event.dataTransfer.items].forEach((item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          newFiles.push(file);
          
          // Read file content
          const reader = new FileReader();
          reader.onload = (e) => {
            setEditorValue(e.target.result);
          };
          reader.readAsText(file);
        }
      });
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="editor-container">
      <div 
        className="drop-zone" 
        onDrop={handleDrop} 
        onDragOver={handleDragOver}
      >
        <p>Drag one or more files to this <i>drop zone</i>.</p>
        {files.length > 0 && (
          <div className="file-list">
            <h4>Files:</h4>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="editor-wrapper">
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={setEditorValue}
          value={editorValue}
          name="editor"
          width="100%"
          height="100%"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
      
      <div className="terminal-wrapper" ref={terminalRef}></div>
    </div>
  );
};

export default CodeEditor;
