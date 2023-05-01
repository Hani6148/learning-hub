import React, { useRef } from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils } from 'draft-js';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const linkifyPlugin = createLinkifyPlugin();
const imagePlugin = createImagePlugin();

const plugins = [inlineToolbarPlugin, linkifyPlugin, imagePlugin];

const EditorWrapper = ({
  editorState,
  onEditorStateChange,
  createPlugins,
  ...props
}) => {
  const editor = useRef(null);

  const handleKeyCommand = (command, state) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      onEditorStateChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const focusEditor = () => {
    editor.current.focus();
  };

  return (
    <div onClick={focusEditor}>
      <Editor
        {...props}
        ref={editor}
        editorState={editorState}
        onChange={onEditorStateChange}
        handleKeyCommand={handleKeyCommand}
        plugins={createPlugins ? createPlugins(plugins) : plugins}
      />
      <inlineToolbarPlugin.InlineToolbar />
    </div>
  );
};

export default EditorWrapper;
