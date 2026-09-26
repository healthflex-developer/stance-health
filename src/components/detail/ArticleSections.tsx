"use client";

type Section = { type?: string; content?: string; items?: { text?: string }[] };

export default function ArticleSections({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => {
        if (section.type === "heading") {
          return <h2 key={index} data-admin-list="sections" data-admin-list-index={index} data-admin-list-field="content" className="text-xl font-bold text-[#cdfe71] mt-10 mb-3">{section.content}</h2>;
        }
        if (section.type === "tip") {
          return <div key={index} data-admin-list="sections" data-admin-list-index={index} className="my-6 bg-[#cdfe71]/5 border border-[#cdfe71]/20 rounded-xl p-4 text-white/80 text-sm">{section.content}</div>;
        }
        if (section.type === "list") {
          return (
            <ul key={index} data-admin-list="sections" data-admin-list-index={index} className="space-y-3 my-4">
              {(section.items ?? []).map((item, itemIndex) => (
                <li key={itemIndex} data-admin-list-child="items" data-admin-list-child-index={itemIndex} data-admin-list-child-field="text" className="text-white/70">{item.text}</li>
              ))}
            </ul>
          );
        }
        return <p key={index} data-admin-list="sections" data-admin-list-index={index} data-admin-list-field="content" className="text-white/70 leading-relaxed">{section.content}</p>;
      })}
    </div>
  );
}
