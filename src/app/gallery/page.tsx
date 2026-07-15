import { GalleryLightbox } from "@/components/GalleryLightbox";
import { PageHero } from "@/components/PageHero";
import { readSiteContent } from "@/lib/storage";

export const metadata = {
  title: "Gallery"
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const content = await readSiteContent();

  return (
    <>
      <PageHero
        title="GALLERY"
        text="Corporate office, operations, recruitment campaigns and brand references from Continental Mercantile Corporation."
      />
      <section className="bg-white py-16">
        <GalleryLightbox items={content.gallery} />
      </section>
    </>
  );
}
