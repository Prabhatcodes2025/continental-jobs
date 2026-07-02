import { GalleryLightbox } from "@/components/GalleryLightbox";
import { PageHero } from "@/components/PageHero";

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
        <GalleryLightbox />
      </section>
    </>
  );
}
