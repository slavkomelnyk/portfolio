import NextImage, { type ImageProps } from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { prefix } from "@/config/main";

type Props = Omit<ImageProps, "src" | "fill" | "sizes"> & {
  src?: ImageProps["src"];
  fill?: ImageProps["fill"];
  sizes?: ImageProps["sizes"];
  slot?: string;
  aspect?: "wide" | "square";
};

function withPrefix(src: ImageProps["src"]): ImageProps["src"] {
  if (typeof src !== "string" || !src.startsWith("/") || src.startsWith("//") || !prefix) {
    return src;
  }

  const normalizedPrefix = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
  return `${normalizedPrefix}${src}`;
}

export default function Image({
  src,
  alt,
  fill,
  sizes,
  width,
  height,
  className,
  slot,
  aspect = "wide",
  ...props
}: Props) {
  const useFill = fill ?? (width === undefined || height === undefined);

  return (
    <div
      className={`relative isolate overflow-hidden rounded-2xl bg-muted ${aspect === "square" ? "aspect-square" : "aspect-[16/10]"}`}
      data-image-slot={slot}
    >
      {src ? (
        <NextImage
          src={withPrefix(src)}
          alt={alt}
          fill={useFill}
          sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"}
          width={useFill ? undefined : width}
          height={useFill ? undefined : height}
          className={`${useFill ? "object-cover" : "h-auto max-w-full"} ${className ?? ""}`}
          {...props}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,var(--color-accent),transparent_58%),linear-gradient(135deg,var(--color-muted),var(--color-background))]"
        >
          <div className="absolute -right-12 -top-16 size-48 rounded-full border border-border/70" />
          <div className="absolute -right-5 -top-9 size-32 rounded-full border border-border/70" />
          <div className="grid size-16 place-items-center rounded-2xl border border-border/70 bg-background/75 text-muted-foreground shadow-sm backdrop-blur-sm">
            <ImageIcon className="size-7" strokeWidth={1.5} />
          </div>
        </div>
      )}
    </div>
  );
}
