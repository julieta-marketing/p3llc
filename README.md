
# p3-llc


A professional website for P3 LLC showcasing its public-private partnership advisory, project delivery services, experience, and leadership.

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_kTAO0FK8PolqlVhH2IpEhyRujve5)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Integrations

Copy `.env.example` to `.env.local` and replace the placeholders. `.env.local`
and all other real environment files are ignored by Git; `.env.example` contains
names and safe sample values only.

The newsletter form uses the Mailchimp Marketing API. New subscribers are added
to `MAILCHIMP_AUDIENCE_ID` and tagged with `MAILCHIMP_CAMPAIGN_NAME`. The current
`subscribed` status adds the contact immediately because the form explicitly asks
the visitor to sign up for email updates. Change it to `pending` if you want
Mailchimp to send a double-opt-in confirmation email first.

For deployment, add the same environment variables in the hosting provider's
project settings. Local `.env.local` values are not uploaded automatically.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Managing News in GitHub

News does not use a database or a separate content API. Each Markdown file in
[`content/news`](content/news/README.md) is one article. Follow that folder's
template and instructions to add or edit News directly in GitHub; the next
deployment rebuild will update the homepage, News Library, and News Detail page.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
