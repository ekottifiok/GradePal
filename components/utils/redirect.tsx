"use client"
import type {ReactNode} from "react";
import { useEffect} from "react";
import {useRouter} from "next/navigation";
import {Loader} from '@components/loader'

export function Redirect({to}: {to: string}): ReactNode {
  const router = useRouter()
  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return <Loader />
}