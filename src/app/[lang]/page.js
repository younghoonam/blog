import Link from "next/link";
import { getPostData } from "@/app/utils";
import PorfolioLink from "./components/Header/PortfolioLink";
import styles from "./page.module.css";
import HoverUnderline from "./components/HoverUnderline/HoverUnderline";
import UniversalDate from "./components/UniversalDate";

export default async function Home({ params }) {
  const { lang } = await params;

  const postData = await getPostData(lang);
  console.log(postData);

  return (
    <>
      <PorfolioLink />
      <main className={styles.indexWrapper}>
        {postData.map((post) => (
          <Link
            className={styles.link}
            key={post.metadata.slug}
            href={`${lang}/${post.metadata.slug}`}
          >
            <UniversalDate date={post.metadata.date} lang={lang} />
            <HoverUnderline>
              <h2 className={styles.title}>{post.metadata.title}</h2>
            </HoverUnderline>
          </Link>
        ))}
      </main>
    </>
  );
}
