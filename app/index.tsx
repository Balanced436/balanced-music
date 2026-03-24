import AddServerForm, { LoginFormValue } from "@/components/ui/add-server-form";
import { useLazyTestConnectionQuery } from "@/state/api";
import { setCredentials } from "@/state/auth";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { UseFormSetError } from "react-hook-form";
import { AppRegistry } from "react-native";
import { useDispatch } from "react-redux";
import { expo as appName } from "../app.json";

const AddServer = () => {
  const [triggerTest, { isLoading }] = useLazyTestConnectionQuery();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOnSubmit = async (
    data: LoginFormValue,
    setError: UseFormSetError<LoginFormValue>,
  ) => {
    try {
      const result = await triggerTest({
        url: data.hostName,
        user: data.userName,
        password: data.password,
      }).unwrap();
      const {
        "subsonic-response": { status },
      } = result;
      if (status === "ok") {
        dispatch(
          setCredentials({
            url: data.hostName,
            user: data.userName,
            password: data.password,
          }),
        );
        await SecureStore.setItemAsync("navidrome_password", data.password);
        router.navigate("/musics");
      } else {
        setError("root", {
          type: "manual",
          message:
            "Impossible de se connecter au serveur. Vérifiez l'URL et votre connexion.",
        });
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  };
  return <AddServerForm onSubmit={handleOnSubmit} isLoading={isLoading} />;
};

AppRegistry.registerComponent(appName.name, () => AddServer);

export default AddServer;
