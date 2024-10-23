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
      articles: {
        Row: {
          author: string
          content: string
          created_at: string
          draft: boolean
          excerpt: string
          fts: unknown | null
          id: string
          image: string
          slug: string
          title: string
          views: number
        }
        Insert: {
          author: string
          content: string
          created_at?: string
          draft?: boolean
          excerpt: string
          fts?: unknown | null
          id?: string
          image: string
          slug: string
          title: string
          views?: number
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          draft?: boolean
          excerpt?: string
          fts?: unknown | null
          id?: string
          image?: string
          slug?: string
          title?: string
          views?: number
        }
        Relationships: []
      }
      assignments: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'assignments_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          draft: boolean
          id: string
          image: string | null
          instructor_id: string
          price: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          draft?: boolean
          id?: string
          image?: string | null
          instructor_id: string
          price?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          draft?: boolean
          id?: string
          image?: string | null
          instructor_id?: string
          price?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          course_id: string
          enrollment_date: string
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          enrollment_date?: string
          id?: string
          user_id: string
        }
        Update: {
          course_id?: string
          enrollment_date?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'enrollments_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          created_at: string | null
          description: string | null
          id: string
          module_id: string | null
          order_index: number
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          module_id?: string | null
          order_index: number
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          module_id?: string | null
          order_index?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'lessons_module_id_fkey'
            columns: ['module_id']
            isOneToOne: false
            referencedRelation: 'modules'
            referencedColumns: ['id']
          },
        ]
      }
      modules: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string
          order_index: number
          title: string
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          order_index: number
          title: string
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          order_index?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'modules_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
        ]
      }
      profile: {
        Row: {
          admin: boolean
          auth_id: string
          created_at: string
          family_name: string | null
          given_name: string | null
          id: string
          nickname: string | null
          picture: string | null
          updated_at: string | null
        }
        Insert: {
          admin?: boolean
          auth_id?: string
          created_at?: string
          family_name?: string | null
          given_name?: string | null
          id?: string
          nickname?: string | null
          picture?: string | null
          updated_at?: string | null
        }
        Update: {
          admin?: boolean
          auth_id?: string
          created_at?: string
          family_name?: string | null
          given_name?: string | null
          id?: string
          nickname?: string | null
          picture?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_id: string
          feedback: string | null
          id: string
          lesson_id: string | null
          takeaways: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string
          feedback?: string | null
          id?: string
          lesson_id?: string | null
          takeaways: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string
          feedback?: string | null
          id?: string
          lesson_id?: string | null
          takeaways?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'progress_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'progress_lesson_id_fkey'
            columns: ['lesson_id']
            isOneToOne: false
            referencedRelation: 'lessons'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'progress_lesson_id_fkey'
            columns: ['lesson_id']
            isOneToOne: false
            referencedRelation: 'lessons_public'
            referencedColumns: ['id']
          },
        ]
      }
      quiz_progress: {
        Row: {
          answers: number[]
          created_at: string
          id: string
          quiz_id: string
          score: number
          user_id: string
        }
        Insert: {
          answers: number[]
          created_at?: string
          id?: string
          quiz_id: string
          score?: number
          user_id?: string
        }
        Update: {
          answers?: number[]
          created_at?: string
          id?: string
          quiz_id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quiz_progress_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: false
            referencedRelation: 'quizzes'
            referencedColumns: ['id']
          },
        ]
      }
      quiz_questions: {
        Row: {
          answers: string[]
          correct_answer: number
          created_at: string
          id: string
          question: string
          quiz_id: string
        }
        Insert: {
          answers: string[]
          correct_answer: number
          created_at?: string
          id?: string
          question: string
          quiz_id: string
        }
        Update: {
          answers?: string[]
          correct_answer?: number
          created_at?: string
          id?: string
          question?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quiz_questions_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: false
            referencedRelation: 'quizzes'
            referencedColumns: ['id']
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          id: string
          module_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          module_id?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          module_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quizes_module_id_fkey'
            columns: ['module_id']
            isOneToOne: false
            referencedRelation: 'modules'
            referencedColumns: ['id']
          },
        ]
      }
      submissions: {
        Row: {
          assignment_id: string | null
          content: string | null
          feedback: string | null
          grade: number | null
          id: string
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          assignment_id?: string | null
          content?: string | null
          feedback?: string | null
          grade?: number | null
          id?: string
          submitted_at?: string | null
          user_id?: string
        }
        Update: {
          assignment_id?: string | null
          content?: string | null
          feedback?: string | null
          grade?: number | null
          id?: string
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'submissions_assignment_id_fkey'
            columns: ['assignment_id']
            isOneToOne: false
            referencedRelation: 'assignments'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      lessons_public: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          module_id: string | null
          order_index: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          module_id?: string | null
          order_index?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          module_id?: string | null
          order_index?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'lessons_module_id_fkey'
            columns: ['module_id']
            isOneToOne: false
            referencedRelation: 'modules'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Functions: {
      search_articles: {
        Args: {
          search_term: string
        }
        Returns: {
          id: string
          title: string
          slug: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
