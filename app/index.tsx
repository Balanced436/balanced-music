import AddServerForm, { LoginFormValue } from "@/components/ui/add-server-form";
import { useLazyTestConnectionQuery } from "@/state/api";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const AddServer = () => {
  const [triggerTest, { isLoading }] = useLazyTestConnectionQuery();

  const handleOnSubmit = async (data: LoginFormValue) => {
    try {
      const result = await triggerTest({
        url: data.hostName,
        user: data.userName,
        password: data.password,
      }).unwrap();
      console.log("Résultat:", result);
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <View>Vérification des identifiants Navidrome...</View>
      </View>
    );
  }

  return <AddServerForm onSubmit={handleOnSubmit} />;
};

export default AddServer;
