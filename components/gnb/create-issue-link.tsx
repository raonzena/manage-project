"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as styles from "./gnb.css";

export function CreateIssueLink() {
  const searchParams = useSearchParams();
  const query = new URLSearchParams();
  for (const key of ["workspace", "project"]) {
    const value = searchParams.get(key);
    if (value) query.set(key, value);
  }
  return <Link className={styles.create} href={`/issues/new?${query}`}>+ 새 이슈</Link>;
}
