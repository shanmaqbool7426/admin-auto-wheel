"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { ScrollArea } from '@mantine/core';
import styles from './TextEditor.module.css';

const Editor = ({ data, onChange }) => {
  const editorRef = React.useRef(null);
  const [isReady, setIsReady] = React.useState(false);
  const initializationFlag = React.useRef(false);

  React.useEffect(() => {
    if (initializationFlag.current) {
      return;
    }

    const initEditor = async () => {
      if (initializationFlag.current) return;
      initializationFlag.current = true;

      try {
        const [
          { default: EditorJS },
          { default: Header },
          { default: List },
          { default: Checklist },
          { default: Quote },
          { default: Marker },
          { default: ImageTool },
          { default: LinkTool },
          { default: Embed },
          { default: Table }
        ] = await Promise.all([
          import('@editorjs/editorjs'),
          import('@editorjs/header'),
          import('@editorjs/list'),
          import('@editorjs/checklist'),
          import('@editorjs/quote'),
          import('@editorjs/marker'),
          import('@editorjs/image'),
          import('@editorjs/link'),
          import('@editorjs/embed'),
          import('@editorjs/table')
        ]);

        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

        const editor = new EditorJS({
          holder: editorRef.current,
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
          data: parsedData || {},
          onChange: async () => {
            try {
              const savedData = await editor.save();
              onChange(savedData);
            } catch (error) {
              console.error('Save failed:', error);
            }
          },
          onReady: () => {
            setIsReady(true);
            editorRef.current = editor;
          }
        });
      } catch (error) {
        console.error('Editor initialization failed:', error);
        initializationFlag.current = false;
      }
    };
    

    if (typeof window !== 'undefined') {
      initEditor();
    }

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
        setIsReady(false);
        initializationFlag.current = false;
      }
    };
  }, []);

  return (
    <ScrollArea h={400}>
      <div className={styles.editorWrapper}>
        <div 
          // ref={editorRef}
          id="editorjs"

          className={styles.editor}
          style={{ opacity: isReady ? 1 : 0.5 }}
        />
      </div>
    </ScrollArea>
  );
};

// Export with no SSR and memo
export default dynamic(() => Promise.resolve(React.memo(Editor)), {
  ssr: false,
  loading: () => (
    <ScrollArea h={400}>
      <div className={styles.editorWrapper}>
        <div>Loading editor...</div>
      </div>
    </ScrollArea>
  )
});