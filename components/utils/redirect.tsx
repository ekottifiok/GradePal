"use client"
import type {ReactNode} from "react";
import { useEffect} from "react";
import {useRouter} from "next/navigation";
import Loading from '@app/loading';

export function Redirect({to}: {to: string}): ReactNode {
  const router = useRouter()
  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return <Loading />
}