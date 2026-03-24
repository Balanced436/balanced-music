import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm, UseFormSetError } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as z from "zod";

const loginSchema = z.object({
  serverName: z.string().min(1, "You must provide a server name"),
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(1, "You must provide your password"),
  hostName: z.string().url("URL must be valid (e.g., https://google.com)"),
});

export type LoginFormValue = z.infer<typeof loginSchema>;

interface AddServerProps {
  onSubmit: (
    data: LoginFormValue,
    setError: UseFormSetError<LoginFormValue>,
  ) => void;
  isLoading: boolean;
}

const AddServerForm = ({ onSubmit, isLoading = false }: AddServerProps) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      serverName: "server.name",
      userName: "",
      password: "",
      hostName: "https://navidrome.isaid.fr",
    },
  });

  const internalSubmit = (data: LoginFormValue) => {
    onSubmit(data, setError); // On passe data ET s etError au parent
  };

  return (
    <ScrollView style={styles.container}>
      {/* Server name */}
      {errors.root && (
        <View style={styles.globalError}>
          <Text style={styles.errorText}>{errors.root.message}</Text>
        </View>
      )}
      <Text style={styles.label}>Server Name</Text>
      <Controller
        control={control}
        name="serverName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            mode="flat"
            style={[styles.input, errors.serverName && styles.errorInput]}
            onChangeText={onChange}
            value={value}
            placeholder="vps.server"
            error={!!errors.serverName}
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
            mode="flat"
            style={[styles.input, errors.hostName && styles.errorInput]}
            onChangeText={onChange}
            value={value}
            placeholder="https://navidrome.example.com"
            autoCapitalize="none"
            keyboardType="url"
            error={!!errors.hostName}
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
            mode="flat"
            style={[styles.input, errors.userName && styles.errorInput]}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
            error={!!errors.userName}
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
            mode="flat"
            style={[styles.input, errors.password && styles.errorInput]}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <View>
          <Text style={styles.errorText}>{errors.password.message}</Text>
        </View>
      )}

      <View style={{ marginTop: 30, marginBottom: 50 }}>
        <Button
          disabled={isLoading}
          loading={isLoading}
          mode={"contained"}
          onPress={handleSubmit(internalSubmit)}
        >
          Add server
        </Button>
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
  globalError: {
    backgroundColor: "#FDECEA",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default AddServerForm;
