# SIVIM Website

A Next.js website exported as static HTML. Production files are generated in `out/`; the deployed site needs no Node.js server or database.

**Recommended deployment:** keep the source in GitHub and host it on Vercel with a plan that permits commercial use.

## 1. Run locally

Use Node.js **24.x**. From the existing repository root:

```powershell
cd 'New Sivim'
npm.cmd ci
if (!(Test-Path -LiteralPath '.env.local')) {
    Copy-Item -LiteralPath '.env.example' -Destination '.env.local'
}
```

Review `.env.local`, then start the website:

```powershell
npm.cmd run dev
```

Open **http://127.0.0.1:3005**. Stop it with `Ctrl+C`.

Run commands from the folder containing `package.json`. On Windows, `npm.cmd` also avoids PowerShell restrictions on `npm.ps1`. Python 3 is needed only for the local static-preview command below.

## 2. Configure public business details

Use [.env.example](.env.example) as the variable reference. Keep `.env.local` on your computer; enter hosting values in Vercel's environment settings. When entering individual Vercel fields, omit the surrounding `.env` quotes.

| Setting                | What to configure                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Company and contact    | Company name, phone, email, address and WhatsApp number. Include the country code in the WhatsApp number, using digits only.                         |
| `NEXT_PUBLIC_SITE_URL` | The final HTTPS origin, such as `https://sivim.in`. Use the chosen production hostname without a path.                                               |
| Branding and hours     | Logo paths under `/assets/`, description, business hours and opening days.                                                                           |
| About figures          | Set all three project/experience totals. Keep `NEXT_PUBLIC_STATS_VERIFIED=false` until the owner verifies them.                                      |
| Social profiles        | Use the correct platform URL for Instagram, Facebook and YouTube. Leave an unconfirmed profile empty.                                                |
| Google Maps            | Use a directions URL for `NEXT_PUBLIC_MAP_URL`. For `NEXT_PUBLIC_MAP_EMBED_URL`, copy only the HTTPS `src` from Google Maps **Share > Embed a map**. |

A regular Maps place link is not an embed URL. An Instagram URL will not work in the Facebook or YouTube fields. Review the example values before using them in production.

All `NEXT_PUBLIC_` values are public and included during the build. Never put passwords, private keys or API secrets in them. Changes require a development restart or a new production deployment. [Environment-variable guidance](https://vercel.com/docs/environment-variables)

**Enquiries:** the contact form and product buttons prepare WhatsApp messages for visitors to review and send. They do not save submissions, send owner emails or write to Google Sheets.

## 3. Check the production export

With `.env.local` configured, run:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run typecheck
npm.cmd run preview
```

Stop the development server first because preview also uses port **3005**. The build generates Next.js route types before the standalone TypeScript check.

Preview the exported site at **http://127.0.0.1:3005**. This serves the same `out/` files used by a static host; opening HTML files directly from File Explorer is not a deployment test.

## 4. Keep the source in GitHub

Push the reviewed application source and `package-lock.json` to your GitHub repository. Review the staged changes before committing, especially if the repository contains other work.

Keep these application folders and files:

- `app/`, `components/`, `lib/`, `assets/`, `public/` and `catlogs/`.
- `package.json`, `package-lock.json`, Next.js/TypeScript/ESLint configuration, `.gitignore`, `.env.example` and this README.

The application `.gitignore` excludes `.env.local`, `node_modules/`, `.next/`, `out/` and TypeScript build caches. Do not upload those as source or commit secrets.

There are two supported repository layouts:

| Repository layout                                                         | Vercel Root Directory    |
| ------------------------------------------------------------------------- | ------------------------ |
| Existing repository containing this application folder                    | `New Sivim`              |
| A dedicated repository with this application's `package.json` at its root | Leave at repository root |

GitHub stores the source. Connecting that repository to Vercel supplies the deployment workflow; a separate GitHub Actions deployment file is not required for this route.

## 5. Deploy on Vercel

1. In Vercel, create a project and import the GitHub repository.
2. Choose the root directory from the table above.
3. Apply these build settings:

   | Setting           | Value                                                                    |
   | ----------------- | ------------------------------------------------------------------------ |
   | Framework Preset  | **Next.js**                                                              |
   | Node.js Version   | **24.x**                                                                 |
   | Install Command   | `npm ci`                                                                 |
   | Build Command     | `npm run lint && npm run build && npm run typecheck`                     |
   | Output Directory  | Keep the automatically detected Next.js setting; leave its override off. |
   | Production Branch | Select the branch intended for production.                               |

4. Add the reviewed environment variables to **Production** and **Preview** as appropriate. Local `.env.local` values are not automatically uploaded from GitHub.
5. Deploy and test the generated URL before connecting the company domain.
6. In **Settings > Domains**, add the domain and use the DNS records Vercel shows. Confirm HTTPS and the chosen primary hostname. Set `NEXT_PUBLIC_SITE_URL` to that hostname and redeploy if its value changed.

The project already has `output: "export"` in [next.config.ts](next.config.ts). Vercel's Next.js integration manages deployment output; for a separate static host, publish **only the contents of `out/`**, not `public/` or the source directory.

Use a commercial-appropriate Vercel plan for SIVIM. The Hobby plan is restricted to non-commercial personal use. [Plan guidance](https://vercel.com/docs/plans/hobby)

Official references: [build settings](https://vercel.com/docs/builds/configure-a-build), [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [custom domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

### What about GitHub Pages?

GitHub Pages is a separate hosting service with [commercial-use restrictions](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). It is not the recommended production host for this company website.

The current application also expects to be served at the domain root. A project URL such as `https://username.github.io/repository/` needs application changes to its base path, native links, public-asset URLs and canonical URLs. Changing `NEXT_PUBLIC_SITE_URL` alone will not fix it. No GitHub Pages deployment workflow is currently included.

## 6. Before going live

- Refresh `/`, `/services/`, `/products/`, `/faq/`, `/contact/`, `/support/` and `/terms/` directly. Check that images and styles load on each route.
- Test a small phone screen, desktop, keyboard navigation and reduced-motion settings. Check menu controls, section links, product dialogs and catalogue closing/scrolling.
- Open and download all five PDFs. Have the owner confirm catalogue specifications and business figures.
- Test WhatsApp enquiries from the contact form, product dialog and floating button. Confirm the recipient and message before sending.
- Verify every public phone/email, social profile and map pin. Confirm the final domain in canonical metadata, `/sitemap.xml` and `/robots.txt`.
- Keep the preceding production deployment available for rollback.

A successful build confirms compilation, not a completed mobile-device review or successful message delivery.

## 7. Updates and rollback

Source changes pushed to the configured production branch trigger Vercel deployment. Environment changes also need a new deployment; they do not update an existing static export.

For a regression, select the previous verified deployment and use Vercel's [Instant Rollback](https://vercel.com/docs/instant-rollback). Correct the source or configuration before the next release. On another static host, restore the previous `out/` artifact.

| Content                              | Update location                                                                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Public company details               | Local `.env.local` and Vercel environment settings                                                                                |
| Product ranges, descriptions and FAQ | `lib/content.ts`                                                                                                                  |
| Catalogue PDFs                       | Original in `catlogs/`, served copy in `public/assets/catalogues/`; update filename, page count and byte size in `lib/content.ts` |
| Product photographs                  | `assets/home-products/`                                                                                                           |
| Served media and logos               | `public/assets/`; preserve responsive variants, dimensions, licences and credits                                                  |
| Original artwork                     | `assets/originals/`; retained for maintenance, not served publicly                                                                |

Rebuild after content or asset changes. Catalogue files should match their intended source versions.

## Troubleshooting

| Problem                                          | Check                                                                                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENOENT: package.json`                           | Run commands inside `New Sivim`, or select that folder as Vercel's root directory.                                                                |
| Build reports a missing environment variable     | Add it to the correct Vercel environment, then redeploy.                                                                                          |
| Environment changes are not visible              | Restart development or create a new deployment. Editing `.env.example` alone changes neither.                                                     |
| Map or social link is missing                    | Check the platform URL and use a real Maps embed `src`; leave unverified optional values empty.                                                   |
| Assets or nested pages return 404                | Check root-directory/output settings and domain-root hosting. Each route has its own exported HTML; do not add a blanket rewrite to `index.html`. |
| TypeScript or ESLint is unavailable during build | Install the locked development dependencies with `npm ci`; do not omit them from the build environment.                                           |
