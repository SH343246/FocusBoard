
import useExperiment from "../hooks/useExperiment";


const API = import.meta.env.DEV ? "http://localhost:8000" : "";
  export default function Login() {

    const userId = localStorage.getItem("anon_id") ?? (() => {
      const id = crypto.randomUUID()
      localStorage.setItem("anon_id", id)
      return id
  })();

    const { variantName, track } = useExperiment("82f75c90-7349-4758-b948-8c38b656fb4d", userId)

  const handleLogin = () => {
    track("conversion")
    window.location.href = `${API}/auth/google`
}

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>
        {variantName === "get_started" ? "Get Started" : "Sign In"}
      </button>
    </div>
  );
}