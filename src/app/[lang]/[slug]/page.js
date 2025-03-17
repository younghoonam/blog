import { getCompiledMDXData, getMDXComponents, getPostData } from "@/app/utils";
import Link from "next/link";
import styles from "./page.module.css";
import HoverUnderline from "../components/HoverUnderline/HoverUnderline";
import UniversalDate from "../components/UniversalDate";
import dynamic from "next/dynamic";

export async function generateStaticParams() {
  const posts = await getPostData("en");
  return posts.map((post) => ({ slug: post.metadata.slug }));
}

export default async function Page({ params }) {
  const { lang, slug } = await params;

  const post = await getPostData(lang, slug);
  const components = await getMDXComponents(post.content, slug);
  console.log(components);
  const content = await getCompiledMDXData(lang, slug, components);

  dynamic(() => {
    import(`./content/${slug}/${slug}.css`);
  });

  return (
    <article>
      <div className={styles.MDXWrapper}>
        <Link className={styles.backButton} href={`/${lang}`}>
          <HoverUnderline lineWidth="3px">
            <span>{lang == "ko" ? "뒤로 돌아가기" : "Go Back"}</span>
          </HoverUnderline>
        </Link>
        <h1 className={styles.title}>{post.metadata.title}</h1>
        <UniversalDate date={post.metadata.date} lang={lang} />

        <div className={styles.MDXContentWrapper}>{content}</div>
      </div>
    </article>
  );
}
