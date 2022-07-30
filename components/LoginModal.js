import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Login from "./Login";
import CreateAccount from "../components/CreateAccount";

export default function LoginModal({
  toggleLogin,
  creatingAccount,
  setCreatingAccount,
}) {
  return (
    <div className="login w-32 rounded-lg bg-white absolute top-32 left-1/4 z-20 p-12 flex flex-col justify-center shadow-lg">
      <FontAwesomeIcon
        icon={faClose}
        className="h-6 w-6 absolute right-3 top-3 cursor-pointer"
        onClick={toggleLogin}
      />
      {creatingAccount ? (
        <CreateAccount
          creatingAccount={creatingAccount}
          setCreatingAccount={setCreatingAccount}
        />
      ) : (
        <Login
          creatingAccount={creatingAccount}
          setCreatingAccount={setCreatingAccount}
        />
      )}
    </div>
  );
}
