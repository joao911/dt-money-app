import { Text, View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { AppButton } from "@/components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamList } from "@/routes/PublicRoutes";

export const Form = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();

  const loginSchema = z.object({
    login: z.string().min(5, "Email obrigatório").email("Email inválido"),
    password: z.string().min(5, "Senha obrigatória"),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  console.log("errors", errors);

  const onSubmit = (data: LoginFormData) => {
    console.log("data", data);
  };

  return (
    <View>
      <Input
        control={control}
        name="login"
        label="EMAIL"
        placeholder="EMAIL"
        leftIconName="mail-outline"
        autoCapitalize="none"
        error={!!errors.login}
        textError={errors.login?.message}
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
      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton
          mode="contained"
          iconName="arrow-forward"
          onPress={handleSubmit(onSubmit)}
        >
          Login
        </AppButton>
        <View>
          <Text className="mb-6 text-base text-gray-300">
            Ainda não possui uma conta?
          </Text>
          <AppButton
            mode="outlined"
            iconName="arrow-forward"
            onPress={() => {
              navigation.navigate("register");
            }}
          >
            Cadastrar
          </AppButton>
        </View>
      </View>
    </View>
  );
};
