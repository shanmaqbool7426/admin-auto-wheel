"use client"
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
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

// Dynamically import EditorJS with no SSR
const EditorJS = dynamic(() => import('@editorjs/editorjs'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

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
  const editorRef = useRef(null);
  const ejInstance = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return; // Don't run on server side
    }

    const initEditor = async () => {
      // Dynamically import tools
      const [
        Header,
        List,
        Checklist,
        Quote,
        Marker,
        ImageTool,
        LinkTool,
        Embed,
        Table
      ] = await Promise.all([
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

      if (!ejInstance.current) {
        const editor = new EditorJS({
          holder: editorRef.current,
          tools: {
            header: { class: Header.default },
            list: { class: List.default },
            checklist: { class: Checklist.default },
            quote: { class: Quote.default },
            marker: { class: Marker.default },
            image: {
              class: ImageTool.default,
              config: {
                // Your image upload config
              }
            },
            linkTool: { class: LinkTool.default },
            embed: { class: Embed.default },
            table: { class: Table.default }
          },
          data: data,
          onChange: async () => {
            const savedData = await editor.save();
            onChange(savedData);
          }
        });

        ejInstance.current = editor;
      }
    };

    initEditor();

    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  return (
    <ScrollArea h={400}>
      {/* <div className={styles.editorWrapper}>
        <div ref={editorRef} className={styles.editor} />
      </div> */}
    </ScrollArea>
  );
};

// Export with no SSR
export default dynamic(() => Promise.resolve(Editor), {
  ssr: false
});