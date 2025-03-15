"use client";
import React from 'react';
import { ScrollArea } from '@mantine/core';
import styles from './TextEditor.module.css';

const Editor = ({ data, onChange }) => {
  const editorRef = React.useRef(null);
  const [isEditorReady, setIsEditorReady] = React.useState(false);

  React.useEffect(() => {
    let editor;
    const initEditor = async () => {
      const EditorJS = (await import('@editorjs/editorjs')).default;
      const Header = (await import('@editorjs/header')).default;
      const List = (await import('@editorjs/list')).default;
      const Checklist = (await import('@editorjs/checklist')).default;
      const Quote = (await import('@editorjs/quote')).default;
      const Marker = (await import('@editorjs/marker')).default;
      const ImageTool = (await import('@editorjs/image')).default;
      const LinkTool = (await import('@editorjs/link')).default;
      const Embed = (await import('@editorjs/embed')).default;
      const Table = (await import('@editorjs/table')).default;

      editor = new EditorJS({
        holder: 'editor-container',
        readOnly: false,
        tools: {
          header: { class: Header },
          list: { class: List },
          checklist: { class: Checklist },
          quote: { class: Quote },
          marker: { class: Marker },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: `https://shan.lunashoes.shop/api/upload-image-single`,
              },
              uploader: {
                uploadByFile: async (file) => {
                  try {
                    const formData = new FormData();
                    formData.append('image', file);
                    const response = await fetch(`https://shan.lunashoes.shop/api/upload-image-single`, {
                      method: 'POST',
                      body: formData,
                    });
                    const result = await response.json();
                    return result.success ? {
                      success: 1,
                      file: { url: result.data }
                    } : {
                      success: 0,
                      message: result.message || 'Upload failed'
                    };
                  } catch (error) {
                    return { success: 0, message: 'Upload failed' };
                  }
                }
              }
            }
          },
          linkTool: { class: LinkTool },
          embed: { class: Embed },
          table: { class: Table }
        },
        data: data || {},
        onChange: async () => {
          const savedData = await editor.save();
          onChange(savedData);
        },
        onReady: () => {
          setIsEditorReady(true);
        },
        placeholder: 'Start writing your content here...'
      });

      editorRef.current = editor;
    };

    if (typeof window !== 'undefined') {
      initEditor();
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <ScrollArea h={400}>
      <div className={styles.editorWrapper}>
        <div 
          id="editor-container" 
          className={styles.editor}
          style={{ opacity: isEditorReady ? 1 : 0.5 }}
        />
      </div>
    </ScrollArea>
  );
};

// Export as client component
export default Editor;