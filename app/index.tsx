import AddServerForm, { LoginFormValue } from "@/components/ui/add-server-form";
import { useLazyTestConnectionQuery } from "@/state/api";
import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { expo as appName } from '../app.json';
import auth, {setCredentials} from "@/state/auth";
import {useDispatch} from "react-redux";
import {useRouter} from "expo-router";

const AddServer = () => {
  const [triggerTest, { isLoading }] = useLazyTestConnectionQuery();
  const router = useRouter();
  const dispatch = useDispatch()

  const handleOnSubmit = async (data: LoginFormValue) => {
    try {
      const result = await triggerTest({
        url: data.hostName,
        user: data.userName,
        password: data.password,
      }).unwrap();
      const { "subsonic-response": { status }} = result;
      if (status === 'ok'){
        dispatch(setCredentials({url : data.hostName, user: data.userName}))
        router.navigate('/musics')

      }else {
        throw new Error("Can't connect")
      }

    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  if (isLoading) {
    return (
        <PaperProvider>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
            <View><Text>Vérification des identifiants Navidrome...</Text></View>
          </View>

        </PaperProvider>
    );
  }

  return <AddServerForm onSubmit={handleOnSubmit} />;
};


AppRegistry.registerComponent(appName.name, () => AddServer);


export default AddServer;
