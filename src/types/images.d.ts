declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*&as=srcset' {
  const srcset: string;
  export default srcset;
}

declare module '*&as=base64' {
  const placeholder: string;
  export default placeholder;
}

declare module '*&as=metadata' {
  const metadata: {
    width: number;
    height: number;
    format: string;
    src: string;
    size: number;
  };
  export default metadata;
}
