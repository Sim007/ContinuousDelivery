import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { unified } from "@astrojs/markdown-remark";
import { remarkSchuiven } from "./src/plugins/schuiven";
import { remarkLinks } from "./src/plugins/links";

const base = "/ContinuousDelivery";

export default defineConfig({
  site: "https://sim007.github.io",
  base,
  markdown: {
    processor: unified({
      remarkPlugins: [remarkSchuiven, [remarkLinks, { base }]],
    }),
  },
  integrations: [
    starlight({
      title: {
        nl: "Continuous delivery",
        en: "Continuous delivery",
      },
      description:
        "Een model met assen, mijn opinie en scenario's met werkende showcases.",
      defaultLocale: "root",
      locales: {
        root: { label: "Nederlands", lang: "nl" },
        en: { label: "English", lang: "en" },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Sim007/ContinuousDelivery",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/Sim007/ContinuousDelivery/edit/main/",
      },
      customCss: ["./src/styles/custom.css"],
      components: {
        Footer: "./src/components/Footer.astro",
      },
      sidebar: [
        { label: "Home", slug: "index", translations: { en: "Home" } },
        { label: "Het model", slug: "model", translations: { en: "The model" } },
        {
          label: "Scenario's",
          translations: { en: "Scenarios" },
          items: [
            { label: "Overzicht", slug: "scenarios", translations: { en: "Overview" } },
            {
              label: "Subdomein binnen enterprise",
              slug: "scenarios/subdomein-enterprise",
              translations: { en: "Subdomain within an enterprise" },
            },
            { label: "Startup", slug: "scenarios/startup" },
          ],
        },
        {
          label: "Showcase practice",
          items: [
            {
              label: "Overzicht",
              slug: "showcase-practice",
              translations: { en: "Overview" },
            },
            {
              label: "Contract-based testing",
              slug: "showcase-practice/contract-based-testing",
            },
          ],
        },
        {
          label: "Verhaal en presentatie",
          slug: "verhaal-presentatie",
          translations: { en: "Story and presentation" },
        },
        {
          label: "Praatplaat en visuals",
          slug: "visuals",
          translations: { en: "Visuals" },
        },
        {
          label: "Terminologie",
          slug: "terminologie",
          translations: { en: "Terminology" },
        },
        {
          label: "Open punten",
          slug: "open-punten",
          translations: { en: "Open items" },
        },
        { label: "Over mij", slug: "over", translations: { en: "About me" } },
      ],
    }),
  ],
});
