'use client'

import { default as NextLink } from "next/link";

interface LinkInterface {
    link: string;
    text: string;
}

export default function Link({ link, text }: LinkInterface) {

    return (
        <NextLink href={link} target="_blank"><span className="underline decoration-logo-green decoration-2">{text}</span></NextLink>
    )
}