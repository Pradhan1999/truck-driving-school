import type { SVGProps } from 'react';

export function ReplyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 512 512" {...props}>
      <path
        fill="currentColor"
        d="M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258c0 61.441-39.581 122.309-83.333 154.132c-13.653 9.931-33.111-2.533-28.077-18.631c45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328"
      ></path>
    </svg>
  );
}
