import type { ProjectId, ProjectText } from "@/localization/types";

export const projects: Record<ProjectId, ProjectText> = {
  "camera-embed": {
    title: "Camera Embed",
    kind: "Obsidian plugin",
    description:
      "An Obsidian plugin that lets you take photos, compress them and add them to your notes in just a few clicks.",
  },
  "school-ahead-tv": {
    title: "School Ahead TV",
    kind: "Android TV app",
    description:
      "An Android TV app that makes it easier for my younger sister to start her lessons. It supports remote-control navigation, video playback and a custom control menu.",
  },
  "django-shop": {
    title: "Django Shop",
    kind: "Web application",
    description:
      "A simple online shop for kids built with Django, with login, comments and ratings and a Bootstrap interface. It runs in Docker on a Synology NAS server.",
  },
};
