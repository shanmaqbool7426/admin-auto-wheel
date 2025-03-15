import React, { useEffect, useRef } from 'react';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import Checklist from '@editorjs/checklist';
// import Quote from '@editorjs/quote';
// import Marker from '@editorjs/marker';
// import ImageTool from '@editorjs/image';
// import LinkTool from '@editorjs/link';
// import Embed from '@editorjs/embed';
// import Table from '@editorjs/table';
// import styles from './TextEditor.module.css';
import { ScrollArea } from '@mantine/core';

const Editor = ({ data, onChange }) => {
  // const initialData = {
  //   time: 1635603431943,
  //   blocks: [
  //     {
  //       type: 'header',
  //       data: {
  //         text: 'Your Title...',
  //         level: 2
  //       }
  //     },
  //     {
  //       type: 'paragraph',
  //       data: {
  //         text: 'Your prefilled content here...'
  //       }
  //     },
  //     {
  //       type: 'image',
  //       data: {
  //         url: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1741691697662_blog4.png',
  //         caption: 'Image caption',
  //         withBorder: false,
  //         withBackground: false,
  //         stretched: false
  //       }
  //     }
  //   ],
  //   version: '2.22.2'
  // };
  const initialData = {
    "time": 1741694140725,
    "blocks": [
        {
            "id": "knFBO-x48U",
            "type": "header",
            "data": {
                "text": "aaaaaaaaa",
                "level": 1
            }
        },
        {
            "id": "Wloq4Yj4v6",
            "type": "list",
            "data": {
                "style": "checklist",
                "meta": {},
                "items": [
                    {
                        "content": "helo",
                        "meta": {
                            "checked": false
                        },
                        "items": []
                    },
                    {
                        "content": "helo1",
                        "meta": {
                            "checked": false
                        },
                        "items": []
                    },
                    {
                        "content": "helo2",
                        "meta": {
                            "checked": false
                        },
                        "items": []
                    }
                ]
            }
        }
    ],
    "version": "2.31.0-rc.7"
}


  console.log("data>>>>", data);
  // const editorRef = useRef(null);
  // const ejInstance = useRef(null);
  // const isInitialized = useRef(false);

  useEffect(() => {
    // Don't reinitialize if already exists
    // if (ejInstance.current) {
    //   return;
    // }

    // const editor = new EditorJS({
    //   holder: editorRef.current,
    //   tools: {
    //     header: {
    //       class: Header,
    //       config: {
    //         levels: [1, 2, 3, 4, 5, 6],
    //         defaultLevel: 3
    //       }
    //     },
    //     list: {
    //       class: List,
    //       inlineToolbar: true
    //     },
    //     checklist: {
    //       class: Checklist,
    //       inlineToolbar: true
    //     },
    //     quote: {
    //       class: Quote,
    //       inlineToolbar: true,
    //       shortcut: 'CMD+SHIFT+O',
    //       config: {
    //         quotePlaceholder: 'Enter a quote',
    //         captionPlaceholder: 'Quote\'s author'
    //       }
    //     },
    //     marker: Marker,
    //     image: {
    //       class: ImageTool,
    //       config: {
    //         endpoints: {
    //           byFile: 'http://localhost:5000/api/upload-image-single',
    //         },
    //         uploader: {
    //           uploadByFile: async (file) => {
    //             try {
    //               const formData = new FormData();
    //               formData.append('image', file);

    //               const response = await fetch('http://localhost:5000/api/upload-image-single', {
    //                 method: 'POST',
    //                 body: formData,
    //               });

    //               const result = await response.json();
    //               if (result.success) {
    //                 return {
    //                   success: 1,
    //                   file: {
    //                     url: result.data,
    //                   }
    //                 };
    //               }

    //               return {
    //                 success: 0,
    //                 message: result.message || 'Upload failed'
    //               };

    //             } catch (error) {
    //               console.error('Upload error:', error);
    //               return {
    //                 success: 0,
    //                 message: 'Upload failed'
    //               };
    //             }
    //           }
    //         }
    //       }
    //     },
    //     linkTool: {
    //       class: LinkTool,
    //       config: {
    //         endpoint: '/api/fetchLink'
    //       }
    //     },
    //     embed: {
    //       class: Embed,
    //       config: {
    //         services: {
    //           youtube: true,
    //           coub: true,
    //           imgur: true
    //         }
    //       }
    //     },
    //     table: {
    //       class: Table,
    //       inlineToolbar: true
    //     }
    //   },
    //   data: data, // Use initialData directly here
    //   onReady: () => {
    //     isInitialized.current = true;
    //   },
    //   onChange: async () => {
    //     try {
    //       const savedData = await editor.save();
    //       onChange(savedData);
    //     } catch (error) {
    //       console.error('Save failed:', error);
    //     }
    //   },
    //   placeholder: 'Let\'s write an awesome story!'
    // });

    // ejInstance.current = editor;

    // return () => {
    //   if (ejInstance.current && typeof ejInstance.current.destroy === 'function') {
    //     try {
    //       ejInstance.current.destroy();
    //       ejInstance.current = null;
    //       isInitialized.current = false;
    //     } catch (error) {
    //       console.error('Editor cleanup failed:', error);
    //     }
    //   }
    // };
  }, []); // Empty dependency array since initialData is constant

  return (
    <ScrollArea h={400}>
      {/* <div className={styles.editorWrapper}>
        <div ref={editorRef} className={styles.editor} />
      </div> */}
    </ScrollArea>
  );
};

export default Editor;