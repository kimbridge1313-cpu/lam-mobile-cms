import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

const defaultContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text: "開始撰寫文章內容。" }]
    }
  ]
};

function ToolbarButton({ active, children, onClick, disabled = false }) {
  return (
    <button
      type="button"
      className={active ? "tiptap-toolbar-button active" : "tiptap-toolbar-button"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default function TiptapEditor({ value, onChange, editable = true }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true
      }),
      Image.configure({
        inline: false,
        allowBase64: false
      })
    ],
    content: value || defaultContent,
    editable,
    editorProps: {
      attributes: {
        class: editable ? "tiptap-content editable" : "tiptap-content readonly"
      }
    },
    onUpdate({ editor: currentEditor }) {
      if (editable && onChange) {
        onChange(currentEditor.getJSON());
      }
    }
  });

  useEffect(() => {
    if (!editor || !value) return;

    const current = JSON.stringify(editor.getJSON());
    const next = JSON.stringify(value);

    if (current !== next) {
      editor.commands.setContent(value, false);
    }
  }, [editor, value]);

  if (!editor) return null;

  if (!editable) {
    return <EditorContent editor={editor} />;
  }

  function setLink() {
    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("輸入連結網址", previousUrl);

    if (url === null) return;

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function addImage() {
    const url = window.prompt("輸入圖片網址");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }

  return (
    <section className="tiptap-editor-shell">
      <div className="tiptap-toolbar" aria-label="文章編輯工具列">
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          粗體
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          斜體
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          項目
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          編號
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          引用
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("link")} onClick={setLink}>
          連結
        </ToolbarButton>
        <ToolbarButton onClick={addImage}>圖片</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          復原
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          重做
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </section>
  );
}
