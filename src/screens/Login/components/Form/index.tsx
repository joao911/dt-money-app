import { Text, View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/Input";

export const Form = () => {
  const targetSchema = z.object({
    login: z.string().min(5, "Nome obrigatório"),
    password: z.string().min(5, "Senha obrigatória"),
  });

  type TargetFormData = z.infer<typeof targetSchema>;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TargetFormData>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });
  return (
    <View>
      <Input
        control={control}
        name="login"
        label="EMAIL"
        placeholder="EMAIL"
        leftIconName="mail-outline"
      />
      <Input
        control={control}
        name="password"
        label="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />
    </View>
  );
};
