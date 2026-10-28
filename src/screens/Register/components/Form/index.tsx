import { View, Text, ScrollView } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { AppButton } from "@/components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamList } from "@/routes/PublicRoutes";

const loginSchema = z
  .object({
    nome: z.string().min(5, "Nome obrigatório"),
    email: z.string().min(5, "Email obrigatório").email("Email inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/\d/, "A senha deve conter pelo menos um número")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "A senha deve conter pelo menos um caractere especial",
      ),
    confirmPassword: z.string().min(1, "Confirme a senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof loginSchema>;

export const Form = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      nome: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  console.log("errors", errors);

  const onSubmit = (data: RegisterFormData) => {
    console.log("data", data);
  };

  return (
    <ScrollView>
      <View>
        <Input
          control={control}
          name="nome"
          label="NOME"
          placeholder="Seu nome completo"
          leftIconName="person-outline"
          error={!!errors.nome}
          textError={errors.nome?.message}
        />
        <Input
          control={control}
          name="email"
          label="EMAIL"
          placeholder="EMAIL"
          leftIconName="mail-outline"
          autoCapitalize="none"
          error={!!errors.email}
          textError={errors.email?.message}
        />
        <Input
          control={control}
          name="password"
          label="SENHA"
          placeholder="Sua senha"
          leftIconName="lock-outline"
          secureTextEntry
          error={!!errors.password}
          textError={errors.password?.message}
        />
        <Input
          control={control}
          name="confirmPassword"
          label="SENHA"
          placeholder="Confirme sua senha"
          leftIconName="lock-outline"
          secureTextEntry
          error={!!errors.confirmPassword}
          textError={errors.confirmPassword?.message}
        />
        <View className="flex-1 justify-between mt-8 mb-6 min-h-[200px]">
          <AppButton
            mode="contained"
            iconName="arrow-forward"
            onPress={handleSubmit(onSubmit)}
          >
            Cadastrar
          </AppButton>
          <View>
            <Text className="mb-6 text-base text-gray-300">
              Já tem uma conta?{" "}
            </Text>
            <AppButton
              mode="outlined"
              iconName="arrow-forward"
              onPress={() => {
                navigation.navigate("login");
              }}
            >
              Acessar
            </AppButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
