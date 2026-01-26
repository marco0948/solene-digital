import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type ContactInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

// ============================================
// SERVICES HOOKS
// ============================================
export function useServices() {
  return useQuery({
    queryKey: [api.services.list.path],
    queryFn: async () => {
      const res = await fetch(api.services.list.path);
      if (!res.ok) throw new Error("Failed to fetch services");
      return api.services.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// TEAM HOOKS
// ============================================
export function useTeam() {
  return useQuery({
    queryKey: [api.team.list.path],
    queryFn: async () => {
      const res = await fetch(api.team.list.path);
      if (!res.ok) throw new Error("Failed to fetch team members");
      return api.team.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// CONTACT HOOKS
// ============================================
export function useContactMutation() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      // Validate input before sending using schema from shared routes
      const validated = api.contacts.create.input.parse(data);
      
      const res = await fetch(api.contacts.create.path, {
        method: api.contacts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contacts.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      
      return api.contacts.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
        variant: "default", 
        className: "bg-primary text-primary-foreground border-none"
      });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
