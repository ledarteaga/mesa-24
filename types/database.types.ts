export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          description: string | null
          id: number
          order: number | null
          restaurant: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          order?: number | null
          restaurant?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          order?: number | null
          restaurant?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_restaurant_fkey"
            columns: ["restaurant"]
            isOneToOne: false
            referencedRelation: "client_restaurant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_restaurant_fkey"
            columns: ["restaurant"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["restaurant"]
          },
          {
            foreignKeyName: "category_restaurant_fkey"
            columns: ["restaurant"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      category_item: {
        Row: {
          category: number | null
          created_at: string
          description: string | null
          id: number
          name: string | null
          order: number | null
          price: number | null
          user_id: string | null
        }
        Insert: {
          category?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          order?: number | null
          price?: number | null
          user_id?: string | null
        }
        Update: {
          category?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          order?: number | null
          price?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_item_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          address: string | null
          backdrop: string | null
          facebook_user: string | null
          id: number
          instagram_user: string | null
          logo: string
          name: string | null
          phone_number: string | null
          preffered_currency: string | null
          primary_color: string | null
          slogan: string | null
          url_name: string | null
          user_id: string | null
          whatsapp: boolean | null
        }
        Insert: {
          address?: string | null
          backdrop?: string | null
          facebook_user?: string | null
          id?: number
          instagram_user?: string | null
          logo?: string
          name?: string | null
          phone_number?: string | null
          preffered_currency?: string | null
          primary_color?: string | null
          slogan?: string | null
          url_name?: string | null
          user_id?: string | null
          whatsapp?: boolean | null
        }
        Update: {
          address?: string | null
          backdrop?: string | null
          facebook_user?: string | null
          id?: number
          instagram_user?: string | null
          logo?: string
          name?: string | null
          phone_number?: string | null
          preffered_currency?: string | null
          primary_color?: string | null
          slogan?: string | null
          url_name?: string | null
          user_id?: string | null
          whatsapp?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      client_restaurant: {
        Row: {
          address: string | null
          backdrop: string | null
          facebook_user: string | null
          id: number | null
          instagram_user: string | null
          logo: string | null
          name: string | null
          phone_number: string | null
          preffered_currency: string | null
          primary_color: string | null
          slogan: string | null
          url_name: string | null
          whatsapp: boolean | null
        }
        Insert: {
          address?: string | null
          backdrop?: string | null
          facebook_user?: string | null
          id?: number | null
          instagram_user?: string | null
          logo?: string | null
          name?: string | null
          phone_number?: string | null
          preffered_currency?: string | null
          primary_color?: string | null
          slogan?: string | null
          url_name?: string | null
          whatsapp?: boolean | null
        }
        Update: {
          address?: string | null
          backdrop?: string | null
          facebook_user?: string | null
          id?: number | null
          instagram_user?: string | null
          logo?: string | null
          name?: string | null
          phone_number?: string | null
          preffered_currency?: string | null
          primary_color?: string | null
          slogan?: string | null
          url_name?: string | null
          whatsapp?: boolean | null
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          category: string | null
          item_description: string | null
          name: string | null
          price: number | null
          restaurant: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
