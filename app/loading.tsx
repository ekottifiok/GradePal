"use client"
import './loading.css'
import type {ReactNode} from 'react';
import {Loader} from "@components/loader";

// eslint-disable-next-line import/no-default-export -- this is needed in Next.js documentation
export default function Loading(): ReactNode {
  return <Loader />
}
