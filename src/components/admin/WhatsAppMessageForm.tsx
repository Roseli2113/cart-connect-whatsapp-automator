
import { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Form schema validation
const formSchema = z.object({
  phone: z.string().min(10, {
    message: "O telefone deve ter pelo menos 10 dígitos.",
  }),
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  messageType: z.enum(["abandonmentCart", "welcome", "followUp"]),
  customMessage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function WhatsAppMessageForm() {
  const [loading, setLoading] = useState(false);

  // Define message templates
  const messageTemplates = {
    abandonmentCart: "Olá {{name}}, vimos que você adicionou itens ao carrinho mas não finalizou a compra. Posso te ajudar a concluir?",
    welcome: "Olá {{name}}, seja bem-vindo à nossa loja! Estamos à disposição para ajudar no que precisar.",
    followUp: "Olá {{name}}, gostaria de saber se está gostando dos nossos produtos e serviços. Posso ajudar em algo?"
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      name: "",
      messageType: "abandonmentCart",
      customMessage: "",
    },
  });

  const messageType = form.watch("messageType");
  const name = form.watch("name");

  // Preview message with name placeholder replaced
  const getPreviewMessage = () => {
    if (messageType) {
      return messageTemplates[messageType as keyof typeof messageTemplates].replace("{{name}}", name || "Cliente");
    }
    return "";
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    
    try {
      // Prepare the message text (either from template or custom)
      const messageText = values.customMessage || 
        messageTemplates[values.messageType as keyof typeof messageTemplates].replace("{{name}}", values.name);
      
      // Send the message via WhatsApp API
      const response = await fetch("http://localhost:21465/api/message/send-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: "admin",
          phone: values.phone,
          text: messageText
        }),
      });
      
      if (!response.ok) {
        throw new Error("Falha ao enviar mensagem");
      }
      
      toast({
        title: "Sucesso!",
        description: "Mensagem enviada com sucesso!",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast({
        title: "Erro",
        description: "Erro ao enviar a mensagem. Verifique a conexão com o WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enviar Mensagem WhatsApp</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 5511999999999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="messageType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Mensagem</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de mensagem" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="abandonmentCart">Abandono de Carrinho</SelectItem>
                      <SelectItem value="welcome">Boas-vindas</SelectItem>
                      <SelectItem value="followUp">Acompanhamento</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {messageType && (
              <div className="p-3 bg-gray-100 rounded-md">
                <p className="text-sm font-medium mb-1">Pré-visualização:</p>
                <p className="text-sm">{getPreviewMessage()}</p>
              </div>
            )}
            
            <FormField
              control={form.control}
              name="customMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem Personalizada (opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Digite uma mensagem personalizada ou deixe em branco para usar o modelo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
