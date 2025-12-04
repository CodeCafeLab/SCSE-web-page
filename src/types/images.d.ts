declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.png?*" {
  const src: string;
  export default src;
}

declare module "@/assets/suncity-logo.png?w=360&format=webp&quality=80" {
  const src: string;
  export default src;
}

declare module "@/assets/suncity-logo.png?w=180;240;320;360&format=webp&quality=80&as=srcset" {
  const srcSet: string;
  export default srcSet;
}

declare module "@/assets/suncity-logo.png?w=32&blur=30&format=webp&as=base64" {
  const placeholder: string;
  export default placeholder;
}


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
