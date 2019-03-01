import * as React from "react";
import { FC } from "react";
import { Link, useCurrentRoute } from "react-navi";

const { useRef } = React;

export const Login: FC<{}> = () => {
  const { data } = useCurrentRoute();
  const inputRef = useRef(null);

  const p = inputRef.current.value || "/";

  return (
    <div>
      <h2>ユーザー名を入力してください：</h2>
      <input type="text" ref={inputRef} />
      <Link href={`/chat/${p}`}>送信</Link>
    </div>
  );
};
