import type { ContentBlock } from "@/features/blog/types/blog.types";
import Image from "next/image";

export default function ContentRenderer({
  content,
}: {
  content: ContentBlock[];
}) {
  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p
            key={index}
            className="text-neutral10 max-xs:text-sm/6.25 mb-10 text-justify leading-7.25 max-sm:mb-6"
          >
            {block.data.text}
          </p>
        );

      case "image":
        return (
          <figure key={index} className="my-8">
            <div className="relative w-full">
              <Image
                src={block.data.src}
                alt={block.data.alt}
                width={800}
                height={450}
                className="rounded-lg object-cover mx-auto"
              />
            </div>
            {block.data.caption && (
              <figcaption className="text-neutral8 mt-3 text-center text-sm italic">
                {block.data.caption}
              </figcaption>
            )}
          </figure>
        );

      case "heading":
        const level = block.data.level || 2;
        const HeadingTag = `h${level}` as `h${1 | 2 | 3 | 4 | 5 | 6}`;
        return (
          <HeadingTag
            key={index}
            className="text-neutral12 max-xs:mt-7 max-xs:text-base mt-10 mb-4 text-xl font-semibold max-sm:text-lg"
          >
            {block.data.text}
          </HeadingTag>
        );

      case "bulletList":
        return (
          <ul
            key={index}
            className="text-neutral10 max-xs:text-sm/6.25 mr-6 mb-4 list-disc space-y-2"
          >
            {block.data.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );

      case "orderedList":
        return (
          <ol
            key={index}
            className="text-neutral10 max-xs:text-sm/6.25 mr-6 mb-4 list-decimal space-y-2"
          >
            {block.data.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );

      default:
        return null;
    }
  };

  return <div className="mt-10">{content.map(renderBlock)}</div>;
}
