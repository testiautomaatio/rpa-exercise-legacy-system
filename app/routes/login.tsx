import { Button, Hourglass, ProgressBar, TextInput, Window, WindowContent, WindowHeader } from "react95";
import type { Route } from "./+types/login";
import { useState } from "react";
import { useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Log in" },
    { name: "description", content: "Log in to the demo app" },
  ];
}

export default function Home() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const delay = 5_000;
    const step = delay / 10;

    for (let i = 0; i < delay; i += step) {
      setPercent(0);
      let progress = Math.trunc(100 * i / delay);
      setTimeout(() => setPercent(progress), i);
    }
    setTimeout(() => {
      navigate("/dashboard.php");
    }, delay);
  };

  return (
    <Window style={{ width: 600 }}>
      <WindowHeader className='window-title'>
        <span>auth.exe</span>
      </WindowHeader>
      <WindowContent>
        {loading ?
          <>
            <Hourglass size={32} style={{ margin: "20px auto", display: "block" }} />
            <ProgressBar variant='tile' value={Math.floor(percent)} />
          </>
          :

          <>
            <p style={{ marginBottom: 20 }}>
              Please log in to your account. This is a demo app, so you need to
              use the credentials that have been prefilled for you.
            </p>
            <form
              style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 300 }}
              onSubmit={handleSubmit}>
              <label>
                Username
                <TextInput id="username" value="dwight" />
              </label>
              <label>Password
                <TextInput id="password" type="password" value="letmein" />
              </label>
              <Button style={{ marginLeft: 4 }} type="submit">
                Log in
              </Button>
            </form>
          </>
        }
      </WindowContent>
    </Window >
  );
}
