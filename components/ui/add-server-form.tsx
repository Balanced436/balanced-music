import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as z from "zod";

const loginSchema = z.object({
  serverName: z.string().min(1, "You must provide a server name"),
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(1, "You must provide your password"),
  hostName: z.string().url("URL must be valid (e.g., https://google.com)"),
});

export type LoginFormValue = z.infer<typeof loginSchema>;

interface AddServerProps {
  onSubmit: (data: LoginFormValue) => void;
}
const AddServerForm = ({ onSubmit }: AddServerProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { serverName: "", userName: "", password: "", hostName: "" },
  });

  return (
    <ScrollView style={styles.container}>
      {/* Server name */}
      <Text style={styles.label}>Server Name</Text>
      <Controller
        control={control}
        name="serverName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.serverName && styles.errorInput]}
            onChangeText={onChange}
            value={value}
            placeholder="vps.server"
          />
        )}
      />
      {errors.serverName && (
        <Text style={styles.errorText}>{errors.serverName.message}</Text>
      )}

      {/* Server URL */}
      <Text style={styles.label}>Server URL</Text>
      <Controller
        control={control}
        name="hostName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.hostName && styles.errorInput]}
            onChangeText={onChange}
            value={value}
            placeholder="https://navidrome.example.com"
            autoCapitalize="none"
            keyboardType="url"
          />
        )}
      />
      {errors.hostName && (
        <Text style={styles.errorText}>{errors.hostName.message}</Text>
      )}

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <Controller
        control={control}
        name="userName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.userName && styles.errorInput]}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
          />
        )}
      />
      {errors.userName && (
        <Text style={styles.errorText}>{errors.userName.message}</Text>
      )}

      {/* Password field */}
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.errorInput]}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <View style={{ marginTop: 30, marginBottom: 50 }}>
        <Button
          title="Add server"
          onPress={handleSubmit(onSubmit)}
          color="#6200EE"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 5, marginTop: 10 },
  input: { borderBottomWidth: 1, padding: 8, borderColor: "#ccc" },
  errorInput: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginTop: 4 },
});

export default AddServerForm;
