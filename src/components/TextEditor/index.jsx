"use client";
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ScrollArea } from '@mantine/core';
import styles from './TextEditor.module.css';

// Dynamic imports for all editor tools
const EditorJS = dynamic(() => import('@editorjs/editorjs'), { ssr: false });
const Header = dynamic(() => import('@editorjs/header'), { ssr: false });
const List = dynamic(() => import('@editorjs/list'), { ssr: false });
const Checklist = dynamic(() => import('@editorjs/checklist'), { ssr: false });
const Quote = dynamic(() => import('@editorjs/quote'), { ssr: false });
const Marker = dynamic(() => import('@editorjs/marker'), { ssr: false });
const ImageTool = dynamic(() => import('@editorjs/image'), { ssr: false });
const LinkTool = dynamic(() => import('@editorjs/link'), { ssr: false });
const Embed = dynamic(() => import('@editorjs/embed'), { ssr: false });
const Table = dynamic(() => import('@editorjs/table'), { ssr: false });

const Editor = ({ data, onChange }) => {
  const editorRef = useRef(null);
  const ejInstance = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (ejInstance.current) return;

    const initEditor = async () => {
      try {
        const editor = new EditorJS({
          holder: editorRef.current,
          tools: {
            header: {
              class: await Header,
              config: {
                levels: [1, 2, 3, 4, 5, 6],
                defaultLevel: 3
              }
            },
            list: {
              class: await List,
              inlineToolbar: true
            },
            checklist: {
              class: await Checklist,
              inlineToolbar: true
            },
            quote: {
              class: await Quote,
              inlineToolbar: true,
              shortcut: 'CMD+SHIFT+O',
              config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: 'Quote\'s author'
              }
            },
            marker: await Marker,
            image: {
              class: await ImageTool,
              config: {
                endpoints: {
                  byFile: `/api/upload-image-single`,
                },
                uploader: {
                  uploadByFile: async (file) => {
                    try {
                      const formData = new FormData();
                      formData.append('image', file);

                      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload-image-single`, {
                        method: 'POST',
                        body: formData,
                      });

                      const result = await response.json();
                      if (result.success) {
                        return {
                          success: 1,
                          file: {
                            url: result.data,
                          }
                        };
                      }

                      return {
                        success: 0,
                        message: result.message || 'Upload failed'
                      };

                    } catch (error) {
                      console.error('Upload error:', error);
                      return {
                        success: 0,
                        message: 'Upload failed'
                      };
                    }
                  }
                }
              }
            },
            linkTool: {
              class: await LinkTool,
              config: {
                endpoint: '/api/fetchLink'
              }
            },
            embed: {
              class: await Embed,
              config: {
                services: {
                  youtube: true,
                  coub: true,
                  imgur: true
                }
              }
            },
            table: {
              class: await Table,
              inlineToolbar: true
            }
          },
          data: data,
          onReady: () => {
            isInitialized.current = true;
          },
          onChange: async () => {
            try {
              const savedData = await editor.save();
              onChange(savedData);
            } catch (error) {
              console.error('Save failed:', error);
            }
          },
          placeholder: 'Let\'s write an awesome story!'
        });

        ejInstance.current = editor;
      } catch (error) {
        console.error('Editor initialization failed:', error);
      }
    };

    initEditor();

    return () => {
      if (ejInstance.current && typeof ejInstance.current.destroy === 'function') {
        try {
          ejInstance.current.destroy();
          ejInstance.current = null;
          isInitialized.current = false;
        } catch (error) {
          console.error('Editor cleanup failed:', error);
        }
      }
    };
  }, []);

  return (
    <ScrollArea h={400}>
      <div className={styles.editorWrapper}>
        <div ref={editorRef} className={styles.editor} />
      </div>
    </ScrollArea>
  );
};

// Export with no SSR
export default dynamic(() => Promise.resolve(Editor), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
});