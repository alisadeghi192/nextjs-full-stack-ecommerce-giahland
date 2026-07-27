"use client";

import type { ContentBlock } from "@/features/blog/types/blog.types";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface TiptapEditorProps {
  name: string;
  value: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  required?: boolean;
}

const convertTiptapToContentBlocks = (doc: any): ContentBlock[] => {
  if (!doc || !doc.content) return [];

  const blocks: ContentBlock[] = [];

  doc.content.forEach((node: any) => {
    switch (node.type) {
      case "paragraph": {
        const text = node.content?.[0]?.text || "";
        if (text.trim()) {
          blocks.push({
            type: "paragraph",
            data: { text },
          });
        }
        break;
      }
      case "heading": {
        blocks.push({
          type: "heading",
          data: {
            text: node.content?.[0]?.text || "",
            level: node.attrs?.level || 2,
          },
        });
        break;
      }
      case "bulletList": {
        const items =
          node.content
            ?.map((item: any) => item.content?.[0]?.content?.[0]?.text || "")
            .filter(Boolean) || [];
        if (items.length) {
          blocks.push({
            type: "bulletList",
            data: { items },
          });
        }
        break;
      }
      case "orderedList": {
        const items =
          node.content
            ?.map((item: any) => item.content?.[0]?.content?.[0]?.text || "")
            .filter(Boolean) || [];
        if (items.length) {
          blocks.push({
            type: "orderedList",
            data: { items },
          });
        }
        break;
      }
      case "image": {
        blocks.push({
          type: "image",
          data: {
            src: node.attrs?.src || "",
            alt: node.attrs?.alt || "",
            caption: node.attrs?.caption || "",
          },
        });
        break;
      }
      default:
        break;
    }
  });

  return blocks;
};

export default function TiptapEditor({
  name,
  value,
  onChange,
  required = false,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: value.length ? value : { type: "doc", content: [] },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const blocks = convertTiptapToContentBlocks(json);
      onChange(blocks);
    },
  });

  useEffect(() => {
    if (editor && value.length) {
      const currentJson = editor.getJSON();
      const currentBlocks = convertTiptapToContentBlocks(currentJson);

      if (JSON.stringify(currentBlocks) !== JSON.stringify(value)) {
        editor.commands.setContent(value);
      }
    }
  }, [value, editor]);

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم عکس نباید بیشتر از ۵ مگابایت باشد.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  if (!editor) {
    return <div className="h-40 animate-pulse rounded-xl bg-gray-100" />;
  }

  return (
    <div className="border-neutral6 focus-within:border-primary rounded-xl border p-3 transition">
      <input
        type="hidden"
        name={name}
        id={name}
        value={JSON.stringify(value)}
        required={required}
      />

      <div className="mb-3 flex flex-wrap gap-1 border-b pb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded px-2 py-1 ${
            editor.isActive("bold")
              ? "bg-primary/20 text-primary"
              : "hover:bg-gray-100"
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded px-2 py-1 ${
            editor.isActive("italic")
              ? "bg-primary/20 text-primary"
              : "hover:bg-gray-100"
          }`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`rounded px-2 py-1 ${
            editor.isActive("heading", { level: 1 })
              ? "bg-primary/20 text-primary"
              : "hover:bg-gray-100"
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`rounded px-2 py-1 ${
            editor.isActive("heading", { level: 2 })
              ? "bg-primary/20 text-primary"
              : "hover:bg-gray-100"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`rounded px-2 py-1 ${
            editor.isActive("heading", { level: 3 })
              ? "bg-primary/20 text-primary"
              : "hover:bg-gray-100"
          }`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={`rounded px-2 py-1 ${
            editor.isActive("heading", { level: 4 })
              ? "bg-primary/20 text-primary"
              : "hover:bg-gray-100"
          }`}
        >
          H4
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded px-2 py-1 ${
            editor.isActive("bulletList")
              ? "bg-primary/20 text-primary"
              : "hover:bg-gray-100"
          }`}
        >
          • لیست
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded px-2 py-1 ${
            editor.isActive("orderedList")
              ? "bg-primary/20 text-primary"
              : "hover:bg-gray-100"
          }`}
        >
          ۱. لیست
        </button>
        <button
          type="button"
          onClick={addImage}
          className="rounded px-2 py-1 hover:bg-gray-100"
        >
          🖼️ عکس
        </button>
      </div>

      <style jsx>{`
        .ProseMirror img {
          max-height: 300px;
          max-width: 100%;
          border-radius: 8px;
          margin: 8px 0;
          object-fit: contain;
        }
      `}</style>

      <EditorContent
        editor={editor}
        className="min-h-50 p-3 focus:outline-none"
      />
    </div>
  );
}
