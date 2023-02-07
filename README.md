## The Idea

This is a simple project to [midudev's](https://github.com/midudev/midu-cohere-hackathon) Hackthon.

The idea is to create a simple app to help people generate text for their website. The app will use [Cohere.ai](https://cohere.ai/) to generate the text and [Stable Diffusion](https://stability.ai/) to make the images.

This project can be amplified to create a full content management system for websites. it is create in 7 days only in my free time. if you want to contribute, you are welcome.

## The Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.io/)
- [Vercel](https://vercel.com/)
- [Cohere.ai](https://cohere.ai/)
- [Stable Diffusion](https://stability.ai/)

## Getting Started

First, run the development server:

```bash
git clone https://github.com/akilinomendez/ai2web.git
cd ai2web
pnpm i
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You need set in .env.local the following variables:

```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_URL
STABILITY_API_KEY
COHERE_API_KEY
```

You too need to create a table in Supabase with the following columns:

```bash
CREATE TABLE public.promts (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	created_at timestamptz NULL DEFAULT now(),
	title text NULL,
	description text NULL,
	products jsonb NULL,
	user_id uuid NOT NULL,
	keywords jsonb NULL DEFAULT '{}'::jsonb,
	"input" text NULL,
	gradient text NULL,
	font text NULL,
	"fontColor" text NULL,
	input_title text NULL,
	image text NULL,
	input_description text NULL,
	input_products text NULL,
	input_image text NULL,
	CONSTRAINT promts_pkey PRIMARY KEY (user_id)
);
```

Then polices for the table:

```bash
(uid() = user_id)
```

Then you have to create a storage with name images and set the policy to onwer folder.

```bash
((bucket_id = 'images'::text) AND ((uid())::text = (storage.foldername(name))[1]))

```

## Ai Toxicity

The project have a Custom Model in Cohere.ai for check if text is good or bad, actually the model is only English, but you can create a model for your language.

**Note:** This is a rapid prototype, so the code is not clean and there are some bugs in 7 days, if you want to production ready code, you need to refactor the code and separate the tables in Supabase.

## Biography

- Astro-supabase-vercel [https://github.com/magnuswahlstrand/astro-supabase-vercel.git]
- Toxicity Dataset [https://www.surgehq.ai/datasets]
- Gradient From [https://hypercolor.dev/]
- StackMiddleware https://reacthustle.com/blog/how-to-chain-multiple-middleware-functions-in-nextjs
