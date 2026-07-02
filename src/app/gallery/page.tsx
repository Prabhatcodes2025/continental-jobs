import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { galleryItems } from "@/lib/site-data";

export const metadata = {
  title: "Gallery"
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        text="Corporate office, operations, recruitment campaigns and brand references from Continental Mercantile Corporation."
      />
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 lg:px-8">
          {galleryItems.map((item) => (
            <article key={item.src} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <Image src={item.src} alt={item.title} width={900} height={900} className="h-[420px] w-full object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-black">{item.title}</h2>
                <p className="mt-2 text-slate-600">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
