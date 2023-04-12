import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.css";

function LoginPage(props) {
  const onError = props.onError;
  return (
    <div className="flex flex-col h-screen w-screen bg-primary justify-center items-center">
      <h1 className="text-6xl font-display text-white font-bold">LOGIN!</h1>
      <LoginForm onError={onError}/>
    </div>
  );
}

export default LoginPage;
