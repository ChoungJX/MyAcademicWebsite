# Linfeng Zheng · personal page

Source of <https://me.rabbitravel.xyz/>, a small personal card site. Style inspired by [ZUTOMAYO](https://zutomayo.net/).

Built with [Astro](https://astro.build/) and React. Every page is static HTML; only the draggable windows, the menu and the BibTeX box ship JavaScript (React islands).

## Develop

```bash
yarn install
yarn dev       # http://localhost:4321
yarn build     # static site in out/
yarn preview   # serve out/ locally
yarn run check # type-check the .astro, .ts and .tsx files
yarn favicon   # redraw the site icon after editing scripts/favicon.mjs
yarn og        # redraw the link-preview cards after editing scripts/og.mjs or the icon (needs Chrome)
yarn fonts     # copy the web fonts from Google Fonts into public/fonts/ after editing scripts/fonts.mjs
```

Plain `yarn check` is a Yarn built-in, so the type check needs `yarn run check`. `astro check` doesn't support TypeScript 7 yet, so `typescript` stays on 6. `@emnapi/runtime` is only listed because Yarn 1 doesn't install peer dependencies, and `@astrojs/check` needs this one.

## Edit content

All text lives in `src/data/`:

- `en.ts`, `zh.ts`, `ja.ts`: per-language content (news, publications, education, experience, window text). English and Chinese are written for different readers, so they are not translations of each other; Japanese follows the English version.
- `index.ts`: routes, and the profile sections (`SECTIONS`), whose labels the section headings, the home nav and both menus share.
- `shared.ts`: links, the whoami card, and the CAL paper's shared fields, including its BibTeX. The BibTeX is IEEE Xplore's "Cite This" entry for the Early Access version; copy it again once the paper is in an issue.

Routes: `/` (English), `/zh/` and `/ja/`, each with a `profile/` page and a `news/` page. The profile shows the three newest news items; the News page lists them all by year. Each language also has a 404 page: `/404.html`, `/zh/404/` and `/ja/404/`.

## Deploy

1. `yarn build`
2. Upload `out/`
3. Purge the Cloudflare cache

The server has to answer an address that has no page with the 404 page of its language. With nginx:

```nginx
# In the http block, outside server.
map $uri $me_404_page {
    ~^/zh/   /zh/404/index.html;
    ~^/ja/   /ja/404/index.html;
    default  /404.html;
}

# In the server block.
error_page 404 $me_404_page;

location / {
    try_files $uri $uri/ =404;
}
```

## Where things are

- `src/pages/[...lang]/`: home, profile and News pages for every language
- `src/pages/404.astro` and `src/pages/[lang]/404.astro`: the 404 pages, English and the other two. `yarn dev` shows the English one for every address that has no page.
- `src/layouts/`: `Base.astro` (the `<head>`), `Paper.astro`, the frame the profile and News pages share (menus, contact.exe, header, footer), and `NotFound.astro`, the 404 page
- `src/components/home/`: static parts of the home page. It is drawn at a fixed size (1440×900 on desktop, 390 wide on phones) and scaled to fit the screen.
- `src/components/windows/`: Win95-style windows. Every MAIL link opens contact.exe instead of the mail app (`mail.ts`): the one on the desktop home, or `ContactPopup.tsx` on the other pages. `drag.ts` drags all of them by the title bar.
- `src/components/MenuDrawer.tsx`: burger menu on phones
- `src/components/MenuWindow.tsx`: menu window pinned to the top left of the desktop profile and News pages
- `src/components/MenuLinks.tsx`: the menu items and language links both of them show
- `src/components/ContactLink.tsx` and `LangSwitch.tsx`: the MAIL / GITHUB / ORCID / EAT? links and the language links, used by the menus, the home page and the profile page
- `src/components/profile/`: profile, News and 404 page sections, plus the publication entry with its BibTeX box
- `src/styles/global.css`: all styles and color tokens
- `public/static/images/`: images
- `public/fonts/`: the web fonts, served from the site itself because Google Fonts is blocked in mainland China. `scripts/fonts.mjs` copies them from Google Fonts: every slice Google splits each font into (the browser only downloads the ones a page uses), the `fonts.css` that the pages and `og.mjs` link, and each family's license (`OFL.txt`).
- `scripts/favicon.mjs`: the site icon, the home page's moon drawn on a 16×16 pixel grid. It writes `public/favicon.svg`, `favicon.ico` (16, 32 and 48 px) and `apple-touch-icon.png` (180 px, for iPhone home screens).
- `scripts/og.mjs`: the card a chat app or social site shows when someone shares a link to the site (Open Graph image), one per language. It renders them with the local Chrome into `public/static/images/og-{en,zh,ja}.png`; set `CHROME` if Chrome is not in `/Applications`. Apps that show a square thumbnail crop the middle of the card, so the icon, name and labels stay there.
