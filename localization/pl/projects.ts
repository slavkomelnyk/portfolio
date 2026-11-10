import type { ProjectId, ProjectText } from "@/localization/types";

export const projects: Record<ProjectId, ProjectText> = {
  "camera-embed": {
    title: "Camera Embed",
    kind: "Wtyczka Obsidiana",
    description:
      "Wtyczka do Obsidiana, która umożliwia robienie zdjęć i dodawanie ich do notatek w kilku kliknięciach i kompresowanie ich.",
  },
  "school-ahead-tv": {
    title: "School Ahead TV",
    kind: "Aplikacja Android TV",
    description:
      "Aplikacja na Android TV, która ułatwia mojej młodszej siostrze uruchamianie lekcji. Obsługuje nawigację pilotem, odtwarzanie wideo i własne menu sterowania video.",
  },
  "django-shop": {
    title: "Sklep w Django",
    kind: "Aplikacja webowa",
    description:
      "Prosty sklep internetowy dla dzieci stworzony w Django, wyposażony w system logowania, komentarzy i ocen oraz interfejs w Bootstrapie. Uruchamiany w Dockerze na serwerze Synology NAS.",
  },
};
