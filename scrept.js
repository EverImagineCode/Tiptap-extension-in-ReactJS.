// necessary dependencies
import { Node } from '@tiptap/core';

//custom extension
const CustomNode = Node.create({
  name: 'customNode',

  group: 'block',

  content: 'inline*',

// Parse the HTML content 

  parseHTML() {
    return [
      {
        tag: 'div[data-type="custom-node"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'custom-node', ...HTMLAttributes }, 0];
  },

  addCommands() {
    return {
      setCustomNode: () => ({ commands }) => {
        return commands.insertContent({ type: 'customNode' });
      },
    };
  },
});

export { CustomNode };

// ReactJS integration example
import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CustomNode from './CustomNode';

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, CustomNode],
    content: '<p>Hello World!</p>',
  });

  return (
    <>
      <div>
        <button
          onClick={() => editor.chain().focus().setCustomNode().run()}
        >
          Insert Custom Node
        </button>
      </div>
      <EditorContent editor={editor} />
    </>
  );
};

export default TiptapEditor;
