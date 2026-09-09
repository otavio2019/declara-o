This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Antes do primeiro deploy, abra **Settings > Environment Variables** no projeto da Vercel e cadastre estas variáveis nos ambientes **Production**, **Preview** e **Development**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

O valor de `NEXT_PUBLIC_SUPABASE_URL` está em **Supabase > Project Settings > API > Project URL**. O valor de `SUPABASE_SERVICE_ROLE_KEY` está na mesma tela, em **Project API keys > service_role**. Essa segunda chave é secreta e não deve ser commitada nem usada em componentes client-side.

O cliente do Supabase é criado somente quando uma rota da API é chamada, portanto o build não falha mais por avaliar as variáveis durante a compilação. Ainda assim, as duas variáveis precisam estar configuradas na Vercel para que `/api/declarations` funcione em produção. Depois de cadastrá-las, faça um novo deploy.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
